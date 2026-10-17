/** Epoch-owned current-protocol transport. No singleton, HTTP authority, or
 * automatic camera/ownership/motion commands. Reconnects only bootstrap a fresh
 * read-only state snapshot and never replay application requests.
 */
import {
  CurrentCommand,
  CurrentPacket,
  CurrentProfile,
  CurrentProtocolError,
} from "./current_protocol.js";
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

type Timer = ReturnType<typeof setTimeout>;
type Listener = (state: CurrentWebSocketState, packet?: CurrentPacket) => void;

export class CurrentWebSocketHandler {
  readonly session: CurrentSession;
  private readonly factory: (url: string) => CurrentWebSocketLike;
  private readonly connectionTimeoutMs: number;
  private readonly readinessTimeoutMs: number;
  private readonly requestTimeoutMs: number;
  private readonly heartbeatIntervalMs: number;
  private readonly heartbeatTimeoutMs: number;
  private readonly reconnectDelaysMs: readonly number[];
  private readonly onListenerError?: (error: unknown) => void;
  private readonly listeners = new Set<Listener>();
  private socket?: CurrentWebSocketLike;
  private detachSocket?: () => void;
  private desiredUrl?: string;
  private epoch = 0;
  private attemptsUsed = 0;
  private transport: CurrentWebSocketState["transport"] = "disconnected";
  private error?: CurrentProtocolError;
  private connectionTimer?: Timer;
  private readinessTimer?: Timer;
  private heartbeatTimer?: Timer;
  private reconnectTimer?: Timer;

  constructor(
    readonly profile: CurrentProfile,
    options: CurrentWebSocketOptions = {},
  ) {
    const duration = (value: number, label: string, zeroAllowed = false) => {
      if (!Number.isFinite(value) || value < (zeroAllowed ? 0 : 1)) {
        throw new CurrentProtocolError(
          "invalid-parameter",
          `${label} must be a finite ${zeroAllowed ? "non-negative" : "positive"} duration`,
        );
      }
      return value;
    };
    this.factory = options.webSocketFactory ?? ((url) => new WebSocket(url));
    this.connectionTimeoutMs = duration(
      options.connectionTimeoutMs ?? 10_000,
      "connectionTimeoutMs",
    );
    this.readinessTimeoutMs = duration(
      options.readinessTimeoutMs ?? 15_000,
      "readinessTimeoutMs",
    );
    this.requestTimeoutMs = duration(
      options.requestTimeoutMs ?? 10_000,
      "requestTimeoutMs",
    );
    this.heartbeatIntervalMs = duration(
      options.heartbeatIntervalMs ?? 5_000,
      "heartbeatIntervalMs",
      true,
    );
    this.heartbeatTimeoutMs = duration(
      options.heartbeatTimeoutMs ?? 15_000,
      "heartbeatTimeoutMs",
    );
    this.reconnectDelaysMs = [
      ...(options.reconnectDelaysMs ?? [1_000, 3_000]),
    ].map((delay) => duration(delay, "reconnect delay", true));
    this.onListenerError = options.onListenerError;
    this.session = new CurrentSession(profile);
    this.session.subscribe((state, packet) => {
      if (state.phase === "ready") {
        this.clearReadinessTimer();
        this.error = undefined;
      }
      this.publish(packet);
    });
  }

  get state(): CurrentWebSocketState {
    return {
      transport: this.transport,
      session: this.session.state,
      reconnectAttempt: this.attemptsUsed,
      ...(this.error ? { error: this.error } : {}),
    };
  }

  /** Protocol-ready, not merely a successful WebSocket handshake. */
  get connected(): boolean {
    return this.session.state.phase === "ready";
  }

  get ready(): boolean {
    return this.connected;
  }

