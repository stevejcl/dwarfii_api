#!/usr/bin/env node
// Binary recorder for DWARF WebSocket frames.
// Saves all frames with timestamps to captures/ directory.

import WebSocket from "ws";
import { writeFileSync, appendFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  parseArgs,
  log,
  timestamp,
  hexPreview,
  DEFAULT_IP,
  DEFAULT_WS_PORT,
} from "./common.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CAPTURES_DIR = path.resolve(__dirname, "captures");

const USAGE = `
Usage: node raw-recorder.js [options]

Record all WebSocket frames from a DWARF device.

Saves:
  - captures/session-<timestamp>.jsonl  — metadata per frame
  - captures/session-<timestamp>/       — individual binary frames

Options:
  --ip <addr>        Target IP (default: ${DEFAULT_IP})
  --port <port>      WebSocket port (default: ${DEFAULT_WS_PORT})
  --duration <sec>   Recording duration in seconds (default: 60)
  --send-ping        Send V2 "ping" every 10s to keep connection alive
  --send-cmd         Send V2 CMD 10039 at start to trigger responses
  --dry-run          Simulate recording with mock data
  --verbose, -v      Show frame contents
  --help, -h         Show this help

Output:
  Session metadata is saved as JSONL (one JSON object per line):
  {"seq":1,"dir":"recv","type":"binary","size":42,"hex":"08 01 10 09...","ts":"...","elapsed":1234}
`;

/**
 * Create session directory and metadata file.
 * @returns {{ sessionDir: string, metadataPath: string, sessionId: string }}
 */
function createSession() {
  const sessionId = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .slice(0, 19);
  const sessionDir = path.join(CAPTURES_DIR, `session-${sessionId}`);
  const metadataPath = path.join(CAPTURES_DIR, `session-${sessionId}.jsonl`);

  if (!existsSync(CAPTURES_DIR)) {
    mkdirSync(CAPTURES_DIR, { recursive: true });
  }
  mkdirSync(sessionDir, { recursive: true });

  return { sessionDir, metadataPath, sessionId };
}

/**
 * Record a single frame.
 * @param {object} params
 */
function recordFrame({
  sessionDir,
  metadataPath,
  seq,
  direction,
  type,
  data,
  startTime,
  verbose,
}) {
  const now = Date.now();
  const elapsed = now - startTime;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);

  // Save binary frame
  const framePath = path.join(
    sessionDir,
    `${String(seq).padStart(5, "0")}-${direction}-${type}.bin`
  );
  writeFileSync(framePath, buf);

  // Append metadata
  const meta = {
    seq,
    dir: direction,
    type,
    size: buf.length,
    hex: hexPreview(buf, 32),
    ts: new Date(now).toISOString(),
    elapsed,
  };
  appendFileSync(metadataPath, JSON.stringify(meta) + "\n");

  const dirIcon = direction === "recv" ? "\x1b[32m◄\x1b[0m" : "\x1b[34m►\x1b[0m";
  log.data(
    `${dirIcon} #${seq} [${elapsed}ms] ${type} ${buf.length}B ${verbose ? hexPreview(buf, 48) : ""}`
  );
}

