#!/usr/bin/env node
// HTTP endpoint prober for DWARF device.
// Tests known REST endpoints on ports 8082 (HTTP) and 8443 (HTTPS).

import http from "http";
import https from "https";
import {
  parseArgs,
  log,
  timestamp,
  DEFAULT_IP,
  DEFAULT_HTTP_PORT,
  DEFAULT_HTTPS_PORT,
  HTTP_ENDPOINTS,
} from "./common.js";

const USAGE = `
Usage: node http-probe.js [options]

Probe known HTTP endpoints on a DWARF device.

Options:
  --ip <addr>      Target IP (default: ${DEFAULT_IP})
  --timeout <ms>   Request timeout (default: 5000)
  --dry-run        Simulate with mock responses
  --verbose, -v    Show full response bodies
  --help, -h       Show this help
`;

/**
 * Make an HTTP request and return full details.
 * @param {string} url
 * @param {string} method
 * @param {number} timeout
 * @returns {Promise<object>}
 */
function httpRequest(url, method, timeout, postBody = null) {
  return new Promise((resolve) => {
    const start = Date.now();
    const isHttps = url.startsWith("https://");
    const client = isHttps ? https : http;

    const options = {
      method,
      timeout,
      rejectUnauthorized: false, // Allow self-signed certs
    };

    const req = client.request(url, options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => chunks.push(chunk));

      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        resolve({
          url,
          method,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body,
          elapsed: Date.now() - start,
          error: null,
        });
      });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({
        url,
        method,
        statusCode: null,
        statusMessage: null,
        headers: null,
        body: null,
        elapsed: Date.now() - start,
        error: "TIMEOUT",
      });
    });

    req.on("error", (e) => {
      resolve({
        url,
        method,
        statusCode: null,
        statusMessage: null,
        headers: null,
        body: null,
        elapsed: Date.now() - start,
        error: e.code || e.message,
      });
    });

    // Send POST body
    if (method === "POST") {
      const data = JSON.stringify(postBody || {});
      req.setHeader("Content-Type", "application/json");
      req.setHeader("Content-Length", Buffer.byteLength(data));
      req.write(data);
    }

    req.end();
  });
}

/**
 * Mock responses for dry-run.
 * @returns {object[]}
 */
function mockResults() {
  return [
    {
      url: "http://192.168.88.1:8082/firmwareVersion",
      method: "GET",
      statusCode: 200,
      statusMessage: "OK",
      headers: { "content-type": "application/json" },
      body: '{"version":"1.4.7.5"}',
      elapsed: 45,
      error: null,
    },
    {
      url: "http://192.168.88.1:8082/getDefaultParamsConfig",
      method: "GET",
      statusCode: 200,
      statusMessage: "OK",
      headers: { "content-type": "application/json" },
      body: '{"config":{}}',
      elapsed: 52,
      error: null,
    },
    {
      url: "http://192.168.88.1:8082/deviceInfo",
      method: "POST",
      statusCode: 200,
      statusMessage: "OK",
      headers: { "content-type": "application/json" },
      body: '{"deviceID":2,"deviceName":"DWARF3_ABC123"}',
      elapsed: 38,
      error: null,
    },
    {
      url: "https://192.168.88.1:8443/firmwareVersion",
      method: "GET",
      statusCode: null,
      statusMessage: null,
      headers: null,
      body: null,
      elapsed: 1000,
      error: "ECONNREFUSED",
    },
  ];
}

/**
 * Print a single result.
 * @param {object} result
 * @param {boolean} verbose
 */
