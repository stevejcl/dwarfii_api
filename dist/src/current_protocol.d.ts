/** Current protocol surface. The legacy exports are compatibility-only.
 * Evidence: dwarfAlp b5a56f0 canonical firmware schemas and APK 3.4.1.
 * Wire IDs are NOT hardware model IDs. No process-global client configuration.
 */
import schema from "./protobuf/current.js";
export declare const CurrentDwarfSchema: typeof schema;
export type CurrentModel = "dwarf2" | "dwarf3" | "dwarfmini";
export interface CurrentProfile {
    readonly model: CurrentModel;
    readonly hardwareId: number;
    readonly wireDeviceId: number;
    readonly majorVersion: number;
    readonly minorVersion: number;
    readonly clientId: string;
    readonly scienceFilters: readonly {
        index: number;
        label: string;
    }[];
    readonly rtsp: boolean;
}
export declare function getCurrentProfile(hardwareId: number): CurrentProfile;
export type ProtocolErrorKind = "unsupported" | "invalid-parameter" | "decode" | "busy" | "transport" | "timeout" | "device";
export { CurrentProtocolError } from "./current_errors.js";
export declare const CurrentCommands: {
    readonly getCameraAndFocusInfo: readonly [12, 15860, "ReqGetCameraAndFocusInfo", "ResGetCameraAndFocusInfo"];
    readonly getDeviceState: readonly [14, 16405, "ReqGetDeviceStateInfo", "ResGetDeviceStateInfo"];
    readonly enterCamera: readonly [14, 16404, "ReqEnterCamera", "ResEnterCamera"];
    readonly switchShootingMode: readonly [14, 16402, "ReqSwitchShootingMode", "ResSwitchShootingMode"];
    readonly switchShootingTech: readonly [14, 16403, "ReqSwitchShootingTech", "ResSwitchShootingTech"];
    readonly telePreviewQuality: readonly [1, 10050, "ReqSetPreviewQuality", "ComResponse"];
    readonly widePreviewQuality: readonly [2, 12036, "ReqSetPreviewQuality", "ComResponse"];
    readonly setExposure: readonly [15, 16700, "param.ReqSetExposure", "ComResponse"];
    readonly setGain: readonly [15, 16701, "param.ReqSetGain", "ComResponse"];
    readonly setWhiteBalance: readonly [15, 16702, "param.ReqSetWb", "ComResponse"];
    readonly setIntegerParameter: readonly [15, 16703, "param.ReqSetGeneralIntParam", "ComResponse"];
    readonly setFloatParameter: readonly [15, 16704, "param.ReqSetGeneralFloatParam", "ComResponse"];
    readonly setBooleanParameter: readonly [15, 16705, "param.ReqSetGeneralBoolParams", "ComResponse"];
    readonly setAutoParameters: readonly [15, 16706, "param.ReqSetAutoParam", "param.ResSetAutoParam"];
    readonly getQuickSets: readonly [3, 11040, "ReqGetQuickSetList", "ResGetQuickSetList"];
    readonly setQuickSet: readonly [3, 11041, "ReqSetQuickSet", "ResSetQuickSet"];
    readonly startTeleCapture: readonly [3, 11005, "ReqCaptureRawLiveStacking", "ResAstroShooting"];
    readonly stopTeleCapture: readonly [3, 11006, "ReqStopCaptureRawLiveStacking", "ComResponse"];
    readonly startWideCapture: readonly [3, 11016, "ReqCaptureWideRawLiveStacking", "ResAstroShooting"];
    readonly startTeleMosaic: readonly [3, 11031, "ReqStartMosaic", "ResAstroShooting"];
    readonly syncShootingSchedule: readonly [13, 16100, "ReqSyncShootingSchedule", "ResSyncShootingSchedule"];
    readonly cancelShootingSchedule: readonly [13, 16101, "ReqCancelShootingSchedule", "ResCancelShootingSchedule"];
    readonly getAllShootingSchedule: readonly [13, 16102, "ReqGetAllShootingSchedule", "ResGetAllShootingSchedule"];
    readonly getShootingScheduleById: readonly [13, 16103, "ReqGetShootingScheduleById", "ResGetShootingScheduleById"];
    readonly replaceShootingSchedule: readonly [13, 16105, "ReqReplaceShootingSchedule", "ResReplaceShootingSchedule"];
    readonly unlockShootingSchedule: readonly [13, 16106, "ReqUnlockShootingSchedule", "ResUnlockShootingSchedule"];
    readonly lockShootingSchedule: readonly [13, 16107, "ReqLockShootingSchedule", "ResLockShootingSchedule"];
    readonly deleteShootingSchedule: readonly [13, 16108, "ReqDeleteShootingSchedule", "ResDeleteShootingSchedule"];
    readonly stopWideCapture: readonly [3, 11017, "ReqStopCaptureWideRawLiveStacking", "ComResponse"];
    readonly continueCapture: readonly [3, 11050, "ReqContinueShooting", "ComResponse"];
    readonly goLiveTele: readonly [3, 11010, "ReqGoLive", "ComResponse"];
    readonly goLiveWide: readonly [3, 11020, "ReqGoLive", "ComResponse"];
    readonly calibrate: readonly [3, 11000, "ReqStartCalibration", "ComResponse"];
    readonly stopCalibration: readonly [3, 11001, "ReqStopCalibration", "ComResponse"];
    readonly gotoEquatorial: readonly [3, 11002, "ReqGotoDSO", "ComResponse"];
    readonly stopGoto: readonly [3, 11004, "ReqStopGoto", "ComResponse"];
    readonly oneClickGoto: readonly [3, 11013, "ReqOneClickGotoDSO", "ResOneClickGoto"];
    readonly oneClickSolarGoto: readonly [3, 11014, "ReqOneClickGotoSolarSystem", "ResOneClickGotoSolarSystem"];
    readonly stopOneClickGoto: readonly [3, 11015, "ReqStopOneClickGoto", "ComResponse"];
    readonly startEqSolving: readonly [3, 11018, "ReqStartEqSolving", "ResStartEqSolving"];
    readonly stopEqSolving: readonly [3, 11019, "ReqStopEqSolving", "ComResponse"];
    readonly joystick: readonly [6, 14006, "ReqMotorServiceJoystick", "ComResponse"];
    readonly joystickStep: readonly [6, 14007, "ReqMotorServiceJoystickFixedAngle", "ComResponse"];
    readonly stopJoystick: readonly [6, 14008, "ReqMotorServiceJoystickStop", "ComResponse"];
    readonly autoFocus: readonly [8, 15000, "ReqNormalAutoFocus", "ComResponse"];
    readonly focusStep: readonly [8, 15001, "ReqManualSingleStepFocus", "ComResponse"];
    readonly focusContinuous: readonly [8, 15002, "ReqManualContinuFocus", "ComResponse"];
    readonly stopFocus: readonly [8, 15003, "ReqStopManualContinuFocus", "ComResponse"];
    readonly astroAutoFocus: readonly [8, 15004, "ReqAstroAutoFocus", "ComResponse"];
    readonly stopAstroAutoFocus: readonly [8, 15005, "ReqStopAstroAutoFocus", "ComResponse"];
    readonly getSavedInfinityPosition: readonly [8, 15011, "ReqGetUserInfinityPos", "ResUserInfinityPos"];
    readonly takeTelePhoto: readonly [1, 10002, "ReqPhoto", "ComResponse"];
    readonly takeWidePhoto: readonly [2, 12022, "ReqPhoto", "ComResponse"];
    readonly startTeleBurst: readonly [1, 10003, "ReqBurstPhoto", "ComResponse"];
    readonly stopTeleBurst: readonly [1, 10004, "ReqStopBurstPhoto", "ComResponse"];
    readonly startWideBurst: readonly [2, 12023, "ReqBurstPhoto", "ComResponse"];
    readonly stopWideBurst: readonly [2, 12024, "ReqStopBurstPhoto", "ComResponse"];
    readonly startTeleRecord: readonly [1, 10005, "ReqStartRecord", "ComResponse"];
    readonly stopTeleRecord: readonly [1, 10006, "ReqStopRecord", "ComResponse"];
    readonly startWideRecord: readonly [2, 12030, "ReqStartRecord", "ComResponse"];
    readonly stopWideRecord: readonly [2, 12031, "ReqStopRecord", "ComResponse"];
    readonly startTeleTimelapse: readonly [1, 10033, "ReqStartTimeLapse", "ComResponse"];
    readonly stopTeleTimelapse: readonly [1, 10034, "ReqStopTimeLapse", "ComResponse"];
    readonly startWideTimelapse: readonly [2, 12025, "ReqStartTimeLapse", "ComResponse"];
    readonly stopWideTimelapse: readonly [2, 12026, "ReqStopTimeLapse", "ComResponse"];
    readonly setMasterLock: readonly [4, 13004, "ReqsetMasterLock", "ComResponse"];
    readonly setTime: readonly [4, 13000, "ReqSetTime", "ComResponse"];
    readonly setTimezone: readonly [4, 13001, "ReqSetTimezone", "ComResponse"];
};
export type CurrentCommand = keyof typeof CurrentCommands;
export declare const CurrentNotifications: Readonly<Record<number, string>>;
export declare function currentMessageType(name: string): any;
export declare function decodeCurrentMessage(name: string, bytes: Uint8Array): Record<string, any>;
export declare function encodeCurrentMessage(name: string, values?: Record<string, unknown>): Uint8Array;
export declare function createCurrentPacket(profile: CurrentProfile, operation: CurrentCommand, values?: Record<string, unknown>): Uint8Array;
export interface CurrentPacket {
    /** Received envelope metadata; outbound profile settings are not peer capabilities. */
    majorVersion?: number;
    minorVersion?: number;
    deviceId?: number;
    clientId?: string;
    moduleId: number;
    cmd: number;
    type: number;
    data: Record<string, any>;
    known: boolean;
    rawData: Uint8Array;
}
export declare function decodeCurrentPacket(bytes: Uint8Array): CurrentPacket;
export declare function assertCurrentSuccess(packet: CurrentPacket): void;
export declare function degreesFromRaHours(raHours: number): number;
//# sourceMappingURL=current_protocol.d.ts.map