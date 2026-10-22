/** @module v3_schedule */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
/*** --------------------------------------------------------- ***/
/*** ----------- V3 MODULE SCHEDULE (16102) ------------------ ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Get shooting schedule
 * Create Encoded Packet for the command CMD_V3_SCHEDULE_GET
 * @returns {Uint8Array}
 */
export function messageV3ScheduleGet() {
    let module_id = Dwarfii_Api.ModuleId.MODULE_SHOOTING_SCHEDULE;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_SCHEDULE_GET;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    let class_message = Dwarfii_Api.ReqGetAllShootingSchedule;
    let message = class_message.create({});
    console.log(`class Message = ReqGetAllShootingSchedule created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