// --- Main ---
async function main() {
  const args = parseArgs(process.argv);
  let duration = 60;
  let sendPing = false;
  let sendCmd = false;

  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--duration") {
      duration = parseInt(process.argv[++i], 10);
    }
    if (process.argv[i] === "--send-ping") sendPing = true;
    if (process.argv[i] === "--send-cmd") sendCmd = true;
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  log.section(`RAW RECORDER: ${args.ip}:${args.port}`);
  log.info(`Duration: ${duration}s`);
  log.info(`Send ping: ${sendPing}, Send CMD: ${sendCmd}`);

  if (args.dryRun) {
    log.warn("DRY-RUN mode — simulating recording");

    const { sessionDir, metadataPath, sessionId } = createSession();
    log.info(`Session: ${sessionId}`);
    log.info(`Output: ${metadataPath}`);

    // Simulate a few frames
    const startTime = Date.now();
    const mockFrames = [
      {
        seq: 1,
        direction: "send",
        type: "text",
        data: Buffer.from("ping"),
        delay: 0,
      },
      {
        seq: 2,
        direction: "recv",
        type: "text",
        data: Buffer.from("pong"),
        delay: 50,
      },
      {
        seq: 3,
        direction: "send",
        type: "binary",
        data: Buffer.from([0x08, 0x01, 0x10, 0x09, 0x18, 0x01]),
        delay: 100,
      },
      {
        seq: 4,
        direction: "recv",
        type: "binary",
        data: Buffer.from([
          0x08, 0x01, 0x10, 0x09, 0x18, 0x01, 0x20, 0x01, 0x28, 0x87, 0x4e,
          0x30, 0x01,
        ]),
        delay: 200,
      },
    ];

    for (const frame of mockFrames) {
      recordFrame({
        sessionDir,
        metadataPath,
        seq: frame.seq,
        direction: frame.direction,
        type: frame.type,
        data: frame.data,
        startTime: startTime - frame.delay,
        verbose: args.verbose,
      });
    }

    log.section("DRY-RUN COMPLETE");
    log.ok(`${mockFrames.length} mock frames recorded`);
    log.info(`Metadata: ${metadataPath}`);
    log.info(`Frames: ${sessionDir}/`);
    return;
  }

  // Real recording
  const { sessionDir, metadataPath, sessionId } = createSession();
  log.info(`Session: ${sessionId}`);
  log.info(`Output: ${metadataPath}`);

  const url = `ws://${args.ip}:${args.port}`;
  log.info(`Connecting to ${url}...`);

  const ws = new WebSocket(url, {
    handshakeTimeout: 5000,
    perMessageDeflate: false,
  });

  let seq = 0;
  const startTime = Date.now();

  await new Promise((resolve, reject) => {
    const endTimer = setTimeout(() => {
      log.info(`Recording duration (${duration}s) reached. Closing...`);
      ws.close(1000, "recording-complete");
    }, duration * 1000);

    ws.on("open", () => {
      log.ok("Connected! Recording...");
      log.info(`Press Ctrl+C to stop early. Recording for ${duration}s.`);

      // Send initial command if requested
      if (sendCmd) {
        import("./proto-decode.js").then(async () => {
          const protobuf = await import("protobufjs");
          const root = new protobuf.default.Root();
          try {
            await root.load(
              path.resolve(__dirname, "../../src/proto/base.proto")
            );
            await root.load(
              path.resolve(__dirname, "../../src/proto/camera.proto")
            );
            const WsPacket = root.lookupType("WsPacket");
            let innerBuf = new Uint8Array(0);
            try {
              const ReqType = root.lookupType("ReqGetSystemWorkingState");
              innerBuf = ReqType.encode(ReqType.create({})).finish();
            } catch {
              // empty inner payload
            }
            const packet = WsPacket.create({
              majorVersion: 1,
              minorVersion: 9,
              deviceId: 1,
              moduleId: 1,
              cmd: 10039,
              type: 0,
              data: innerBuf,
              clientId: "0000DAF2-0000-1000-8000-00805F9B34FB",
            });
            const buf = Buffer.from(WsPacket.encode(packet).finish());
            ws.send(buf);
            seq++;
            recordFrame({
              sessionDir,
              metadataPath,
              seq,
              direction: "send",
              type: "binary",
              data: buf,
              startTime,
              verbose: args.verbose,
            });
          } catch (e) {
            log.warn(`Failed to build V2 command: ${e.message}`);
          }
        });
      }

      // Ping keep-alive
      if (sendPing) {
        const pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
            seq++;
            recordFrame({
              sessionDir,
              metadataPath,
              seq,
              direction: "send",
              type: "text",
              data: Buffer.from("ping"),
              startTime,
              verbose: args.verbose,
            });
          }
        }, 10000);

        ws.on("close", () => clearInterval(pingInterval));
      }
    });

    ws.on("message", (data, isBinary) => {
      seq++;
      recordFrame({
        sessionDir,
        metadataPath,
        seq,
        direction: "recv",
        type: isBinary ? "binary" : "text",
        data: Buffer.isBuffer(data) ? data : Buffer.from(data),
        startTime,
        verbose: args.verbose,
      });
    });

    ws.on("ping", (data) => {
      seq++;
      recordFrame({
        sessionDir,
        metadataPath,
        seq,
        direction: "recv",
        type: "ws-ping",
        data: data || Buffer.alloc(0),
        startTime,
        verbose: args.verbose,
      });
    });

    ws.on("pong", (data) => {
      seq++;
      recordFrame({
        sessionDir,
        metadataPath,
        seq,
        direction: "recv",
        type: "ws-pong",
        data: data || Buffer.alloc(0),
        startTime,
        verbose: args.verbose,
      });
    });

    ws.on("close", (code, reason) => {
      clearTimeout(endTimer);
      log.info(
        `Connection closed: code=${code}, reason="${reason ? reason.toString() : ""}"`
      );
      resolve();
    });

    ws.on("error", (err) => {
      clearTimeout(endTimer);
      log.fail(`WebSocket error: ${err.message}`);
      reject(err);
    });

    // Handle Ctrl+C gracefully
    process.on("SIGINT", () => {
      clearTimeout(endTimer);
      log.info("\nSIGINT received. Closing...");
      ws.close(1000, "user-interrupted");
    });
  });

  log.section("RECORDING COMPLETE");
  log.ok(`${seq} frames recorded`);
  log.info(`Metadata: ${metadataPath}`);
  log.info(`Frames: ${sessionDir}/`);
  log.info(`Duration: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  log.info(
    `\nDecode captured data with:\n  node proto-decode.js --file ${sessionDir}/<frame>.bin`
  );
}

main().catch((e) => {
  log.fail(`Fatal error: ${e.message}`);
  process.exit(1);
});
