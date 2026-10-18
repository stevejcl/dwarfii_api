/** Native deep-sky timed schedules, evidenced by APK 3.4.3 and both current
 * firmware descriptors. Protocol capability comes from getDefaultParamsConfig,
 * never the firmware release or the WebSocket packet envelope.
 */
import { CurrentCommand, CurrentPacket, CurrentProfile } from "./current_protocol.js";
import { CurrentCameraCatalog } from "./current_catalog.js";
export interface CurrentScheduleProtocolVersion {
    readonly majorVersion: number;
    readonly minorVersion: number;
}
export interface CurrentScheduleIdentity {
    hardwareId: number;
    macAddress: string;
    /** HTTP getDefaultParamsConfig majorVersion/minorVersion; not WS headers. */
    protocolVersion?: CurrentScheduleProtocolVersion;
}
export interface CurrentTimedTaskInput {
    id: string;
    target: string;
    rightAscensionHours: number;
    declinationDegrees: number;
    startTimeSeconds: number;
    endTimeSeconds: number;
    exposureSeconds: number;
    gain: number;
    filterIndex: number;
}
export interface CurrentTimedScheduleInput {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    /** IANA timezone of the observing site; used to initialize the device clock. */
    timezone: string;
    autofocus: boolean;
    /** True skips calibration when the scheduled job runs. */
    skipCalibration?: boolean;
    cityName?: string;
    /** Observing-night/date anchor, independent of the task execution window. */
    planningTimeSeconds?: number;
    tasks: readonly CurrentTimedTaskInput[];
}
export interface CurrentNativeSchedule extends Record<string, unknown> {
    scheduleId: string;
    scheduleName: string;
    deviceId: number;
    macAddress: string;
    startTime: string;
    endTime: string;
    state: number;
    params: string;
    shootingTasks: Record<string, unknown>[];
}
export interface CurrentScheduleTransport {
    readonly profile: CurrentProfile;
    readonly state: {
        session: {
            generation: number;
            ownership: string;
            phase: string;
            peerProtocolVersion?: CurrentScheduleProtocolVersion;
        };
    };
    request(operation: CurrentCommand, values?: Record<string, unknown>): Promise<CurrentPacket>;
}
/** APK HTTP config ProtocolVersion: D3 >=1.9; D2/Mini >=1.7.
 * A WS packet header is not a capability source. Unknown config is unsupported.
 */
export declare function supportsCurrentNativeSchedules(hardwareId: number, peer: CurrentScheduleProtocolVersion | undefined): boolean;
/** Create an app-compatible timed job. Counts are progress, not frame quotas.
 * This prepares data only; submitCurrentTimedSchedule checks live capability.
 */
export declare function buildCurrentTimedSchedule(identity: CurrentScheduleIdentity, catalog: CurrentCameraCatalog, input: CurrentTimedScheduleInput, nowSeconds?: number): CurrentNativeSchedule;
/** Submit a caller-assigned ID with existing-list preflight and list readback. */
export declare function submitCurrentTimedSchedule(client: CurrentScheduleTransport, identity: CurrentScheduleIdentity, catalog: CurrentCameraCatalog, input: CurrentTimedScheduleInput, now?: () => number): Promise<{
    status: "queued";
    schedule: CurrentNativeSchedule;
}>;
export type CurrentTimedScheduleDraft = Omit<CurrentTimedScheduleInput, "id" | "tasks"> & {
    tasks: readonly Omit<CurrentTimedTaskInput, "id">[];
};
/** Explicit first-job creation without relying on the firmware's broken empty
 * list response. IDs are generated internally with a fresh cryptographic UUID;
 * caller IDs are never reused. Native conflict checks remain authoritative,
 * replacement is never requested, and exact per-ID readback is mandatory.
 * This is not an automatic fallback from a timed-out or failed list request.
 */
export declare function createCurrentTimedSchedule(client: CurrentScheduleTransport, identity: CurrentScheduleIdentity, catalog: CurrentCameraCatalog, draft: CurrentTimedScheduleDraft, now?: () => number): Promise<{
    status: "queued";
    schedule: CurrentNativeSchedule;
}>;
//# sourceMappingURL=current_schedule.d.ts.map