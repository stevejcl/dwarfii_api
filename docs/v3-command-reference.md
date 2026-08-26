# DWARF V3 Command Reference

Complete listing of all known command IDs with pcap observation data.

Sources:
- `dwarfii_api/src/proto/protocol.proto` — protobuf enum definitions
- `dwarfii_api/src/cmd_mapping.js` — CMD → protobuf class mappings
- 15 pcap captures decoded with `tools/v3-probe/pcap-decode.js`
- DWARFLAB 3.4.1 APK audit; see [APK 3.4.1 WebSocket additions](apk-3.4.1-websocket-additions.md)

---

## Capture Index

Shorthand labels used in the "pcap" columns throughout this document.

| # | Label | Description | Packets |
|---|-------|-------------|---------|
| C1 | iphone | Joystick, preset retrieval | 133 |
| C2 | iphone2 | Joystick, GoTo, astro session, media save | 653 |
| C3 | photo | Stacking capture | 66 |
| C4 | modes | Mode switching, photo/video/timelapse/wide | 294 |
| C5 | full | Connect → LED → AF → GoTo → astro params | 312 |
| C6 | motor | Joystick, manual focus, GoTo | 436 |
| C7 | stream | Connect → camera open → stream start | 57 |
| C8 | cam-ops | Photo, burst, record, timelapse, filter | 332 |
| C9 | filter | Filter wheel operation | 79 |
| C10 | full-astro | Connect → filter → focus → GoTo → astro (60s) | 668 |
| C11 | led-focus | LED, focus ×6, astro (30s) ×2 | — |
| C12 | mount | Joystick control | — |
| C13 | media | Media save / gallery | — |

C1–C10: locally decoded. C11–C13: referenced from external analysis (not locally available).

---

## Modules

| ID | Name | CMD Range | Purpose |
|----|------|-----------|---------|
| 0 | MODULE_NONE | — | Unused |
| 1 | MODULE_CAMERA_TELE | 10000–10099 | Tele camera control |
| 2 | MODULE_CAMERA_WIDE | 12000–12099 | Wide camera control |
| 3 | MODULE_ASTRO | 11000–11099 | Astro / GoTo / stacking |
| 4 | MODULE_SYSTEM | 13000–13099 | System settings (time, GPS) |
| 5 | MODULE_RGB_POWER | 13500–13599 | LED / power management |
| 6 | MODULE_MOTOR | 14000–14099 | Motor / joystick |
| 7 | MODULE_TRACK | 14800–14899 | Tracking / sentry mode |
| 8 | MODULE_FOCUS | 15000–15099 | Focus control |
| 9 | MODULE_NOTIFY | 15200–15499 | Notifications (device → app) |
| 10 | MODULE_PANORAMA | 15500–15599 | Panorama |
| 13 | MODULE_SHOOTING_SCHEDULE | 16100–16199 | Shooting schedule |
| 14 | MODULE_DEVICE_CONFIG | 16400–16499 | Device config / mode switching |
| 15 | MODULE_CAMERA_PARAMS | 16700–16799 | V3 camera parameters |

---

## Message Types

| ID | Name | Display |
|----|------|---------|
| 0 | TYPE_REQUEST | `[REQ]` |
| 1 | TYPE_REQUEST_RESPONSE | `[NRESP]` |
| 2 | TYPE_NOTIFICATION | `[NOTIFY]` |
| 3 | TYPE_NOTIFICATION_RESPONSE | — |

---

## Module 1: Tele Camera (MODULE_CAMERA_TELE)

