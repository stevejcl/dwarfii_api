#!/usr/bin/env node
// WebSocket MitM proxy for DWARF protocol analysis.
// Sits between the DwarfLab smartphone app and the DWARF device,
// logging all traffic in both directions.
//
// Setup:
//   1. Start this proxy: node ws-proxy.js --target-ip 192.168.11.31
//   2. Change phone WiFi proxy settings or DNS to point to this PC
//   3. Or: configure phone to connect to DWARF via this PC's IP on port 9900
//
// Architecture:
//   Phone app ←→ [Proxy :9900] ←→ DWARF device :9900

import WebSocket, { WebSocketServer } from "ws";
import protobuf from "protobufjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  log,
  timestamp,
  hexPreview,
} from "./common.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

const USAGE = `
Usage: node ws-proxy.js [options]

WebSocket MitM proxy for DWARF protocol analysis.

Options:
  --target-ip <addr>    DWARF device IP (required)
  --target-port <port>  DWARF WebSocket port (default: 9900)
  --listen-port <port>  Local proxy port (default: 9900)
  --log-dir <path>      Directory for logs (default: captures/)
  --verbose, -v         Show full packet hex
  --help, -h            Show this help

Setup (same WiFi network):
  1. Find your PC's IP on the DWARF WiFi network
  2. Start proxy: node ws-proxy.js --target-ip <dwarf-ip>
  3. On phone: configure DWARF app to use PC's IP instead of DWARF IP
     (Some apps allow custom IP; otherwise use DNS override)

Alternative: use listen-port != 9900 and port-forward on phone
  node ws-proxy.js --target-ip 192.168.11.31 --listen-port 9901
`;

// Notify message type names for better logging
const CMD_NAMES = {
  10000: "OpenCamera(tele)", 10001: "CloseCamera(tele)",
  10002: "Photograph(tele)", 10005: "StartRecord(tele)", 10006: "StopRecord(tele)",
  10007: "SetExpMode(tele)", 10008: "GetExpMode(tele)",
  10009: "SetExp(tele)", 10010: "GetExp(tele)",
  10011: "SetGainMode(tele)", 10012: "GetGainMode(tele)",
  10013: "SetGain(tele)", 10014: "GetGain(tele)",
  10031: "SetIrcut", 10032: "GetIrcut",
  10035: "SetAllParams(tele)", 10036: "GetAllParams(tele)",
  10037: "SetFeatureParam", 10038: "GetAllFeatureParams",
  10039: "GetSystemWorkingState",
  11000: "StartCalibration", 11002: "StartGotoDSO", 11004: "StopGoto",
  11005: "StartLiveStacking", 11006: "StopLiveStacking",
  11013: "OneClickGotoDSO", 11015: "StopOneClickGoto",
  12000: "OpenCamera(wide)", 12001: "CloseCamera(wide)",
  12027: "GetAllParams(wide)", 12028: "SetAllParams(wide)",
  13000: "SetTime", 13001: "SetTimeZone", 13004: "SetMasterLock",
  13500: "OpenRGB", 13501: "CloseRGB", 13502: "PowerDown", 13505: "Reboot",
  14000: "MotorRun", 14001: "MotorRunTo", 14002: "MotorStop",
  14003: "MotorReset", 14006: "Joystick", 14011: "MotorGetPosition",
  14800: "StartTrack", 14801: "StopTrack",
  15000: "AutoFocus", 15004: "StartAstroAutoFocus",
  15200: "N:WidiMatch", 15201: "N:Battery", 15202: "N:Charge",
  15203: "N:SDCard", 15213: "N:TeleParam", 15214: "N:WideParam",
  15215: "N:TeleState", 15216: "N:WideState", 15221: "N:RGB",
  15223: "N:HostSlave", 15225: "N:TrackResult", 15234: "N:StreamType",
  15243: "N:Temperature",
};

async function loadProtoRoot() {
  const root = new protobuf.Root();
  const protoFiles = [
    "base.proto", "protocol.proto", "camera.proto", "astro.proto",
    "system.proto", "motor_control.proto", "notify.proto", "track.proto",
    "focus.proto", "panorama.proto", "rgb.proto", "ble.proto",
    "shooting_schedule.proto",
  ];
  for (const file of protoFiles) {
    try { await root.load(path.join(PROTO_DIR, file)); } catch {}
  }
  return root;
}

function decodeWsPacket(root, buf) {
  try {
    const WsPacket = root.lookupType("WsPacket");
    return WsPacket.toObject(WsPacket.decode(buf), {
      longs: String, enums: String, bytes: String, defaults: true,
    });
  } catch {
    return null;
  }
}

