# DWARF mini PCAP Findings

## Purpose

This document captures protocol findings from DWARF mini pcap captures and translates them into practical driver implications.

The available captures were recorded with an older DWARFLAB application and
firmware. They document historical wire behavior, but do not prove that newer
APK commands such as `11050` are unsupported by current firmware.

Decoder used: `tools/v3-probe/pcap-decode.js`

---

## Executive Summary

### Finite capture and stop timing (new 2026-08-02 analysis)

`iphone-capture2.pcap` shows `11005` starting a persisted sequence with
`15209 totalCount=20`, `expIndex=42`, `gainIndex=3`, and stale
`targetName="Sun"`. The app sent `11006` after `stackedCount=5`; a sixth stack
completed while the stop request was being processed. In
`iphone-capture3-photo.pcap`, a persisted `totalCount=999` likewise continued
until an explicit `11006`.

The DWARF 3 app additionally writes frame count with `16703`, paramId
`144678138029277200` (`0x0202000000000010`, astro/cat2/tele/frameCount).
This write changed from 509 to 999 in the capture. A live test proved that
`11041` can echo a requested count of 1 while `15209.total_count` remains at
the stale value 999. Cross-model live testing refined the interoperable order:
send exact exposure/gain (`16700`, `16701`), prime `11041`, then write frame
count with `16703` immediately before `11005`. Mini firmware can reject 16700
with generic code -1; in that case the complete accepted 11041 tuple is the
fallback. Then monitor
`15209.stacked_count`, and send `11006` as soon as the
requested number of completed stacks is reached. Media download must not delay
the stop request. `current_count` is acquisition progress and can run ahead of
accepted stacks; `targetName` is persisted firmware metadata rather than proof
of the current client's target selection.

A 2026-08-26 DWARF 3 live test confirmed that this complete sequence preserved
a requested 1-second, gain-60 Astro exposure and produced a fresh raw FITS.
Omitting the persisted quick-set priming allowed `11005` to reload 15 seconds.
Notification `15288` (`LongExpPhotoProgress.total_time`) reports the duration
actually selected by the firmware. A 1-millisecond request and a later
1-second VIS-filter request were replaced by 15 seconds on the tested firmware,
so a command acknowledgement alone is not proof that a duration was applied.
Clients should record/report the actual duration and still deliver the matching
fresh FITS; discarding it leaves asynchronous Alpaca clients polling forever.

A follow-up live trace located the override: during `11005` preparation,
DWARF 3 emits `15264` from module 15 and reloads exposure/gain in an internal
capture namespace (mode 11 or 13 observed). Clients must not discard module-15
`15264` packets. Detect the namespace from the high byte of its exposure/gain
paramId and reapply `16700`, `16701`, and the namespaced `16703` frame count.
The fifth `11041` component is resolution (D3 `0`, Mini `1`), not count. With
this workflow, a live 0.001-second/gain-0 request produced a non-uniform FITS
with values 200..1649 instead of the saved 15-second preset. Daylight files
whose min and max are both 4095 are genuinely saturated at the 12-bit ceiling;
they are not zero-valued images introduced by FITS decoding.

### Confirmed protocol behavior

1. LED and ring-light flow is clean and classified.
2. Focus stepping and focus notifications are consistent.
3. Infinity/autofocus actions produce a repeatable state transition notify sequence.
4. Astro session flow without target is stable and traceable in command groups.
5. `15288` is strongly linked to exposure duration telemetry:
   - `60.0` during 60s sessions
   - `30.0` during 30s sessions

### Remaining open items

- `15256`: resolved by the APK 3.4.1 descriptor as `CalibrationResult` (`azi`, `alt`).
- `15262`: varint flag (`1` observed), likely state latch.
- `15280`: autofocus-state style notify (`1 -> 3`), observed as alternate autofocus-state signal.

---

## LED and Ring-Light Control

Ring light:

- `13500` open
- `13501` close
- notify `15221` confirms RGB state

Power indicator:

- `13503` on
- `13504` off
- notify `15222` confirms indicator state

Interpretation:

- This path is clean and deterministic.
- `13503` and `13504` are known enum commands (not true unknowns).

---

## Focus Behavior

Manual stepping is consistent:

- `15001` requests
- `15257` focus position notifies

Infinity-focus/autofocus behavior:

- `15004` autofocus start
- paired notify sequence on `15280` with values `1` then `3`

Interpretation:

- `15280` behaves like autofocus lifecycle state for this firmware path.
- The `1 -> 3` pattern is repeatable around each infinity-focus action.

---

## Astro Session (no target, 2 images)

Status polling and setup:

- `11039`, `11041`, `15264`