  get transportOpen(): boolean {
    return this.transport === "open" && this.socket?.readyState === 1;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    this.notifyListener(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Idempotent while the same endpoint is connecting/open/reconnecting.
   * After terminal failure, calling connect explicitly starts a new retry budget.
   */
  connect(url: string): void {
    let endpoint: URL;
    try {
      endpoint = new URL(url);
    } catch {
      throw new CurrentProtocolError(
        "invalid-parameter",
        "DWARF WebSocket URL is invalid",
      );
    }
    if (!["ws:", "wss:"].includes(endpoint.protocol)) {
      throw new CurrentProtocolError(
        "invalid-parameter",
        "DWARF transport requires a ws: or wss: URL",
      );
    }
    if (this.desiredUrl === endpoint.href && this.transport !== "disconnected")
      return;
    this.close("Connection replaced");
    this.desiredUrl = endpoint.href;
    this.attemptsUsed = 0;
    this.error = undefined;
    this.startAttempt();
  }

  request(
    operation: CurrentCommand,
    values: Record<string, unknown> = {},
    timeoutMs = this.requestTimeoutMs,
  ): Promise<CurrentPacket> {
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
      return Promise.reject(
        new CurrentProtocolError(
          "invalid-parameter",
          "Request timeout must be a finite positive duration",
        ),
      );
    }
    if (!this.ready && operation !== "getDeviceState") {
      return Promise.reject(
        new CurrentProtocolError(
          "transport",
          "DWARF has not provided a valid device-state snapshot",
        ),
      );
    }
    return this.session.request(operation, values, timeoutMs);
  }

  close(reason = "Connection closed"): void {
    this.desiredUrl = undefined;
    this.epoch++;
    this.clearTimers();
    this.releaseSocket();
    this.transport = "disconnected";
    this.error = undefined;
    this.attemptsUsed = 0;
    this.session.close(reason);
  }

  private startAttempt(): void {
    if (!this.desiredUrl) return;
    const epoch = ++this.epoch;
    this.transport = "connecting";
    this.publish();
    if (this.epoch !== epoch || !this.desiredUrl) return;
    let socket: CurrentWebSocketLike;
    try {
      socket = this.factory(this.desiredUrl);
      this.socket = socket;
      socket.binaryType = "arraybuffer";
    } catch (error) {
      this.fail(
        epoch,
        this.asTransportError(error, "DWARF transport could not open"),
      );
      return;
    }
    this.socket = socket;
    let queue: Promise<void> = Promise.resolve();
    let lastActivity = Date.now();
    let probing = false;
    const active = () => this.epoch === epoch && this.socket === socket;
    const heartbeat = () => {
      if (!active() || this.transport !== "open") return;
      if (Date.now() - lastActivity >= this.heartbeatTimeoutMs) {
        this.fail(
          epoch,
          new CurrentProtocolError(
            "timeout",
            "DWARF transport heartbeat timed out",
          ),
        );
        return;
      }
      if (
        this.ready &&
        !probing &&
        Date.now() - lastActivity >= this.heartbeatIntervalMs
      ) {
        probing = true;
        this.session
          .request("getDeviceState", {}, this.heartbeatTimeoutMs)
          .catch((error) => {
            // A caller's already-pending state query owns the same wire key.
            if (
              active() &&
              !(error instanceof CurrentProtocolError && error.kind === "busy")
            )
              this.fail(
                epoch,
                this.asTransportError(error, "DWARF liveness probe failed"),
              );
          })
          .finally(() => {
            probing = false;
          });
      }
      this.heartbeatTimer = setTimeout(heartbeat, this.heartbeatIntervalMs);
    };
    const onOpen = () => {
      if (!active() || this.transport !== "connecting") return;
      if (this.connectionTimer !== undefined)
        clearTimeout(this.connectionTimer);
      this.connectionTimer = undefined;
      this.transport = "open";
      lastActivity = Date.now();
      this.session.open((bytes) => {
        if (!active() || socket.readyState !== 1)
          throw new CurrentProtocolError(
            "transport",
            "DWARF transport is no longer open",
          );
        socket.send(bytes);
      });
      if (!active()) return;
      this.readinessTimer = setTimeout(() => {
        if (active() && !this.ready)
          this.fail(
            epoch,
            new CurrentProtocolError(
              "timeout",
              "DWARF did not provide a valid device-state snapshot",
            ),
          );
      }, this.readinessTimeoutMs);
      if (this.heartbeatIntervalMs > 0)
        this.heartbeatTimer = setTimeout(heartbeat, this.heartbeatIntervalMs);
      // Only read state. Camera entry, mode, ownership, focus and capture require
      // explicit application requests after the connection is protocol-ready.
      this.session
        .request("getDeviceState", {}, this.requestTimeoutMs)
        .catch((error) => {
          if (active())
            this.fail(
              epoch,
              this.asTransportError(error, "DWARF state bootstrap failed"),
            );
        });
    };
    const onMessage = (event: { data: unknown }) => {
      if (!active()) return;
      // Keep asynchronous Blob conversion in wire order. Each attempt owns its
      // own queue, so an old unresolved Blob cannot hold up a new connection.
      queue = queue
        .then(async () => {
          if (!active()) return;
          if (typeof event.data === "string") {
            return;
          }
          const bytes = await this.binaryBytes(event.data);
          if (!active()) return;
          const packet = this.session.receive(bytes);
          lastActivity = Date.now();
          if (!packet.known || packet.type === 0) this.publish(packet);
        })
        .catch((error) => {
          if (active())
            this.fail(
              epoch,
              error instanceof CurrentProtocolError
                ? error
                : new CurrentProtocolError(
                    "decode",
                    "DWARF protocol frame could not be decoded",
                  ),
            );
        });
    };
    const onError = () => {
      if (active())
        this.fail(
          epoch,
          new CurrentProtocolError(
            "transport",
            "DWARF WebSocket reported a transport error",
          ),
        );
    };
    const onClose = (event: { code?: number }) => {
      if (active())
        this.fail(
          epoch,
          new CurrentProtocolError(
            "transport",
            `DWARF transport closed${event.code === undefined ? "" : ` (code ${event.code})`}`,
          ),
        );
    };
    const handlers: [string, (event: any) => void][] = [
      ["open", onOpen],
      ["message", onMessage],
      ["error", onError],
      ["close", onClose],
    ];
    for (const [name, handler] of handlers)
      socket.addEventListener(name, handler);
    this.detachSocket = () => {
      for (const [name, handler] of handlers)
        socket.removeEventListener(name, handler);
    };
    this.connectionTimer = setTimeout(() => {
      if (active() && this.transport === "connecting")
        this.fail(
          epoch,
          new CurrentProtocolError(
            "timeout",
            "DWARF WebSocket handshake timed out",
          ),
        );
    }, this.connectionTimeoutMs);
  }

  private async binaryBytes(data: unknown): Promise<Uint8Array> {
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data))
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    if (typeof Blob !== "undefined" && data instanceof Blob)
      return new Uint8Array(await data.arrayBuffer());
    throw new CurrentProtocolError(
      "decode",
      "Unsupported DWARF WebSocket binary frame",
    );
  }

  private fail(epoch: number, error: CurrentProtocolError): void {
    if (epoch !== this.epoch) return;
    const failureEpoch = ++this.epoch;
    this.clearTimers();
    this.releaseSocket();
    this.error = error;
    const delay = this.desiredUrl
      ? this.reconnectDelaysMs[this.attemptsUsed]
      : undefined;
    this.transport = delay === undefined ? "disconnected" : "reconnecting";
    if (delay !== undefined) this.attemptsUsed++;
    this.session.close(error.message);
    if (delay !== undefined && failureEpoch === this.epoch) {
      this.reconnectTimer = setTimeout(() => {
        this.reconnectTimer = undefined;
        if (failureEpoch === this.epoch && this.desiredUrl) this.startAttempt();
      }, delay);
    }
  }

  private releaseSocket(): void {
    this.detachSocket?.();
    this.detachSocket = undefined;
    const socket = this.socket;
    this.socket = undefined;
    if (socket && socket.readyState < 2) {
      try {
        socket.close(1000, "Client connection disposed");
      } catch {
        /* Already gone. */
      }
    }
  }

  private clearReadinessTimer(): void {
    if (this.readinessTimer !== undefined) clearTimeout(this.readinessTimer);
    this.readinessTimer = undefined;
  }

  private clearTimers(): void {
    for (const timer of [
      this.connectionTimer,
      this.readinessTimer,
      this.heartbeatTimer,
      this.reconnectTimer,
    ]) {
      if (timer !== undefined) clearTimeout(timer);
    }
    this.connectionTimer = undefined;
    this.readinessTimer = undefined;
    this.heartbeatTimer = undefined;
    this.reconnectTimer = undefined;
  }

  private asTransportError(
    error: unknown,
    fallback: string,
  ): CurrentProtocolError {
    return error instanceof CurrentProtocolError
      ? error
      : new CurrentProtocolError("transport", fallback);
  }

  private publish(packet?: CurrentPacket): void {
    for (const listener of this.listeners)
      this.notifyListener(listener, packet);
  }

  private notifyListener(listener: Listener, packet?: CurrentPacket): void {
    try {
      listener(this.state, packet);
    } catch (error) {
      // A rendering subscriber must not break protocol parsing or prevent another
      // subscriber observing a disconnect. Applications may surface diagnostics.
      try {
        this.onListenerError?.(error);
      } catch {
        /* Not a transport failure. */
      }
    }
  }
}