### V2 Commands (10000–10042)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 10000 | CMD_CAMERA_TELE_OPEN_CAMERA | Open camera (V2) | — |
| 10001 | CMD_CAMERA_TELE_CLOSE_CAMERA | Close camera (V2) | — |
| 10002 | CMD_CAMERA_TELE_PHOTOGRAPH | Take photo | C8 ×2 |
| 10003 | CMD_CAMERA_TELE_BURST | Start burst | — |
| 10004 | CMD_CAMERA_TELE_STOP_BURST | Stop burst | — |
| 10005 | CMD_CAMERA_TELE_START_RECORD | Start recording | — |
| 10006 | CMD_CAMERA_TELE_STOP_RECORD | Stop recording | — |
| 10007 | CMD_CAMERA_TELE_SET_EXP_MODE | Set exposure mode | — |
| 10008 | CMD_CAMERA_TELE_GET_EXP_MODE | Get exposure mode | — |
| 10009 | CMD_CAMERA_TELE_SET_EXP | Set exposure | — |
| 10010 | CMD_CAMERA_TELE_GET_EXP | Get exposure | — |
| 10011 | CMD_CAMERA_TELE_SET_GAIN_MODE | Set gain mode | — |
| 10012 | CMD_CAMERA_TELE_GET_GAIN_MODE | Get gain mode | — |
| 10013 | CMD_CAMERA_TELE_SET_GAIN | Set gain | — |
| 10014 | CMD_CAMERA_TELE_GET_GAIN | Get gain | — |
| 10015 | CMD_CAMERA_TELE_SET_BRIGHTNESS | Set brightness | — |
| 10016 | CMD_CAMERA_TELE_GET_BRIGHTNESS | Get brightness | — |
| 10017 | CMD_CAMERA_TELE_SET_CONTRAST | Set contrast | — |
| 10018 | CMD_CAMERA_TELE_GET_CONTRAST | Get contrast | — |
| 10019 | CMD_CAMERA_TELE_SET_SATURATION | Set saturation | — |
| 10020 | CMD_CAMERA_TELE_GET_SATURATION | Get saturation | — |
| 10021 | CMD_CAMERA_TELE_SET_HUE | Set hue | — |
| 10022 | CMD_CAMERA_TELE_GET_HUE | Get hue | — |
| 10023 | CMD_CAMERA_TELE_SET_SHARPNESS | Set sharpness | — |
| 10024 | CMD_CAMERA_TELE_GET_SHARPNESS | Get sharpness | — |
| 10025 | CMD_CAMERA_TELE_SET_WB_MODE | Set WB mode | — |
| 10026 | CMD_CAMERA_TELE_GET_WB_MODE | Get WB mode | — |
| 10027 | CMD_CAMERA_TELE_SET_WB_SCENE | Set WB scene | — |
| 10028 | CMD_CAMERA_TELE_GET_WB_SCENE | Get WB scene | — |
| 10029 | CMD_CAMERA_TELE_SET_WB_CT | Set WB color temp | — |
| 10030 | CMD_CAMERA_TELE_GET_WB_CT | Get WB color temp | — |
| 10031 | CMD_CAMERA_TELE_SET_IRCUT | Set IR cut | — |
| 10032 | CMD_CAMERA_TELE_GET_IRCUT | Get IR cut | — |
| 10033 | CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO | Start timelapse | — |
| 10034 | CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO | Stop timelapse | — |
| 10035 | CMD_CAMERA_TELE_SET_ALL_PARAMS | Set all params | — |
| 10036 | CMD_CAMERA_TELE_GET_ALL_PARAMS | Get all params | — |
| 10037 | CMD_CAMERA_TELE_SET_FEATURE_PARAM | Set feature param | — |
| 10038 | CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS | Get all feature params | — |
| 10039 | CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE | Get working state | — |
| 10040 | CMD_CAMERA_TELE_SET_JPG_QUALITY | Set JPG quality | — |
| 10041 | CMD_CAMERA_TELE_PHOTO_RAW | RAW photo | — |
| 10042 | CMD_CAMERA_TELE_SET_RTSP_BITRATE_TYPE | Set RTSP bitrate | — |

### V3 Commands

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 10050 | CMD_V3_CAMERA_TELE_OPEN_CAMERA | Open/close tele camera (V3). action=1 opens. | C1–C10 |

---

## Module 2: Wide Camera (MODULE_CAMERA_WIDE)

### V2 Commands (12000–12031)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 12000 | CMD_CAMERA_WIDE_OPEN_CAMERA | Open camera (V2) | — |
| 12001 | CMD_CAMERA_WIDE_CLOSE_CAMERA | Close camera (V2) | — |
| 12002–12021 | (SET/GET series) | Exposure, gain, brightness, etc. | — |
| 12022 | CMD_CAMERA_WIDE_PHOTOGRAPH | Take photo | C4 C8 |
| 12023 | CMD_CAMERA_WIDE_BURST | Start burst | C4 C8 |
| 12024 | CMD_CAMERA_WIDE_STOP_BURST | Stop burst | C4 C8 |
| 12025 | CMD_CAMERA_WIDE_START_TIMELAPSE_PHOTO | Start timelapse | C4 C8 |
| 12026 | CMD_CAMERA_WIDE_STOP_TIMELAPSE_PHOTO | Stop timelapse | C4 C8 |
| 12027 | CMD_CAMERA_WIDE_GET_ALL_PARAMS | Get all params | — |
| 12028 | CMD_CAMERA_WIDE_SET_ALL_PARAMS | Set all params | — |
| 12030 | CMD_CAMERA_WIDE_START_RECORD | Start recording | C4 C8 |
| 12031 | CMD_CAMERA_WIDE_STOP_RECORD | Stop recording | C4 C8 |

### V3 Commands

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 12036 | CMD_V3_CAMERA_WIDE_OPEN_CAMERA | Open/close wide camera (V3). No action=open, action=1=close (reversed). | C1–C10 |

---