Start stacking:

- `11005`

Progress:

- `15255` and `15209`

Key confirmation:

- `15288` payload decodes to `30.0` in 30s sessions (6 samples), matching the exposure flow.

---

## Mount Control (Manual Joystick)

Manual mount control is dominated by step-motor joystick streaming commands in module 6.

### Primary commands observed

- `14006` `CMD_STEP_MOTOR_SERVICE_JOYSTICK`
  - count: very high (hundreds of repeated requests while dragging joystick)
  - paired with normal `NRESP` acknowledgements.
- `14008` `CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP`
  - count: 6 per session typical
  - emitted when joystick interaction stops/releases.

### Argument structure for `14006`

Observed raw layout is stable:

- `09 <8 bytes> 11 <8 bytes>`

Interpretation:

- protobuf field 1 = fixed64/double
- protobuf field 2 = fixed64/double

Decoded sample pairs:

- `A=43.376511, B=0.010059`
- `A=58.315948, B=0.010404`
- `A=71.180380, B=0.019846`
- `A=76.993163, B=0.102873`
- `A=79.750064, B=0.257493`

Observed ranges:

- `A_range = 0.482469 .. 359.775517`
- `B_range = 0.010000 .. 1.000000`

Working interpretation:

- `A` behaves like an angle/heading in degrees (near 0..360 wrap).
- `B` behaves like normalized joystick magnitude/speed (0..1).

### Driver implications (manual mount)

1. For real hardware mode, joystick-like manual axis control should map to a continuous stream model, not single-shot axis jumps.
2. `14008` should be treated as authoritative stop signal for manual slew termination.
3. If implementing direct joystick bridge, use:
   - angle input domain: approximately `0..360`
   - magnitude domain: `0..1`
4. Keep ACK-tolerant behavior; responses are frequent but not one-to-one deterministic at UI cadence.

---

## Media Gallery

### Media/gallery command flow observed

1. Stack progress context present before gallery action:

- `15209` `N:RawLiveStackProg`
  - sample notify payload includes:
    - `totalCount`: `280`
    - `currentCount`: `70`
    - `stackedCount`: `67`
    - `expIndex`: `162`
    - `gainIndex`: `18`
    - `targetName`: `SH 2-274`

2. Save stacked image action:

- Request: `11033` `V3:SaveStacked` (`V3ReqSaveStackedImage`)
  - `path`: `/DWARF_mini/Astronomy/DWARF_RAW_TELE_SH 2-274_EXP_120_GAIN_60_2026-03-17-20-19-01-615/`
- Response: `11033` `V3ResSaveStackedImage`
  - `code`: `-16600`

Interpretation:

- Save request is issued with a full capture-directory path.
- In this sample the device returns failure code `-16600` (error meaning still to be mapped in decoder docs).

3. Gallery listing action:

- Request: `11034` `V3:ListSaved`
- No decoded inner response payload observed in this short capture window.

### Additional telemetry

- `15288` appears once with raw `09 00 00 00 00 00 00 4e 40`.
  - decoded double value: `60.0`
  - consistent with previously observed exposure-duration telemetry behavior.

### Driver implications (media)

1. Handle `11033` save failures explicitly and surface returned numeric code to clients/logs.
2. Preserve/save path argument in logs for troubleshooting and retry logic.
3. Keep `15209` fields available in runtime diagnostics for linking gallery actions to capture context.
4. Treat `15288` as auxiliary exposure-duration telemetry (here: `60.0`).

### Error codes seen in captures

`11033` SaveStacked:

- `code = -16600`
- observed during media gallery save with explicit astronomy path.
- confidence: medium (not present in current published error enum).
- likely class: V3 save/export failure in media pipeline (path/state/timing related).

---

## Observed Request Arguments

The decoder output includes parsed request payload fields for many calls. Below are the key argument-level observations.

### System and location

- `13010` V3:SetGPS (`V3ReqSetGPSLocation`)
  - `lat`, `lon`, `alt`, `locationName` fields

### Mode and camera setup

- `16404` V3:ModeSwitch (`V3ReqModeSwitch`)
  - `inner.value`: `1`
- `16403` V3:ShootModeSwitch (`V3ReqShootingModeSwitch`)
  - `modeId`: `2`
- `10050` V3:OpenTele (`V3ReqOpenTeleCamera`)
  - `action`: `1`
- `12036` V3:OpenWide
  - request seen both with and without explicit `action` field.

### Focus and autofocus

- `15001` ManualSingleStepFocus
  - raw argument often `08 01` (single varint field set to `1`)
- `15004` AstroAutoFocusStart
  - raw argument observed as `08 01`

