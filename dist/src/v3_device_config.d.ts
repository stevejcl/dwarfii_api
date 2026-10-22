/*** --------------------------------------------------------- ***/
/*** --------- V3 MODULE DEVICE CONFIG (16xxx) --------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Get complete device work state (APK: WsGetDeviceStateInfo)
 * Create an encoded packet for command 16405.
 * @returns {Uint8Array}
 */
export function messageV3GetDeviceStateInfo(): Uint8Array;
/**
 * Backward-compatible alias for the earlier, incorrectly inferred command name.
 * Command 16405 is GetDeviceStateInfo, not a static device-config request.
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigGetConfig(): Uint8Array;
/**
 * V3: Mode query
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_MODE_QUERY
 * @param {number} targetMode - Target mode to query (2=standard, 8=astro)
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigModeQuery(targetMode: number): Uint8Array;
/**
 * V3: Mode switch (to astro mode)
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_MODE_SWITCH
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigModeSwitch(): Uint8Array;
/**
 * V3: Shooting mode switch
 * Create Encoded Packet for the command CMD_V3_DEVICE_CONFIG_SHOOTING_MODE
 * @param {number} modeId - 1=photo, 3=burst, 4=video, 5=timelapse
 * @returns {Uint8Array}
 */
export function messageV3DeviceConfigShootingModeSwitch(modeId: number): Uint8Array;
//# sourceMappingURL=v3_device_config.d.ts.map