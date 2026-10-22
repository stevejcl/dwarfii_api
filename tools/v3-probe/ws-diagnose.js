#!/usr/bin/env node
// WebSocket connection diagnostics for DWARF V3 API.
// Runs 7 progressive tests (A-G) to identify what changed.

import WebSocket from "ws";
import protobuf from "protobufjs";
import path from "path";
import { fileURLToPath } from "url";
import {
  parseArgs,
  log,
  timestamp,
  hexPreview,
  DEFAULT_IP,
  DEFAULT_WS_PORT,
  WS_MAJOR_VERSION,
  WS_MINOR_VERSION,
  DEFAULT_CLIENT_ID,
  CMD,
  MODULE,
  MSG_TYPE,
  PRIORITY_PORTS,
} from "./common.js";
import { decodeAll } from "./proto-decode.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

const USAGE = `
Usage: node ws-diagnose.js [options]

Run progressive WebSocket diagnostics against a DWARF device.

Tests:
  A: TCP/WS connection test
  B: Passive listen (30s) — does server send first?
  C: V2 "ping" text message — does server reply "pong"?
  D: WebSocket native ping frame
  E: V2 protobuf command (CMD 10039: GetSystemWorkingState)
  F: Decode any received data with all strategies
  G: Re-run tests on alternative ports

Options:
  --ip <addr>      Target IP (default: ${DEFAULT_IP})
  --port <port>    WebSocket port (default: ${DEFAULT_WS_PORT})
  --tests <list>   Comma-separated test list (default: A,B,C,D,E,F,G)
  --timeout <ms>   Per-test timeout (default: 10000)
  --dry-run        Simulate with mock WebSocket behavior
  --verbose, -v    Show detailed output
  --help, -h       Show this help

Examples:
  node ws-diagnose.js --ip 192.168.88.1
  node ws-diagnose.js --ip 192.168.88.1 --tests A,B,C
  node ws-diagnose.js --dry-run
`;

/** Load proto root for V2 packet construction. */
async function loadProtoRoot() {
  const root = new protobuf.Root();
  for (const file of ["base.proto", "protocol.proto", "camera.proto"]) {
    try {
      await root.load(path.join(PROTO_DIR, file));
    } catch {
      // skip
    }
  }
  return root;
}

/** Build a V2 CMD 10039 request packet. */
async function buildV2Packet(root) {
  const WsPacket = root.lookupType("WsPacket");
  let innerBuf = new Uint8Array(0);
  try {
    const ReqType = root.lookupType("ReqGetSystemWorkingState");
    const innerMsg = ReqType.create({});
    innerBuf = ReqType.encode(innerMsg).finish();
  } catch {
    // Empty inner payload is fine
  }

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
 * Create a WebSocket connection with timeout.
 * @param {string} url
 * @param {number} timeout
 * @returns {Promise<{ ws: WebSocket|null, error: string|null, elapsed: number }>}
 */
function connectWs(url, timeout) {
  return new Promise((resolve) => {
    const start = Date.now();
    let resolved = false;

    const ws = new WebSocket(url, {
      handshakeTimeout: timeout,
      perMessageDeflate: false,
    });

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        ws.terminate();
        resolve({ ws: null, error: "TIMEOUT", elapsed: Date.now() - start });
      }
    }, timeout);

    ws.on("open", () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve({ ws, error: null, elapsed: Date.now() - start });
      }
    });

    ws.on("error", (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve({
          ws: null,
          error: err.code || err.message,
          elapsed: Date.now() - start,
        });
      }
    });
  });
}

/**
 * Collect messages from a WebSocket for a given duration.
 * @param {WebSocket} ws
 * @param {number} duration - ms
 * @returns {Promise<Array<{ type: string, data: Buffer|string, time: number }>>}
 */
