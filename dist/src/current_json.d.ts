/** Quote unsafe JSON numeric tokens before JSON.parse, never inside strings.
 * Fractional/scientific tokens which evaluate outside the safe integer range
 * retain their original spelling too; identifier validation rejects them.
 */
/** @param {string} text @returns {unknown} */
export function parseCurrentJsonLossless(text: string): unknown;
//# sourceMappingURL=current_json.d.ts.map