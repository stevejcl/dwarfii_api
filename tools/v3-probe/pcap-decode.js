#!/usr/bin/env node
// Decode WsPacket protobuf data extracted from pcap via tshark.
// Reads hex data from stdin (one packet per line) and decodes each.

import protobuf from "protobufjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { log, hexPreview } from "./common.js";
import { decodeParamId } from "../../src/paramid_utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../src/proto");

// Known command names
const CMD_NAMES = {
  // V2 Tele camera
  10000: "OpenCamera(tele)",
  10001: "CloseCamera(tele)",
  10007: "SetExpMode(tele)",
  10008: "GetExpMode(tele)",
  10009: "SetExp(tele)",
  10010: "GetExp(tele)",
  10013: "SetGain(tele)",
  10014: "GetGain(tele)",
  10031: "SetIrcut",
  10032: "GetIrcut",
  10035: "SetAllParams(tele)",
  10036: "GetAllParams(tele)",
  10037: "SetFeatureParam",
  10038: "GetAllFeatureParams",
  10039: "GetSystemWorkingState",
  // V3 Tele camera
  10050: "V3:OpenTele",
  // V2 Astro
  11000: "StartCalibration",
  11002: "StartGotoDSO",
  11005: "StartStacking",
  11010: "GoLive",
  11013: "OneClickGotoDSO",
  11015: "StopOneClickGoto",
  11018: "StartEqSolving",
  // V3 Astro
  11033: "V3:SaveStacked",
  11034: "V3:ListSaved",
  11036: "V3:SaveComplete",
  11039: "V3:StatusPoll",
  11040: "V3:GetAstroParams",
  11041: "V3:SetAstroParams",
  11043: "V3:GetExpPresets",
  11047: "V3:SetObsLocation",
  11048: "V3:ConfirmObs",
  // V2 Wide camera
  12000: "OpenCamera(wide)",
  12001: "CloseCamera(wide)",
  12027: "GetAllParams(wide)",
  12028: "SetAllParams(wide)",
  // V3 Wide camera
  12036: "V3:OpenWide",
  // V2 System
  13000: "SetTime",
  13001: "SetTimeZone",
  13004: "SetMasterLock",
  // V3 System
  13010: "V3:SetGPS",
  // V2 RGB
  13500: "OpenRGB",
  13501: "CloseRGB",
  13503: "RGB:PowerIndicatorOn",
  13504: "RGB:PowerIndicatorOff",
  // V2 Motor
  14000: "MotorRun",
  14011: "MotorGetPosition",
  // V2 Focus
  15000: "AutoFocus",
  15001: "ManualSingleStepFocus",
  15004: "AstroAutoFocusStart",
  // V3 Focus
  15011: "V3:FocusInit",
  // V2 Notifications
  15200: "N:WidiMatch",
  15201: "N:Battery",
  15202: "N:Charge",
  15203: "N:SDCard",
  15204: "N:RecordTime",
  15208: "N:OperationState",
  15209: "N:RawLiveStackProg",
  15210: "N:AstroCalibState",
  15213: "N:TeleParam",
  15214: "N:WideParam",
  15215: "N:TeleFuncState",
  15216: "N:WideFuncState",
  15217: "N:SetFeatureParam",
  15221: "N:RGB",
  15222: "N:PowerIndState",
  15223: "N:HostSlave",
  15233: "N:OneClickGoto",
  15234: "N:StreamType",
  15239: "N:EqSolvingState",
  15243: "N:Temperature",
  15257: "N:Focus",
  // V3 Notifications
  15255: "N:V3ExpProgress",
  15261: "N:V3DeviceState",
  15264: "N:V3CameraParam",
  15267: "N:V3ModeChange",
  15270: "N:V3StackingData",
  15273: "N:V3PhotoState",
  15274: "N:V3BurstState",
  15275: "N:V3VideoState",
  15276: "N:V3TimelapseState",
  15278: "N:V3AutoFocus",
  15285: "N:V3PhotoBurstProg",
  15286: "N:V3VideoProg",
  15287: "N:V3TimelapseProg",
  15292: "N:V3Temp2",
  15296: "N:V3ObsState",
  15280: "N:V3AutoFocusAlt",
  // V3 Schedule
  16102: "V3:GetSchedule",
  // V3 Device Config (mod=14)
  16402: "V3:ModeQuery",
  16403: "V3:ShootModeSwitch",
  16404: "V3:ModeSwitch",
  16405: "V3:GetDevConfig",
  // V3 Camera Params (mod=15)
  16700: "V3:SetCameraParam",
  16701: "V3:SetExpGain",
  16703: "V3:AdjustParam",
  16706: "V3:StreamCtrl",
};

