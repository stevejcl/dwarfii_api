/** @module v3_motor */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";

/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE MOTOR (14xxx) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Joystick motor control
 * Create Encoded Packet for the command CMD_STEP_MOTOR_SERVICE_JOYSTICK
 * @param {number} vectorAngle - Direction 0-360 degrees (up=90, down=270, left=180, right=0/360)
 * @param {number} vectorLength - Speed scaling factor 0.0-1.0
 * @returns {Uint8Array}
 */
export function messageV3MotorServiceJoystick(vectorAngle, vectorLength) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_MOTOR;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_STEP_MOTOR_SERVICE_JOYSTICK;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({
    vectorAngle: vectorAngle,
    vectorLength: vectorLength,
  });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Stop joystick motor control
 * Create Encoded Packet for the command CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP
 * @returns {Uint8Array}
 */
export function messageV3MotorServiceJoystickStop() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_MOTOR;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
