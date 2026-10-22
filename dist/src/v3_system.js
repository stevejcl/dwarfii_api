/** @module v3_system */
// Import the generated protobuf module
import $root from "./protobuf/protobuf.js";
const Dwarfii_Api = $root;
import { createPacket } from "./api_utils.js";
import { cmdMapping } from "./cmd_mapping.js";
/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE SYSTEM (13010) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Set GPS location
 * Create Encoded Packet for the command CMD_V3_SYSTEM_SET_GPS_LOCATION
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} alt - Altitude in meters
 * @param {string} locationName - Location name (e.g. "日本")
 * @returns {Uint8Array}
 */
export function messageV3SystemSetGPSLocation(lat, lon, alt, locationName) {
    let module_id = Dwarfii_Api.ModuleId.MODULE_SYSTEM;
    let interface_id = Dwarfii_Api.DwarfCMD.CMD_V3_SYSTEM_SET_GPS_LOCATION;
    let type_id = Dwarfii_Api.MessageTypeId.TYPE_REQUEST;
    const cmdClass = cmdMapping[interface_id];
    let class_message = Dwarfii_Api[cmdClass];
    let message = class_message.create({
        lat: lat,
        lon: lon,
        alt: alt,
        locationName: locationName,
    });
    console.log(`class Message = ${cmdClass} created message = ${JSON.stringify(message)}`);
    return createPacket(message, class_message, module_id, interface_id, type_id);
}