function collectMessages(ws, duration) {
  return new Promise((resolve) => {
    const messages = [];
    const start = Date.now();

    const onMessage = (data, isBinary) => {
      messages.push({
        type: isBinary ? "binary" : "text",
        data,
        time: Date.now() - start,
      });
    };

    const onPong = (data) => {
      messages.push({
        type: "pong",
        data: data || Buffer.alloc(0),
        time: Date.now() - start,
      });
    };

    const onPing = (data) => {
      messages.push({
        type: "server-ping",
        data: data || Buffer.alloc(0),
        time: Date.now() - start,
      });
    };

    ws.on("message", onMessage);
    ws.on("pong", onPong);
    ws.on("ping", onPing);

    setTimeout(() => {
      ws.removeListener("message", onMessage);
      ws.removeListener("pong", onPong);
      ws.removeListener("ping", onPing);
      resolve(messages);
    }, duration);
  });
}

/**
 * Wait for close with details.
 * @param {WebSocket} ws
 * @param {number} timeout
 * @returns {Promise<{ code: number|null, reason: string|null, error: string|null }>}
 */
function waitForClose(ws, timeout) {
  return new Promise((resolve) => {
    if (ws.readyState === WebSocket.CLOSED) {
      resolve({ code: null, reason: null, error: "already-closed" });
      return;
    }

    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({ code: null, reason: null, error: null }); // Didn't close = good
      }
    }, timeout);

    ws.on("close", (code, reason) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve({
          code,
          reason: reason ? reason.toString() : null,
          error: null,
        });
      }
    });
  });
}

// ========== TEST IMPLEMENTATIONS ==========

/** Test A: Basic WebSocket connection. */
async function testA(ip, port, timeout) {
  log.test("A — WebSocket Connection");
  const url = `ws://${ip}:${port}`;
  log.info(`Connecting to ${url}...`);

  const { ws, error, elapsed } = await connectWs(url, timeout);

  if (ws) {
    log.ok(`Connected in ${elapsed}ms`);
    log.info(`ReadyState: ${ws.readyState} (OPEN=${WebSocket.OPEN})`);
    ws.close(1000, "test-complete");
    return { pass: true, ws: null, elapsed };
  } else {
    log.fail(`Connection failed: ${error} (${elapsed}ms)`);
    return { pass: false, error, elapsed };
  }
}

/** Test B: Passive listen — server sends first? */
async function testB(ip, port, timeout) {
  log.test("B — Passive Listen (does server send first?)");
  const url = `ws://${ip}:${port}`;
  const listenDuration = Math.min(timeout, 30000);

  const { ws, error } = await connectWs(url, 5000);
  if (!ws) {
    log.fail(`Cannot connect: ${error}`);
    return { pass: false, error };
  }

  log.info(`Connected. Listening for ${listenDuration / 1000}s...`);

  // Also watch for unexpected close
  const closePromise = waitForClose(ws, listenDuration + 1000);
  const messages = await collectMessages(ws, listenDuration);
  const closeResult = await Promise.race([
    closePromise,
    new Promise((r) => setTimeout(() => r(null), 500)),
  ]);

  if (messages.length > 0) {
    log.ok(`Server sent ${messages.length} message(s) unprompted!`);
    for (const msg of messages) {
      log.data(
        `  [${msg.time}ms] ${msg.type}: ${
          msg.type === "binary"
            ? hexPreview(msg.data, 32)
            : msg.data.toString().substring(0, 100)
        }`
      );
    }
  } else {
    log.info("Server sent nothing during listen period");
  }

  if (closeResult && closeResult.code !== null) {
    log.warn(
      `Server closed connection: code=${closeResult.code}, reason="${closeResult.reason || ""}"`
    );
  }

  ws.terminate();
  return {
    pass: true,
    serverSentFirst: messages.length > 0,
    messageCount: messages.length,
    messages,
    closeResult,
  };
}

