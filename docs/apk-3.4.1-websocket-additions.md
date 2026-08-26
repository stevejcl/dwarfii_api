# DWARFLAB 3.4.1 WebSocket Additions

This appendix records commands recovered from the DWARFLAB 3.4.1 Android app
which were absent from this repository's command enum before the APK audit.

## Evidence levels

- **Registry-confirmed** means the numeric command/name pair is present in the
  app's `WsCmd` registry. It proves app awareness, not firmware or model support.
- **Builder-recovered** means the app also contains a request wrapper which
  constructs the named protobuf payload. These payloads are available through
  `cmdMapping`.
- **Hardware-verified** requires an observed DWARF WebSocket exchange. None of
  these additions should be treated as hardware-verified yet.

The complete numeric registry is represented by `DwarfCMD` in
`src/proto/protocol.proto`. Newly covered command groups are:

The current extractor also handles enum ordinals which R8/JADX replaced with
symbolic Android-library constants. That recovered 42 registrations skipped by
the earlier audit and established a complete total of 356 commands. Seventeen
previously absent numeric IDs were added to `DwarfCMD`, including wide/guide
focus, panorama framing/upload, system activation/status, wide-camera controls,
and sentry scene selection.

| Range | Area | Newly represented IDs |
|---|---|---|
| 10043-10051 | Tele ISP, resolution, frame rate, crop, preview, ND | 10043-10049, 10051 |
| 11029-11050 | AI enhance, mosaic, restack, fast stop, one-click shooting, calibration frames, attitude | 11029-11032, 11035, 11037-11038, 11042, 11044, 11049-11050 |
| 12029 | Wide RAW photo | 12029 |
| 13006-13008 | Activation/factory operations | 13006-13008 |
| 14012-14016 | Attitude and level calibration | 14012-14016 |
| 14812 | Click tracking | 14812 |
| 15012-15031 | Tele, wide, and guide focus | 15012, 15015-15016, 15018-15020, 15027-15031 |
| 15253-15305 | Notifications | 15253-15254, 15258-15260, 15263, 15265-15266, 15268-15269, 15271-15272, 15277, 15279, 15281-15284, 15289, 15293-15295, 15300-15305 |
| 15505-15513 | Panorama upload, compression, and framing | 15505-15513 |
| 15700 | iTips | 15700 |
| 16100-16108 | Shooting schedules | 16100-16101, 16103, 16105-16108 |
| 16400-16406 | Global task/voice assistant | 16400-16401, 16406 |
| 16704-16705 | General parameters | 16704-16705 |
| 16800 | Voice assistant | 16800 |
| 16900-16903 | Guide camera exposure/gain | 16900-16903 |
| 17000-17002 | Lens defog, auto cooling, auto shutdown | 17000-17002 |

## Builder-recovered request payloads

| Command | Protobuf message | Fields |
|---|---|---|
| 11042 | `ReqOneClickShooting` | optional `goto_dso` (1), optional `shooting_param` (2) |
| 11044 | `ReqDelCaliFrameList` | repeated `info_ids` (1) |
| 14014 | `ReqMotorLevelCalibrationMove` | `direction` (1): CW=0, CCW=1 |
| 14015 | `ReqMotorLevelCalibrationSave` | empty |
| 14016 | `ReqMotorLevelCalibrationResetDefault` | empty |
| 15506 | `ReqGetUploadPredict` | `panorama_name` (1) |
| 15507 | `ReqCompressPanorama` | `panorama_name` (1) |
| 15508 | `ReqStopCompressPanorama` | empty |
| 16705 | `ReqSetGeneralBoolParams` | `param_id` (1), `value` (2) |
| 16800 | `ReqVoiceCommand` | `command_type` (1); recovered app request uses `VOICE_CMD_GET_STATUS` |
| 17000 | `ReqLensDefog` | `state` (1), 0=off and 1=on |
| 17001 | `ReqAutoCooling` | `state` (1), 0=off and 1=on |
| 17002 | `ReqAutoShutdown` | `state` (1), 0=off and 1=on |

The names for 17000 and 17002 were symbolic in the decompiled enum. Their
numeric values resolve to 17000 and 17002 through constants embedded by the app.

## Known collision

Command 10050 has conflicting evidence:

- packet-capture work identifies it as `CMD_V3_CAMERA_TELE_OPEN_CAMERA`;
- the DWARFLAB 3.4.1 registry names it `CMD_CAMERA_TELE_SET_PREVIEW_QUALITY`.

The existing enum name is retained to avoid a duplicate numeric protobuf enum
entry. Consumers must select semantics based on target firmware and observed
payload; the APK registry alone does not settle the collision.

APK 3.4.1 also assigns both panorama upload progress and panorama upload
completion to numeric command 15245. `DwarfCMD` preserves both names with
`allow_alias`; `notifyMapping` deliberately does not guess which of the two
protobuf payloads is present. Command 15246 is not registered by this APK.

## Safe usage

Only builder-recovered commands have been added to `cmdMapping`. Registry-only
commands intentionally have no guessed protobuf mapping. Record a request and
response from the target device before depending on any registry-only command
or notification schema.