## Module 3: Astro (MODULE_ASTRO)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 11000 | CMD_ASTRO_START_CALIBRATION | Start calibration; `ReqStartCalibration { lon=1, lat=2 }` in decimal degrees | C2 C10; APK 3.4.1 |
| 11001 | CMD_ASTRO_STOP_CALIBRATION | Stop calibration | C2 C5 C6 C8 |
| 11002 | CMD_ASTRO_START_GOTO_DSO | GoTo DSO (V2) | C10 |
| 11003 | CMD_ASTRO_START_GOTO_SOLAR_SYSTEM | GoTo solar system (V2) | C2 |
| 11004 | CMD_ASTRO_STOP_GOTO | Stop GoTo (V2) | — |
| 11005 | CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING | Start stacking. DWARF 3/mini use `{ir_index, force_start}`; filterless DWARF 2 uses `08 ff..ff 01` (`ir_index=-1`) sentinel. APK 3.4.1 defines `-11530` as a dark-temperature mismatch. DWARF 2/older protocols continue with `force_start=true`. | C2 C3 C10; APK 3.4.1; D3 live |
| 11050 | CMD_ASTRO_CONTINUE_SHOOTING | Empty `ReqContinueShooting`; APK 3.4.1 uses this on protocol >=2.5, except DWARF 2, after the user accepts a missing/temperature-mismatched dark warning. | APK 3.4.1 |
| 11006 | CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING | Stop stacking | C2 C3 |
| 11007 | CMD_ASTRO_START_CAPTURE_RAW_DARK | Start dark capture | — |
| 11008 | CMD_ASTRO_STOP_CAPTURE_RAW_DARK | Stop dark capture | — |
| 11009 | CMD_ASTRO_CHECK_GOT_DARK | Check dark frame | — |
| 11010 | CMD_ASTRO_GO_LIVE | Go live | C2 C3 C10 |
| 11011 | CMD_ASTRO_START_TRACK_SPECIAL_TARGET | Start sun/moon tracking | — |
| 11012 | CMD_ASTRO_STOP_TRACK_SPECIAL_TARGET | Stop sun/moon tracking | — |
| 11013 | CMD_ASTRO_START_ONE_CLICK_GOTO_DSO | One-click calibration + DSO GoTo. Fields: RA hours=1, Dec=2, target=3, lon=4, lat=5, shooting_mode=6, goto_only=7, optional rotation=8. The Atlas workflow uses mode 2 and goto_only=false. | C2 C5 C6 C8 C10 |
| 11014 | CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM | One-click GoTo solar system | C2 |
| 11015 | CMD_ASTRO_STOP_ONE_CLICK_GOTO | Stop one-click GoTo | C2 C5 C6 C8 C10 |
| 11016 | CMD_ASTRO_START_WIDE_CAPTURE_LIVE_STACKING | Start wide stacking | — |
| 11017 | CMD_ASTRO_STOP_WIDE_CAPTURE_LIVE_STACKING | Stop wide stacking | — |
| 11018 | CMD_ASTRO_START_EQ_SOLVING | Start EQ solving. Args: double×2 (coordinates). | C10 |
| 11019 | CMD_ASTRO_STOP_EQ_SOLVING | Stop EQ solving | — |
| 11020 | CMD_ASTRO_WIDE_GO_LIVE | Wide go live | — |
| 11021–11028 | (Dark frame management) | Dark capture with params, delete | — |
| 11033 | CMD_V3_ASTRO_SAVE_STACKED_IMAGE | Save stacked image (V3). Args: path string. | C2 C13 |
| 11034 | CMD_V3_ASTRO_LIST_SAVED_IMAGES | List saved images (V3) | C2 C13 |
| 11036 | CMD_V3_ASTRO_SAVE_COMPLETE | Save complete (V3) | C2 C3 |
| 11039 | CMD_V3_ASTRO_STATUS_POLLING | Status polling (V3). Args: field1=-1, field2=100, field3=100, field4=-1. | C1 C3 C5 C9 C10 |
| 11040 | CMD_V3_ASTRO_GET_PARAMS | Get astro params (V3). Args: mode=1. | C1–C10 |
| 11041 | CMD_V3_ASTRO_SET_PARAMS | Set astro params (V3). Args: pipe-delimited string e.g. `"0\|0\|60\|60\|1\|null"`. | C5 C10 |
| 11043 | CMD_V3_ASTRO_GET_PRESETS | Provisional decoder name; APK 3.4.1 names this GET_CALI_FRAME_LIST | C1–C8 |
| 11045 | CMD_V3_ASTRO_START_CAPTURE_CALI_FRAME | Start calibration frame; fields: exposure, gain, resolution, count, camera, calibration type, optional filter, scene | APK 3.4.1 |
| 11046 | CMD_V3_ASTRO_STOP_CAPTURE_CALI_FRAME | Stop calibration-frame capture for camera type | APK 3.4.1 |
| 11047 | CMD_V3_ASTRO_SET_LOCATION | Set observation location (V3). Args: lon, lat. | C4 C10 |
| 11048 | CMD_V3_ASTRO_CONFIRM | Confirm observation (V3). Called after 11047. | C4 C10 |

