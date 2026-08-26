# Cross-Verification of PCAP Findings

This document cross-checks claims from external pcap analysis against independent decoding of the same and additional captures.

## Methodology

- Decoder: `pcap-decode.js` (same tool, run independently)
- 15 captures total (10 locally decoded, 5 referenced from external analysis)
- Capture labels (C1–C13) are defined in `v3-command-reference.md`

---

## Confirmed (no discrepancies)

### 15288 = Exposure Duration Telemetry

- External claim: `60.0` (60s session), `30.0` (30s session)
- Our result: C10 shows `60.0` ×3 (`09 00 00 00 00 00 00 4e 40`). C8 also shows `60.0` ×1.
- **Verdict: Full match. High confidence.**

### 15256 = Calibration Result

- External claim: double×2, coordinate-like values (`359.5664, 49.7777`, etc.)
- Our result: 3 samples from C10, values match exactly:
  - `359.566401, 49.777716`
  - `359.590588, 49.694299`
  - `359.564649, 49.726089`
- APK 3.4.1 descriptor result: `notify.CalibrationResult { double azi = 1; double alt = 2; }`.
- **Verdict: Payload observations match the authoritative APK schema.**

### 15262 = State Latch

- External claim: `08 01` only, likely state latch
- Our result: C10 shows `08 01` ×3. Always appears immediately after 15256 (paired pattern).
- **Verdict: Match. Paired occurrence with 15256 confirmed.**

### 15001 = Manual Focus

- External claim: `08 01` for backward direction
- Our result: C10 shows 38 occurrences. No argument = forward (focus+1), `08 01` = backward (focus-1). Confirmed via 15257 focus position transitions (674→687→678).
- **Verdict: Match.**

### 11005 = Start Stacking (capability-dependent argument)

- External claim: `08 ff ff ff ff ff ff ff ff ff 01` (large signed varint)
- Our result: Identical byte sequence found in C10.
- **Verdict: Full match for the older app/firmware captured sentinel session.**
  It does not prove that newer commands are unsupported. Separate DWARF 3
  hardware logs prove that a filtered device must send `ir_index` and
  `force_start`; a live sentinel attempt returned `-11530` before any capture,
  but APK 3.4.1 resolves that code as `CODE_ASTRO_DARK_TEMP_MISMATCH`, so it
  does not establish that the sentinel itself was invalid.

### 11039 = Status Polling

- External claim: `field1=-1, field2=100, field3=100, field4=-1`
- Our result: 43 occurrences in C10. Argument values match exactly.
- **Verdict: Full match.**

### 11041 = Pipe-Delimited Parameters

- External claim: `"0|0|10|60|1|null"` (1st run), `"0|0|30|60|1|null"` (2nd run)
- Our result: C10 shows `"0|0|60|60|1|null"` (60s session). Format matches; the 3rd value corresponds to exposure seconds.
- **Verdict: Format match. The 3rd value = exposure seconds, 4th = gain (always 60).**

### 16703 = Filter Wheel

- External claim: `paramId=144396663052566541`, `value=2` (Duo-Band selection)
- Our result: Same value in C10. paramId = astro/cat1/tele/filterWheel (idx=0x0D).
- **Verdict: Full match.**

### 14006/14008 = Joystick Control

- External claim: angle 0–360°, speed 0–1. 780 occurrences.
- Our result: Confirmed in C1×45, C2×332, C6×312. 14008 also seen in C1×4, C2×16, C6×10.
- **Verdict: Match. Reproducible across multiple captures.**

### LED Control (13500–13504, 15221–15222)

- External claim: 13500/13501 (ring light), 13503/13504 (power LED), 15221/15222 (state notifications).
- Our result: C5 shows 13500×2, 13501×2, 13503×1, 13504×1, 15221×2, 15222×2.
- **Verdict: Match. Equivalent flow confirmed.**

---

## Discrepancies

### 15280 vs 15278: AF State Notification

- External report: **15280** showing a `1→3` pattern
- Our result: In C10, **15278** shows `1→3`. 15280 does not appear.

Cross-capture search across all 10 locally available pcaps:

| Capture | 15278 | 15280 |
|---------|-------|-------|
| C10 (full-astro) | 2 | 0 |
| C2 (iphone2) | 2 | 0 |
| C5 (full) | 0 | 3 |
| All other 7 captures | 0 | 0 |

