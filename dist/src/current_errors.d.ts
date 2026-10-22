/** Shared by the standalone HTTP helpers and canonical protocol runtime. */
export class CurrentProtocolError extends Error {
    /**
     * @param {import("./current_protocol.js").ProtocolErrorKind} kind
     * @param {string} message
     * @param {number} [code]
     * @param {number} [command]
     */
    constructor(kind: import("./current_protocol.js").ProtocolErrorKind, message: string, code?: number, command?: number);
    kind: import("./current_protocol.js").ProtocolErrorKind;
    code: number;
    command: number;
}
//# sourceMappingURL=current_errors.d.ts.map