---

## Module 4: System (MODULE_SYSTEM)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 13000 | CMD_SYSTEM_SET_TIME | Set system time | C1 C2 C4 C7 C9 C10 |
| 13001 | CMD_SYSTEM_SET_TIME_ZONE | Set timezone | C1 C2 C4 C7 C9 C10 |
| 13002 | CMD_SYSTEM_SET_MTP_MODE | Set MTP mode | — |
| 13003 | CMD_SYSTEM_SET_CPU_MODE | Set CPU mode | — |
| 13004 | CMD_SYSTEM_SET_MASTERLOCK | Set master/slave | — |
| 13010 | CMD_V3_SYSTEM_SET_GPS_LOCATION | Set GPS location (V3). Args: lat, lon, alt, locationName. | C1 C2 C4 C5 C7 C9 C10 |

---

## Module 5: LED / Power (MODULE_RGB_POWER)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 13500 | CMD_RGB_POWER_OPEN_RGB | Ring light ON | C5 C11 |
| 13501 | CMD_RGB_POWER_CLOSE_RGB | Ring light OFF | C5 C11 |
| 13502 | CMD_RGB_POWER_POWER_DOWN | Shutdown | — |
| 13503 | CMD_RGB_POWER_POWERIND_ON | Power indicator ON | C5 C11 |
| 13504 | CMD_RGB_POWER_POWERIND_OFF | Power indicator OFF | C5 C11 |
| 13505 | CMD_RGB_POWER_REBOOT | Reboot | — |

---

## Module 6: Motor (MODULE_MOTOR)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 14000 | CMD_STEP_MOTOR_RUN | Run motor | — |
| 14001 | CMD_STEP_MOTOR_RUN_TO | Run motor to position | — |
| 14002 | CMD_STEP_MOTOR_STOP | Stop motor | — |
| 14003 | CMD_STEP_MOTOR_RESET | Reset motor | — |
| 14004 | CMD_STEP_MOTOR_CHANGE_SPEED | Change speed | — |
| 14005 | CMD_STEP_MOTOR_CHANGE_DIRECTION | Change direction | — |
| 14006 | CMD_STEP_MOTOR_SERVICE_JOYSTICK | Joystick control. Args: double×2 (angle 0–360°, speed 0–1). | C1 C2 C6 C12(×780) |
| 14007 | CMD_STEP_MOTOR_SERVICE_JOYSTICK_FIXED_ANGLE | Joystick fixed angle | — |
| 14008 | CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP | Joystick stop | C1 C2 C6 C12(×6) |
| 14009 | CMD_STEP_MOTOR_SERVICE_DUAL_CAMERA_LINKAGE | Dual camera linkage | — |
| 14010 | CMD_STEP_MOTOR_RUN_IN_PULSE | Pulse motor run | — |
| 14011 | CMD_STEP_MOTOR_GET_POSITION | Get position | — |

---

## Module 7: Tracking (MODULE_TRACK)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 14800 | CMD_TRACK_START_TRACK | Start tracking | — |
| 14801 | CMD_TRACK_STOP_TRACK | Stop tracking | — |
| 14802 | CMD_SENTRY_MODE_START | Start sentry mode | — |
| 14803 | CMD_SENTRY_MODE_STOP | Stop sentry mode | — |
| 14804 | CMD_MOT_START | Start MOT (multi-object tracking) | — |
| 14805 | CMD_MOT_TRACK_ONE | MOT track one (tele) | — |
| 14806 | CMD_UFOTRACK_MODE_START | Start UFO tracking mode | — |
| 14807 | CMD_UFOTRACK_MODE_STOP | Stop UFO tracking mode | — |
| 14808 | CMD_MOT_WIDE_TRACK_ONE | MOT track one (wide) | — |
| 14809 | CMD_WIDE_TELE_TRACK_SWITCH | Wide/tele switch | — |
| 14810 | CMD_UFO_HAND_AOTO_MODE | UFO manual/auto mode | — |

---

## Module 8: Focus (MODULE_FOCUS)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 15000 | CMD_FOCUS_AUTO_FOCUS | Auto focus | C5 |
| 15001 | CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS | Manual single-step focus. No arg=forward, `08 01`=backward. | C5 C6 C10 |
| 15002 | CMD_FOCUS_START_MANUAL_CONTINU_FOCUS | Start manual continuous focus | C6 |
| 15003 | CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS | Stop manual continuous focus | C6 |
| 15004 | CMD_FOCUS_START_ASTRO_AUTO_FOCUS | Start astro auto focus | C2 C5 C10 |
| 15005 | CMD_FOCUS_STOP_ASTRO_AUTO_FOCUS | Stop astro auto focus | — |
| 15011 | CMD_V3_FOCUS_INIT | Focus init (V3) | C1 C2 C5 C7 C9 C10 |

