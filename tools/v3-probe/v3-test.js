#!/usr/bin/env node
// Test DWARF mini with commands discovered from iPhone app pcap capture.
// Key discovery: DwarfLab app uses protocol v1.20 and completely new commands.
//
// Init sequence from pcap (2026-02-28):
//   1. SetTime (13000) + SetTimeZone (13001) — standard
//   2. Focus cmd (15011, mod=8) — new
//   3. mod=14 cmd=16405 — new (device config/status?)
//   4. mod=13 cmd=16102 — new (shooting schedule?)
//   5. Astro queries (11043×3 + 11040, mod=3) — new
//   6. GPS/Location (13010, mod=4) — new
//   7. Astro queries again (11043 + 11040 with arg 08 01)
//   8. mod=14 cmd=16404 — new (mode switch?)
//   9. OpenCamera tele (10050, mod=1) — NEW replacement for 10000!
//  10. OpenCamera wide (12036, mod=2) — NEW replacement for 12000!
//  11. Astro 11039 (tracking/live stack?) — new
//  12. mod=15 cmd=16700 — new module entirely

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

// Protocol version as seen in DwarfLab app traffic
const MAJOR_VER = 1;
const MINOR_VER = 20;

// NEW commands discovered from pcap (not in V2 proto)
const V3_CMD = {
  // Camera
  TELE_OPEN: 10050,      // replaces 10000
  WIDE_OPEN: 12036,      // replaces 12000

  // Astro (mod=3)
  ASTRO_11039: 11039,    // tracking/live stacking related?
  ASTRO_11040: 11040,    // astro query
  ASTRO_11043: 11043,    // astro config/params (called 3x with different args)

  // System (mod=4)
  SYSTEM_13010: 13010,   // GPS/location data

  // Focus (mod=8)
  FOCUS_15011: 15011,    // focus init

  // Shooting Schedule (mod=13)
  SCHEDULE_16102: 16102, // schedule related

  // NEW mod=14 (unknown function)
  MOD14_16404: 16404,    // mode switch?
  MOD14_16405: 16405,    // device config/status?

  // NEW mod=15 (unknown function)
  MOD15_16700: 16700,    // completely new module

  // Notifications from new modules
  NOTIFY_15261: 15261,   // mod=14 notification
  NOTIFY_15264: 15264,   // mod=15 notification
  NOTIFY_15267: 15267,   // mod=? notification
};