function printResult(result, verbose) {
  if (result.error) {
    log.fail(
      `${result.method} ${result.url} — ${result.error} (${result.elapsed}ms)`
    );
    return;
  }

  const status = result.statusCode;
  const logFn =
    status >= 200 && status < 300
      ? log.ok
      : status >= 400
        ? log.warn
        : log.info;
  logFn(
    `${result.method} ${result.url} — ${status} ${result.statusMessage} (${result.elapsed}ms)`
  );

  if (result.headers) {
    const ct = result.headers["content-type"] || "unknown";
    const cl = result.headers["content-length"] || "unknown";
    const server = result.headers["server"] || "";
    log.info(`  Content-Type: ${ct}, Content-Length: ${cl}`);
    if (server) log.info(`  Server: ${server}`);

    if (verbose && result.headers) {
      log.info("  All headers:");
      for (const [k, v] of Object.entries(result.headers)) {
        console.log(`    ${k}: ${v}`);
      }
    }
  }

  if (result.body) {
    // Try to pretty-print JSON
    try {
      const parsed = JSON.parse(result.body);
      log.data(`  Body: ${JSON.stringify(parsed, null, 2).split("\n").join("\n  ")}`);
    } catch {
      const preview =
        result.body.length > 200
          ? result.body.substring(0, 200) + "..."
          : result.body;
      log.data(`  Body: ${preview}`);
    }
  }
}

// --- Main ---
async function main() {
  const args = parseArgs(process.argv);
  let timeout = 5000;

  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--timeout") {
      timeout = parseInt(process.argv[++i], 10);
    }
  }

  if (args.help) {
    console.log(USAGE);
    process.exit(0);
  }

  log.section(`HTTP PROBE: ${args.ip}`);
  log.info(`Started at ${timestamp()}`);

  if (args.dryRun) {
    log.warn("DRY-RUN mode — using mock responses");
    const results = mockResults();

    for (const r of results) {
      printResult(r, args.verbose);
    }

    log.section("SUMMARY");
    const ok = results.filter((r) => r.statusCode && r.statusCode < 400);
    const failed = results.filter((r) => r.error);
    log.info(`Success: ${ok.length}, Failed: ${failed.length}`);
    return;
  }

  const ports = [
    { port: DEFAULT_HTTP_PORT, protocol: "http" },
    { port: DEFAULT_HTTPS_PORT, protocol: "https" },
  ];

  const allResults = [];

  for (const { port, protocol } of ports) {
    log.info(`\nProbing ${protocol}://${args.ip}:${port}...`);

    for (const endpoint of HTTP_ENDPOINTS) {
      const url = `${protocol}://${args.ip}:${port}${endpoint.path}`;
      const result = await httpRequest(url, endpoint.method, timeout, endpoint.body);
      allResults.push(result);
      printResult(result, args.verbose);
    }
  }

  // Summary
  log.section("SUMMARY");
  const ok = allResults.filter((r) => r.statusCode && r.statusCode < 400);
  const failed = allResults.filter((r) => r.error);
  const httpErrors = allResults.filter(
    (r) => r.statusCode && r.statusCode >= 400
  );

  log.info(`Total probes: ${allResults.length}`);
  log.info(`Success (2xx): ${ok.length}`);
  if (httpErrors.length > 0) log.warn(`HTTP errors: ${httpErrors.length}`);
  if (failed.length > 0) log.fail(`Connection failures: ${failed.length}`);
  log.info(`Completed at ${timestamp()}`);

  // Diagnostic hints
  const fwResult = allResults.find(
    (r) =>
      r.url.includes("/firmwareVersion") &&
      r.statusCode === 200
  );
  if (fwResult) {
    try {
      const fw = JSON.parse(fwResult.body);
      log.ok(`Firmware version detected: ${JSON.stringify(fw)}`);
    } catch {
      log.ok(`Firmware endpoint responded: ${fwResult.body}`);
    }
  }

  const deviceResult = allResults.find(
    (r) => r.url.includes("/deviceInfo") && r.statusCode === 200
  );
  if (deviceResult) {
    try {
      const dev = JSON.parse(deviceResult.body);
      log.ok(`Device info: ${JSON.stringify(dev)}`);
    } catch {
      log.ok(`Device info responded: ${deviceResult.body}`);
    }
  }
}

main().catch((e) => {
  log.fail(`Fatal error: ${e.message}`);
  process.exit(1);
});
