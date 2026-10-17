/** Explicit current astronomy configuration/capture submission.
 * Evidence: dwarfAlp b5a56f0 session.py _enter_v3_astro_mode,
 * _resolve_v3_astro_controls, _select_v3_astro_preset, _configure_astro_capture.
 * This submits capture; only subsequent device progress/state establishes that
 * exposure started or completed. There is no automatic warning continuation.
 */
import { CurrentCommand, CurrentPacket, CurrentProfile } from "./current_protocol.js";
import { CurrentCameraCatalog } from "./current_catalog.js";
export interface CurrentCaptureSettings {
    cameraId: 0 | 1;
    exposureSeconds: number;
    gain: number;
    frameCount: number;
    /** Semantic hardware filter index, not a UI option's ordinal. Telephoto only. */
    filterIndex?: number;
}
export interface CurrentCaptureStep {
    operation: CurrentCommand;
    values: Record<string, unknown>;
}
export interface CurrentCaptureControls {
    exposure: {
        paramId: string;
        mode: 1;
        value: number;
    };
    gain: {
        paramId: string;
        mode: 1;
        value: number;
    };
    frameCount: {
        paramId: string;
        value: number;
    };
}
export interface CurrentCapturePlan {
    settings: Readonly<CurrentCaptureSettings>;
    controls: CurrentCaptureControls;
    sourceQuickSetInfoId: string;
    quickSetInfoId: string;
    /** Preserved from the firmware template, never repurposed as frame count. */
    resolutionIndex: number;
    steps: readonly CurrentCaptureStep[];
}
export interface CurrentCaptureTransport {
    request(operation: CurrentCommand, values?: Record<string, unknown>): Promise<CurrentPacket>;
    /** Present on CurrentWebSocketHandler; prevents a plan crossing reconnection. */
    readonly state?: {
        session: {
            generation: number;
        };
    };
}
export interface CurrentCaptureSubmission {
    status: "awaiting-progress";
    plan: CurrentCapturePlan;
    acknowledgement: CurrentPacket;
}
/** Resolve user-facing filter text without Mini-specific ordinal arithmetic. */
export declare function resolveCurrentScienceFilter(profile: CurrentProfile, value: number | string): number;
/** All catalog/settings validation occurs before any mode or capture command. */
export declare function resolveCurrentCaptureControls(profile: CurrentProfile, catalog: CurrentCameraCatalog, settings: CurrentCaptureSettings): CurrentCaptureControls;
/** Prepare only from an actual camera-scoped quick-set response. Never invent
 * or interpret the unknown tuple components. Modify duration/gain only.
 */
export declare function buildCurrentCapturePlan(profile: CurrentProfile, catalog: CurrentCameraCatalog, settings: CurrentCaptureSettings, quickSets: Record<string, unknown>): CurrentCapturePlan;
/** Pure adaptation for an OBSERVED active capture namespace (11/13). This never
 * sends automatically: a new mode must be supported by an actual15264 echo and
 * correlated with the active camera/capture before the caller applies it.
 */
export declare function currentCaptureControlsForObservedMode(controls: CurrentCaptureControls, modeId: number): CurrentCaptureControls;
export declare function executeCurrentCapture(transport: CurrentCaptureTransport, profile: CurrentProfile, catalog: CurrentCameraCatalog, settings: CurrentCaptureSettings): Promise<CurrentCaptureSubmission>;
//# sourceMappingURL=current_capture.d.ts.map