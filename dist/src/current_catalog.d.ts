/** Pure current-firmware discovery helpers; no transport or cross-device cache.
 * Evidence: dwarfAlp b5a56f0 tests/test_session_camera.py and
 * docs/apk-analysis/camera-parameters.md. Always pass HTTP response.text(), not
 * response.json(): the latter irreversibly rounds firmware uint64 paramIds.
 */
import { CurrentProfile } from "./current_protocol.js";
export { parseCurrentJsonLossless } from "./current_json.js";
export declare function normalizeCurrentParamId(value: unknown): string;
export interface CurrentParamNamespace {
    shootingMode: number;
    category: number;
    cameraId: number;
    paramIndex: number;
    /** Unknown/reserved bits 8..43 retained, never interpreted as a setting. */
    reserved: string;
}
export declare function decodeCurrentParamId(paramId: unknown): CurrentParamNamespace;
export declare function encodeCurrentParamId(parts: Omit<CurrentParamNamespace, "reserved"> & {
    reserved?: string;
}): string;
/** Reapply a discovered parameter in a runtime namespace (e.g. 11/13),
 * preserving category, camera, parameter index and every unknown lower bit.
 */
export declare function withCurrentParamMode(paramId: unknown, shootingMode: number): string;
export declare function sameCurrentParameterAcrossModes(first: unknown, second: unknown): boolean;
export interface CurrentDeviceInfo {
    hardwareId: number;
    profile: CurrentProfile;
    /** Verbatim reported device name; not used to infer hardware or firmware. */
    deviceName?: string;
}
export declare function normalizeCurrentDeviceInfo(input: unknown): CurrentDeviceInfo;
export type CurrentParameterValue = string | number | boolean;
export interface CurrentParameterOption {
    value: CurrentParameterValue;
    label: string;
    /** Exposure duration parsed from the actual firmware label, not its index. */
    seconds?: number;
}
export interface CurrentCatalogParameter {
    key: string;
    label: string;
    source: "special" | "general";
    paramId?: string;
    namespace?: CurrentParamNamespace;
    currentMode?: number;
    currentValue?: CurrentParameterValue;
    currentLabel?: string;
    options?: readonly CurrentParameterOption[];
    range?: {
        minimum: number;
        maximum: number;
        integer: boolean;
    };
}
export interface CurrentCatalogCamera {
    cameraId: number;
    parameters: readonly CurrentCatalogParameter[];
}
export interface CurrentCameraCatalog {
    /** Mode used for this specific request; never a process-global assumption. */
    modeId: number;
    cameras: readonly CurrentCatalogCamera[];
    /** Firmware camera-15 controls apply to the technique, never one camera. */
    sharedParameters?: readonly CurrentCatalogParameter[];
}
export declare function parseCurrentExposureSeconds(label: string): number | undefined;
export declare function normalizeCurrentCameraCatalog(input: unknown, requestedModeId: number): CurrentCameraCatalog;
export declare function findCurrentCameraParameter(catalog: CurrentCameraCatalog, cameraId: number, key: string): CurrentCatalogParameter;
export declare function selectCurrentParameterValue(parameter: CurrentCatalogParameter, value: CurrentParameterValue): {
    paramId: string;
    value: CurrentParameterValue;
};
export declare function selectCurrentExposure(catalog: CurrentCameraCatalog, cameraId: number, seconds: number): {
    paramId: string;
    value: number;
};
//# sourceMappingURL=current_catalog.d.ts.map