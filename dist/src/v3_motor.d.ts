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
export function messageV3MotorServiceJoystick(vectorAngle: number, vectorLength: number): Uint8Array;
/**
 * V3: Stop joystick motor control
 * Create Encoded Packet for the command CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP
 * @returns {Uint8Array}
 */
export function messageV3MotorServiceJoystickStop(): Uint8Array;
//# sourceMappingURL=v3_motor.d.ts.map