#!/usr/bin/env node
// Camera-focused test for DWARF mini.
// Opens camera then tries GET commands.
// Flow: HOST → OpenCamera → GET commands

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

let DEVICE_ID = 4;
// DWARF mini reports v1.8 — try matching it
let MAJOR_VERSION = WS_MAJOR_VERSION;
let MINOR_VERSION = 8; // mini uses 8, not 9

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

function buildPacket(root, mod, cmd, msgTypeName, data) {
  const WsPacket = root.lookupType("WsPacket");
  let innerBuf = new Uint8Array(0);
  if (msgTypeName) {
    try {
      const MsgType = root.lookupType(msgTypeName);
      innerBuf = MsgType.encode(MsgType.create(data || {})).finish();
    } catch {}
  }
  return WsPacket.encode(WsPacket.create({
    majorVersion: MAJOR_VERSION,
    minorVersion: MINOR_VERSION,
    deviceId: DEVICE_ID,
    moduleId: mod,
    cmd,
    type: MSG_TYPE.REQUEST,
    data: innerBuf,
    clientId: DEFAULT_CLIENT_ID,
  })).finish();
}

function decodeWsPacket(root, buf) {
  const WsPacket = root.lookupType("WsPacket");
  const decoded = WsPacket.decode(buf);
  return WsPacket.toObject(decoded, {
    longs: String, enums: String, bytes: String, defaults: true,
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/** Send command and wait for specific response (matching cmd or any new message) */
function sendAndWait(ws, root, packet, waitMs = 3000) {
  return new Promise(resolve => {
    const responses = [];
    const timer = setTimeout(() => {
      ws.removeListener("message", onMsg);
      resolve(responses);
    }, waitMs);

    function onMsg(data, isBinary) {
      if (!isBinary) return;
      try {
        const decoded = decodeWsPacket(root, new Uint8Array(data));
        responses.push(decoded);
      } catch (e) {
        responses.push({ _error: e.message, _hex: hexPreview(data, 64) });
      }
    }

    ws.on("message", onMsg);
    ws.send(packet);
  });
}

/** Try to decode inner data of a decoded WsPacket */
function tryDecodeInner(root, packet) {
  if (!packet.data || packet.data.length === 0) return null;
  const innerBytes = typeof packet.data === "string"
    ? Buffer.from(packet.data, "base64")
    : packet.data;
  if (innerBytes.length === 0) return null;

  // Try known mappings
  const responseMap = {
    10000: { 1: "ResOpenCamera" },
    10036: { 1: "ResGetAllParams" },
    10038: { 1: "ResGetAllFeatureParams" },
    10039: { 1: "ResGetSystemWorkingState" },
    10008: { 1: "ResGetExpMode" },
    10010: { 1: "ResGetExp" },
    10014: { 1: "ResGetGain" },
    10032: { 1: "ResGetIrcut" },
    12000: { 1: "ResOpenCamera" },
    12027: { 1: "ResGetAllParams" },
    12003: { 1: "ResGetExpMode" },
    12005: { 1: "ResGetExp" },
    12007: { 1: "ResGetGain" },
    14011: { 3: "ResGetPosition" },
    15201: { 2: "ComResWithInt" },
    15202: { 2: "ComResWithInt" },
    15203: { 2: "ResNotifySDcardInfo" },
    15213: { 2: "ResNotifyParam" },
    15214: { 2: "ResNotifyParam" },
    15215: { 2: "ResNotifyCamFunctionState" },
    15216: { 2: "ResNotifyCamFunctionState" },
    15221: { 2: "ResNotifyRgbState" },
    15223: { 2: "ResNotifyHostSlaveMode" },
    15234: { 2: "ResNotifyStreamType" },
    15243: { 2: "ResNotifyTemperature" },
  };

  const cmdMap = responseMap[packet.cmd];
  const typeName = cmdMap?.[packet.type];
  if (!typeName) return { hex: hexPreview(innerBytes, 128) };

  try {
    const InnerType = root.lookupType(typeName);
    const inner = InnerType.decode(innerBytes);
    return {
      typeName,
      data: InnerType.toObject(inner, {
        longs: String, enums: String, bytes: String, defaults: true,
      }),
    };
  } catch {
    return { typeName: typeName + " (decode failed)", hex: hexPreview(innerBytes, 128) };
  }
}

function logResponse(root, resp, prefix = "") {
  const typeNames = { 0: "REQ", 1: "RESP", 2: "NOTIFY", 3: "NRESP" };
  const tn = typeNames[resp.type] || `type=${resp.type}`;
  const inner = tryDecodeInner(root, resp);

  let line = `${prefix}[${tn}] mod=${resp.moduleId} cmd=${resp.cmd}`;
  if (inner?.typeName) line += ` → ${inner.typeName}`;
  log.data(line);

  if (inner?.data) {
    // Show non-default fields
    const nz = Object.entries(inner.data).filter(([, v]) =>
      v !== 0 && v !== "" && v !== false && v !== null
    );
    if (nz.length > 0) {
      log.data(`${prefix}  ${JSON.stringify(Object.fromEntries(nz))}`);
    }
  } else if (inner?.hex) {
    log.data(`${prefix}  Raw: ${inner.hex}`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--device-id") DEVICE_ID = parseInt(process.argv[++i], 10);
  }

  if (args.help) {
    console.log("Usage: node camera-test.js --ip <addr> [--verbose] [--device-id <n>]");
    process.exit(0);
  }

  const root = await loadProtoRoot();

  log.section(`CAMERA TEST: ${args.ip}:${args.port} (deviceId=${DEVICE_ID})`);

  // Connect
  const ws = await new Promise((resolve, reject) => {
    const s = new WebSocket(`ws://${args.ip}:${args.port}`, {
      handshakeTimeout: 5000, perMessageDeflate: false,
    });
    s.on("open", () => resolve(s));
    s.on("error", reject);
  });
  log.ok("Connected");

  // Drain initial notifications
  await sleep(2000);

  // Step 1: HOST registration
  log.test("1 — SetMasterLock(HOST)");
  let resps = await sendAndWait(ws, root,
    buildPacket(root, MODULE.SYSTEM, 13004, "ReqsetMasterLock", { lock: true }));
  for (const r of resps) logResponse(root, r, "  ");

  // Step 2: Open Tele Camera
  log.test("2 — OpenCamera TELE (mod=1, cmd=10000)");
  resps = await sendAndWait(ws, root,
    buildPacket(root, MODULE.CAMERA_TELE, 10000, "ReqOpenCamera", { binning: false, rtspEncodeType: 0 }),
    5000);
  if (resps.length === 0) {
    log.warn("No response to OpenCamera(tele)");
  } else {
    for (const r of resps) logResponse(root, r, "  ");
  }

  // Wait a bit for camera to initialize
  log.info("Waiting 3s for camera initialization...");
  await sleep(3000);

  // Step 3: Try GET commands on tele
  log.test("3 — Tele GET commands (after OpenCamera)");
  const teleGets = [
    { name: "GetSystemWorkingState", cmd: 10039, msg: "ReqGetSystemWorkingState" },
    { name: "GetAllParams", cmd: 10036, msg: "ReqGetAllParams" },
    { name: "GetExpMode", cmd: 10008, msg: "ReqGetExpMode" },
    { name: "GetExp", cmd: 10010, msg: "ReqGetExp" },
    { name: "GetGain", cmd: 10014, msg: "ReqGetGain" },
    { name: "GetIrcut", cmd: 10032, msg: "ReqGetIrcut" },
  ];

  for (const g of teleGets) {
    log.info(`  ${g.name} (${g.cmd}):`);
    resps = await sendAndWait(ws, root,
      buildPacket(root, MODULE.CAMERA_TELE, g.cmd, g.msg, {}), 3000);
    const directResp = resps.filter(r => r.cmd === g.cmd);
    const notifications = resps.filter(r => r.cmd !== g.cmd);

    if (directResp.length > 0) {
      log.ok(`  Direct response!`);
      for (const r of directResp) logResponse(root, r, "    ");
    } else if (notifications.length > 0) {
      log.warn(`  No direct response. Background notifications only:`);
      for (const r of notifications) logResponse(root, r, "    ");
    } else {
      log.warn(`  No response`);
    }
  }

  // Step 4: Open Wide Camera
  log.test("4 — OpenCamera WIDE (mod=2, cmd=12000)");
  resps = await sendAndWait(ws, root,
    buildPacket(root, MODULE.CAMERA_WIDE, 12000, "ReqOpenCamera", { binning: true }),
    5000);
  if (resps.length === 0) {
    log.warn("No response to OpenCamera(wide)");
  } else {
    for (const r of resps) logResponse(root, r, "  ");
  }

  log.info("Waiting 3s for camera initialization...");
  await sleep(3000);

  // Step 5: Try GET commands on wide
  log.test("5 — Wide GET commands (after OpenCamera)");
  const wideGets = [
    { name: "GetAllParams", cmd: 12027, msg: "ReqGetAllParams" },
    { name: "GetExpMode", cmd: 12003, msg: "ReqGetExpMode" },
    { name: "GetExp", cmd: 12005, msg: "ReqGetExp" },
    { name: "GetGain", cmd: 12007, msg: "ReqGetGain" },
  ];

  for (const g of wideGets) {
    log.info(`  ${g.name} (${g.cmd}):`);
    resps = await sendAndWait(ws, root,
      buildPacket(root, MODULE.CAMERA_WIDE, g.cmd, g.msg, {}), 3000);
    const directResp = resps.filter(r => r.cmd === g.cmd);
    const notifications = resps.filter(r => r.cmd !== g.cmd);

    if (directResp.length > 0) {
      log.ok(`  Direct response!`);
      for (const r of directResp) logResponse(root, r, "    ");
    } else if (notifications.length > 0) {
      log.warn(`  No direct response. Background notifications only:`);
      for (const r of notifications) logResponse(root, r, "    ");
    } else {
      log.warn(`  No response`);
    }
  }

  // Step 6: Close cameras cleanly
  log.test("6 — Close cameras");
  log.info("  CloseTele (10001):");
  resps = await sendAndWait(ws, root,
    buildPacket(root, MODULE.CAMERA_TELE, 10001, "ReqCloseCamera", {}), 3000);
  for (const r of resps) logResponse(root, r, "    ");

  log.info("  CloseWide (12001):");
  resps = await sendAndWait(ws, root,
    buildPacket(root, MODULE.CAMERA_WIDE, 12001, "ReqCloseCamera", {}), 3000);
  for (const r of resps) logResponse(root, r, "    ");

  // Done
  ws.close(1000, "test-complete");
  log.section("DONE");
  log.info(`Completed at ${timestamp()}`);
}

main().catch(e => {
  log.fail(`Error: ${e.message}`);
  process.exit(1);
});
