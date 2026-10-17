/** Request correlation and authoritative state, independent of browser/Node transport.
 * Evidence: dwarfAlp dwarf/ws_client.py and canonical task_center/notify schemas.
 */
import { CurrentCommand, CurrentPacket, CurrentProfile } from "./current_protocol.js";
export type SessionPhase = "disconnected" | "transport-open" | "ready";
export interface CurrentSessionState {
    phase: SessionPhase;
    ownership: "unknown" | "control" | "slave";
    snapshot?: Record<string, any>;
    notifications: ReadonlyMap<number, CurrentPacket>;
    parameters: ReadonlyMap<string, Record<string, any>>;
    generation: number;
}
export declare class CurrentSession {
    readonly profile: CurrentProfile;
    private pending;
    private timedOut;
    private send?;
    private listeners;
    private current;
    constructor(profile: CurrentProfile);
    get state(): CurrentSessionState;
    subscribe(listener: (state: CurrentSessionState, packet?: CurrentPacket) => void): () => void;
    open(send: (bytes: Uint8Array) => void): void;
    close(reason?: string): void;
    request(operation: CurrentCommand, values?: Record<string, unknown>, timeoutMs?: number): Promise<CurrentPacket>;
    receive(bytes: Uint8Array): CurrentPacket;
    private updateOwnership;
    private emit;
}
//# sourceMappingURL=current_session.d.ts.map