#!/usr/bin/env node
// Systematic command survey for DWARF mini.
// Sends safe read-only commands to each module and records responses.
// Requires HOST registration first (SetMasterLock).

import WebSocket from "ws";
import protobuf from "protobufjs";
import path from "path";
import { fileURLToPath } from "url";
import {
  parseArgs,
  log,
  timestamp,
  hexPreview,
  DEFAULT_CLIENT_ID,
  WS_MAJOR_VERSION,
  WS_MINOR_VERSION,
  MODULE,
  MSG_TYPE,
} from "./common.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

const USAGE = `
Usage: node cmd-survey.js [options]

Systematic command survey for DWARF mini.
Sends safe read-only commands to each module and records responses.

Steps:
  1. Connect to WebSocket
  2. Send SetMasterLock(HOST) to register
  3. Send safe GET commands to each module
  4. Record all responses and notifications

Options:
  --ip <addr>      Target IP (default: 192.168.88.1)
  --port <port>    WebSocket port (default: 9900)
  --device-id <n>  Device ID (default: 4 for DWARF mini)
  --timeout <ms>   Per-command response wait (default: 5000)
  --verbose, -v    Show detailed output
  --help, -h       Show this help

Examples:
  node cmd-survey.js --ip 192.168.11.31
  node cmd-survey.js --ip 192.168.11.31 --verbose
`;

// DWARF mini device ID
let DEVICE_ID = 4;

// Safe read-only commands to test per module
const SURVEY_COMMANDS = [
  // System module - registration first
  {
    name: "SetMasterLock(HOST)",
    mod: MODULE.SYSTEM,
    cmd: 13004,
    msgType: "ReqsetMasterLock",
    data: { lock: true },
    isSetup: true,
  },

  // Camera Tele - GET commands (read-only)
  {
    name: "Tele: GetSystemWorkingState",
    mod: MODULE.CAMERA_TELE,
    cmd: 10039,
    msgType: "ReqGetSystemWorkingState",
    data: {},
  },
  {
    name: "Tele: GetAllParams",
    mod: MODULE.CAMERA_TELE,
    cmd: 10036,
    msgType: "ReqGetAllParams",
    data: {},
  },
  {
    name: "Tele: GetAllFeatureParams",
    mod: MODULE.CAMERA_TELE,
    cmd: 10038,
    msgType: "ReqGetAllFeatureParams",
    data: {},
  },
  {
    name: "Tele: GetExpMode",
    mod: MODULE.CAMERA_TELE,
    cmd: 10008,
    msgType: "ReqGetExpMode",
    data: {},
  },
  {
    name: "Tele: GetExp",
    mod: MODULE.CAMERA_TELE,
    cmd: 10010,
    msgType: "ReqGetExp",
    data: {},
  },
  {
    name: "Tele: GetGainMode",
    mod: MODULE.CAMERA_TELE,
    cmd: 10012,
    msgType: "ReqGetGainMode",
    data: {},
  },
  {
    name: "Tele: GetGain",
    mod: MODULE.CAMERA_TELE,
    cmd: 10014,
    msgType: "ReqGetGain",
    data: {},
  },
  {
    name: "Tele: GetIrcut",
    mod: MODULE.CAMERA_TELE,
    cmd: 10032,
    msgType: "ReqGetIrcut",
    data: {},
  },

  // Camera Wide - GET commands (read-only)
  {
    name: "Wide: GetAllParams",
    mod: MODULE.CAMERA_WIDE,
    cmd: 12027,
    msgType: "ReqGetAllParams",
    data: {},
  },
  {
    name: "Wide: GetExpMode",
    mod: MODULE.CAMERA_WIDE,
    cmd: 12003,
    msgType: "ReqGetExpMode",
    data: {},
  },
  {
    name: "Wide: GetExp",
    mod: MODULE.CAMERA_WIDE,
    cmd: 12005,
    msgType: "ReqGetExp",
    data: {},
  },
  {
    name: "Wide: GetGain",
    mod: MODULE.CAMERA_WIDE,
    cmd: 12007,
    msgType: "ReqGetGain",
    data: {},
  },

  // Motor - read-only
  {
    name: "Motor: GetPosition",
    mod: MODULE.MOTOR,
    cmd: 14011,
    msgType: "ReqGetPosition",
    data: {},
  },
];

