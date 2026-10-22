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
export function messageV3SystemSetGPSLocation(lat: number, lon: number, alt: number, locationName: string): Uint8Array;
//# sourceMappingURL=v3_system.d.ts.map