/** Shared by the standalone HTTP helpers and canonical protocol runtime. */
export class CurrentProtocolError extends Error {
    /**
     * @param {import("./current_protocol.js").ProtocolErrorKind} kind
     * @param {string} message
     * @param {number} [code]
     * @param {number} [command]
     */
    constructor(kind, message, code, command) {
        super(message);
        this.kind = kind;
        this.code = code;
        this.command = command;
        this.name = "CurrentProtocolError";
    }
}