---

## Module 9: Notifications (MODULE_NOTIFY)

Device-to-app one-way notifications. Displayed as `[NOTIFY]` in pcap output.

### Defined Notifications (with protobuf mapping)

| CMD | Enum | Protobuf Class | Description | Observed |
|-----|------|----------------|-------------|----------|
| 15200 | CMD_NOTIFY_TELE_WIDI_PICTURE_MATCHING | ResNotifyPictureMatching | Tele/wide picture matching | — |
| 15201 | CMD_NOTIFY_ELE | ComResWithInt | Battery level | C1–C10 |
| 15202 | CMD_NOTIFY_CHARGE | ComResWithInt | Charge state | C1 C2 C4 C7 C9 C10 |
| 15203 | CMD_NOTIFY_SDCARD_INFO | ResNotifySDcardInfo | SD card capacity (available/total GB) | C2–C10 |
| 15204 | CMD_NOTIFY_TELE_RECORD_TIME | ResNotifyRecordTime | Record time (tele) | — |
| 15205 | CMD_NOTIFY_TELE_TIMELAPSE_OUT_TIME | ResNotifyTimeLapseOutTime | Timelapse time (tele) | — |
| 15206 | CMD_NOTIFY_STATE_CAPTURE_RAW_DARK | ResNotifyOperationState | Dark capture state | — |
| 15207 | CMD_NOTIFY_PROGRASS_CAPTURE_RAW_DARK | ResNotifyProgressCaptureRawDark | Dark capture progress | — |
| 15208 | CMD_NOTIFY_STATE_CAPTURE_RAW_LIVE_STACKING | ResNotifyOperationState | Stacking state | C2 C3 C10 |
| 15209 | CMD_NOTIFY_PROGRASS_CAPTURE_RAW_LIVE_STACKING | ResNotifyProgressCaptureRawLiveStacking | Stacking progress (totalCount, currentCount, stackedCount, targetName) | C2 C3 C10 |
| 15210 | CMD_NOTIFY_STATE_ASTRO_CALIBRATION | ResNotifyStateAstroCalibration | Calibration state | C2 C5 C6 C8 C10 |
| 15211 | CMD_NOTIFY_STATE_ASTRO_GOTO | ResNotifyStateAstroGoto | GoTo state | — |
| 15212 | CMD_NOTIFY_STATE_ASTRO_TRACKING | ResNotifyStateAstroTracking | Tracking state | — |
| 15213 | CMD_NOTIFY_TELE_SET_PARAM | ResNotifyParam | Param echo (tele) | — |
| 15214 | CMD_NOTIFY_WIDE_SET_PARAM | ResNotifyParam | Param echo (wide) | — |
| 15215 | CMD_NOTIFY_TELE_FUNCTION_STATE | ResNotifyCamFunctionState | Function state (tele) | — |
| 15216 | CMD_NOTIFY_WIDE_FUNCTION_STATE | ResNotifyCamFunctionState | Function state (wide) | — |
| 15217 | CMD_NOTIFY_SET_FEATURE_PARAM | ResNotifyParam | Feature param echo | — |
| 15218 | CMD_NOTIFY_TELE_BURST_PROGRESS | ResNotifyBurstProgress | Burst progress (tele) | — |
| 15219 | CMD_NOTIFY_PANORAMA_PROGRESS | ResNotifyPanoramaProgress | Panorama progress | — |
| 15220 | CMD_NOTIFY_WIDE_BURST_PROGRESS | ResNotifyBurstProgress | Burst progress (wide) | — |
| 15221 | CMD_NOTIFY_RGB_STATE | ResNotifyRgbState | Ring light state | C5 C11 |
| 15222 | CMD_NOTIFY_POWER_IND_STATE | ResNotifyPowerIndState | Power indicator state | C5 C11 |
| 15223 | CMD_NOTIFY_WS_HOST_SLAVE_MODE | ResNotifyHostSlaveMode | Master/slave notification | — |
| 15224 | CMD_NOTIFY_MTP_STATE | ResNotifyMTPState | MTP state | — |
| 15225 | CMD_NOTIFY_TRACK_RESULT | ResNotifyTrackResult | Tracking result | — |
| 15226 | CMD_NOTIFY_WIDE_TIMELAPSE_OUT_TIME | ResNotifyTimeLapseOutTime | Timelapse time (wide) | — |
| 15227 | CMD_NOTIFY_CPU_MODE | ResNotifyCPUMode | CPU mode | — |
| 15228 | CMD_NOTIFY_STATE_ASTRO_TRACKING_SPECIAL | ResNotifyStateAstroTrackingSpecial | Sun/moon tracking state | — |
| 15229 | CMD_NOTIFY_POWER_OFF | ResNotifyPowerOff | Shutdown notification | — |
| 15230 | CMD_NOTIFY_ALBUM_UPDATE | ResNotifyAlbumUpdate | Media update notification | — |
| 15231 | CMD_NOTIFY_SENTRY_MODE_STATE | ResNotifyStateSentryMode | Sentry mode state | — |
| 15232 | CMD_NOTIFY_SENTRY_MODE_TRACK_RESULT | ResNotifyTrackResult | Sentry tracking result | — |
| 15233 | CMD_NOTIFY_STATE_ASTRO_ONE_CLICK_GOTO | ResNotifyOneClickGotoState | One-click GoTo state | C2 C5 C6 C8 C10 |
| 15234 | CMD_NOTIFY_STREAM_TYPE | ResNotifyStreamType | Stream type (streamType, camId) | C2–C8 C10 |
| 15235 | CMD_NOTIFY_WIDE_RECORD_TIME | ResNotifyRecordTime | Record time (wide) | — |
| 15236 | CMD_NOTIFY_STATE_WIDE_CAPTURE_RAW_LIVE_STACKING | ResNotifyOperationState | Wide stacking state | — |
| 15237 | CMD_NOTIFY_PROGRASS_WIDE_CAPTURE_RAW_LIVE_STACKING | ResNotifyProgressCaptureRawLiveStacking | Wide stacking progress | — |
| 15238 | CMD_NOTIFY_MULTI_TRACK_RESULT | ResNotifyMultiTrackResult | Multi-object tracking result | — |
| 15239 | CMD_NOTIFY_EQ_SOLVING_STATE | ResNotifyEqSolvingState | EQ solving state. Values: `1→3`. | C10 |
| 15240 | CMD_NOTIFY_UFO_MODE_STATE | ResNotifyStateSentryMode | UFO mode state | — |
| 15241 | CMD_NOTIFY_TELE_LONG_EXP_PROGRESS | ResNotifyLongExpPhotoProgress | Long exposure progress (tele) | — |
| 15242 | CMD_NOTIFY_WIDE_LONG_EXP_PROGRESS | ResNotifyLongExpPhotoProgress | Long exposure progress (wide) | — |
| 15243 | CMD_NOTIFY_TEMPERATURE | ResNotifyTemperature | Temperature (°C) | C2–C10 |
| 15244 | CMD_NOTIFY_PANORAMA_UPLOAD_COMPRESS_PROGRESS | (unmapped) | Panorama compress progress | — |
| 15245 | CMD_NOTIFY_PANORAMA_UPLOAD_UPLOAD_PROGRESS | (unmapped) | Panorama upload progress | — |
| 15246 | CMD_NOTIFY_PANORAMA_UPLOAD_COMPLETE | (unmapped) | Panorama upload complete | — |
| 15247 | CMD_NOTIFY_STATE_CAPTURE_WIDE_RAW_DARK | ResNotifyOperationState | Wide dark capture state | — |
| 15248 | CMD_NOTIFY_SHOOTING_SCHEDULE_RESULT_AND_STATE | ResNotifyShootingScheduleResultAndState | Shooting schedule result | — |
| 15249 | CMD_NOTIFY_SHOOTING_TASK_STATE | ResNotifyShootingTaskState | Shooting task state | — |
| 15250 | CMD_NOTIFY_SKY_SEACHER_STATE | ResNotifySkySeacherState | Sky searcher state | — |
| 15251 | CMD_NOTIFY_WIDE_MULTI_TRACK_RESULT | (unmapped) | Wide multi-object tracking result | — |
| 15252 | CMD_NOTIFY_WIDE_TRACK_RESULT | (unmapped) | Wide tracking result | — |
| 15255 | CMD_V3_NOTIFY_EXPOSURE_PROGRESS | V3ResNotifyExposureProgress | Exposure progress (V3). elapsed/total in seconds. | C2 C3 C10 |
| 15256 | CMD_NOTIFY_CALIBRATION_RESULT | CalibrationResult | Successful V3 mount calibration; solved azimuth and altitude | C10; APK 3.4.1 descriptor |
| 15257 | CMD_NOTIFY_FOCUS | ResNotifyFocus | Focus position | C2 C4–C6 C8 C10 |
| 15261 | CMD_V3_NOTIFY_DEVICE_STATE | V3ResNotifyDeviceState | Device state (V3) | C1 C2 C4 C7 |
| 15264 | CMD_V3_NOTIFY_CAMERA_PARAM_STATE | V3ResNotifyCameraParamState | Camera param state (V3). paramId + value. | C1–C10 |
| 15267 | CMD_V3_NOTIFY_MODE_CHANGE | V3ResNotifyModeChange | Mode change (V3). mode/subMode/changing. | C1–C10 |
| 15270 | CMD_V3_NOTIFY_STACKING_DATA | V3ResNotifyStackingData | Stacking data (V3). colorTemperature/camera. | C2–C8 C10 |
| 15273 | CMD_V3_NOTIFY_PHOTO_STATE | V3ResNotifyPhotoState | Photo state (V3) | C4 C8 |
| 15274 | CMD_V3_NOTIFY_BURST_STATE | V3ResNotifyBurstState | Burst state (V3) | C4 C8 |
| 15275 | CMD_V3_NOTIFY_VIDEO_STATE | V3ResNotifyVideoState | Video state (V3) | C4 C8 |
| 15276 | CMD_V3_NOTIFY_TIMELAPSE_STATE | V3ResNotifyTimelapseState | Timelapse state (V3) | C4 C8 |
| 15278 | CMD_V3_NOTIFY_AUTOFOCUS_STATE | V3ResNotifyAutoFocusState | AF state (V3). Values: `1→3`. | C2 C10 |
| 15280 | **(no protobuf def)** | — | AF state (alternate). Values: `1→3`. | C5 C11 |
| 15285 | CMD_V3_NOTIFY_PHOTO_BURST_PROGRESS | V3ResNotifyPhotoBurstProgress | Burst progress (V3) | C4 C8 |
| 15286 | CMD_V3_NOTIFY_VIDEO_PROGRESS | V3ResNotifyVideoProgress | Video progress (V3) | C4 C8 |
| 15287 | CMD_V3_NOTIFY_TIMELAPSE_PROGRESS | V3ResNotifyTimelapseProgress | Timelapse progress (V3) | C4 C8 |
| 15288 | **(no protobuf def)** | — | Exposure duration telemetry. Payload: fixed64/double (seconds). | C8 C10 C11 C13 |
| 15290 | CMD_V3_NOTIFY_CALI_FRAME_STATE | V3ResNotifyCaliFrameState | Calibration-frame state; state, camera type, calibration type | APK 3.4.1 |
| 15291 | CMD_V3_NOTIFY_CALI_FRAME_PROGRESS | V3ResNotifyCaliFrameProgress | Calibration-frame progress; progress, camera type, calibration type | APK 3.4.1 |
| 15292 | CMD_V3_NOTIFY_TEMPERATURE2 | V3ResNotifyTemperature2 | Temperature 2 (V3, °C). Paired with 15243. | C2–C10 |
| 15296 | CMD_V3_NOTIFY_OBSERVATION_STATE | V3ResNotifyObservationState | Observation state (V3). Values: `1→3`. | C4 C10 |

