// Extract WebSocket timeline with timestamps to find photo capture commands
import protobuf from "protobufjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

function parseHex(hex) {
  const clean = hex.replace(/[^0-9a-fA-F]/g, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

function extractWsPayload(buf) {
  if (buf.length < 2) return null;
  const opcode = buf[0] & 0x0f;
  const masked = (buf[1] & 0x80) !== 0;
  let payloadLen = buf[1] & 0x7f;
  let offset = 2;
  if (opcode !== 1 && opcode !== 2) return null;
  if (payloadLen === 126) {
    if (buf.length < 4) return null;
    payloadLen = (buf[2] << 8) | buf[3];
    offset = 4;
  } else if (payloadLen === 127) {
    if (buf.length < 10) return null;
    payloadLen = (buf[6] << 24) | (buf[7] << 16) | (buf[8] << 8) | buf[9];
    offset = 10;
  }
  if (masked) {
    if (buf.length < offset + 4) return null;
    const maskKey = buf.subarray(offset, offset + 4);
    offset += 4;
    const end = Math.min(offset + payloadLen, buf.length);
    const payload = new Uint8Array(buf.subarray(offset, end));
    for (let i = 0; i < payload.length; i++) payload[i] ^= maskKey[i % 4];
    return payload;
  }
  return buf.subarray(offset, Math.min(offset + payloadLen, buf.length));
}

function parseRelativeTime(raw) {
  if (raw == null) return NaN;
  const cleaned = String(raw)
    .replace(/\u0000/g, "")
    .trim()
    .replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

async function main() {
  const tsvFile = process.argv[2];
  if (!tsvFile) {
    console.error("Usage: node ws-timeline.mjs <tsv-file>");
    process.exit(1);
  }
  const root = new protobuf.Root();
  for (const f of ["base.proto", "protocol.proto"]) {
    try {
      await root.load(path.join(PROTO_DIR, f));
    } catch {}
  }
  const WsPacket = root.lookupType("WsPacket");

  const fs = await import("fs");
  const output = fs.readFileSync(tsvFile, "utf-8");

  const DWARF_IP = "192.168.178.110";
  const typeNames = { 0: "REQ", 1: "RESP", 2: "NOTIFY", 3: "NRESP" };

  // Filter: only show App→DWARF REQ commands (skip noisy polling)
  const SKIP_CMDS = new Set([11039, 14006, 14008]); // skip polling and joystick

  for (const line of output.trim().split("\n")) {
    const normalizedLine = line.replace(/\u0000/g, "");
    const parts = normalizedLine.split("\t");
    if (parts.length < 5) continue;
    const [frameNo, timeRel, srcIp, dstIp, hexData] = parts;
    if (!hexData) continue;
    const dir = srcIp === DWARF_IP ? "DWF" : "APP";
    const timeNum = parseRelativeTime(timeRel);
    if (!Number.isFinite(timeNum)) continue;
    const time = timeNum.toFixed(1);

    for (const chunk of hexData.split(",")) {
      if (
        chunk.startsWith("474554") ||
        chunk.startsWith("48545450") ||
        chunk.length <= 8
      )
        continue;
      const raw = parseHex(chunk);
      const ws = extractWsPayload(raw);
      if (!ws || ws.length < 4) continue;
      let pkt;
      try {
        pkt = WsPacket.decode(ws);
      } catch {
        try {
          pkt = WsPacket.decode(raw);
        } catch {
          continue;
        }
      }
      const obj = WsPacket.toObject(pkt, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
      });
      if (obj.majorVersion < 1 || obj.majorVersion > 3 || obj.minorVersion > 30)
        continue;
      if (SKIP_CMDS.has(obj.cmd)) continue;

      const tn = typeNames[obj.type] || "?";
      // Only show REQ commands from app (these are the interesting actions)
      if (dir === "APP" && obj.type === 0) {
        let dataHex = "";
        if (obj.data && obj.data.length > 0) {
          const inner =
            typeof obj.data === "string"
              ? Buffer.from(obj.data, "base64")
              : obj.data;
          if (inner.length > 0)
            dataHex = ` data=${Buffer.from(inner)
              .toString("hex")
              .substring(0, 60)}`;
        }
        console.log(
          `t=${time.padStart(7)}s  frame=${frameNo.padStart(
            6
          )}  ${dir} ${tn}  dev=${obj.deviceId} mod=${obj.moduleId} cmd=${
            obj.cmd
          }${dataHex}`
        );
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