/** Test C: V2 text "ping" — server replies "pong"? */
async function testC(ip, port, timeout) {
  log.test('C — V2 Text "ping" → "pong"?');

  const { ws, error } = await connectWs(`ws://${ip}:${port}`, 5000);
  if (!ws) {
    log.fail(`Cannot connect: ${error}`);
    return { pass: false, error };
  }

  log.info('Sending text "ping"...');
  ws.send("ping");

  const messages = await collectMessages(ws, Math.min(timeout, 10000));
  const pongMsg = messages.find(
    (m) => m.type === "text" && m.data.toString() === "pong"
  );

  if (pongMsg) {
    log.ok(`Received "pong" after ${pongMsg.time}ms — V2 ping/pong works!`);
  } else if (messages.length > 0) {
    log.warn(
      `No "pong" received, but got ${messages.length} other message(s):`
    );
    for (const msg of messages) {
      log.data(
        `  [${msg.time}ms] ${msg.type}: ${
          msg.type === "binary"
            ? hexPreview(msg.data, 32)
            : msg.data.toString().substring(0, 100)
        }`
      );
    }
  } else {
    log.fail('No "pong" or any response received');
  }

  ws.terminate();
  return {
    pass: !!pongMsg,
    pongReceived: !!pongMsg,
    otherMessages: messages.filter((m) => m !== pongMsg),
  };
}

/** Test D: WebSocket native ping frame. */
async function testD(ip, port, timeout) {
  log.test("D — WebSocket Native Ping Frame");

  const { ws, error } = await connectWs(`ws://${ip}:${port}`, 5000);
  if (!ws) {
    log.fail(`Cannot connect: ${error}`);
    return { pass: false, error };
  }

  log.info("Sending WebSocket ping frame...");
  ws.ping(Buffer.from("probe"));

  const messages = await collectMessages(ws, Math.min(timeout, 10000));
  const pongFrame = messages.find((m) => m.type === "pong");

  if (pongFrame) {
    log.ok(`WebSocket pong received after ${pongFrame.time}ms`);
  } else {
    log.warn("No WebSocket pong frame received");
    if (messages.length > 0) {
      log.info(`But received ${messages.length} other message(s)`);
    }
  }

  ws.terminate();
  return { pass: !!pongFrame, pongReceived: !!pongFrame, messages };
}

/** Test E: Send V2 protobuf command (CMD 10039). */
async function testE(ip, port, timeout) {
  log.test("E — V2 Protobuf Command (CMD 10039: GetSystemWorkingState)");

  const root = await loadProtoRoot();
  const packetBuf = await buildV2Packet(root);

  log.info(`V2 packet built: ${packetBuf.length} bytes`);
  log.data(hexPreview(packetBuf, 48));

  const { ws, error } = await connectWs(`ws://${ip}:${port}`, 5000);
  if (!ws) {
    log.fail(`Cannot connect: ${error}`);
    return { pass: false, error };
  }

  log.info("Sending V2 command packet...");
  ws.send(packetBuf);

  const messages = await collectMessages(ws, Math.min(timeout, 15000));
  const closeResult = await Promise.race([
    waitForClose(ws, 2000),
    new Promise((r) => setTimeout(() => r(null), 2500)),
  ]);

  if (messages.length > 0) {
    log.ok(`Received ${messages.length} response(s)!`);
    for (const msg of messages) {
      log.data(
        `  [${msg.time}ms] ${msg.type}: ${
          msg.type === "binary"
            ? hexPreview(msg.data, 48)
            : msg.data.toString().substring(0, 100)
        }`
      );
    }
  } else {
    log.warn("No response to V2 command");
  }

  if (closeResult && closeResult.code !== null) {
    log.warn(
      `Server closed after command: code=${closeResult.code}, reason="${closeResult.reason || ""}"`
    );
  }

  ws.terminate();
  return {
    pass: messages.length > 0,
    messages,
    closeResult,
  };
}

