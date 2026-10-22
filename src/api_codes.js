/** @module api_codes */
/* eslint no-unused-vars: 0 */

export const DwarfIP = "192.168.88.1";

/**
 * @param {string} IP
 * @returns {string}
 */
//export const wsURL = (IP, PROXY, HTTPS) => `ws://${IP}:9900`;
export const wsURL = (IP, proxyURL = undefined, useHttps = false) => {
  if (proxyURL) {
    const protocol = useHttps ? "wss" : "ws";
    console.log(
      `Starting Web Socket : ${protocol}://${proxyURL}/?target=ws://${IP}:9900`,
    );
    return `${protocol}://${proxyURL}/?target=ws://${IP}:9900`;
  }
  console.log(`Starting Web Socket : ws://${IP}:9900`);
  return `ws://${IP}:9900`;
};

/**
 * @param {string} IP
 * @returns {string}
 */
export const wideangleURL = (IP) => `http://${IP}:8092/secondstream`;

/**
 * @param {string} IP
 * @returns {string}
 */
export const telephotoURL = (IP) => `http://${IP}:8092/mainstream`;

/**
 * @param {string} IP
 * @returns {string}
 */

// old ip : not working anymore in V2
//export const rawPreviewURL = (IP) => `http://${IP}:8092/rawstream`;
export const rawPreviewURL = (IP) => `http://${IP}:8092/mainstream`;

/**
 * @param {string} IP
 * @returns {string}
 */
export const firmwareVersion = (IP) => `http://${IP}:8082/firmwareVersion`;

/**
 * @param {string} IP
 * @returns {string}
 */
export const getDefaultParamsConfig = (IP) =>
  `http://${IP}:8082/getDefaultParamsConfig`;

/**
 * POST Request
 * data.deviceID 1:DWARF II 2:DWARF3
 * data.deviceName 1:DWARF_XXXXXX  2:DWARF3_XXXXXX
 * @param {string} IP
 * @returns {string}
 */
export const deviceInfo = (IP) => `http://${IP}:8082/deviceInfo`;

// ===============
// ===============

// exposition - gain
export const modeAuto = 0;
export const modeManual = 1;

// autofocus
export const autofocusGlobal = 0;
export const autofocusArea = 1;

export const exposureTelephotoModeAuto = 0;
export const exposureWideangleModeAuto = 3;

// whitebalance
export const whiteBalanceScenesIDValue = {
  0: "incandescent",
  1: "warm fluorescent",
  2: "fluorescent",
  3: "sunlight",
  4: "cloudy",
  5: "shadow",
  6: "twilight",
};
export const whiteBalanceScenesValueID = {
  incandescent: 0,
  "warm fluorescent": 1,
  fluorescent: 2,
  sunlight: 3,
  cloudy: 4,
  shadow: 5,
  twilight: 6,
};

// IR
export const IRCut = 0;
export const IRPass = 1;

export const binning1x1 = 0;
export const binning2x2 = 1;

// Device IDs
export const DwarfDeviceIdDwarfII = 1;
export const DwarfDeviceIdDwarf3 = 2;
export const DwarfDeviceIdDwarfMini = 4;
export const DwarfClientIdDwarfMini = "0000DAF4-0000-1000-8000-00805F9B34FB";

// WebSocket protocol minor versions
export const WsMinorVersionV2 = 9;
export const WsMinorVersionV3 = 20;

// DWARF mini filter indices used by CMD 11005 / calibration capture.
// Only Astro and Duo-Band are normal Deep Sky stacking filters.
export const MiniFilterAstro = 1;
export const MiniFilterDuoBand = 2;
export const MiniFilterDark = 3;

// DWARF mini calibration-frame values confirmed from DWARFLAB 3.4.1.
export const CaliFrameTypeDark = 0;
export const CaliFrameCameraTele = 0;
export const CaliFrameSceneSetting = 0;
export const CaliFrameSceneShooting = 1;
export const CaliFrameResolution4K = 0;
export const CaliFrameResolution1080P = 1;
export const CaliFrameResolution720P = 2;

export const fileFits = 0;
export const fileTiff = 1;

// raw preview
export const rawPreviewContinousSuperimpose = 0;
export const rawPreviewSingle15 = 1;
export const rawPreviewSingleComposite = 2;

// ===============
// 5 motion control
// ===============

export const continuous_mode = 1;
export const pulse_mode = 2;

export const speedDecelerate = 0;
export const speedAccelerate = 1;

export const anticlockwise = 0;
export const clockwise = 1;

export const spinMotor = 1;
export const pitchMotor = 2;