// Response/Notify inner message types
const INNER_TYPES = {
  // --- type=0 (REQ) ---
  // V2
  "11000:0": "ReqStartCalibration",
  "11013:0": "ReqOneClickGotoDSO",
  // V3
  "10050:0": "V3ReqOpenTeleCamera",
  "12036:0": "V3ReqOpenWideCamera",
  "11033:0": "V3ReqSaveStackedImage",
  "11034:0": "V3ReqListSavedImages",
  "11039:0": "V3ReqStatusPolling",
  "11040:0": "V3ReqGetAstroParams",
  "11041:0": "V3ReqSetAstroParams",
  "11043:0": "V3ReqGetExposurePresets",
  "11047:0": "V3ReqSetObservationLocation",
  "11048:0": "V3ReqConfirmObservation",
  "13010:0": "V3ReqSetGPSLocation",
  "15011:0": "V3ReqFocusInit",
  "16102:0": "ReqGetAllShootingSchedule",
  "16402:0": "V3ReqModeQuery",
  "16403:0": "V3ReqShootingModeSwitch",
  "16404:0": "V3ReqModeSwitch",
  "16405:0": "V3ReqGetDeviceConfig",
  "16700:0": "V3ReqSetCameraParam",
  "16701:0": "V3ReqSetExposureGain",
  "16703:0": "V3ReqAdjustParam",
  "16706:0": "V3ReqStreamControl",

  // --- type=1 (RESP) ---
  // V2
  "10000:1": "ResOpenCamera",
  "10001:1": "ResCloseCamera",
  "12000:1": "ResOpenCamera",
  "12001:1": "ResCloseCamera",
  "10036:1": "ResGetAllParams",
  "10038:1": "ResGetAllFeatureParams",
  "10039:1": "ResGetSystemWorkingState",
  "12027:1": "ResGetAllParams",
  "13000:1": "ResSetTime",
  "13004:1": "ResSetMasterLock",
  "11013:1": "ResOneClickGoto",
  // V3
  "10050:1": "ComResponse",
  "12036:1": "ComResponse",
  "11033:1": "V3ResSaveStackedImage",
  "11034:1": "ComResponse",
  "11039:1": "ComResponse",
  "11040:1": "V3ResGetAstroParams",
  "11041:1": "V3ResSetAstroParams",
  "11043:1": "V3ResGetExposurePresets",
  "11047:1": "ComResponse",
  "11048:1": "ComResponse",
  "13010:1": "ComResponse",
  "15011:1": "V3ResFocusInit",
  "16102:1": "ResGetAllShootingSchedule",
  "16402:1": "V3ResModeQuery",
  "16403:1": "V3ResShootingModeSwitch",
  "16404:1": "V3ResModeSwitch",
  "16405:1": "V3ResGetDeviceConfig",
  "16700:1": "ComResponse",
  "16701:1": "ComResponse",
  "16703:1": "ComResponse",
  "16706:1": "ComResponse",

  // --- type=2 (NOTIFY) ---
  // V2
  "15200:2": "ResNotifyPictureMatching",
  "15201:2": "ComResWithInt",
  "15202:2": "ComResWithInt",
  "15203:2": "ResNotifySDcardInfo",
  "15204:2": "ResNotifyRecordTime",
  "15208:2": "ResNotifyOperationState",
  "15209:2": "ResNotifyProgressCaptureRawLiveStacking",
  "15210:2": "ResNotifyStateAstroCalibration",
  "15213:2": "ResNotifyParam",
  "15214:2": "ResNotifyParam",
  "15215:2": "ResNotifyCamFunctionState",
  "15216:2": "ResNotifyCamFunctionState",
  "15217:2": "ResNotifyParam",
  "15221:2": "ResNotifyRgbState",
  "15222:2": "ResNotifyPowerIndState",
  "15223:2": "ResNotifyHostSlaveMode",
  "15233:2": "ResNotifyOneClickGotoState",
  "15256:2": "CalibrationResult",
  "15234:2": "ResNotifyStreamType",
  "15243:2": "ResNotifyTemperature",
  "15257:2": "ResNotifyFocus",
  // V3
  "15255:2": "V3ResNotifyExposureProgress",
  "15261:2": "V3ResNotifyDeviceState",
  "15264:2": "V3ResNotifyCameraParamState",
  "15267:2": "V3ResNotifyModeChange",
  "15270:2": "V3ResNotifyStackingData",
  "15273:2": "V3ResNotifyPhotoState",
  "15274:2": "V3ResNotifyBurstState",
  "15275:2": "V3ResNotifyVideoState",
  "15276:2": "V3ResNotifyTimelapseState",
  "15278:2": "V3ResNotifyAutoFocusState",
  "15285:2": "V3ResNotifyPhotoBurstProgress",
  "15286:2": "V3ResNotifyVideoProgress",
  "15287:2": "V3ResNotifyTimelapseProgress",
  "15292:2": "V3ResNotifyTemperature2",
  "15296:2": "V3ResNotifyObservationState",

  // --- type=3 (NRESP) ---
  // V2
  "10000:3": "ResOpenCamera",
  "12000:3": "ResOpenCamera",
  "10001:3": "ResCloseCamera",
  "12001:3": "ResCloseCamera",
  "10039:3": "ResGetSystemWorkingState",
  "14011:3": "ResGetPosition",
  "13004:3": "ResSetMasterLock",
  "11000:3": "ComResponse",
  "11013:3": "ResOneClickGoto",
  // V3
  "10050:3": "ComResponse",
  "12036:3": "ComResponse",
  "11033:3": "V3ResSaveStackedImage",
  "11036:3": "ComResponse",
  "11048:3": "ComResponse",
  "16402:3": "V3ResModeQuery",
  "16403:3": "V3ResShootingModeSwitch",
  "16404:3": "V3ResModeSwitch",
  "16700:3": "ComResponse",
  "16701:3": "ComResponse",
  "16703:3": "ComResponse",
  "16706:3": "ComResponse",
};

