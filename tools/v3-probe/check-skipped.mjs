// Check for WebSocket packets that failed to decode
import fs from "fs";
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
  const root = new protobuf.Root();
  for (const f of ["base.proto", "protocol.proto"]) {
    try {
      await root.load(path.join(PROTO_DIR, f));
    } catch {}
  }
  const WsPacket = root.lookupType("WsPacket");

  const tsvFile = process.argv[2];
  if (!tsvFile) {
    console.error("Usage: node check-skipped.mjs <tsv-file>");
    process.exit(1);
  }
  const lines = fs.readFileSync(tsvFile, "utf-8").trim().split("\n");
  const DWARF_IP = "192.168.178.110";

  let decoded = 0,
    skipped = 0,
    handshake = 0,
    pingpong = 0;
  const skippedDetails = [];

  for (const line of lines) {
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
      if (chunk.startsWith("474554") || chunk.startsWith("48545450")) {
        handshake++;
        continue;
      }
      if (chunk.length <= 8) continue;

      const raw = parseHex(chunk);

      // Check opcode
      const opcode = raw[0] & 0x0f;
      if (opcode === 0x9 || opcode === 0xa) {
        pingpong++;
        continue;
      } // ping/pong

      const ws = extractWsPayload(raw);
      if (!ws || ws.length < 4) {
        skipped++;
        skippedDetails.push({
          frame: frameNo,
          time,
          dir,
          opcode,
          rawLen: raw.length,
          first16: Buffer.from(raw.subarray(0, 16)).toString("hex"),
        });
        continue;
      }

      let pkt;
      try {
        pkt = WsPacket.decode(ws);
      } catch {
        try {
          pkt = WsPacket.decode(raw);
        } catch {
          skipped++;
          skippedDetails.push({
            frame: frameNo,
            time,
            dir,
            opcode: "decode_fail",
            wsLen: ws.length,
            first16: Buffer.from(ws.subarray(0, 16)).toString("hex"),
          });
          continue;
        }
      }

      const obj = WsPacket.toObject(pkt, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
      });
      if (
        obj.majorVersion < 1 ||
        obj.majorVersion > 3 ||
        obj.minorVersion > 30
      ) {
        skipped++;
        skippedDetails.push({
          frame: frameNo,
          time,
          dir,
          opcode: "bad_version",
          ver: `${obj.majorVersion}.${obj.minorVersion}`,
        });
        continue;
      }

      decoded++;
    }
  }

  console.log(`Decoded: ${decoded}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Handshake: ${handshake}`);
  console.log(`Ping/Pong: ${pingpong}`);

  if (skippedDetails.length > 0) {
    console.log("\n=== SKIPPED PACKETS ===");
    for (const s of skippedDetails) {
      console.log(
        `  frame=${s.frame} t=${s.time}s ${s.dir} opcode=${s.opcode} ${
          s.rawLen ? "rawLen=" + s.rawLen : ""
        } ${s.wsLen ? "wsLen=" + s.wsLen : ""} first16=${s.first16 || ""} ${
          s.ver ? "ver=" + s.ver : ""
        }`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
