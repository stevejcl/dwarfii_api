/** Current protocol surface. The legacy exports are compatibility-only.
 * Evidence: dwarfAlp b5a56f0 canonical firmware schemas and APK 3.4.1.
 * Wire IDs are NOT hardware model IDs. No process-global client configuration.
 */
import schema from "./protobuf/current.js";
import { currentFields, currentEnums } from "./protobuf/current-fields.js";
export const CurrentDwarfSchema = schema;
const clientSuffix = "-0000-1000-8000-00805F9B34FB";
const profiles = {
    1: {
        model: "dwarf2",
        hardwareId: 1,
        wireDeviceId: 4,
        majorVersion: 1,
        minorVersion: 20,
        clientId: `0000DAF2${clientSuffix}`,
        rtsp: false,
        scienceFilters: [
            { index: 0, label: "IR cut" },
            { index: 1, label: "IR pass" },
        ],
    },
    2: {
        model: "dwarf3",
        hardwareId: 2,
        wireDeviceId: 4,
        majorVersion: 1,
        minorVersion: 20,
        clientId: `0000DAF3${clientSuffix}`,
        rtsp: true,
        scienceFilters: [
            { index: 0, label: "VIS" },
            { index: 1, label: "Astro" },
            { index: 2, label: "Duo-Band" },
        ],
    },
    4: {
        model: "dwarfmini",
        hardwareId: 4,
        wireDeviceId: 4,
        majorVersion: 1,
        minorVersion: 20,
        clientId: `0000DAF4${clientSuffix}`,
        rtsp: true,
        scienceFilters: [
            { index: 1, label: "Astro" },
            { index: 2, label: "Duo-Band" },
        ],
    },
};
for (const profile of Object.values(profiles)) {
    profile.scienceFilters.forEach(Object.freeze);
    Object.freeze(profile.scienceFilters);
    Object.freeze(profile);
}
export function getCurrentProfile(hardwareId) {
    const profile = profiles[hardwareId];
    if (!profile)
        throw new CurrentProtocolError("unsupported", `Unsupported DWARF hardware ID ${hardwareId}`);
    return profile;
}
export { CurrentProtocolError } from "./current_errors.js";
import { CurrentProtocolError } from "./current_errors.js";
// module, command, canonical request, canonical response. Registry presence is
// schema/API evidence, not hardware certification or permission to execute.
export const CurrentCommands = {
    // APK3.4.3 WsCmd15860 -> MODULE_FACTORY_TEST12; read-only camera metadata.
    getCameraAndFocusInfo: [
        12,
        15860,
        "ReqGetCameraAndFocusInfo",
        "ResGetCameraAndFocusInfo",
    ],
    getDeviceState: [14, 16405, "ReqGetDeviceStateInfo", "ResGetDeviceStateInfo"],
    enterCamera: [14, 16404, "ReqEnterCamera", "ResEnterCamera"],
    switchShootingMode: [
        14,
        16402,
        "ReqSwitchShootingMode",
        "ResSwitchShootingMode",
    ],
    switchShootingTech: [
        14,
        16403,
        "ReqSwitchShootingTech",
        "ResSwitchShootingTech",
    ],
    telePreviewQuality: [1, 10050, "ReqSetPreviewQuality", "ComResponse"],
    widePreviewQuality: [2, 12036, "ReqSetPreviewQuality", "ComResponse"],
    setExposure: [15, 16700, "param.ReqSetExposure", "ComResponse"],
    setGain: [15, 16701, "param.ReqSetGain", "ComResponse"],
    setWhiteBalance: [15, 16702, "param.ReqSetWb", "ComResponse"],
    setIntegerParameter: [
        15,
        16703,
        "param.ReqSetGeneralIntParam",
        "ComResponse",
    ],
    setFloatParameter: [
        15,
        16704,
        "param.ReqSetGeneralFloatParam",
        "ComResponse",
    ],
    setBooleanParameter: [
        15,
        16705,
        "param.ReqSetGeneralBoolParams",
        "ComResponse",
    ],
    setAutoParameters: [
        15,
        16706,
        "param.ReqSetAutoParam",
        "param.ResSetAutoParam",
    ],
    getQuickSets: [3, 11040, "ReqGetQuickSetList", "ResGetQuickSetList"],
    setQuickSet: [3, 11041, "ReqSetQuickSet", "ResSetQuickSet"],
    startTeleCapture: [3, 11005, "ReqCaptureRawLiveStacking", "ResAstroShooting"],
    stopTeleCapture: [3, 11006, "ReqStopCaptureRawLiveStacking", "ComResponse"],
    startWideCapture: [
        3,
        11016,
        "ReqCaptureWideRawLiveStacking",
        "ResAstroShooting",
    ],
    startTeleMosaic: [3, 11031, "ReqStartMosaic", "ResAstroShooting"],
    // APK 3.4.1 WsCmd bindings; payloads recovered from firmware descriptors.
    syncShootingSchedule: [
        13,
        16100,
        "ReqSyncShootingSchedule",
        "ResSyncShootingSchedule",
    ],
    cancelShootingSchedule: [
        13,
        16101,
        "ReqCancelShootingSchedule",
        "ResCancelShootingSchedule",
    ],
    getAllShootingSchedule: [
        13,
        16102,
        "ReqGetAllShootingSchedule",
        "ResGetAllShootingSchedule",
    ],
    getShootingScheduleById: [
        13,
        16103,
        "ReqGetShootingScheduleById",
        "ResGetShootingScheduleById",
    ],
    replaceShootingSchedule: [
        13,
        16105,
        "ReqReplaceShootingSchedule",
        "ResReplaceShootingSchedule",
    ],
    unlockShootingSchedule: [
        13,
        16106,
        "ReqUnlockShootingSchedule",
        "ResUnlockShootingSchedule",
    ],
    lockShootingSchedule: [
        13,
        16107,
        "ReqLockShootingSchedule",
        "ResLockShootingSchedule",
    ],
    deleteShootingSchedule: [
        13,
        16108,
        "ReqDeleteShootingSchedule",
        "ResDeleteShootingSchedule",
    ],
    stopWideCapture: [
        3,
        11017,
        "ReqStopCaptureWideRawLiveStacking",
        "ComResponse",
    ],
    continueCapture: [3, 11050, "ReqContinueShooting", "ComResponse"],
    goLiveTele: [3, 11010, "ReqGoLive", "ComResponse"],
    goLiveWide: [3, 11020, "ReqGoLive", "ComResponse"],
    calibrate: [3, 11000, "ReqStartCalibration", "ComResponse"],
    stopCalibration: [3, 11001, "ReqStopCalibration", "ComResponse"],
    gotoEquatorial: [3, 11002, "ReqGotoDSO", "ComResponse"],
    stopGoto: [3, 11004, "ReqStopGoto", "ComResponse"],
    oneClickGoto: [3, 11013, "ReqOneClickGotoDSO", "ResOneClickGoto"],
    oneClickSolarGoto: [
        3,
        11014,
        "ReqOneClickGotoSolarSystem",
        "ResOneClickGotoSolarSystem",
    ],
    stopOneClickGoto: [3, 11015, "ReqStopOneClickGoto", "ComResponse"],
    startEqSolving: [3, 11018, "ReqStartEqSolving", "ResStartEqSolving"],
    stopEqSolving: [3, 11019, "ReqStopEqSolving", "ComResponse"],
    joystick: [6, 14006, "ReqMotorServiceJoystick", "ComResponse"],
    joystickStep: [6, 14007, "ReqMotorServiceJoystickFixedAngle", "ComResponse"],
    stopJoystick: [6, 14008, "ReqMotorServiceJoystickStop", "ComResponse"],
    autoFocus: [8, 15000, "ReqNormalAutoFocus", "ComResponse"],
    focusStep: [8, 15001, "ReqManualSingleStepFocus", "ComResponse"],
    focusContinuous: [8, 15002, "ReqManualContinuFocus", "ComResponse"],
    stopFocus: [8, 15003, "ReqStopManualContinuFocus", "ComResponse"],
    astroAutoFocus: [8, 15004, "ReqAstroAutoFocus", "ComResponse"],
    stopAstroAutoFocus: [8, 15005, "ReqStopAstroAutoFocus", "ComResponse"],
    getSavedInfinityPosition: [
        8,
        15011,
        "ReqGetUserInfinityPos",
        "ResUserInfinityPos",
    ],
    takeTelePhoto: [1, 10002, "ReqPhoto", "ComResponse"],
    takeWidePhoto: [2, 12022, "ReqPhoto", "ComResponse"],
    startTeleBurst: [1, 10003, "ReqBurstPhoto", "ComResponse"],
    stopTeleBurst: [1, 10004, "ReqStopBurstPhoto", "ComResponse"],
    startWideBurst: [2, 12023, "ReqBurstPhoto", "ComResponse"],
    stopWideBurst: [2, 12024, "ReqStopBurstPhoto", "ComResponse"],
    startTeleRecord: [1, 10005, "ReqStartRecord", "ComResponse"],
    stopTeleRecord: [1, 10006, "ReqStopRecord", "ComResponse"],
    startWideRecord: [2, 12030, "ReqStartRecord", "ComResponse"],
    stopWideRecord: [2, 12031, "ReqStopRecord", "ComResponse"],
    startTeleTimelapse: [1, 10033, "ReqStartTimeLapse", "ComResponse"],
    stopTeleTimelapse: [1, 10034, "ReqStopTimeLapse", "ComResponse"],
    startWideTimelapse: [2, 12025, "ReqStartTimeLapse", "ComResponse"],
    stopWideTimelapse: [2, 12026, "ReqStopTimeLapse", "ComResponse"],
    setMasterLock: [4, 13004, "ReqsetMasterLock", "ComResponse"],
    setTime: [4, 13000, "ReqSetTime", "ComResponse"],
    setTimezone: [4, 13001, "ReqSetTimezone", "ComResponse"],
};
export const CurrentNotifications = Object.freeze({
    15200: "PictureMatching",
    15201: "BatteryInfo",
    15202: "ChargingState",
    15203: "StorageInfo",
    15204: "RecordTime",
    15205: "TimeLapseOutTime",
    15206: "CaptureRawDarkState",
    15207: "ProgressCaptureRawDark",
    15208: "CaptureRawState",
    15209: "ProgressCaptureRawLiveStacking",
    15210: "AstroCalibrationState",
    15211: "AstroGotoState",
    15212: "AstroTrackingState",
    15218: "BurstProgress",
    15219: "PanoramaProgress",
    15220: "BurstProgress",
    15221: "RgbState",
    15222: "PowerIndState",
    15223: "HostSlaveMode",
    15224: "MTPState",
    15226: "TimeLapseOutTime",
    15227: "CPUMode",
    15228: "AstroTrackingSpecialState",
    15229: "PowerOff",
    15230: "AlbumUpdate",
    15231: "SentryState",
    15233: "OneClickGotoState",
    15234: "StreamType",
    15235: "RecordTime",
    15236: "CaptureRawState",
    15237: "ProgressCaptureRawLiveStacking",
    15239: "EqSolvingState",
    15240: "SentryState",
    15241: "LongExpPhotoProgress",
    15242: "LongExpPhotoProgress",
    15243: "Temperature",
    15247: "CaptureRawDarkState",
    15248: "ShootingScheduleResultAndState",
    15249: "ShootingTaskState",
    15250: "SkySeacherState",
    15256: "CalibrationResult",
    15257: "FocusPosition",
    15258: "SentryAutoHand",
    15261: "ResNotifyTaskState",
    15262: "BodyStatus",
    15263: "ProgressCaptureMosaic",
    15264: "GeneralIntParam",
    15265: "GeneralFloatParam",
    15266: "GeneralBoolParams",
    15267: "SwitchShootingMode",
    15270: "Wb",
    15273: "PhotoState",
    15274: "BurstState",
    15275: "RecordState",
    15276: "TimeLapseState",
    15277: "PanoramaState",
    15278: "AstroAutoFocusState",
    15279: "NormalAutoFocusState",
    15280: "AstroAutoFocusFastState",
    15281: "AreaAutoFocusState",
    15282: "DualCameraLinkageState",
    15284: "NormalTrackState",
    15285: "BurstProgress",
    15286: "RecordTime",
    15287: "TimeLapseOutTime",
    15288: "LongExpPhotoProgress",
    15289: "SentryState",
    15290: "CaptureCaliFrameState",
    15291: "CaptureCaliFrameProgress",
    15292: "CmosTemperature",
    15293: "PanoramaCompressionProgress",
    15294: "PanoramaCompressionComplete",
    15295: "DeviceAttitude",
    15296: "SkyTargetFinderState",
    15297: "PanoFramingRectUpdateNotify",
    15298: "PanoFramingThumbnailUpdateNotify",
    15299: "PanoFramingStateNotify",
    15300: "FocusPosition",
    15301: "LensDefog",
    15302: "AutoCooling",
    15303: "AutoShutdown",
    15304: "RollLevelCalibrationAngle",
    15305: "FocusPosition",
});
export function currentMessageType(name) {
    const type = name
        .split(".")
        .reduce((namespace, key) => namespace?.[key], schema);
    if (!type?.encode || !type?.decode)
        throw new CurrentProtocolError("unsupported", `Unknown canonical schema ${name}`);
    return type;
}
export function decodeCurrentMessage(name, bytes) {
    const type = currentMessageType(name);
    // Do not manufacture optional zeros or round uint64 identifiers to JS numbers.
    return type.toObject(type.decode(bytes), { longs: String, oneofs: true });
}
export function encodeCurrentMessage(name, values = {}) {
    const type = currentMessageType(name);
    const message = type.fromObject(validateCurrentValues(name, values));
    const error = type.verify(message);
    if (error)
        throw new CurrentProtocolError("invalid-parameter", `${name}: ${error}`);
    return type.encode(message).finish();
}
/** Reject misspelled/nested fields before protobuf's permissive conversion.
 * Also mirror proto3 generated Java/Python default omission for captured bytes.
 */
