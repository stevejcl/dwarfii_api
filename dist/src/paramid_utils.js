/** @module paramid_utils */
// Standalone paramId encode/decode utilities.
// No protobuf or other heavy dependencies — safe to import from CLI tools.
/**
 * Encode a paramId from its constituent parts.
 *
 * paramId layout (64-bit):
 *   bits 63..56 = shootingMode  (e.g. 0=photo, 1=video, 2=astro)
 *   bits 55..48 = category      (parameter group)
 *   bits 47..16 = reserved (0)
 *   bits 15..8  = cameraId      (0=tele, 1=wide)
 *   bits 7..0   = paramIndex    (parameter index within the category)
 *
 * Returns a decimal string suitable for protobuf.js int64 fields.
 *
 * @param {number} shootingMode - Shooting mode (0=photo, 1=video, 2=astro)
 * @param {number} category - Parameter category
 * @param {number} cameraId - Camera ID (0=tele, 1=wide)
 * @param {number} paramIndex - Parameter index within the category
 * @returns {string} Encoded paramId as decimal string
 */
export function encodeParamId(shootingMode, category, cameraId, paramIndex) {
    const id = (BigInt(shootingMode & 0xff) << 56n) |
        (BigInt(category & 0xff) << 48n) |
        (BigInt(cameraId & 0xff) << 8n) |
        BigInt(paramIndex & 0xff);
    return id.toString();
}
/**
 * Decode a paramId into its constituent parts.
 *
 * Accepts number, string (decimal), BigInt, or protobuf.js Long object.
 *
 * @param {number|string|BigInt|{low: number, high: number}} paramId - Encoded parameter ID
 * @returns {{ shootingMode: number, category: number, cameraId: number, paramIndex: number }}
 */
export function decodeParamId(paramId) {
    let id;
    if (typeof paramId === "bigint") {
        id = paramId;
    }
    else if (typeof paramId === "string") {
        id = BigInt(paramId);
    }
    else if (typeof paramId === "number") {
        if (!Number.isSafeInteger(paramId)) {
            throw new RangeError("paramId as number exceeds Number.MAX_SAFE_INTEGER; pass a string or BigInt instead");
        }
        id = BigInt(paramId);
    }
    else if (paramId &&
        typeof /** @type {*} */ (paramId).low === "number" &&
        typeof /** @type {*} */ (paramId).high === "number") {
        // protobuf.js Long object
        const long = /** @type {{low: number, high: number}} */ (paramId);
        id = (BigInt(long.high >>> 0) << 32n) | BigInt(long.low >>> 0);
    }
    else {
        throw new TypeError("paramId must be a number, string, BigInt, or Long");
    }
    return {
        shootingMode: Number((id >> 56n) & 0xffn),
        category: Number((id >> 48n) & 0xffn),
        cameraId: Number((id >> 8n) & 0xffn),
        paramIndex: Number(id & 0xffn),
    };
}
