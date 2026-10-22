// Access the class name associated with a command
// const openCameraClass = cmdMapping[10000];
// console.log(openCameraClass); // diplay "ReqOpenCamera"

export const cmdMapping = {
  // BLE Class Command
  1: "ReqGetconfig", // Get WiFi configuration
  2: "ReqAp", // Configure WiFi AP mode
  3: "ReqSta", // Configure WiFi STA mode
  4: "ReqSetblewifi", // Configure BLE wifi
  5: "ReqReset", // Reset Bluetooth WiFi
  6: "ReqWifilist", // Get WiFi list
  7: "ReqGetsysteminfo", // Obtain device information
  8: "ReqCheckFile", // Check File

  10000: "ReqOpenCamera", // Turn on the camera
  10001: "ReqCloseCamera", // Turn off the camera
  10002: "ReqPhoto", // Take photos
  10003: "ReqBurstPhoto", // Start continuous shooting
  10004: "ReqStopBurstPhoto", // Stop continuous shooting
  10005: "ReqStartRecord", // Start recording
  10006: "ReqStopRecord", // Stop recording
  10007: "ReqSetExpMode", // Set exposure mode
  10008: "ReqGetExpMode", // Acquire exposure mode
  10009: "ReqSetExp", // Set exposure value
  10010: "ReqGetExp", // Get exposure value
  10011: "ReqSetGainMode", // Set gain mode
  10012: "ReqGetGainMode", // Acquisition gain mode
  10013: "ReqSetGain", // Set gain value
  10014: "ReqGetGain", // Get gain value
  10015: "ReqSetBrightness", // Set brightness
  10016: "ReqGetBrightness", // Acquire brightness
  10017: "ReqSetContrast", // Set contrast
  10018: "ReqGetContrast", // Get contrast
  10019: "ReqSetSaturation", // Set saturation
  10020: "ReqGetSaturation", // Acquire saturation
  10021: "ReqSetHue", // Set tone
  10022: "ReqGetHue", // Get hue
  10023: "ReqSetSharpness", // Set sharpness
  10024: "ReqGetSharpness", // Acquire sharpness
  10025: "ReqSetWBMode", // Set white balance mode
  10026: "ReqGetWBMode", // Acquire white balance mode
  10027: "ReqSetWBSence", // Set white balance scene
  10028: "ReqGetWBSence", // Get white balance scene
  10029: "ReqSetWBCT", // Set the white balance color temperature value
  10030: "ReqGetWBCT", // Obtain the white balance color temperature value
  10031: "ReqSetIrCut", // Set IRCUT
  10032: "ReqGetIrcut", // Get IRCUT status
  10033: "ReqStartTimeLapse", // Start time-lapse photography
  10034: "ReqStopTimeLapse", // Stop time-lapse photography
  10035: "ReqSetAllParams", // Set all parameters
  10036: "ReqGetAllParams", // Get all parameters
  10037: "ReqSetFeatureParams", // Set feature parameters
  10038: "ReqGetAllFeatureParams", // Get all feature parameters
  10039: "ReqGetSystemWorkingState", // Get the working status of the whole machine
  10040: "ReqSetJpgQuality", // Set jpg preview quality

  10041: "ReqPhotoRaw", // Shoot RAW image
  10042: "ReqSetRtspBitRateType", // Set rtsp preview bit rate type

  11000: "ReqStartCalibration", // Start calibration
  11001: "ReqStopCalibration", // Stop calibration
  11002: "ReqGotoDSO", // Start GOTO Deep Space Object
  11003: "ReqGotoSolarSystem", // Start GOTO Solar System Target
  11004: "ReqStopGoto", // Stop GOTO
  11005: "ReqCaptureRawLiveStacking", // Start stacking
  11006: "ReqStopCaptureRawLiveStacking", // Stop overlay
  11007: "ReqCaptureDarkFrame", // Start shooting dark scenes
  11008: "ReqStopCaptureDarkFrame", // Stop filming darkfield
  11009: "ReqCheckDarkFrame", // Inquire about the dark field that has been shot
  11010: "ReqGoLive", // GO LIVE interface
  11011: "ReqTrackSpecialTarget", // Start tracking the sun and moon
  11012: "ReqStopTrackSpecialTarget", // Stop tracking the sun and moon

  11013: "ReqOneClickGotoDSO", // One-click GOTO deep space celestial body
  11014: "ReqOneClickGotoSolarSystem", // One-click GOTO solar system target
  11015: "ReqStopOneClickGoto", // Stop one-click GOTO
  11016: "ReqCaptureWideRawLiveStacking", // Start wide-angle overlay
  11017: "ReqStopCaptureWideRawLiveStacking", // Stop wide-angle overlay
  11018: "ReqStartEqSolving", // Start EQ verification
  11019: "ReqStopEqSolving", // Stop EQ verification
  11020: "ReqGoLive", // Wide-angle GO LIVE interface

  11021: "ReqCaptureDarkFrame", // Start shooting the dark field with specified parameters (manually set exposure, gain, binning).
  11022: "ReqStopCaptureDarkFrame", // Stop shooting the dark field with specified parameters
  11023: "ReqCheckDarkFrame", // Query the list of recorded dark scenes
  11024: "ReqDelDarkFrame", // Delete the specified dark field list
  11025: "ReqCaptureWideDarkFrame", // Start shooting wide-angle dark field with specified parameters (manually set exposure and gain. Binning is fixed to 1 internally, setting does not work).
  11026: "ReqStopCaptureWideDarkFrame", // Stop shooting dark field with wide-angle specified parameters
  11027: "ReqCheckWideDarkFrame", // Query the list of wide-angle dark scenes taken
  11028: "ReqDelWideDarkFrame", // Delete the specified wide-angle dark field list
  11031: "ReqStartMosaic", // APK 3.4.1: start direct Tele Mosaic capture
  11042: "ReqOneClickShooting", // APK 3.4.1: combined GOTO and shooting request
  11044: "ReqDelCaliFrameList", // APK 3.4.1: delete calibration frames by info ID
  11050: "ReqContinueShooting", // APK 3.4.1: continue after a recoverable shooting warning

  12000: "ReqOpenCamera", // Turn on the camera
  12001: "ReqCloseCamera", // Turn off the camera
  12002: "ReqSetExpMode", // Set exposure mode
  12003: "ReqGetExpMode", // Acquire exposure mode
  12004: "ReqSetExp", // Set exposure value
  12005: "ReqGetExp", // Get exposure value
  12006: "ReqSetGain", // Set gain
  12007: "ReqGetGain", // Acquisition gain
  12008: "ReqSetBrightness", // Set brightness
  12009: "ReqGetBrightness", // Acquire brightness
  12010: "ReqSetContrast", // Set contrast
  12011: "ReqGetContrast", // Get contrast
  12012: "ReqSetSaturation", // Set saturation
  12013: "ReqGetSaturation", // Acquire saturation
  12014: "ReqSetHue", // Set tone
  12015: "ReqGetHue", // Get hue
  12016: "ReqSetSharpness", // Set sharpness
  12017: "ReqGetSharpness", // Acquire sharpness
  12018: "ReqSetWBMode", // Set white balance mode
  12019: "ReqGetWBMode", // Acquire white balance mode
  12020: "ReqSetWBCT", // Set white balance color temperature
  12021: "ReqGetWBCT", // Obtain white balance color temperature
  12022: "ReqPhoto", // Take photos
  12023: "ReqBurstPhoto", // Continuous shooting
  12024: "ReqStopBurstPhoto", // Stop continuous shooting
  12025: "ReqStartTimeLapse", // Start time-lapse photography
  12026: "ReqStopTimeLapse", // Stop time-lapse photography
  12027: "ReqGetAllParams", // Get all parameters
  12028: "ReqSetAllParams", // Set all parameters

  12030: "ReqStartRecord", // Start wide recording
  12031: "ReqStopRecord", // Stop wide recording

  13000: "ReqSetTime", // Set the system time
  13001: "ReqSetTimezone", // Set the time zone
  13002: "ReqSetMtpMode", // Set MTP mode
  13003: "ReqSetCpuMode", // Set CPU mode
  13004: "ReqsetMasterLock", // Set HOST SLAVE mode

  13500: "ReqOpenRgb", // Turn on the ring light
  13501: "ReqCloseRgb", // Turn off the ring light
  13502: "ReqPowerDown", // Shut down
  13503: "ReqOpenPowerInd", // Turn on the battery indicator
  13504: "ReqClosePowerInd", // Turn off battery indicator =
  13505: "ReqReboot", // Restart

  14000: "ReqMotorRun", // Motor motion
  14001: "ReqMotorRunTo", // Motor motion to
  14002: "ReqMotorStop", // Motor stop
  14003: "ReqMotorReset", // Motor Reset
  14004: "ReqMotorChangeSpeed", // Motor Change Speed
  14005: "ReqMotorChangeDirection", // Motor ChangeDirection
  14006: "ReqMotorServiceJoystick", // Joystick
  14007: "ReqMotorServiceJoystickFixedAngle", // Short press the arrow keys with the joystick
  14008: "ReqMotorServiceJoystickStop", // Stop joystick
  14009: "ReqDualCameraLinkage", // Dual camera linkage

  14010: "ReqMotorRunInPulse", // Motor run in pulse
  14011: "ReqMotorGetPosition", // Motor get Position
  14014: "ReqMotorLevelCalibrationMove", // APK 3.4.1: move during level calibration
  14015: "ReqMotorLevelCalibrationSave", // APK 3.4.1: save level calibration offset
  14016: "ReqMotorLevelCalibrationResetDefault", // APK 3.4.1: reset level calibration

  14800: "ReqStartTrack", // Started tracking
  14801: "ReqStopTrack", // Stop tracking

  14802: "ReqStartSentryMode", // Start Sentinel Mode
  14803: "ReqStopSentryMode", // Stop Sentinel Mode
  14804: "ReqMOTTrack", // Start "Multi-Object Tracking" feature
  14805: "ReqMOTTrackOne", // Telephoto: "Multi-Object Tracking" starts tracking a target (the firmware will return an identification box and ID, and track the target according to the user's click confirmation)
  14806: "ReqStartSentryMode", // Start sentinel UFO mode
  14807: "ReqStopSentryMode", // Stop Sentinel UFO Mode
  14808: "ReqMOTTrackOne", // Wide-angle: "Multi-Object Tracking" starts tracking a specific target (firmware will return an identification box and ID, confirm tracking target based on user clicks)

  15000: "ReqNormalAutoFocus", // Normal mode autofocus
  15001: "ReqManualSingleStepFocus", // Manual single-step focusing
  15002: "ReqManualContinuFocus", // Start manual continuous focus
  15003: "ReqStopManualContinuFocus", // Stop manual continuous focus
  15004: "ReqAstroAutoFocus", // Start astronomical autofocus
  15005: "ReqStopAstroAutoFocus", // Stop astronomical autofocus

  15500: "ReqStartPanoramaByGrid", // Start panorama
  15501: "ReqStopPanorama", // Stop panorama
  15502: "ReqStartPanoramaByEulerRange", // Start panorama Euler Range
  15506: "ReqGetUploadPredict", // APK 3.4.1: estimate panorama upload
  15507: "ReqCompressPanorama", // APK 3.4.1: start panorama compression
  15508: "ReqStopCompressPanorama", // APK 3.4.1: stop panorama compression

  // V3 Commands
  10050: "V3ReqOpenTeleCamera", // V3: Open/close tele camera
  12036: "V3ReqOpenWideCamera", // V3: Open/close wide camera
  11033: "V3ReqSaveStackedImage", // V3: Save stacked image
  11034: "V3ReqListSavedImages", // V3: List saved images
  11039: "V3ReqStatusPolling", // V3: Status polling
  11040: "V3ReqGetAstroParams", // V3: Get astro parameters
  11041: "V3ReqSetAstroParams", // V3: Set astro parameters
  11043: "V3ReqGetExposurePresets", // V3: provisional; APK calls this calibration-frame list
  11045: "V3ReqCaptureCaliFrame", // V3: Start calibration-frame capture
  11046: "V3ReqStopCaptureCaliFrame", // V3: Stop calibration-frame capture
  11047: "V3ReqSetObservationLocation", // V3: Set observation location
  11048: "V3ReqConfirmObservation", // V3: Confirm observation
  13010: "V3ReqSetGPSLocation", // V3: Set GPS location
  15011: "V3ReqFocusInit", // V3: Focus init
  16102: "ReqGetAllShootingSchedule", // V3: Get shooting schedule
  16402: "V3ReqModeQuery", // V3: Mode query
  16403: "V3ReqShootingModeSwitch", // V3: Shooting mode switch
  16404: "V3ReqModeSwitch", // V3: Mode switch
  16405: "ReqGetDeviceStateInfo", // Exact firmware/APK task_center.proto schema
  16700: "V3ReqSetCameraParam", // V3: Set camera param
  16701: "V3ReqSetExposureGain", // V3: Set exposure/gain
  16702: "V3ReqUnknownCameraParam", // V3: Unknown camera param command (pcap-discovered)
  16703: "V3ReqAdjustParam", // V3: Adjust camera param
  16705: "ReqSetGeneralBoolParams", // APK 3.4.1: set general boolean parameter
  16706: "V3ReqStreamControl", // V3: Stream control
  16800: "ReqVoiceCommand", // APK 3.4.1: voice assistant status request
  17000: "ReqLensDefog", // APK 3.4.1: lens defog switch
  17001: "ReqAutoCooling", // APK 3.4.1: automatic cooling switch
  17002: "ReqAutoShutdown", // APK 3.4.1: automatic shutdown switch

  // APK 3.4.1 commands whose request protobufs already exist in this package.
  // Response mappings are intentionally not guessed where the app only exposes
  // an asynchronous notification or an obfuscated response handler.
  11037: "ReqStopCaptureRawLiveStacking", // Fast stop tele live stacking
  11038: "ReqStopCaptureRawLiveStacking", // Fast stop wide live stacking
  12032: "ReqSetRtspBitRateType", // Set wide RTSP bitrate type
  12035: "ReqSetWBSence", // Set wide white-balance scene
  15014: "ReqNormalAutoFocus", // Wide normal autofocus
  15015: "ReqManualSingleStepFocus", // Wide manual single-step focus
  15016: "ReqManualContinuFocus", // Wide manual continuous focus
  15017: "ReqStopManualContinuFocus", // Stop wide continuous focus
  15018: "ReqAstroAutoFocus", // Wide astronomy autofocus
  15019: "ReqStopAstroAutoFocus", // Stop wide astronomy autofocus
  15029: "ReqManualSingleStepFocus", // Guide manual single-step focus
  15030: "ReqManualContinuFocus", // Guide manual continuous focus
  15031: "ReqStopManualContinuFocus", // Stop guide continuous focus
  15032: "ReqAstroAutoFocus", // Guide astronomy autofocus
  15034: "ReqStopAstroAutoFocus", // Stop guide astronomy autofocus
  15503: "ReqStartPanoramaStitchUpload", // Start panorama stitch upload
  15504: "ReqStopPanoramaStitchUpload", // Stop panorama stitch upload
  15505: "ReqStopPanoramaStitchUpload", // Query current upload state (empty payload)
  16100: "ReqSyncShootingSchedule", // Synchronize a shooting schedule
  16101: "ReqCancelShootingSchedule", // Cancel a shooting schedule
  16103: "ReqGetShootingTaskById", // Get schedule by ID
  16105: "ReqReplaceShootingSchedule", // Replace a shooting schedule
  16106: "ReqUnlockShootingSchedule", // Unlock a shooting schedule
  16107: "ReqLockShootingSchedule", // Lock a shooting schedule
  16108: "ReqDeleteShootingSchedule", // Delete a shooting schedule
  16900: "ReqSetExp", // Set guide-camera exposure
  16902: "ReqSetGain", // Set guide-camera gain
};

