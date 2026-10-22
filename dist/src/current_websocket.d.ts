/** Epoch-owned current-protocol transport. No singleton, HTTP authority, or
 * automatic camera/ownership/motion commands. Reconnects only bootstrap a fresh
 * read-only state snapshot and never replay application requests.
 */
import { CurrentCommand, CurrentPacket, CurrentProfile, CurrentProtocolError } from "./current_protocol.js";
import { CurrentSession, CurrentSessionState } from "./current_session.js";
export interface CurrentWebSocketLike {
    readonly readyState: number;
    binaryType: "blob" | "arraybuffer";
    send(data: string | Uint8Array): void;
    close(code?: number, reason?: string): void;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
}
export interface CurrentWebSocketOptions {
    webSocketFactory?: (url: string) => CurrentWebSocketLike;
    connectionTimeoutMs?: number;
    readinessTimeoutMs?: number;
    requestTimeoutMs?: number;
    /** Zero disables read-only device-state liveness probes. Browser WebSocket
     * cannot send control ping frames; text "ping" is not a protocol heartbeat. */
    heartbeatIntervalMs?: number;
    heartbeatTimeoutMs?: number;
    /** Finite retry budget per explicit connection, not reset by transient readiness. */
    reconnectDelaysMs?: readonly number[];
    onListenerError?: (error: unknown) => void;
}
export interface CurrentWebSocketState {
    transport: "disconnected" | "connecting" | "open" | "reconnecting";
    session: CurrentSessionState;
    reconnectAttempt: number;
    error?: CurrentProtocolError;
}
type Listener = (state: CurrentWebSocketState, packet?: CurrentPacket) => void;
export declare class CurrentWebSocketHandler {
    readonly profile: CurrentProfile;
    readonly session: CurrentSession;
    private readonly factory;
    private readonly connectionTimeoutMs;
    private readonly readinessTimeoutMs;
    private readonly requestTimeoutMs;
    private readonly heartbeatIntervalMs;
    private readonly heartbeatTimeoutMs;
    private readonly reconnectDelaysMs;
    private readonly onListenerError?;
    private readonly listeners;
    private socket?;
    private detachSocket?;
    private desiredUrl?;
    private epoch;
    private attemptsUsed;
    private transport;
    private error?;
    private connectionTimer?;
    private readinessTimer?;
    private heartbeatTimer?;
    private reconnectTimer?;
    constructor(profile: CurrentProfile, options?: CurrentWebSocketOptions);
    get state(): CurrentWebSocketState;
    /** Protocol-ready, not merely a successful WebSocket handshake. */
    get connected(): boolean;
    get ready(): boolean;
    get transportOpen(): boolean;
    subscribe(listener: Listener): () => void;
    /** Idempotent while the same endpoint is connecting/open/reconnecting.
     * After terminal failure, calling connect explicitly starts a new retry budget.
     */
    connect(url: string): void;
    request(operation: CurrentCommand, values?: Record<string, unknown>, timeoutMs?: number): Promise<CurrentPacket>;
    private stateRead?;
    private stateReadRevision;
    close(reason?: string): void;
    private startAttempt;
    private binaryBytes;
    private fail;
    private releaseSocket;
    private clearReadinessTimer;
    private clearTimers;
    private asTransportError;
    private publish;
    private notifyListener;
}
export {};
//# sourceMappingURL=current_websocket.d.ts.map