function validateCurrentValues(name, values) {
    const fields = currentFields[name]?.fields;
    if (!fields ||
        !values ||
        typeof values !== "object" ||
        Array.isArray(values)) {
        throw new CurrentProtocolError("invalid-parameter", `Invalid ${name} message`);
    }
    const output = {};
    const activeOneofs = new Set();
    for (const [key, value] of Object.entries(values)) {
        const field = fields[key];
        const fail = () => {
            throw new CurrentProtocolError("invalid-parameter", `Invalid or unknown ${name}.${key}`);
        };
        if (!field || value === undefined || value === null)
            fail();
        if (field.oneof) {
            if (activeOneofs.has(field.oneof))
                fail();
            activeOneofs.add(field.oneof);
        }
        if (field.rule === "repeated") {
            if (!Array.isArray(value))
                fail();
            output[key] = value.map((item) => {
                if (field.kind === "message")
                    return validateCurrentValues(field.type, item);
                validateScalar(field.type, item);
                return item;
            });
            continue;
        }
        if (field.kind === "message") {
            output[key] = validateCurrentValues(field.type, value);
            continue;
        }
        if (field.kind === "enum") {
            if (typeof value !== "number" ||
                !Object.values(currentEnums[field.type]).includes(value))
                fail();
        }
        else
            validateScalar(field.type, value);
        const isDefault = value === 0 ||
            value === false ||
            value === "" ||
            (/(?:int|fixed)64$/.test(field.type) && value === "0");
        if (!isDefault || field.optional || field.oneof)
            output[key] = value;
    }
    return output;
}
function validateScalar(type, value) {
    let valid;
    if (type === "string")
        valid = typeof value === "string";
    else if (type === "bool")
        valid = typeof value === "boolean";
    else if (type === "bytes")
        valid = value instanceof Uint8Array;
    else if (/(?:int|fixed)64$/.test(type)) {
        // Strings only: fromObject would silently round unsafe JS numbers.
        valid = typeof value === "string" && /^-?\d+$/.test(value);
        if (valid) {
            const number = BigInt(value);
            const unsigned = type === "uint64" || type === "fixed64";
            valid =
                number >= (unsigned ? 0n : -(1n << 63n)) &&
                    number <= (unsigned ? (1n << 64n) - 1n : (1n << 63n) - 1n);
        }
    }
    else if (type === "float" || type === "double")
        valid = typeof value === "number" && Number.isFinite(value);
    else {
        const unsigned = type === "uint32" || type === "fixed32";
        valid =
            typeof value === "number" &&
                Number.isInteger(value) &&
                value >= (unsigned ? 0 : -2147483648) &&
                value <= (unsigned ? 4294967295 : 2147483647);
    }
    if (!valid)
        throw new CurrentProtocolError("invalid-parameter", `Invalid ${type} value`);
}
export function createCurrentPacket(profile, operation, values = {}) {
    const descriptor = CurrentCommands[operation];
    if (!descriptor)
        throw new CurrentProtocolError("unsupported", `Unknown DWARF operation ${operation}`);
    const [moduleId, cmd, requestType] = descriptor;
    validateCurrentOperation(profile, operation, values);
    const data = encodeCurrentMessage(requestType, values);
    return schema.WsPacket.encode({
        majorVersion: profile.majorVersion,
        minorVersion: profile.minorVersion,
        deviceId: profile.wireDeviceId,
        moduleId,
        cmd,
        data,
        clientId: profile.clientId,
    }).finish();
}
function validateCurrentOperation(profile, operation, values) {
    const range = (key, minimum, maximum, integer = false) => {
        const value = values[key];
        if (typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < minimum ||
            value > maximum ||
            (integer && !Number.isInteger(value))) {
            throw new CurrentProtocolError("invalid-parameter", `${operation}.${key} must be ${integer ? "an integer " : ""}between ${minimum} and ${maximum}`);
        }
    };
    if (["oneClickGoto", "gotoEquatorial"].includes(operation)) {
        range("ra", 0, operation === "oneClickGoto" ? 24 : 360);
        if (values.ra === (operation === "oneClickGoto" ? 24 : 360))
            throw new CurrentProtocolError("invalid-parameter", "Right ascension wraps at 24 hours /360 degrees");
        range("dec", -90, 90);
    }
    if ([
        "oneClickGoto",
        "oneClickSolarGoto",
        "calibrate",
        "startEqSolving",
    ].includes(operation)) {
        range("lon", -180, 180);
        range("lat", -90, 90);
    }
    if (["joystick", "joystickStep"].includes(operation)) {
        range("vectorAngle", 0, 360);
        range("vectorLength", 0, 1);
    }
    if (["focusStep", "focusContinuous"].includes(operation))
        range("direction", 0, 1, true);
    if (["startTeleBurst", "startWideBurst"].includes(operation))
        range("count", 1, 2147483647, true);
    if (operation === "startTeleCapture" &&
        !profile.scienceFilters.some((filter) => filter.index === values.irIndex)) {
        throw new CurrentProtocolError("invalid-parameter", "Choose a science filter supported by the connected model; dark frames use the calibration workflow");
    }
    if ([
        "setExposure",
        "setGain",
        "setWhiteBalance",
        "setIntegerParameter",
        "setFloatParameter",
        "setBooleanParameter",
    ].includes(operation)) {
        if (typeof values.paramId !== "string" || values.value === undefined)
            throw new CurrentProtocolError("invalid-parameter", "Parameter writes require a discovered lossless paramId and value");
    }
    if (["setExposure", "setGain"].includes(operation))
        range("mode", 0, 1, true);
    if (operation === "setQuickSet" &&
        (typeof values.infoId !== "string" || !values.infoId.trim()))
        throw new CurrentProtocolError("invalid-parameter", "Select a valid quick-set identifier");
}
export function decodeCurrentPacket(bytes) {
    try {
        const envelope = schema.WsPacket.decode(bytes);
        if (![1, 2].includes(envelope.majorVersion) ||
            ![0, 1, 2, 3].includes(envelope.type) ||
            !envelope.moduleId ||
            !envelope.cmd) {
            throw new Error("Invalid protocol envelope");
        }
        const { moduleId, cmd, type } = envelope;
        const descriptor = Object.values(CurrentCommands).find((entry) => entry[0] === moduleId && entry[1] === cmd);
        let messageName;
        if (type === 2 || (type === 3 && CurrentNotifications[cmd])) {
            const allowedModule = moduleId === 9 ||
                (cmd === 15223 && moduleId === 4) ||
                ([15264, 15265, 15266].includes(cmd) && moduleId === 15);
            const notification = allowedModule
                ? CurrentNotifications[cmd]
                : undefined;
            if (notification)
                messageName = cmd === 15261 ? notification : `notify.${notification}`;
        }
        else if (descriptor)
            messageName = descriptor[type === 0 ? 2 : 3];
        const rawData = new Uint8Array(envelope.data);
        return {
            majorVersion: envelope.majorVersion,
            minorVersion: envelope.minorVersion,
            deviceId: envelope.deviceId,
            clientId: envelope.clientId,
            moduleId,
            cmd,
            type,
            rawData,
            known: Boolean(messageName),
            data: messageName ? decodeCurrentMessage(messageName, rawData) : {},
        };
    }
    catch (error) {
        throw new CurrentProtocolError("decode", `Invalid DWARF packet: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export function assertCurrentSuccess(packet) {
    if (!packet.known)
        throw new CurrentProtocolError("unsupported", `Unknown response ${packet.moduleId}:${packet.cmd}`);
    // Omitted non-optional proto3 code is zero. This is acknowledgement only.
    const code = packet.data.code ?? 0;
    if (code !== 0) {
        const name = schema.DwarfErrorCode[code] ?? "UNKNOWN_ERROR";
        throw new CurrentProtocolError("device", `DWARF ${packet.cmd}: ${name} (${code})`, code, packet.cmd);
    }
}
export function degreesFromRaHours(raHours) {
    if (!Number.isFinite(raHours) || raHours < 0 || raHours >= 24)
        throw new CurrentProtocolError("invalid-parameter", "Right ascension must be in [0, 24) hours");
    return raHours * 15;
}