export const responseMapping = {
  // BLE Class Response
  0: "ResReceiveDataError", // Get Error
  1: "ResGetconfig", // Get WiFi configuration
  2: "ResAp", // Configure WiFi AP mode
  3: "ResSta", // Configure WiFi STA mode
  4: "ResSetblewifi", // Configure BLE wifi
  5: "ResReset", // Reset Bluetooth WiFi
  6: "ResWifilist", // Get WiFi list
  7: "ResGetsysteminfo", // Obtain device information
  8: "ResCheckFile", // Check File

  10000: "ComResponse", // Turn on the camera
  10001: "ComResponse", // Turn off the camera
  10002: "ComResponse", // Take photos
  10003: "ComResponse", // Start continuous shooting
  10004: "ComResponse", // Stop continuous shooting
  10005: "ComResponse", // Start recording
  10006: "ComResponse", // Stop recording
  10007: "ComResponse", // Set exposure mode
  10008: "ComResponse", // Acquire exposure mode
  10009: "ComResponse", // Set exposure value
  10010: "ComResponse", // Get exposure value
  10011: "ComResponse", // Set gain mode
  10012: "ComResponse", // Acquisition gain mode
  10013: "ComResponse", // Set gain value
  10014: "ComResponse", // Get gain value
  10015: "ComResponse", // Set brightness
  10016: "ComResponse", // Acquire brightness
  10017: "ComResponse", // Set contrast
  10018: "ComResponse", // Get contrast
  10019: "ComResponse", // Set saturation
  10020: "ComResponse", // Acquire saturation
  10021: "ComResponse", // Set tone
  10022: "ComResponse", // Get hue
  10023: "ComResponse", // Set sharpness
  10024: "ComResponse", // Acquire sharpness
  10025: "ComResponse", // Set white balance mode
  10026: "ComResponse", // Acquire white balance mode
  10027: "ComResponse", // Set white balance scene
  10028: "ComResponse", // Get white balance scene
  10029: "ComResponse", // Set the white balance color temperature value
  10030: "ComResponse", // Obtain the white balance color temperature value
  10031: "ComResponse", // Set IRCUT
  10032: "ComResponse", // Get IRCUT status
  10033: "ComResponse", // Start time-lapse photography
  10034: "ComResponse", // Stop time-lapse photography
  10035: "ComResponse", // Set all parameters
  10036: "ResGetAllParams", // Get all parameters
  10037: "ComResponse", // Set feature parameters
  10038: "ResGetAllFeatureParams", // Get all feature parameters
  10039: "ComResponse", // Get the working status of the whole machine
  10040: "ComResponse", // Set jpg preview quality

  10041: "ComResponse", // Shoot RAW image
  10042: "ComResponse", // Set rtsp preview bit rate type

  11000: "ComResponse", // Start calibration
  11001: "ComResponse", // Stop calibration
  11002: "ComResponse", // Start GOTO Deep Space Object
  11003: "ComResponse", // Start GOTO Solar System Target
  11004: "ComResponse", // Stop GOTO
  11005: "ResAstroShooting", // Start stacking; includes dark-temperature warning context
  11006: "ComResponse", // Stop overlay
  11007: "ComResponse", // Start shooting dark scenes
  11008: "ComResponse", // Stop filming darkfield
  11009: "ResCheckDarkFrame", // Inquire about the dark field that has been shot
  11010: "ComResponse", // GO LIVE interface
  11011: "ComResponse", // Start tracking the sun and moon
  11012: "ComResponse", // Stop tracking the sun and moon

  11013: "ResOneClickGoto ", // One-click GOTO deep space celestial body
  11014: "ResOneClickGoto ", // One-click GOTO solar system target
  11015: "ComResponse", // Stop one-click GOTO
  11016: "ComResponse", // Start wide-angle overlay
  11017: "ComResponse", // Stop wide-angle overlay
  11018: "ResStartEqSolving ", // Start EQ verification
  11019: "ComResponse", // Stop EQ verification
  11020: "ComResponse", // Wide-angle GO LIVE interface

  11021: "ComResponse", // Start shooting the dark field with specified parameters (manually set exposure, gain, binning).
  11022: "ComResponse", // Stop shooting the dark field with specified parameters
  11023: "ResGetDarkFrameInfoList", // Query the list of recorded dark scenes
  11024: "ResDelDarkFrameList", // Delete the specified dark field list
  11025: "ComResponse", // Start shooting wide-angle dark field with specified parameters (manually set exposure and gain. Binning is fixed to 1 internally, setting does not work).
  11026: "ComResponse", // Stop shooting dark field with wide-angle specified parameters
  11027: "ResGetWideDarkFrameInfoList", // Query the list of wide-angle dark scenes taken
  11028: "ResDelWideDarkFrameList", // Delete the specified wide-angle dark field list
  12000: "ComResponse", // Turn on the camera
  12001: "ComResponse", // Turn off the camera
  12002: "ComResponse", // Set exposure mode
  12003: "ComResponse", // Acquire exposure mode
  12004: "ComResponse", // Set exposure value
  12005: "ComResponse", // Get exposure value
  12006: "ComResponse", // Set gain
  12007: "ComResponse", // Acquisition gain
  12008: "ComResponse", // Set brightness
  12009: "ComResponse", // Acquire brightness
  12010: "ComResponse", // Set contrast
  12011: "ComResponse", // Get contrast
  12012: "ComResponse", // Set saturation
  12013: "ComResponse", // Acquire saturation
  12014: "ComResponse", // Set tone
  12015: "ComResponse", // Get hue
  12016: "ComResponse", // Set sharpness
  12017: "ComResponse", // Acquire sharpness
  12018: "ComResponse", // Set white balance mode
  12019: "ComResponse", // Acquire white balance mode
  12020: "ComResponse", // Set white balance color temperature
  12021: "ComResponse", // Obtain white balance color temperature
  12022: "ComResponse", // Take photos
  12023: "ComResponse", // Continuous shooting
  12024: "ComResponse", // Stop continuous shooting
  12025: "ComResponse", // Start time-lapse photography
  12026: "ComResponse", // Stop time-lapse photography
  12027: "ResGetAllParams", // Get all parameters
  12028: "ComResponse", // Set all parameters

  12030: "ComResponse", // Start wide recording
  12031: "ComResponse", // Stop wide recording

  13000: "ComResponse", // Set the system time
  13001: "ComResponse", // Set the time zone
  13002: "ComResponse", // Set MTP mode
  13003: "ComResponse", // Set CPU mode
  13004: "ComResponse", // Set HOST SLAVE mode

  13500: "ComResponse", // Turn on the ring light
  13501: "ComResponse", // Turn off the ring light
  13502: "ComResponse", // Shut down
  13503: "ComResponse", // Turn on the battery indicator
  13504: "ComResponse", // Turn off battery indicator =
  13505: "ComResponse", // Restart

  14000: "ResMotor", // Motor motion
  14001: "ResMotor", // Motor motion to
  14002: "ResMotor", // Motor stop
  14003: "ResMotor", // Motor Reset
  14004: "ResMotor", // Motor Change Speed
  14005: "ResMotor", // Motor ChangeDirection
  14006: "ComResponse", // Joystick
  14007: "ComResponse", // Short press the arrow keys with the joystick
  14008: "ComResponse", // Stop joystick
  14009: "ComResponse", // Dual camera linkage

  14010: "ResMotor", // Motor run in pulse
  14011: "ResMotorPosition", // Motor get Position

  14800: "ComResponse", // Started tracking
  14801: "ComResponse", // Stop tracking
  14802: "ComResponse", // Start Sentinel Mode
  14803: "ComResponse", // Stop Sentinel Mode
  14804: "ComResponse", // Start "Multi-Object Tracking" feature
  14805: "ComResponse", // Telephoto: "Multi-Object Tracking" starts tracking a target (the firmware will return an identification box and ID, and track the target according to the user's click confirmation)
  14806: "ComResponse", // Start sentinel UFO mode
  14807: "ComResponse", // Stop Sentinel UFO Mode
  14808: "ComResponse", // Wide-angle: "Multi-Object Tracking" starts tracking a specific target (firmware will return an identification box and ID, confirm tracking target based on user clicks)

  15000: "ComResponse", // Normal mode autofocus
  15001: "ComResponse", // Manual single-step focusing
  15002: "ComResponse", // Start manual continuous focus
  15003: "ComResponse", // Stop manual continuous focus
  15004: "ComResponse", // Start astronomical autofocus
  15005: "ComResponse", // Stop astronomical autofocus

  15500: "ComResponse", // Start panorama
  15501: "ComResponse", // Stop panorama
  15502: "ComResponse", // Start panorama Euler Range

  // V3 Responses
  10050: "ComResponse", // V3: Open/close tele camera
  12036: "ComResponse", // V3: Open/close wide camera
  11033: "V3ResSaveStackedImage", // V3: Save stacked image
  11034: "ComResponse", // V3: List saved images
  11036: "ComResponse", // V3: Save complete
  11039: "ComResponse", // V3: Status polling
  11040: "V3ResGetAstroParams", // V3: Get astro parameters
  11041: "V3ResSetAstroParams", // V3: Set astro parameters
  11043: "V3ResGetExposurePresets", // V3: provisional; raw response needs validation
  11045: "ComResponse", // V3: Start calibration-frame capture
  11046: "ComResponse", // V3: Stop calibration-frame capture
  11047: "ComResponse", // V3: Set observation location
  11048: "ComResponse", // V3: Confirm observation
  11050: "ComResponse", // V3: Continue after a recoverable shooting warning
  13010: "ComResponse", // V3: Set GPS location
  15011: "V3ResFocusInit", // V3: Focus init
  16102: "ResGetAllShootingSchedule", // V3: Get shooting schedule
  16402: "V3ResModeQuery", // V3: Mode query
  16403: "V3ResShootingModeSwitch", // V3: Shooting mode switch
  16404: "V3ResModeSwitch", // V3: Mode switch
  16405: "ResGetDeviceStateInfo", // Exact firmware/APK task_center.proto schema
  16700: "ComResponse", // V3: Set camera param
  16701: "ComResponse", // V3: Set exposure/gain
  16702: "ComResponse", // V3: Unknown camera param command (pcap-discovered)
  16703: "ComResponse", // V3: Adjust camera param
  16706: "ComResponse", // V3: Stream control
};