// ParamId decoder for human-readable display (uses shared decodeParamId)
const PARAM_INDEX_NAMES = {
  0x0d: "filterWheel",
  0x10: "frameCount",
};
const SHOOTING_MODE_NAMES = ["photo", "video", "astro"];
const CAMERA_ID_NAMES = ["tele", "wide"];

function formatParamId(paramId) {
  try {
    const { shootingMode, category, cameraId, paramIndex } =
      decodeParamId(paramId);
    const modeName = SHOOTING_MODE_NAMES[shootingMode] || `mode${shootingMode}`;
    const camName = CAMERA_ID_NAMES[cameraId] || `cam${cameraId}`;
    const idxName = PARAM_INDEX_NAMES[paramIndex] || `idx${paramIndex}`;
    return `${modeName}/cat${category}/${camName}/${idxName}`;
  } catch {
    return String(paramId);
  }
}

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
    "device_config.proto",
    "camera_params.proto",
    "v3_camera.proto",
    "v3_notify.proto",
    "v3_astro.proto",
    "v3_system.proto",
    "v3_focus.proto",
  ];
  for (const file of protoFiles) {
    try {
      await root.load(path.join(PROTO_DIR, file));
    } catch {}
  }
  return root;
}

function parseHex(hex) {
  const clean = hex.replace(/[^0-9a-fA-F]/g, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Extract WebSocket payload from a raw TCP payload containing a WS frame.
 * Handles masking (client→server frames are XOR-masked per RFC 6455).
 */
function extractWsPayload(buf) {
  if (buf.length < 2) return null;

  const byte0 = buf[0];
  const byte1 = buf[1];
  const opcode = byte0 & 0x0f;
  const masked = (byte1 & 0x80) !== 0;
  let payloadLen = byte1 & 0x7f;
  let offset = 2;

  // Text (1) or Binary (2) frames only; skip close/ping/pong
  if (opcode !== 1 && opcode !== 2) return null;

  if (payloadLen === 126) {
    if (buf.length < 4) return null;
    payloadLen = (buf[2] << 8) | buf[3];
    offset = 4;
  } else if (payloadLen === 127) {
    if (buf.length < 10) return null;
    // 64-bit length, but we only handle up to 32-bit
    payloadLen = (buf[6] << 24) | (buf[7] << 16) | (buf[8] << 8) | buf[9];
    offset = 10;
  }

  let maskKey;
  if (masked) {
    if (buf.length < offset + 4) return null;
    maskKey = buf.subarray(offset, offset + 4);
    offset += 4;
  }

  const end = Math.min(offset + payloadLen, buf.length);
  const payload = new Uint8Array(buf.subarray(offset, end));

  // Unmask if needed
  if (masked && maskKey) {
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= maskKey[i % 4];
    }
  }

  return payload;
}

async function main() {
  const debug = process.argv.includes("--debug");
  const defaultBase =
    process.env.HOME || process.env.USERPROFILE || process.cwd();
  const defaultPcap = path.resolve(defaultBase, "iphone-capture.pcap");
  const pcapArg = process.argv.slice(2).find((a) => !a.startsWith("-"));
  const pcapFile = pcapArg ? path.resolve(pcapArg) : defaultPcap;

  log.info(`Using pcap: ${pcapFile}${pcapArg ? " (arg)" : " (default)"}`);
  if (!fs.existsSync(pcapFile)) {
    log.fail(`Pcap not found: ${pcapFile}`);
    process.exit(1);
  }

  const root = await loadProtoRoot();
  const WsPacket = root.lookupType("WsPacket");
  let DwarfCmdEnum = null;
  try {
    DwarfCmdEnum = root.lookupEnum("DwarfCMD");
  } catch {
    DwarfCmdEnum = null;
  }

  function getCmdEnumName(cmdId) {
    if (!DwarfCmdEnum || !DwarfCmdEnum.valuesById) return null;
    return DwarfCmdEnum.valuesById[cmdId] || null;
  }

  const tsharkExe =
    process.env.TSHARK_PATH ||
    [
      "C:\\Program Files\\Wireshark\\tshark.exe",
      "C:\\Program Files (x86)\\Wireshark\\tshark.exe",
    ].find((p) => fs.existsSync(p)) ||
    "tshark";

  log.section("PCAP DECODE — DwarfLab App Traffic");

  // Prefer websocket.payload (already de-framed/de-masked); keep tcp.payload fallback.
  const tsharkCmd = `"${tsharkExe}" -r "${pcapFile}" -Y "tcp.port == 9900 && tcp.len > 0" -T fields -E separator=/t -e frame.number -e frame.time_relative -e ip.src -e ip.dst -e websocket.payload -e tcp.payload`;

  let output;
  try {
    output = execSync(tsharkCmd, {
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (e) {
    const stdout = (e.stdout || "").toString();
    const stderr = (e.stderr || "").toString();
    const combined = `${stdout}\n${stderr}`.trim();
    // tshark may exit non-zero for truncated pcap but still emit parseable rows.
    if (combined && combined.includes("\t")) {
      output = combined;
    } else {
      log.fail(
        `tshark error: ${(stderr || e.message || "unknown error").trim()}`
      );
      process.exit(1);
    }
  }

  const lines = output
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && l.includes("\t"));
  log.info(`Extracted ${lines.length} candidate rows from pcap`);
  if (lines.length === 0) {
    log.fail(
      "No parseable tshark output rows found. Check tshark install and pcap content."
    );
    process.exit(1);
  }

  const DWARF_IP = "192.168.11.31";
  let seenPackets = 0;
  let decodedPackets = 0;
  const unmappedSummary = new Map();
  const skipStats = {
    noPayload: 0,
    tooShort: 0,
    wsExtractFail: 0,
    wsDecodeFail: 0,
    rawDecodeFail: 0,
    invalidVersion: 0,
  };

  for (const line of lines) {
    const parts = line.split("\t");
    if (parts.length < 5) continue;

    const [frameNo, timeRel, srcIp, dstIp, ...payloadCols] = parts;
    const wsHexData = payloadCols[0] || "";
    const tcpHexData = payloadCols[1] || payloadCols[0] || "";
    const candidateHex = wsHexData && wsHexData.trim() ? wsHexData : tcpHexData;
    if (!candidateHex || candidateHex.length < 4) {
      skipStats.noPayload++;
      continue;
    }

    const dir = srcIp === DWARF_IP ? "DWARF→App" : "App→DWARF";
    const dirColor = srcIp === DWARF_IP ? "\x1b[36m" : "\x1b[33m";

    // tshark may emit multiple values as comma-separated list.
    const hexChunks = candidateHex.split(",");

    for (const chunk of hexChunks) {
      seenPackets++;

      // Skip WebSocket handshake (HTTP upgrade)
      if (chunk.startsWith("474554") || chunk.startsWith("48545450")) continue; // GET or HTTP
      if (chunk.length <= 8) {
        skipStats.tooShort++;
        continue;
      }

      const rawBytes = parseHex(chunk);

      // If we already got websocket.payload from tshark, this is the WS payload bytes.
      const fromWsField = wsHexData && wsHexData.trim().length > 0;
      const wsPayload = fromWsField ? rawBytes : extractWsPayload(rawBytes);
      if (!wsPayload || wsPayload.length < 4) {
        skipStats.wsExtractFail++;
        if (debug) {
          log.info(
            `skip frame=${frameNo} reason=wsExtractFail len=${rawBytes.length}`
          );
        }
        continue;
      }

      // Try to decode as WsPacket
      let pkt;
      try {
        pkt = WsPacket.decode(wsPayload);
      } catch {
        skipStats.wsDecodeFail++;
        // Fallback: try raw bytes (maybe not WS-framed)
        try {
          pkt = WsPacket.decode(rawBytes);
        } catch {
          skipStats.rawDecodeFail++;
          if (debug) {
            log.info(
              `skip frame=${frameNo} reason=decodeFail ws=${wsPayload.length} raw=${rawBytes.length}`
            );
          }
          continue;
        }
      }

      const obj = WsPacket.toObject(pkt, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
      });

      // Validate - must have reasonable version
      if (obj.majorVersion < 1 || obj.majorVersion > 3) {
        skipStats.invalidVersion++;
        continue;
      }
      if (obj.minorVersion > 30) {
        skipStats.invalidVersion++;
        continue;
      }

      decodedPackets++;

      const typeNames = { 0: "REQ", 1: "RESP", 2: "NOTIFY", 3: "NRESP" };
      const tn = typeNames[obj.type] || `type=${obj.type}`;
      const enumName = getCmdEnumName(obj.cmd);
      const cmdName = CMD_NAMES[obj.cmd] || enumName || `CMD_${obj.cmd}`;

      // Decode inner data
      let innerStr = "";
      if (obj.data && obj.data.length > 0) {
        const innerBytes =
          typeof obj.data === "string"
            ? Buffer.from(obj.data, "base64")
            : obj.data;

        if (innerBytes.length > 0) {
          const innerTypeName = INNER_TYPES[`${obj.cmd}:${obj.type}`];
          if (innerTypeName) {
            try {
              const InnerType = root.lookupType(innerTypeName);
              const inner = InnerType.toObject(InnerType.decode(innerBytes), {
                longs: String,
                enums: String,
                bytes: String,
                defaults: true,
              });
              // Filter out zero/empty values for compact display
              // Note: longs: String causes int64 zeros to arrive as "0"
              const nz = Object.entries(inner).filter(
                ([, v]) =>
                  v !== 0 && v !== "0" && v !== "" && v !== false && v !== null
              );
              if (nz.length > 0) {
                // Decode paramId for human-readable display
                const display = Object.fromEntries(
                  nz.map(([k, v]) =>
                    k === "paramId" ? [k, formatParamId(v)] : [k, v]
                  )
                );
                innerStr = ` → ${innerTypeName}: ${JSON.stringify(display)}`;
              } else {
                innerStr = ` → ${innerTypeName}: {}`;
              }
            } catch {
              innerStr = ` → ${innerTypeName}(fail) raw=${hexPreview(
                innerBytes,
                32
              )}`;
            }
          } else {
            innerStr = ` raw=${hexPreview(innerBytes, 32)}`;
          }
        }
      }

      if (!CMD_NAMES[obj.cmd]) {
        if (!unmappedSummary.has(obj.cmd)) {
          unmappedSummary.set(obj.cmd, {
            count: 0,
            moduleId: obj.moduleId,
            type: tn,
            enumName,
            sampleRaw:
              innerStr && innerStr.startsWith(" raw=")
                ? innerStr.replace(/^ raw=/, "")
                : "",
          });
        }
        const record = unmappedSummary.get(obj.cmd);
        record.count += 1;
        if (!record.sampleRaw && innerStr && innerStr.startsWith(" raw=")) {
          record.sampleRaw = innerStr.replace(/^ raw=/, "");
        }
      }

      // Truncate clientId for display
      const shortClient = obj.clientId
        ? obj.clientId.substring(0, 8) + "..."
        : "";

      console.log(
        `${dirColor}#${seenPackets.toString().padStart(3)} ${dir.padEnd(
          10
        )}\x1b[0m` +
          ` t=${Number(timeRel).toFixed(3).padStart(9)}s` +
          ` [${tn.padEnd(6)}] v${obj.majorVersion}.${obj.minorVersion
            .toString()
            .padEnd(2)}` +
          ` dev=${obj.deviceId} mod=${obj.moduleId} cmd=${obj.cmd
            .toString()
            .padEnd(5)}` +
          ` ${cmdName}${innerStr}`
      );
    }
  }

  log.section("DONE");
  log.info(`Decoded ${decodedPackets} packets (seen ${seenPackets})`);
  if (unmappedSummary.size > 0) {
    log.section("UNMAPPED CMD SUMMARY");
    const entries = [...unmappedSummary.entries()].sort((a, b) => a[0] - b[0]);
    for (const [cmd, info] of entries) {
      const classification = info.enumName
        ? "known-enum (add CMD_NAMES/INNER_TYPES mapping)"
        : "candidate-undocumented";
      const enumStr = info.enumName ? ` enum=${info.enumName}` : "";
      const sampleStr = info.sampleRaw ? ` sample=${info.sampleRaw}` : "";
      console.log(
        `cmd=${cmd} count=${info.count} mod=${info.moduleId} type=${info.type}` +
          `${enumStr} class=${classification}${sampleStr}`
      );
    }
  }
  if (decodedPackets === 0) {
    log.info(
      `Skip stats: noPayload=${skipStats.noPayload}, tooShort=${skipStats.tooShort}, wsExtractFail=${skipStats.wsExtractFail}, wsDecodeFail=${skipStats.wsDecodeFail}, rawDecodeFail=${skipStats.rawDecodeFail}, invalidVersion=${skipStats.invalidVersion}`
    );
    log.info("Tip: rerun with --debug to print per-frame skip reasons");
  }
}

main().catch((e) => {
  log.fail(`Error: ${e.message}`);
  process.exit(1);
});
