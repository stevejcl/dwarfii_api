# Canonical current schema comparison

Generated with `node scripts/current-schema-compare.mjs`. This report compares source definitions, not generated code or hardware behavior.

Canonical source: [dwarfAlp b5a56f00519a1b76ab36d6e445e1d332216816f6](https://github.com/acocalypso/dwarfAlp/tree/b5a56f00519a1b76ab36d6e445e1d332216816f6/src/dwarf_alpaca/proto). SHA-256 hashes of unchanged source blobs are recorded in `src/current_proto/provenance.json`.

The legacy SDK root is intentionally retained for external compatibility. Dwarfium's current protocol uses the separately generated `dwarfCurrent` root; legacy and current types do not overwrite one another.

Empty compatibility stubs and the provisional command 15255 schema are not imported. Merely retaining a legacy declaration or command enum does not establish that a current device supports it.

## Coverage

| Source | Files | Messages | Fields | Enums | Enum values |
| --- | ---: | ---: | ---: | ---: | ---: |
| Legacy SDK | 22 | 306 | 623 | 24 | 614 |
| Canonical current | 17 | 428 | 957 | 28 | 532 |

Equality includes every field number/name/type, fully qualified type reference, repetition/map key, oneof membership, and explicit proto3 optional presence. Enum equality includes numeric values, declared aliases and their order. Moving a message into a package is not reported as a false short-name match.

| Definition | Exact | Different | Legacy / compatibility only | Current only |
| --- | ---: | ---: | ---: | ---: |
| Messages | 157 | 27 | 122 | 244 |
| Enums | 13 | 4 | 7 | 11 |

## Messages

| Fully qualified definition | Classification |
| --- | --- |
| `CaliFrameInfo` | CURRENT ONLY |
| `CalibrationResult` | LEGACY / COMPATIBILITY ONLY |
| `CaptureCaliFrameTaskParam` | CURRENT ONLY |
| `CaptureRawState` | LEGACY / COMPATIBILITY ONLY |
| `ClientParams` | CURRENT ONLY |
| `CmosTemperature` | LEGACY / COMPATIBILITY ONLY |
| `ComDwarfMsg` | CURRENT ONLY |
| `ComResWithDouble` | EXACT |
| `ComResWithInt` | EXACT |
| `ComResWithString` | EXACT |
| `ComResponse` | EXACT |
| `CommonParam` | EXACT |
| `ConnectionStateInfo` | CURRENT ONLY |
| `DeviceStateInfo` | DIFFERENT |
| `DwarfEcho` | CURRENT ONLY |
| `DwarfPing` | CURRENT ONLY |
| `ExclusiveCameraState` | DIFFERENT |
| `ExclusiveFocusMotorState` | CURRENT ONLY |
| `ExclusiveMotionMotorState` | CURRENT ONLY |
| `FatigueTestCameraParam` | CURRENT ONLY |
| `FatigueTestIrcutParam` | CURRENT ONLY |
| `FatigueTestLightsParam` | CURRENT ONLY |
| `FatigueTestMotorParam` | CURRENT ONLY |
| `FatigueTestParam` | CURRENT ONLY |
| `FocusMotorStateInfo` | CURRENT ONLY |
| `IspModuleState` | CURRENT ONLY |
| `MakeFitsThumbTaskParam` | CURRENT ONLY |
| `MotionMotorStateInfo` | CURRENT ONLY |
| `NifAP` | CURRENT ONLY |
| `NifSTA` | CURRENT ONLY |
| `OneClickGotoPhaseState` | LEGACY / COMPATIBILITY ONLY |
| `PanoramaUploadParam` | CURRENT ONLY |
| `ProgressCaptureMosaic` | LEGACY / COMPATIBILITY ONLY |
| `QuikSetInfo` | CURRENT ONLY |
| `RepostprocessTaskParam` | CURRENT ONLY |
| `ReqAp` | DIFFERENT |
| `ReqAstroAutoFocus` | EXACT |
| `ReqAutoCooling` | EXACT |
| `ReqAutoShutdown` | EXACT |
| `ReqBurstPhoto` | EXACT |
| `ReqCancelShootingSchedule` | EXACT |
| `ReqCaptureCaliFrame` | CURRENT ONLY |
| `ReqCaptureDarkFrame` | EXACT |
| `ReqCaptureDarkFrameWithParam` | EXACT |
| `ReqCaptureGuideBias` | CURRENT ONLY |
| `ReqCaptureGuideFlat` | CURRENT ONLY |
| `ReqCaptureRawLiveStacking` | EXACT |
| `ReqCaptureTeleBias` | CURRENT ONLY |
| `ReqCaptureTeleDark` | CURRENT ONLY |
| `ReqCaptureTeleFlat` | CURRENT ONLY |
| `ReqCaptureWideBias` | CURRENT ONLY |
| `ReqCaptureWideDark` | CURRENT ONLY |
| `ReqCaptureWideDarkFrameWithParam` | LEGACY / COMPATIBILITY ONLY |
| `ReqCaptureWideFlat` | CURRENT ONLY |
| `ReqCaptureWideRawLiveStacking` | DIFFERENT |
| `ReqCheckDarkFrame` | EXACT |
| `ReqCheckFile` | EXACT |
| `ReqCloseCamera` | EXACT |
| `ReqClosePowerInd` | EXACT |
| `ReqCloseRgb` | EXACT |
| `ReqCompressPanorama` | EXACT |
| `ReqContinueShooting` | EXACT |
| `ReqContinueTrack` | EXACT |
| `ReqDelCaliFrameList` | EXACT |
| `ReqDelDarkFrame` | DIFFERENT |
| `ReqDelDarkFrameList` | EXACT |
| `ReqDelWideDarkFrame` | LEGACY / COMPATIBILITY ONLY |
| `ReqDelWideDarkFrameList` | LEGACY / COMPATIBILITY ONLY |
| `ReqDeleteShootingSchedule` | EXACT |
| `ReqDeviceActivateSuccessfull` | LEGACY / COMPATIBILITY ONLY |
| `ReqDeviceActivateWriteFile` | LEGACY / COMPATIBILITY ONLY |
| `ReqDisableAllIspProcessing` | EXACT |
| `ReqDisableDeviceActivate` | LEGACY / COMPATIBILITY ONLY |
| `ReqDualCameraLinkage` | EXACT |
| `ReqEnableAllIspProcessing` | EXACT |
| `ReqEnterCamera` | CURRENT ONLY |
| `ReqFactoryDualPeSwitchState` | CURRENT ONLY |
| `ReqFactoryFanState` | CURRENT ONLY |
| `ReqFactoryGetRollHorizontalDegree` | CURRENT ONLY |
| `ReqFactoryGyroAttitude` | CURRENT ONLY |
| `ReqFactoryHeadTapeState` | CURRENT ONLY |
| `ReqFactoryMoveIrcutFloor` | CURRENT ONLY |
| `ReqFactorySetRollHorizontalDegree` | CURRENT ONLY |
| `ReqFactorySetRollHorizontalPosition` | CURRENT ONLY |
| `ReqFactorySetUsbMode` | CURRENT ONLY |
| `ReqFactoryTecState` | CURRENT ONLY |
| `ReqFactoryTestSuccess` | CURRENT ONLY |
| `ReqFastStopCaptureRawLiveStacking` | CURRENT ONLY |
| `ReqFastStopCaptureWideRawLiveStacking` | CURRENT ONLY |
| `ReqFocusMotorBacklashTest` | CURRENT ONLY |
| `ReqGetAllFeatureParams` | EXACT |
| `ReqGetAllParams` | EXACT |
| `ReqGetAllShootingSchedule` | EXACT |
| `ReqGetAstroShootingTime` | CURRENT ONLY |
| `ReqGetBrightness` | EXACT |
| `ReqGetCaliFrameList` | CURRENT ONLY |
| `ReqGetContrast` | EXACT |
| `ReqGetDarkFrameList` | EXACT |
| `ReqGetDeviceActivateInfo` | LEGACY / COMPATIBILITY ONLY |
| `ReqGetDeviceStateInfo` | EXACT |
| `ReqGetELE` | CURRENT ONLY |
| `ReqGetEMMCValue` | CURRENT ONLY |
| `ReqGetExp` | EXACT |
| `ReqGetExpMode` | EXACT |
| `ReqGetFIRMWAREVERISON` | CURRENT ONLY |
| `ReqGetFactoryTestState` | CURRENT ONLY |
| `ReqGetGain` | EXACT |
| `ReqGetGainMode` | EXACT |
| `ReqGetGyroAttitude` | CURRENT ONLY |
| `ReqGetHue` | EXACT |
| `ReqGetIrcut` | EXACT |
| `ReqGetIspModuleState` | CURRENT ONLY |
| `ReqGetJpgQuality` | EXACT |
| `ReqGetMCUUART` | CURRENT ONLY |
| `ReqGetNTCValue` | CURRENT ONLY |
| `ReqGetPanoramaCurrentUploadState` | CURRENT ONLY |
| `ReqGetQuickSetList` | CURRENT ONLY |
| `ReqGetRssi` | CURRENT ONLY |
| `ReqGetSN` | CURRENT ONLY |
| `ReqGetSaturation` | EXACT |
| `ReqGetSharpness` | EXACT |
| `ReqGetShootingScheduleById` | EXACT |
| `ReqGetShootingTaskById` | EXACT |
| `ReqGetSystemWorkingState` | EXACT |
| `ReqGetUploadPredict` | EXACT |
| `ReqGetUserInfinityPos` | CURRENT ONLY |
| `ReqGetWBCT` | EXACT |
| `ReqGetWBMode` | EXACT |
| `ReqGetWBSence` | EXACT |
| `ReqGetWideDarkFrameList` | LEGACY / COMPATIBILITY ONLY |
| `ReqGetconfig` | DIFFERENT |
| `ReqGetsysteminfo` | DIFFERENT |
| `ReqGetwifilist` | DIFFERENT |
| `ReqGoLive` | EXACT |
| `ReqGotoDSO` | DIFFERENT |
| `ReqGotoSolarSystem` | DIFFERENT |
| `ReqIsImageStackable` | CURRENT ONLY |
| `ReqLensDefog` | EXACT |
| `ReqLockShootingSchedule` | EXACT |
| `ReqMOTTrack` | LEGACY / COMPATIBILITY ONLY |
| `ReqMOTTrackOne` | LEGACY / COMPATIBILITY ONLY |
| `ReqManualContinuFocus` | EXACT |
| `ReqManualSingleStepFocus` | EXACT |
| `ReqManualSingleStepFocusForFactory` | CURRENT ONLY |
| `ReqMotorChangeDirection` | EXACT |
| `ReqMotorChangeSpeed` | EXACT |
| `ReqMotorGetPosition` | EXACT |
| `ReqMotorLevelCalibrationMove` | EXACT |
| `ReqMotorLevelCalibrationResetDefault` | EXACT |
| `ReqMotorLevelCalibrationSave` | EXACT |
| `ReqMotorReset` | EXACT |
| `ReqMotorRun` | EXACT |
| `ReqMotorRunInPulse` | EXACT |
| `ReqMotorRunTo` | EXACT |
| `ReqMotorServiceJoystick` | DIFFERENT |
| `ReqMotorServiceJoystickFixedAngle` | DIFFERENT |
| `ReqMotorServiceJoystickStop` | EXACT |
| `ReqMotorStartDeviceAttitudeNotify` | CURRENT ONLY |
| `ReqMotorStop` | EXACT |
| `ReqMotorStopDeviceAttitudeNotify` | CURRENT ONLY |
| `ReqNormalAutoFocus` | EXACT |
| `ReqNotifyPanoramaFraming` | CURRENT ONLY |
| `ReqOneClickGotoDSO` | EXACT |
| `ReqOneClickGotoSolarSystem` | EXACT |
| `ReqOneClickShooting` | DIFFERENT |
| `ReqOneClickShootingParam` | EXACT |
| `ReqOpenCamera` | EXACT |
| `ReqOpenPowerInd` | EXACT |
| `ReqOpenRgb` | EXACT |
| `ReqPasswordEncryption` | CURRENT ONLY |
| `ReqPasswordEncryptionState` | CURRENT ONLY |
| `ReqPauseTrack` | EXACT |
| `ReqPhoto` | EXACT |
| `ReqPhotoRaw` | EXACT |
| `ReqPowerDown` | EXACT |
| `ReqReboot` | EXACT |
| `ReqReplaceShootingSchedule` | EXACT |
| `ReqReset` | DIFFERENT |
| `ReqResetMotorMcu` | CURRENT ONLY |
| `ReqResetPanoramaFraming` | CURRENT ONLY |
| `ReqRestPasswordEncryption` | CURRENT ONLY |
| `ReqSetAUDPLAYSTART` | CURRENT ONLY |
| `ReqSetAUDPLAYSTOP` | CURRENT ONLY |
| `ReqSetAUDSTART` | CURRENT ONLY |
| `ReqSetAUDSTOP` | CURRENT ONLY |
| `ReqSetAllParams` | EXACT |
| `ReqSetBrightness` | EXACT |
| `ReqSetContrast` | EXACT |
| `ReqSetCpuMode` | EXACT |
| `ReqSetExp` | EXACT |
| `ReqSetExpMode` | EXACT |
| `ReqSetExposure` | LEGACY / COMPATIBILITY ONLY |
| `ReqSetFatigueTestMode` | CURRENT ONLY |
| `ReqSetFeatureParams` | EXACT |
| `ReqSetGain` | EXACT |
| `ReqSetGainMode` | EXACT |
| `ReqSetGeneralBoolParams` | LEGACY / COMPATIBILITY ONLY |
| `ReqSetGyroCal` | CURRENT ONLY |
| `ReqSetHue` | EXACT |
| `ReqSetIrCut` | EXACT |
| `ReqSetIspModuleState` | CURRENT ONLY |
| `ReqSetJpgQuality` | EXACT |
| `ReqSetLocation` | CURRENT ONLY |
| `ReqSetLowTempProtectionMode` | CURRENT ONLY |
| `ReqSetMtpMode` | EXACT |
| `ReqSetNdFilter` | CURRENT ONLY |
| `ReqSetPreviewQuality` | CURRENT ONLY |
| `ReqSetQuickSet` | CURRENT ONLY |
| `ReqSetRgb` | CURRENT ONLY |
| `ReqSetRtspBitRateType` | EXACT |
| `ReqSetSN` | CURRENT ONLY |
| `ReqSetSaturation` | EXACT |
| `ReqSetSharpness` | EXACT |
| `ReqSetTime` | EXACT |
| `ReqSetTimezone` | EXACT |
| `ReqSetUserInfinityPos` | CURRENT ONLY |
| `ReqSetVcmCode` | CURRENT ONLY |
| `ReqSetVcmRom` | CURRENT ONLY |
| `ReqSetWBCT` | EXACT |
| `ReqSetWBMode` | EXACT |
| `ReqSetWBSence` | EXACT |
| `ReqSetWiFiStartUpMode` | CURRENT ONLY |
| `ReqSetblewifi` | DIFFERENT |
| `ReqSfrAutoFocusForFactory` | CURRENT ONLY |
| `ReqSta` | DIFFERENT |
| `ReqStartAiEnhance` | CURRENT ONLY |
| `ReqStartCalibration` | EXACT |
| `ReqStartEqSolving` | DIFFERENT |
| `ReqStartMakeFitsThumb` | CURRENT ONLY |
| `ReqStartMosaic` | EXACT |
| `ReqStartPanoramaByEulerRange` | EXACT |
| `ReqStartPanoramaByGrid` | EXACT |
| `ReqStartPanoramaFraming` | CURRENT ONLY |
| `ReqStartPanoramaStitchUpload` | DIFFERENT |
| `ReqStartRecord` | EXACT |
| `ReqStartRepostprocess` | CURRENT ONLY |
| `ReqStartSentryMode` | DIFFERENT |
| `ReqStartSkyTargetFinder` | CURRENT ONLY |
| `ReqStartTask` | CURRENT ONLY |
| `ReqStartTimeLapse` | EXACT |
| `ReqStartTrack` | DIFFERENT |
| `ReqStartTrackClick` | CURRENT ONLY |
| `ReqStopAiEnhance` | CURRENT ONLY |
| `ReqStopAstroAutoFocus` | EXACT |
| `ReqStopBurstPhoto` | EXACT |
| `ReqStopCalibration` | EXACT |
| `ReqStopCaptureCaliFrame` | CURRENT ONLY |
| `ReqStopCaptureDarkFrame` | EXACT |
| `ReqStopCaptureDarkFrameWithParam` | EXACT |
| `ReqStopCaptureRawLiveStacking` | EXACT |
| `ReqStopCaptureWideDarkFrameWithParam` | LEGACY / COMPATIBILITY ONLY |
| `ReqStopCaptureWideRawLiveStacking` | EXACT |
| `ReqStopCompressPanorama` | EXACT |
| `ReqStopEqSolving` | EXACT |
| `ReqStopGoto` | EXACT |
| `ReqStopMakeFitsThumb` | CURRENT ONLY |
| `ReqStopManualContinuFocus` | EXACT |
| `ReqStopOneClickGoto` | EXACT |
| `ReqStopPanorama` | EXACT |
| `ReqStopPanoramaFraming` | CURRENT ONLY |
| `ReqStopPanoramaFramingAndStartGrid` | CURRENT ONLY |
| `ReqStopPanoramaStitchUpload` | DIFFERENT |
| `ReqStopRecord` | EXACT |
| `ReqStopRepostprocess` | CURRENT ONLY |
| `ReqStopSentryMode` | EXACT |
| `ReqStopSkyTargetFinder` | CURRENT ONLY |
| `ReqStopTask` | CURRENT ONLY |
| `ReqStopTimeLapse` | EXACT |
| `ReqStopTrack` | EXACT |
| `ReqStopTrackSpecialTarget` | EXACT |
| `ReqSwitchCropRatio` | CURRENT ONLY |
| `ReqSwitchFrameRate` | CURRENT ONLY |
| `ReqSwitchResolution` | CURRENT ONLY |
| `ReqSwitchShootingMode` | CURRENT ONLY |
| `ReqSwitchShootingTech` | CURRENT ONLY |
| `ReqSyncShootingSchedule` | EXACT |
| `ReqTestOpenAllCamera` | CURRENT ONLY |
| `ReqTestRgbUart` | CURRENT ONLY |
| `ReqTrackSpecialTarget` | EXACT |
| `ReqUFOAutoHandMode` | CURRENT ONLY |
| `ReqUnlockShootingSchedule` | EXACT |
| `ReqUpdatePanoramaFramingRect` | CURRENT ONLY |
| `ReqVoiceCommand` | LEGACY / COMPATIBILITY ONLY |
| `ReqsetMasterLock` | EXACT |
| `ResAllTemperature` | CURRENT ONLY |
| `ResAp` | EXACT |
| `ResAstroShooting` | EXACT |
| `ResCancelShootingSchedule` | EXACT |
| `ResCheckDarkFrame` | EXACT |
| `ResCheckFile` | EXACT |
| `ResCommon` | CURRENT ONLY |
| `ResDelDarkFrameList` | EXACT |
| `ResDelWideDarkFrameList` | LEGACY / COMPATIBILITY ONLY |
| `ResDeleteShootingSchedule` | EXACT |
| `ResDeviceActivateInfo` | LEGACY / COMPATIBILITY ONLY |
| `ResDeviceActivateSuccessfull` | LEGACY / COMPATIBILITY ONLY |
| `ResDeviceActivateWriteFile` | LEGACY / COMPATIBILITY ONLY |
| `ResDisableDeviceActivate` | LEGACY / COMPATIBILITY ONLY |
| `ResEMMCInAadOutSpeed` | CURRENT ONLY |
| `ResEnterCamera` | CURRENT ONLY |
| `ResErrorTestState` | CURRENT ONLY |
| `ResErrorTeststart` | CURRENT ONLY |
| `ResFactoryDualPeSwitchState` | CURRENT ONLY |
| `ResFactoryGetRollHorizontalDegree` | CURRENT ONLY |
| `ResFactoryGyroAttitude` | CURRENT ONLY |
| `ResFactoryMicRms` | CURRENT ONLY |
| `ResGetAllFeatureParams` | EXACT |
| `ResGetAllParams` | EXACT |
| `ResGetAllShootingSchedule` | EXACT |
| `ResGetAstroShootingTime` | CURRENT ONLY |
| `ResGetCaliFrameList` | CURRENT ONLY |
| `ResGetDarkFrameInfo` | DIFFERENT |
| `ResGetDarkFrameInfoList` | EXACT |
| `ResGetDeviceStateInfo` | DIFFERENT |
| `ResGetFactoryTestState` | CURRENT ONLY |
| `ResGetGyroAttitude` | CURRENT ONLY |
| `ResGetPanoramaCurrentUploadState` | CURRENT ONLY |
| `ResGetQuickSetList` | CURRENT ONLY |
| `ResGetShootingScheduleById` | EXACT |
| `ResGetShootingTaskById` | EXACT |
| `ResGetStitchUploadState` | LEGACY / COMPATIBILITY ONLY |
| `ResGetUploadPredict` | CURRENT ONLY |
| `ResGetWideDarkFrameInfo` | LEGACY / COMPATIBILITY ONLY |
| `ResGetWideDarkFrameInfoList` | LEGACY / COMPATIBILITY ONLY |
| `ResGetconfig` | EXACT |
| `ResGetsysteminfo` | EXACT |
| `ResGotoSolarSystem` | CURRENT ONLY |
| `ResIsImageStackable` | CURRENT ONLY |
| `ResLockShootingSchedule` | DIFFERENT |
| `ResMakeFitsThumb` | CURRENT ONLY |
| `ResMotor` | EXACT |
| `ResMotorPosition` | EXACT |
| `ResNotifyAlbumUpdate` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyBurstProgress` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyCPUMode` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyCamFunctionState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyEqSolvingState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyFocus` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyHostSlaveMode` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyLongExpPhotoProgress` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyMTPState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyOneClickGotoState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyOperationState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPanoramaCompressionProgress` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPanoramaProgress` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPanoramaStitchUploadComplete` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPanoramaUploadProgress` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyParam` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPictureMatching` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPowerIndState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyPowerOff` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyProgressCaptureRawDark` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyProgressCaptureRawLiveStacking` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyRecordTime` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyRgbState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifySDcardInfo` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyShootingScheduleResultAndState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyShootingTaskState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifySkySeacherState` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStateAstroCalibration` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStateAstroGoto` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStateAstroTracking` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStateAstroTrackingSpecial` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStateSentryMode` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyStreamType` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyTaskState` | CURRENT ONLY |
| `ResNotifyTemperature` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyTimeLapseOutTime` | LEGACY / COMPATIBILITY ONLY |
| `ResNotifyTrackResult` | LEGACY / COMPATIBILITY ONLY |
| `ResOneClickGoto` | EXACT |
| `ResOneClickGotoSolarSystem` | CURRENT ONLY |
| `ResReceiveDataError` | EXACT |
| `ResReplaceShootingSchedule` | DIFFERENT |
| `ResRepostprocess` | CURRENT ONLY |
| `ResReset` | EXACT |
| `ResSetQuickSet` | CURRENT ONLY |
| `ResSetblewifi` | EXACT |
| `ResSta` | EXACT |
| `ResStartEqSolving` | EXACT |
| `ResStartPanoramaStitchUpload` | CURRENT ONLY |
| `ResStartSkyTargetFinder` | CURRENT ONLY |
| `ResStopPanoramaStitchUpload` | CURRENT ONLY |
| `ResSwitchShootingMode` | CURRENT ONLY |
| `ResSwitchShootingTech` | CURRENT ONLY |
| `ResSyncShootingSchedule` | EXACT |
| `ResTaskCenter` | CURRENT ONLY |
| `ResUnlockShootingSchedule` | EXACT |
| `ResUserInfinityPos` | CURRENT ONLY |
| `ResVcmK` | CURRENT ONLY |
| `ResWifilist` | DIFFERENT |
| `ShootingModeAndTech` | CURRENT ONLY |
| `ShootingScheduleMsg` | EXACT |
| `ShootingTaskMsg` | EXACT |
| `StationModel` | CURRENT ONLY |
| `TaskAttr` | CURRENT ONLY |
| `TaskParam` | CURRENT ONLY |
| `TaskState` | CURRENT ONLY |
| `TeleCameraStateInfo` | DIFFERENT |
| `TemperatureItem` | CURRENT ONLY |
| `V3AstroParamsData` | LEGACY / COMPATIBILITY ONLY |
| `V3DeviceStateDetail` | LEGACY / COMPATIBILITY ONLY |
| `V3DeviceStateMode` | LEGACY / COMPATIBILITY ONLY |
| `V3DeviceStatePath` | LEGACY / COMPATIBILITY ONLY |
| `V3ExposurePresetData` | LEGACY / COMPATIBILITY ONLY |
| `V3ModeSwitchInner` | LEGACY / COMPATIBILITY ONLY |
| `V3PresetQuery` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqAdjustParam` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqCaptureCaliFrame` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqConfirmObservation` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqFocusInit` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqGetAstroParams` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqGetDeviceConfig` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqGetExposurePresets` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqListSavedImages` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqModeQuery` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqModeSwitch` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqOpenTeleCamera` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqOpenWideCamera` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSaveStackedImage` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSetAstroParams` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSetCameraParam` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSetExposureGain` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSetGPSLocation` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqSetObservationLocation` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqShootingModeSwitch` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqStatusPolling` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqStopCaptureCaliFrame` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqStreamControl` | LEGACY / COMPATIBILITY ONLY |
| `V3ReqUnknownCameraParam` | LEGACY / COMPATIBILITY ONLY |
| `V3ResFocusInit` | LEGACY / COMPATIBILITY ONLY |
| `V3ResGetAstroParams` | LEGACY / COMPATIBILITY ONLY |
| `V3ResGetDeviceConfig` | LEGACY / COMPATIBILITY ONLY |
| `V3ResGetExposurePresets` | LEGACY / COMPATIBILITY ONLY |
| `V3ResModeQuery` | LEGACY / COMPATIBILITY ONLY |
| `V3ResModeSwitch` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyAutoFocusState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyAutoFocusStateAlt` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyBurstState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyCaliFrameProgress` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyCaliFrameState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyCameraParamState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyDeviceState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyExposureDuration` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyExposureProgress` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyModeChange` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyObservationState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyPhotoBurstProgress` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyPhotoState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyStackingData` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyStateLatch` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyTemperature2` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyTimelapseProgress` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyTimelapseState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyVideoProgress` | LEGACY / COMPATIBILITY ONLY |
| `V3ResNotifyVideoState` | LEGACY / COMPATIBILITY ONLY |
| `V3ResSaveStackedImage` | LEGACY / COMPATIBILITY ONLY |
| `V3ResSetAstroParams` | LEGACY / COMPATIBILITY ONLY |
| `V3ResShootingModeSwitch` | LEGACY / COMPATIBILITY ONLY |
| `WideCameraStateInfo` | CURRENT ONLY |
| `WifiInfo` | CURRENT ONLY |
| `WsPacket` | EXACT |
| `notify.AlbumUpdate` | CURRENT ONLY |
| `notify.AreaAutoFocusState` | CURRENT ONLY |
| `notify.AstroAutoFocusFastState` | CURRENT ONLY |
| `notify.AstroAutoFocusState` | CURRENT ONLY |
| `notify.AstroCalibrationState` | CURRENT ONLY |
| `notify.AstroGotoState` | CURRENT ONLY |
| `notify.AstroTrackingSpecialState` | CURRENT ONLY |
| `notify.AstroTrackingState` | CURRENT ONLY |
| `notify.AutoCooling` | CURRENT ONLY |
| `notify.AutoShutdown` | CURRENT ONLY |
| `notify.BatteryInfo` | CURRENT ONLY |
| `notify.BodyStatus` | CURRENT ONLY |
| `notify.BurstProgress` | CURRENT ONLY |
| `notify.BurstState` | CURRENT ONLY |
| `notify.CPUMode` | CURRENT ONLY |
| `notify.CalibrationResult` | CURRENT ONLY |
| `notify.CaptureCaliFrameProgress` | CURRENT ONLY |
| `notify.CaptureCaliFrameState` | CURRENT ONLY |
| `notify.CaptureRawDarkState` | CURRENT ONLY |
| `notify.CaptureRawState` | CURRENT ONLY |
| `notify.ChargingState` | CURRENT ONLY |
| `notify.CmosTemperature` | CURRENT ONLY |
| `notify.CommonProgress` | CURRENT ONLY |
| `notify.DeviceAttitude` | CURRENT ONLY |
| `notify.DualCameraLinkageState` | CURRENT ONLY |
| `notify.EqSolvingState` | CURRENT ONLY |
| `notify.FocusPosition` | CURRENT ONLY |
| `notify.GeneralBoolParams` | CURRENT ONLY |
| `notify.GeneralFloatParam` | CURRENT ONLY |
| `notify.GeneralIntParam` | CURRENT ONLY |
| `notify.HostSlaveMode` | CURRENT ONLY |
| `notify.LensDefog` | CURRENT ONLY |
| `notify.LongExpPhotoProgress` | CURRENT ONLY |
| `notify.LowTempProtectionMode` | CURRENT ONLY |
| `notify.MTPState` | CURRENT ONLY |
| `notify.NormalAutoFocusState` | CURRENT ONLY |
| `notify.NormalTrackState` | CURRENT ONLY |
| `notify.OneClickGotoState` | CURRENT ONLY |
| `notify.OperationStateNotify` | CURRENT ONLY |
| `notify.PanoFramingRectUpdateNotify` | CURRENT ONLY |
| `notify.PanoFramingStateNotify` | CURRENT ONLY |
| `notify.PanoFramingThumbnailUpdateNotify` | CURRENT ONLY |
| `notify.PanoramaCompressionComplete` | CURRENT ONLY |
| `notify.PanoramaCompressionProgress` | CURRENT ONLY |
| `notify.PanoramaCurrentUploadState` | CURRENT ONLY |
| `notify.PanoramaProgress` | CURRENT ONLY |
| `notify.PanoramaState` | CURRENT ONLY |
| `notify.PanoramaStitchUploadComplete` | CURRENT ONLY |
| `notify.PanoramaUploadCompressionProgress` | CURRENT ONLY |
| `notify.PanoramaUploadProgress` | CURRENT ONLY |
| `notify.Param` | CURRENT ONLY |
| `notify.PhotoState` | CURRENT ONLY |
| `notify.PictureMatching` | CURRENT ONLY |
| `notify.PowerIndState` | CURRENT ONLY |
| `notify.PowerOff` | CURRENT ONLY |
| `notify.ProgressAiEnhance` | CURRENT ONLY |
| `notify.ProgressCaptureMosaic` | CURRENT ONLY |
| `notify.ProgressCaptureRawDark` | CURRENT ONLY |
| `notify.ProgressCaptureRawLiveStacking` | CURRENT ONLY |
| `notify.RecordState` | CURRENT ONLY |
| `notify.RecordTime` | CURRENT ONLY |
| `notify.ResolutionParam` | CURRENT ONLY |
| `notify.RgbState` | CURRENT ONLY |
| `notify.RollLevelCalibrationAngle` | CURRENT ONLY |
| `notify.SentryAutoHand` | CURRENT ONLY |
| `notify.SentryState` | CURRENT ONLY |
| `notify.ShootingScheduleResultAndState` | CURRENT ONLY |
| `notify.ShootingTaskState` | CURRENT ONLY |
| `notify.SkySeacherState` | CURRENT ONLY |
| `notify.SkyTargetFinderState` | CURRENT ONLY |
| `notify.StateSystemResourceOccupation` | CURRENT ONLY |
| `notify.StorageInfo` | CURRENT ONLY |
| `notify.StreamType` | CURRENT ONLY |
| `notify.SwitchCropRatioState` | CURRENT ONLY |
| `notify.SwitchResolutionFpsState` | CURRENT ONLY |
| `notify.SwitchShootingMode` | CURRENT ONLY |
| `notify.Temperature` | CURRENT ONLY |
| `notify.TimeLapseOutTime` | CURRENT ONLY |
| `notify.TimeLapseState` | CURRENT ONLY |
| `notify.TrackResult` | CURRENT ONLY |
| `notify.Wb` | CURRENT ONLY |
| `param.ReqSetAutoParam` | CURRENT ONLY |
| `param.ReqSetExposure` | CURRENT ONLY |
| `param.ReqSetGain` | CURRENT ONLY |
| `param.ReqSetGeneralBoolParams` | CURRENT ONLY |
| `param.ReqSetGeneralFloatParam` | CURRENT ONLY |
| `param.ReqSetGeneralIntParam` | CURRENT ONLY |
| `param.ReqSetWb` | CURRENT ONLY |
| `param.ResSetAutoParam` | CURRENT ONLY |

### Messages: complete changed definitions

#### DeviceStateInfo

Legacy:

```json
{
  "fields": [
    {
      "number": 10,
      "name": "calibration_result",
      "type": "CalibrationResult",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "rgb_state",
      "type": "notify.RgbState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "power_ind_state",
      "type": "notify.PowerIndState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "charging_state",
      "type": "notify.ChargingState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "storage_info",
      "type": "notify.StorageInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "mtp_state",
      "type": "notify.MTPState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "cpu_mode",
      "type": "notify.CPUMode",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "temperature",
      "type": "notify.Temperature",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 8,
      "name": "body_status",
      "type": "notify.BodyStatus",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 9,
      "name": "battery_info",
      "type": "notify.BatteryInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 10,
      "name": "calibration_result",
      "type": "notify.CalibrationResult",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 11,
      "name": "picture_matching",
      "type": "notify.PictureMatching",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 12,
      "name": "auto_shutdown",
      "type": "notify.AutoShutdown",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 13,
      "name": "lens_defog",
      "type": "notify.LensDefog",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 14,
      "name": "auto_cooling",
      "type": "notify.AutoCooling",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ExclusiveCameraState

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "capture_raw_state",
      "type": "CaptureRawState",
      "rule": "singular",
      "keyType": null,
      "oneof": "state",
      "proto3Optional": false
    }
  ],
  "oneofs": [
    {
      "name": "state",
      "fields": [
        "capture_raw_state"
      ]
    }
  ]
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "capture_raw_state",
      "type": "notify.CaptureRawState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "photo_state",
      "type": "notify.PhotoState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "burst_state",
      "type": "notify.BurstState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "record_state",
      "type": "notify.RecordState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "timelapse_state",
      "type": "notify.TimeLapseState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "capture_cali_frame_state",
      "type": "notify.CaptureCaliFrameState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "panorama_state",
      "type": "notify.PanoramaState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    },
    {
      "number": 8,
      "name": "sentry_state",
      "type": "notify.SentryState",
      "rule": "singular",
      "keyType": null,
      "oneof": "current_state",
      "proto3Optional": false
    }
  ],
  "oneofs": [
    {
      "name": "current_state",
      "fields": [
        "burst_state",
        "capture_cali_frame_state",
        "capture_raw_state",
        "panorama_state",
        "photo_state",
        "record_state",
        "sentry_state",
        "timelapse_state"
      ]
    }
  ]
}
```

#### ReqAp

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "wifi_type",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "auto_start",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "country_list",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "country",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "wifi_type",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "auto_start",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "country_list",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "country",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 8,
      "name": "force_restart",
      "type": "bool",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqCaptureWideRawLiveStacking

Legacy:

```json
{
  "fields": [],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "force_start",
      "type": "bool",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqDelDarkFrame

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exp_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "gain_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "bin_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exp_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "gain_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "bin_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "temp_value",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqGetconfig

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqGetsysteminfo

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqGetwifilist

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqGotoDSO

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "ra",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "dec",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "target_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "ra",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "dec",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "target_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "goto_only",
      "type": "bool",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "rotation",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": "_rotation",
      "proto3Optional": true
    }
  ],
  "oneofs": [
    {
      "name": "_rotation",
      "fields": [
        "rotation"
      ]
    }
  ]
}
```

#### ReqGotoSolarSystem

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "lon",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "lat",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "target_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "lon",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "lat",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "target_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "force_start",
      "type": "bool",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqMotorServiceJoystick

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "vector_angle",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "vector_length",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "speed",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "vector_angle",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "vector_length",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqMotorServiceJoystickFixedAngle

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "vector_angle",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "vector_length",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "speed",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "vector_angle",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "vector_length",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqOneClickShooting

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "goto_dso",
      "type": "ReqOneClickGotoDSO",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "shooting_param",
      "type": "ReqOneClickShootingParam",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "goto_dso",
      "type": "ReqOneClickGotoDSO",
      "rule": "singular",
      "keyType": null,
      "oneof": "_goto_dso",
      "proto3Optional": true
    },
    {
      "number": 2,
      "name": "shooting_param",
      "type": "ReqOneClickShootingParam",
      "rule": "singular",
      "keyType": null,
      "oneof": "_shooting_param",
      "proto3Optional": true
    }
  ],
  "oneofs": [
    {
      "name": "_goto_dso",
      "fields": [
        "goto_dso"
      ]
    },
    {
      "name": "_shooting_param",
      "fields": [
        "shooting_param"
      ]
    }
  ]
}
```

#### ReqReset

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqSetblewifi

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "mode",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "value",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "mode",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "value",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqSta

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "auto_start",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "ssid",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "auto_start",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "ble_psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "ssid",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "psd",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "client_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqStartEqSolving

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "lon",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "lat",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "lon",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "lat",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "use_calibration",
      "type": "bool",
      "rule": "singular",
      "keyType": null,
      "oneof": "_use_calibration",
      "proto3Optional": true
    }
  ],
  "oneofs": [
    {
      "name": "_use_calibration",
      "fields": [
        "use_calibration"
      ]
    }
  ]
}
```