export const notifyMapping = {
  15200: "ResNotifyPictureMatching", // Telephoto wide-angle image matching
  15201: "ComResWithInt", // Battery Notification
  15202: "ComResWithInt", // Charge status notification
  15203: "ResNotifySDcardInfo", // SD card capacity notification
  15204: "ResNotifyRecordTime", // Recording time
  15205: "ResNotifyTimeLapseOutTime", // Telephoto time-lapse photography time
  15206: "ResNotifyOperationState", // Dark field shooting state
  15207: "ResNotifyProgressCaptureRawDark", // Dark field shooting progress
  15208: "ResNotifyOperationState", // Astronomical overlay shooting status
  15209: "ResNotifyProgressCaptureRawLiveStacking", // Astronomical overlay shooting progress
  15210: "ResNotifyStateAstroCalibration", // Astronomical calibration status
  15211: "ResNotifyStateAstroGoto", // Astronomical GOTO status
  15212: "ResNotifyStateAstroTracking", // Astronomical tracking status
  15213: "ResNotifyParam", // Telephoto parameter echo
  15214: "ResNotifyParam", // Wide-angle parametric echo
  15215: "ResNotifyCamFunctionState", // Telephoto functional status
  15216: "ResNotifyCamFunctionState", // Wide-angle functional status
  15217: "ResNotifyParam", // Feature parameter echo
  15218: "ResNotifyBurstProgress", // Telephoto continuous shooting progress
  15219: "ResNotifyPanoramaProgress", // Telephoto panoramic shooting progress
  15220: "ResNotifyBurstProgress", // Wide-angle continuous shooting progress
  15221: "ResNotifyRgbState", // RGB Ring Light Status
  15222: "ResNotifyPowerIndState", // Power indicator status
  15223: "ResNotifyHostSlaveMode", // Leader/follower mode notification
  15224: "ResNotifyMTPState", // MTP mode notification
  15225: "ResNotifyTrackResult", // Tracking result notification
  15226: "ResNotifyTimeLapseOutTime", // Wide-angle time-lapse photography time
  15227: "ResNotifyCPUMode", // CPU mode
  15228: "ResNotifyStateAstroTrackingSpecial", // Sun and moon tracking status
  15229: "ResNotifyPowerOff", // Shutdown notification
  15230: "ResNotifyAlbumUpdate", // New Media Created
  15231: "ResNotifyStateSentryMode", // Sentinel mode status
  15232: "ResNotifyTrackResult", // Sentinel mode tracking box result notification
  15233: "ResNotifyOneClickGotoState", // One-click GOTO status
  15234: "ResNotifyStreamType", // Image type notification
  15235: "ResNotifyRecordTime", // Wide Recording time
  15236: "ResNotifyOperationState", // Astronomical overlay wide shooting status
  15237: "ResNotifyProgressCaptureRawLiveStacking", // Astronomical overlay wide shooting progress
  15238: "ResNotifyMultiTrackResult", // Multi-Object Tracking Result Notification
  15239: "ResNotifyEqSolvingState", // EQ check status
  15240: "ResNotifyStateSentryMode", // Sentinel-UFO Mode Status
  15241: "ResNotifyLongExpPhotoProgress", // Telephoto long exposure progress
  15242: "ResNotifyLongExpPhotoProgress", // Wide-angle long exposure progress
  15243: "ResNotifyTemperature", // Temperature
  // 15244 is panorama compression progress. APK 3.4.1 assigns both panorama
  // upload progress and upload complete to 15245, so a single static decoder
  // cannot safely choose between their two protobuf schemas.
  15247: "ResNotifyOperationState", // Wide-angle dark field shooting state
  15248: "ResNotifyShootingScheduleResultAndState", // Shooting plan results and status notifications
  15249: "ResNotifyShootingTaskState", // Shooting task status notification
  15250: "ResNotifySkySeacherState", // Sky detection status
  //  CMD_NOTIFY_WIDE_MULTI_TRACK_RESULT = 15251; // Wide-angle multi-target box result notification
  //  CMD_NOTIFY_WIDE_TRACK_RESULT = 15252; // Wide-angle single target box result notification
  15256: "CalibrationResult", // V3: successful mount calibration result (azi/alt)
  15257: "ResNotifyFocus", // Focus Position
  15263: "ProgressCaptureMosaic", // APK 3.4.1: direct Tele Mosaic progress

  // V3 Notifications
  11036: "ComResponse", // V3: Save complete notification
  15255: "V3ResNotifyExposureProgress", // V3: Per-frame exposure countdown
  15261: "V3ResNotifyDeviceState", // V3: Device state notification
  15262: "V3ResNotifyStateLatch", // V3: State latch (pcap-discovered)
  15264: "V3ResNotifyCameraParamState", // V3: Camera parameter state
  15267: "V3ResNotifyModeChange", // V3: Mode change notification
  15270: "V3ResNotifyStackingData", // V3: Stacking data notification
  15273: "V3ResNotifyPhotoState", // V3: Normal photo state
  15274: "V3ResNotifyBurstState", // V3: Burst capture state
  15275: "V3ResNotifyVideoState", // V3: Video recording state
  15276: "V3ResNotifyTimelapseState", // V3: Timelapse state
  15278: "V3ResNotifyAutoFocusState", // V3: AutoFocus state
  15280: "V3ResNotifyAutoFocusStateAlt", // V3: AutoFocus state alternate (pcap-discovered)
  15285: "V3ResNotifyPhotoBurstProgress", // V3: Photo/burst progress
  15286: "V3ResNotifyVideoProgress", // V3: Video recording progress
  15287: "V3ResNotifyTimelapseProgress", // V3: Timelapse progress
  15288: "V3ResNotifyExposureDuration", // V3: Exposure duration telemetry (pcap-discovered)
  15290: "V3ResNotifyCaliFrameState", // APK 3.4.1: calibration-frame state
  15291: "V3ResNotifyCaliFrameProgress", // APK 3.4.1: calibration-frame progress
  15292: "V3ResNotifyTemperature2", // V3: Temperature2
  15296: "V3ResNotifyObservationState", // V3: Observation state
};

