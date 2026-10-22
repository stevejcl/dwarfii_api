/** Native deep-sky timed schedules, evidenced by APK 3.4.3 and both current
 * firmware descriptors. Protocol capability comes from getDefaultParamsConfig,
 * never the firmware release or the WebSocket packet envelope.
 */
import { CurrentProtocolError, assertCurrentSuccess, getCurrentProfile, } from "./current_protocol.js";
import { findCurrentCameraParameter, selectCurrentExposure, selectCurrentParameterValue, } from "./current_catalog.js";
import { resolveCurrentScienceFilter } from "./current_capture.js";
function invalid(message) {
    throw new CurrentProtocolError("invalid-parameter", message);
}
function mac(value) {
    if (typeof value !== "string")
        invalid("A physical device MAC is required");
    const normalized = value.replace(/[:-]/g, "").toLowerCase();
    if (!/^[0-9a-f]{12}$/.test(normalized))
        invalid("Invalid physical device MAC");
    return normalized;
}
function finiteRange(value, min, max, label) {
    if (!Number.isFinite(value) || value < min || value > max)
        invalid(`${label} is out of range`);
}
function seconds(value) {
    if (!Number.isSafeInteger(value) || value < 0 || value > 253402300799)
        invalid("Schedule timestamps must be UNIX seconds, not milliseconds");
}
function timezoneOffset(timezone, epochSeconds) {
    if (typeof timezone !== "string" || !timezone.trim())
        invalid("Choose the observing site's IANA timezone before scheduling");
    try {
        const label = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            timeZoneName: "longOffset",
        })
            .formatToParts(new Date(epochSeconds * 1000))
            .find((part) => part.type === "timeZoneName")?.value;
        if (label === "GMT" || label === "UTC")
            return 0;
        const match = /^GMT([+-])(\d{2}):(\d{2})$/.exec(label ?? "");
        if (!match)
            invalid("Cannot resolve the observing site's timezone offset");
        return ((match[1] === "-" ? -1 : 1) * (Number(match[2]) + Number(match[3]) / 60));
    }
    catch {
        return invalid("Choose a valid IANA timezone for the observing site");
    }
}
/** APK HTTP config ProtocolVersion: D3 >=1.9; D2/Mini >=1.7.
 * A WS packet header is not a capability source. Unknown config is unsupported.
 */
export function supportsCurrentNativeSchedules(hardwareId, peer) {
    if (![1, 2, 4].includes(hardwareId) ||
        !peer ||
        !Number.isSafeInteger(peer.majorVersion) ||
        !Number.isSafeInteger(peer.minorVersion) ||
        peer.majorVersion < 0 ||
        peer.minorVersion < 0)
        return false;
    return (peer.majorVersion > 1 ||
        (peer.majorVersion === 1 && peer.minorVersion >= (hardwareId === 2 ? 9 : 7)));
}
/** Create an app-compatible timed job. Counts are progress, not frame quotas.
 * This prepares data only; submitCurrentTimedSchedule checks live capability.
 */
