/** @module camera_tele */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { binning1x1 } from "./api_codes.js";
import { cmdMapping } from "./cmd_mapping.js";

/*** ---------------------------------------------------- ***/
/*** ---------------- MODULE CAMERA TELE ---------------- ***/
/*** ---------------------------------------------------- ***/
/**
 * 4.7.3 Turn on the camera
 * Create Encoded Packet for the command CMD_CAMERA_TELE_OPEN_CAMERA
 * @param {number} binning ; 0 : binning1x1 (default) 1: binning2x2
 * @param {number} rtsp_encode_type ; 0:H264 (default) 1:H265
 * @returns {Uint8Array}
 */
export function messageCameraTeleOpenCamera(
  binning = binning1x1,
  rtsp_encode_type = 0
) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_OPEN_CAMERA;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({
    binning: binning,
    rtspEncodeType: rtsp_encode_type,
  });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.4 Turn off the camera
 * Create Encoded Packet for the command CMD_CAMERA_TELE_CLOSE_CAMERA
 * @returns {Uint8Array}
 */
export function messageCameraTeleCloseCamera() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_CLOSE_CAMERA;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.5 Set all camera parameters
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_ALL_PARAMS
 * @param {number} exp_mode ; // 0: Auto 1: Manual
 * @param {number} exp_index ;
 * @param {number} gain_mode ;
 * @param {number} gain_index ;
 * @param {number} ircut_value ; //IRCUT value 0: CUT 1: PASS
 * @param {number} wb_mode ; //white balance mode 0: automatic 1: manual
 * @param {number} wb_index_type ; //White Balance Manual Mode Index Type: 0: Color Temperature Mode 1: Scene Mode
 * @param {number} wb_index ;
 * @param {number} brightness ;
 * @param {number} contrast ;
 * @param {number} hue ;
 * @param {number} saturation ;
 * @param {number} sharpness ;
 * @param {number} jpg_quality ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetAllParams(
  exp_mode,
  exp_index,
  gain_mode,
  gain_index,
  ircut_value,
  wb_mode,
  wb_index_type,
  wb_index,
  brightness,
  contrast,
  hue,
  saturation,
  sharpness,
  jpg_quality
) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_ALL_PARAMS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({
    expMode: exp_mode,
    expIndex: exp_index,
    gainMode: gain_mode,
    gainIndex: gain_index,
    ircutValue: ircut_value,
    wbMode: wb_mode,
    wbIndexType: wb_index_type,
    wbIndex: wb_index,
    brightness: brightness,
    contrast: contrast,
    hue: hue,
    saturation: saturation,
    sharpness: sharpness,
    jpgQuality: jpg_quality,
  });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.6 Get all camera parameters
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_ALL_PARAMS
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetAllParams() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_ALL_PARAMS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.7 Set feature parameters
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_FEATURE_PARAM
 * @param {boolean} has_auto
 * @param {number} auto_mode
 * @param {number} id
 * @param {number} mode_index
 * @param {number} index
 * @param {number} continue_value
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetFeatureParams(
  has_auto,
  auto_mode,
  id,
  mode_index,
  index,
  continue_value
) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_FEATURE_PARAM;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let param = Dwarfii_Api.CommonParam.create({
    hasAuto: has_auto,
    autoMode: auto_mode,
    id: id,
    modeIndex: mode_index,
    index: index,
    continueValue: continue_value,
  });
  let message = class_message.create({
    param: param,
  });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.8 Get all feature parameters
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetAllFeatureParams() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id =
    Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.9 Get the working status of the whole machine
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetSystemWorkingState() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id =
    Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.10 Take photos
 * Create Encoded Packet for the command CMD_CAMERA_TELE_PHOTOGRAPH
 * @returns {Uint8Array}
 */
export function messageCameraTelePhotograph() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_PHOTOGRAPH;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.11 Start continuous shooting
 * Create Encoded Packet for the command CMD_CAMERA_TELE_BURST
 * @returns {Uint8Array}
 */
export function messageCameraTeleStartBurst() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_BURST;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.12 Stop continuous shooting
 * Create Encoded Packet for the command CMD_CAMERA_TELE_STOP_BURST
 * @returns {Uint8Array}
 */
export function messageCameraTeleStopBurst() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_STOP_BURST;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.13 Start recording
 * Create Encoded Packet for the command CMD_CAMERA_TELE_START_RECORD
 * @returns {Uint8Array}
 */
export function messageCameraTeleStartRecord() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_START_RECORD;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.14 Stop recording
 * Create Encoded Packet for the command CMD_CAMERA_TELE_STOP_RECORD
 * @returns {Uint8Array}
 */
export function messageCameraTeleStopRecord() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_STOP_RECORD;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.15 Start time-lapse photography
 * Create Encoded Packet for the command CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO
 * @returns {Uint8Array}
 */
export function messageCameraTeleStartTimeLapsePhoto() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.16 Stop time-lapse photography
 * Create Encoded Packet for the command CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO
 * @returns {Uint8Array}
 */