export const notifyResponseMapping = {
  10000: "ComResponse", // Turn on the camera
  10001: "ComResponse", // Turn off the camera
  10002: "ComResponse", // Take photos
  10003: "ComResponse", // Start continuous shooting
  10004: "ComResponse", // Stop continuous shooting
  10005: "ComResponse", // Start recording
  10006: "ComResponse", // Stop recording
  10007: "ComResponse", // Set exposure mode
  10008: "ComResWithInt", // Acquire exposure mode
  10009: "ComResponse", // Set exposure value
  10010: "ComResWithDouble", // Get exposure value
  10011: "ComResponse", // Set gain mode
  10012: "ComResWithInt", // Acquisition gain mode
  10013: "ComResponse", // Set gain value
  10014: "ComResWithInt", // Get gain value
  10015: "ComResponse", // Set brightness
  10016: "ComResWithInt", // Acquire brightness
  10017: "ComResponse", // Set contrast
  10018: "ComResWithInt", // Get contrast
  10019: "ComResponse", // Set saturation
  10020: "ComResWithInt", // Acquire saturation
  10021: "ComResponse", // Set tone
  10022: "ComResWithInt", // Get hue
  10023: "ComResponse", // Set sharpness
  10024: "ComResWithInt", // Acquire sharpness
  10025: "ComResponse", // Set white balance mode
  10026: "ComResWithInt", // Acquire white balance mode
  10027: "ComResponse", // Set white balance scene
  10028: "ComResWithInt", // Get white balance scene
  10029: "ComResponse", // Set the white balance color temperature value
  10030: "ComResWithInt", // Obtain the white balance color temperature value
  10031: "ComResponse", // Set IRCUT
  10032: "ComResWithInt", // Get IRCUT status
  10033: "ComResponse", // Start time-lapse photography
  10034: "ComResponse", // Stop time-lapse photography
  10035: "ComResponse", // Set all parameters
  10036: "ResGetAllParams", // Get all parameters
  10037: "ComResponse", // Set feature parameters
  10038: "ResGetAllFeatureParams", // Get all feature parameters
  10039: "ComResponse", // Get the working status of the whole machine
  10040: "ComResponse", // Set jpg preview quality

  10041: "ComResWithInt", // Shoot RAW image
  10042: "ComResponse", // Set rtsp preview bit rate type

  11000: "ComResponse", // Start calibration
  11001: "ComResponse", // Stop calibration
  11002: "ComResponse", // Start GOTO Deep Space Object
  11003: "ComResponse", // Start GOTO Solar System Target
  11004: "ComResponse", // Stop GOTO
  11005: "ComResponse", // Start stacking
  11006: "ComResponse", // Stop overlay
  11007: "ComResponse", // Start shooting dark scenes
  11008: "ComResponse", // Stop filming darkfield
  11009: "ResCheckDarkFrame", // Inquire about the dark field that has been shot
  11010: "ComResponse", // GO LIVE interface
  11011: "ComResponse", // Start tracking the sun and moon
  11012: "ComResponse", // Stop tracking the sun and moon

  11013: "ResOneClickGoto", // One-click GOTO deep space celestial body
  11014: "ResOneClickGoto", // One-click GOTO solar system target
  11015: "ComResponse", // Stop one-click GOTO
  11016: "ComResponse", // Start wide-angle overlay
  11017: "ComResponse", // Stop wide-angle overlay
  11018: "ResStartEqSolving", // Start EQ verification
  11019: "ComResponse", // Stop EQ verification
  11020: "ComResponse", // Wide-angle GO LIVE interface

  11021: "ComResponse", // Start shooting the dark field with specified parameters (manually set exposure, gain, binning).
  11022: "ComResponse", // Stop shooting the dark field with specified parameters
  11023: "ResGetDarkFrameInfoList", // Query the list of recorded dark scenes
  11024: "ResDelDarkFrameList", // Delete the specified dark field list
  11025: "ComResponse", // Start shooting wide-angle dark field with specified parameters (manually set exposure and gain. Binning is fixed to 1 internally, setting does not work).
  11026: "ComResponse", // Stop shooting dark field with wide-angle specified parameters
  11027: "ResGetWideDarkFrameInfoList", // Query the list of wide-angle dark scenes taken
  11028: "ResDelWideDarkFrameList", // Delete the specified wide-angle dark field list

  12000: "ComResponse", // Turn on the camera
  12001: "ComResponse", // Turn off the camera
  12002: "ComResponse", // Set exposure mode
  12003: "ComResWithInt", // Acquire exposure mode
  12004: "ComResponse", // Set exposure value
  12005: "ComResWithDouble", // Get exposure value
  12006: "ComResponse", // Set gain
  12007: "ComResWithInt", // Acquisition gain
  12008: "ComResponse", // Set brightness
  12009: "ComResWithInt", // Acquire brightness
  12010: "ComResponse", // Set contrast
  12011: "ComResWithInt", // Get contrast
  12012: "ComResponse", // Set saturation
  12013: "ComResWithInt", // Acquire saturation
  12014: "ComResponse", // Set tone
  12015: "ComResWithInt", // Get hue
  12016: "ComResponse", // Set sharpness
  12017: "ComResWithInt", // Acquire sharpness
  12018: "ComResponse", // Set white balance mode
  12019: "ComResWithInt", // Acquire white balance mode
  12020: "ComResponse", // Set white balance color temperature
  12021: "ComResWithInt", // Obtain white balance color temperature
  12022: "ComResponse", // Take photos
  12023: "ComResponse", // Continuous shooting
  12024: "ComResponse", // Stop continuous shooting
  12025: "ComResponse", // Start time-lapse photography
  12026: "ComResponse", // Stop time-lapse photography
  12027: "ResGetAllParams", // Get all parameters
  12028: "ComResponse", // Set all parameters

  12030: "ComResponse", // Start wide recording
  12031: "ComResponse", // Stop wide recording

  13000: "ComResponse", // Set the system time
  13001: "ComResponse", // Set the time zone
  13002: "ComResponse", // Set MTP mode
  13003: "ComResponse", // Set CPU mode
  13004: "ComResponse", // Set HOST SLAVE mode

  13500: "ComResponse", // Turn on the ring light
  13501: "ComResponse", // Turn off the ring light
  13502: "ComResponse", // Shut down
  13503: "ComResponse", // Turn on the battery indicator
  13504: "ComResponse", // Turn off battery indicator =
  13505: "ComResponse", // Restart

  14000: "ReqMotorRun", // Motor motion
  14001: "ResMotorPosition", // Motor motion to
  14002: "ResMotor", // Motor stop
  14003: "ResMotor", // Motor Reset
  14004: "ResMotor", // Motor Change Speed
  14005: "ResMotor", // Motor ChangeDirection
  14006: "ComResponse", // Joystick
  14007: "ComResponse", // Short press the arrow keys with the joystick
  14008: "ComResponse", // Stop joystick
  14009: "ComResponse", // Dual camera linkage

  14010: "ResMotor", // Motor run in pulse
  14011: "ResMotorPosition", // Motor get Position

  14800: "ComResponse", // Started tracking
  14801: "ComResponse", // Stop tracking
  14802: "ComResponse", // Start Sentinel Mode (Pack
  14803: "ComResponse", // Stop Sentinel Mode
  14804: "ComResponse", // Start "Multi-Object Tracking" feature
  14805: "ComResponse", // Telephoto: "Multi-Object Tracking" starts tracking a target (the firmware will return an identification box and ID, and track the target according to the user's click confirmation)
  14806: "ComResponse", // Start sentinel UFO mode
  14807: "ComResponse", // Stop Sentinel UFO Mode
  14808: "ComResponse", // Wide-angle: "Multi-Object Tracking" starts tracking a specific target (firmware will return an identification box and ID, confirm tracking target based on user clicks)

  15000: "ComResponse", // Normal mode autofocus
  15001: "ComResponse", // Manual single-step focusing
  15002: "ComResponse", // Start manual continuous focus
  15003: "ComResponse", // Stop manual continuous focus
  15004: "ComResponse", // Start astronomical autofocus
  15005: "ComResponse", // Stop astronomical autofocus

  15500: "ComResponse", // Start panorama
  15501: "ComResponse", // Stop panorama
  15502: "ComResponse", // Start panorama Euler Range

  // V3 Notification Responses
  10050: "ComResponse", // V3: Open/close tele camera
  12036: "ComResponse", // V3: Open/close wide camera
  11033: "V3ResSaveStackedImage", // V3: Save stacked image
  11036: "ComResponse", // V3: Save complete
  11048: "ComResponse", // V3: Confirm observation
  16402: "V3ResModeQuery", // V3: Mode query
  16403: "V3ResShootingModeSwitch", // V3: Shooting mode switch
  16404: "V3ResModeSwitch", // V3: Mode switch
  16702: "ComResponse", // V3: Unknown camera param command (pcap-discovered)
  16703: "ComResponse", // V3: Adjust camera param
};

