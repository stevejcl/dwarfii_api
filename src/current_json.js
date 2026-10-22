import { CurrentProtocolError } from "./current_errors.js";

const safeIntegerMax = BigInt(Number.MAX_SAFE_INTEGER);

/** Quote unsafe JSON numeric tokens before JSON.parse, never inside strings.
 * Fractional/scientific tokens which evaluate outside the safe integer range
 * retain their original spelling too; identifier validation rejects them.
 */
/** @param {string} text @returns {unknown} */
export function parseCurrentJsonLossless(text) {
  if (typeof text !== "string") {
    throw new CurrentProtocolError("decode", "Expected raw DWARF JSON text");
  }
  let transformed = "";
  let inString = false;
  let escaped = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (inString) {
      transformed += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      transformed += character;
      continue;
    }
    if (character === "-" || /[0-9]/.test(character)) {
      const token = text
        .slice(index)
        .match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/)?.[0];
      if (token) {
        const plainInteger = /^-?\d+$/.test(token);
        const unsafe = plainInteger
          ? BigInt(token) > safeIntegerMax || BigInt(token) < -safeIntegerMax
          : !Number.isFinite(Number(token)) ||
            Math.abs(Number(token)) > Number.MAX_SAFE_INTEGER;
        transformed += unsafe ? JSON.stringify(token) : token;
        index += token.length - 1;
        continue;
      }
    }
    transformed += character;
  }
  try {
    return JSON.parse(transformed);
  } catch {
    throw new CurrentProtocolError("decode", "Invalid DWARF JSON response");
  }
}