/** Load all proto files */
async function loadProtoRoot() {
  const root = new protobuf.Root();
  const protoFiles = [
    "base.proto",
    "protocol.proto",
    "camera.proto",
    "astro.proto",
    "system.proto",
    "motor_control.proto",
    "notify.proto",
    "track.proto",
    "focus.proto",
    "panorama.proto",
    "rgb.proto",
    "ble.proto",
    "shooting_schedule.proto",
  ];
  for (const file of protoFiles) {
    try {
      await root.load(path.join(PROTO_DIR, file));
    } catch {
      // skip
    }
  }
  return root;
}

/** Build a WsPacket for a given command */
function buildPacket(root, mod, cmd, msgTypeName, data) {
  const WsPacket = root.lookupType("WsPacket");

  let innerBuf = new Uint8Array(0);
  if (msgTypeName) {
    try {
      const MsgType = root.lookupType(msgTypeName);
      const innerMsg = MsgType.create(data || {});
      innerBuf = MsgType.encode(innerMsg).finish();
    } catch {
      // Empty payload if message type not found
    }
  }

  const packet = WsPacket.create({
    majorVersion: WS_MAJOR_VERSION,
    minorVersion: WS_MINOR_VERSION,
    deviceId: DEVICE_ID,
    moduleId: mod,
    cmd: cmd,
    type: MSG_TYPE.REQUEST,
    data: innerBuf,
    clientId: DEFAULT_CLIENT_ID,
  });

  return WsPacket.encode(packet).finish();
}

/** Decode a received WsPacket and try to decode inner data */
function decodePacket(root, buf) {
  try {
    const WsPacket = root.lookupType("WsPacket");
    const decoded = WsPacket.decode(buf);
    const obj = WsPacket.toObject(decoded, {
      longs: String,
      enums: String,
      bytes: String,
      defaults: true,
    });

    // Try to decode inner data based on cmd
    if (obj.data && obj.data.length > 0) {
      const innerBytes =
        typeof obj.data === "string"
          ? Buffer.from(obj.data, "base64")
          : obj.data;

      if (innerBytes.length > 0) {
        // Try known response/notify message types based on cmd
        const cmdToType = getCmdResponseType(obj.cmd, obj.type);
        if (cmdToType) {
          try {
            const InnerType = root.lookupType(cmdToType);
            const innerDecoded = InnerType.decode(innerBytes);
            obj._innerTypeName = cmdToType;
            obj._innerData = InnerType.toObject(innerDecoded, {
              longs: String,
              enums: String,
              bytes: String,
              defaults: true,
            });
          } catch {
            obj._innerHex = hexPreview(innerBytes, 64);
          }
        } else {
          obj._innerHex = hexPreview(innerBytes, 64);
        }
      }
    }

    return obj;
  } catch (e) {
    return { _error: e.message, _hex: hexPreview(buf, 64) };
  }
}

