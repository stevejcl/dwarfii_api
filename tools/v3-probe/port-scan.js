#!/usr/bin/env node
// TCP port scanner for DWARF device discovery.
// Scans priority ports first, then range 8000-10000.

import net from "net";
import {
  parseArgs,
  log,
  timestamp,
  PRIORITY_PORTS,
  DEFAULT_IP,
} from "./common.js";

const USAGE = `
Usage: node port-scan.js [options]

Scan TCP ports on a DWARF device to discover open services.

Options:
  --ip <addr>      Target IP (default: ${DEFAULT_IP})
  --range <start-end>  Port range to scan (default: 8000-10000)
  --concurrency <n>    Parallel connections (default: 50)
  --timeout <ms>       Connection timeout (default: 1000)
  --dry-run            Simulate scan with mock results
  --verbose, -v        Show closed ports too
  --help, -h           Show this help
`;

/**
 * Test if a single TCP port is open.
 * @param {string} host
 * @param {number} port
 * @param {number} timeout
 * @returns {Promise<{ port: number, open: boolean, banner: string|null, elapsed: number }>}
 */
function probePort(host, port, timeout) {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let banner = null;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      // Try to read a banner
      socket.once("data", (data) => {
        banner = data.toString("utf-8").trim().substring(0, 200);
      });
      // Wait briefly for banner, then close
      setTimeout(() => {
        socket.destroy();
        resolve({
          port,
          open: true,
          banner,
          elapsed: Date.now() - start,
        });
      }, 200);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ port, open: false, banner: null, elapsed: Date.now() - start });
    });

    socket.on("error", () => {
      socket.destroy();
      resolve({ port, open: false, banner: null, elapsed: Date.now() - start });
    });

    socket.connect(port, host);
  });
}

/**
 * Scan ports with concurrency limit.
 * @param {string} host
 * @param {number[]} ports
 * @param {number} concurrency
 * @param {number} timeout
 * @param {function} onResult - callback for each result
 * @returns {Promise<object[]>}
 */
async function scanPorts(host, ports, concurrency, timeout, onResult) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < ports.length) {
      const port = ports[index++];
      const result = await probePort(host, port, timeout);
      results.push(result);
      if (onResult) onResult(result);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, ports.length) },
    () => worker()
  );
  await Promise.all(workers);

  return results;
}

/**
 * Generate mock results for dry-run.
 * @returns {object[]}
 */
function mockResults() {
  return [
    { port: 8082, open: true, banner: null, elapsed: 12 },
    { port: 8092, open: true, banner: null, elapsed: 15 },
    { port: 9900, open: true, banner: null, elapsed: 8 },
    { port: 9901, open: false, banner: null, elapsed: 1000 },
    { port: 8443, open: false, banner: null, elapsed: 1000 },
    { port: 443, open: false, banner: null, elapsed: 1000 },
  ];
}

// --- Main ---
async function main() {
  const args = parseArgs(process.argv);
  let rangeStart = 8000;
  let rangeEnd = 10000;
  let concurrency = 50;
  let timeout = 1000;

  // Parse extra args
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--range") {
      const [s, e] = process.argv[++i].split("-").map(Number);
      rangeStart = s;
      rangeEnd = e;
    }
    if (process.argv[i] === "--concurrency") {
      concurrency = parseInt(process.argv[++i], 10);
    }
    if (process.argv[i] === "--timeout") {
      timeout = parseInt(process.argv[++i], 10);
    }
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  log.section(`PORT SCAN: ${args.ip}`);
  log.info(`Started at ${timestamp()}`);

  if (args.dryRun) {
    log.warn("DRY-RUN mode — using mock results");
    const results = mockResults();
    const openPorts = results.filter((r) => r.open);

    log.section("RESULTS");
    for (const r of results) {
      if (r.open) {
        log.ok(`Port ${r.port} — OPEN (${r.elapsed}ms)${r.banner ? ` banner: "${r.banner}"` : ""}`);
      } else if (args.verbose) {
        log.info(`Port ${r.port} — closed (${r.elapsed}ms)`);
      }
    }

    log.section("SUMMARY");
    log.info(`Open ports: ${openPorts.map((r) => r.port).join(", ") || "none"}`);
    return;
  }

  // Phase 1: Priority ports
  log.info(`Phase 1: Scanning ${PRIORITY_PORTS.length} priority ports...`);
  const priorityResults = await scanPorts(
    args.ip,
    PRIORITY_PORTS,
    Math.min(concurrency, PRIORITY_PORTS.length),
    timeout,
    (r) => {
      if (r.open) log.ok(`Port ${r.port} — OPEN (${r.elapsed}ms)`);
    }
  );

  const priorityOpen = new Set(
    priorityResults.filter((r) => r.open).map((r) => r.port)
  );

  // Phase 2: Range scan (excluding already-scanned priority ports)
  const rangePorts = [];
  for (let p = rangeStart; p <= rangeEnd; p++) {
    if (!PRIORITY_PORTS.includes(p)) rangePorts.push(p);
  }

  log.info(
    `Phase 2: Scanning range ${rangeStart}-${rangeEnd} (${rangePorts.length} ports, concurrency=${concurrency})...`
  );

  let scanned = 0;
  const rangeResults = await scanPorts(
    args.ip,
    rangePorts,
    concurrency,
    timeout,
    (r) => {
      scanned++;
      if (r.open) {
        log.ok(`Port ${r.port} — OPEN (${r.elapsed}ms)${r.banner ? ` banner: "${r.banner}"` : ""}`);
      }
      if (scanned % 500 === 0) {
        log.info(`Progress: ${scanned}/${rangePorts.length}`);
      }
    }
  );

  // Combine and report
  const allResults = [...priorityResults, ...rangeResults];
  const openPorts = allResults.filter((r) => r.open);

  log.section("RESULTS");
  for (const r of openPorts) {
    log.ok(`Port ${r.port} — OPEN (${r.elapsed}ms)${r.banner ? ` banner: "${r.banner}"` : ""}`);
  }

  if (args.verbose) {
    for (const r of allResults.filter((r) => !r.open)) {
      log.info(`Port ${r.port} — closed`);
    }
  }

  log.section("SUMMARY");
  log.info(`Scanned: ${allResults.length} ports`);
  log.info(`Open: ${openPorts.length} ports`);
  log.info(`Open ports: ${openPorts.map((r) => r.port).join(", ") || "none"}`);
  log.info(`Completed at ${timestamp()}`);

  // Diagnostic hints
  if (!priorityOpen.has(9900)) {
    log.warn(
      "Port 9900 (V2 WebSocket) is CLOSED — firmware may have changed the WS port"
    );
  }
  if (priorityOpen.has(9900)) {
    log.ok("Port 9900 (V2 WebSocket) is open — V2 transport layer likely intact");
  }
}

main().catch((e) => {
  log.fail(`Fatal error: ${e.message}`);
  process.exit(1);
});
