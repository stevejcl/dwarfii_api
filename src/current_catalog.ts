/** Pure current-firmware discovery helpers; no transport or cross-device cache.
 * Evidence: dwarfAlp b5a56f0 tests/test_session_camera.py and
 * docs/apk-analysis/camera-parameters.md. Always pass HTTP response.text(), not
 * response.json(): the latter irreversibly rounds firmware uint64 paramIds.
 */
import {
  CurrentProfile,
  CurrentProtocolError,
  getCurrentProfile,
} from "./current_protocol.js";

const uint64Max = (1n << 64n) - 1n;
const modeValueMask = (1n << 56n) - 1n;

export { parseCurrentJsonLossless } from "./current_json.js";
import { parseCurrentJsonLossless } from "./current_json.js";

function record(value: unknown, description: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CurrentProtocolError("decode", `Invalid ${description}`);
  }
  return value as Record<string, unknown>;
}

function responseData(input: unknown): Record<string, unknown> {
  const response = record(
    typeof input === "string" ? parseCurrentJsonLossless(input) : input,
    "DWARF response",
  );
  if (
    typeof response.code !== "number" ||
    !Number.isSafeInteger(response.code)
  ) {
    throw new CurrentProtocolError(
      "decode",
      "DWARF response has no valid result code",
    );
  }
  if (response.code !== 0) {
    throw new CurrentProtocolError(
      "device",
      `DWARF discovery failed (${response.code})`,
      response.code,
    );
  }
  return record(response.data, "DWARF response data");
}

function byte(value: unknown, description: string): number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > 255
  ) {
    throw new CurrentProtocolError(
      "invalid-parameter",
      `${description} must be an integer in [0, 255]`,
    );
  }
  return value;
}

export function normalizeCurrentParamId(value: unknown): string {
  const text =
    typeof value === "bigint"
      ? value.toString()
      : typeof value === "number" && Number.isSafeInteger(value)
        ? String(value)
        : value;
  if (
    typeof text !== "string" ||
    !/^(?:0|[1-9]\d*)$/.test(text) ||
    BigInt(text) > uint64Max
  ) {
    throw new CurrentProtocolError(
      "invalid-parameter",
      "Parameter ID must be an unsigned, lossless uint64 decimal string",
    );
  }
  return text;
}

export interface CurrentParamNamespace {
  shootingMode: number;
  category: number;
  cameraId: number;
  paramIndex: number;
  /** Unknown/reserved bits 8..43 retained, never interpreted as a setting. */
  reserved: string;
}

export function decodeCurrentParamId(paramId: unknown): CurrentParamNamespace {
  const value = BigInt(normalizeCurrentParamId(paramId));
  return {
    shootingMode: Number((value >> 56n) & 255n),
    category: Number((value >> 48n) & 255n),
    cameraId: Number((value >> 44n) & 15n),
    paramIndex: Number(value & 255n),
    reserved: ((value >> 8n) & 0xfffffffffn).toString(),
  };
}

export function encodeCurrentParamId(
  parts: Omit<CurrentParamNamespace, "reserved"> & { reserved?: string },
): string {
  const mode = byte(parts.shootingMode, "Parameter shooting mode");
  const category = byte(parts.category, "Parameter category");
  const camera = byte(parts.cameraId, "Parameter camera ID");
  if (camera > 15)
    throw new CurrentProtocolError(
      "invalid-parameter",
      "Parameter camera ID exceeds four bits",
    );
  const index = byte(parts.paramIndex, "Parameter index");
  const reserved = BigInt(normalizeCurrentParamId(parts.reserved ?? "0"));
  if (reserved > 0xfffffffffn)
    throw new CurrentProtocolError(
      "invalid-parameter",
      "Reserved parameter bits exceed 36 bits",
    );
  return (
    (BigInt(mode) << 56n) |
    (BigInt(category) << 48n) |
    (reserved << 8n) |
    (BigInt(camera) << 44n) |
    BigInt(index)
  ).toString();
}

/** Reapply a discovered parameter in a runtime namespace (e.g. 11/13),
 * preserving category, camera, parameter index and every unknown lower bit.
 */
