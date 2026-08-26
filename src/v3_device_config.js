/** @module v3_device_config */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";

/*** --------------------------------------------------------- ***/
/*** --------- V3 MODULE DEVICE CONFIG (16xxx) --------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Get complete device work state (APK: WsGetDeviceStateInfo)
 * Create an encoded packet for command 16405.
 * @returns {Uint8Array}
 */
export function messageV3GetDeviceStateInfo() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_DEVICE_CONFIG;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_DEVICE_CONFIG_GET_CONFIG;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}

/**
 * Backward-compatible alias for the earlier, incorrectly inferred command name.
 * Command 16405 is GetDeviceStateInfo, not a static device-config request.
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigGetConfig() {
  return messageV3GetDeviceStateInfo();
}
/**
 * V3: Mode query
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_MODE_QUERY
 * @param {number} targetMode - Target mode to query (2=standard, 8=astro)
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigModeQuery(targetMode) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_DEVICE_CONFIG;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_DEVICE_CONFIG_MODE_QUERY;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({ targetMode: targetMode });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Mode switch (to astro mode)
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_MODE_SWITCH
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigModeSwitch() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_DEVICE_CONFIG;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_DEVICE_CONFIG_MODE_SWITCH;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let inner = Dwarfii_Api.V3ModeSwitchInner.create({ value: 1 });
  let message = class_message.create({ inner: inner });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * V3: Shooting mode switch
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_SHOOTING_MODE
 * @param {number} modeId - 1=photo, 3=burst, 4=video, 5=timelapse
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigShootingModeSwitch(modeId) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_DEVICE_CONFIG;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_DEVICE_CONFIG_SHOOTING_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  const cmdClass = cmdMapping[interface_id];
  let class_message = Dwarfii_Api[cmdClass];
  let message = class_message.create({ modeId: modeId });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
