/** @module v3_astro */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";
/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE ASTRO (11xxx) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Start stacking with the model-appropriate payload.
 * Create Encoded Packet for the command CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING
 * DWARF 3 and DWARF mini send the capture filter (1=Astro, 2=Duo-Band).
 * Filterless DWARF 2 uses irIndex=-1, which serializes as the observed sentinel.
 * @param {number} irIndex - Capture filter, or -1 for the filterless sentinel path
 * @param {boolean} forceStart - Continue despite recoverable preflight warnings such as a missing or temperature-mismatched dark frame
 * @returns {Uint8Array}
 */
export function messageV3AstroStartStacking(irIndex = 1, forceStart = false) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        irIndex: irIndex,
        forceStart: forceStart,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3 protocol >=2.5: continue after firmware reports a recoverable dark-frame
 * warning such as `CODE_ASTRO_DARK_NOT_FOUND` (-11503) or
 * `CODE_ASTRO_DARK_TEMP_MISMATCH` (-11530).
 *
 * DWARF 2 and older protocol versions repeat the start request with
 * `forceStart=true` instead.
 *
 * @returns {Uint8Array}
 */
export function messageV3AstroContinueShooting() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_CONTINUE_SHOOTING;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Stop stacking
 * Create Encoded Packet for the command CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING
 * @returns {Uint8Array}
 */
export function messageV3AstroStopStacking() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Start tracking (after stacking)
 * Create Encoded Packet for the command CMD_ASTRO_GO_LIVE
 * @returns {Uint8Array}
 */
export function messageV3AstroStartTracking() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_GO_LIVE;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: One-click GOTO DSO with lon/lat/mode
 * Create Encoded Packet for the command CMD_ASTRO_START_ONE_CLICK_GOTO_DSO
 * @param {number} ra - Right Ascension (degrees)
 * @param {number} dec - Declination (degrees)
 * @param {string} targetName - Target name
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @param {number} mode - Mode (default 2)
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoDSO(ra, dec, targetName, lon, lat, mode = 2) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_START_ONE_CLICK_GOTO_DSO;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        ra: ra,
        dec: dec,
        targetName: targetName,
        lon: lon,
        lat: lat,
        mode: mode,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: One-click GOTO Solar System target with mode
 * Create Encoded Packet for the command CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM
 * @param {number} index - Solar system target ID (9=Sun, 8=Moon, etc.)
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @param {string} targetName - Target name
 * @param {number} mode - Mode (default 8)
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoSolar(index, lon, lat, targetName, mode = 8) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        index: index,
        lon: lon,
        lat: lat,
        targetName: targetName,
        mode: mode,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: GOTO done / acknowledge
 * Create Encoded Packet for the command CMD_ASTRO_STOP_ONE_CLICK_GOTO
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoDone() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_ASTRO_STOP_ONE_CLICK_GOTO;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Save stacked image
 * Create Encoded Packet for the command CMD_V3_ASTRO_SAVE_STACKED_IMAGE
 * @param {string} path - Save path on device
 * @returns {Uint8Array}
 */
export function messageV3AstroSaveImage(path) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_SAVE_STACKED_IMAGE;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ path: path });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: List saved images
 * Create Encoded Packet for the command CMD_V3_ASTRO_LIST_SAVED_IMAGES
 * @returns {Uint8Array}
 */
export function messageV3AstroListImages() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_LIST_SAVED_IMAGES;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Status polling
 * Create Encoded Packet for the command CMD_V3_ASTRO_STATUS_POLLING
 * @param {number} f1 - Field 1 (default -1)
 * @param {number} f2 - Field 2 (default 100)
 * @param {number} f3 - Field 3 (default 100)
 * @param {number} f4 - Field 4 (default -1)
 * @returns {Uint8Array}
 */
export function messageV3AstroStatusPolling(f1 = -1, f2 = 100, f3 = 100, f4 = -1) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_STATUS_POLLING;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        field1: f1,
        field2: f2,
        field3: f3,
        field4: f4,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Get astro parameters
 * Create Encoded Packet for the command CMD_V3_ASTRO_GET_PARAMS (11040)
 *
 * Response contains repeated V3AstroParamsData. Its six-component pipeParams
 * string has confirmed positions 3=exposure seconds, 4=gain and 5=frame count.
 * Components 1, 2 and 6 remain unresolved; component 1 is not a filter.
 * Example: "0|0|60|60|1|null".
 *
 * @param {number} mode - Mode (0 or 1)
 * @returns {Uint8Array}
 */