export function messageCameraTeleStopTimeLapsePhoto() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain classname depending of the command
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.17 Set exposure mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_EXP_MODE
 * @param {number} mode ; //0: Auto 1: Manual  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetExpMode(mode) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_EXP_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ mode: mode });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.18 Acquire exposure mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_EXP_MODE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetExpMode() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_EXP_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.19 Set exposure value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_EXP
 * @param {number} index  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetExp(index) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_EXP;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ index: index });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.20 Get exposure value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_EXP
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetExp() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_EXP;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.21 Set gain mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_GAIN_MODE
 * @param {number} mode ; //0: Auto 1: Manual  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetGainMode(mode) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_GAIN_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ mode: mode });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.22 Acquisition gain mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_GAIN_MODE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetGainMode() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_GAIN_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.23 Set gain value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_GAIN
 * @param {number} index  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetGain(index) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_GAIN;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ index: index });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.24 Get gain value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_GAIN
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetGain() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_GAIN;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.25 Set IRCUT
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_IRCUT
 * @param {number} value  ; //IRCUT value 0: CUT 1: PASS
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetIRCut(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_IRCUT;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.26 Get IRCUT status
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_IRCUT
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetIRCut() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_IRCUT;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.27 Set white balance mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_WB_MODE
 * @param {number} mode ; //0: Auto 1: Manual  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetWBMode(mode) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_WB_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ mode: mode });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.28 Acquire white balance mode
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_WB_MODE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetWBMode() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_WB_MODE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.29 Set white balance scene
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_WB_SCENE
 * @param {number} value ; // See whiteBalanceScenesIDValue
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetWBScene(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_WB_SCENE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.30 Get white balance scene
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_WB_SCENE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetWBScene() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_WB_SCENE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.31 Set the white balance color temperature value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_WB_CT
 * @param {number} index  ; // See whiteBalanceScenesIDValue
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetWBColorTemp(index) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_WB_CT;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ index: index });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.32 Obtain the white balance color temperature value
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_WB_CT
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetWBColorTemp() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_WB_CT;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.33 Set brightness
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_BRIGHTNESS
 * @param {number} value  ; B = (A + 100) * 255.0 / 200
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetBrightness(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_BRIGHTNESS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.34 Acquire brightness
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_BRIGHTNESS
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetBrightness() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_BRIGHTNESS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.35 Set contrast
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_CONTRAST
 * UI value (A) -100  100  0 (Default)
 * @param {number} value  ; B = (A + 100) * 255.0 / 200
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetContrast(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_CONTRAST;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.36 Get contrast
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_CONTRAST
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetContrast() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_CONTRAST;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.37 Set saturation
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_SATURATION
 * UI value (A) -100  100  0 (Default)
 * @param {number} value  ; B = (A + 100) * 255.0 / 200
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetSaturation(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_SATURATION;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.38 Acquire saturation
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_SATURATION
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetSaturation() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_SATURATION;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.39 Set tone
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_HUE
 * UI value (A) -180  180  0 (Default)
 * @param {number} value  ; B =(A + 180) * 255.0 / 360
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetHue(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_HUE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.40 Get hue
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_HUE
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetHue() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_HUE;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.41 Set sharpness
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_SHARPNESS
 * UI value (A) 0  100  50 (Default)
 * @param {number} value  ; B = A
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetSharpness(value) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_SHARPNESS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ value: value });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.42 Acquire sharpness
 * Create Encoded Packet for the command CMD_CAMERA_TELE_GET_SHARPNESS
 * @returns {Uint8Array}
 */
export function messageCameraTeleGetSharpness() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_GET_SHARPNESS;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.43 Set jpg preview quality
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_JPG_QUALITY
 * @param {number} quality  ;
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetJPGQuality(quality) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_JPG_QUALITY;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ quality: quality });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.44 Shoot RAW image
 * Create Encoded Packet for the command CMD_CAMERA_TELE_PHOTO_RAW
 * @returns {Uint8Array}
 */
export function messageCameraTelePhotoRaw() {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_PHOTO_RAW;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({});
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
/**
 * 4.7.45 Set rtsp preview bit rate type
 * Create Encoded Packet for the command CMD_CAMERA_TELE_SET_RTSP_BITRATE_TYPE
 * @param {number} bitrate_type ; 0:H264 1:H265
 * @returns {Uint8Array}
 */
export function messageCameraTeleSetRTSPPreviewBitsRate(bitrate_type) {
  let module_id = Dwarfii_Api.ModuleId.MODULE_CAMERA_TELE;
  let interface_id = Dwarfii_Api.DwarfCMD.CMD_CAMERA_TELE_SET_JPG_QUALITY;
  let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
  // Obtain a message class
  const cmdClass = cmdMapping[interface_id];
  let class_message = eval(`Dwarfii_Api.${cmdClass}`);
  // Encode message
  let message = class_message.create({ bitrateType: bitrate_type });
  console.log(
    `class Message = ${cmdClass} created message = ${JSON.stringify(message)}`
  );
  // return encoded Message Packet
  return createPacket(message, class_message, module_id, interface_id, type_id);
}