export function buildCurrentTimedSchedule(identity, catalog, input, nowSeconds = Math.floor(Date.now() / 1000)) {
    const profile = getCurrentProfile(identity.hardwareId);
    mac(identity.macAddress);
    if (catalog.modeId !== 2)
        invalid("Native deep-sky schedules require the mode-2 camera catalog");
    seconds(nowSeconds);
    timezoneOffset(input.timezone, nowSeconds);
    const planningTime = input.planningTimeSeconds ?? nowSeconds;
    seconds(planningTime);
    if (!input.id?.trim() ||
        !input.name?.trim() ||
        !Array.isArray(input.tasks) ||
        !input.tasks.length)
        invalid("Schedule ID, name and at least one task are required");
    finiteRange(input.latitude, -90, 90, "Latitude");
    finiteRange(input.longitude, -180, 180, "Longitude");
    if (typeof input.autofocus !== "boolean")
        invalid("Choose an autofocus mode");
    if (input.skipCalibration !== undefined &&
        typeof input.skipCalibration !== "boolean")
        invalid("skipCalibration must be boolean");
    const ids = new Set([input.id]);
    const windows = [];
    const tasks = input.tasks.map((task) => {
        if (!task.id?.trim() || ids.has(task.id) || !task.target?.trim())
            invalid("Task IDs must be distinct and each task needs a target");
        ids.add(task.id);
        seconds(task.startTimeSeconds);
        seconds(task.endTimeSeconds);
        if (task.startTimeSeconds <= nowSeconds ||
            task.endTimeSeconds - task.startTimeSeconds < 600 ||
            task.startTimeSeconds % 60 !== 0 ||
            task.endTimeSeconds % 60 !== 0)
            invalid("Each task needs a future whole-minute window of at least 10 minutes");
        finiteRange(task.rightAscensionHours, 0, 24, "Right ascension hours");
        if (task.rightAscensionHours === 24)
            invalid("Right ascension must be <24h");
        finiteRange(task.declinationDegrees, -90, 90, "Declination degrees");
        if (windows.some((w) => task.startTimeSeconds < w.end && task.endTimeSeconds > w.start))
            invalid("Timed tasks must not overlap");
        windows.push({ start: task.startTimeSeconds, end: task.endTimeSeconds });
        const exposure = selectCurrentExposure(catalog, 0, task.exposureSeconds);
        const gainParameter = findCurrentCameraParameter(catalog, 0, "gain");
        const gain = selectCurrentParameterValue(gainParameter, task.gain);
        const filter = resolveCurrentScienceFilter(profile, task.filterIndex);
        return {
            scheduleId: input.id,
            scheduleTaskId: task.id,
            state: 0,
            paramMode: 0,
            paramVersion: 1,
            createFrom: 2,
            params: JSON.stringify({
                name: task.target.trim(),
                wellknownName: "",
                ra: task.rightAscensionHours,
                dec: task.declinationDegrees,
                startTime: task.startTimeSeconds,
                endTime: task.endTimeSeconds,
                shutterIndex: exposure.value,
                shutterName: findCurrentCameraParameter(catalog, 0, "exp").options?.find((option) => option.value === exposure.value)?.label ?? String(task.exposureSeconds),
                gainIndex: gain.value,
                gainName: gainParameter.options?.find((option) => option.value === gain.value)
                    ?.label ?? String(gain.value),
                filterModeIndex: filter,
                filterModeName: profile.scienceFilters.find((f) => f.index === filter)
                    .label,
                count: 0,
                stacked: 0,
                isMosaicMode: false,
                horizontalScale: 100,
                verticalScale: 100,
                rotation: -1,
                atlasSortTypeValue: -6,
                cometQueryName: "",
            }),
        };
    });
    const start = Math.min(...windows.map((window) => window.start));
    const end = Math.max(...windows.map((window) => window.end));
    if (start - nowSeconds > 12 * 3600)
        invalid("The device accepts native schedules within 12 hours of the start; submit later");
    return {
        scheduleId: input.id,
        scheduleName: input.name.trim(),
        deviceId: identity.hardwareId,
        macAddress: identity.macAddress,
        startTime: String(start),
        endTime: String(end),
        createdTime: String(nowSeconds),
        updatedTime: String(nowSeconds),
        state: 1,
        result: 0,
        lock: 0,
        password: "",
        paramMode: 0,
        paramVersion: 1,
        scheduleTime: String(planningTime),
        syncState: 0,
        params: JSON.stringify({
            focusMode: input.autofocus ? 1 : 0,
            latitude: input.latitude,
            longitude: input.longitude,
            cityName: input.cityName ?? "",
            calibrationMode: input.skipCalibration ? 1 : 0,
        }),
        shootingTasks: tasks,
    };
}
const submitting = new WeakSet();
function matchingJson(actual, expected) {
    const ordered = (value) => Array.isArray(value)
        ? value.map(ordered)
        : value && typeof value === "object"
            ? Object.fromEntries(Object.keys(value)
                .sort()
                .map((key) => [key, ordered(value[key])]))
            : value;
    try {
        return (typeof actual === "string" &&
            JSON.stringify(ordered(JSON.parse(actual))) ===
                JSON.stringify(ordered(JSON.parse(expected))));
    }
    catch {
        return false;
    }
}
/** Explicit submission, never ownership acquisition or automatic replacement.
 * A successful ACK is insufficient: the device must return the exact queued
 * plan on readback. Errors after sync can mean uncertain submission; callers
 * must inspect device schedules before deciding what to do next.
 */