### Astro parameter and status flow

- `11039` V3:StatusPoll (`V3ReqStatusPolling`)
  - `field1`: `-1`
  - `field2`: `100`
  - `field3`: `100`
  - `field4`: `-1`
- `11041` V3:SetAstroParams (`V3ReqSetAstroParams`)
  - observed: `params = "0|0|10|60|1|null"` (10s exposure)
  - observed: `params = "0|0|30|60|1|null"` (30s exposure)
  - observed: `params = "0|0|60|60|1|null"` (60s exposure)
  - interpretation: 3rd value = exposure seconds, 4th value = gain (always 60).
- `11005` StartStacking
  - raw payload: `08 ff ff ff ff ff ff ff ff ff 01`
  - app-side sentinel/default argument for that historical captured session.
  - not universal: live DWARF 3 testing requires the selected filter index and
    `force_start`; the sentinel attempt returned `-11530` and no progress.
    APK 3.4.1 names this code `CODE_ASTRO_DARK_TEMP_MISMATCH`, so the capture
    was blocked by dark-frame temperature validation rather than proving a
    malformed filter payload. APK 3.4.1 uses empty command `11050` to Continue
    on protocol >=2.5 non-DWARF-2 devices, with `force_start=true` as the
    DWARF 2/older-protocol fallback.

### Filter change

- `16703` V3:AdjustParam (`V3ReqAdjustParam`)
  - `paramId`: `144396663052566541`
  - `value`: `2`
  - used for Duo-Band filter selection.

### LED / power indicator controls

- `13500` OpenRGB: no additional fields.
- `13501` CloseRGB: no additional fields.
- `13503` Power indicator ON: command-only toggle.
- `13504` Power indicator OFF: command-only toggle.

Notes on argument format:

- Values shown above are as decoded from protobuf payloads.
- Pipe strings in `11041` should be treated as protocol-defined packed parameter tuples.

---

## Cross-Capture Comparison

### `15288` exposure-duration correlation

| Session | `15288` value | Context |
|---------|---------------|---------|
| 60s astro | `60.0` | 60s cadence confirmed |
| 30s astro | `30.0` | 30s cadence confirmed |

Conclusion: High confidence that `15288` carries exposure/session duration telemetry in seconds.

### `15256` calibration result

Observed payload shape:

- field 1: double
- field 2: double

Sample values:

- `359.5664`, `49.7777`
- `359.5906`, `49.6943`
- `359.5646`, `49.7261`

Conclusion: The APK 3.4.1 embedded `notify.proto` descriptor identifies this as
`CalibrationResult` with `double azi = 1` and `double alt = 2`.

---

## Undocumented / Provisional Signals

### `15256` (notify, mod=9)

Status: Confirmed successful calibration result by the APK descriptor.

Working interpretation: Two doubles, coordinate-like solver telemetry.

### `15262` (notify, mod=9)

Status: Provisional.

Observed: `08 01` only.

Working interpretation: boolean/state latch near solver/observation transitions.

### `15280` (notify, mod=9)

Status: Provisional but behaviorally strong.

Observed: `08 01` then `08 03` around autofocus start (`15004`).

Working interpretation: alternate autofocus state notification for this firmware path.

Note: `15278` (CMD_V3_NOTIFY_AUTOFOCUS_STATE) also shows the same `1→3` pattern. The device uses one or the other depending on session — both are real. Possible causes: firmware version differences, AF type (standard vs astro).

### `15288` (notify, mod=9)

Status: Strongly inferred.

Observed: fixed64/double payload tracks configured exposure seconds (`60.0`, `30.0`).

Working interpretation: exposure/session duration telemetry.

---

## Driver Impact Checklist

### Already actionable

1. Keep using focus notifications (`15257`) as primary position truth.
2. Treat `15280` as autofocus-state signal where present.
3. Use `15288` as additional telemetry to validate runtime exposure duration.
4. Keep RGB/power-indicator command map complete (`13500`, `13501`, `13503`, `13504`).

### Recommended next implementation

1. Add explicit notify decode path for `15280` in runtime/session diagnostics.
2. Add optional runtime field for latest `15288` value for easier troubleshooting.
3. Treat `15256` as successful calibration completion and retain its solved azimuth/altitude.

---

## How To Reproduce Analysis

From `tools/v3-probe`:

```bash
node pcap-decode.js /path/to/capture.pcap > decode-output.txt
```

Extract key signal lines:

```bash
grep -E "cmd=15256|cmd=15262|cmd=15280|cmd=15288|cmd=15004|cmd=15001|cmd=15257|cmd=11005|cmd=15255|cmd=15209" decode-output.txt
```
