#!/usr/bin/env node
// Brute-force command testing for DWARF mini.
// Tries various combinations of deviceId, moduleId, and commands
// to find what works.

import WebSocket from "ws";
import protobuf from "protobufjs";
import path from "path";
import { fileURLToPath } from "url";
import {
  log,
  timestamp,
  hexPreview,
  DEFAULT_CLIENT_ID,
  MODULE,
  MSG_TYPE,
} from "./common.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

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

function buildPacket(root, { majorVer = 1, minorVer = 8, deviceId = 4, mod, cmd, type = 0, msgType, data, clientId = DEFAULT_CLIENT_ID }) {
  const WsPacket = root.lookupType("WsPacket");
  let innerBuf = new Uint8Array(0);
  if (msgType) {
    try {
      const MsgType = root.lookupType(msgType);
      innerBuf = MsgType.encode(MsgType.create(data || {})).finish();
    } catch {}
  }
  return WsPacket.encode(WsPacket.create({
    majorVersion: majorVer, minorVersion: minorVer,
    deviceId, moduleId: mod, cmd, type,
    data: innerBuf, clientId,
  })).finish();
}

function decodePacket(root, buf) {
  const WsPacket = root.lookupType("WsPacket");
  return WsPacket.toObject(WsPacket.decode(buf), {
    longs: String, enums: String, bytes: String, defaults: true,
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function sendAndCollect(ws, root, packet, waitMs = 2000) {
  return new Promise(resolve => {
    const responses = [];
    const onMsg = (data, isBinary) => {
      if (!isBinary) return;
      try {
        responses.push(decodePacket(root, new Uint8Array(data)));
      } catch (e) {
        responses.push({ _error: e.message });
      }
    };
    ws.on("message", onMsg);
    ws.send(packet);
    setTimeout(() => {
      ws.removeListener("message", onMsg);
      resolve(responses);
    }, waitMs);
  });
}

async function main() {
  let ip = "192.168.11.31";
  let port = 9900;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--ip") ip = process.argv[++i];
    if (process.argv[i] === "--port") port = parseInt(process.argv[++i], 10);
  }

  const root = await loadProtoRoot();

  log.section(`BRUTE-FORCE TEST: ${ip}:${port}`);

  const ws = await new Promise((resolve, reject) => {
    const s = new WebSocket(`ws://${ip}:${port}`, {
      handshakeTimeout: 5000, perMessageDeflate: false,
    });
    s.on("open", () => resolve(s));
    s.on("error", reject);
  });
  log.ok("Connected");
  await sleep(1000);

  // HOST registration
  log.info("\n=== HOST registration ===");
  let resps = await sendAndCollect(ws, root,
    buildPacket(root, { mod: 4, cmd: 13004, msgType: "ReqsetMasterLock", data: { lock: true } }));
  for (const r of resps) log.data(`  [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
  await sleep(500);

  // Test 1: OpenCamera(tele) with different deviceIds
  log.info("\n=== Test 1: OpenCamera(tele) with different deviceIds ===");
  for (const devId of [4, 2, 1, 0]) {
    log.info(`  deviceId=${devId}:`);
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { deviceId: devId, mod: 1, cmd: 10000, msgType: "ReqOpenCamera", data: { binning: false, rtspEncodeType: 0 } }), 2000);
    if (resps.length > 0) {
      for (const r of resps) log.ok(`    [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd} dev=${r.deviceId}`);
    } else {
      log.warn("    No response");
    }
  }

  // Test 2: OpenCamera(tele) with different params
  log.info("\n=== Test 2: OpenCamera(tele) different params ===");
  const teleParams = [
    { binning: true, rtspEncodeType: 0 },
    { binning: false, rtspEncodeType: 1 },
    { binning: true, rtspEncodeType: 1 },
  ];
  for (const params of teleParams) {
    log.info(`  binning=${params.binning} rtsp=${params.rtspEncodeType}:`);
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { mod: 1, cmd: 10000, msgType: "ReqOpenCamera", data: params }), 2000);
    if (resps.length > 0) {
      for (const r of resps) log.ok(`    [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
    } else {
      log.warn("    No response");
    }
  }

  // Test 3: OpenCamera(tele) with NO inner data
  log.info("\n=== Test 3: OpenCamera(tele) empty inner data ===");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { mod: 1, cmd: 10000 }), 2000);
  if (resps.length > 0) {
    for (const r of resps) log.ok(`    [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
  } else {
    log.warn("    No response");
  }

  // Test 4: GetSystemWorkingState on all module IDs
  log.info("\n=== Test 4: GetSystemWorkingState(10039) on different modules ===");
  for (const mod of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { mod, cmd: 10039, msgType: "ReqGetSystemWorkingState" }), 1500);
    const direct = resps.filter(r => r.cmd === 10039);
    if (direct.length > 0) {
      log.ok(`  mod=${mod}: GOT RESPONSE! type=${direct[0].type}`);
    } else if (resps.length > 0) {
      // Background notification, ignore
    } else {
      // No response, skip logging to keep output clean
    }
  }
  log.info("  (only responsive modules shown)");

  // Test 5: Open wide camera first, then try tele GET commands
  log.info("\n=== Test 5: Open WIDE, then try GET commands ===");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { mod: 2, cmd: 12000, msgType: "ReqOpenCamera", data: { binning: true } }), 3000);
  for (const r of resps) log.data(`  OpenWide: [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
  await sleep(2000);

  // Now try GETs on mod=2
  log.info("  GET commands on mod=2 (after wide open):");
  const wideGets = [
    { name: "GetAllParams", cmd: 12027 },
    { name: "GetExpMode", cmd: 12003 },
    { name: "GetExp", cmd: 12005 },
    { name: "GetGain", cmd: 12007 },
  ];
  for (const g of wideGets) {
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { mod: 2, cmd: g.cmd }), 2000);
    const direct = resps.filter(r => r.cmd === g.cmd);
    if (direct.length > 0) {
      log.ok(`    ${g.name}: RESPONSE! type=${direct[0].type}`);
      // Try decode inner
      if (direct[0].data) {
        const inner = typeof direct[0].data === "string"
          ? Buffer.from(direct[0].data, "base64") : direct[0].data;
        if (inner.length > 0) log.data(`      Inner: ${hexPreview(inner, 64)}`);
      }
    } else {
      log.warn(`    ${g.name}: No response`);
    }
  }

  // Test 6: Try TELE commands routed through mod=2
  log.info("\n=== Test 6: Tele commands on mod=2 (unified camera?) ===");
  const teleOnWide = [
    { name: "OpenCamera(tele cmd on wide mod)", cmd: 10000, msgType: "ReqOpenCamera", data: { binning: false } },
    { name: "GetSystemWorkingState", cmd: 10039 },
    { name: "GetAllParams(tele)", cmd: 10036 },
  ];
  for (const t of teleOnWide) {
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { mod: 2, cmd: t.cmd, msgType: t.msgType, data: t.data }), 2000);
    const direct = resps.filter(r => r.cmd === t.cmd);
    if (direct.length > 0) {
      log.ok(`  ${t.name}: RESPONSE! type=${direct[0].type} mod=${direct[0].moduleId}`);
    } else {
      log.warn(`  ${t.name}: No response`);
    }
  }

  // Test 7: Check OpenCamera(wide) response inner data
  log.info("\n=== Test 7: Inspect OpenCamera(wide) NRESP inner data ===");
  // Close and reopen to get fresh response
  await sendAndCollect(ws, root, buildPacket(root, { mod: 2, cmd: 12001, msgType: "ReqCloseCamera" }), 2000);
  await sleep(1000);
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { mod: 2, cmd: 12000, msgType: "ReqOpenCamera", data: { binning: true } }), 3000);
  for (const r of resps) {
    log.data(`  [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
    if (r.data) {
      const inner = typeof r.data === "string" ? Buffer.from(r.data, "base64") : r.data;
      if (inner.length > 0) {
        log.data(`    Inner hex: ${hexPreview(inner, 128)}`);
        // Try decode as ResOpenCamera
        try {
          const ResOpenCamera = root.lookupType("ResOpenCamera");
          const decoded = ResOpenCamera.decode(inner);
          const obj = ResOpenCamera.toObject(decoded, { longs: String, defaults: true });
          log.data(`    Decoded ResOpenCamera: ${JSON.stringify(obj)}`);
        } catch (e) {
          log.warn(`    ResOpenCamera decode failed: ${e.message}`);
        }
      }
    } else {
      log.data("    No inner data");
    }
  }

  // Test 8: Try protocol version 2.2 (HTTP reports protocol v2.2)
  log.info("\n=== Test 8: Protocol v2.2 (HTTP reported version) ===");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { majorVer: 2, minorVer: 2, mod: 1, cmd: 10000, msgType: "ReqOpenCamera", data: { binning: false } }), 2000);
  if (resps.length > 0) {
    for (const r of resps) log.ok(`  OpenTele v2.2: [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
  } else {
    log.warn("  OpenTele v2.2: No response");
  }

  resps = await sendAndCollect(ws, root,
    buildPacket(root, { majorVer: 2, minorVer: 2, mod: 1, cmd: 10039 }), 2000);
  if (resps.length > 0) {
    for (const r of resps) log.ok(`  GetState v2.2: [type=${r.type}] mod=${r.moduleId} cmd=${r.cmd}`);
  } else {
    log.warn("  GetState v2.2: No response");
  }

  // Cleanup
  await sendAndCollect(ws, root, buildPacket(root, { mod: 2, cmd: 12001, msgType: "ReqCloseCamera" }), 1000);
  ws.close(1000, "test-complete");

  log.section("DONE");
  log.info(`Completed at ${timestamp()}`);
}

main().catch(e => {
  log.fail(`Error: ${e.message}`);
  process.exit(1);
});
