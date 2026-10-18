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
  autofocus: false,
  skipCalibration: false,
  planningTimeSeconds: now, // observing-date anchor, independent of task start
  tasks: [{
    id: uniqueTaskId,
    target: targetName,
    rightAscensionHours: raHours,
    declinationDegrees: decDegrees,
    startTimeSeconds: now + 1800,
    endTimeSeconds: now + 2400,
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

Every task must start in the future, last at least 600 seconds, and not overlap
another task in the same plan. RA is hours in [0,24), declination is degrees in
[-90,90], and time values are integer UNIX seconds. Convert local calendar time
once; do not add a timezone offset to the resulting epoch. Desired exposure and
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

## Physical acceptance on 2026-10-18

Mini 1.1.4.4 / HTTP configuration 2.6: a future 600-second test job was accepted,
read back as queued, immediately cancelled and confirmed absent. Pre-existing
completed history was preserved. No test task executed.

DWARF 3 1.5.3.9 / HTTP configuration 2.6: native list command 13:16102 remained
silent with ownership held and working state heartbeats. Comparisons included
the exact APK 3.4.3 request envelope (2.7, hardware ID 2), legacy headers and
confirmed DSO mode 2. Both devices replied with envelope 1.8, which is a separate
version source. The DWARF 3 cause remains unresolved; the helper stops at its
failed list preflight and sends no blind job. Use an explicitly connected local
scheduler only if its own execution path has been accepted; this audit does not
certify a DWARF 3 on-device timed job.
