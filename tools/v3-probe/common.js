// Shared configuration and utilities for v3-probe tools

export const DEFAULT_IP = "192.168.88.1";
export const DEFAULT_WS_PORT = 9900;
export const DEFAULT_HTTP_PORT = 8082;
export const DEFAULT_HTTPS_PORT = 8443;
export const DEFAULT_CLIENT_ID = "0000DAF2-0000-1000-8000-00805F9B34FB";

// V2 protocol version constants (from base.proto)
export const WS_MAJOR_VERSION = 1;
export const WS_MINOR_VERSION = 9;

// V3 protocol version (discovered from DwarfLab app pcap 2026-02-28)
export const V3_MAJOR_VERSION = 1;
export const V3_MINOR_VERSION = 20;

// Priority ports to scan first
export const PRIORITY_PORTS = [9900, 9901, 8082, 8092, 443, 8443];

// Known HTTP endpoints
export const HTTP_ENDPOINTS = [
  // Device info
  { path: "/firmwareVersion", method: "GET" },
  { path: "/getDefaultParamsConfig", method: "GET" },
  { path: "/deviceInfo", method: "POST", body: {} },
  { path: "/getDeviceActivateInfo", method: "POST", body: {} },
  // Shooting mode
  {
    path: "/shootingMode/getSupportedShootingModes",
    method: "GET",
  },
  {
    path: "/shootingMode/getParamAndSetting",
    method: "POST",
    body: {},
  },
  // Album management
  { path: "/album/list/mediaCounts", method: "POST", body: {} },
  {
    path: "/album/list/mediaInfos",
    method: "POST",
    body: { mediaTypeList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  },
  // Streaming (MJPEG — probe will just check HTTP status)
  { path: "/mainstream", method: "GET" },
  { path: "/secondstream", method: "GET" },
];

// CMD IDs for diagnostic commands (from protocol.proto DwarfCMD enum)
export const CMD = {
  // Camera Tele (mod=1)
  TELE_OPEN_CAMERA: 10000,
  TELE_CLOSE_CAMERA: 10001,
  TELE_GET_EXP_MODE: 10008,
  TELE_GET_EXP: 10010,
  TELE_GET_GAIN_MODE: 10012,
  TELE_GET_GAIN: 10014,
  TELE_GET_BRIGHTNESS: 10016,
  TELE_GET_CONTRAST: 10018,
  TELE_GET_SATURATION: 10020,
  TELE_GET_HUE: 10022,
  TELE_GET_SHARPNESS: 10024,
  TELE_GET_WB_MODE: 10026,
  TELE_GET_WB_SCENE: 10028,
  TELE_GET_WB_CT: 10030,
  TELE_GET_IRCUT: 10032,
  TELE_GET_ALL_PARAMS: 10036,
  TELE_GET_ALL_FEATURE_PARAMS: 10038,
  TELE_GET_SYSTEM_WORKING_STATE: 10039,

  // Camera Wide (mod=2)
  WIDE_OPEN_CAMERA: 12000,
  WIDE_CLOSE_CAMERA: 12001,
  WIDE_GET_EXP_MODE: 12003,
  WIDE_GET_EXP: 12005,
  WIDE_GET_GAIN: 12007,
  WIDE_GET_BRIGHTNESS: 12009,
  WIDE_GET_CONTRAST: 12011,
  WIDE_GET_SATURATION: 12013,
  WIDE_GET_HUE: 12015,
  WIDE_GET_SHARPNESS: 12017,
  WIDE_GET_WB_MODE: 12019,
  WIDE_GET_WB_CT: 12021,
  WIDE_GET_ALL_PARAMS: 12027,

  // System (mod=4)
  SYSTEM_SET_TIME: 13000,
  SYSTEM_SET_MASTERLOCK: 13004,

  // RGB Power (mod=5)
  RGB_OPEN: 13500,
  RGB_CLOSE: 13501,
  RGB_POWERIND_ON: 13503,
  RGB_POWERIND_OFF: 13504,

  // Motor (mod=6)
  MOTOR_GET_POSITION: 14011,

  // Focus (mod=8)
  FOCUS_AUTO: 15000,

  // Notify (informational)
  NOTIFY_BATTERY: 15201,
  NOTIFY_CHARGE: 15202,
  NOTIFY_SDCARD_INFO: 15203,
  NOTIFY_RGB_STATE: 15221,
  NOTIFY_HOST_SLAVE_MODE: 15223,
  NOTIFY_TEMPERATURE: 15243,
};

// V3 commands discovered from DwarfLab app pcap (2026-02-28)
// These commands are NOT in the V2 proto definitions
export const V3_CMD = {
  // Camera (replacements for V2 10000/12000)
  TELE_OPEN: 10050,      // replaces 10000, arg 08 01 = open
  WIDE_OPEN: 12036,      // replaces 12000, no arg or 08 01

  // Astro (mod=3) — new query/config commands
  ASTRO_11039: 11039,    // tracking/live stacking
  ASTRO_11040: 11040,    // astro parameters (pipe-delimited config)
  ASTRO_11043: 11043,    // exposure presets (called 3x with field2={0,1,2})

  // System (mod=4) — new
  SYSTEM_GPS: 13010,     // GPS/location (doubles: lat/lon/alt + string)

  // Focus (mod=8) — new
  FOCUS_INIT: 15011,     // focus initialization

  // Shooting Schedule (mod=13)
  SCHEDULE_16102: 16102,

  // NEW mod=14 (device config/mode)
  MOD14_MODE: 16404,     // mode switch
  MOD14_CONFIG: 16405,   // device config (251B response with full specs)

  // NEW mod=15 (unknown)
  MOD15_16700: 16700,

  // V3 notifications
  NOTIFY_MOD14: 15261,
  NOTIFY_MOD15: 15264,
  NOTIFY_MODE_CHANGE: 15267,
  NOTIFY_TEMP2: 15292,   // temperature variant
};

// Module IDs from protocol.proto
export const MODULE = {
  CAMERA_TELE: 1,   // 10000-10499
  CAMERA_WIDE: 2,   // 12000-12499
  ASTRO: 3,         // 11000-11499
  SYSTEM: 4,        // 13000-13299
  RGB_POWER: 5,     // 13500-13799
  MOTOR: 6,         // 14000-14499
  TRACK: 7,         // 14800-14899
  FOCUS: 8,         // 15000-15099
  NOTIFY: 9,        // 15200-15499
  PANORAMA: 10,     // 15500-15599
  SHOOTING_SCHEDULE: 13, // 16100-16300
  MOD_14: 14,            // V3: device config/mode (16400-16499)
  MOD_15: 15,            // V3: unknown (16700+)
};

// Message types
export const MSG_TYPE = {
  REQUEST: 0,
  RESPONSE: 1,
  NOTIFY: 2,
  NOTIFY_RESPONSE: 3,
};

/**
 * Parse common CLI arguments.
 * @param {string[]} argv - process.argv
 * @returns {{ ip: string, port: number, dryRun: boolean, verbose: boolean, help: boolean }}
 */
export function parseArgs(argv) {
  const args = {
    ip: DEFAULT_IP,
    port: DEFAULT_WS_PORT,
    dryRun: false,
    verbose: false,
    help: false,
  };

  for (let i = 2; i < argv.length; i++) {
    switch (argv[i]) {
      case "--ip":
        args.ip = argv[++i];
        break;
      case "--port":
        args.port = parseInt(argv[++i], 10);
        break;
      case "--dry-run":
        args.dryRun = true;
        break;
      case "--verbose":
      case "-v":
        args.verbose = true;
        break;
      case "--help":
      case "-h":
        args.help = true;
        break;
    }
  }

  return args;
}

/**
 * Format a timestamp for logging.
 * @returns {string}
 */
export function timestamp() {
  return new Date().toISOString();
}

/**
 * Format bytes as hex string with spaces.
 * @param {Buffer|Uint8Array} buf
 * @param {number} [maxBytes=32]
 * @returns {string}
 */
export function hexPreview(buf, maxBytes = 32) {
  const slice = buf.slice(0, maxBytes);
  const hex = Array.from(slice)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
  return buf.length > maxBytes ? `${hex} ... (${buf.length} bytes total)` : hex;
}

/**
 * Colorized console output helpers.
 */
export const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  ok: (msg) => console.log(`\x1b[32m[ OK ]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  fail: (msg) => console.log(`\x1b[31m[FAIL]\x1b[0m ${msg}`),
  data: (msg) => console.log(`\x1b[35m[DATA]\x1b[0m ${msg}`),
  test: (name) => console.log(`\n\x1b[1;34m>>> Test ${name}\x1b[0m`),
  section: (name) =>
    console.log(`\n\x1b[1;33m${"=".repeat(60)}\n ${name}\n${"=".repeat(60)}\x1b[0m`),
};
