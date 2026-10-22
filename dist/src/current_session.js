/** Request correlation and authoritative state, independent of browser/Node transport.
 * Evidence: dwarfAlp dwarf/ws_client.py and canonical task_center/notify schemas.
 */
import { CurrentCommands, CurrentProtocolError, assertCurrentSuccess, createCurrentPacket, decodeCurrentPacket, } from "./current_protocol.js";
export class CurrentSession {
    constructor(profile, options = {}) {
        this.profile = profile;
        this.options = options;
        this.pending = new Map();
        this.timedOut = new Set();
        this.listeners = new Set();
        this.current = {
            phase: "disconnected",
            ownership: "unknown",
            notifications: new Map(),
            parameters: new Map(),
            generation: 0,
        };
    }
    get state() {
        return this.current;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
    open(send) {
        this.close("Transport replaced");
        this.send = send;
        this.current = { ...this.current, phase: "transport-open" };
        this.emit();
    }
    close(reason = "Transport disconnected") {
        this.send = undefined;
        for (const pending of this.pending.values()) {
            clearTimeout(pending.timer);
            pending.reject(new CurrentProtocolError("transport", reason));
        }
        this.pending.clear();
        this.timedOut.clear();
        this.current = {
            phase: "disconnected",
            ownership: "unknown",
            notifications: new Map(),
            parameters: new Map(),
            generation: this.current.generation + 1,
        };
        this.emit();
    }
    request(operation, values = {}, timeoutMs = 10000) {
        if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
            return Promise.reject(new CurrentProtocolError("invalid-parameter", "Request timeout must be a finite positive duration"));
        if (!this.send)
            return Promise.reject(new CurrentProtocolError("transport", "DWARF transport is not open"));
        const descriptor = CurrentCommands[operation];
        if (!descriptor)
            return Promise.reject(new CurrentProtocolError("unsupported", `Unknown DWARF operation ${operation}`));
        const key = `${descriptor[0]}:${descriptor[1]}`;
        if (this.pending.has(key))
            return Promise.reject(new CurrentProtocolError("busy", `Request ${key} is already pending`));
        // No wire request ID exists. A late reply cannot safely be matched to a retry
        // of the same command on this connection after its first request timed out.
        if (this.timedOut.has(key))
            return Promise.reject(new CurrentProtocolError("timeout", `Reconnect before retrying timed-out request ${key}`));
        let bytes;
        try {
            bytes = createCurrentPacket(this.profile, operation, values);
        }
        catch (error) {
            return Promise.reject(error);
        }
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pending.delete(key);
                this.timedOut.add(key);
                reject(new CurrentProtocolError("timeout", `DWARF request ${key} timed out`));
            }, timeoutMs);
            this.pending.set(key, {
                operation,
                values: { ...values },
                resolve,
                reject,
                timer,
            });
            try {
                this.send(bytes);
            }
            catch (error) {
                clearTimeout(timer);
                this.pending.delete(key);
                reject(new CurrentProtocolError("transport", String(error)));
            }
        });
    }
    receive(bytes) {
        const packet = decodeCurrentPacket(bytes);
        if (!this.send)
            return packet; // Frames from a disposed session have no authority.
        if (packet.known &&
            [1, 3].includes(packet.type) &&
            !this.current.peerProtocolVersion &&
            packet.majorVersion !== undefined &&
            packet.minorVersion !== undefined) {
            this.current = {
                ...this.current,
                peerProtocolVersion: Object.freeze({
                    majorVersion: packet.majorVersion,
                    minorVersion: packet.minorVersion,
                }),
            };
        }
        const key = `${packet.moduleId}:${packet.cmd}`;
        let requestKey = key;
        // Ownership can be returned as15223 from module4 or9 instead of13004.
        // No other notification is treated as a generic request acknowledgement.
        if (packet.cmd === 15223 &&
            [4, 9].includes(packet.moduleId) &&
            [2, 3].includes(packet.type)) {
            requestKey = "4:13004";
        }
        // Canonical capture workflow also receives parameter echo instead of an
        // ACK. Match the FULL uint64 namespace and requested value/mode, never the
        // notification command alone (exposure and gain can be pending together).
        if (packet.known &&
            [15264, 15265, 15266].includes(packet.cmd) &&
            [2, 3].includes(packet.type)) {
            const operations = packet.cmd === 15264
                ? ["setExposure", "setGain", "setIntegerParameter"]
                : packet.cmd === 15265
                    ? ["setFloatParameter"]
                    : ["setBooleanParameter"];
            const matches = [...this.pending.entries()].filter(([, candidate]) => operations.includes(candidate.operation) &&
                candidate.values.paramId === packet.data.paramId &&
                (packet.cmd === 15265
                    ? Math.fround(candidate.values.value)
                    : candidate.values.value) ===
                    (packet.data.value ?? (packet.cmd === 15266 ? false : 0)) &&
                (candidate.values.mode === undefined ||
                    candidate.values.mode === (packet.data.mode ?? 0)));
            if (matches.length === 1)
                requestKey = matches[0][0];
        }
        const pending = packet.type === 1 || packet.type === 3 || requestKey !== key
            ? this.pending.get(requestKey)
            : undefined;
        if (pending) {
            this.pending.delete(requestKey);
            clearTimeout(pending.timer);
            try {
                assertCurrentSuccess(packet);
                pending.resolve(packet);
            }
            catch (error) {
                pending.reject(error instanceof Error ? error : new Error(String(error)));
            }
        }
        if (!packet.known || packet.type === 0)
            return packet;
        // An ACK alone (even successful) is never an operation-complete signal.
        // State snapshot must contain actual device/camera state, not an empty ACK.
        if (packet.moduleId === 14 &&
            packet.cmd === 16405 &&
            [1, 3].includes(packet.type) &&
            (packet.data.code ?? 0) === 0 &&
            [
                "deviceStateInfo",
                "teleCameraStateInfo",
                "wideCameraStateInfo",
                "connectionStateInfo",
            ].some((k) => packet.data[k] && Object.keys(packet.data[k]).length > 0)) {
            this.current = { ...this.current, phase: "ready", snapshot: packet.data };
            const ownership = packet.data.connectionStateInfo?.hostSlaveMode;
            if (ownership)
                this.updateOwnership(ownership);
        }
        if (packet.type === 2 ||
            (packet.type === 3 && packet.cmd >= 15200 && packet.cmd < 15500)) {
            const notifications = new Map(this.current.notifications);
            notifications.set(packet.cmd, packet);
            this.current = { ...this.current, notifications };
            if (packet.cmd === 15223)
                this.updateOwnership(packet.data);
            if ([15264, 15265, 15266].includes(packet.cmd) &&
                packet.data.paramId !== undefined) {
                const parameters = new Map(this.current.parameters);
                parameters.set(String(packet.data.paramId), packet.data);
                this.current = { ...this.current, parameters };
            }
        }
        this.emit(packet);
        return packet;
    }
    updateOwnership(status) {
        // Proto3 omitted mode means zero (host), but lock=false is not control.
        const ownership = (status.mode ?? 0) === 0 && status.lock === true ? "control" : "slave";
        this.current = { ...this.current, ownership };
    }
    emit(packet) {
        for (const listener of this.listeners) {
            try {
                listener(this.current, packet);
            }
            catch (error) {
                // A UI/state consumer must not interrupt frame handling or prevent
                // another subscriber from seeing an authoritative disconnect.
                try {
                    this.options.onListenerError?.(error);
                }
                catch {
                    /* Not a protocol failure. */
                }
            }
        }
    }
}
