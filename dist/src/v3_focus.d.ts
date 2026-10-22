/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE FOCUS (15xxx) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Focus init
 * Create Encoded Packet for the command CMD_V3_FOCUS_INIT
 * @returns {Uint8Array}
 */
export function messageV3FocusInit(): Uint8Array;
/**
 * V3: Start astro auto focus
 * Create Encoded Packet for the command CMD_FOCUS_START_ASTRO_AUTO_FOCUS
 * Sends with mode=1 to start
 * @returns {Uint8Array}
 */
export function messageV3FocusAutoFocusStart(): Uint8Array;
/**
 * V3: Manual single-step focus
 * Create Encoded Packet for the command CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS
 * @param {number} direction - Focus direction (0=forward, 1=backward)
 * @returns {Uint8Array}
 */
export function messageV3FocusManualSingleStep(direction?: number): Uint8Array;
/**
 * V3: Start manual continuous focus
 * Create Encoded Packet for the command CMD_FOCUS_START_MANUAL_CONTINU_FOCUS
 * @param {number} direction - Focus direction (0=forward, 1=backward)
 * @returns {Uint8Array}
 */
export function messageV3FocusManualContinuStart(direction?: number): Uint8Array;
/**
 * V3: Stop manual continuous focus
 * Create Encoded Packet for the command CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS
 * @returns {Uint8Array}
 */
export function messageV3FocusManualContinuStop(): Uint8Array;
//# sourceMappingURL=v3_focus.d.ts.map