Recommended shared V3 mount-calibration sequence (DWARF 2, DWARF 3, and
DWARF mini): start astronomical autofocus with `15004` and wait for state `3`
on `15278` or `15280`; then issue `11000`, continue waiting across repeated
`15210` plate-solving attempts, and accept `15256` as successful completion.
Cloud cover can make the firmware perform multiple solve attempts, so clients
should use a multi-minute calibration timeout rather than treating the first
unsuccessful solve as terminal.

### Undefined Notifications (no protobuf definition, discovered from pcap)

| CMD | Payload | Observed |
|-----|---------|----------|
| 15262 | varint `08 01` — state latch, paired with 15256 | C10 |

Note: 15280 and 15288 are listed in the main table above.

---

## Module 10: Panorama (MODULE_PANORAMA)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 15500 | CMD_PANORAMA_START_GRID | Start panorama (grid) | — |
| 15501 | CMD_PANORAMA_STOP | Stop panorama | — |
| 15502 | CMD_PANORAMA_START_EULER_RANGE | Start panorama (euler range) | — |

---

## Module 13: Shooting Schedule (MODULE_SHOOTING_SCHEDULE)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 16102 | CMD_V3_SCHEDULE_GET | Get shooting schedule | C1 C2 C4 C7 C8 C9 C10 |