export function withCurrentParamMode(
  paramId: unknown,
  shootingMode: number,
): string {
  const value = BigInt(normalizeCurrentParamId(paramId));
  return (
    (BigInt(byte(shootingMode, "Parameter shooting mode")) << 56n) |
    (value & modeValueMask)
  ).toString();
}

export function sameCurrentParameterAcrossModes(
  first: unknown,
  second: unknown,
): boolean {
  return (
    (BigInt(normalizeCurrentParamId(first)) & modeValueMask) ===
    (BigInt(normalizeCurrentParamId(second)) & modeValueMask)
  );
}

export interface CurrentDeviceInfo {
  hardwareId: number;
  profile: CurrentProfile;
  /** Verbatim reported device name; not used to infer hardware or firmware. */
  deviceName?: string;
}

export function normalizeCurrentDeviceInfo(input: unknown): CurrentDeviceInfo {
  const data = responseData(input);
  const hardwareId = data.deviceId ?? data.deviceID;
  if (
    data.deviceId !== undefined &&
    data.deviceID !== undefined &&
    data.deviceId !== data.deviceID
  ) {
    throw new CurrentProtocolError("decode", "Conflicting DWARF hardware IDs");
  }
  if (typeof hardwareId !== "number" || !Number.isSafeInteger(hardwareId)) {
    throw new CurrentProtocolError(
      "decode",
      "Device discovery supplied no numeric hardware ID",
    );
  }
  const result: CurrentDeviceInfo = {
    hardwareId,
    profile: getCurrentProfile(hardwareId),
  };
  if (typeof data.deviceName === "string") result.deviceName = data.deviceName;
  return result;
}

export type CurrentParameterValue = string | number | boolean;
export interface CurrentParameterOption {
  value: CurrentParameterValue;
  label: string;
  /** Exposure duration parsed from the actual firmware label, not its index. */
  seconds?: number;
}
export interface CurrentCatalogParameter {
  key: string;
  label: string;
  source: "special" | "general";
  paramId?: string;
  namespace?: CurrentParamNamespace;
  currentMode?: number;
  currentValue?: CurrentParameterValue;
  currentLabel?: string;
  options?: readonly CurrentParameterOption[];
  range?: { minimum: number; maximum: number; integer: boolean };
}
export interface CurrentCatalogCamera {
  cameraId: number;
  parameters: readonly CurrentCatalogParameter[];
}
export interface CurrentCameraCatalog {
  /** Mode used for this specific request; never a process-global assumption. */
  modeId: number;
  cameras: readonly CurrentCatalogCamera[];
  /** Firmware camera-15 controls apply to the technique, never one camera. */
  sharedParameters?: readonly CurrentCatalogParameter[];
}

function parameterValue(value: unknown): CurrentParameterValue {
  if (
    typeof value === "string" ||
    typeof value === "boolean" ||
    (typeof value === "number" && Number.isFinite(value))
  )
    return value;
  throw new CurrentProtocolError(
    "decode",
    "Unsupported camera parameter value",
  );
}

function displayName(key: string): string {
  const names: Record<string, string> = {
    exp: "Exposure",
    wb: "White balance",
  };
  return Object.prototype.hasOwnProperty.call(names, key)
    ? names[key]
    : key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (character) => character.toUpperCase());
}

