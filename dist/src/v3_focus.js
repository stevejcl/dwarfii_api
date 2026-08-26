/** @module v3_focus */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";
/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE FOCUS (15xxx) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Focus init
 * Create Encoded Packet for the command CMD_V3_FOCUS_INIT
 * @returns {Uint8Array}
 */
export function messageV3FocusInit() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_FOCUS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_FOCUS_INIT;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Start astro auto focus
 * Create Encoded Packet for the command CMD_FOCUS_START_ASTRO_AUTO_FOCUS
 * Sends with mode=1 to start
 * @returns {Uint8Array}
 */
export function messageV3FocusAutoFocusStart() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_FOCUS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_FOCUS_START_ASTRO_AUTO_FOCUS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ mode: 1 });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Manual single-step focus
 * Create Encoded Packet for the command CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS
 * @param {number} direction - Focus direction (0=forward, 1=backward)
 * @returns {Uint8Array}
 */
export function messageV3FocusManualSingleStep(direction = 0) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_FOCUS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ direction: direction });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Start manual continuous focus
 * Create Encoded Packet for the command CMD_FOCUS_START_MANUAL_CONTINU_FOCUS
 * @param {number} direction - Focus direction (0=forward, 1=backward)
 * @returns {Uint8Array}
 */
export function messageV3FocusManualContinuStart(direction = 0) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_FOCUS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_FOCUS_START_MANUAL_CONTINU_FOCUS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({ direction: direction });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Stop manual continuous focus
 * Create Encoded Packet for the command CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS
 * @returns {Uint8Array}
 */
export function messageV3FocusManualContinuStop() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_FOCUS;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({});
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