/** Test F: Decode all received data from previous tests. */
async function testF(collectedData) {
  log.test("F — Decode All Received Data");

  if (collectedData.length === 0) {
    log.warn("No data was collected from previous tests to decode");
    return { pass: false, reason: "no-data" };
  }

  const results = [];
  for (let i = 0; i < collectedData.length; i++) {
    const { source, data } = collectedData[i];
    log.info(`\nDecoding message ${i + 1} from ${source}:`);

    const buf =
      typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
    const decodeResults = await decodeAll(new Uint8Array(buf));

    const best = decodeResults[0];
    if (best.success && best.confidence >= 40) {
      log.ok(`Best: "${best.strategy}" (${best.confidence}%)`);
      log.data(JSON.stringify(best.result, null, 2));
    } else {
      log.warn(
        `No high-confidence decode (best: "${best.strategy}" at ${best.confidence}%)`
      );
    }

    results.push({ source, decodeResults });
  }

  return { pass: true, results };
}

/** Test G: Re-run key tests on alternative ports. */
async function testG(ip, timeout, excludePort) {
  log.test("G — Alternative Port Scan");

  const altPorts = PRIORITY_PORTS.filter((p) => p !== excludePort);
  const results = {};

  for (const port of altPorts) {
    log.info(`\nTrying port ${port}...`);
    const url = `ws://${ip}:${port}`;
    const { ws, error, elapsed } = await connectWs(url, Math.min(timeout, 3000));

    if (ws) {
      log.ok(`Port ${port}: WebSocket connected (${elapsed}ms)`);

      // Quick listen
      const messages = await collectMessages(ws, 3000);
      if (messages.length > 0) {
        log.ok(`Port ${port}: Received ${messages.length} message(s)!`);
        for (const msg of messages) {
          log.data(
            `  ${msg.type}: ${
              msg.type === "binary"
                ? hexPreview(msg.data, 32)
                : msg.data.toString().substring(0, 100)
            }`
          );
        }
      }

      ws.terminate();
      results[port] = { open: true, messages };
    } else {
      log.info(`Port ${port}: ${error} (${elapsed}ms)`);
      results[port] = { open: false, error };
    }
  }

  return { pass: true, results };
}

// ========== DRY-RUN MOCK ==========

async function runDryRun(verbose) {
  log.section("DRY-RUN MODE");
  log.warn("Simulating tests with mock behavior\n");

  // Test A
  log.test("A — WebSocket Connection");
  log.ok("Connected in 15ms (mock)");

  // Test B
  log.test("B — Passive Listen");
  log.info("Simulating server that sends notification after 2s...");
  log.ok("Server sent 1 message(s) unprompted! (mock)");
  log.data("  [2000ms] binary: 08 01 10 09 18 01 20 01 28 87 4e 30 02 (mock)");

  // Test C
  log.test('C — V2 Text "ping" → "pong"?');
  log.ok('Received "pong" after 45ms (mock)');

  // Test D
  log.test("D — WebSocket Native Ping Frame");
  log.ok("WebSocket pong received after 12ms (mock)");

  // Test E
  log.test("E — V2 Protobuf Command");
  const root = await loadProtoRoot();
  const packetBuf = await buildV2Packet(root);
  log.info(`V2 packet built: ${packetBuf.length} bytes`);
  log.data(hexPreview(packetBuf, 48));
  log.ok("Received 1 response(s)! (mock)");

  // Test F: Decode the test packet we just built
  log.test("F — Decode Test Packet");
  log.info("Decoding the V2 test packet we built:");
  const decodeResults = await decodeAll(new Uint8Array(packetBuf));
  const best = decodeResults[0];
  if (best.success && best.confidence >= 40) {
    log.ok(`Best: "${best.strategy}" (${best.confidence}%)`);
    if (verbose) log.data(JSON.stringify(best.result, null, 2));
  }

  // Test G
  log.test("G — Alternative Ports");
  log.info("Port 9901: ECONNREFUSED (mock)");
  log.info("Port 8082: Connected but not WebSocket (mock)");

  log.section("DRY-RUN COMPLETE");
  log.ok("All mock tests passed. Ready for real device testing.");
}

// ========== MAIN ==========

