# v3-probe — DWARF V3 Protocol Diagnostic Toolkit

Reverse-engineering tools for the DWARF mini / II / 3 WebSocket protocol (port 9900).
These tools help capture, decode, and analyze the V2/V3 protobuf-based protocol used between the DwarfLab smartphone app and the device.

## Prerequisites

```bash
cd tools/v3-probe
npm install
```

- **Node.js** >= 18 (ES modules)
- **tshark** (Wireshark CLI) — required by `pcap-decode.js`
- **Protobuf definitions** — loaded from `../../src/proto/*.proto`

## Tools Overview

### Packet Capture Analysis

| Tool | Description |
|------|-------------|
| `pcap-decode.js` | Decode WsPacket protobuf from `.pcap` files via tshark |
| `proto-decode.js` | Blind protobuf decoder with 4 strategies and confidence ranking |
| `ws-timeline.mjs` | Extract WebSocket timeline with timestamps |
| `ws-gap-check.mjs` | Analyze gaps in WebSocket traffic |
| `check-skipped.mjs` | Find packets that failed to decode |

### Live Device Diagnostics

| Tool | Description |
|------|-------------|
| `ws-diagnose.js` | 7-stage progressive WebSocket diagnostics (Tests A–G) |
| `ws-proxy.js` | MitM proxy — sits between phone app and DWARF, logs all traffic |
| `raw-recorder.js` | Record all WebSocket frames to `captures/` as JSONL + binary |
| `cmd-survey.js` | Systematic read-only command survey across all modules |
| `notify-listener.js` | Long-running listener for device-initiated notifications |

### Discovery

| Tool | Description |
|------|-------------|
| `port-scan.js` | TCP port scanner (priority ports first, then 8000–10000) |
| `http-probe.js` | Probe known REST endpoints on ports 8082/8443 |

### Device Testing

| Tool | Description |
|------|-------------|
| `v3-test.js` | Replay V3 init sequence discovered from DwarfLab app pcap |
| `camera-test.js` | Camera-focused test — open camera then try GET commands |
| `camera-stream-test.cjs` | Replicate app init sequence for MJPEG stream |
| `brute-test.js` | Brute-force command testing with various deviceId/moduleId combos |

### Shared

| File | Description |
|------|-------------|
| `common.js` | Constants (CMD IDs, module IDs, ports), CLI parser, hex helpers |

## Usage

### Decode a pcap capture

```bash
# Requires tshark installed
node pcap-decode.js /path/to/capture.pcap
```

Output: color-coded packet stream showing direction, command name, and decoded inner message.

```
# 1  App→DWARF [REQ   ] v1.20 dev=4 mod=4 cmd=13000 SetTime → ReqSetTime: {"year":"2026",...}
# 2  DWARF→App [RESP  ] v1.20 dev=4 mod=4 cmd=13000 SetTime → ResSetTime: {"code":"0"}
# 3  App→DWARF [REQ   ] v1.20 dev=4 mod=1 cmd=10050 V3:OpenTele → V3ReqOpenTeleCamera: {"action":"1"}
```

### Blind decode binary/hex data

```bash
# Hex string
node proto-decode.js --hex "08 01 10 09 18 01 20 01 28 87 4e 30 00"

# Binary file
node proto-decode.js --file captures/frame-001.bin

# Stdin
cat frame.bin | node proto-decode.js

# Demo with a known V2 test packet
node proto-decode.js --dry-run
```

Strategies (ranked by confidence):
1. **V2 WsPacket** — direct protobuf decode against `WsPacket` schema
2. **Wire Format Walk** — field-by-field protobuf parsing without schema
3. **JSON Parse** — fallback for JSON-based protocols
4. **Offset Scan** — detect prepended headers (tries offsets 1–16)

### Run live diagnostics

```bash
# 7-stage progressive WebSocket test
node ws-diagnose.js --ip 192.168.88.1

# Run specific tests only
node ws-diagnose.js --ip 192.168.88.1 --tests A,B,C

# Available tests:
#   A: TCP/WS connection
#   B: Passive listen (server-initiated messages)
#   C: V2 text ping/pong
#   D: WebSocket native ping frames
#   E: V2 protobuf command execution
#   F: Multi-strategy decode of collected data
#   G: Alternative port scan
```

### MitM proxy

```bash
node ws-proxy.js --target-ip 192.168.88.1

# Phone app ←→ [Proxy :9900] ←→ DWARF device :9900
# Logs all bidirectional traffic with protobuf decoding
```

### Record WebSocket frames

```bash
node raw-recorder.js --ip 192.168.88.1 --duration 120

# Outputs:
#   captures/session-<timestamp>.jsonl   — frame metadata
#   captures/session-<timestamp>/        — individual binary frames
```

### Discover device services

```bash
# Port scan
node port-scan.js --ip 192.168.88.1

# HTTP endpoint probe
node http-probe.js --ip 192.168.88.1
```

### Command survey

```bash
# Send safe read-only GET commands to all modules
node cmd-survey.js --ip 192.168.88.1
```

## Common Options

Tools using `common.js` `parseArgs()` share these CLI options:

```
--ip <addr>      Target IP (default: 192.168.88.1)
--port <port>    WebSocket port (default: 9900)
--verbose, -v    Show detailed output
--help, -h       Show usage
```

Some tools support additional options:
- `proto-decode.js` supports `--dry-run` for demo mode without device connection
- `ws-proxy.js` uses `--target-ip` / `--target-port` instead of `--ip` / `--port`
- `pcap-decode.js` and analysis scripts (`.mjs`) take file paths as positional arguments

## Known DWARF mini Ports

| Port | Protocol | Service |
|------|----------|---------|
| 80 | HTTP | Static file server (FITS, JPG, thumbnails) |
| 554 | RTSP | Wide camera stream (H.265 1080p) |
| 8082 | HTTP/JSON | REST API (deviceInfo, album, shooting modes) |
| 8092 | MJPEG | Tele camera stream (`/mainstream`) |
| 9900 | WebSocket | V2/V3 protobuf control protocol |

## `captures/` Directory

Pcap captures and recorded sessions are stored here. Ignored by `.gitignore` (large binary files).

## Protocol Notes

- **V2**: `majorVersion=1, minorVersion=9` — original DWARF II protocol
- **V3**: `majorVersion=1, minorVersion=20` — DWARF mini uses new command IDs (e.g., CMD 10050 replaces 10000)
- **deviceId**: `1` = DWARF II, `4` = DWARF mini
- **WsPacket**: outer protobuf envelope containing `cmd`, `type`, `moduleId`, and inner `data` payload
- Inner `data` is decoded using command-specific protobuf messages (see `INNER_TYPES` in `pcap-decode.js`)

See `common.js` for the full list of known command IDs and module definitions.