---

## Module 14: Device Config (MODULE_DEVICE_CONFIG)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 16402 | CMD_V3_DEVICE_CONFIG_MODE_QUERY | Query mode (V3) | C2 C4 C5 C8 C10 |
| 16403 | CMD_V3_DEVICE_CONFIG_SHOOTING_MODE | Switch shooting mode (V3). modeId: 1=photo, 2=astro. | C4 C8 C9 C10 |
| 16404 | CMD_V3_DEVICE_CONFIG_MODE_SWITCH | Mode switch (V3). inner.value=1 (preview mode). | C1 C2 C5 C7 |
| 16405 | CMD_V3_DEVICE_CONFIG_GET_CONFIG | Get device config (V3) | C1 C2 C4 C7 C10 |

---

## Module 15: V3 Camera Parameters (MODULE_CAMERA_PARAMS)

| CMD | Enum | Description | Observed |
|-----|------|-------------|----------|
| 16700 | CMD_V3_CAMERA_PARAMS_SET_PARAM | Set exposure parameter. APK `WsSetExposureParamReq` uses `ReqSetExposure {param_id, mode, value}`; value is a firmware exposure index. | C1 C5 C8; APK 3.4.1; Mini live |
| 16701 | CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN | Set gain parameter using the same wire schema; value is the selected gain. | C5 C8; APK 3.4.1; Mini live |
| 16702 | **(undefined)** | Unknown. Payload: paramId + field2 + field3 (optional). | C8 |
| 16703 | CMD_V3_CAMERA_PARAMS_ADJUST | Write/adjust parameter (filter wheel; absolute astronomy frame count) | C2 C4 C5 C8 C9 C10 |
| 16706 | CMD_V3_CAMERA_PARAMS_STREAM_CTRL | Stream control | C5 |

