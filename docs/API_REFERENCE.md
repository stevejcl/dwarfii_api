# dwarfii_api リファレンス

DWARF II / 3 / mini 用 WebSocket API ライブラリ。

## 目次

- [インフラストラクチャ](#インフラストラクチャ)
- [V2 コマンド (DWARF II / 3)](#v2-コマンド-dwarf-ii--3)
  - [Astro (天体観測)](#astro-天体観測)
  - [Camera Tele (望遠カメラ)](#camera-tele-望遠カメラ)
  - [Camera Wide (広角カメラ)](#camera-wide-広角カメラ)
  - [System (システム)](#system-システム)
  - [Focus (フォーカス)](#focus-フォーカス)
  - [RGB Power (LED・電源)](#rgb-power-led電源)
  - [Motor (モーター)](#motor-モーター)
  - [Panorama (パノラマ)](#panorama-パノラマ)
  - [Bluetooth (BLE)](#bluetooth-ble)
- [V3 コマンド (DWARF mini)](#v3-コマンド-dwarf-mini)
  - [V3 Camera Tele](#v3-camera-tele)
  - [V3 Camera Wide](#v3-camera-wide)
  - [V3 Astro](#v3-astro)
  - [V3 System](#v3-system)
  - [V3 Focus](#v3-focus)
  - [V3 Device Config](#v3-device-config)
  - [V3 Camera Params](#v3-camera-params)
  - [V3 Schedule](#v3-schedule)
- [V3 通知 (Notifications)](#v3-通知-notifications)
- [プロトコルバージョン切り替え](#プロトコルバージョン切り替え)

---

## インフラストラクチャ

### プロトコルバージョン管理 (`api_utils.js`)

| 関数 | 引数 | 説明 |
|------|------|------|
| `setDwarfMinorVersion(version)` | `9` (V2) or `20` (V3) | 送信パケットのプロトコルバージョンを設定 |
| `getDwarfMinorVersion()` | — | 現在のプロトコルバージョンを取得 |

### デバイス定数 (`api_codes.js`)

| 定数 | 値 | 説明 |
|------|------|------|
| `DwarfDeviceIdDwarfII` | 1 | DWARF II |
| `DwarfDeviceIdDwarf3` | 2 | DWARF 3 |
| `DwarfDeviceIdDwarfMini` | 4 | DWARF mini |
| `WsMinorVersionV2` | 9 | V2 プロトコル |
| `WsMinorVersionV3` | 20 | V3 プロトコル |

### WebSocket (`websocket_class.js`)

| メソッド | 引数 | 説明 |
|----------|------|------|
| `setMinorVersionDwarf(minorVersion)` | `9` or `20` | 送信パケットのプロトコルバージョンを設定 |
| `setDeviceIdDwarf(deviceId)` | `1`, `2`, or `4` | デバイス ID を設定 |

---

## V2 コマンド (DWARF II / 3)

### Astro (天体観測)

**モジュール: `astro.js`** — Module ID: 3 (MODULE_ASTRO)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 11000 | `messageAstroStartCalibration(lon, lat)` | ReqStartCalibration | キャリブレーション開始（観測地の経度・緯度、十進度） |
| 11001 | `messageAstroStopCalibration()` | — | キャリブレーション停止 |
| 11002 | `messageAstroStartGotoDso(ra, dec, target_name)` | ra: RA(度), dec: Dec(度), target_name: 天体名 | DSO へ GOTO 開始 |
| 11003 | `messageAstroStartGotoSolarSystem(index, lon, lat, targetName)` | index: 天体ID, lon: 経度, lat: 緯度, targetName: 名前 | 太陽系天体へ GOTO 開始 |
| 11004 | `messageAstroStopGoto()` | — | GOTO 停止 |
| 11005 | `messageAstroStartCaptureRawLiveStacking()` | — | スタッキング開始 |
| 11006 | `messageAstroStopCaptureRawLiveStacking()` | — | スタッキング停止 |
| 11007 | `messageAstroStartCaptureRawDark(reshoot)` | reshoot: 再撮影フラグ | ダーク撮影開始 |
| 11008 | `messageAstroStopCaptureRawDark()` | — | ダーク撮影停止 |
| 11009 | `messageAstroCheckGotDark()` | — | ダーク撮影済みか確認 |
| 11010 | `messageAstroGoLive()` | — | ライブビュー (トラッキング開始) |
| 11011 | `messageAstroStartTrackSpecialTarget(index, lon, lat)` | index: 天体ID, lon: 経度, lat: 緯度 | 太陽/月トラッキング開始 |
| 11012 | `messageAstroStopTrackSpecialTarget()` | — | 太陽/月トラッキング停止 |
| 11013 | `messageAstroStartOneClickGotoDso(ra, dec, target_name, lon, lat, shootingMode, gotoOnly, rotation?)` | ra: RA(時), dec: Dec(度), target/location, Deep Sky mode=2, gotoOnly=false for calibration | ワンクリック校正 + DSO GOTO |
| 11014 | `messageAstroStartOneClickGotoSolarSystem(index, lon, lat, targetName, shootingMode, forceStart)` | index: 天体ID, observer location, target, mode, force flag | ワンクリック太陽系 GOTO |
| 11015 | `messageAstroStopOneClickGoto()` | — | ワンクリック GOTO 停止 |
| 11016 | `messageAstroStartWideCaptureLiveStacking()` | — | 広角スタッキング開始 |
| 11017 | `messageAstroStopWideCaptureLiveStacking()` | — | 広角スタッキング停止 |
| 11018 | `messageAstroStartEqSolving(lon, lat)` | lon: 経度, lat: 緯度 | EQ 検証開始 |
| 11019 | `messageAstroStopEqSolving()` | — | EQ 検証停止 |
| 11020 | — | — | 広角ライブビュー (CMD_ASTRO_WIDE_GO_LIVE — JS ラッパー未実装) |
| 11021 | `messageAstroCaptureDarkFrameWithParam(exp_index, gain_index, bin_index, cap_size)` | 露出/ゲイン/ビニング/枚数 | パラメータ指定ダーク撮影開始 |
| 11022 | `messageAstroStopCaptureDarkFrameWithParam()` | — | パラメータ指定ダーク撮影停止 |
| 11023 | `messageAstroGetDarkFrameList()` | — | ダークフレーム一覧取得 |
| 11024 | `messageAstroDelDarkFrameList(exp_index, gain_index, bin_index)` | 露出/ゲイン/ビニング | ダークフレーム削除 |
| 11025 | `messageAstroCaptureWideDarkFrameWithParam(exp_index, gain_index, bin_index, cap_size)` | 露出/ゲイン/ビニング/枚数 | 広角パラメータ指定ダーク撮影開始 |
| 11026 | `messageAstroStopCaptureWideDarkFrameWithParam()` | — | 広角パラメータ指定ダーク撮影停止 |
| 11027 | `messageAstroGetWideDarkFrameList()` | — | 広角ダークフレーム一覧取得 |
| 11028 | `messageAstroDelWideDarkFrameList(exp_index, gain_index, bin_index)` | 露出/ゲイン/ビニング | 広角ダークフレーム削除 |

### Camera Tele (望遠カメラ)

**モジュール: `camera_tele.js`** — Module ID: 1 (MODULE_CAMERA_TELE)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 10000 | `messageCameraTeleOpenCamera(binning, rtsp_encode_type)` | binning: ビニングモード, rtsp_encode_type: RTSP エンコード | カメラ ON |
| 10001 | `messageCameraTeleCloseCamera()` | — | カメラ OFF |
| 10002 | `messageCameraTelePhotograph()` | — | 写真撮影 |
| 10003 | `messageCameraTeleStartBurst()` | — | 連写開始 |
| 10004 | `messageCameraTeleStopBurst()` | — | 連写停止 |
| 10005 | `messageCameraTeleStartRecord()` | — | 録画開始 |
| 10006 | `messageCameraTeleStopRecord()` | — | 録画停止 |
| 10007 | `messageCameraTeleSetExpMode(mode)` | mode: 露出モード | 露出モード設定 |
| 10008 | `messageCameraTeleGetExpMode()` | — | 露出モード取得 |
| 10009 | `messageCameraTeleSetExp(index)` | index: 露出値 | 露出値設定 |
| 10010 | `messageCameraTeleGetExp()` | — | 露出値取得 |
| 10011 | `messageCameraTeleSetGainMode(mode)` | mode: ゲインモード | ゲインモード設定 |
| 10012 | `messageCameraTeleGetGainMode()` | — | ゲインモード取得 |
| 10013 | `messageCameraTeleSetGain(index)` | index: ゲイン値 | ゲイン値設定 |
| 10014 | `messageCameraTeleGetGain()` | — | ゲイン値取得 |
| 10015 | `messageCameraTeleSetBrightness(value)` | value: 明るさ | 明るさ設定 |
| 10016 | `messageCameraTeleGetBrightness()` | — | 明るさ取得 |
| 10017 | `messageCameraTeleSetContrast(value)` | value: コントラスト | コントラスト設定 |
| 10018 | `messageCameraTeleGetContrast()` | — | コントラスト取得 |
| 10019 | `messageCameraTeleSetSaturation(value)` | value: 彩度 | 彩度設定 |
| 10020 | `messageCameraTeleGetSaturation()` | — | 彩度取得 |
| 10021 | `messageCameraTeleSetHue(value)` | value: 色相 | 色相設定 |
| 10022 | `messageCameraTeleGetHue()` | — | 色相取得 |
| 10023 | `messageCameraTeleSetSharpness(value)` | value: シャープネス | シャープネス設定 |
| 10024 | `messageCameraTeleGetSharpness()` | — | シャープネス取得 |
| 10025 | `messageCameraTeleSetWBMode(mode)` | mode: WBモード | ホワイトバランスモード設定 |
| 10026 | `messageCameraTeleGetWBMode()` | — | ホワイトバランスモード取得 |
| 10027 | `messageCameraTeleSetWBScene(value)` | value: シーン | ホワイトバランスシーン設定 |
| 10028 | `messageCameraTeleGetWBScene()` | — | ホワイトバランスシーン取得 |
| 10029 | `messageCameraTeleSetWBColorTemp(index)` | index: 色温度 | ホワイトバランス色温度設定 |
| 10030 | `messageCameraTeleGetWBColorTemp()` | — | ホワイトバランス色温度取得 |
| 10031 | `messageCameraTeleSetIRCut(value)` | value: IRCUT値 | IRCUT 設定 |
| 10032 | `messageCameraTeleGetIRCut()` | — | IRCUT 取得 |
| 10033 | `messageCameraTeleStartTimeLapsePhoto()` | — | タイムラプス開始 |
| 10034 | `messageCameraTeleStopTimeLapsePhoto()` | — | タイムラプス停止 |
| 10035 | `messageCameraTeleSetAllParams(...)` | exp_mode, exp_index, gain_mode, gain_index, ircut_value, wb_mode, wb_index_type, wb_index, brightness, contrast, hue, saturation, sharpness, jpg_quality | 全パラメータ一括設定 |
| 10036 | `messageCameraTeleGetAllParams()` | — | 全パラメータ取得 |
| 10037 | `messageCameraTeleSetFeatureParams(...)` | has_auto/auto_mode/id/mode_index/index/continue_value | 機能パラメータ設定 |
| 10038 | `messageCameraTeleGetAllFeatureParams()` | — | 全機能パラメータ取得 |
| 10039 | `messageCameraTeleGetSystemWorkingState()` | — | システム動作状態取得 |
| 10040 | `messageCameraTeleSetJPGQuality(quality)` | quality: JPEG品質 | JPEGプレビュー品質設定 |
| 10042 | `messageCameraTeleSetRTSPPreviewBitsRate(bitrate_type)` | bitrate_type: ビットレート | RTSPプレビュービットレート設定（実装バグ: 実際は CMD 10040 を送信） |
| 10041 | `messageCameraTelePhotoRaw()` | — | RAW撮影 |

### Camera Wide (広角カメラ)

**モジュール: `camera_wide.js`** — Module ID: 2 (MODULE_CAMERA_WIDE)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 12000 | `messageCameraWideOpenCamera()` | — | カメラ ON |
| 12001 | `messageCameraWideCloseCamera()` | — | カメラ OFF |
| 12002 | `messageCameraWideSetExpMode(mode)` | mode: 露出モード | 露出モード設定 |
| 12003 | `messageCameraWideGetExpMode()` | — | 露出モード取得 |
| 12004 | `messageCameraWideSetExp(index)` | index: 露出値 | 露出値設定 |
| 12005 | `messageCameraWideGetExp()` | — | 露出値取得 |
| 12006 | `messageCameraWideSetGain(index)` | index: ゲイン値 | ゲイン値設定 |
| 12007 | `messageCameraWideGetGain()` | — | ゲイン値取得 |
| 12008 | `messageCameraWideSetBrightness(value)` | value: 明るさ | 明るさ設定 |
| 12010 | `messageCameraWideSetContrast(value)` | value: コントラスト | コントラスト設定 |
| 12012 | `messageCameraWideSetSaturation(value)` | value: 彩度 | 彩度設定 |
| 12014 | `messageCameraWideSetHue(value)` | value: 色相 | 色相設定 |
| 12016 | `messageCameraWideSetSharpness(value)` | value: シャープネス | シャープネス設定 |
| 12018 | `messageCameraWideSetWBMode(mode)` | mode: WBモード | ホワイトバランスモード設定 |
| 12020 | `messageCameraWideSetWBColorTemp(index)` | index: 色温度 | ホワイトバランス色温度設定 |
| 12022 | `messageCameraWidePhotograph()` | — | 写真撮影 |
| 12023 | `messageCameraWideStartBurst()` | — | 連写開始 |
| 12024 | `messageCameraWideStopBurst()` | — | 連写停止 |
| 12025 | `messageCameraWideStartTimeLapsePhoto()` | — | タイムラプス開始 |
| 12026 | `messageCameraWideStopTimeLapsePhoto()` | — | タイムラプス停止 |
| 12027 | `messageCameraWideGetAllParams()` | — | 全パラメータ取得 |
| 12028 | `messageCameraWideSetAllParams(...)` | 14 params | 全パラメータ一括設定 |
| 12030 | `messageCameraWideStartRecord()` | — | 録画開始 |
| 12031 | `messageCameraWideStopRecord()` | — | 録画停止 |

> **注意**: Camera Wide は Camera Tele と異なり、GET 系コマンド (12009 GetBrightness, 12011 GetContrast 等) の JS ラッパー関数が未実装です。proto と cmd_mapping には定義されています。
> また `messageCameraWideSetGainMode()` / `messageCameraWideGetGainMode()` は JS に存在しますが、参照する proto enum (`CMD_CAMERA_WIDE_SET_GAIN_MODE` / `CMD_CAMERA_WIDE_GET_GAIN_MODE`) が `protocol.proto` に存在しないため使用できません。

### System (システム)

**モジュール: `system.js`** — Module ID: 4 (MODULE_SYSTEM)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 13000 | `messageSystemSetTime()` | — | システム時刻設定 (UTC自動) |
| 13001 | `messageSystemSetTimezone(timezone)` | timezone: "Asia/Tokyo" 等 | タイムゾーン設定 |
| 13002 | `messageSystemSetMtpMode(mode)` | mode: MTPモード | MTP モード設定 |
| 13003 | `messageSystemSetCpuMode(mode)` | mode: CPUモード | CPU モード設定 |
| 13004 | `messageSystemSetMasterLock(lock)` | lock: ロック値 | ホスト/スレーブモード設定 |

### Focus (フォーカス)

**モジュール: `focus.js`** — Module ID: 8 (MODULE_FOCUS)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 15000 | `messageFocusAutoFocus(mode, center_x, center_y)` | mode: AFモード, center_x/y: 中心座標 | 通常オートフォーカス |
| 15001 | `messageFocusManualSingleStepFocus(direction)` | direction: 方向 | 手動シングルステップフォーカス |
| 15002 | `messageFocusStartManualContinuFocus(direction)` | direction: 方向 | 手動連続フォーカス開始 |
| 15003 | `messageFocusStopManualContinuFocus(binning)` | binning: ビニング（現在は無視されます） | 手動連続フォーカス停止 |
| 15004 | `messageFocusStartAstroAutoFocus(mode)` | mode: AFモード | 天体オートフォーカス開始 |
| 15005 | `messageFocusStopAstroAutoFocus()` | — | 天体オートフォーカス停止 |

### RGB Power (LED・電源)

**モジュール: `rgb_power.js`** — Module ID: 5 (MODULE_RGB_POWER)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 13500 | `messageRgbPowerOpenRGB()` | — | リングライト ON |
| 13501 | `messageRgbPowerCloseRGB()` | — | リングライト OFF |
| 13502 | `messageRgbPowerDown()` | — | シャットダウン |
| 13503 | `messageRgbPowerPowerIndON()` | — | バッテリーインジケーター ON |
| 13504 | `messageRgbPowerPowerIndOFF()` | — | バッテリーインジケーター OFF |
| 13505 | `messageRgbPowerReboot()` | — | 再起動 |

### Motor (モーター)

**モジュール: `motor.js`** — Module ID: 6 (MODULE_MOTOR)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 14000 | `messageStepMotorMotion(id, speed, direction, speed_ramping, resolution_level)` | モーターID/速度/方向/加速/分解能 | モーター駆動 |
| 14001 | `messageStepMotorMotionTo(id, end_position, speed, speed_ramping, resolution_level)` | モーターID/目標位置/速度/加速/分解能 | モーター位置指定駆動 |
| 14002 | `messageStepMotorStop(id)` | id: モーターID | モーター停止 |
| 14003 | `messageStepMotorReset(id, direction)` | id: モーターID, direction: 方向 | モーターリセット |
| 14004 | `messageStepMotorChangeSpeed(id, speed)` | id: モーターID, speed: 速度 | モーター速度変更 |
| 14005 | `messageStepMotorChangeDirection(id, direction)` | id: モーターID, direction: 方向 | モーター方向変更 |
| 14006 | `messageStepMotorServiceJoystick(vector_angle, vector_length, speed)` | 角度/長さ/速度 | ジョイスティック操作 |
| 14007 | `messageStepMotorServiceJoystickFixedAngle(vector_angle, vector_length, speed)` | 角度/長さ/速度 | ジョイスティック固定角度操作 |
| 14008 | `messageStepMotorServiceJoystickStop()` | — | ジョイスティック停止 |
| 14009 | `messageStepMotorServiceDualCameraLinkage(x, y)` | x/y: 座標 | デュアルカメラ連動 |
| 14011 | `messageStepMotorGetPosition(id)` | id: モーターID | モーター位置取得 |

### Panorama (パノラマ)

**モジュール: `panorama.js`** — Module ID: 10 (MODULE_PANORAMA)

| CMD ID | 関数 | 引数 | 説明 |
|--------|------|------|------|
| 15500 | `messagePanoramaStartGrid()` | — | パノラマ開始 (グリッド) |
| 15501 | `messagePanoramaStop()` | — | パノラマ停止 |
| 15502 | `messagePanoramaStartPanoramaByEulerRange(yaw_range, pitch_range)` | yaw_range/pitch_range: 角度範囲 | パノラマ開始 (オイラー範囲) |

### Bluetooth (BLE)

**モジュール: `bluetooth.js`** — BLE 経由の WiFi 設定等

| CMD | 関数 | 引数 | 説明 |
|-----|------|------|------|
| 1 | `messageGetconfig(ble_psd)` | ble_psd: BLEパスワード | デバイス設定取得 |
| 2 | `messageWifiAP(wifi_type, auto_start, country_list, country, ble_psd)` | WiFi種別/自動起動/国/パスワード | WiFi AP モード設定 |
| 3 | `messageWifiSTA(auto_start, ble_psd, ssid, psd)` | 自動起動/パスワード/SSID/WiFiパスワード | WiFi STA モード設定 |
| 5 | `messageResetWifi()` | — | WiFi リセット |
| 6 | `messageGetWifiList()` | — | WiFi 一覧取得 |
| 7 | `messageGetSystemInfo()` | — | デバイス情報取得 |

---

## V3 コマンド (DWARF mini)

> V3 は DWARF mini (deviceId=4, FW 1.0.25.2) で使用するプロトコル v1.20 のコマンドです。
> 一部のコマンド (11005, 11006, 11010, 11013, 11014, 11015) は V2 と共通の CMD ID で、追加フィールドにより拡張されています。

### DWARF mini V3 evidence update (2026-07-30)

Validated against a DWARF MINI running firmware `1.1.3 build 2`, the
DWARFLAB 3.4.1 APK, and safe read/write probes:

- WebSocket profile is protocol `1.20`, `deviceId=4`, client ID
  `0000DAF4-0000-1000-8000-00805F9B34FB`.
- Normal Deep Sky capture has Astro (`ir_index=1`) and Duo-Band
  (`ir_index=2`). There is no no-filter position.
- Dark (`filter_type=3`) is reserved for calibration-frame capture through
  commands `11045`/`11046`; it is not a normal filter move.
- `11040` mode 0 returned `0|0|15|60|1|null`, `0|0|30|60|1|null`,
  `0|0|60|60|1|null`, `0|0|90|60|1|null`, and
  `0|0|180|60|1|null`. Mode 1 returned `1|0|10|40|1|null`.
- Older firmware represented quick sets as a six-component string. APK 3.4.1
  defines 11040 as `GET_QUICK_SET_LIST` and 11041 as `SET_QUICK_SET` with an
  exact `info_id`; an echoed modified string is not proof that it was applied.
- APK 3.4.1 posts `{modeId:2}` to `/shootingMode/getParamAndSetting`, then
  writes exposure with 16700 and gain with 16701. Mini firmware 1.1.3 build 2
  reports 1s=index 120 and 5s=index 141.
- Legacy feature query `10038` timed out. Device config `16405` reported
  `1920x1080`.
- APK 3.4.1 calls `11043` `GET_CALI_FRAME_LIST`, conflicting with the
  provisional exposure-preset decoder in this library. Inspect the raw response
  before depending on that decoder.
- `16700` is exposure, `16701` is gain, and `16703` handles general integer
  parameters such as filter and frame count. `15264` reports their state.

The calibration request schema is APK-confirmed, but calibration result delivery
and completion notifications still require a controlled hardware capture.

### V3 Camera Tele

**モジュール: `v3_camera_tele.js`** — Module ID: 1 (MODULE_CAMERA_TELE)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 10050 | `messageV3CameraTeleOpenCamera()` | V3ReqOpenTeleCamera `{action:1}` | ComResponse | 望遠カメラ ON |
| 10050 | `messageV3CameraTeleCloseCamera()` | V3ReqOpenTeleCamera `{}` | ComResponse | 望遠カメラ OFF |

### V3 Camera Wide

**モジュール: `v3_camera_wide.js`** — Module ID: 2 (MODULE_CAMERA_WIDE)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 12036 | `messageV3CameraWideOpenCamera()` | V3ReqOpenWideCamera `{}` | ComResponse | 広角カメラ ON |
| 12036 | `messageV3CameraWideCloseCamera()` | V3ReqOpenWideCamera `{action:1}` | ComResponse | 広角カメラ OFF |

> **注意**: Wide カメラの action は Tele と逆。0/省略=ON, 1=OFF。

### V3 Astro

**モジュール: `v3_astro.js`** — Module ID: 3 (MODULE_ASTRO)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 11005 | `messageV3AstroStartStacking(irIndex, forceStart)` | ReqCaptureRawLiveStacking `{irIndex, forceStart}` | ResAstroShooting-compatible response | Start stacking; DWARF 3/mini: Astro=1, Duo-Band=2; filterless DWARF 2: irIndex=-1 sentinel. `forceStart=true` is the DWARF 2/older-protocol fallback for recoverable dark warnings. |
| 11050 | `messageV3AstroContinueShooting()` | Empty `ReqContinueShooting` | ComResponse | Protocol >=2.5 continuation after `-11503`/`-11530`; current APK excludes DWARF 2 and uses its `forceStart` fallback there. |
| 11006 | `messageV3AstroStopStacking()` | ReqStopCaptureRawLiveStacking | ComResponse | スタッキング停止 |
| 11010 | `messageV3AstroStartTracking()` | ReqGoLive | ComResponse | トラッキング開始 |
| 11013 | `messageV3AstroGotoDSO(ra, dec, targetName, lon, lat, mode)` | ReqOneClickGotoDSO | ResOneClickGoto | DSO へワンクリック GOTO (V3: lon/lat/mode 追加) |
| 11014 | `messageV3AstroGotoSolar(index, lon, lat, targetName, mode)` | ReqOneClickGotoSolarSystem | ResOneClickGoto | 太陽系天体へワンクリック GOTO (V3: mode 追加) |
| 11015 | `messageV3AstroGotoDone()` | ReqStopOneClickGoto | ComResponse | GOTO 完了/確認 |
| 11033 | `messageV3AstroSaveImage(path)` | V3ReqSaveStackedImage `{path}` | V3ResSaveStackedImage | スタック画像保存 |
| 11034 | `messageV3AstroListImages()` | V3ReqListSavedImages | ComResponse | 保存画像一覧取得 |
| 11039 | `messageV3AstroStatusPolling(f1, f2, f3, f4)` | V3ReqStatusPolling | ComResponse | ステータスポーリング |
| 11040 | `messageV3AstroGetParams(mode)` | V3ReqGetAstroParams `{mode}` | V3ResGetAstroParams | 撮影パラメータ取得 |
| 11041 | `messageV3AstroSetParams(params)` | V3ReqSetAstroParams `{params}` | V3ResSetAstroParams | 撮影パラメータ設定 (パイプ区切り文字列) |
| 11043 | `messageV3AstroGetPresets()` | V3ReqGetExposurePresets | V3ResGetExposurePresets | Provisional: APK names this GET_CALI_FRAME_LIST |
| 11045 | `messageV3AstroStartCalibrationFrame(...)` / `messageV3AstroStartDarkCalibration(...)` | V3ReqCaptureCaliFrame | ComResponse | Start calibration frame; dark uses type=0/filter=3 |
| 11046 | `messageV3AstroStopCalibrationFrame(cameraType)` | V3ReqStopCaptureCaliFrame | ComResponse | Stop calibration-frame capture |
| 11047 | `messageV3AstroSetLocation(lon, lat)` | V3ReqSetObservationLocation | ComResponse | 観測地点設定 |
| 11048 | `messageV3AstroConfirm()` | V3ReqConfirmObservation | ComResponse | 観測確認 |

For DWARF 2, DWARF 3, and DWARF mini, clients should obtain the mode-2 live
parameter catalogue, send `messageV3AstroExposureSet(index)` (16700) and
`messageV3AstroGainSet(gain)` (16701), prime the persisted tuple with
`messageV3AstroSetParams(params)` (11041), then send
`messageV3AstroFrameCountSet(count)` (`16703`, paramId
`144678138029277200`) immediately before `11005`. The `11041` echo is not
authoritative by itself for modified values: current hardware retained exposure index
156 (15s) after echoing a 5-second-looking string. A DWARF 3 live test confirmed
that `16700/16701 -> 11041 -> 16703 -> 11005` preserves a 1-second
Astro-filter request across the tested firmware. Mini firmware can return -1
for 16700; clients may then use the complete accepted 11041 tuple as fallback.
A later DWARF 3 VIS-filter test nevertheless reloaded 15
seconds. Treat notification `15288.total_time` as the authoritative applied
duration, report substitutions to the client/log, and associate the fresh FITS
with that actual duration rather than discarding it. Current DWARF 3 firmware
emits `15264` from module 15 while preparing `11005`; exposure/gain parameter
IDs in those packets identify an internal capture namespace (mode 11 and mode
13 were observed). Reapply `16700`, `16701`, and the `16703` frame-count write
using that namespace after its late preset reload. The fifth `11041` tuple
component is a resolution index (DWARF 3 `0`, Mini `1`), not frame count, and
must be preserved. Then monitor notification `15209`.
For an Alpaca raw-FITS result, `current_count` reaching the requested
frame count is the retrieval boundary; `stacked_count` remains the accepted
live-stack boundary when a stacked result is required. Stop with `11006`
without waiting for media download. Then follow `15208` through running (1),
stopping (2), and stopped (3); the firmware can reject a subsequent `11005`
with `-11501` until stopped/idle is reported. Command `16405` returns the APK's
whole-device state and can recover a missed `15208` transition. `target_name`
can contain persisted metadata from an earlier session.

The `11005` command ID is shared, but its payload follows device capability.
Hardware logs confirm DWARF 3 requires the selected `irIndex`/`forceStart`
payload. APK 3.4.1 identifies `-11530` as
`CODE_ASTRO_DARK_TEMP_MISMATCH`; it is not a filter-payload validation code.
The app offers to capture a new dark, cancel, or continue. Protocol >=2.5 on
non-DWARF-2 models sends empty command `11050`; DWARF 2 and older protocol
versions repeat `11005` with `forceStart=true`.
DWARF mini also embeds its selected filter. Use the sentinel only for DWARF 2,
which has no internal filter wheel.

Calibration-frame capture emits APK-defined notifications:

| CMD ID | Message | Fields | Confidence |
|--------|---------|--------|------------|
| 15290 | `V3ResNotifyCaliFrameState` | state=1, camera_type=2, cali_frame_type=3 | Confirmed in DWARFLAB 3.4.1 code; hardware values unverified |
| 15291 | `V3ResNotifyCaliFrameProgress` | progress=1, camera_type=2, cali_frame_type=3 | Confirmed in DWARFLAB 3.4.1 code; hardware values unverified |

### V3 System

**モジュール: `v3_system.js`** — Module ID: 4 (MODULE_SYSTEM)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 13010 | `messageV3SystemSetGPSLocation(lat, lon, alt, locationName)` | V3ReqSetGPSLocation | ComResponse | GPS 位置設定 |

### V3 Focus

**モジュール: `v3_focus.js`** — Module ID: 8 (MODULE_FOCUS)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 15011 | `messageV3FocusInit()` | V3ReqFocusInit | V3ResFocusInit | フォーカス初期化 |
| 15004 | `messageV3FocusAutoFocusStart()` | ReqAstroAutoFocus `{mode:1}` | ComResponse | 天体オートフォーカス開始 |

### V3 Device Config

**モジュール: `v3_device_config.js`** — Module ID: 14 (MODULE_DEVICE_CONFIG)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 16402 | `messageV3DeviceConfigModeQuery(targetMode)` | V3ReqModeQuery `{targetMode}` | V3ResModeQuery | モード問い合わせ (2=通常, 8=天体) |
| 16403 | `messageV3DeviceConfigShootingModeSwitch(modeId)` | V3ReqShootingModeSwitch `{modeId}` | V3ResShootingModeSwitch | 撮影モード切替 (1=写真, 3=連写, 4=動画, 5=タイムラプス) |
| 16404 | `messageV3DeviceConfigModeSwitch()` | V3ReqModeSwitch `{inner:{value:1}}` | V3ResModeSwitch | 天体モード切替 |
| 16405 | `messageV3GetDeviceStateInfo()` (`messageV3DeviceConfigGetConfig()` compatibility alias) | APK `ReqGetDeviceStateInfo` (legacy local name `V3ReqGetDeviceConfig`) | APK `ResGetDeviceStateInfo` (legacy local compatibility decoder) | Complete work state, including tele `CaptureRawState`; use it to recover idle/running/stopping/stopped state |

### V3 Camera Params

**モジュール: `v3_camera_params.js`** — Module ID: 15 (MODULE_CAMERA_PARAMS)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 16703 | `messageV3CameraParamsAdjust(paramId, value)` | V3ReqAdjustParam `{paramId, value}` | ComResponse | カメラパラメータ調整 |

`messageV3AstroFrameCountSet(frameCount)` is the pcap-verified shared V3
absolute frame-count wrapper for `16703`. It uses paramId
`144678138029277200` (`0x0202000000000010`).

> `16700` and `16703` are generic camera-parameter commands. Parameter IDs must
> be verified for the selected shooting mode, category, and camera.

### V3 Schedule

**モジュール: `v3_schedule.js`** — Module ID: 13 (MODULE_SHOOTING_SCHEDULE)

| CMD ID | 関数 | Request | Response | 説明 |
|--------|------|---------|----------|------|
| 16102 | `messageV3ScheduleGet()` | ReqGetAllShootingSchedule | ResGetAllShootingSchedule | 撮影スケジュール取得 |

---

## V3 通知 (Notifications)

デバイスから非同期で送信される通知メッセージ。`analyzePacket()` で自動デコードされます。

| CMD ID | Enum | Notify Class | フィールド | 説明 |
|--------|------|--------------|-----------|------|
| 11036 | CMD_V3_ASTRO_SAVE_COMPLETE | ComResponse | — | 画像保存完了 |
| 15255 | CMD_V3_NOTIFY_EXPOSURE_PROGRESS | V3ResNotifyExposureProgress | elapsed, total | 露出進捗 (フレーム毎) |
| 15261 | CMD_V3_NOTIFY_DEVICE_STATE | V3ResNotifyDeviceState | event, mode, state, path | デバイス状態 |
| 15264 | CMD_V3_NOTIFY_CAMERA_PARAM_STATE | V3ResNotifyCameraParamState | paramId, value1, value2 | カメラパラメータ状態 |
| 15267 | CMD_V3_NOTIFY_MODE_CHANGE | V3ResNotifyModeChange | changing, mode, subMode | モード変更 |
| 15270 | CMD_V3_NOTIFY_STACKING_DATA | V3ResNotifyStackingData | field1, value, field3, flag | スタッキングデータ |
| 15273 | CMD_V3_NOTIFY_PHOTO_STATE | V3ResNotifyPhotoState | started, complete | 写真撮影状態 |
| 15274 | CMD_V3_NOTIFY_BURST_STATE | V3ResNotifyBurstState | started, complete | 連写状態 |
| 15275 | CMD_V3_NOTIFY_VIDEO_STATE | V3ResNotifyVideoState | started, complete | 動画撮影状態 |
| 15276 | CMD_V3_NOTIFY_TIMELAPSE_STATE | V3ResNotifyTimelapseState | started, complete | タイムラプス状態 |
| 15278 | CMD_V3_NOTIFY_AUTOFOCUS_STATE | V3ResNotifyAutoFocusState | state (1=実行中, 3=完了) | オートフォーカス状態 |
| 15285 | CMD_V3_NOTIFY_PHOTO_BURST_PROGRESS | V3ResNotifyPhotoBurstProgress | totalFrames, currentFrame, flag | 写真/連写進捗 |
| 15286 | CMD_V3_NOTIFY_VIDEO_PROGRESS | V3ResNotifyVideoProgress | elapsedSec, flag | 動画録画進捗 |
| 15287 | CMD_V3_NOTIFY_TIMELAPSE_PROGRESS | V3ResNotifyTimelapseProgress | field1, field2, frameCount, flag | タイムラプス進捗 |
| 15292 | CMD_V3_NOTIFY_TEMPERATURE2 | V3ResNotifyTemperature2 | temperature | 温度 |
| 15296 | CMD_V3_NOTIFY_OBSERVATION_STATE | V3ResNotifyObservationState | state (1=開始, 2=確認, 3=完了) | 観測状態 |

---

## プロトコルバージョン切り替え

DWARF mini に接続する際は、パケット送信前にプロトコルバージョンを V3 に切り替えます：

```javascript
import { WebSocketHandler, messageV3CameraTeleOpenCamera } from "dwarfii_api";

// WebSocketHandler はシングルトン (コンストラクタが既存インスタンスを返す)
const ws = new WebSocketHandler("192.168.11.31");
ws.setDeviceIdDwarf(4);        // DWARF mini
ws.setMinorVersionDwarf(20);   // V3 protocol

// コマンド送信: prepare() でキューに積み、run() で接続・送信
const packet = messageV3CameraTeleOpenCamera();
const messageHandler = (senderId, resultData) => {
  console.log("Response:", resultData);
};
ws.prepare(packet, "myApp", ["*"], messageHandler);
ws.run();
```

DWARF II/3 に接続する場合はデフォルト (V2) のまま使用します。
