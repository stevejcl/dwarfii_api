#!/usr/bin/env node
// Protobuf blind decoder for DWARF V3 API reverse-engineering.
// Attempts multiple decode strategies and ranks results.

import { readFileSync } from "fs";
import protobuf from "protobufjs";
import path from "path";
import { fileURLToPath } from "url";
import {
  parseArgs,
  hexPreview,
  log,
  WS_MAJOR_VERSION,
  WS_MINOR_VERSION,
  DEFAULT_CLIENT_ID,
  CMD,
  MODULE,
  MSG_TYPE,
} from "./common.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

const USAGE = `
Usage: node proto-decode.js [options] [file]

Decode binary data using multiple strategies.
Reads from file (hex or raw binary) or stdin.

Options:
  --hex <string>   Hex string to decode (e.g., "08 01 10 09 18 01")
  --file <path>    File containing binary data to decode
  --dry-run        Run with a known V2 test packet
  --verbose, -v    Show detailed output for all strategies
  --help, -h       Show this help

Examples:
  node proto-decode.js --dry-run
  node proto-decode.js --hex "08 01 10 09 18 01 20 01 28 87 4e 30 00"
  node proto-decode.js --file captures/frame-001.bin
  echo -n "binary" | node proto-decode.js
`;

/**
 * Load all .proto files and return the root namespace.
 * @returns {Promise<protobuf.Root>}
 */
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
      // Some proto files may have dependencies; skip failures
    }
  }

  return root;
}

/**
 * Strategy 1: Decode as V2 WsPacket.
 * @param {Uint8Array} data
 * @param {protobuf.Root} root
 * @returns {{ success: boolean, confidence: number, result: object|null, error: string|null }}
 */
function strategyV2WsPacket(data, root) {
  try {
    const WsPacket = root.lookupType("WsPacket");
    const decoded = WsPacket.decode(data);
    const obj = WsPacket.toObject(decoded, {
      longs: String,
      enums: String,
      bytes: String,
      defaults: true,
    });

    // Confidence scoring based on field values
    let confidence = 0;
    if (obj.majorVersion === WS_MAJOR_VERSION) confidence += 30;
    if (obj.minorVersion === WS_MINOR_VERSION) confidence += 20;
    if (obj.deviceId > 0 && obj.deviceId < 10) confidence += 15;
    if (obj.moduleId >= 0 && obj.moduleId <= 10) confidence += 10;
    if (obj.cmd >= 1 && obj.cmd <= 16000) confidence += 15;
    if (obj.type >= 0 && obj.type <= 3) confidence += 10;

    return { success: true, confidence, result: obj, error: null };
  } catch (e) {
    return { success: false, confidence: 0, result: null, error: e.message };
  }
}

/**
 * Strategy 2: Walk the wire format to extract field number + wire type pairs.
 * This works even if we don't know the proto definition.
 * @param {Uint8Array} data
 * @returns {{ success: boolean, confidence: number, result: object|null, error: string|null }}
 */
function strategyWireFormatWalk(data) {
  try {
    const reader = protobuf.Reader.create(data);
    const fields = [];
    let validFields = 0;

    while (reader.pos < reader.len) {
      const tag = reader.uint32();
      const fieldNumber = tag >>> 3;
      const wireType = tag & 7;

      if (fieldNumber < 1 || fieldNumber > 536870911) {
        return {
          success: false,
          confidence: 0,
          result: null,
          error: `Invalid field number: ${fieldNumber}`,
        };
      }

      const wireTypeNames = [
        "varint",
        "64-bit",
        "length-delimited",
        "start-group",
        "end-group",
        "32-bit",
      ];
      const wireTypeName = wireTypeNames[wireType] || `unknown(${wireType})`;

      let value;
      try {
        switch (wireType) {
          case 0: // varint
            value = reader.uint64();
            validFields++;
            break;
          case 1: // 64-bit
            value = `0x${reader.fixed64().toString(16)}`;
            validFields++;
            break;
          case 2: // length-delimited
            {
              const bytes = reader.bytes();
              // Try UTF-8 decode
              let strValue;
              try {
                strValue = new TextDecoder("utf-8", { fatal: true }).decode(
                  bytes
                );
                if (/^[\x20-\x7e]+$/.test(strValue)) {
                  value = { string: strValue, length: bytes.length };
                } else {
                  value = {
                    hex: hexPreview(bytes, 64),
                    length: bytes.length,
                  };
                }
              } catch {
                value = { hex: hexPreview(bytes, 64), length: bytes.length };
              }
              validFields++;
            }
            break;
          case 5: // 32-bit
            value = reader.fixed32();
            validFields++;
            break;
          default:
            return {
              success: false,
              confidence: 0,
              result: null,
              error: `Unsupported wire type: ${wireType}`,
            };
        }
      } catch (e) {
        return {
          success: false,
          confidence: 0,
          result: null,
          error: `Read error at field ${fieldNumber}: ${e.message}`,
        };
      }

      fields.push({ fieldNumber, wireType, wireTypeName, value });
    }

    // Confidence: more valid fields parsed = higher confidence it's protobuf
    const confidence = Math.min(90, validFields * 15);

    return {
      success: true,
      confidence,
      result: { fieldCount: fields.length, fields },
      error: null,
    };
  } catch (e) {
    return { success: false, confidence: 0, result: null, error: e.message };
  }
}

