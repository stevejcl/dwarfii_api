/** @module paramid_utils */
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
export function encodeParamId(shootingMode: number, category: number, cameraId: number, paramIndex: number): string;
/**
 * Decode a paramId into its constituent parts.
 *
 * Accepts number, string (decimal), BigInt, or protobuf.js Long object.
 *
 * @param {number|string|BigInt|{low: number, high: number}} paramId - Encoded parameter ID
 * @returns {{ shootingMode: number, category: number, cameraId: number, paramIndex: number }}
 */
export function decodeParamId(paramId: number | string | BigInt | {
    low: number;
    high: number;
}): {
    shootingMode: number;
    category: number;
    cameraId: number;
    paramIndex: number;
};
//# sourceMappingURL=paramid_utils.d.ts.map