async function main() {
  let targetIp = null;
  let targetPort = 9900;
  let listenPort = 9900;
  let logDir = path.join(__dirname, "captures");
  let verbose = false;

  for (let i = 2; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case "--target-ip": targetIp = process.argv[++i]; break;
      case "--target-port": targetPort = parseInt(process.argv[++i], 10); break;
      case "--listen-port": listenPort = parseInt(process.argv[++i], 10); break;
      case "--log-dir": logDir = process.argv[++i]; break;
      case "--verbose": case "-v": verbose = true; break;
      case "--help": case "-h": console.log(USAGE); process.exit(0);
    }
  }

  if (!targetIp) {
    console.log(USAGE);
    log.fail("--target-ip is required");
    process.exit(1);
  }

  const root = await loadProtoRoot();

  // Ensure log directory exists
  fs.mkdirSync(logDir, { recursive: true });

  // Session log file
  const sessionFile = path.join(
    logDir,
    `proxy-${new Date().toISOString().replace(/[:.]/g, "-")}.jsonl`
  );
  const logStream = fs.createWriteStream(sessionFile, { flags: "a" });
  let seq = 0;

  function logPacket(dir, data, isBinary) {
    seq++;
    const ts = timestamp();

    const entry = {
      seq,
      dir, // "app→dwarf" or "dwarf→app"
      type: isBinary ? "binary" : "text",
      size: data.length,
      ts,
    };

    if (isBinary) {
      const buf = new Uint8Array(data);
      entry.hex = hexPreview(buf, 64);

      // Try decode
      const pkt = decodeWsPacket(root, buf);
      if (pkt) {
        entry.packet = {
          ver: `${pkt.majorVersion}.${pkt.minorVersion}`,
          dev: pkt.deviceId,
          mod: pkt.moduleId,
          cmd: pkt.cmd,
          type: pkt.type,
          clientId: pkt.clientId,
        };

        const cmdName = CMD_NAMES[pkt.cmd] || `CMD_${pkt.cmd}`;
        const typeNames = { 0: "REQ", 1: "RESP", 2: "NOTIFY", 3: "NRESP" };
        const tn = typeNames[pkt.type] || `type=${pkt.type}`;

        // Decode inner data if present
        if (pkt.data && pkt.data.length > 0) {
          const innerBytes = typeof pkt.data === "string"
            ? Buffer.from(pkt.data, "base64") : pkt.data;
          if (innerBytes.length > 0) {
            entry.innerHex = hexPreview(innerBytes, 128);
          }
        }

        const arrow = dir === "app→dwarf" ? "\x1b[33m→→→\x1b[0m" : "\x1b[36m←←←\x1b[0m";
        log.data(`#${seq} ${arrow} [${tn}] mod=${pkt.moduleId} cmd=${pkt.cmd} (${cmdName}) dev=${pkt.deviceId}`);

        if (verbose && entry.innerHex) {
          log.data(`     Inner: ${entry.innerHex}`);
        }
      } else {
        const arrow = dir === "app→dwarf" ? "→→→" : "←←←";
        log.data(`#${seq} ${arrow} [binary] ${entry.hex}`);
      }
    } else {
      entry.text = data.toString().substring(0, 200);
      const arrow = dir === "app→dwarf" ? "→→→" : "←←←";
      log.data(`#${seq} ${arrow} [text] ${entry.text}`);
    }

    logStream.write(JSON.stringify(entry) + "\n");
  }

  // Create proxy server
  const wss = new WebSocketServer({ port: listenPort });

  log.section("WEBSOCKET PROXY");
  log.info(`Proxy listening on port ${listenPort}`);
  log.info(`Forwarding to ${targetIp}:${targetPort}`);
  log.info(`Log file: ${sessionFile}`);
  log.info("Waiting for app connection...\n");

  wss.on("connection", (appWs, req) => {
    log.ok(`App connected from ${req.socket.remoteAddress}`);

    // Connect to DWARF
    const dwarfWs = new WebSocket(`ws://${targetIp}:${targetPort}`, {
      perMessageDeflate: false,
    });

    dwarfWs.on("open", () => {
      log.ok(`Connected to DWARF at ${targetIp}:${targetPort}`);
      log.info("Proxying traffic...\n");
    });

    dwarfWs.on("error", (err) => {
      log.fail(`DWARF connection error: ${err.message}`);
      appWs.close(1001, "dwarf-unreachable");
    });

    // App → DWARF
    appWs.on("message", (data, isBinary) => {
      logPacket("app→dwarf", data, isBinary);
      if (dwarfWs.readyState === WebSocket.OPEN) {
        dwarfWs.send(data, { binary: isBinary });
      }
    });

    // DWARF → App
    dwarfWs.on("message", (data, isBinary) => {
      logPacket("dwarf→app", data, isBinary);
      if (appWs.readyState === WebSocket.OPEN) {
        appWs.send(data, { binary: isBinary });
      }
    });

    // Handle ping/pong forwarding
    appWs.on("ping", (data) => {
      if (dwarfWs.readyState === WebSocket.OPEN) dwarfWs.ping(data);
    });
    dwarfWs.on("ping", (data) => {
      if (appWs.readyState === WebSocket.OPEN) appWs.ping(data);
    });
    appWs.on("pong", (data) => {
      if (dwarfWs.readyState === WebSocket.OPEN) dwarfWs.pong(data);
    });
    dwarfWs.on("pong", (data) => {
      if (appWs.readyState === WebSocket.OPEN) appWs.pong(data);
    });

    // Handle close
    appWs.on("close", (code, reason) => {
      log.warn(`App disconnected: code=${code} reason="${reason || ""}"`);
      dwarfWs.close(code, reason);
    });

    dwarfWs.on("close", (code, reason) => {
      log.warn(`DWARF disconnected: code=${code} reason="${reason || ""}"`);
      appWs.close(code, reason);
    });
  });

  // Graceful shutdown
  process.on("SIGINT", () => {
    log.info("\nShutting down proxy...");
    logStream.end();
    wss.close();
    process.exit(0);
  });
}

main().catch(e => {
  log.fail(`Error: ${e.message}`);
  process.exit(1);
});
