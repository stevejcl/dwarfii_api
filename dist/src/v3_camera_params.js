/** @module v3_camera_params */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";
// @ts-ignore — long provides default export at runtime but lacks TypeScript declaration
import Long from "long";
/** Shooting mode constants for paramId encoding */
export const V3_SHOOTING_MODE = {
    PHOTO: 0,
    VIDEO: 1,
    ASTRO: 2,
};
/** Parameter category constants */
export const V3_PARAM_CATEGORY = {
    OPTICAL: 1,
    /** Astronomy capture settings (pcap-verified for frame count) */
    CAPTURE: 2,
};
/** Camera ID constants for paramId encoding */
export const V3_CAMERA_ID = {
    TELE: 0,
    WIDE: 1,
};
/** Known parameter indices within categories */
export const V3_PARAM_INDEX = {
    /** Manual exposure selection (value is the firmware exposure index) */
    EXPOSURE: 0x01,
    /** Manual gain selection (value is the gain number) */
    GAIN: 0x02,
    /** Filter wheel position (pcap-verified, category=OPTICAL) */
    FILTER_WHEEL: 0x0d,
    /** Number of astronomy frames to acquire (category=CAPTURE) */
    FRAME_COUNT: 0x10,
};
/** Set the V3 astronomy exposure using an index returned by getParamAndSetting. */
export function messageV3AstroExposureSet(exposureIndex) {
    const paramId = encodeParamId(V3_SHOOTING_MODE.ASTRO, V3_PARAM_CATEGORY.OPTICAL, V3_CAMERA_ID.TELE, V3_PARAM_INDEX.EXPOSURE);
    return messageV3CameraParamSet(paramId, exposureIndex, 1);
}
/** Set the V3 astronomy gain using a value returned by getParamAndSetting. */
export function messageV3AstroGainSet(gain) {
    const paramId = encodeParamId(V3_SHOOTING_MODE.ASTRO, V3_PARAM_CATEGORY.OPTICAL, V3_CAMERA_ID.TELE, V3_PARAM_INDEX.GAIN);
    return messageV3CameraParamSetExpGain(paramId, gain, 1);
}
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
export function messageV3CameraParamSet(paramId, value, flag = 0) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_PARAMS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_CAMERA_PARAMS_SET_PARAM;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    const longParamId = Long.fromString(String(paramId));
    let message = class_message.create({
        paramId: longParamId,
        flag: flag,
        value: value,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(class_message.toObject(message, { longs: String }))}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Set exposure/gain parameter
 * Create Encoded Packet for the command CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN (16701)
 * @param {number|string} paramId - Parameter ID (encoded via encodeParamId)
 * @param {number} value - Exposure or gain value
 * @param {number} [flag=1] - Flag (1 = manual mode)
 * @returns {Uint8Array}
 */
export function messageV3CameraParamSetExpGain(paramId, value, flag = 1) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_PARAMS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    const longParamId = Long.fromString(String(paramId));
    let message = class_message.create({
        paramId: longParamId,
        flag: flag,
        value: value,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(class_message.toObject(message, { longs: String }))}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Adjust camera parameter (relative adjustment)
 * Create Encoded Packet for the command CMD_V3_CAMERA_PARAMS_ADJUST (16703)
 * @param {number|string} paramId - Parameter ID (encoded via encodeParamId)
 * @param {number} value - Adjustment value (positive = increase, negative = decrease)
 * @returns {Uint8Array}
 */
export function messageV3CameraParamsAdjust(paramId, value) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_PARAMS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_CAMERA_PARAMS_ADJUST;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    const longParamId = Long.fromString(String(paramId));
    let message = class_message.create({ paramId: longParamId, value: value });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(class_message.toObject(message, { longs: String }))}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
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
export function messageV3FilterWheelSet(position, shootingMode = V3_SHOOTING_MODE.ASTRO, cameraId = V3_CAMERA_ID.TELE) {
    const paramId = encodeParamId(shootingMode, V3_PARAM_CATEGORY.OPTICAL, cameraId, V3_PARAM_INDEX.FILTER_WHEEL);
    return messageV3CameraParamsAdjust(paramId, position);
}
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
export function messageV3AstroFrameCountSet(frameCount, cameraId = V3_CAMERA_ID.TELE) {
    if (!Number.isInteger(frameCount) || frameCount < 1) {
        throw new RangeError("frameCount must be a positive integer");
    }
    const paramId = encodeParamId(V3_SHOOTING_MODE.ASTRO, V3_PARAM_CATEGORY.CAPTURE, cameraId, V3_PARAM_INDEX.FRAME_COUNT);
    return messageV3CameraParamsAdjust(paramId, frameCount);
}
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
export function encodeParamId(shootingMode, category, cameraId, paramIndex) {
    const id = (BigInt(shootingMode & 0xff) << 56n) |
        (BigInt(category & 0xff) << 48n) |
        (BigInt(cameraId & 0xff) << 8n) |
        BigInt(paramIndex & 0xff);
    return id.toString();
}
/**
 * Decode a paramId into its constituent parts.
 *
 * Accepts number, string (decimal), BigInt, or protobuf.js Long object.
 *
 * @param {number|string|BigInt|{low: number, high: number}} paramId - Encoded parameter ID
 * @returns {{ shootingMode: number, category: number, cameraId: number, paramIndex: number }}
 */
export function decodeParamId(paramId) {
    let id;
    if (typeof paramId === "bigint") {
        id = paramId;
    }
    else if (typeof paramId === "string") {
        id = BigInt(paramId);
    }
    else if (typeof paramId === "number") {
        if (!Number.isSafeInteger(paramId)) {
            throw new RangeError("paramId as number exceeds Number.MAX_SAFE_INTEGER; pass a string or BigInt instead");
        }
        id = BigInt(paramId);
    }
    else if (paramId &&
        typeof ( /** @type {*} */(paramId).low) === "number" &&
        typeof ( /** @type {*} */(paramId).high) === "number") {
        // protobuf.js Long object
        const long = /** @type {{low: number, high: number}} */ (paramId);
        id = (BigInt(long.high >>> 0) << 32n) | BigInt(long.low >>> 0);
    }
    else {
        throw new TypeError("paramId must be a number, string, BigInt, or Long");
    }
    return {
        shootingMode: Number((id >> 56n) & 0xffn),
        category: Number((id >> 48n) & 0xffn),
        cameraId: Number((id >> 8n) & 0xffn),
        paramIndex: Number(id & 0xffn),
    };
}