---

## ParamId Encoding (used in 16700/16701/16703)

64-bit compound ID:

```
bits 63..56 = shootingMode  (0=photo, 1=video, 2=astro)
bits 55..48 = category       (1=OPTICAL, 2=CAPTURE for verified frame count)
bits 47..16 = reserved (0)
bits 15..8  = cameraId       (0=tele, 1=wide)
bits  7..0  = paramIndex     (0x0D=filterWheel, 0x10=frameCount in category 2)
```

### ParamIds Observed in Captures

| paramId (decimal) | mode | cat | cam | idx | Context |
|-------------------|------|-----|-----|-----|---------|
| 281474976710669 | 0 (photo) | 1 | 0 (tele) | 13 (0x0D) | notifications |
| 144396663052566529 | 2 (astro) | 1 | 0 (tele) | 1 | Exposure; write with 16700. Live catalogue: 1s=120, 5s=141, 10s=150, 15s=156 |
| 144396663052566530 | 2 (astro) | 1 | 0 (tele) | 2 | Gain; write with 16701 |
| 144396663052566532 | 2 (astro) | 1 | 0 (tele) | 4 | notifications |
| 144396663052566533 | 2 (astro) | 1 | 0 (tele) | 5 | notifications |
| 144396663052566534 | 2 (astro) | 1 | 0 (tele) | 6 | notifications |
| 144396663052566535 | 2 (astro) | 1 | 0 (tele) | 7 | notifications |
| 144396663052566536 | 2 (astro) | 1 | 0 (tele) | 8 | notifications |
| 144396663052566541 | 2 (astro) | 1 | 0 (tele) | 13 (0x0D) | REQ + notifications (filter wheel) |
| 144414255238610945 | 2 (astro) | 1 | 0 (tele) | 1 | 1 notification |
| 144678138029277200 | 2 (astro) | 2 | 0 (tele) | 16 (0x10) | Absolute frame count; app writes 509/999 after 11041 |
| 792915009393917965 | 11 | 1 | 0 (tele) | 13 (0x0D) | 1 notification (session end) |

---

## State Enums

### OperationState
| Value | Name |
|-------|------|
| 0 | OPERATION_STATE_IDLE |
| 1 | OPERATION_STATE_RUNNING |
| 2 | OPERATION_STATE_STOPPING |
| 3 | OPERATION_STATE_STOPPED |

### AstroState
| Value | Name |
|-------|------|
| 0 | ASTRO_STATE_IDLE |
| 1 | ASTRO_STATE_RUNNING |
| 2 | ASTRO_STATE_STOPPING |
| 3 | ASTRO_STATE_STOPPED |
| 4 | ASTRO_STATE_PLATE_SOLVING |

### SentryModeState
| Value | Name |
|-------|------|
| 0 | SENTRY_MODE_STATE_IDLE |
| 1 | SENTRY_MODE_STATE_INIT |
| 2 | SENTRY_MODE_STATE_DETECT |
| 3 | SENTRY_MODE_STATE_TRACK |
| 4 | SENTRY_MODE_STATE_TRACK_FINISH |
| 5 | SENTRY_MODE_STATE_STOPPING |

---

## Error Codes

| CMD | Code | Description |
|-----|------|-------------|
| 11005 (StartStacking) | -11503 | `CODE_ASTRO_DARK_NOT_FOUND`; the app can capture a dark, cancel, or Continue with `11050` (protocol >=2.5, non-DWARF-2) or `force_start=true` |
| 11005 (StartStacking) | -11513 | `CODE_ASTRO_NEED_GOTO`; observed as a non-blocking late warning while stacking progress continued |
| 11005 (StartStacking) | -11514 | `CODE_ASTRO_NEED_ADJUST_SHOOT_PARAM`; requested shooting parameters are unsuitable |
| 11005 (StartStacking) | -11530 | `CODE_ASTRO_DARK_TEMP_MISMATCH`; a dark exists but is outside the firmware temperature tolerance. Continue uses `11050` (protocol >=2.5, non-DWARF-2) or `force_start=true` |
| 11033 (SaveStacked) | -16600 | V3 save/export failure |