/** Map cmd + type to expected response/notify message type name */
function getCmdResponseType(cmd, type) {
  // Response mappings (type=1)
  const responseMap = {
    10039: "ResGetSystemWorkingState",
    10036: "ResGetAllParams",
    10038: "ResGetAllFeatureParams",
    10008: "ResGetExpMode",
    10010: "ResGetExp",
    10012: "ResGetGainMode",
    10014: "ResGetGain",
    10032: "ResGetIrcut",
    12027: "ResGetAllParams",
    12003: "ResGetExpMode",
    12005: "ResGetExp",
    12007: "ResGetGain",
    13000: "ResSetTime",
    13004: "ResSetMasterLock",
    14011: "ResGetPosition",
    10000: "ResOpenCamera",
    12000: "ResOpenCamera",
  };

  // Notify mappings (type=2)
  const notifyMap = {
    15200: "ResNotifyPictureMatching",
    15201: "ComResWithInt",
    15202: "ComResWithInt",
    15203: "ResNotifySDcardInfo",
    15213: "ResNotifyParam",
    15214: "ResNotifyParam",
    15215: "ResNotifyCamFunctionState",
    15216: "ResNotifyCamFunctionState",
    15221: "ResNotifyRgbState",
    15222: "ResNotifyPowerIndState",
    15223: "ResNotifyHostSlaveMode",
    15224: "ResNotifyMTPState",
    15227: "ResNotifyCPUMode",
    15229: "ResNotifyPowerOff",
    15230: "ResNotifyAlbumUpdate",
    15234: "ResNotifyStreamType",
    15243: "ResNotifyTemperature",
  };

  if (type === 1) return responseMap[cmd] || null;
  if (type === 2) return notifyMap[cmd] || null;
  return null;
}

/** Connect and run survey */
async function runSurvey(ip, port, timeout, verbose) {
  const root = await loadProtoRoot();

  log.section(`COMMAND SURVEY: ${ip}:${port} (deviceId=${DEVICE_ID})`);
  log.info(`Started at ${timestamp()}`);
  log.info(`Commands to test: ${SURVEY_COMMANDS.length}`);

  // Connect
  log.info(`\nConnecting to ws://${ip}:${port}...`);
  const ws = await new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://${ip}:${port}`, {
      handshakeTimeout: 5000,
      perMessageDeflate: false,
    });
    socket.on("open", () => resolve(socket));
    socket.on("error", (err) => reject(err));
  });
  log.ok("Connected");

  // Collect all background notifications
  const backgroundNotifications = [];
  ws.on("message", (data, isBinary) => {
    if (isBinary) {
      const decoded = decodePacket(root, new Uint8Array(data));
      backgroundNotifications.push({
        time: timestamp(),
        decoded,
      });
    }
  });

  // Wait briefly for initial notifications
  log.info("Waiting 3s for initial notifications...");
  await sleep(3000);
  if (backgroundNotifications.length > 0) {
    log.ok(
      `Received ${backgroundNotifications.length} initial notification(s)`
    );
    for (const n of backgroundNotifications) {
      logPacket(n.decoded, verbose);
    }
  }

  // Run each command
  const results = [];

  for (const cmdDef of SURVEY_COMMANDS) {
    log.info(`\n--- ${cmdDef.name} (mod=${cmdDef.mod} cmd=${cmdDef.cmd}) ---`);

    const beforeCount = backgroundNotifications.length;
    const packetBuf = buildPacket(
      root,
      cmdDef.mod,
      cmdDef.cmd,
      cmdDef.msgType,
      cmdDef.data
    );

    if (verbose) {
      log.data(`Sent: ${hexPreview(packetBuf, 48)}`);
    }

    ws.send(packetBuf);

    // Wait for response
    await sleep(timeout);
    const afterCount = backgroundNotifications.length;
    const newMessages = backgroundNotifications.slice(beforeCount);

    if (newMessages.length > 0) {
      log.ok(`Got ${newMessages.length} response(s)`);
      for (const msg of newMessages) {
        logPacket(msg.decoded, verbose);
      }
      results.push({
        name: cmdDef.name,
        mod: cmdDef.mod,
        cmd: cmdDef.cmd,
        status: "RESPONSE",
        responseCount: newMessages.length,
        responses: newMessages.map((m) => m.decoded),
      });
    } else {
      log.warn("No response");
      results.push({
        name: cmdDef.name,
        mod: cmdDef.mod,
        cmd: cmdDef.cmd,
        status: "NO_RESPONSE",
        responseCount: 0,
      });
    }
  }

  // Close connection
  ws.close(1000, "survey-complete");

  // Print summary
  printSurveySummary(results, backgroundNotifications);
}