/**
 * Strategy 3: Try JSON.parse (in case the protocol switched to JSON).
 * @param {Uint8Array} data
 * @returns {{ success: boolean, confidence: number, result: object|null, error: string|null }}
 */
function strategyJsonParse(data) {
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(data);
    const parsed = JSON.parse(text);
    // JSON is valid — high confidence if it has recognizable fields
    let confidence = 50;
    if (typeof parsed === "object" && parsed !== null) {
      confidence = 70;
      if ("cmd" in parsed || "command" in parsed || "type" in parsed)
        confidence = 90;
      if ("version" in parsed || "device" in parsed) confidence = 95;
    }
    return { success: true, confidence, result: parsed, error: null };
  } catch (e) {
    return { success: false, confidence: 0, result: null, error: e.message };
  }
}

/**
 * Strategy 4: Try decoding at byte offsets 0-16.
 * Detects if a new header has been prepended before the protobuf payload.
 * @param {Uint8Array} data
 * @param {protobuf.Root} root
 * @returns {{ success: boolean, confidence: number, result: object|null, error: string|null }}
 */
function strategyOffsetScan(data, root) {
  const WsPacket = root.lookupType("WsPacket");
  const results = [];

  for (let offset = 1; offset <= Math.min(16, data.length - 4); offset++) {
    try {
      const slice = data.subarray(offset);
      const decoded = WsPacket.decode(slice);
      const obj = WsPacket.toObject(decoded, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
      });

      let confidence = 0;
      if (obj.majorVersion === WS_MAJOR_VERSION) confidence += 25;
      if (obj.minorVersion === WS_MINOR_VERSION) confidence += 15;
      if (obj.cmd >= 1 && obj.cmd <= 16000) confidence += 15;
      if (obj.type >= 0 && obj.type <= 3) confidence += 10;
      // Slight penalty for requiring offset
      confidence = Math.max(0, confidence - 5);

      if (confidence > 20) {
        const headerBytes = data.subarray(0, offset);
        results.push({
          offset,
          confidence,
          headerHex: hexPreview(headerBytes, 16),
          decoded: obj,
        });
      }
    } catch {
      // Offset didn't decode — skip
    }
  }

  if (results.length === 0) {
    return {
      success: false,
      confidence: 0,
      result: null,
      error: "No valid decode at any offset 1-16",
    };
  }

  // Return the best match
  results.sort((a, b) => b.confidence - a.confidence);
  const best = results[0];
  return {
    success: true,
    confidence: best.confidence,
    result: {
      bestOffset: best.offset,
      headerHex: best.headerHex,
      decoded: best.decoded,
      allMatches: results.map((r) => ({
        offset: r.offset,
        confidence: r.confidence,
      })),
    },
    error: null,
  };
}

/**
 * Run all strategies and rank results.
 * @param {Uint8Array} data
 * @returns {Promise<object[]>}
 */
