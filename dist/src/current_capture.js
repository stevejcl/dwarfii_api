/** Explicit current astronomy configuration/capture submission.
 * Evidence: dwarfAlp b5a56f0 session.py _enter_v3_astro_mode,
 * _resolve_v3_astro_controls, _select_v3_astro_preset, _configure_astro_capture.
 * This submits capture; only subsequent device progress/state establishes that
 * exposure started or completed. There is no automatic warning continuation.
 */
import { CurrentProtocolError, assertCurrentSuccess, } from "./current_protocol.js";
import { decodeCurrentParamId, findCurrentCameraParameter, selectCurrentExposure, selectCurrentParameterValue, withCurrentParamMode, } from "./current_catalog.js";
const running = new WeakSet();
const int32Max = 2147483647;
function positiveInt(value, description) {
    if (!Number.isSafeInteger(value) || value < 1 || value > int32Max)
        throw new CurrentProtocolError("invalid-parameter", `${description} must be an integer in [1, ${int32Max}]`);
}
function namespace(parameter, cameraId, category, index) {
    if (!parameter.paramId)
        throw new CurrentProtocolError("unsupported", `No discovered identifier for ${parameter.key}`);
    const parts = decodeCurrentParamId(parameter.paramId);
    if (parts.shootingMode !== 2 ||
        parts.cameraId !== cameraId ||
        parts.category !== category ||
        parts.paramIndex !== index) {
        throw new CurrentProtocolError("invalid-parameter", `Discovered ${parameter.key} identifier does not belong to this astronomy camera/control`);
    }
    return parameter.paramId;
}
/** Resolve user-facing filter text without Mini-specific ordinal arithmetic. */
export function resolveCurrentScienceFilter(profile, value) {
    const label = (text) => {
        const key = text.trim().toLowerCase().replace(/[\s-]/g, "");
        return key === "duo" ? "duoband" : key;
    };
    const matches = profile.scienceFilters.filter((filter) => typeof value === "number"
        ? filter.index === value
        : label(filter.label) === label(value));
    if (matches.length !== 1)
        throw new CurrentProtocolError("invalid-parameter", "Choose a science filter supported by the connected DWARF model; dark frames use the calibration workflow");
    return matches[0].index;
}
/** All catalog/settings validation occurs before any mode or capture command. */
export function resolveCurrentCaptureControls(profile, catalog, settings) {
    if (catalog.modeId !== 2)
        throw new CurrentProtocolError("invalid-parameter", "Astronomy capture requires a freshly discovered mode-2 parameter catalog");
    if (settings.cameraId !== 0 && settings.cameraId !== 1)
        throw new CurrentProtocolError("invalid-parameter", "Unknown capture camera");
    positiveInt(settings.frameCount, "Frame count");
    if (!Number.isSafeInteger(settings.gain) ||
        settings.gain < 0 ||
        settings.gain > int32Max)
        throw new CurrentProtocolError("invalid-parameter", "Gain must be a non-negative integer");
    if (settings.cameraId === 0) {
        if (settings.filterIndex === undefined)
            throw new CurrentProtocolError("invalid-parameter", "Select a telephoto science filter before capture");
        resolveCurrentScienceFilter(profile, settings.filterIndex);
    }
    else if (settings.filterIndex !== undefined) {
        throw new CurrentProtocolError("invalid-parameter", "Wide-angle capture does not accept a telephoto filter selection");
    }
    const exposureParameter = findCurrentCameraParameter(catalog, settings.cameraId, "exp");
    const gainParameter = findCurrentCameraParameter(catalog, settings.cameraId, "gain");
    namespace(exposureParameter, settings.cameraId, 1, 1);
    namespace(gainParameter, settings.cameraId, 1, 2);
    const exposure = selectCurrentExposure(catalog, settings.cameraId, settings.exposureSeconds);
    const gain = selectCurrentParameterValue(gainParameter, settings.gain);
    const countParameters = catalog.cameras
        .find((camera) => camera.cameraId === settings.cameraId)
        ?.parameters.filter((parameter) => {
        if (!parameter.paramId)
            return false;
        const parts = decodeCurrentParamId(parameter.paramId);
        return (parts.shootingMode === 2 &&
            parts.cameraId === settings.cameraId &&
            parts.category === 2 &&
            parts.paramIndex === 16);
    }) ?? [];
    if (countParameters.length !== 1)
        throw new CurrentProtocolError("unsupported", "No unique runtime astronomy frame-count control was discovered for this camera");
    const countParameter = countParameters[0];
    const countId = namespace(countParameter, settings.cameraId, 2, 16);
    if (countParameter.options || countParameter.range)
        selectCurrentParameterValue(countParameter, settings.frameCount);
    return {
        exposure: { paramId: exposure.paramId, mode: 1, value: exposure.value },
        gain: { paramId: gain.paramId, mode: 1, value: settings.gain },
        frameCount: { paramId: countId, value: settings.frameCount },
    };
}
/** Prepare only from an actual camera-scoped quick-set response. Never invent
 * or interpret the unknown tuple components. Modify duration/gain only.
 */