#### ReqStartPanoramaStitchUpload

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "user_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "busi_no",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "app_platform",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "panorama_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "ak",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "sk",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "token",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "resource_id",
      "type": "uint64",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "user_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "app_platform",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "panorama_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "ak",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "sk",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "token",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 8,
      "name": "bucket",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 9,
      "name": "bucket_prefix",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 10,
      "name": "from",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 11,
      "name": "env_type",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqStartSentryMode

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "mode",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "type",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqStartTrack

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "x",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "y",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "w",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "h",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "x",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "y",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "w",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "h",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "cam_id",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ReqStopPanoramaStitchUpload

Legacy:

```json
{
  "fields": [],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "user_id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ResGetDarkFrameInfo

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exp_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "gain_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "bin_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "exp_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "gain_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "bin_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "temperature",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exp_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "gain_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "bin_index",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "exp_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "gain_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "bin_name",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "temperature",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": "_temperature",
      "proto3Optional": true
    }
  ],
  "oneofs": [
    {
      "name": "_temperature",
      "fields": [
        "temperature"
      ]
    }
  ]
}
```

#### ResGetDeviceStateInfo

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "shooting_mode",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "tele_camera_state_info",
      "type": "TeleCameraStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "device_state_info",
      "type": "DeviceStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "shooting_mode",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "tele_camera_state_info",
      "type": "TeleCameraStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "wide_camera_state_info",
      "type": "WideCameraStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "focus_motor_state_info",
      "type": "FocusMotorStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "motion_motor_state_info",
      "type": "MotionMotorStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "device_state_info",
      "type": "DeviceStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 8,
      "name": "connection_state_info",
      "type": "ConnectionStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 9,
      "name": "shooting_mode_and_techs",
      "type": "ShootingModeAndTech",
      "rule": "repeated",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 10,
      "name": "wide_focus_motor_state_info",
      "type": "FocusMotorStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 11,
      "name": "guide_focus_motor_state_info",
      "type": "FocusMotorStateInfo",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ResLockShootingSchedule

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "id",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "password",
      "type": "string",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ResReplaceShootingSchedule

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "shooting_schedule",
      "type": "ShootingScheduleMsg",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "shooting_schedule",
      "type": "ShootingScheduleMsg",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "replaced_shooting_schedule",
      "type": "ShootingScheduleMsg",
      "rule": "repeated",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### ResWifilist

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "ssid",
      "type": "string",
      "rule": "repeated",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "cmd",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "code",
      "type": "int32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "ssid",
      "type": "string",
      "rule": "repeated",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "wifi_info_list",
      "type": "WifiInfo",
      "rule": "repeated",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