// Inner data payloads captured from app traffic (exact bytes)
const CAPTURED_DATA = {
  // SetTime: timestamp + double value
  // "13000": Buffer.from("088df486cd0611000000000000224000", "hex"), // dynamic
  // SetTimeZone: "Asia/Tokyo"
  "13001_tz": Buffer.from("0a0a417369612f546f6b796f", "hex"),
  // 15011: empty
  // 16405: empty (request), large response
  // 16102: empty
  // 11043 call 1: empty
  // 11043 call 2: field 2 = 1 (10 01)
  "11043_arg1": Buffer.from("1001", "hex"),
  // 11043 call 3: field 2 = 2 (10 02)
  "11043_arg2": Buffer.from("1002", "hex"),
  // 11040: empty
  // 13010: GPS coords (Tokyo area based on the doubles)
  "13010_gps": Buffer.from(
    "0941e7b26d62ea41401" +
    "19f8bbee9357c61401" +
    "9c84854613b751040220" +
    "6e697a5e69cac", "hex"
  ),
  // 11043 with arg field1=1: 08 01
  "11043_get1": Buffer.from("0801", "hex"),
  // 11043 with arg field1=1 field2=1: 08 01 10 01
  "11043_get1_1": Buffer.from("08011001", "hex"),
  // 11043 with arg field1=1 field2=2: 08 01 10 02
  "11043_get1_2": Buffer.from("08011002", "hex"),
  // 11040 with arg field1=1: 08 01
  "11040_get1": Buffer.from("0801", "hex"),
  // 16404 request: field 3 = {field 1 = 1}
  "16404_req": Buffer.from("1a020801", "hex"),
  // 10050 open: field 1 = 1 (08 01)
  "10050_open": Buffer.from("0801", "hex"),
  // 10050 close: empty
  // 12036 open: empty (first call), field 1 = 1 (08 01, second call)
  "12036_open_arg": Buffer.from("0801", "hex"),
  // 11039: large payload with -1 varint markers
  "11039_req": Buffer.from(
    "08ffffffffffffffffffffff0110641864" +
    "20ffffffffffffffffffffff01", "hex"
  ),
  // 16700: complex payload
  "16700_req": Buffer.from(
    "08818080808080c080021001184200", "hex"
  ),
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

function buildPacket(root, { majorVer = MAJOR_VER, minorVer = MINOR_VER, deviceId = 4, mod, cmd, type = 0, data, clientId = DEFAULT_CLIENT_ID }) {
  const WsPacket = root.lookupType("WsPacket");
  return WsPacket.encode(WsPacket.create({
    majorVersion: majorVer, minorVersion: minorVer,
    deviceId, moduleId: mod, cmd, type,
    data: data || new Uint8Array(0), clientId,
  })).finish();
}

function decodePacket(root, buf) {
  const WsPacket = root.lookupType("WsPacket");
  return WsPacket.toObject(WsPacket.decode(buf), {
    longs: String, enums: String, bytes: String, defaults: true,
  });
}

function blindDecode(buf) {
  // Walk protobuf wire format to extract field numbers and values
  const fields = [];
  let pos = 0;
  while (pos < buf.length) {
    const tag = buf[pos];
    const fieldNum = tag >> 3;
    const wireType = tag & 0x07;

    if (fieldNum === 0 || fieldNum > 100) break; // invalid

    pos++;
    if (wireType === 0) { // varint
      let val = 0n;
      let shift = 0n;
      while (pos < buf.length) {
        const b = buf[pos++];
        val |= BigInt(b & 0x7f) << shift;
        shift += 7n;
        if (!(b & 0x80)) break;
      }
      fields.push({ field: fieldNum, type: "varint", value: val <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(val) : val.toString() });
    } else if (wireType === 1) { // 64-bit
      if (pos + 8 <= buf.length) {
        const dv = new DataView(buf.buffer, buf.byteOffset + pos, 8);
        fields.push({ field: fieldNum, type: "double", value: dv.getFloat64(0, true) });
        pos += 8;
      } else break;
    } else if (wireType === 2) { // length-delimited
      let len = 0;
      let shift = 0;
      while (pos < buf.length) {
        const b = buf[pos++];
        len |= (b & 0x7f) << shift;
        shift += 7;
        if (!(b & 0x80)) break;
      }
      if (pos + len <= buf.length) {
        const data = buf.slice(pos, pos + len);
        // Try as UTF-8 string
        const str = Buffer.from(data).toString("utf-8");
        const printable = /^[\x20-\x7e]+$/.test(str);
        fields.push({
          field: fieldNum,
          type: "bytes",
          length: len,
          value: printable ? str : hexPreview(data, 64),
          nested: len > 2 ? blindDecode(data) : undefined,
        });
        pos += len;
      } else break;
    } else if (wireType === 5) { // 32-bit
      if (pos + 4 <= buf.length) {
        const dv = new DataView(buf.buffer, buf.byteOffset + pos, 4);
        fields.push({ field: fieldNum, type: "float", value: dv.getFloat32(0, true) });
        pos += 4;
      } else break;
    } else {
      break; // Unknown wire type
    }
  }
  return fields;
}

function formatBlindDecode(fields, indent = "  ") {
  return fields.map(f => {
    let s = `${indent}field${f.field} (${f.type}): ${f.value}`;
    if (f.nested && f.nested.length > 0) {
      s += "\n" + formatBlindDecode(f.nested, indent + "  ");
    }
    return s;
  }).join("\n");
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function sendAndCollect(ws, root, packet, waitMs = 3000) {
  return new Promise(resolve => {
    const responses = [];
    const onMsg = (data, isBinary) => {
      if (!isBinary) return;
      try {
        const pkt = decodePacket(root, new Uint8Array(data));
        responses.push(pkt);
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

function logResponse(r, root) {
  const typeNames = { 0: "REQ", 1: "RESP", 2: "NOTIFY", 3: "NRESP" };
  const tn = typeNames[r.type] || `type=${r.type}`;
  log.data(`  [${tn}] mod=${r.moduleId} cmd=${r.cmd} dev=${r.deviceId} v${r.majorVersion}.${r.minorVersion}`);

  if (r.data && r.data.length > 0) {
    const inner = typeof r.data === "string"
      ? Buffer.from(r.data, "base64") : r.data;
    if (inner.length > 0) {
      log.data(`    Inner hex (${inner.length}B): ${hexPreview(inner, 128)}`);
      // Blind decode
      const fields = blindDecode(new Uint8Array(inner));
      if (fields.length > 0) {
        log.data(`    Decoded:\n${formatBlindDecode(fields, "      ")}`);
      }
    }
  }
}

async function main() {
  let ip = "192.168.11.31";
  let port = 9900;
  let skipCamera = false;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--ip") ip = process.argv[++i];
    if (process.argv[i] === "--port") port = parseInt(process.argv[++i], 10);
    if (process.argv[i] === "--skip-camera") skipCamera = true;
  }

  const root = await loadProtoRoot();

  log.section(`V3 COMMAND TEST: ${ip}:${port} (protocol v${MAJOR_VER}.${MINOR_VER})`);

  const ws = await new Promise((resolve, reject) => {
    const s = new WebSocket(`ws://${ip}:${port}`, {
      handshakeTimeout: 5000, perMessageDeflate: false,
    });
    s.on("open", () => resolve(s));
    s.on("error", reject);
  });
  log.ok("Connected");
  await sleep(1000);

  let resps;

  // ===== Phase 1: System init (matches app sequence) =====
  log.section("Phase 1: System Init");

  // SetTime - use protobuf ReqSetTime if available, else manual encoding
  let timeData;
  try {
    const ReqSetTime = root.lookupType("ReqSetTime");
    const now = Math.floor(Date.now() / 1000);
    timeData = ReqSetTime.encode(ReqSetTime.create({
      timestamp: now,
      timezoneOffset: 9.0,
    })).finish();
  } catch {
    // Manual encode: field1 varint (timestamp) + field2 double (offset)
    const parts = [];
    const now = Math.floor(Date.now() / 1000);
    // field 1 varint
    parts.push(0x08);
    let val = now;
    while (val > 0x7f) {
      parts.push((val & 0x7f) | 0x80);
      val >>>= 7;
    }
    parts.push(val & 0x7f);
    // field 2 double
    parts.push(0x11);
    const db = Buffer.alloc(8);
    db.writeDoubleLE(9.0, 0);
    timeData = Buffer.concat([Buffer.from(parts), db]);
  }

  log.info("1. SetTime (13000)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.SYSTEM, cmd: 13000, data: timeData }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("2. SetTimeZone (13001)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.SYSTEM, cmd: 13001, data: CAPTURED_DATA["13001_tz"] }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 2: Focus init =====
  log.info("3. Focus cmd (15011, mod=8)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.FOCUS, cmd: V3_CMD.FOCUS_15011 }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 3: New module queries =====
  log.section("Phase 2: New Module Queries");

  log.info("4. mod=14 cmd=16405 (device config?)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: 14, cmd: V3_CMD.MOD14_16405 }), 3000);
  for (const r of resps) logResponse(r, root);

  log.info("5. mod=13 cmd=16102 (schedule?)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: 13, cmd: V3_CMD.SCHEDULE_16102 }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 4: Astro queries =====
  log.section("Phase 3: Astro Queries");

  log.info("6. Astro 11043 (no args)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043 }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("7. Astro 11043 (arg: 10 01)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043, data: CAPTURED_DATA["11043_arg1"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("8. Astro 11043 (arg: 10 02)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043, data: CAPTURED_DATA["11043_arg2"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("9. Astro 11040 (no args)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11040 }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 5: GPS/Location =====
  log.section("Phase 4: GPS/Location");

  log.info("10. System 13010 (GPS data)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 1, mod: MODULE.SYSTEM, cmd: V3_CMD.SYSTEM_13010, data: CAPTURED_DATA["13010_gps"] }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 6: Second astro round (with deviceId=4 like app does) =====
  log.section("Phase 5: Astro Queries Round 2 (deviceId=4)");

  log.info("11. Astro 11043 (arg: 08 01, dev=4)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043, data: CAPTURED_DATA["11043_get1"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("12. Astro 11043 (arg: 08 01 10 01, dev=4)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043, data: CAPTURED_DATA["11043_get1_1"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("13. Astro 11043 (arg: 08 01 10 02, dev=4)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11043, data: CAPTURED_DATA["11043_get1_2"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("14. Astro 11040 (arg: 08 01, dev=4)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11040, data: CAPTURED_DATA["11040_get1"] }), 2000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 7: Mode switch =====
  log.section("Phase 6: Mode Switch (mod=14)");

  log.info("15. mod=14 cmd=16404 (arg: 1a 02 08 01)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: 14, cmd: V3_CMD.MOD14_16404, data: CAPTURED_DATA["16404_req"] }), 3000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 8: Camera open =====
  if (!skipCamera) {
    log.section("Phase 7: Camera Open (NEW COMMANDS!)");

    log.info("16. OpenCamera TELE (10050, mod=1, arg: 08 01) — V3 NEW!");
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { deviceId: 4, mod: MODULE.CAMERA_TELE, cmd: V3_CMD.TELE_OPEN, data: CAPTURED_DATA["10050_open"] }), 3000);
    const teleOpen = resps.filter(r => r.cmd === V3_CMD.TELE_OPEN);
    if (teleOpen.length > 0) {
      log.ok("  *** TELE CAMERA RESPONDED! ***");
      for (const r of teleOpen) logResponse(r, root);
    } else {
      log.warn("  No direct response from 10050");
    }
    // Show other responses too
    for (const r of resps.filter(r => r.cmd !== V3_CMD.TELE_OPEN)) logResponse(r, root);

    log.info("17. OpenCamera WIDE (12036, mod=2, no args) — V3 NEW!");
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { deviceId: 4, mod: MODULE.CAMERA_WIDE, cmd: V3_CMD.WIDE_OPEN }), 3000);
    const wideOpen = resps.filter(r => r.cmd === V3_CMD.WIDE_OPEN);
    if (wideOpen.length > 0) {
      log.ok("  *** WIDE CAMERA RESPONDED! ***");
      for (const r of wideOpen) logResponse(r, root);
    } else {
      log.warn("  No direct response from 12036");
    }
    for (const r of resps.filter(r => r.cmd !== V3_CMD.WIDE_OPEN)) logResponse(r, root);
  }

  // ===== Phase 9: Additional new commands =====
  log.section("Phase 8: Additional V3 Commands");

  log.info("18. Astro 11039 (tracking/live stack setup?)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: MODULE.ASTRO, cmd: V3_CMD.ASTRO_11039, data: CAPTURED_DATA["11039_req"] }), 2000);
  for (const r of resps) logResponse(r, root);

  log.info("19. mod=15 cmd=16700 (new module)");
  resps = await sendAndCollect(ws, root,
    buildPacket(root, { deviceId: 4, mod: 15, cmd: V3_CMD.MOD15_16700, data: CAPTURED_DATA["16700_req"] }), 3000);
  for (const r of resps) logResponse(r, root);

  // ===== Phase 10: Camera close =====
  if (!skipCamera) {
    log.section("Phase 9: Camera Close");

    log.info("20. CloseCamera TELE (10050, no args)");
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { deviceId: 4, mod: MODULE.CAMERA_TELE, cmd: V3_CMD.TELE_OPEN }), 2000);
    for (const r of resps) logResponse(r, root);

    log.info("21. CloseCamera WIDE (12036, arg: 08 01)");
    resps = await sendAndCollect(ws, root,
      buildPacket(root, { deviceId: 4, mod: MODULE.CAMERA_WIDE, cmd: V3_CMD.WIDE_OPEN, data: CAPTURED_DATA["12036_open_arg"] }), 2000);
    for (const r of resps) logResponse(r, root);
  }

  ws.close(1000, "v3-test-complete");

  log.section("DONE");
  log.info(`V3 command test completed at ${timestamp()}`);
}

main().catch(e => {
  log.fail(`Error: ${e.message}`);
  process.exit(1);
});
