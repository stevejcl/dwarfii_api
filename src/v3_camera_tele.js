/** @module v3_camera_tele */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";

/*** --------------------------------------------------------- ***/
/*** ------------ V3 MODULE CAMERA TELE (10050) -------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Open tele camera (DWARF mini)
 * Create Encoded Packet for the command CMD_V3_CAMERA_TELE_OPEN_CAMERA
 * @returns {Uint8Array}
 */
export function messageV3CameraTeleOpenCamera() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_CAMERA_TELE_OPEN_CAMERA;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({ action: 1 });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Close tele camera (DWARF mini)
 * Create Encoded Packet for the command CMD_V3_CAMERA_TELE_OPEN_CAMERA
 * @returns {Uint8Array}
 */
export function messageV3CameraTeleCloseCamera() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_CAMERA_TELE_OPEN_CAMERA;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
