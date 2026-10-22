/** Epoch-owned current-protocol transport. No singleton, HTTP authority, or
 * automatic camera/ownership/motion commands. Reconnects only bootstrap a fresh
 * read-only state snapshot and never replay application requests.
 */
import { CurrentProtocolError, } from "./current_protocol.js";
import { CurrentSession } from "./current_session.js";
export class CurrentWebSocketHandler {
    constructor(profile, options = {}) {
        this.profile = profile;
        this.listeners = new Set();
        this.epoch = 0;
        this.attemptsUsed = 0;
        this.transport = "disconnected";
        this.stateReadRevision = 0;
        const duration = (value, label, zeroAllowed = false) => {
            if (!Number.isFinite(value) || value < (zeroAllowed ? 0 : 1)) {
                throw new CurrentProtocolError("invalid-parameter", `${label} must be a finite ${zeroAllowed ? "non-negative" : "positive"} duration`);
            }
            return value;
        };
        this.factory = options.webSocketFactory ?? ((url) => new WebSocket(url));
        this.connectionTimeoutMs = duration(options.connectionTimeoutMs ?? 10000, "connectionTimeoutMs");
        this.readinessTimeoutMs = duration(options.readinessTimeoutMs ?? 15000, "readinessTimeoutMs");
        this.requestTimeoutMs = duration(options.requestTimeoutMs ?? 10000, "requestTimeoutMs");
        this.heartbeatIntervalMs = duration(options.heartbeatIntervalMs ?? 5000, "heartbeatIntervalMs", true);
        this.heartbeatTimeoutMs = duration(options.heartbeatTimeoutMs ?? 15000, "heartbeatTimeoutMs");
        this.reconnectDelaysMs = [
            ...(options.reconnectDelaysMs ?? [1000, 3000]),
        ].map((delay) => duration(delay, "reconnect delay", true));
        this.onListenerError = options.onListenerError;
        this.session = new CurrentSession(profile, {
            onListenerError: options.onListenerError,
        });
        this.session.subscribe((state, packet) => {
            if (state.phase === "ready") {
                this.clearReadinessTimer();
                this.error = undefined;
            }
            this.publish(packet);
        });
    }
    get state() {
        return {
            transport: this.transport,
            session: this.session.state,
            reconnectAttempt: this.attemptsUsed,
            ...(this.error ? { error: this.error } : {}),
        };
    }
    /** Protocol-ready, not merely a successful WebSocket handshake. */
    get connected() {
        return this.session.state.phase === "ready";
    }
    get ready() {
        return this.connected;
    }
    get transportOpen() {
        return this.transport === "open" && this.socket?.readyState === 1;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        this.notifyListener(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
    /** Idempotent while the same endpoint is connecting/open/reconnecting.
     * After terminal failure, calling connect explicitly starts a new retry budget.
     */
    connect(url) {
        let endpoint;
        try {
            endpoint = new URL(url);
        }
        catch {
            throw new CurrentProtocolError("invalid-parameter", "DWARF WebSocket URL is invalid");
        }
        if (!["ws:", "wss:"].includes(endpoint.protocol)) {
            throw new CurrentProtocolError("invalid-parameter", "DWARF transport requires a ws: or wss: URL");
        }
        if (this.desiredUrl === endpoint.href && this.transport !== "disconnected")
            return;
        this.close("Connection replaced");
        this.desiredUrl = endpoint.href;
        this.attemptsUsed = 0;
        this.error = undefined;
        this.startAttempt();
    }
    request(operation, values = {}, timeoutMs = this.requestTimeoutMs) {
        if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
            return Promise.reject(new CurrentProtocolError("invalid-parameter", "Request timeout must be a finite positive duration"));
        }
        if (!this.ready && operation !== "getDeviceState") {
            return Promise.reject(new CurrentProtocolError("transport", "DWARF has not provided a valid device-state snapshot"));
        }
        // State has no request arguments or wire correlation ID. Monitoring and a
        // foreground operation can safely share this in-flight snapshot, rather
        // than making the foreground operation fail with "already pending".
        if (operation === "getDeviceState" && Object.keys(values).length === 0) {
            const generation = this.session.state.generation;
            if (this.stateRead?.generation === generation) {
                const read = this.stateRead;
                if (read.revision === this.stateReadRevision)
                    return read.promise;
                // A command crossed the read: drain the older poll, then request a
                // fresh snapshot on this generation within the caller's deadline.
                const deadline = Date.now() + timeoutMs;
                return read.promise.then(() => {
                    if (this.session.state.generation !== generation)
                        throw new CurrentProtocolError("transport", "State read connection changed");
                    const remaining = deadline - Date.now();
                    if (remaining <= 0)
                        throw new CurrentProtocolError("timeout", "State read deadline expired");
                    return this.request(operation, values, remaining);
                });
            }
            const promise = this.session.request(operation, values, timeoutMs);
            const read = { generation, promise, revision: this.stateReadRevision };
            this.stateRead = read;
            const clear = () => {
                if (this.stateRead === read)
                    this.stateRead = undefined;
            };
            void promise.then(clear, clear);
            return promise;
        }
        if (operation !== "getDeviceState")
            this.stateReadRevision++;
        return this.session.request(operation, values, timeoutMs);
    }
    close(reason = "Connection closed") {
        this.desiredUrl = undefined;
        this.epoch++;
        this.clearTimers();
        this.releaseSocket();
        this.transport = "disconnected";
        this.error = undefined;
        this.attemptsUsed = 0;
        this.session.close(reason);
    }
    startAttempt() {
        if (!this.desiredUrl)
            return;
        const epoch = ++this.epoch;
        this.transport = "connecting";
        this.publish();
        if (this.epoch !== epoch || !this.desiredUrl)
            return;
        let socket;
        try {
            socket = this.factory(this.desiredUrl);
            this.socket = socket;
            socket.binaryType = "arraybuffer";
        }
        catch (error) {
            this.fail(epoch, this.asTransportError(error, "DWARF transport could not open"));
            return;
        }
        this.socket = socket;
        let queue = Promise.resolve();
        let lastActivity = Date.now();
        let probing = false;
        const active = () => this.epoch === epoch && this.socket === socket;
        const heartbeat = () => {
            if (!active() || this.transport !== "open")
                return;
            if (Date.now() - lastActivity >= this.heartbeatTimeoutMs) {
                this.fail(epoch, new CurrentProtocolError("timeout", "DWARF transport heartbeat timed out"));
                return;
            }
            if (this.ready &&
                !probing &&
                Date.now() - lastActivity >= this.heartbeatIntervalMs) {
                probing = true;
                this.request("getDeviceState", {}, this.heartbeatTimeoutMs)
                    .catch((error) => {
                    // A caller's already-pending state query owns the same wire key.
                    if (active() &&
                        !(error instanceof CurrentProtocolError && error.kind === "busy"))
                        this.fail(epoch, this.asTransportError(error, "DWARF liveness probe failed"));
                })
                    .finally(() => {
                    probing = false;
                });
            }
            this.heartbeatTimer = setTimeout(heartbeat, this.heartbeatIntervalMs);
        };
        const onOpen = () => {
            if (!active() || this.transport !== "connecting")
                return;
            if (this.connectionTimer !== undefined)
                clearTimeout(this.connectionTimer);
            this.connectionTimer = undefined;
            this.transport = "open";
            lastActivity = Date.now();
            this.session.open((bytes) => {
                if (!active() || socket.readyState !== 1)
                    throw new CurrentProtocolError("transport", "DWARF transport is no longer open");
                socket.send(bytes);
            });
            if (!active())
                return;
            this.readinessTimer = setTimeout(() => {
                if (active() && !this.ready)
                    this.fail(epoch, new CurrentProtocolError("timeout", "DWARF did not provide a valid device-state snapshot"));
            }, this.readinessTimeoutMs);
            if (this.heartbeatIntervalMs > 0)
                this.heartbeatTimer = setTimeout(heartbeat, this.heartbeatIntervalMs);
            // Only read state. Camera entry, mode, ownership, focus and capture require
            // explicit application requests after the connection is protocol-ready.
            this.request("getDeviceState", {}, this.requestTimeoutMs).catch((error) => {
                if (active())
                    this.fail(epoch, this.asTransportError(error, "DWARF state bootstrap failed"));
            });
        };
        const onMessage = (event) => {
            if (!active())
                return;
            // Keep asynchronous Blob conversion in wire order. Each attempt owns its
            // own queue, so an old unresolved Blob cannot hold up a new connection.
            queue = queue
                .then(async () => {
                if (!active())
                    return;
                if (typeof event.data === "string") {
                    return;
                }
                const bytes = await this.binaryBytes(event.data);
                if (!active())
                    return;
                const packet = this.session.receive(bytes);
                lastActivity = Date.now();
                if (!packet.known || packet.type === 0)
                    this.publish(packet);
            })
                .catch((error) => {
                if (active())
                    this.fail(epoch, error instanceof CurrentProtocolError
                        ? error
                        : new CurrentProtocolError("decode", "DWARF protocol frame could not be decoded"));
            });
        };
        const onError = () => {
            if (active())
                this.fail(epoch, new CurrentProtocolError("transport", "DWARF WebSocket reported a transport error"));
        };
        const onClose = (event) => {
            if (active())
                this.fail(epoch, new CurrentProtocolError("transport", `DWARF transport closed${event.code === undefined ? "" : ` (code ${event.code})`}`));
        };
        const handlers = [
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
                this.fail(epoch, new CurrentProtocolError("timeout", "DWARF WebSocket handshake timed out"));
        }, this.connectionTimeoutMs);
    }
    async binaryBytes(data) {
        if (data instanceof ArrayBuffer)
            return new Uint8Array(data);
        if (ArrayBuffer.isView(data))
            return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        if (typeof Blob !== "undefined" && data instanceof Blob)
            return new Uint8Array(await data.arrayBuffer());
        throw new CurrentProtocolError("decode", "Unsupported DWARF WebSocket binary frame");
    }
    fail(epoch, error) {
        if (epoch !== this.epoch)
            return;
        const failureEpoch = ++this.epoch;
        this.clearTimers();
        this.releaseSocket();
        this.error = error;
        const delay = this.desiredUrl
            ? this.reconnectDelaysMs[this.attemptsUsed]
            : undefined;
        this.transport = delay === undefined ? "disconnected" : "reconnecting";
        if (delay !== undefined)
            this.attemptsUsed++;
        this.session.close(error.message);
        if (delay !== undefined && failureEpoch === this.epoch) {
            this.reconnectTimer = setTimeout(() => {
                this.reconnectTimer = undefined;
                if (failureEpoch === this.epoch && this.desiredUrl)
                    this.startAttempt();
            }, delay);
        }
    }
    releaseSocket() {
        this.detachSocket?.();
        this.detachSocket = undefined;
        const socket = this.socket;
        this.socket = undefined;
        if (socket && socket.readyState < 2) {
            try {
                socket.close(1000, "Client connection disposed");
            }
            catch {
                /* Already gone. */
            }
        }
    }
    clearReadinessTimer() {
        if (this.readinessTimer !== undefined)
            clearTimeout(this.readinessTimer);
        this.readinessTimer = undefined;
    }
    clearTimers() {
        for (const timer of [
            this.connectionTimer,
            this.readinessTimer,
            this.heartbeatTimer,
            this.reconnectTimer,
        ]) {
            if (timer !== undefined)
                clearTimeout(timer);
        }
        this.connectionTimer = undefined;
        this.readinessTimer = undefined;
        this.heartbeatTimer = undefined;
        this.reconnectTimer = undefined;
    }
    asTransportError(error, fallback) {
        return error instanceof CurrentProtocolError
            ? error
            : new CurrentProtocolError("transport", fallback);
    }
    publish(packet) {
        for (const listener of this.listeners)
            this.notifyListener(listener, packet);
    }
    notifyListener(listener, packet) {
        try {
            listener(this.state, packet);
        }
        catch (error) {
            // A rendering subscriber must not break protocol parsing or prevent another
            // subscriber observing a disconnect. Applications may surface diagnostics.
            try {
                this.onListenerError?.(error);
            }
            catch {
                /* Not a transport failure. */
            }
        }
    }
}