async function main() {
  const args = parseArgs(process.argv);
  let testList = ["A", "B", "C", "D", "E", "F", "G"];
  let timeout = 10000;

  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--tests") {
      testList = process.argv[++i].split(",").map((t) => t.trim().toUpperCase());
    }
    if (process.argv[i] === "--timeout") {
      timeout = parseInt(process.argv[++i], 10);
    }
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  log.section(`WS DIAGNOSTICS: ${args.ip}:${args.port}`);
  log.info(`Started at ${timestamp()}`);
  log.info(`Tests: ${testList.join(", ")}`);
  log.info(`Timeout: ${timeout}ms per test`);

  if (args.dryRun) {
    await runDryRun(args.verbose);
    return;
  }

  const testResults = {};
  const collectedBinaryData = []; // For Test F

  // Test A
  if (testList.includes("A")) {
    testResults.A = await testA(args.ip, args.port, timeout);
    if (!testResults.A.pass) {
      log.fail("\nTest A failed — cannot connect. Remaining tests skipped.");
      log.info("Try: node port-scan.js --ip " + args.ip);
      printSummary(testResults);
      return;
    }
  }

  // Test B
  if (testList.includes("B")) {
    testResults.B = await testB(args.ip, args.port, timeout);
    if (testResults.B.messages) {
      for (const msg of testResults.B.messages) {
        if (msg.type === "binary") {
          collectedBinaryData.push({ source: "Test B", data: msg.data });
        }
      }
    }
  }

  // Test C
  if (testList.includes("C")) {
    testResults.C = await testC(args.ip, args.port, timeout);
  }

  // Test D
  if (testList.includes("D")) {
    testResults.D = await testD(args.ip, args.port, timeout);
  }

  // Test E
  if (testList.includes("E")) {
    testResults.E = await testE(args.ip, args.port, timeout);
    if (testResults.E.messages) {
      for (const msg of testResults.E.messages) {
        if (msg.type === "binary") {
          collectedBinaryData.push({ source: "Test E", data: msg.data });
        }
      }
    }
  }

  // Test F
  if (testList.includes("F")) {
    testResults.F = await testF(collectedBinaryData);
  }

  // Test G
  if (testList.includes("G")) {
    testResults.G = await testG(args.ip, timeout, args.port);
  }

  printSummary(testResults);
}

function printSummary(testResults) {
  log.section("DIAGNOSTIC SUMMARY");

  const testDescriptions = {
    A: "WebSocket connection",
    B: "Server sends first",
    C: 'V2 "ping"/"pong"',
    D: "WS native ping",
    E: "V2 protobuf command",
    F: "Data decode",
    G: "Alternative ports",
  };

  for (const [test, result] of Object.entries(testResults)) {
    const icon = result.pass ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
    console.log(`  ${icon} Test ${test}: ${testDescriptions[test]}`);
  }

  // Scenario detection
  console.log("");
  const a = testResults.A?.pass;
  const c = testResults.C?.pongReceived;
  const e = testResults.E?.pass;
  const b_sent = testResults.B?.serverSentFirst;
  const b_closed = testResults.B?.closeResult?.code !== undefined && testResults.B?.closeResult?.code !== null;

  if (a && e) {
    log.ok("Scenario A: WS open + V2 command works → Protocol may be largely compatible");
    log.info("Next: Compare decoded responses with V2 expectations");
  } else if (a && c && !e) {
    log.warn("Scenario B: WS open, ping works, but V2 commands fail → Proto definition may have changed");
    log.info("Next: Blind decode captured data + APK analysis");
  } else if (a && b_sent && !c) {
    log.warn("Scenario C: WS open, server sends first, no pong → New handshake required");
    log.info("Next: Analyze server's initial message for handshake requirements");
  } else if (a && b_closed) {
    log.warn("Scenario C variant: Server closes connection → May require auth handshake");
    log.info("Next: Check close code/reason, analyze with APK decompilation");
  } else if (!a) {
    log.fail("Scenario D/E: Cannot connect on port 9900");
    log.info("Next: Run port-scan.js to find open ports");
  }

  log.info(`\nCompleted at ${timestamp()}`);
}

main().catch((e) => {
  log.fail(`Fatal error: ${e.message}`);
  if (e.stack) console.error(e.stack);
  process.exit(1);
});