export async function decodeAll(data) {
  log.info(`Input: ${data.length} bytes`);
  log.data(hexPreview(data, 48));

  const root = await loadProtoRoot();

  const strategies = [
    { name: "V2 WsPacket", fn: () => strategyV2WsPacket(data, root) },
    { name: "Wire Format Walk", fn: () => strategyWireFormatWalk(data) },
    { name: "JSON Parse", fn: () => strategyJsonParse(data) },
    {
      name: "Offset Scan (new header detection)",
      fn: () => strategyOffsetScan(data, root),
    },
  ];

  const results = strategies.map((s) => {
    const result = s.fn();
    return { strategy: s.name, ...result };
  });

  // Sort by confidence descending
  results.sort((a, b) => b.confidence - a.confidence);

  return results;
}

/**
 * Print decode results.
 * @param {object[]} results
 * @param {boolean} verbose
 */
function printResults(results, verbose) {
  log.section("DECODE RESULTS (ranked by confidence)");

  for (const r of results) {
    const statusIcon = r.success ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
    const confBar =
      "\x1b[32m" + "█".repeat(Math.floor(r.confidence / 10)) + "\x1b[0m" +
      "░".repeat(10 - Math.floor(r.confidence / 10));

    console.log(
      `\n  ${statusIcon} ${r.strategy}: ${confBar} ${r.confidence}%`
    );

    if (r.success) {
      if (verbose || r.confidence >= 40) {
        console.log(
          `    Result: ${JSON.stringify(r.result, null, 2).split("\n").join("\n    ")}`
        );
      }
    } else if (verbose) {
      console.log(`    Error: ${r.error}`);
    }
  }

  // Summary
  const best = results[0];
  log.section("SUMMARY");
  if (best.success && best.confidence >= 40) {
    log.ok(
      `Best match: "${best.strategy}" with ${best.confidence}% confidence`
    );
  } else if (best.success) {
    log.warn(
      `Weak match: "${best.strategy}" with ${best.confidence}% confidence — data may use an unknown format`
    );
  } else {
    log.fail("No strategy could decode the data");
  }
}

/**
 * Build a V2 test packet for --dry-run mode.
 * CMD 10039 = GetSystemWorkingState (camera tele module)
 * @param {protobuf.Root} root
 * @returns {Uint8Array}
 */
async function buildTestPacket() {
  const root = await loadProtoRoot();
  const WsPacket = root.lookupType("WsPacket");
  const ReqGetSystemWorkingState = root.lookupType("ReqGetSystemWorkingState");

  // Build inner message (empty for this command)
  const innerMsg = ReqGetSystemWorkingState.create({});
  const innerBuf = ReqGetSystemWorkingState.encode(innerMsg).finish();

  const packet = WsPacket.create({
    majorVersion: WS_MAJOR_VERSION,
    minorVersion: WS_MINOR_VERSION,
    deviceId: 1,
    moduleId: MODULE.CAMERA_TELE,
    cmd: CMD.TELE_GET_SYSTEM_WORKING_STATE,
    type: MSG_TYPE.REQUEST,
    data: innerBuf,
    clientId: DEFAULT_CLIENT_ID,
  });

  return WsPacket.encode(packet).finish();
}

/**
 * Parse hex string to Uint8Array.
 * @param {string} hex
 * @returns {Uint8Array}
 */
function parseHexString(hex) {
  const clean = hex.replace(/[^0-9a-fA-F]/g, "");
  if (clean.length % 2 !== 0) {
    throw new Error("Hex string must have even number of characters");
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

// --- Main ---
async function main() {
  const args = parseArgs(process.argv);

  // Extra args
  let hexInput = null;
  let fileInput = null;
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--hex") hexInput = process.argv[++i];
    if (process.argv[i] === "--file") fileInput = process.argv[++i];
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  let data;

  if (args.dryRun) {
    log.section("DRY-RUN: Building known V2 test packet");
    data = await buildTestPacket();
    log.info("Test packet: CMD 10039 (GetSystemWorkingState)");
  } else if (hexInput) {
    data = parseHexString(hexInput);
  } else if (fileInput) {
    data = new Uint8Array(readFileSync(fileInput));
  } else {
    // Read from stdin
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    if (chunks.length === 0) {
      console.log(USAGE);
      process.exit(1);
    }
    data = new Uint8Array(Buffer.concat(chunks));
  }

  const results = await decodeAll(data);
  printResults(results, args.verbose);
}

// Only run main() when executed directly (not when imported)
const isMain =
  process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isMain) {
  main().catch((e) => {
    log.fail(`Fatal error: ${e.message}`);
    process.exit(1);
  });
}