**Verdict: Both CMDs are real. External report is not wrong.**
- 15278 has a protobuf definition (`CMD_V3_NOTIFY_AUTOFOCUS_STATE`)
- 15280 has no protobuf definition
- The device uses one or the other depending on capture/session — even on the same device
- Possible causes: firmware version differences, session state, AF type (standard vs astro)

### 11041 Parameter Values

- External report: 1st `"0|0|10|60|1|null"`, 2nd `"0|0|30|60|1|null"`
- Our result (C10): `"0|0|60|60|1|null"`

**Verdict: Format matches. Values differ because captures used different exposure settings.** External values are from 30s sessions. C10 (60s session) shows 60 in the 3rd position. This confirms the 3rd value = exposure seconds.

---

## Additional Findings Not in External Report

These were found primarily in C10, which was not covered by the external analysis.

### 11018 = EQ Solving (Polar Alignment Verification)

- Observed in C10.
- Request: double×2 (coordinates close to the GPS location)
- Response: double×2 (small values — likely polar alignment offset)
- Defined: `CMD_ASTRO_START_EQ_SOLVING`

### 15239 = EQ Solving State Notification

- `08 01` then `08 03` — appears around 11018 calls
- `1→3` pattern matches the same structure as 15278/15280 AF state
- Defined: `CMD_NOTIFY_EQ_SOLVING_STATE`

### 11013 = GoTo NGC 1788

- Observed in C10.
- Args: RA=`5.115`, Dec=`-3.342`, targetName=`NGC 1788`
- Defined: `CMD_ASTRO_START_ONE_CLICK_GOTO_DSO`

### 15210 = Calibration State Transitions

- 11 occurrences in C10.
- Transition pattern:
  ```
  RUNNING (plateSolving=3)
  → PLATE_SOLVING ×4 (1→2→3→4)
  → PLATE_SOLVING ×1 (reset to 1)
  → RUNNING (1)
  → PLATE_SOLVING ×3 (1→2→3)
  → STOPPED (3)
  ```
- Pre-GoTo auto-calibration flow

### paramId category=2, idx=16

- Observed in C10.
- `144678138029277200` = astro/cat2/tele/idx16
- Identified as the absolute astronomy frame count from app writes of 509 and
  999 immediately after `11041`.
- A device test confirmed that relying on the `11041` echo alone leaves a stale
  `15209.total_count=999`.
- Different from the known filterWheel paramId (cat1/idx13)

### shootingMode=11

- Observed in C10.
- `792915009393917965` = mode11/cat1/tele/filterWheel (idx=0x0D)
- Appears during session end → GO LIVE transition alongside V3ModeChange `mode:11, subMode:2`

### CMD 16702 (Undefined Command)

- 12 occurrences in C8 (camera-ops). Not in C10.
- Not defined in protobuf or cmd_mapping.
- Payload: paramId (varint) + field2 (varint) + field3 (varint, optional)
- paramId = video/cat1/tele/idx3, field2 = 1 or 2, field3 = 3100/3500/3800, etc.

### 15296 = Observation State Notification

- 3 occurrences in C10. Appears around 11047 (SetObsLocation).
- state: `1→3`
- Defined: `CMD_V3_NOTIFY_OBSERVATION_STATE`

---

## Items Not Verified Locally (external pcap not available)

| Item | External claim | Notes |
|------|----------------|-------|
| 15280 AF state `1→3` | Autofocus lifecycle state | Confirmed to exist in C5 |
| 15288 = `30.0` | 30s session correlation | No 30s capture available locally |
| 11033 SaveStacked code=-16600 | Save error | C2 has 5 occurrences of 11033 |
| 15209 stacking (280 frames) | totalCount=280 | C10 shows totalCount=2 |
| 14006 joystick ranges | A=0.48..359.78, B=0.01..1.0 | C1/C2/C6 show equivalent patterns |

---

## Summary

External analysis is **accurate and reliable overall**.

- Confirmed: 9 items (all verified at the value level)
- Discrepancy: 1 item (15280 vs 15278 — not an error, both genuinely exist)
- Additional findings not in external report: 7 items
  - Defined but unmentioned: 5 (11018, 15239, 11013/GoTo, 15210, 15296)
  - Newly discovered undefined: 3 (paramId cat2/idx16, mode=11, CMD 16702)

The additional findings are concentrated in C10's GoTo + calibration flow, which the external analysis did not cover.