export function parseCurrentExposureSeconds(label: string): number | undefined {
  const match = label
    .trim()
    .match(/^(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?\s*(?:s|sec)?$/i);
  if (!match) return undefined;
  const seconds =
    Number(match[1]) / (match[2] === undefined ? 1 : Number(match[2]));
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined;
}

function normalizeParameter(
  input: unknown,
  key: string,
  source: "special" | "general",
): CurrentCatalogParameter {
  const data = record(input, `camera parameter ${key}`);
  const name =
    typeof data.name === "string" && data.name.trim() ? data.name : key;
  const result: CurrentCatalogParameter = {
    key,
    label: displayName(name),
    source,
  };
  if (data.paramId !== undefined) {
    result.paramId = normalizeCurrentParamId(data.paramId);
    result.namespace = decodeCurrentParamId(result.paramId);
  }
  if (data.currentMode !== undefined) {
    if (
      typeof data.currentMode !== "number" ||
      !Number.isSafeInteger(data.currentMode)
    ) {
      throw new CurrentProtocolError(
        "decode",
        `Invalid current mode for ${key}`,
      );
    }
    result.currentMode = data.currentMode;
  }
  if (data.currentValue !== undefined && data.currentValue !== null)
    result.currentValue = parameterValue(data.currentValue);
  if (data.values !== undefined) {
    if (!Array.isArray(data.values))
      throw new CurrentProtocolError("decode", `Invalid value list for ${key}`);
    result.options = data.values.map((entry) => {
      const item: Record<string, unknown> =
        entry !== null && typeof entry === "object"
          ? record(entry, `${key} option`)
          : { value: entry };
      const value = parameterValue(item.value);
      const label = typeof item.name === "string" ? item.name : String(value);
      const option: CurrentParameterOption = { value, label };
      if ((key === "exp" || name === "exp") && typeof item.name === "string") {
        const seconds = parseCurrentExposureSeconds(item.name);
        if (seconds !== undefined) option.seconds = seconds;
      }
      return option;
    });
  }
  if (data.minValue !== undefined || data.maxValue !== undefined) {
    const minimum = data.minValue;
    const maximum = data.maxValue;
    const integer =
      result.namespace?.category === 2 &&
      [16, 17].includes(result.namespace.paramIndex);
    if (
      typeof minimum !== "number" ||
      typeof maximum !== "number" ||
      !Number.isFinite(minimum) ||
      !Number.isFinite(maximum) ||
      minimum > maximum ||
      (integer &&
        (!Number.isSafeInteger(minimum) ||
          !Number.isSafeInteger(maximum) ||
          minimum < 1 ||
          maximum > 2147483647))
    )
      throw new CurrentProtocolError(
        "decode",
        `Invalid runtime range for ${key}`,
      );
    result.range = { minimum, maximum, integer };
  }
  if (result.currentValue !== undefined) {
    result.currentLabel =
      result.options?.find((option) => option.value === result.currentValue)
        ?.label ??
      (typeof result.currentValue === "boolean"
        ? result.currentValue
          ? "On"
          : "Off"
        : String(result.currentValue));
  }
  return result;
}

export function normalizeCurrentCameraCatalog(
  input: unknown,
  requestedModeId: number,
): CurrentCameraCatalog {
  const modeId = byte(requestedModeId, "Requested shooting mode");
  const data = responseData(input);
  if (data.modeId !== undefined && data.modeId !== modeId)
    throw new CurrentProtocolError(
      "decode",
      "Camera catalog mode does not match its request",
    );
  if (!Array.isArray(data.cameraParams))
    throw new CurrentProtocolError(
      "decode",
      "DWARF response has no camera parameter catalog",
    );
  const seenCameras = new Set<number>();
  const cameras = data.cameraParams.map((entry) => {
    const camera = record(entry, "camera catalog entry");
    const cameraId = byte(camera.cameraId, "Catalog camera ID");
    if (seenCameras.has(cameraId))
      throw new CurrentProtocolError(
        "decode",
        "Duplicate camera parameter catalog",
      );
    seenCameras.add(cameraId);
    const parameters: CurrentCatalogParameter[] = [];
    if (camera.specialParams !== undefined) {
      for (const [key, value] of Object.entries(
        record(camera.specialParams, "special camera parameters"),
      )) {
        parameters.push(normalizeParameter(value, key, "special"));
      }
    }
    if (camera.generalParams !== undefined) {
      if (!Array.isArray(camera.generalParams))
        throw new CurrentProtocolError(
          "decode",
          "Invalid general camera parameters",
        );
      camera.generalParams.forEach((entry, index) => {
        const parameter = record(entry, "general camera parameter");
        const key =
          typeof parameter.name === "string" && parameter.name
            ? parameter.name
            : `parameter-${index + 1}`;
        parameters.push(normalizeParameter(parameter, key, "general"));
      });
    }
    return { cameraId, parameters };
  });
  const sharedParameters: CurrentCatalogParameter[] = [];
  if (data.shootingTechSettings !== undefined) {
    if (!Array.isArray(data.shootingTechSettings))
      throw new CurrentProtocolError(
        "decode",
        "Invalid shooting technique settings",
      );
    for (const raw of data.shootingTechSettings) {
      const entry = record(raw, "shooting technique settings");
      const cameraId = byte(entry.cameraId, "Technique camera ID");
      if (!Array.isArray(entry.generalParams))
        throw new CurrentProtocolError(
          "decode",
          "Invalid technique parameters",
        );
      let camera = cameras.find((item) => item.cameraId === cameraId);
      if (cameraId !== 15 && !camera) {
        camera = { cameraId, parameters: [] };
        cameras.push(camera);
      }
      for (const [index, rawParameter] of entry.generalParams.entries()) {
        const item = record(rawParameter, "technique parameter");
        const key =
          typeof item.name === "string" && item.name
            ? item.name
            : `technique-${index + 1}`;
        const parameter = normalizeParameter(item, key, "general");
        if (
          !parameter.namespace ||
          parameter.namespace.cameraId !== cameraId ||
          parameter.namespace.shootingMode !== modeId
        )
          throw new CurrentProtocolError(
            "decode",
            "Technique parameter namespace mismatch",
          );
        // Preserve duplicates; callers' uniqueness checks must reject ambiguity.
        (cameraId === 15 ? sharedParameters : camera!.parameters).push(
          parameter,
        );
      }
    }
  }
  return {
    modeId,
    cameras,
    ...(sharedParameters.length ? { sharedParameters } : {}),
  };
}

export function findCurrentCameraParameter(
  catalog: CurrentCameraCatalog,
  cameraId: number,
  key: string,
): CurrentCatalogParameter {
  const matches =
    catalog.cameras
      .find((camera) => camera.cameraId === cameraId)
      ?.parameters.filter((parameter) => parameter.key === key) ?? [];
  if (matches.length !== 1)
    throw new CurrentProtocolError(
      "unsupported",
      `No unique ${key} control for camera ${cameraId} in shooting mode ${catalog.modeId}`,
    );
  return matches[0];
}

export function selectCurrentParameterValue(
  parameter: CurrentCatalogParameter,
  value: CurrentParameterValue,
): { paramId: string; value: CurrentParameterValue } {
  const range = parameter.range;
  const withinRange =
    !range ||
    (typeof value === "number" &&
      Number.isFinite(value) &&
      value >= range.minimum &&
      value <= range.maximum &&
      (!range.integer || Number.isSafeInteger(value)));
  const advertised = parameter.options
    ? parameter.options.some((option) => option.value === value)
    : Boolean(range);
  // Firmware can include placeholder min/max (both zero) beside a real
  // discrete list, e.g. mode-1 timelapseTotalTime advertises 120..18000.
  // Explicit options are authoritative; apply bounds only to range controls.
  if (
    parameter.paramId === undefined ||
    !advertised ||
    (!parameter.options && !withinRange)
  ) {
    throw new CurrentProtocolError(
      "unsupported",
      `Value is not advertised for ${parameter.key}`,
    );
  }
  return { paramId: parameter.paramId, value };
}

export function selectCurrentExposure(
  catalog: CurrentCameraCatalog,
  cameraId: number,
  seconds: number,
): { paramId: string; value: number } {
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new CurrentProtocolError(
      "invalid-parameter",
      "Exposure duration must be positive seconds",
    );
  const parameter = findCurrentCameraParameter(catalog, cameraId, "exp");
  const matches =
    parameter.options?.filter(
      (option) =>
        option.seconds !== undefined &&
        Math.abs(option.seconds - seconds) <= Math.max(1e-12, seconds * 1e-9),
    ) ?? [];
  if (
    matches.length !== 1 ||
    typeof matches[0].value !== "number" ||
    !Number.isSafeInteger(matches[0].value)
  ) {
    throw new CurrentProtocolError(
      "unsupported",
      "No exact exposure duration is advertised by this camera and mode",
    );
  }
  const selected = selectCurrentParameterValue(parameter, matches[0].value);
  return { paramId: selected.paramId, value: matches[0].value };
}