/** Pretty-print a decoded packet */
function logPacket(decoded, verbose) {
  if (decoded._error) {
    log.fail(`  Decode error: ${decoded._error}`);
    return;
  }

  const typeNames = {
    0: "REQ",
    1: "RESP",
    2: "NOTIFY",
    3: "NRESP",
  };
  const typeName = typeNames[decoded.type] || `type=${decoded.type}`;

  let summary = `  [${typeName}] mod=${decoded.moduleId} cmd=${decoded.cmd}`;
  if (decoded._innerTypeName) {
    summary += ` → ${decoded._innerTypeName}`;
  }
  log.data(summary);

  if (decoded._innerData) {
    const inner = decoded._innerData;
    // Show compact representation
    const keys = Object.keys(inner).filter(
      (k) => inner[k] !== 0 && inner[k] !== "" && inner[k] !== false
    );
    if (keys.length > 0) {
      const compact = {};
      for (const k of keys) compact[k] = inner[k];
      log.data(`  Data: ${JSON.stringify(compact)}`);
    } else {
      log.data("  Data: (empty/default values)");
    }
  } else if (decoded._innerHex) {
    log.data(`  Raw: ${decoded._innerHex}`);
  }

  if (verbose) {
    log.data(
      `  Full: v${decoded.majorVersion}.${decoded.minorVersion} dev=${decoded.deviceId} client=${decoded.clientId}`
    );
  }
}

/** Print final summary table */
function printSurveySummary(results, allNotifications) {
  log.section("SURVEY RESULTS");

  console.log(
    "\n  %-40s  %-4s  %-5s  %-12s  %s",
    "Command",
    "Mod",
    "CMD",
    "Status",
    "Details"
  );
  console.log("  " + "-".repeat(80));

  for (const r of results) {
    const icon =
      r.status === "RESPONSE"
        ? "\x1b[32m✓\x1b[0m"
        : "\x1b[31m✗\x1b[0m";
    const details =
      r.status === "RESPONSE"
        ? `${r.responseCount} msg(s)`
        : "";

    // Use template literal for consistent formatting
    const name = r.name.padEnd(40);
    const mod = String(r.mod).padEnd(4);
    const cmd = String(r.cmd).padEnd(5);
    const status = r.status.padEnd(12);
    console.log(`  ${icon} ${name}  ${mod}  ${cmd}  ${status}  ${details}`);
  }

  const responded = results.filter((r) => r.status === "RESPONSE").length;
  const total = results.length;

  log.section("NOTIFICATION SUMMARY");
  // Group notifications by cmd
  const cmdCounts = {};
  for (const n of allNotifications) {
    const cmd = n.decoded.cmd || "unknown";
    cmdCounts[cmd] = (cmdCounts[cmd] || 0) + 1;
  }
  for (const [cmd, count] of Object.entries(cmdCounts)) {
    log.info(`  CMD ${cmd}: ${count} notification(s)`);
  }

  log.section("TOTALS");
  log.info(`Commands tested: ${total}`);
  log.ok(`Responded: ${responded}/${total}`);
  log.info(`Total notifications received: ${allNotifications.length}`);
  log.info(`Completed at ${timestamp()}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Main ---
async function main() {
  const args = parseArgs(process.argv);
  let timeout = 5000;

  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--timeout") timeout = parseInt(process.argv[++i], 10);
    if (process.argv[i] === "--device-id") DEVICE_ID = parseInt(process.argv[++i], 10);
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  try {
    await runSurvey(args.ip, args.port, timeout, args.verbose);
  } catch (e) {
    if (e.message && e.message.includes("ECONNREFUSED")) {
      log.fail("Connection refused. Is the DWARF mini powered on and connected?");
    } else if (e.message && e.message.includes("4409")) {
      log.fail("DEVICE_OCCUPIED — Close the DwarfLab app first");
    } else {
      log.fail(`Error: ${e.message}`);
      if (args.verbose && e.stack) console.error(e.stack);
    }
    process.exit(1);
  }
}

main();