async function submitTimedSchedule(client, identity, catalog, input, now, readback) {
    if (submitting.has(client))
        throw new CurrentProtocolError("busy", "A schedule submission is pending");
    const schedule = buildCurrentTimedSchedule(identity, catalog, input, now());
    const siteTimezone = input.timezone;
    identity = {
        ...identity,
        protocolVersion: identity.protocolVersion && {
            ...identity.protocolVersion,
        },
    };
    const generation = client.state.session.generation;
    const check = () => {
        const state = client.state.session;
        if (state.generation !== generation ||
            state.phase !== "ready" ||
            state.ownership !== "control")
            throw new CurrentProtocolError("transport", "Schedule submission needs the same connected, controlled session");
        if (client.profile.hardwareId !== identity.hardwareId)
            invalid("Schedule identity does not match the connected device model");
        if (!supportsCurrentNativeSchedules(identity.hardwareId, identity.protocolVersion))
            throw new CurrentProtocolError("unsupported", "Native scheduling requires HTTP config protocol >=1.9 on DWARF 3 or >=1.7 on DWARF 2/Mini");
        const protocol = identity.protocolVersion;
        if ((input.autofocus || input.skipCalibration) &&
            !(protocol.majorVersion > 2 ||
                (protocol.majorVersion === 2 && protocol.minorVersion >= 5)))
            throw new CurrentProtocolError("unsupported", "Scheduled autofocus/skip-calibration requires HTTP config protocol >=2.5");
        if (Number(schedule.startTime) <= now())
            invalid("The scheduled start passed during preparation");
    };
    const list = async () => {
        check();
        const packet = await client.request("getAllShootingSchedule");
        check();
        assertCurrentSuccess(packet);
        const rows = packet.data.shootingSchedule ?? [];
        if (!Array.isArray(rows) ||
            rows.some((row) => !row || typeof row.scheduleId !== "string" || !row.scheduleId) ||
            new Set(rows.map((row) => row.scheduleId)).size !== rows.length)
            invalid("The device returned an invalid native schedule list");
        return rows;
    };
    check();
    submitting.add(client);
    try {
        if (readback === "list") {
            const before = await list();
            if (before.some((row) => row.scheduleId === schedule.scheduleId))
                invalid("That schedule ID already exists; nothing was replaced");
        }
        check();
        // A booted device can reject an otherwise valid plan with -16301 until its
        // clock is initialized. This is part of explicit submission, never passive
        // connect/reconnect. Offset is for the site's timezone NOW, not the PC's.
        const clockNow = now();
        seconds(clockNow);
        const time = await client.request("setTime", {
            timestamp: String(clockNow),
            timezoneOffset: timezoneOffset(siteTimezone, clockNow),
        });
        check();
        assertCurrentSuccess(time);
        const zone = await client.request("setTimezone", {
            timezone: siteTimezone,
        });
        check();
        assertCurrentSuccess(zone);
        const response = await client.request("syncShootingSchedule", {
            shootingSchedule: schedule,
        });
        check();
        assertCurrentSuccess(response);
        if (response.data.timeConflictScheduleIds?.length)
            throw new CurrentProtocolError("busy", "Device reported conflicting schedules; no replacement was requested");
        let confirmed;
        if (readback === "list") {
            confirmed = (await list()).find((row) => row.scheduleId === schedule.scheduleId);
        }
        else {
            const packet = await client.request("getShootingScheduleById", {
                id: schedule.scheduleId,
            });
            check();
            assertCurrentSuccess(packet);
            confirmed = packet.data.shootingSchedule;
        }
        if (!confirmed ||
            confirmed.scheduleId !== schedule.scheduleId ||
            confirmed.deviceId !== identity.hardwareId ||
            mac(confirmed.macAddress) !== mac(identity.macAddress) ||
            confirmed.state !== 1 ||
            String(confirmed.startTime) !== schedule.startTime ||
            String(confirmed.endTime) !== schedule.endTime ||
            !matchingJson(confirmed.params, schedule.params) ||
            !Array.isArray(confirmed.shootingTasks) ||
            confirmed.shootingTasks.length !== schedule.shootingTasks.length ||
            schedule.shootingTasks.some((task) => !confirmed.shootingTasks.some((saved) => saved.scheduleTaskId === task.scheduleTaskId &&
                saved.scheduleId === task.scheduleId &&
                matchingJson(saved.params, task.params))))
            throw new CurrentProtocolError("device", "Device did not confirm the exact queued plan; read schedules before retrying");
        return { status: "queued", schedule: confirmed };
    }
    finally {
        submitting.delete(client);
    }
}
/** Submit a caller-assigned ID with existing-list preflight and list readback. */
export function submitCurrentTimedSchedule(client, identity, catalog, input, now = () => Math.floor(Date.now() / 1000)) {
    return submitTimedSchedule(client, identity, catalog, input, now, "list");
}
/** Explicit first-job creation without relying on the firmware's broken empty
 * list response. IDs are generated internally with a fresh cryptographic UUID;
 * caller IDs are never reused. Native conflict checks remain authoritative,
 * replacement is never requested, and exact per-ID readback is mandatory.
 * This is not an automatic fallback from a timed-out or failed list request.
 */
export function createCurrentTimedSchedule(client, identity, catalog, draft, now = () => Math.floor(Date.now() / 1000)) {
    const prefix = crypto.randomUUID();
    const timestamp = now() * 1000;
    const input = {
        ...draft,
        id: `${prefix}${timestamp}.Android`,
        tasks: draft.tasks.map((task, index) => ({
            ...task,
            id: `${prefix}${timestamp + index + 1}`,
        })),
    };
    return submitTimedSchedule(client, identity, catalog, input, now, "id");
}