const classStateMappings = {
  "Dwarfii_Api.ResNotifyStateAstroGoto:0": "ASTRO_STATE_IDLE",
  "Dwarfii_Api.ResNotifyStateAstroCalibration:0": "ASTRO_STATE_IDLE",
  "Dwarfii_Api.ResNotifyStateAstroTracking:0": "OPERATION_STATE_IDLE",
  "Dwarfii_Api.ResNotifyStateAstroTrackingSpecial:0": "OPERATION_STATE_IDLE",
  "Dwarfii_Api.ResNotifyOperationState:0": "OPERATION_STATE_IDLE",
  "Dwarfii_Api.ResNotifyCamFunctionState:0": "OPERATION_STATE_IDLE",
  "Dwarfii_Api.ResNotifyRgbState:0": "OFF",
  "Dwarfii_Api.ResNotifyRgbState:1": "ON",
  "Dwarfii_Api.ResNotifyPowerIndState:0": "OFF",
  "Dwarfii_Api.ResNotifyPowerIndState:1": "ON",
};

const classModeMappings = {
  "Dwarfii_Api.ResNotifyHostSlaveMode:0": "HOST",
  "Dwarfii_Api.ResNotifyHostSlaveMode:1": "SLAVE",
  "Dwarfii_Api.ResNotifyMTPState:0": "OFF",
  "Dwarfii_Api.Dwarfii_Api.ResNotifyMTPState:1": "ON",
  "Dwarfii_Api.ResNotifyCPUMode:0": "Normal",
  "Dwarfii_Api.ResNotifyCPUMode:1": "Performance",
  "Dwarfii_Api.ReqSetExpMod:0": "Auto",
  "Dwarfii_Api.ReqSetExpMod:1": "Manual",
  "Dwarfii_Api.ReqSetGainMode:0": "Auto",
  "Dwarfii_Api.ReqSetGainMode:1": "Manual",
  "Dwarfii_Api.ReqSetIrCut:0": "CUT",
  "Dwarfii_Api.ReqSetIrCut:1": "PASS",
  "Dwarfii_Api.ReqSetWBMode:0": "ColorTemperature",
  "Dwarfii_Api.ReqSetWBMode:1": "SceneMode",
  "Dwarfii_Api.ReqAstroAutoFocus:0": "Auto",
  "Dwarfii_Api.ReqAstroAutoFocus:1": "Manual",
  "Dwarfii_Api.Dwarfii_Api.ReqSetMtpMode:0": "OFF",
  "Dwarfii_Api.ReqSetMtpMode:1": "ON",
  "Dwarfii_Api.ReqSetCpuMode:0": "Normal",
  "Dwarfii_Api.ReqSetCpuMode:1": "Performance",
  "Dwarfii_Api.ReqSetHostSlaveMode:0": "HOST",
  "Dwarfii_Api.ReqSetHostSlaveMode:1": "SLAVE",
};

export function getClassStateMappings(className, value) {
  const key = `${className + ":" + value}`;
  return classStateMappings[key] || "";
}

export function getClassModeMappings(className, value) {
  const key = `${className + ":" + value}`;
  return classModeMappings[key] || "";
}
