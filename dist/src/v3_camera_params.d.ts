/** Set the V3 astronomy exposure using an index returned by getParamAndSetting. */
export function messageV3AstroExposureSet(exposureIndex: any): Uint8Array;
/** Set the V3 astronomy gain using a value returned by getParamAndSetting. */
export function messageV3AstroGainSet(gain: any): Uint8Array;
/*** --------------------------------------------------------- ***/
/*** -------- V3 MODULE CAMERA PARAMS (16700+) --------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Set camera parameter (general)
 * Create Encoded Packet for the command CMD_V3_CAMERA_PARAMS_SET_PARAM (16700)
 * @param {number|string} paramId - Parameter ID (encoded via encodeParamId)
 * @param {number} value - Parameter value
 * @param {number} [flag=0] - Flag (0 = auto, 1 = manual; used for some params)
 * @returns {Uint8Array}
 */
export function messageV3CameraParamSet(paramId: number | string, value: number, flag?: number): Uint8Array;
/**
 * V3: Set exposure/gain parameter
 * Create Encoded Packet for the command CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN (16701)
 * @param {number|string} paramId - Parameter ID (encoded via encodeParamId)
 * @param {number} value - Exposure or gain value
 * @param {number} [flag=1] - Flag (1 = manual mode)
 * @returns {Uint8Array}
 */
export function messageV3CameraParamSetExpGain(paramId: number | string, value: number, flag?: number): Uint8Array;
/**
 * V3: Adjust camera parameter (relative adjustment)
 * Create Encoded Packet for the command CMD_V3_CAMERA_PARAMS_ADJUST (16703)
 * @param {number|string} paramId - Parameter ID (encoded via encodeParamId)
 * @param {number} value - Adjustment value (positive = increase, negative = decrease)
 * @returns {Uint8Array}
 */
export function messageV3CameraParamsAdjust(paramId: number | string, value: number): Uint8Array;
/**
 * V3: Set filter wheel position
 * Convenience wrapper around messageV3CameraParamsAdjust for filter wheel control.
 * Verified from pcap capture (AcoVanConis, 2026-03-14).
 *
 * @param {number} position - Filter position (1-based index)
 * @param {number} [shootingMode=2] - Shooting mode (default: ASTRO)
 * @param {number} [cameraId=0] - Camera ID (default: TELE)
 * @returns {Uint8Array}
 */
export function messageV3FilterWheelSet(position: number, shootingMode?: number, cameraId?: number): Uint8Array;
/**
 * V3: Set the astronomy live-stacking frame count.
 *
 * V3 app captures show this absolute `16703` write immediately after
 * `11041`. The firmware may otherwise retain an earlier count even when
 * `11041` echoes the newly requested pipe string.
 *
 * This command belongs to the shared DWARF 2, DWARF 3, and DWARF mini V3 API.
 *
 * @param {number} frameCount - Number of frames to acquire (minimum 1)
 * @param {number} [cameraId=0] - Camera ID (default: TELE)
 * @returns {Uint8Array}
 */
export function messageV3AstroFrameCountSet(frameCount: number, cameraId?: number): Uint8Array;
/**
 * Encode a paramId from its constituent parts.
 *
 * paramId layout (64-bit):
 *   bits 63..56 = shootingMode  (e.g. 0=photo, 1=video, 2=astro)
 *   bits 55..48 = category      (parameter group)
 *   bits 47..16 = reserved (0)
 *   bits 15..8  = cameraId      (0=tele, 1=wide)
 *   bits 7..0   = paramIndex    (parameter index within the category)
 *
 * Returns a decimal string suitable for protobuf.js int64 fields.
 *
 * @param {number} shootingMode - Shooting mode (0=photo, 1=video, 2=astro)
 * @param {number} category - Parameter category
 * @param {number} cameraId - Camera ID (0=tele, 1=wide)
 * @param {number} paramIndex - Parameter index within the category
 * @returns {string} Encoded paramId as decimal string
 */
export function encodeParamId(shootingMode: number, category: number, cameraId: number, paramIndex: number): string;
/**
 * Decode a paramId into its constituent parts.
 *
 * Accepts number, string (decimal), BigInt, or protobuf.js Long object.
 *
 * @param {number|string|BigInt|{low: number, high: number}} paramId - Encoded parameter ID
 * @returns {{ shootingMode: number, category: number, cameraId: number, paramIndex: number }}
 */
export function decodeParamId(paramId: number | string | BigInt | {
    low: number;
    high: number;
}): {
    shootingMode: number;
    category: number;
    cameraId: number;
    paramIndex: number;
};
export namespace V3_SHOOTING_MODE {
    let PHOTO: number;
    let VIDEO: number;
    let ASTRO: number;
}
export namespace V3_PARAM_CATEGORY {
    let OPTICAL: number;
    let CAPTURE: number;
}
export namespace V3_CAMERA_ID {
    let TELE: number;
    let WIDE: number;
}
export namespace V3_PARAM_INDEX {
    let EXPOSURE: number;
    let GAIN: number;
    let FILTER_WHEEL: number;
    let FRAME_COUNT: number;
}
//# sourceMappingURL=v3_camera_params.d.ts.map