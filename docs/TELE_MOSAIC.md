# Direct Tele Mosaic protocol

Tele Mosaic is an Astro-module capture workflow. It is separate from the
Panorama module and does not use any `15500–155xx` command.

## Start command

`CMD 11031 — CMD_ASTRO_START_TELE_MOSAIC`

- Module: `MODULE_ASTRO` (`3`)
- Message type: `TYPE_REQUEST`
- Protobuf: `ReqStartMosaic`
- JavaScript: `messageStartTeleMosaic(horizontalScale, verticalScale,
  rotation, irIndex, forceStart = false)`

```proto
message ReqStartMosaic {
    int32 horizontal_scale = 1;
    int32 vertical_scale = 2;
    int32 rotation = 3;
    int32 ir_index = 4;
    bool force_start = 5;
}
```

Example:

```js
import { messageStartTeleMosaic } from "dwarfii_api";

// 1.4× horizontal by 1.2× vertical, the app's normal rotation sentinel,
// Astro filter, and no forced start.
const packet = messageStartTeleMosaic(140, 120, -1, 1, false);
```

The APK represents each scale as a fixed-point value divided by 100. Its
current scale picker contains `100, 110, …, 180`, displayed as `1.0×` through
`1.8×`. `100 × 100` is the unscaled single field, so the app starts Mosaic
only when at least one axis differs from 100. These are observed app semantics,
not client-side validation rules; the API passes the integer values through.

The direct-capture path in APK 3.4.1 sends `rotation = -1`. Elsewhere the APK's
atlas model represents a selected rotation in degrees from -90 to +90 and has
a `degrees × 100` protocol conversion, but the direct `WsStartMosaicReq` call
does not use that converted value. Firmware behavior for other rotation values
therefore remains hardware-unverified.

`ir_index` is populated from the same selected Tele filter index used for
normal astronomy stacking. `force_start` has the same recoverable-warning
intent as the live-stacking start flow.

## Progress notification

`CMD 15263 — CMD_NOTIFY_PROGRESS_CAPTURE_MOSAIC`

- Message type: `TYPE_NOTIFICATION`
- Protobuf: `ProgressCaptureMosaic`

```proto
message ProgressCaptureMosaic {
    int32 total_count = 1;
    int32 update_type = 2;
    int32 current_count = 3;
    int32 stacked_count = 4;
    int32 exp_index = 5;
    int32 gain_index = 6;
    string target_name = 7;
    int32 horizontal_scale = 8;
    int32 vertical_scale = 9;
    int32 rotation = 10;
    int32 fov_id = 11;
    int32 fov_total = 12;
}
```

The most useful progress pairs are `fovId / fovTotal` and
`currentCount / totalCount`; `stackedCount` reports accepted stacked frames.
The official app associates this progress only with the Tele camera and only
while its capture state is a raw-taking/raw-stopping state.

Do not treat the last `15263` message as the only capture-completion signal.
APK 3.4.1 also observes the normal Tele raw-live-stacking state notification
`15208` (`CaptureRawState`) and clears progress when capture state ends.

## Complete operating sequence

A cold session normally follows this sequence:

```text
16404  switch into Astro mode
10050  open Tele camera
12036  open Wide camera
15004  run Astro autofocus and wait for 15278/15280 completion
11013  run one-click DSO GoTo
       wait for calibration, GoTo, and tracking state notifications
11031  start direct Tele Mosaic
15208  observe raw capture state
15263  consume Mosaic progress
```

If the device is already focused, calibrated, centered, and tracking, the
Mosaic-specific part begins at `11031`.

## Stop and cancel behavior

There is no dedicated Mosaic-stop command in the recovered registry. APK 3.4.1
uses the existing Tele raw-live-stacking stop request `11006` for a normal stop
and `11037` for its fast-stop path. The existing
`messageAstroStopCaptureRawLiveStacking()` helper creates `11006`.

`11032` is `CMD_ASTRO_CHECK_IF_RESTACKABLE`; it is not a Mosaic stop command.
The request protobuf for `11032` remains unresolved and is intentionally not
guessed here.

## Evidence and remaining validation

The schemas and command bindings come from the embedded APK 3.4.1 descriptors,
`WsStartMosaicReq`, `CaptureViewModel`, and `CaptureProgressWsResp`. Live
hardware validation is still needed for accepted rotation values, scale values
outside the app's 100–180 picker, the exact `update_type` enum meanings, and
the final progress/state ordering on each DWARF firmware version.