export function messageV3AstroGetParams(mode = 0) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_GET_PARAMS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ mode: mode });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Set astro parameters
 * Create Encoded Packet for the command CMD_V3_ASTRO_SET_PARAMS (11041)
 *
 * The six-component params string has confirmed positions 3=exposure seconds,
 * 4=gain and 5=frame count. Components 1, 2 and 6 remain unresolved.
 * Example: "0|0|60|60|1|null".
 *
 * Response is V3ResSetAstroParams with code and pipeParams echo.
 *
 * @param {string} params - Pipe-delimited parameter string e.g. "0|0|60|60|1|null"
 * @returns {Uint8Array}
 */
export function messageV3AstroSetParams(params) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_SET_PARAMS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ params: params });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Provisional command 11043 decoder.
 * Existing captures resemble exposure-preset data, while DWARFLAB 3.4.1 names
 * this command GET_CALI_FRAME_LIST. Validate the raw response before relying on
 * this function's response schema.
 * Create Encoded Packet for the command CMD_V3_ASTRO_GET_PRESETS
 * @returns {Uint8Array}
 */
export function messageV3AstroGetPresets() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_GET_PRESETS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Start a calibration-frame capture (CMD 11045).
 *
 * The request schema is confirmed from DWARFLAB 3.4.1. Hardware result delivery
 * and completion notifications are not yet verified.
 *
 * @param {number} expIndex - Exposure index
 * @param {number} gain - Gain value
 * @param {number} resolution - 0=4K, 1=1080P, 2=720P
 * @param {number} capSize - Number of calibration frames
 * @param {number} cameraType - 0=tele camera
 * @param {number} caliFrameType - 0=dark frame
 * @param {number} filterType - 3=DWARF mini Dark filter
 * @param {number} sceneType - 0=setting, 1=shooting
 * @returns {Uint8Array}
 */
export function messageV3AstroStartCalibrationFrame(expIndex, gain, resolution = 0, capSize = 1, cameraType = 0, caliFrameType = 0, filterType = 3, sceneType = 1) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_START_CAPTURE_CALI_FRAME;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        expIndex: expIndex,
        gain: gain,
        resolution: resolution,
        capSize: capSize,
        cameraType: cameraType,
        caliFrameType: caliFrameType,
        filterType: filterType,
        sceneType: sceneType,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Start a DWARF mini dark-frame calibration capture.
 * Dark is a calibration workflow, not a normal Deep Sky filter-wheel position.
 *
 * @param {number} expIndex - Exposure index
 * @param {number} gain - Gain value
 * @param {number} resolution - 0=4K, 1=1080P, 2=720P
 * @param {number} capSize - Number of dark frames
 * @param {number} sceneType - 0=setting, 1=shooting
 * @returns {Uint8Array}
 */
export function messageV3AstroStartDarkCalibration(expIndex, gain, resolution = 0, capSize = 1, sceneType = 1) {
    return messageV3AstroStartCalibrationFrame(expIndex, gain, resolution, capSize, 0, 0, 3, sceneType);
}
/**
 * V3: Stop a calibration-frame capture (CMD 11046).
 * @param {number} cameraType - 0=tele camera
 * @returns {Uint8Array}
 */
export function messageV3AstroStopCalibrationFrame(cameraType = 0) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_STOP_CAPTURE_CALI_FRAME;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ cameraType: cameraType });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Set observation location
 * Create Encoded Packet for the command CMD_V3_ASTRO_SET_LOCATION
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @returns {Uint8Array}
 */
export function messageV3AstroSetLocation(lon, lat) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_SET_LOCATION;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ lon: lon, lat: lat });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Confirm observation
 * Create Encoded Packet for the command CMD_V3_ASTRO_CONFIRM
 * @returns {Uint8Array}
 */
export function messageV3AstroConfirm() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_ASTRO;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_ASTRO_CONFIRM;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