export function buildCurrentCapturePlan(profile, catalog, settings, quickSets) {
    const controls = resolveCurrentCaptureControls(profile, catalog, settings);
    if ((quickSets.code ?? 0) !== 0)
        throw new CurrentProtocolError("device", `Quick-set discovery failed (${quickSets.code})`, Number(quickSets.code), 11040);
    if ((quickSets.cameraType ?? 0) !== settings.cameraId ||
        !Array.isArray(quickSets.quickSetList))
        throw new CurrentProtocolError("decode", "Quick-set response does not match the selected camera");
    const templates = quickSets.quickSetList.flatMap((entry) => {
        if (!entry || typeof entry !== "object" || typeof entry.infoId !== "string")
            return [];
        if (entry.cameraType !== undefined &&
            entry.cameraType !== settings.cameraId)
            return [];
        const parts = entry.infoId.split("|");
        if (parts.length < 6 ||
            !parts[2].trim() ||
            !parts[3].trim() ||
            !parts[4].trim())
            return [];
        const exposure = Number(parts[2]);
        const gain = Number(parts[3]);
        const resolution = Number(parts[4]);
        if (!Number.isFinite(exposure) ||
            exposure <= 0 ||
            !Number.isSafeInteger(gain) ||
            gain < 0 ||
            !Number.isSafeInteger(resolution) ||
            resolution < 0)
            return [];
        return [
            { infoId: entry.infoId, parts, exposure, gain, resolution },
        ];
    });
    templates.sort((first, second) => Math.abs(first.exposure - settings.exposureSeconds) -
        Math.abs(second.exposure - settings.exposureSeconds) ||
        Math.abs(first.gain - settings.gain) -
            Math.abs(second.gain - settings.gain));
    if (!templates.length)
        throw new CurrentProtocolError("unsupported", "The camera returned no usable astronomy quick-set template");
    const template = templates[0];
    const parts = [...template.parts];
    parts[2] = String(settings.exposureSeconds);
    parts[3] = String(settings.gain);
    const quickSetInfoId = parts.join("|");
    return {
        settings: Object.freeze({ ...settings }),
        controls,
        sourceQuickSetInfoId: template.infoId,
        quickSetInfoId,
        resolutionIndex: template.resolution,
        steps: [
            { operation: "setExposure", values: { ...controls.exposure } },
            { operation: "setGain", values: { ...controls.gain } },
            { operation: "setQuickSet", values: { infoId: quickSetInfoId } },
            // D3 capture reloads stale parameters if these are not reapplied after11041.
            { operation: "setExposure", values: { ...controls.exposure } },
            { operation: "setGain", values: { ...controls.gain } },
            { operation: "setIntegerParameter", values: { ...controls.frameCount } },
            settings.cameraId === 0
                ? {
                    operation: "startTeleCapture",
                    values: { irIndex: settings.filterIndex },
                }
                : { operation: "startWideCapture", values: {} },
        ],
    };
}
/** Pure adaptation for an OBSERVED active capture namespace (11/13). This never
 * sends automatically: a new mode must be supported by an actual15264 echo and
 * correlated with the active camera/capture before the caller applies it.
 */
export function currentCaptureControlsForObservedMode(controls, modeId) {
    if (modeId !== 11 && modeId !== 13)
        throw new CurrentProtocolError("unsupported", "No verified capture-runtime parameter namespace for this observed mode");
    return {
        exposure: {
            ...controls.exposure,
            paramId: withCurrentParamMode(controls.exposure.paramId, modeId),
        },
        gain: {
            ...controls.gain,
            paramId: withCurrentParamMode(controls.gain.paramId, modeId),
        },
        frameCount: {
            ...controls.frameCount,
            paramId: withCurrentParamMode(controls.frameCount.paramId, modeId),
        },
    };
}
export async function executeCurrentCapture(transport, profile, catalog, settings) {
    resolveCurrentCaptureControls(profile, catalog, settings);
    if (running.has(transport))
        throw new CurrentProtocolError("busy", "Astronomy capture configuration is already in progress");
    running.add(transport);
    const generation = transport.state?.session.generation;
    const sameSession = () => {
        if (generation !== undefined &&
            transport.state?.session.generation !== generation)
            throw new CurrentProtocolError("transport", "Connection changed during astronomy capture configuration");
    };
    const send = async (operation, values) => {
        sameSession();
        const packet = await transport.request(operation, values);
        sameSession();
        assertCurrentSuccess(packet);
        return packet;
    };
    try {
        const mode = await send("switchShootingMode", { mode: 8 });
        if (mode.data.shootingModeId !== 8)
            throw new CurrentProtocolError("device", "DWARF did not confirm astronomy mode 8", undefined, 16402);
        const camera = await send("enterCamera", {
            clientParam: { encodeType: 1 },
        });
        if (![2, 8].includes(camera.data.shootingModeId))
            throw new CurrentProtocolError("device", "DWARF did not confirm the astronomy camera", undefined, 16404);
        const tech = await send("switchShootingTech", { tech: 2 });
        if (tech.data.shootingTechId !== 2)
            throw new CurrentProtocolError("device", "DWARF did not confirm deep-sky stacking technology", undefined, 16403);
        const quickSets = await send("getQuickSets", {
            cameraType: settings.cameraId,
        });
        const plan = buildCurrentCapturePlan(profile, catalog, settings, quickSets.data);
        let acknowledgement;
        for (const step of plan.steps) {
            acknowledgement = await send(step.operation, step.values);
            if (step.operation === "setQuickSet" &&
                acknowledgement.data.infoId &&
                acknowledgement.data.infoId !== plan.quickSetInfoId)
                throw new CurrentProtocolError("device", "DWARF returned a different astronomy quick-set configuration", undefined, 11041);
        }
        return {
            status: "awaiting-progress",
            plan,
            acknowledgement: acknowledgement,
        };
    }
    finally {
        running.delete(transport);
    }
}
