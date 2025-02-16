/** @module panorama */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";
/*** ------------------------------------------------ ***/
/*** ---------------- MODULE PANORAMA---------------- ***/
/*** ------------------------------------------------ ***/
/**
 * 3.15.3 Start Panorama
 * Create Encoded Packet for the command CMD_PANORAMA_START_GRID
 * @returns {Uint8Array}
 */
export function messagePanoramaStartGrid() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_PANORAMA;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_PANORAMA_START_GRID;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    // Obtain classname depending of the command
    // Obtain a message class
    const cmdClass = cmdMapping[interface_id];
    let class_message = eval(`Dwarfii_Api.${cmdClass}`);
    // Encode message
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    // return encoded Message Packet
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 3.15.4 Stop Panorama
 * Create Encoded Packet for the command CMD_PANORAMA_STOP
 * @returns {Uint8Array}
 */
export function messagePanoramaStop() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_PANORAMA;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_PANORAMA_STOP;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    // Obtain classname depending of the command
    // Obtain a message class
    const cmdClass = cmdMapping[interface_id];
    let class_message = eval(`Dwarfii_Api.${cmdClass}`);
    // Encode message
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    // return encoded Message Packet
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 3.15.5 Start Panorama
 * Create Encoded Packet for the command CMD_PANORAMA_START_EULER_RANGE
 * @param {number} yaw_range ; // yaw range
 * @param {number} pitch_range ; // pitch range
 * @returns {Uint8Array}
 */
export function messagePanoramaStartPanoramaByEulerRange(yaw_range, pitch_range) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_PANORAMA;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_PANORAMA_START_EULER_RANGE;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    // Obtain classname depending of the command
    // Obtain a message class
    const cmdClass = cmdMapping[interface_id];
    let class_message = eval(`Dwarfii_Api.${cmdClass}`);
    // Encode message
    let message = class_message.create({
        yawRange: yaw_range,
        pitchRange: pitch_range,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    // return encoded Message Packet
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