#### TeleCameraStateInfo

Legacy:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exclusive_state",
      "type": "ExclusiveCameraState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "h_fov",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "v_fov",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "resolution_width",
      "type": "uint32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "resolution_height",
      "type": "uint32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "cmos_temperature",
      "type": "CmosTemperature",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    }
  ],
  "oneofs": []
}
```

Current:

```json
{
  "fields": [
    {
      "number": 1,
      "name": "exclusive_state",
      "type": "ExclusiveCameraState",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 2,
      "name": "stream_type",
      "type": "notify.StreamType",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 3,
      "name": "h_fov",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 4,
      "name": "v_fov",
      "type": "double",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 5,
      "name": "resolution_width",
      "type": "uint32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 6,
      "name": "resolution_height",
      "type": "uint32",
      "rule": "singular",
      "keyType": null,
      "oneof": null,
      "proto3Optional": false
    },
    {
      "number": 7,
      "name": "cmos_temperature",
      "type": "notify.CmosTemperature",
      "rule": "singular",
      "keyType": null,
      "oneof": "_cmos_temperature",
      "proto3Optional": true
    }
  ],
  "oneofs": [
    {
      "name": "_cmos_temperature",
      "fields": [
        "cmos_temperature"
      ]
    }
  ]
}
```

## Enums

| Fully qualified definition | Classification |
| --- | --- |
| `AstroState` | LEGACY / COMPATIBILITY ONLY |
| `AstroTrackingSpecial` | EXACT |
| `DwarfBleErrorCode` | LEGACY / COMPATIBILITY ONLY |
| `DwarfCMD` | DIFFERENT |
| `DwarfErrorCode` | DIFFERENT |
| `ExclusiveTaskType` | CURRENT ONLY |
| `IrCut` | EXACT |
| `MessageTypeId` | EXACT |
| `ModuleId` | DIFFERENT |
| `MotorLevelCalibrationDirection` | EXACT |
| `OperationState` | LEGACY / COMPATIBILITY ONLY |
| `PhotoMode` | EXACT |
| `ResGetAstroShootingTime.AstroMode` | CURRENT ONLY |
| `ResNotifyEqSolvingState.Action` | LEGACY / COMPATIBILITY ONLY |
| `SentryModeState` | LEGACY / COMPATIBILITY ONLY |
| `ShootingScheduleMode` | EXACT |
| `ShootingScheduleResult` | EXACT |
| `ShootingScheduleState` | EXACT |
| `ShootingScheduleSyncState` | EXACT |
| `ShootingTaskState` | EXACT |
| `SolarSystemTarget` | EXACT |
| `State` | LEGACY / COMPATIBILITY ONLY |
| `TaskId` | CURRENT ONLY |
| `VocalType` | CURRENT ONLY |
| `VoiceCommandType` | LEGACY / COMPATIBILITY ONLY |
| `WBMode` | EXACT |
| `WsMajorVersion` | EXACT |
| `WsMinorVersion` | DIFFERENT |
| `notify.AstroState` | CURRENT ONLY |
| `notify.BodyStatus.BodyStatusEnum` | CURRENT ONLY |
| `notify.CommonProgress.ProgressType` | CURRENT ONLY |
| `notify.OperationState` | CURRENT ONLY |
| `notify.SentryModeState` | CURRENT ONLY |
| `notify.SentryObjectType` | CURRENT ONLY |
| `notify.StateSystemResourceOccupation.TaskId` | CURRENT ONLY |

### Enums: complete changed definitions

#### DwarfCMD

Legacy:

```json
{
  "values": [
    [
      "NO_CMD",
      0
    ],
    [
      "CMD_CAMERA_TELE_OPEN_CAMERA",
      10000
    ],
    [
      "CMD_CAMERA_TELE_CLOSE_CAMERA",
      10001
    ],
    [
      "CMD_CAMERA_TELE_PHOTOGRAPH",
      10002
    ],
    [
      "CMD_CAMERA_TELE_BURST",
      10003
    ],
    [
      "CMD_CAMERA_TELE_STOP_BURST",
      10004
    ],
    [
      "CMD_CAMERA_TELE_START_RECORD",
      10005
    ],
    [
      "CMD_CAMERA_TELE_STOP_RECORD",
      10006
    ],
    [
      "CMD_CAMERA_TELE_SET_EXP_MODE",
      10007
    ],
    [
      "CMD_CAMERA_TELE_GET_EXP_MODE",
      10008
    ],
    [
      "CMD_CAMERA_TELE_SET_EXP",
      10009
    ],
    [
      "CMD_CAMERA_TELE_GET_EXP",
      10010
    ],
    [
      "CMD_CAMERA_TELE_SET_GAIN_MODE",
      10011
    ],
    [
      "CMD_CAMERA_TELE_GET_GAIN_MODE",
      10012
    ],
    [
      "CMD_CAMERA_TELE_SET_GAIN",
      10013
    ],
    [
      "CMD_CAMERA_TELE_GET_GAIN",
      10014
    ],
    [
      "CMD_CAMERA_TELE_SET_BRIGHTNESS",
      10015
    ],
    [
      "CMD_CAMERA_TELE_GET_BRIGHTNESS",
      10016
    ],
    [
      "CMD_CAMERA_TELE_SET_CONTRAST",
      10017
    ],
    [
      "CMD_CAMERA_TELE_GET_CONTRAST",
      10018
    ],
    [
      "CMD_CAMERA_TELE_SET_SATURATION",
      10019
    ],
    [
      "CMD_CAMERA_TELE_GET_SATURATION",
      10020
    ],
    [
      "CMD_CAMERA_TELE_SET_HUE",
      10021
    ],
    [
      "CMD_CAMERA_TELE_GET_HUE",
      10022
    ],
    [
      "CMD_CAMERA_TELE_SET_SHARPNESS",
      10023
    ],
    [
      "CMD_CAMERA_TELE_GET_SHARPNESS",
      10024
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_MODE",
      10025
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_MODE",
      10026
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_SCENE",
      10027
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_SCENE",
      10028
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_CT",
      10029
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_CT",
      10030
    ],
    [
      "CMD_CAMERA_TELE_SET_IRCUT",
      10031
    ],
    [
      "CMD_CAMERA_TELE_GET_IRCUT",
      10032
    ],
    [
      "CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO",
      10033
    ],
    [
      "CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO",
      10034
    ],
    [
      "CMD_CAMERA_TELE_SET_ALL_PARAMS",
      10035
    ],
    [
      "CMD_CAMERA_TELE_GET_ALL_PARAMS",
      10036
    ],
    [
      "CMD_CAMERA_TELE_SET_FEATURE_PARAM",
      10037
    ],
    [
      "CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS",
      10038
    ],
    [
      "CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE",
      10039
    ],
    [
      "CMD_CAMERA_TELE_SET_JPG_QUALITY",
      10040
    ],
    [
      "CMD_CAMERA_TELE_PHOTO_RAW",
      10041
    ],
    [
      "CMD_CAMERA_TELE_SET_RTSP_BITRATE_TYPE",
      10042
    ],
    [
      "CMD_CAMERA_TELE_DISABLE_ALL_ISP_PROCESSING",
      10043
    ],
    [
      "CMD_CAMERA_TELE_ENABLE_ALL_ISP_PROCESSING",
      10044
    ],
    [
      "CMD_CAMERA_TELE_SET_ISP_MODULE_STATE",
      10045
    ],
    [
      "CMD_CAMERA_TELE_GET_ISP_MODULE_STATE",
      10046
    ],
    [
      "CMD_CAMERA_TELE_SWITCH_RESOLUTION",
      10047
    ],
    [
      "CMD_CAMERA_TELE_SWITCH_FRAMERATE",
      10048
    ],
    [
      "CMD_CAMERA_TELE_SWITCH_CROP_RATIO",
      10049
    ],
    [
      "CMD_V3_CAMERA_TELE_OPEN_CAMERA",
      10050
    ],
    [
      "CMD_CAMERA_TELE_SET_ND_FILTER",
      10051
    ],
    [
      "CMD_ASTRO_START_CALIBRATION",
      11000
    ],
    [
      "CMD_ASTRO_STOP_CALIBRATION",
      11001
    ],
    [
      "CMD_ASTRO_START_GOTO_DSO",
      11002
    ],
    [
      "CMD_ASTRO_START_GOTO_SOLAR_SYSTEM",
      11003
    ],
    [
      "CMD_ASTRO_STOP_GOTO",
      11004
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING",
      11005
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING",
      11006
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_DARK",
      11007
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_DARK",
      11008
    ],
    [
      "CMD_ASTRO_CHECK_GOT_DARK",
      11009
    ],
    [
      "CMD_ASTRO_GO_LIVE",
      11010
    ],
    [
      "CMD_ASTRO_START_TRACK_SPECIAL_TARGET",
      11011
    ],
    [
      "CMD_ASTRO_STOP_TRACK_SPECIAL_TARGET",
      11012
    ],
    [
      "CMD_ASTRO_START_ONE_CLICK_GOTO_DSO",
      11013
    ],
    [
      "CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM",
      11014
    ],
    [
      "CMD_ASTRO_STOP_ONE_CLICK_GOTO",
      11015
    ],
    [
      "CMD_ASTRO_START_WIDE_CAPTURE_LIVE_STACKING",
      11016
    ],
    [
      "CMD_ASTRO_STOP_WIDE_CAPTURE_LIVE_STACKING",
      11017
    ],
    [
      "CMD_ASTRO_START_EQ_SOLVING",
      11018
    ],
    [
      "CMD_ASTRO_STOP_EQ_SOLVING",
      11019
    ],
    [
      "CMD_ASTRO_WIDE_GO_LIVE",
      11020
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_DARK_WITH_PARAM",
      11021
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_DARK_WITH_PARAM",
      11022
    ],
    [
      "CMD_ASTRO_GET_DARK_FRAME_LIST",
      11023
    ],
    [
      "CMD_ASTRO_DEL_DARK_FRAME_LIST",
      11024
    ],
    [
      "CMD_ASTRO_START_CAPTURE_WIDE_RAW_DARK_WITH_PARAM",
      11025
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_WIDE_RAW_DARK_WITH_PARAM",
      11026
    ],
    [
      "CMD_ASTRO_GET_WIDE_DARK_FRAME_LIST",
      11027
    ],
    [
      "CMD_ASTRO_DEL_WIDE_DARK_FRAME_LIST",
      11028
    ],
    [
      "CMD_ASTRO_START_AI_ENHANCE",
      11029
    ],
    [
      "CMD_ASTRO_STOP_AI_ENHANCE",
      11030
    ],
    [
      "CMD_ASTRO_START_TELE_MOSAIC",
      11031
    ],
    [
      "CMD_ASTRO_CHECK_IF_RESTACKABLE",
      11032
    ],
    [
      "CMD_V3_ASTRO_SAVE_STACKED_IMAGE",
      11033
    ],
    [
      "CMD_V3_ASTRO_LIST_SAVED_IMAGES",
      11034
    ],
    [
      "CMD_ASTRO_START_RESTACKED",
      11035
    ],
    [
      "CMD_V3_ASTRO_SAVE_COMPLETE",
      11036
    ],
    [
      "CMD_ASTRO_FAST_STOP_CAPTURE_RAW_LIVE_STACKING",
      11037
    ],
    [
      "CMD_ASTRO_FAST_STOP_WIDE_CAPTURE_LIVE_STACKING",
      11038
    ],
    [
      "CMD_V3_ASTRO_STATUS_POLLING",
      11039
    ],
    [
      "CMD_V3_ASTRO_GET_PARAMS",
      11040
    ],
    [
      "CMD_V3_ASTRO_SET_PARAMS",
      11041
    ],
    [
      "CMD_ASTRO_START_ONE_CLICK_SHOOTING",
      11042
    ],
    [
      "CMD_V3_ASTRO_GET_PRESETS",
      11043
    ],
    [
      "CMD_ASTRO_DEL_CALI_FRAME_LIST",
      11044
    ],
    [
      "CMD_V3_ASTRO_START_CAPTURE_CALI_FRAME",
      11045
    ],
    [
      "CMD_V3_ASTRO_STOP_CAPTURE_CALI_FRAME",
      11046
    ],
    [
      "CMD_V3_ASTRO_SET_LOCATION",
      11047
    ],
    [
      "CMD_V3_ASTRO_CONFIRM",
      11048
    ],
    [
      "CMD_ASTRO_GET_GYRO_ATTITUDE",
      11049
    ],
    [
      "CMD_ASTRO_CONTINUE_SHOOTING",
      11050
    ],
    [
      "CMD_CAMERA_WIDE_OPEN_CAMERA",
      12000
    ],
    [
      "CMD_CAMERA_WIDE_CLOSE_CAMERA",
      12001
    ],
    [
      "CMD_CAMERA_WIDE_SET_EXP_MODE",
      12002
    ],
    [
      "CMD_CAMERA_WIDE_GET_EXP_MODE",
      12003
    ],
    [
      "CMD_CAMERA_WIDE_SET_EXP",
      12004
    ],
    [
      "CMD_CAMERA_WIDE_GET_EXP",
      12005
    ],
    [
      "CMD_CAMERA_WIDE_SET_GAIN",
      12006
    ],
    [
      "CMD_CAMERA_WIDE_GET_GAIN",
      12007
    ],
    [
      "CMD_CAMERA_WIDE_SET_BRIGHTNESS",
      12008
    ],
    [
      "CMD_CAMERA_WIDE_GET_BRIGHTNESS",
      12009
    ],
    [
      "CMD_CAMERA_WIDE_SET_CONTRAST",
      12010
    ],
    [
      "CMD_CAMERA_WIDE_GET_CONTRAST",
      12011
    ],
    [
      "CMD_CAMERA_WIDE_SET_SATURATION",
      12012
    ],
    [
      "CMD_CAMERA_WIDE_GET_SATURATION",
      12013
    ],
    [
      "CMD_CAMERA_WIDE_SET_HUE",
      12014
    ],
    [
      "CMD_CAMERA_WIDE_GET_HUE",
      12015
    ],
    [
      "CMD_CAMERA_WIDE_SET_SHARPNESS",
      12016
    ],
    [
      "CMD_CAMERA_WIDE_GET_SHARPNESS",
      12017
    ],
    [
      "CMD_CAMERA_WIDE_SET_WB_MODE",
      12018
    ],
    [
      "CMD_CAMERA_WIDE_GET_WB_MODE",
      12019
    ],
    [
      "CMD_CAMERA_WIDE_SET_WB_CT",
      12020
    ],
    [
      "CMD_CAMERA_WIDE_GET_WB_CT",
      12021
    ],
    [
      "CMD_CAMERA_WIDE_PHOTOGRAPH",
      12022
    ],
    [
      "CMD_CAMERA_WIDE_BURST",
      12023
    ],
    [
      "CMD_CAMERA_WIDE_STOP_BURST",
      12024
    ],
    [
      "CMD_CAMERA_WIDE_START_TIMELAPSE_PHOTO",
      12025
    ],
    [
      "CMD_CAMERA_WIDE_STOP_TIMELAPSE_PHOTO",
      12026
    ],
    [
      "CMD_CAMERA_WIDE_GET_ALL_PARAMS",
      12027
    ],
    [
      "CMD_CAMERA_WIDE_SET_ALL_PARAMS",
      12028
    ],
    [
      "CMD_CAMERA_WIDE_PHOTO_RAW",
      12029
    ],
    [
      "CMD_CAMERA_WIDE_START_RECORD",
      12030
    ],
    [
      "CMD_CAMERA_WIDE_STOP_RECORD",
      12031
    ],
    [
      "CMD_CAMERA_WIDE_SET_RTSP_BITRATE_TYPE",
      12032
    ],
    [
      "CMD_CAMERA_WIDE_SET_WB_SCENE",
      12035
    ],
    [
      "CMD_V3_CAMERA_WIDE_OPEN_CAMERA",
      12036
    ],
    [
      "CMD_CAMERA_WIDE_SET_ND_FILTER",
      12038
    ],
    [
      "CMD_SYSTEM_SET_TIME",
      13000
    ],
    [
      "CMD_SYSTEM_SET_TIME_ZONE",
      13001
    ],
    [
      "CMD_SYSTEM_SET_MTP_MODE",
      13002
    ],
    [
      "CMD_SYSTEM_SET_CPU_MODE",
      13003
    ],
    [
      "CMD_SYSTEM_SET_MASTERLOCK",
      13004
    ],
    [
      "CMD_SYSTEM_GET_DEVICE_ACTIVATE_INFO",
      13005
    ],
    [
      "CMD_SYSTEM_DEVICE_ACTIVATE_WRITE_FILE",
      13006
    ],
    [
      "CMD_SYSTEM_DEVICE_ACTIVATE_NOTIFY_ACTIVATE_SUCCESSFULL",
      13007
    ],
    [
      "CMD_SYSTEM_FACTORY_TEST_UN_ACTIVATE",
      13008
    ],
    [
      "CMD_SYSTEM_SET_LOW_TEMP_PROTECTION_MODE",
      13009
    ],
    [
      "CMD_V3_SYSTEM_SET_GPS_LOCATION",
      13010
    ],
    [
      "CMD_RGB_POWER_OPEN_RGB",
      13500
    ],
    [
      "CMD_RGB_POWER_CLOSE_RGB",
      13501
    ],
    [
      "CMD_RGB_POWER_POWER_DOWN",
      13502
    ],
    [
      "CMD_RGB_POWER_POWERIND_ON",
      13503
    ],
    [
      "CMD_RGB_POWER_POWERIND_OFF",
      13504
    ],
    [
      "CMD_RGB_POWER_REBOOT",
      13505
    ],
    [
      "CMD_STEP_MOTOR_RUN",
      14000
    ],
    [
      "CMD_STEP_MOTOR_RUN_TO",
      14001
    ],
    [
      "CMD_STEP_MOTOR_STOP",
      14002
    ],
    [
      "CMD_STEP_MOTOR_RESET",
      14003
    ],
    [
      "CMD_STEP_MOTOR_CHANGE_SPEED",
      14004
    ],
    [
      "CMD_STEP_MOTOR_CHANGE_DIRECTION",
      14005
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK",
      14006
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK_FIXED_ANGLE",
      14007
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP",
      14008
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_DUAL_CAMERA_LINKAGE",
      14009
    ],
    [
      "CMD_STEP_MOTOR_RUN_IN_PULSE",
      14010
    ],
    [
      "CMD_STEP_MOTOR_GET_POSITION",
      14011
    ],
    [
      "CMD_STEP_MOTOR_START_ATTITUDE_NOTIFY",
      14012
    ],
    [
      "CMD_STEP_MOTOR_STOP_ATTITUDE_NOTIFY",
      14013
    ],
    [
      "CMD_STEP_MOTOR_LEVEL_CALIBRATION_MOVE",
      14014
    ],
    [
      "CMD_STEP_MOTOR_SAVE_LEVEL_CALIBRATION_OFFSET",
      14015
    ],
    [
      "CMD_STEP_MOTOR_RESET_LEVEL_CALIBRATION_DEFAULT",
      14016
    ],
    [
      "CMD_TRACK_START_TRACK",
      14800
    ],
    [
      "CMD_TRACK_STOP_TRACK",
      14801
    ],
    [
      "CMD_SENTRY_MODE_START",
      14802
    ],
    [
      "CMD_SENTRY_MODE_STOP",
      14803
    ],
    [
      "CMD_MOT_START",
      14804
    ],
    [
      "CMD_MOT_TRACK_ONE",
      14805
    ],
    [
      "CMD_UFOTRACK_MODE_START",
      14806
    ],
    [
      "CMD_UFOTRACK_MODE_STOP",
      14807
    ],
    [
      "CMD_MOT_WIDE_TRACK_ONE",
      14808
    ],
    [
      "CMD_WIDE_TELE_TRACK_SWITCH",
      14809
    ],
    [
      "CMD_UFO_HAND_AOTO_MODE",
      14810
    ],
    [
      "CMD_SENTRY_SCENE_SELECT",
      14811
    ],
    [
      "CMD_TRACK_START_CLICK",
      14812
    ],
    [
      "CMD_FOCUS_AUTO_FOCUS",
      15000
    ],
    [
      "CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS",
      15001
    ],
    [
      "CMD_FOCUS_START_MANUAL_CONTINU_FOCUS",
      15002
    ],
    [
      "CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS",
      15003
    ],
    [
      "CMD_FOCUS_START_ASTRO_AUTO_FOCUS",
      15004
    ],
    [
      "CMD_FOCUS_STOP_ASTRO_AUTO_FOCUS",
      15005
    ],
    [
      "CMD_FOCUS_AUTO_INFINITY_FOCUS",
      15006
    ],
    [
      "CMD_V3_FOCUS_INIT",
      15011
    ],
    [
      "CMD_FOCUS_SET_USER_INFINITY_POS",
      15012
    ],
    [
      "CMD_WIDE_FOCUS_AUTO_FOCUS",
      15014
    ],
    [
      "CMD_WIDE_FOCUS_MANUAL_SINGLE_STEP_FOCUS",
      15015
    ],
    [
      "CMD_WIDE_FOCUS_START_MANUAL_CONTINU_FOCUS",
      15016
    ],
    [
      "CMD_WIDE_FOCUS_STOP_MANUAL_CONTINU_FOCUS",
      15017
    ],
    [
      "CMD_WIDE_FOCUS_START_ASTRO_AUTO_FOCUS",
      15018
    ],
    [
      "CMD_WIDE_FOCUS_STOP_ASTRO_AUTO_FOCUS",
      15019
    ],
    [
      "CMD_WIDE_FOCUS_AUTO_INFINITY_FOCUS",
      15020
    ],
    [
      "CMD_GUIDE_FOCUS_SET_USER_INFINITY_POS",
      15027
    ],
    [
      "CMD_GUIDE_FOCUS_GET_USER_INFINITY_POS",
      15028
    ],
    [
      "CMD_GUIDE_FOCUS_MANUAL_SINGLE_STEP_FOCUS",
      15029
    ],
    [
      "CMD_GUIDE_FOCUS_START_MANUAL_CONTINU_FOCUS",
      15030
    ],
    [
      "CMD_GUIDE_FOCUS_STOP_MANUAL_CONTINU_FOCUS",
      15031
    ],
    [
      "CMD_GUIDE_FOCUS_START_ASTRO_AUTO_FOCUS",
      15032
    ],
    [
      "CMD_GUIDE_FOCUS_AUTO_INFINITY_FOCUS",
      15033
    ],
    [
      "CMD_GUIDE_FOCUS_STOP_ASTRO_AUTO_FOCUS",
      15034
    ],
    [
      "CMD_NOTIFY_TELE_WIDI_PICTURE_MATCHING",
      15200
    ],
    [
      "CMD_NOTIFY_ELE",
      15201
    ],
    [
      "CMD_NOTIFY_CHARGE",
      15202
    ],
    [
      "CMD_NOTIFY_SDCARD_INFO",
      15203
    ],
    [
      "CMD_NOTIFY_TELE_RECORD_TIME",
      15204
    ],
    [
      "CMD_NOTIFY_TELE_TIMELAPSE_OUT_TIME",
      15205
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_RAW_DARK",
      15206
    ],
    [
      "CMD_NOTIFY_PROGRASS_CAPTURE_RAW_DARK",
      15207
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_RAW_LIVE_STACKING",
      15208
    ],
    [
      "CMD_NOTIFY_PROGRASS_CAPTURE_RAW_LIVE_STACKING",
      15209
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_CALIBRATION",
      15210
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_GOTO",
      15211
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_TRACKING",
      15212
    ],
    [
      "CMD_NOTIFY_TELE_SET_PARAM",
      15213
    ],
    [
      "CMD_NOTIFY_WIDE_SET_PARAM",
      15214
    ],
    [
      "CMD_NOTIFY_TELE_FUNCTION_STATE",
      15215
    ],
    [
      "CMD_NOTIFY_WIDE_FUNCTION_STATE",
      15216
    ],
    [
      "CMD_NOTIFY_SET_FEATURE_PARAM",
      15217
    ],
    [
      "CMD_NOTIFY_TELE_BURST_PROGRESS",
      15218
    ],
    [
      "CMD_NOTIFY_PANORAMA_PROGRESS",
      15219
    ],
    [
      "CMD_NOTIFY_WIDE_BURST_PROGRESS",
      15220
    ],
    [
      "CMD_NOTIFY_RGB_STATE",
      15221
    ],
    [
      "CMD_NOTIFY_POWER_IND_STATE",
      15222
    ],
    [
      "CMD_NOTIFY_WS_HOST_SLAVE_MODE",
      15223
    ],
    [
      "CMD_NOTIFY_MTP_STATE",
      15224
    ],
    [
      "CMD_NOTIFY_TRACK_RESULT",
      15225
    ],
    [
      "CMD_NOTIFY_WIDE_TIMELAPSE_OUT_TIME",
      15226
    ],
    [
      "CMD_NOTIFY_CPU_MODE",
      15227
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_TRACKING_SPECIAL",
      15228
    ],
    [
      "CMD_NOTIFY_POWER_OFF",
      15229
    ],
    [
      "CMD_NOTIFY_ALBUM_UPDATE",
      15230
    ],
    [
      "CMD_NOTIFY_SENTRY_MODE_STATE",
      15231
    ],
    [
      "CMD_NOTIFY_SENTRY_MODE_TRACK_RESULT",
      15232
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_ONE_CLICK_GOTO",
      15233
    ],
    [
      "CMD_NOTIFY_STREAM_TYPE",
      15234
    ],
    [
      "CMD_NOTIFY_WIDE_RECORD_TIME",
      15235
    ],
    [
      "CMD_NOTIFY_STATE_WIDE_CAPTURE_RAW_LIVE_STACKING",
      15236
    ],
    [
      "CMD_NOTIFY_PROGRASS_WIDE_CAPTURE_RAW_LIVE_STACKING",
      15237
    ],
    [
      "CMD_NOTIFY_MULTI_TRACK_RESULT",
      15238
    ],
    [
      "CMD_NOTIFY_EQ_SOLVING_STATE",
      15239
    ],
    [
      "CMD_NOTIFY_UFO_MODE_STATE",
      15240
    ],
    [
      "CMD_NOTIFY_TELE_LONG_EXP_PROGRESS",
      15241
    ],
    [
      "CMD_NOTIFY_WIDE_LONG_EXP_PROGRESS",
      15242
    ],
    [
      "CMD_NOTIFY_TEMPERATURE",
      15243
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_COMPRESS_PROGRESS",
      15244
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_UPLOAD_PROGRESS",
      15245
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_COMPLETE",
      15245
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_WIDE_RAW_DARK",
      15247
    ],
    [
      "CMD_NOTIFY_SHOOTING_SCHEDULE_RESULT_AND_STATE",
      15248
    ],
    [
      "CMD_NOTIFY_SHOOTING_TASK_STATE",
      15249
    ],
    [
      "CMD_NOTIFY_SKY_SEACHER_STATE",
      15250
    ],
    [
      "CMD_NOTIFY_WIDE_MULTI_TRACK_RESULT",
      15251
    ],
    [
      "CMD_NOTIFY_WIDE_TRACK_RESULT",
      15252
    ],
    [
      "CMD_NOTIFY_STATE_AI_ENHANCE",
      15253
    ],
    [
      "CMD_NOTIFY_PROGRESS_AI_ENHANCE",
      15254
    ],
    [
      "CMD_NOTIFY_CALIBRATION_RESULT",
      15256
    ],
    [
      "CMD_NOTIFY_FOCUS",
      15257
    ],
    [
      "CMD_NOTIFY_UFO_AUTO_HAND_MODE",
      15258
    ],
    [
      "CMD_NOTIFY_CURRENT_PANORAMA_UPLOAD_STATE",
      15259
    ],
    [
      "CMD_NOTIFY_LOW_TEMP_PROTECTION_MODE",
      15260
    ],
    [
      "CMD_V3_NOTIFY_EXPOSURE_PROGRESS",
      15255
    ],
    [
      "CMD_V3_NOTIFY_DEVICE_STATE",
      15261
    ],
    [
      "CMD_V3_NOTIFY_STATE_LATCH",
      15262
    ],
    [
      "CMD_NOTIFY_PROGRESS_CAPTURE_MOSAIC",
      15263
    ],
    [
      "CMD_V3_NOTIFY_CAMERA_PARAM_STATE",
      15264
    ],
    [
      "CMD_NOTIFY_GENERAL_FLOAT_PARAM",
      15265
    ],
    [
      "CMD_NOTIFY_GENERAL_BOOL_PARAM",
      15266
    ],
    [
      "CMD_V3_NOTIFY_MODE_CHANGE",
      15267
    ],
    [
      "CMD_NOTIFY_TELE_SWITCH_CROP_RATIO",
      15268
    ],
    [
      "CMD_NOTIFY_TELE_SHOOTING_TECH_STATE",
      15269
    ],
    [
      "CMD_V3_NOTIFY_STACKING_DATA",
      15270
    ],
    [
      "CMD_NOTIFY_WIDE_SHOOTING_TECH_STATE",
      15271
    ],
    [
      "CMD_NOTIFY_RESOLUTION_PARAM",
      15272
    ],
    [
      "CMD_V3_NOTIFY_PHOTO_STATE",
      15273
    ],
    [
      "CMD_V3_NOTIFY_BURST_STATE",
      15274
    ],
    [
      "CMD_V3_NOTIFY_VIDEO_STATE",
      15275
    ],
    [
      "CMD_V3_NOTIFY_TIMELAPSE_STATE",
      15276
    ],
    [
      "CMD_NOTIFY_PANORAMA_STATE",
      15277
    ],
    [
      "CMD_V3_NOTIFY_AUTOFOCUS_STATE",
      15278
    ],
    [
      "CMD_NOTIFY_NORMAL_AUTO_FOCUS_STATE",
      15279
    ],
    [
      "CMD_V3_NOTIFY_AUTOFOCUS_STATE_ALT",
      15280
    ],
    [
      "CMD_NOTIFY_AREA_AUTO_FOCUS_STATE",
      15281
    ],
    [
      "CMD_NOTIFY_DUAL_CAMERA_LINKAGE_STATE",
      15282
    ],
    [
      "CMD_NOTIFY_RESOLUTION_FPS_STATE",
      15283
    ],
    [
      "CMD_NOTIFY_NORMAL_TRACK_STATE",
      15284
    ],
    [
      "CMD_V3_NOTIFY_PHOTO_BURST_PROGRESS",
      15285
    ],
    [
      "CMD_V3_NOTIFY_VIDEO_PROGRESS",
      15286
    ],
    [
      "CMD_V3_NOTIFY_TIMELAPSE_PROGRESS",
      15287
    ],
    [
      "CMD_V3_NOTIFY_EXPOSURE_DURATION",
      15288
    ],
    [
      "CMD_NOTIFY_SENTRY_MOTOR_STATE",
      15289
    ],
    [
      "CMD_V3_NOTIFY_CALI_FRAME_STATE",
      15290
    ],
    [
      "CMD_V3_NOTIFY_CALI_FRAME_PROGRESS",
      15291
    ],
    [
      "CMD_V3_NOTIFY_TEMPERATURE2",
      15292
    ],
    [
      "CMD_NOTIFY_PANORAMA_COMPRESS_PROGRESS",
      15293
    ],
    [
      "CMD_NOTIFY_PANORAMA_COMPRESS_COMPLETE",
      15294
    ],
    [
      "CMD_NOTIFY_DEVICE_ATTITUDE",
      15295
    ],
    [
      "CMD_V3_NOTIFY_OBSERVATION_STATE",
      15296
    ],
    [
      "CMD_NOTIFY_PANO_FRAMING_RECT_UPDATE",
      15297
    ],
    [
      "CMD_NOTIFY_PANO_FRAMING_THUMBNAIL_UPDATE",
      15298
    ],
    [
      "CMD_NOTIFY_PANO_FRAMING_STATE",
      15299
    ],
    [
      "CMD_NOTIFY_WIDE_FOCUS_POSITION",
      15300
    ],
    [
      "CMD_NOTIFY_LENS_DEFOG_STATE",
      15301
    ],
    [
      "CMD_NOTIFY_AUTO_COOLING_STATE",
      15302
    ],
    [
      "CMD_NOTIFY_AUTO_SHUTDOWN_STATE",
      15303
    ],
    [
      "CMD_NOTIFY_ROLL_LEVEL_CALIBRATION_ANGLE",
      15304
    ],
    [
      "CMD_NOTIFY_GUIDE_FOCUS_POSITION",
      15305
    ],
    [
      "CMD_PANORAMA_START_GRID",
      15500
    ],
    [
      "CMD_PANORAMA_STOP",
      15501
    ],
    [
      "CMD_PANORAMA_START_EULER_RANGE",
      15502
    ],
    [
      "CMD_PANORAMA_START_STITCH_UPLOAD",
      15503
    ],
    [
      "CMD_PANORAMA_STOP_STITCH_UPLOAD",
      15504
    ],
    [
      "CMD_PANORAMA_GET_CURRENT_UPLOAD_STATE",
      15505
    ],
    [
      "CMD_PANORAMA_GET_UPLOAD_PREDICT",
      15506
    ],
    [
      "CMD_PANORAMA_START_COMPRESS",
      15507
    ],
    [
      "CMD_PANORAMA_STOP_COMPRESS",
      15508
    ],
    [
      "CMD_PANORAMA_START_FRAMING",
      15509
    ],
    [
      "CMD_PANORAMA_STOP_FRAMING",
      15510
    ],
    [
      "CMD_PANORAMA_RESET_FRAMING",
      15511
    ],
    [
      "CMD_PANORAMA_UPDATE_FRAMING_RECT",
      15512
    ],
    [
      "CMD_PANORAMA_STOP_FRAMEING_AND_START_GRID",
      15513
    ],
    [
      "CMD_ITIPS_GET",
      15700
    ],
    [
      "CMD_SYNC_SHOOTING_SCHEDULE",
      16100
    ],
    [
      "CMD_CANCEL_SHOOTING_SCHEDULE",
      16101
    ],
    [
      "CMD_V3_SCHEDULE_GET",
      16102
    ],
    [
      "CMD_GET_SHOOTING_SCHEDULE_BY_ID",
      16103
    ],
    [
      "CMD_REPLACE_SHOOTING_SCHEDULE",
      16105
    ],
    [
      "CMD_UNLOCK_SHOOTING_SCHEDULE",
      16106
    ],
    [
      "CMD_LOCK_SHOOTING_SCHEDULE",
      16107
    ],
    [
      "CMD_DELETE_SHOOTING_SCHEDULE",
      16108
    ],
    [
      "CMD_GLOBAL_TASK_MANAGER_START_TASK",
      16400
    ],
    [
      "CMD_GLOBAL_TASK_MANAGER_STOP_TASK",
      16401
    ],
    [
      "CMD_V3_DEVICE_CONFIG_MODE_QUERY",
      16402
    ],
    [
      "CMD_V3_DEVICE_CONFIG_SHOOTING_MODE",
      16403
    ],
    [
      "CMD_V3_DEVICE_CONFIG_MODE_SWITCH",
      16404
    ],
    [
      "CMD_V3_DEVICE_CONFIG_GET_CONFIG",
      16405
    ],
    [
      "CMD_GLOBAL_VOICE_ASSISTANT_TASK",
      16406
    ],
    [
      "CMD_V3_CAMERA_PARAMS_SET_PARAM",
      16700
    ],
    [
      "CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN",
      16701
    ],
    [
      "CMD_V3_CAMERA_PARAMS_UNKNOWN_16702",
      16702
    ],
    [
      "CMD_V3_CAMERA_PARAMS_ADJUST",
      16703
    ],
    [
      "CMD_PARAM_SET_GENERAL_FLOAT_PARAM",
      16704
    ],
    [
      "CMD_PARAM_SET_GENERAL_BOOL_PARAM",
      16705
    ],
    [
      "CMD_V3_CAMERA_PARAMS_STREAM_CTRL",
      16706
    ],
    [
      "CMD_VOICE_ASSISTANT_TASK",
      16800
    ],
    [
      "CMD_CAMERA_GUIDE_SET_EXP",
      16900
    ],
    [
      "CMD_CAMERA_GUIDE_GET_EXP",
      16901
    ],
    [
      "CMD_CAMERA_GUIDE_SET_GAIN",
      16902
    ],
    [
      "CMD_CAMERA_GUIDE_GET_GAIN",
      16903
    ],
    [
      "CMD_DEVICE_LENS_DEFOG",
      17000
    ],
    [
      "CMD_DEVICE_AUTO_COOLING",
      17001
    ],
    [
      "CMD_DEVICE_AUTO_SHUTDOWN",
      17002
    ]
  ],
  "allowAlias": true
}
```

Current:

```json
{
  "values": [
    [
      "NO_CMD",
      0
    ],
    [
      "CMD_CAMERA_TELE_OPEN_CAMERA",
      10000
    ],
    [
      "CMD_CAMERA_TELE_CLOSE_CAMERA",
      10001
    ],
    [
      "CMD_CAMERA_TELE_PHOTOGRAPH",
      10002
    ],
    [
      "CMD_CAMERA_TELE_BURST",
      10003
    ],
    [
      "CMD_CAMERA_TELE_STOP_BURST",
      10004
    ],
    [
      "CMD_CAMERA_TELE_START_RECORD",
      10005
    ],
    [
      "CMD_CAMERA_TELE_STOP_RECORD",
      10006
    ],
    [
      "CMD_CAMERA_TELE_SET_EXP_MODE",
      10007
    ],
    [
      "CMD_CAMERA_TELE_GET_EXP_MODE",
      10008
    ],
    [
      "CMD_CAMERA_TELE_SET_EXP",
      10009
    ],
    [
      "CMD_CAMERA_TELE_GET_EXP",
      10010
    ],
    [
      "CMD_CAMERA_TELE_SET_GAIN_MODE",
      10011
    ],
    [
      "CMD_CAMERA_TELE_GET_GAIN_MODE",
      10012
    ],
    [
      "CMD_CAMERA_TELE_SET_GAIN",
      10013
    ],
    [
      "CMD_CAMERA_TELE_GET_GAIN",
      10014
    ],
    [
      "CMD_CAMERA_TELE_SET_BRIGHTNESS",
      10015
    ],
    [
      "CMD_CAMERA_TELE_GET_BRIGHTNESS",
      10016
    ],
    [
      "CMD_CAMERA_TELE_SET_CONTRAST",
      10017
    ],
    [
      "CMD_CAMERA_TELE_GET_CONTRAST",
      10018
    ],
    [
      "CMD_CAMERA_TELE_SET_SATURATION",
      10019
    ],
    [
      "CMD_CAMERA_TELE_GET_SATURATION",
      10020
    ],
    [
      "CMD_CAMERA_TELE_SET_HUE",
      10021
    ],
    [
      "CMD_CAMERA_TELE_GET_HUE",
      10022
    ],
    [
      "CMD_CAMERA_TELE_SET_SHARPNESS",
      10023
    ],
    [
      "CMD_CAMERA_TELE_GET_SHARPNESS",
      10024
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_MODE",
      10025
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_MODE",
      10026
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_SCENE",
      10027
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_SCENE",
      10028
    ],
    [
      "CMD_CAMERA_TELE_SET_WB_CT",
      10029
    ],
    [
      "CMD_CAMERA_TELE_GET_WB_CT",
      10030
    ],
    [
      "CMD_CAMERA_TELE_SET_IRCUT",
      10031
    ],
    [
      "CMD_CAMERA_TELE_GET_IRCUT",
      10032
    ],
    [
      "CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO",
      10033
    ],
    [
      "CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO",
      10034
    ],
    [
      "CMD_CAMERA_TELE_SET_ALL_PARAMS",
      10035
    ],
    [
      "CMD_CAMERA_TELE_GET_ALL_PARAMS",
      10036
    ],
    [
      "CMD_CAMERA_TELE_SET_FEATURE_PARAM",
      10037
    ],
    [
      "CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS",
      10038
    ],
    [
      "CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE",
      10039
    ],
    [
      "CMD_CAMERA_TELE_SET_JPG_QUALITY",
      10040
    ],
    [
      "CMD_CAMERA_TELE_PHOTO_RAW",
      10041
    ],
    [
      "CMD_CAMERA_TELE_SET_RTSP_BITRATE_TYPE",
      10042
    ],
    [
      "CMD_CAMERA_TELE_SET_PREVIEW_QUALITY",
      10050
    ],
    [
      "CMD_V3_CAMERA_TELE_OPEN_CAMERA",
      10050
    ],
    [
      "CMD_ASTRO_START_CALIBRATION",
      11000
    ],
    [
      "CMD_ASTRO_STOP_CALIBRATION",
      11001
    ],
    [
      "CMD_ASTRO_START_GOTO_DSO",
      11002
    ],
    [
      "CMD_ASTRO_START_GOTO_SOLAR_SYSTEM",
      11003
    ],
    [
      "CMD_ASTRO_STOP_GOTO",
      11004
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING",
      11005
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING",
      11006
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_DARK",
      11007
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_DARK",
      11008
    ],
    [
      "CMD_ASTRO_CHECK_GOT_DARK",
      11009
    ],
    [
      "CMD_ASTRO_GO_LIVE",
      11010
    ],
    [
      "CMD_ASTRO_START_TRACK_SPECIAL_TARGET",
      11011
    ],
    [
      "CMD_ASTRO_STOP_TRACK_SPECIAL_TARGET",
      11012
    ],
    [
      "CMD_ASTRO_START_ONE_CLICK_GOTO_DSO",
      11013
    ],
    [
      "CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM",
      11014
    ],
    [
      "CMD_ASTRO_STOP_ONE_CLICK_GOTO",
      11015
    ],
    [
      "CMD_ASTRO_START_WIDE_CAPTURE_LIVE_STACKING",
      11016
    ],
    [
      "CMD_ASTRO_STOP_WIDE_CAPTURE_LIVE_STACKING",
      11017
    ],
    [
      "CMD_ASTRO_START_EQ_SOLVING",
      11018
    ],
    [
      "CMD_ASTRO_STOP_EQ_SOLVING",
      11019
    ],
    [
      "CMD_ASTRO_WIDE_GO_LIVE",
      11020
    ],
    [
      "CMD_ASTRO_START_CAPTURE_RAW_DARK_WITH_PARAM",
      11021
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_RAW_DARK_WITH_PARAM",
      11022
    ],
    [
      "CMD_ASTRO_GET_DARK_FRAME_LIST",
      11023
    ],
    [
      "CMD_ASTRO_DEL_DARK_FRAME_LIST",
      11024
    ],
    [
      "CMD_ASTRO_START_CAPTURE_WIDE_RAW_DARK_WITH_PARAM",
      11025
    ],
    [
      "CMD_ASTRO_STOP_CAPTURE_WIDE_RAW_DARK_WITH_PARAM",
      11026
    ],
    [
      "CMD_ASTRO_GET_WIDE_DARK_FRAME_LIST",
      11027
    ],
    [
      "CMD_ASTRO_DEL_WIDE_DARK_FRAME_LIST",
      11028
    ],
    [
      "CMD_ASTRO_START_MAKE_FITS_THUMB",
      11033
    ],
    [
      "CMD_V3_ASTRO_SAVE_STACKED_IMAGE",
      11033
    ],
    [
      "CMD_ASTRO_STOP_MAKE_FITS_THUMB",
      11034
    ],
    [
      "CMD_V3_ASTRO_LIST_SAVED_IMAGES",
      11034
    ],
    [
      "CMD_ASTRO_STOP_RESTACKED",
      11036
    ],
    [
      "CMD_V3_ASTRO_SAVE_COMPLETE",
      11036
    ],
    [
      "CMD_ASTRO_GET_ASTRO_SHOOTING_TIME",
      11039
    ],
    [
      "CMD_V3_ASTRO_STATUS_POLLING",
      11039
    ],
    [
      "CMD_ASTRO_GET_QUICK_SET_LIST",
      11040
    ],
    [
      "CMD_V3_ASTRO_GET_PARAMS",
      11040
    ],
    [
      "CMD_ASTRO_SET_QUICK_SET",
      11041
    ],
    [
      "CMD_V3_ASTRO_SET_PARAMS",
      11041
    ],
    [
      "CMD_ASTRO_GET_CALI_FRAME_LIST",
      11043
    ],
    [
      "CMD_V3_ASTRO_GET_PRESETS",
      11043
    ],
    [
      "CMD_ASTRO_START_SKY_TARGET_FINDER",
      11047
    ],
    [
      "CMD_V3_ASTRO_SET_LOCATION",
      11047
    ],
    [
      "CMD_ASTRO_STOP_SKY_TARGET_FINDER",
      11048
    ],
    [
      "CMD_V3_ASTRO_CONFIRM",
      11048
    ],
    [
      "CMD_ASTRO_CONTINUE_SHOOTING",
      11050
    ],
    [
      "CMD_CAMERA_WIDE_OPEN_CAMERA",
      12000
    ],
    [
      "CMD_CAMERA_WIDE_CLOSE_CAMERA",
      12001
    ],
    [
      "CMD_CAMERA_WIDE_SET_EXP_MODE",
      12002
    ],
    [
      "CMD_CAMERA_WIDE_GET_EXP_MODE",
      12003
    ],
    [
      "CMD_CAMERA_WIDE_SET_EXP",
      12004
    ],
    [
      "CMD_CAMERA_WIDE_GET_EXP",
      12005
    ],
    [
      "CMD_CAMERA_WIDE_SET_GAIN",
      12006
    ],
    [
      "CMD_CAMERA_WIDE_GET_GAIN",
      12007
    ],
    [
      "CMD_CAMERA_WIDE_SET_BRIGHTNESS",
      12008
    ],
    [
      "CMD_CAMERA_WIDE_GET_BRIGHTNESS",
      12009
    ],
    [
      "CMD_CAMERA_WIDE_SET_CONTRAST",
      12010
    ],
    [
      "CMD_CAMERA_WIDE_GET_CONTRAST",
      12011
    ],
    [
      "CMD_CAMERA_WIDE_SET_SATURATION",
      12012
    ],
    [
      "CMD_CAMERA_WIDE_GET_SATURATION",
      12013
    ],
    [
      "CMD_CAMERA_WIDE_SET_HUE",
      12014
    ],
    [
      "CMD_CAMERA_WIDE_GET_HUE",
      12015
    ],
    [
      "CMD_CAMERA_WIDE_SET_SHARPNESS",
      12016
    ],
    [
      "CMD_CAMERA_WIDE_GET_SHARPNESS",
      12017
    ],
    [
      "CMD_CAMERA_WIDE_SET_WB_MODE",
      12018
    ],
    [
      "CMD_CAMERA_WIDE_GET_WB_MODE",
      12019
    ],
    [
      "CMD_CAMERA_WIDE_SET_WB_CT",
      12020
    ],
    [
      "CMD_CAMERA_WIDE_GET_WB_CT",
      12021
    ],
    [
      "CMD_CAMERA_WIDE_PHOTOGRAPH",
      12022
    ],
    [
      "CMD_CAMERA_WIDE_BURST",
      12023
    ],
    [
      "CMD_CAMERA_WIDE_STOP_BURST",
      12024
    ],
    [
      "CMD_CAMERA_WIDE_START_TIMELAPSE_PHOTO",
      12025
    ],
    [
      "CMD_CAMERA_WIDE_STOP_TIMELAPSE_PHOTO",
      12026
    ],
    [
      "CMD_CAMERA_WIDE_GET_ALL_PARAMS",
      12027
    ],
    [
      "CMD_CAMERA_WIDE_SET_ALL_PARAMS",
      12028
    ],
    [
      "CMD_CAMERA_WIDE_START_RECORD",
      12030
    ],
    [
      "CMD_CAMERA_WIDE_STOP_RECORD",
      12031
    ],
    [
      "CMD_CAMERA_WIDE_SET_PREVIEW_QUALITY",
      12036
    ],
    [
      "CMD_V3_CAMERA_WIDE_OPEN_CAMERA",
      12036
    ],
    [
      "CMD_SYSTEM_SET_TIME",
      13000
    ],
    [
      "CMD_SYSTEM_SET_TIME_ZONE",
      13001
    ],
    [
      "CMD_SYSTEM_SET_MTP_MODE",
      13002
    ],
    [
      "CMD_SYSTEM_SET_CPU_MODE",
      13003
    ],
    [
      "CMD_SYSTEM_SET_MASTER",
      13004
    ],
    [
      "CMD_SYSTEM_SET_MASTERLOCK",
      13004
    ],
    [
      "CMD_SYSTEM_SET_LOCATION",
      13010
    ],
    [
      "CMD_V3_SYSTEM_SET_GPS_LOCATION",
      13010
    ],
    [
      "CMD_RGB_POWER_OPEN_RGB",
      13500
    ],
    [
      "CMD_RGB_POWER_CLOSE_RGB",
      13501
    ],
    [
      "CMD_RGB_POWER_POWER_DOWN",
      13502
    ],
    [
      "CMD_RGB_POWER_POWERIND_ON",
      13503
    ],
    [
      "CMD_RGB_POWER_POWERIND_OFF",
      13504
    ],
    [
      "CMD_RGB_POWER_REBOOT",
      13505
    ],
    [
      "CMD_STEP_MOTOR_RUN",
      14000
    ],
    [
      "CMD_STEP_MOTOR_RUN_TO",
      14001
    ],
    [
      "CMD_STEP_MOTOR_STOP",
      14002
    ],
    [
      "CMD_STEP_MOTOR_RESET",
      14003
    ],
    [
      "CMD_STEP_MOTOR_CHANGE_SPEED",
      14004
    ],
    [
      "CMD_STEP_MOTOR_CHANGE_DIRECTION",
      14005
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK",
      14006
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK_FIXED_ANGLE",
      14007
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP",
      14008
    ],
    [
      "CMD_STEP_MOTOR_SERVICE_DUAL_CAMERA_LINKAGE",
      14009
    ],
    [
      "CMD_STEP_MOTOR_RUN_IN_PULSE",
      14010
    ],
    [
      "CMD_STEP_MOTOR_GET_POSITION",
      14011
    ],
    [
      "CMD_TRACK_START_TRACK",
      14800
    ],
    [
      "CMD_TRACK_STOP_TRACK",
      14801
    ],
    [
      "CMD_SENTRY_MODE_START",
      14802
    ],
    [
      "CMD_SENTRY_MODE_STOP",
      14803
    ],
    [
      "CMD_MOT_START",
      14804
    ],
    [
      "CMD_MOT_TRACK_ONE",
      14805
    ],
    [
      "CMD_UFOTRACK_MODE_START",
      14806
    ],
    [
      "CMD_UFOTRACK_MODE_STOP",
      14807
    ],
    [
      "CMD_MOT_WIDE_TRACK_ONE",
      14808
    ],
    [
      "CMD_SWITCH_MAIN_PREVIEW",
      14809
    ],
    [
      "CMD_WIDE_TELE_TRACK_SWITCH",
      14809
    ],
    [
      "CMD_UFO_HAND_AOTO_MODE",
      14810
    ],
    [
      "CMD_FOCUS_AUTO_FOCUS",
      15000
    ],
    [
      "CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS",
      15001
    ],
    [
      "CMD_FOCUS_START_MANUAL_CONTINU_FOCUS",
      15002
    ],
    [
      "CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS",
      15003
    ],
    [
      "CMD_FOCUS_START_ASTRO_AUTO_FOCUS",
      15004
    ],
    [
      "CMD_FOCUS_STOP_ASTRO_AUTO_FOCUS",
      15005
    ],
    [
      "CMD_FOCUS_GET_USER_INFINITY_POS",
      15011
    ],
    [
      "CMD_V3_FOCUS_INIT",
      15011
    ],
    [
      "CMD_NOTIFY_TELE_WIDE_PICTURE_MATCHING",
      15200
    ],
    [
      "CMD_NOTIFY_TELE_WIDI_PICTURE_MATCHING",
      15200
    ],
    [
      "CMD_NOTIFY_ELE",
      15201
    ],
    [
      "CMD_NOTIFY_CHARGE",
      15202
    ],
    [
      "CMD_NOTIFY_SDCARD_INFO",
      15203
    ],
    [
      "CMD_NOTIFY_TELE_RECORD_TIME",
      15204
    ],
    [
      "CMD_NOTIFY_TELE_TIMELAPSE_OUT_TIME",
      15205
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_RAW_DARK",
      15206
    ],
    [
      "CMD_NOTIFY_PROGRASS_CAPTURE_RAW_DARK",
      15207
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_RAW_LIVE_STACKING",
      15208
    ],
    [
      "CMD_NOTIFY_PROGRASS_CAPTURE_RAW_LIVE_STACKING",
      15209
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_CALIBRATION",
      15210
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_GOTO",
      15211
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_TRACKING",
      15212
    ],
    [
      "CMD_NOTIFY_TELE_SET_PARAM",
      15213
    ],
    [
      "CMD_NOTIFY_WIDE_SET_PARAM",
      15214
    ],
    [
      "CMD_NOTIFY_TELE_FUNCTION_STATE",
      15215
    ],
    [
      "CMD_NOTIFY_WIDE_FUNCTION_STATE",
      15216
    ],
    [
      "CMD_NOTIFY_SET_FEATURE_PARAM",
      15217
    ],
    [
      "CMD_NOTIFY_TELE_BURST_PROGRESS",
      15218
    ],
    [
      "CMD_NOTIFY_PANORAMA_PROGRESS",
      15219
    ],
    [
      "CMD_NOTIFY_WIDE_BURST_PROGRESS",
      15220
    ],
    [
      "CMD_NOTIFY_RGB_STATE",
      15221
    ],
    [
      "CMD_NOTIFY_POWER_IND_STATE",
      15222
    ],
    [
      "CMD_NOTIFY_WS_HOST_SLAVE_MODE",
      15223
    ],
    [
      "CMD_NOTIFY_MTP_STATE",
      15224
    ],
    [
      "CMD_NOTIFY_TRACK_RESULT",
      15225
    ],
    [
      "CMD_NOTIFY_WIDE_TIMELAPSE_OUT_TIME",
      15226
    ],
    [
      "CMD_NOTIFY_CPU_MODE",
      15227
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_TRACKING_SPECIAL",
      15228
    ],
    [
      "CMD_NOTIFY_POWER_OFF",
      15229
    ],
    [
      "CMD_NOTIFY_ALBUM_UPDATE",
      15230
    ],
    [
      "CMD_NOTIFY_SENTRY_MODE_STATE",
      15231
    ],
    [
      "CMD_NOTIFY_SENTRY_MODE_TRACK_RESULT",
      15232
    ],
    [
      "CMD_NOTIFY_STATE_ASTRO_ONE_CLICK_GOTO",
      15233
    ],
    [
      "CMD_NOTIFY_STREAM_TYPE",
      15234
    ],
    [
      "CMD_NOTIFY_WIDE_RECORD_TIME",
      15235
    ],
    [
      "CMD_NOTIFY_STATE_WIDE_CAPTURE_RAW_LIVE_STACKING",
      15236
    ],
    [
      "CMD_NOTIFY_PROGRASS_WIDE_CAPTURE_RAW_LIVE_STACKING",
      15237
    ],
    [
      "CMD_NOTIFY_MULTI_TRACK_RESULT",
      15238
    ],
    [
      "CMD_NOTIFY_EQ_SOLVING_STATE",
      15239
    ],
    [
      "CMD_NOTIFY_UFO_MODE_STATE",
      15240
    ],
    [
      "CMD_NOTIFY_TELE_LONG_EXP_PROGRESS",
      15241
    ],
    [
      "CMD_NOTIFY_WIDE_LONG_EXP_PROGRESS",
      15242
    ],
    [
      "CMD_NOTIFY_TEMPERATURE",
      15243
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_COMPRESS_PROGRESS",
      15244
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_UPLOAD_PROGRESS",
      15245
    ],
    [
      "CMD_NOTIFY_PANORAMA_UPLOAD_COMPLETE",
      15245
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_WIDE_RAW_DARK",
      15247
    ],
    [
      "CMD_NOTIFY_SHOOTING_SCHEDULE_RESULT_AND_STATE",
      15248
    ],
    [
      "CMD_NOTIFY_SHOOTING_TASK_STATE",
      15249
    ],
    [
      "CMD_NOTIFY_SKY_SEACHER_STATE",
      15250
    ],
    [
      "CMD_NOTIFY_WIDE_MULTI_TRACK_RESULT",
      15251
    ],
    [
      "CMD_NOTIFY_WIDE_TRACK_RESULT",
      15252
    ],
    [
      "CMD_NOTIFY_CALIBRATION_RESULT",
      15256
    ],
    [
      "CMD_NOTIFY_FOCUS_POSITION",
      15257
    ],
    [
      "CMD_NOTIFY_FOCUS",
      15257
    ],
    [
      "CMD_NOTIFY_WAIT_SHOOTING_PROGRESS",
      15255
    ],
    [
      "CMD_V3_NOTIFY_EXPOSURE_PROGRESS",
      15255
    ],
    [
      "CMD_NOTIFY_EXCLUSIVE_SYSTEM_IO_TASK_STATE",
      15261
    ],
    [
      "CMD_V3_NOTIFY_DEVICE_STATE",
      15261
    ],
    [
      "CMD_NOTIFY_GENERAL_INT_PARAM",
      15264
    ],
    [
      "CMD_V3_NOTIFY_CAMERA_PARAM_STATE",
      15264
    ],
    [
      "CMD_NOTIFY_SWITCH_SHOOTING_MODE",
      15267
    ],
    [
      "CMD_V3_NOTIFY_MODE_CHANGE",
      15267
    ],
    [
      "CMD_NOTIFY_WB",
      15270
    ],
    [
      "CMD_V3_NOTIFY_STACKING_DATA",
      15270
    ],
    [
      "CMD_NOTIFY_PHOTO_STATE",
      15273
    ],
    [
      "CMD_V3_NOTIFY_PHOTO_STATE",
      15273
    ],
    [
      "CMD_NOTIFY_BURST_STATE",
      15274
    ],
    [
      "CMD_V3_NOTIFY_BURST_STATE",
      15274
    ],
    [
      "CMD_NOTIFY_RECORD_STATE",
      15275
    ],
    [
      "CMD_V3_NOTIFY_VIDEO_STATE",
      15275
    ],
    [
      "CMD_NOTIFY_TIMELAPSE_STATE",
      15276
    ],
    [
      "CMD_V3_NOTIFY_TIMELAPSE_STATE",
      15276
    ],
    [
      "CMD_NOTIFY_ASTRO_AUTO_FOCUS_STATE",
      15278
    ],
    [
      "CMD_V3_NOTIFY_AUTOFOCUS_STATE",
      15278
    ],
    [
      "CMD_NOTIFY_ASTRO_AUTO_FOCUS_FAST_STATE",
      15280
    ],
    [
      "CMD_V3_NOTIFY_AUTOFOCUS_STATE_ALT",
      15280
    ],
    [
      "CMD_NOTIFY_BURST_PROGRESS",
      15285
    ],
    [
      "CMD_V3_NOTIFY_PHOTO_BURST_PROGRESS",
      15285
    ],
    [
      "CMD_NOTIFY_RECORD_TIME",
      15286
    ],
    [
      "CMD_V3_NOTIFY_VIDEO_PROGRESS",
      15286
    ],
    [
      "CMD_NOTIFY_TIMELAPSE_OUT_TIME",
      15287
    ],
    [
      "CMD_V3_NOTIFY_TIMELAPSE_PROGRESS",
      15287
    ],
    [
      "CMD_NOTIFY_LONG_EXP_PROGRESS",
      15288
    ],
    [
      "CMD_NOTIFY_STATE_CAPTURE_CALI_FRAME",
      15290
    ],
    [
      "CMD_V3_NOTIFY_CALI_FRAME_STATE",
      15290
    ],
    [
      "CMD_NOTIFY_PROGRESS_CAPTURE_CALI_FRAME",
      15291
    ],
    [
      "CMD_V3_NOTIFY_CALI_FRAME_PROGRESS",
      15291
    ],
    [
      "CMD_NOTIFY_CMOS_TEMPERATURE",
      15292
    ],
    [
      "CMD_V3_NOTIFY_TEMPERATURE2",
      15292
    ],
    [
      "CMD_NOTIFY_SKY_TARGET_FINDER_STATE",
      15296
    ],
    [
      "CMD_V3_NOTIFY_OBSERVATION_STATE",
      15296
    ],
    [
      "CMD_PANORAMA_START_GRID",
      15500
    ],
    [
      "CMD_PANORAMA_STOP",
      15501
    ],
    [
      "CMD_PANORAMA_START_EULER_RANGE",
      15502
    ],
    [
      "CMD_GET_ALL_SHOOTING_SCHEDULE",
      16102
    ],
    [
      "CMD_V3_SCHEDULE_GET",
      16102
    ],
    [
      "CMD_GLOBAL_TASK_MANAGER_SWITCH_SHOOTING_MODE",
      16402
    ],
    [
      "CMD_V3_DEVICE_CONFIG_MODE_QUERY",
      16402
    ],
    [
      "CMD_GLOBAL_TASK_MANAGER_SWITCH_SHOOTING_TECH",
      16403
    ],
    [
      "CMD_V3_DEVICE_CONFIG_SHOOTING_MODE",
      16403
    ],
    [
      "CMD_GLOBAL_TASK_MANAGER_ENTER_CAMERA",
      16404
    ],
    [
      "CMD_V3_DEVICE_CONFIG_MODE_SWITCH",
      16404
    ],
    [
      "CMD_GLOBAL_TASK_GET_DEVICE_STATE_INFO",
      16405
    ],
    [
      "CMD_V3_DEVICE_CONFIG_GET_CONFIG",
      16405
    ],
    [
      "CMD_PARAM_SET_EXPOSURE",
      16700
    ],
    [
      "CMD_V3_CAMERA_PARAMS_SET_PARAM",
      16700
    ],
    [
      "CMD_PARAM_SET_GAIN",
      16701
    ],
    [
      "CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN",
      16701
    ],
    [
      "CMD_PARAM_SET_GENERAL_INT_PARAM",
      16703
    ],
    [
      "CMD_V3_CAMERA_PARAMS_ADJUST",
      16703
    ],
    [
      "CMD_PARAM_SET_AUTO_PARAMS",
      16706
    ],
    [
      "CMD_V3_CAMERA_PARAMS_STREAM_CTRL",
      16706
    ]
  ],
  "allowAlias": true
}
```

#### DwarfErrorCode

Legacy:

```json
{
  "values": [
    [
      "OK",
      0
    ],
    [
      "WS_OK",
      0
    ],
    [
      "WS_PARSE_PROTOBUF_ERROR",
      -1
    ],
    [
      "WS_SDCARD_NOT_EXIST",
      -2
    ],
    [
      "WS_INVAID_PARAM",
      -3
    ],
    [
      "WS_SDCARD_WRITE_ERROR",
      -4
    ],
    [
      "WS_DEVICE_NOT_ACTIVATED",
      -5
    ],
    [
      "WS_SDCARD_FULL_ERROR",
      -6
    ],
    [
      "CODE_CAMERA_TELE_OPENED",
      -10500
    ],
    [
      "CODE_CAMERA_TELE_CLOSED",
      -10501
    ],
    [
      "CODE_CAMERA_TELE_ISP_SET_FAILED",
      -10502
    ],
    [
      "CODE_CAMERA_TELE_OPEN_FAILED",
      -10503
    ],
    [
      "CODE_CAMERA_TELE_START_RECORD_FAILED",
      -10504
    ],
    [
      "CODE_CAMERA_TELE_STOP_RECORD_FAILED",
      -10505
    ],
    [
      "CODE_CAMERA_TELE_CAPTURE_RAW_FAILED",
      -10506
    ],
    [
      "CODE_CAMERA_TELE_WORKING_BUSY",
      -10507
    ],
    [
      "CODE_CAMERA_TELE_GET_IMAGE_FAILED",
      -10508
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_PHOTO",
      -10509
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_RECORD",
      -10510
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_PANORAMA",
      -10511
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_TIMELAPSE",
      -10512
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_CAPTURE_DARK",
      -10513
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_CAPTURE_LIVE_STACKING",
      -10514
    ],
    [
      "CODE_CAMERA_TELE_EXP_TOO_LONG",
      -10515
    ],
    [
      "CODE_CAMERA_TELE_SWITCH_WORK_MODE_FAILED",
      -10516
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_TRACK",
      -10517
    ],
    [
      "CODE_CAMERA_TELE_RECORD_FILE_ERROR",
      -10518
    ],
    [
      "CODE_ASTRO_PLATE_SOLVING_FAILED",
      -11500
    ],
    [
      "CODE_ASTRO_FUNCTION_BUSY",
      -11501
    ],
    [
      "CODE_ASTRO_DARK_GAIN_OUT_OF_RANGE",
      -11502
    ],
    [
      "CODE_ASTRO_DARK_NOT_FOUND",
      -11503
    ],
    [
      "CODE_ASTRO_CALIBRATION_FAILED",
      -11504
    ],
    [
      "CODE_ASTRO_GOTO_FAILED",
      -11505
    ],
    [
      "CODE_ASTRO_DARK_RUNNING",
      -11506
    ],
    [
      "CODE_ASTRO_CALIBRATION_RUNNING",
      -11507
    ],
    [
      "CODE_ASTRO_GOTO_RUNNING",
      -11508
    ],
    [
      "CODE_ASTRO_LIVE_STACKING_RUNNING",
      -11509
    ],
    [
      "CODE_ASTRO_RESET_PITCH_MOTOR_FAILED",
      -11510
    ],
    [
      "CODE_ASTRO_NEED_CALIBRATION",
      -11511
    ],
    [
      "CODE_ASTRO_GOTO_READ_MOTOR_POSITION_AND_PLATE_SOLVING_FAILED",
      -11512
    ],
    [
      "CODE_ASTRO_NEED_GOTO",
      -11513
    ],
    [
      "CODE_ASTRO_NEED_ADJUST_SHOOT_PARAM",
      -11514
    ],
    [
      "CODE_ASTRO_CALIBRATION_PLATE_SOLVING_FAILED_TOO_MUCH",
      -11515
    ],
    [
      "CODE_ASTRO_EQ_SOLVING_FAILED",
      -11516
    ],
    [
      "CODE_ASTRO_SKY_SEARCH_FAILED",
      -11517
    ],
    [
      "CODE_ASTRO_NEED_GOTO_DSO",
      -11518
    ],
    [
      "CODE_ASTRO_RESTACK_CAMERA_MISMATCH",
      -11519
    ],
    [
      "CODE_ASTRO_RESTACK_BINNING_MISMATCH",
      -11520
    ],
    [
      "CODE_ASTRO_RESTACK_FILTER_MISMATCH",
      -11521
    ],
    [
      "CODE_ASTRO_RESTACK_TARGET_MISMATCH",
      -11522
    ],
    [
      "CODE_ASTRO_RESTACK_DARKFRAME_MISMATCH",
      -11523
    ],
    [
      "CODE_ASTRO_RESTACK_FAILED",
      -11524
    ],
    [
      "CODE_ASTRO_RESTACK_INVALID_DATA",
      -11525
    ],
    [
      "CODE_ASTRO_OVEREXPOSURE_WARNING",
      -11526
    ],
    [
      "CODE_ASTRO_EXP_TOO_LONG",
      -11527
    ],
    [
      "CODE_ASTRO_NEED_EQ",
      -11528
    ],
    [
      "CODE_ASTRO_STAR_TOO_FEW",
      -11529
    ],
    [
      "CODE_ASTRO_DARK_TEMP_MISMATCH",
      -11530
    ],
    [
      "CODE_ASTRO_SUN_MOON_NOT_FOUND",
      -11531
    ],
    [
      "CODE_ASTRO_GUIDING_FAILED_LOWER_EXPOSURE",
      -11532
    ],
    [
      "CODE_ASTRO_GUIDING_FAILED_TARGET_BLOCKED",
      -11533
    ],
    [
      "CODE_CAMERA_WIDE_OPENED",
      -12500
    ],
    [
      "CODE_CAMERA_WIDE_CLOSED",
      -12501
    ],
    [
      "CODE_CAMERA_WIDE_CANNOT_FOUND",
      -12502
    ],
    [
      "CODE_CAMERA_WIDE_OPEN_FAILED",
      -12503
    ],
    [
      "CODE_CAMERA_WIDE_CLOSE_FAILED",
      -12504
    ],
    [
      "CODE_CAMERA_WIDE_SET_ISP_FAILED",
      -12505
    ],
    [
      "CODE_CAMERA_WIDE_PHOTOGRAPHING",
      -12506
    ],
    [
      "CODE_CAMERA_WIDE_TIMELAPSE_RECORDING",
      -12507
    ],
    [
      "CODE_CAMERA_WIDE_EXP_TOO_LONG",
      -12508
    ],
    [
      "CODE_CAMERA_WIDE_RECORD_FILE_ERROR",
      -12509
    ],
    [
      "CODE_SYSTEM_SET_TIME_FAILED",
      -13300
    ],
    [
      "CODE_SYSTEM_SET_TIMEZONE_FAILED",
      -13301
    ],
    [
      "CODE_RGB_POWER_UART_INIT_FAILED",
      -13800
    ],
    [
      "CODE_RGB_POWER_UART_SEND_FAILED",
      -13801
    ],
    [
      "CODE_STEP_MOTOR_IS_RUNNING",
      -14500
    ],
    [
      "CODE_STEP_MOTOR_IS_STOPPED",
      -14501
    ],
    [
      "CODE_STEP_MOTOR_PARALLEL_IN",
      -14502
    ],
    [
      "CODE_STEP_MOTOR_PARALLEL_END",
      -14503
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_ID",
      -14504
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_ANGLE",
      -14505
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED",
      -14506
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED_RAMPING",
      -14507
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_RESOLUTION",
      -14508
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_POSITION",
      -14509
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_LIMIT_RETURN",
      -14510
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_RESET_RETURN",
      -14511
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_ABSOLUTE_POSITION_RETURN",
      -14512
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_RELATIVE_POSITION_RETURN",
      -14513
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_WAIT_TO_STOP",
      -14514
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_WAIT_TO_RUN",
      -14515
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_SPEED_TO_MAX",
      -14516
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_SPEED_TO_MIN",
      -14517
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_POSITION_WARNING",
      -14518
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_POSITION_HIT",
      -14519
    ],
    [
      "CODE_STEP_MOTOR_NEED_RESET",
      -14520
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_PE_SWITCH_RETURN",
      -14521
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_TO_RESET",
      -14522
    ],
    [
      "CODE_STEP_MOTOR_ROLL_LIMIT_ANGLE_WARNING",
      -14523
    ],
    [
      "CODE_TRACK_TRACKER_INITING",
      -14900
    ],
    [
      "CODE_TRACK_TRACKER_FAILED",
      -14901
    ],
    [
      "CODE_TRACK_SENTRY_MODE_INITING",
      -14902
    ],
    [
      "CODE_TRACK_SENTRY_MODE_FAILED",
      -14903
    ],
    [
      "CODE_UFOTRACK_MODE_INITING",
      -14904
    ],
    [
      "CODE_UFO_DAY_AUTO_MODE",
      -14906
    ],
    [
      "CODE_FOCUS_ASTRO_AUTO_FOCUS_SLOW_ERROR",
      -15100
    ],
    [
      "CODE_FOCUS_ASTRO_AUTO_FOCUS_FAST_ERROR",
      -15101
    ],
    [
      "CODE_FOCUS_EXP_TOO_LONG",
      -15106
    ],
    [
      "CODE_PANORAMA_MOTOR_RESET_FAILED",
      -15601
    ],
    [
      "CODE_PANORAMA_UPLOAD_USER_STOP",
      -15602
    ],
    [
      "CODE_PANORAMA_UPLOAD_FILE_CHECK_FAILED",
      -15603
    ],
    [
      "CODE_PANORAMA_UPLOAD_COMPRESS_FAILED",
      -15604
    ],
    [
      "CODE_PANORAMA_UPLOAD_UPLOAD_FAILED",
      -15605
    ],
    [
      "CODE_PANORAMA_UPLOAD_IS_RUNNING",
      -15607
    ],
    [
      "CODE_PANORAMA_UPLOAD_CAMERA_BUSY",
      -15608
    ],
    [
      "CODE_PANORAMA_UPLOAD_NOT_IN_STA",
      -15609
    ],
    [
      "CODE_PANORAMA_COMPOSE_IS_RUNNING",
      -15615
    ],
    [
      "CODE_SHOOTING_SCHEDULE_DEVICE_ID_NOT_MATCH",
      -16300
    ],
    [
      "CODE_SHOOTING_SCHEDULE_INVALID_SHOOTING_DURATION",
      -16301
    ],
    [
      "CODE_SHOOTING_SCHEDULE_TIME_CONFLICT",
      -16302
    ],
    [
      "CODE_SHOOTING_SCHEDULE_DATABASE_OPERATION_FAILED",
      -16305
    ],
    [
      "CODE_SHOOTING_SCHEDULE_PASSWORD_ERROR",
      -16306
    ],
    [
      "CODE_SHOOTING_SCHEDULE_INTERRUPTED",
      -16310
    ],
    [
      "CODE_SHOOTING_SCHEDULE_NOT_SYNCED",
      -16311
    ]
  ],
  "allowAlias": true
}
```

Current:

```json
{
  "values": [
    [
      "OK",
      0
    ],
    [
      "WS_OK",
      0
    ],
    [
      "WS_PARSE_PROTOBUF_ERROR",
      -1
    ],
    [
      "WS_SDCARD_NOT_EXIST",
      -2
    ],
    [
      "WS_INVAID_PARAM",
      -3
    ],
    [
      "WS_SDCARD_WRITE_ERROR",
      -4
    ],
    [
      "WS_DEVICE_NOT_ACTIVATED",
      -5
    ],
    [
      "WS_SDCARD_FULL_ERROR",
      -6
    ],
    [
      "CODE_CAMERA_TELE_OPENED",
      -10500
    ],
    [
      "CODE_CAMERA_TELE_CLOSED",
      -10501
    ],
    [
      "CODE_CAMERA_TELE_ISP_SET_FAILED",
      -10502
    ],
    [
      "CODE_CAMERA_TELE_OPEN_FAILED",
      -10503
    ],
    [
      "CODE_CAMERA_TELE_START_RECORD_FAILED",
      -10504
    ],
    [
      "CODE_CAMERA_TELE_STOP_RECORD_FAILED",
      -10505
    ],
    [
      "CODE_CAMERA_TELE_CAPTURE_RAW_FAILED",
      -10506
    ],
    [
      "CODE_CAMERA_TELE_WORKING_BUSY",
      -10507
    ],
    [
      "CODE_CAMERA_TELE_GET_IMAGE_FAILED",
      -10508
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_PHOTO",
      -10509
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_RECORD",
      -10510
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_PANORAMA",
      -10511
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_TIMELAPSE",
      -10512
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_CAPTURE_DARK",
      -10513
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_CAPTURE_LIVE_STACKING",
      -10514
    ],
    [
      "CODE_CAMERA_TELE_EXP_TOO_LONG",
      -10515
    ],
    [
      "CODE_CAMERA_TELE_SWITCH_WORK_MODE_FAILED",
      -10516
    ],
    [
      "CODE_CAMERA_TELE_RUNNING_TRACK",
      -10517
    ],
    [
      "CODE_CAMERA_TELE_RECORD_FILE_ERROR",
      -10518
    ],
    [
      "CODE_ASTRO_PLATE_SOLVING_FAILED",
      -11500
    ],
    [
      "CODE_ASTRO_FUNCTION_BUSY",
      -11501
    ],
    [
      "CODE_ASTRO_DARK_GAIN_OUT_OF_RANGE",
      -11502
    ],
    [
      "CODE_ASTRO_DARK_NOT_FOUND",
      -11503
    ],
    [
      "CODE_ASTRO_CALIBRATION_FAILED",
      -11504
    ],
    [
      "CODE_ASTRO_GOTO_FAILED",
      -11505
    ],
    [
      "CODE_ASTRO_DARK_RUNNING",
      -11506
    ],
    [
      "CODE_ASTRO_CALIBRATION_RUNNING",
      -11507
    ],
    [
      "CODE_ASTRO_GOTO_RUNNING",
      -11508
    ],
    [
      "CODE_ASTRO_LIVE_STACKING_RUNNING",
      -11509
    ],
    [
      "CODE_ASTRO_RESET_PITCH_MOTOR_FAILED",
      -11510
    ],
    [
      "CODE_ASTRO_NEED_CALIBRATION",
      -11511
    ],
    [
      "CODE_ASTRO_GOTO_READ_MOTOR_POSITION_AND_PLATE_SOLVING_FAILED",
      -11512
    ],
    [
      "CODE_ASTRO_NEED_GOTO",
      -11513
    ],
    [
      "CODE_ASTRO_NEED_ADJUST_SHOOT_PARAM",
      -11514
    ],
    [
      "CODE_ASTRO_CALIBRATION_PLATE_SOLVING_FAILED_TOO_MUCH",
      -11515
    ],
    [
      "CODE_ASTRO_EQ_SOLVING_FAILED",
      -11516
    ],
    [
      "CODE_ASTRO_SKY_SEARCH_FAILED",
      -11517
    ],
    [
      "CODE_ASTRO_NEED_GOTO_DSO",
      -11518
    ],
    [
      "CODE_ASTRO_RESTACK_CAMERA_MISMATCH",
      -11519
    ],
    [
      "CODE_ASTRO_RESTACK_BINNING_MISMATCH",
      -11520
    ],
    [
      "CODE_ASTRO_RESTACK_FILTER_MISMATCH",
      -11521
    ],
    [
      "CODE_ASTRO_RESTACK_TARGET_MISMATCH",
      -11522
    ],
    [
      "CODE_ASTRO_RESTACK_DARKFRAME_MISMATCH",
      -11523
    ],
    [
      "CODE_ASTRO_RESTACK_FAILED",
      -11524
    ],
    [
      "CODE_ASTRO_RESTACK_INVALID_DATA",
      -11525
    ],
    [
      "CODE_ASTRO_OVEREXPOSURE_WARNING",
      -11526
    ],
    [
      "CODE_ASTRO_EXP_TOO_LONG",
      -11527
    ],
    [
      "CODE_ASTRO_NEED_EQ",
      -11528
    ],
    [
      "CODE_ASTRO_STAR_TOO_FEW",
      -11529
    ],
    [
      "CODE_ASTRO_DARK_TEMP_MISMATCH",
      -11530
    ],
    [
      "CODE_ASTRO_SUN_MOON_NOT_FOUND",
      -11531
    ],
    [
      "CODE_ASTRO_GUIDING_FAILED_LOWER_EXPOSURE",
      -11532
    ],
    [
      "CODE_ASTRO_GUIDING_FAILED_TARGET_BLOCKED",
      -11533
    ],
    [
      "CODE_CAMERA_WIDE_OPENED",
      -12500
    ],
    [
      "CODE_CAMERA_WIDE_CLOSED",
      -12501
    ],
    [
      "CODE_CAMERA_WIDE_CANNOT_FOUND",
      -12502
    ],
    [
      "CODE_CAMERA_WIDE_OPEN_FAILED",
      -12503
    ],
    [
      "CODE_CAMERA_WIDE_CLOSE_FAILED",
      -12504
    ],
    [
      "CODE_CAMERA_WIDE_SET_ISP_FAILED",
      -12505
    ],
    [
      "CODE_CAMERA_WIDE_PHOTOGRAPHING",
      -12506
    ],
    [
      "CODE_CAMERA_WIDE_TIMELAPSE_RECORDING",
      -12507
    ],
    [
      "CODE_CAMERA_WIDE_EXP_TOO_LONG",
      -12508
    ],
    [
      "CODE_CAMERA_WIDE_RECORD_FILE_ERROR",
      -12509
    ],
    [
      "CODE_SYSTEM_SET_TIME_FAILED",
      -13300
    ],
    [
      "CODE_SYSTEM_SET_TIMEZONE_FAILED",
      -13301
    ],
    [
      "CODE_RGB_POWER_UART_INIT_FAILED",
      -13800
    ],
    [
      "CODE_RGB_POWER_UART_SEND_FAILED",
      -13801
    ],
    [
      "CODE_STEP_MOTOR_IS_RUNNING",
      -14500
    ],
    [
      "CODE_STEP_MOTOR_IS_STOPPED",
      -14501
    ],
    [
      "CODE_STEP_MOTOR_PARALLEL_IN",
      -14502
    ],
    [
      "CODE_STEP_MOTOR_PARALLEL_END",
      -14503
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_ID",
      -14504
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_ANGLE",
      -14505
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED",
      -14506
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED_RAMPING",
      -14507
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_RESOLUTION",
      -14508
    ],
    [
      "CODE_STEP_MOTOR_INVALID_PARAMETER_POSITION",
      -14509
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_LIMIT_RETURN",
      -14510
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_RESET_RETURN",
      -14511
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_ABSOLUTE_POSITION_RETURN",
      -14512
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_RELATIVE_POSITION_RETURN",
      -14513
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_WAIT_TO_STOP",
      -14514
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_WAIT_TO_RUN",
      -14515
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_SPEED_TO_MAX",
      -14516
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_SPEED_TO_MIN",
      -14517
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_POSITION_WARNING",
      -14518
    ],
    [
      "CODE_STEP_MOTOR_LIMIT_POSITION_HIT",
      -14519
    ],
    [
      "CODE_STEP_MOTOR_NEED_RESET",
      -14520
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_GET_PE_SWITCH_RETURN",
      -14521
    ],
    [
      "CODE_STEP_MOTOR_OVERTIME_TO_RESET",
      -14522
    ],
    [
      "CODE_STEP_MOTOR_ROLL_LIMIT_ANGLE_WARNING",
      -14523
    ],
    [
      "CODE_TRACK_TRACKER_INITING",
      -14900
    ],
    [
      "CODE_TRACK_TRACKER_FAILED",
      -14901
    ],
    [
      "CODE_TRACK_SENTRY_MODE_INITING",
      -14902
    ],
    [
      "CODE_TRACK_SENTRY_MODE_FAILED",
      -14903
    ],
    [
      "CODE_UFOTRACK_MODE_INITING",
      -14904
    ],
    [
      "CODE_UFOTRACK_MODE_FAILED",
      -14905
    ],
    [
      "CODE_UFO_DAY_AUTO_MODE",
      -14906
    ],
    [
      "CODE_FOCUS_ASTRO_AUTO_FOCUS_SLOW_ERROR",
      -15100
    ],
    [
      "CODE_FOCUS_ASTRO_AUTO_FOCUS_FAST_ERROR",
      -15101
    ],
    [
      "CODE_FOCUS_EXP_TOO_LONG",
      -15106
    ],
    [
      "CODE_FOCUS_INFINITY_POS_ERROR",
      -15107
    ],
    [
      "CODE_FOCUS_GET_NOW_POS_FAILED",
      -15108
    ],
    [
      "CODE_PANORAMA_PHOTO_FAILED",
      -15600
    ],
    [
      "CODE_PANORAMA_MOTOR_RESET_FAILED",
      -15601
    ],
    [
      "CODE_PANORAMA_UPLOAD_USER_STOP",
      -15602
    ],
    [
      "CODE_PANORAMA_UPLOAD_FILE_CHECK_FAILED",
      -15603
    ],
    [
      "CODE_PANORAMA_UPLOAD_COMPRESS_FAILED",
      -15604
    ],
    [
      "CODE_PANORAMA_UPLOAD_UPLOAD_FAILED",
      -15605
    ],
    [
      "CODE_PANORAMA_UPLOAD_NOT_EXIST",
      -15606
    ],
    [
      "CODE_PANORAMA_UPLOAD_IS_RUNNING",
      -15607
    ],
    [
      "CODE_PANORAMA_UPLOAD_CAMERA_BUSY",
      -15608
    ],
    [
      "CODE_PANORAMA_UPLOAD_NOT_IN_STA",
      -15609
    ],
    [
      "CODE_PANORAMA_COMPRESSION_IS_RUNNING",
      -15612
    ],
    [
      "CODE_PANORAMA_COMPOSE_IS_IDEL",
      -15614
    ],
    [
      "CODE_PANORAMA_COMPOSE_IS_RUNNING",
      -15615
    ],
    [
      "CODE_SHOOTING_SCHEDULE_DEVICE_ID_NOT_MATCH",
      -16300
    ],
    [
      "CODE_SHOOTING_SCHEDULE_INVALID_SHOOTING_DURATION",
      -16301
    ],
    [
      "CODE_SHOOTING_SCHEDULE_TIME_CONFLICT",
      -16302
    ],
    [
      "CODE_SHOOTING_SCHEDULE_INVALID_TASK_DURATION",
      -16303
    ],
    [
      "CODE_SHOOTING_SCHEDULE_DATABASE_OPERATION_FAILED",
      -16305
    ],
    [
      "CODE_SHOOTING_SCHEDULE_PASSWORD_ERROR",
      -16306
    ],
    [
      "CODE_SHOOTING_SCHEDULE_SHOOTING",
      -16307
    ],
    [
      "CODE_SHOOTING_SCHEDULE_START_TIME_TOO_FAR",
      -16308
    ],
    [
      "CODE_SHOOTING_SCHEDULE_DEVICE_BUSY",
      -16309
    ],
    [
      "CODE_SHOOTING_SCHEDULE_INTERRUPTED",
      -16310
    ],
    [
      "CODE_SHOOTING_SCHEDULE_NOT_SYNCED",
      -16311
    ],
    [
      "CODE_SHOOTING_SCHEDULE_TASK_TIME_TOO_SHORT",
      -16312
    ],
    [
      "CODE_SHOOTING_SCHEDULE_TASK_EXPIRED",
      -16313
    ],
    [
      "CODE_GLOBAL_TASK_MANAGER_BUSY",
      -16600
    ]
  ],
  "allowAlias": true
}
```

#### ModuleId

Legacy:

```json
{
  "values": [
    [
      "MODULE_NONE",
      0
    ],
    [
      "MODULE_CAMERA_TELE",
      1
    ],
    [
      "MODULE_CAMERA_WIDE",
      2
    ],
    [
      "MODULE_ASTRO",
      3
    ],
    [
      "MODULE_SYSTEM",
      4
    ],
    [
      "MODULE_RGB_POWER",
      5
    ],
    [
      "MODULE_MOTOR",
      6
    ],
    [
      "MODULE_TRACK",
      7
    ],
    [
      "MODULE_FOCUS",
      8
    ],
    [
      "MODULE_NOTIFY",
      9
    ],
    [
      "MODULE_PANORAMA",
      10
    ],
    [
      "MODULE_ITIPS",
      11
    ],
    [
      "MODULE_FACTORY_TEST",
      12
    ],
    [
      "MODULE_SHOOTING_SCHEDULE",
      13
    ],
    [
      "MODULE_DEVICE_CONFIG",
      14
    ],
    [
      "MODULE_CAMERA_PARAMS",
      15
    ],
    [
      "MODULE_VOICE_ASSISTANT",
      16
    ],
    [
      "MODULE_CAMERA_GUIDE",
      17
    ],
    [
      "MODULE_DEVICE",
      18
    ]
  ],
  "allowAlias": false
}
```

Current:

```json
{
  "values": [
    [
      "MODULE_NONE",
      0
    ],
    [
      "MODULE_CAMERA_TELE",
      1
    ],
    [
      "MODULE_CAMERA_WIDE",
      2
    ],
    [
      "MODULE_ASTRO",
      3
    ],
    [
      "MODULE_SYSTEM",
      4
    ],
    [
      "MODULE_RGB_POWER",
      5
    ],
    [
      "MODULE_MOTOR",
      6
    ],
    [
      "MODULE_TRACK",
      7
    ],
    [
      "MODULE_FOCUS",
      8
    ],
    [
      "MODULE_NOTIFY",
      9
    ],
    [
      "MODULE_PANORAMA",
      10
    ],
    [
      "MODULE_SHOOTING_SCHEDULE",
      13
    ],
    [
      "MODULE_DEVICE_CONFIG",
      14
    ],
    [
      "MODULE_CAMERA_PARAMS",
      15
    ]
  ],
  "allowAlias": false
}
```

#### WsMinorVersion

Legacy:

```json
{
  "values": [
    [
      "WS_MINOR_VERSION_UNKNOWN",
      0
    ],
    [
      "WS_MINOR_VERSION_NUMBER",
      9
    ],
    [
      "WS_MINOR_VERSION_V3",
      20
    ]
  ],
  "allowAlias": false
}
```

Current:

```json
{
  "values": [
    [
      "WS_MINOR_VERSION_UNKNOWN",
      0
    ],
    [
      "WS_MINOR_VERSION_NUMBER",
      9
    ]
  ],
  "allowAlias": false
}
```

