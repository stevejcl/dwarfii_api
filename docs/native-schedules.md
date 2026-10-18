# Native timed schedules

`buildCurrentTimedSchedule` prepares a version-1 deep-sky plan from the live
mode-2 catalog. `submitCurrentTimedSchedule` checks the connected controlled
session, reads existing schedules, submits without automatic replacement, and
reads the new plan back. A resolved result means **queued**, not executed.

The feature version comes from `fetchDefaultParamsConfig(ip).data`, not the
firmware string, `getCurrentProfile` or a received WS header. The APK requires
HTTP configuration protocol >=1.9 on DWARF 3, >=1.7 on DWARF 2/Mini, and >=2.5
for scheduled autofocus/skip-calibration. Unknown capability blocks writes.

Assume `client` is connected to the discovered device, ready and explicitly
controlled by the caller. Discover identity and catalog from that same address;
do not reuse another device's discovery/catalog or log raw discovery responses.

```js
import {
  fetchDefaultParamsConfig,
  getParamAndSetting,
  normalizeCurrentCameraCatalog,
  submitCurrentTimedSchedule,
} from "dwarfii_api";

const configuration = await fetchDefaultParamsConfig(ip);
const catalog = normalizeCurrentCameraCatalog(await getParamAndSetting(ip, 2), 2);
const now = Math.floor(Date.now() / 1000);
const identity = {
  hardwareId: discovery.data.deviceId ?? discovery.data.deviceID,
  macAddress: discovery.data.macAddress,
  protocolVersion: {
    majorVersion: configuration.data.majorVersion,
    minorVersion: configuration.data.minorVersion,
  },
};
const result = await submitCurrentTimedSchedule(client, identity, catalog, {
  id: uniqueScheduleId,
  name: "Evening target",
  latitude: observingLatitude,
  longitude: observingLongitude,
  timezone: "Europe/Berlin", // observing site's IANA timezone
  autofocus: false,
  skipCalibration: false,
  planningTimeSeconds: now, // observing-date anchor, independent of task start
  tasks: [{
    id: uniqueTaskId,
    target: targetName,
    rightAscensionHours: raHours,
    declinationDegrees: decDegrees,
    startTimeSeconds: Math.ceil((now + 1800) / 60) * 60,
    endTimeSeconds: Math.ceil((now + 1800) / 60) * 60 + 600,
    exposureSeconds: desiredExposureSeconds,
    gain: desiredGain,
    filterIndex: desiredScienceFilterIndex,
  }],
});
// result.status === "queued" only after the exact plan is read back.
```

Use distinct persistent IDs. The official Android app uses a persisted client-ID
prefix plus millisecond timestamp, with `.Android` appended to the schedule ID;
that format was used in the controlled Mini acceptance test. UUID-only IDs have
not been physically certified by this test. Do not reuse an existing plan ID to
edit it through the create helper.

Every task must start in the future within 12 hours, use whole-minute boundaries,
last at least 600 seconds, and not overlap
another task in the same plan. RA is hours in [0,24), declination is degrees in
[-90,90], and time values are integer UNIX seconds. Convert local calendar time
once; do not add a timezone offset to the resulting epoch. Explicit submission
initializes the device clock with UNIX seconds and the site's current UTC offset,
then sets its IANA timezone before writing the plan. A failed clock command
blocks submission. Passive connection/reconnection never changes the clock.
Desired exposure and
gain must be supported by the actual camera catalog. Count/stacked are progress,
so this API does not promise a frame quota or prepare a separate EQ/dark recipe.

The builder sends plan state 1 (pending-shoot), idle task state 0, manual
`createFrom=2`, versioned JSON and distinct observing/execution times. Readback
verifies model/MAC, task IDs, parameters, time window and queued state. A conflict
never triggers `replaceShootingSchedule`. If submission times out or readback
fails, inspect the device queue before retrying: the result can be uncertain.

To cancel a known plan on the same controlled device, explicitly send
`cancelShootingSchedule` with `{id, password}` and then read
`getAllShootingSchedule` again. Confirm the ID is absent or terminal; an ACK
alone is insufficient. Do not delete or cancel unrelated schedules.

## First-job creation and the silent empty-list defect

D3 firmware 1.5.3.9's native handler at linked address 0x008e5b60 returns
without sending command 16102 when its queried vector is empty. The ordinary
list preflight must still treat that timeout as unknown; it cannot distinguish
an empty queue, a database problem or transport loss.

For an explicit new plan, use `createCurrentTimedSchedule(client, identity,
catalog, draft)`. The draft has the same fields as the input above, with
schedule/task IDs omitted. This API generates fresh cryptographic IDs internally,
sends sync once, then verifies the exact plan with `getShootingScheduleById`
(command 16103). It never uses a list timeout as evidence and never requests
replacement. It does not return queued until exact per-ID readback succeeds.
The device remains responsible for conflict checks. A database error is a
failure, including during per-ID readback; inspect the generated ID before any
retry if a write may have been accepted.

This is an explicit creation API, not an automatic retry/fallback after a failed
submission. The application must keep ownership and the physical destination
bound throughout the operation, and persist the returned schedule ID for later
query/cancel operations.

## Physical acceptance on 2026-10-18

Mini 1.1.4.4 / HTTP configuration 2.6: a future 600-second test job was accepted,
read back as queued, immediately cancelled and confirmed absent. Pre-existing
completed history was preserved. No test task executed.
This acceptance was repeated separately through the fresh-ID/per-ID-readback
creation API, with the same queue, cancellation and history-preservation results.

DWARF 3 1.5.3.9 / HTTP configuration 2.6: a future whole-minute 600-second job
initially failed with -16301. After clock/timezone initialization, fresh-ID
creation succeeded, exact per-ID readback confirmed pending state, and the full
list returned the stored job. Cancellation returned success and per-ID readback
confirmed removal (-16305). Control was released and no test task executed.
This certifies queue/readback/cancel, not unattended execution or calibration.

The comparison used Steve's [session application](https://github.com/stevejcl/astro_dwarf_session/tree/7b2e8b6e34d90c2806fd1ba49268c80f2827db82)
and its [Python API](https://github.com/stevejcl/dwarf_python_api/tree/93ec09fff6b6dc6afffdf0d1cb2c78d2baf419ca).
Its clock-initialization fix, whole-minute windows, 12-hour submission limit,
and direct creation path guided independently implemented checks here.
