// Generated from src/current_proto. Do not edit by hand.
/** @typedef {{type:string, kind:'message'|'enum'|'scalar', rule:string, optional:boolean, oneof?:string, keyType?:string}} CurrentField */
/** @type {Record<string, {fields:Record<string, CurrentField>, oneofs:Record<string, string[]>}>} */
export const currentFields = {
  ReqStartCalibration: {
    fields: {
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCalibration: { fields: {}, oneofs: {} },
  ReqGotoDSO: {
    fields: {
      ra: { type: "double", kind: "scalar", rule: "singular", optional: false },
      dec: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gotoOnly: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_rotation",
      },
    },
    oneofs: { _rotation: ["rotation"] },
  },
  ReqGotoSolarSystem: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceStart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGotoSolarSystem: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      req: {
        type: "ReqGotoSolarSystem",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopGoto: { fields: {}, oneofs: {} },
  ReqCaptureRawLiveStacking: {
    fields: {
      irIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceStart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCaptureRawLiveStacking: { fields: {}, oneofs: {} },
  ReqFastStopCaptureRawLiveStacking: { fields: {}, oneofs: {} },
  ReqCheckDarkFrame: { fields: {}, oneofs: {} },
  ResCheckDarkFrame: {
    fields: {
      progress: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCaptureDarkFrame: {
    fields: {
      reshoot: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCaptureDarkFrame: { fields: {}, oneofs: {} },
  ReqCaptureDarkFrameWithParam: {
    fields: {
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      binIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      capSize: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCaptureDarkFrameWithParam: { fields: {}, oneofs: {} },
  ReqGetDarkFrameList: { fields: {}, oneofs: {} },
  ResGetDarkFrameInfo: {
    fields: {
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      binIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      binName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      temperature: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_temperature",
      },
    },
    oneofs: { _temperature: ["temperature"] },
  },
  ResGetDarkFrameInfoList: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      results: {
        type: "ResGetDarkFrameInfo",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqDelDarkFrame: {
    fields: {
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      binIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      tempValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqDelDarkFrameList: {
    fields: {
      darkList: {
        type: "ReqDelDarkFrame",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResDelDarkFrameList: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGoLive: { fields: {}, oneofs: {} },
  ReqTrackSpecialTarget: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopTrackSpecialTarget: { fields: {}, oneofs: {} },
  ReqOneClickGotoDSO: {
    fields: {
      ra: { type: "double", kind: "scalar", rule: "singular", optional: false },
      dec: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gotoOnly: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_rotation",
      },
    },
    oneofs: { _rotation: ["rotation"] },
  },
  ResOneClickGoto: {
    fields: {
      step: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      allEnd: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqOneClickGotoSolarSystem: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceStart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResOneClickGotoSolarSystem: {
    fields: {
      step: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      allEnd: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      req: {
        type: "ReqOneClickGotoSolarSystem",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopOneClickGoto: { fields: {}, oneofs: {} },
  ReqCaptureWideRawLiveStacking: {
    fields: {
      forceStart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCaptureWideRawLiveStacking: { fields: {}, oneofs: {} },
  ReqFastStopCaptureWideRawLiveStacking: { fields: {}, oneofs: {} },
  ReqStartEqSolving: {
    fields: {
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      useCalibration: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_useCalibration",
      },
    },
    oneofs: { _useCalibration: ["useCalibration"] },
  },
  ResStartEqSolving: {
    fields: {
      aziErr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      altErr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopEqSolving: { fields: {}, oneofs: {} },
  ReqStartAiEnhance: { fields: {}, oneofs: {} },
  ReqStopAiEnhance: { fields: {}, oneofs: {} },
  ReqStartMosaic: {
    fields: {
      horizontalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      verticalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      irIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceStart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartMakeFitsThumb: {
    fields: {
      srcDir: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopMakeFitsThumb: { fields: {}, oneofs: {} },
  ResMakeFitsThumb: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      srcDir: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  MakeFitsThumbTaskParam: {
    fields: {
      srcDir: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqIsImageStackable: {
    fields: {
      srcDirs: {
        type: "string",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResIsImageStackable: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      needDarkFrameInfo: {
        type: "ResGetDarkFrameInfo",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartRepostprocess: {
    fields: {
      srcDirs: {
        type: "string",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopRepostprocess: { fields: {}, oneofs: {} },
  ResRepostprocess: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resultDir: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  RepostprocessTaskParam: {
    fields: {
      resultDir: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetAstroShootingTime: {
    fields: {
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      horizontalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      verticalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      camId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetAstroShootingTime: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTime: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      camId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      astroMode: {
        type: "ResGetAstroShootingTime.AstroMode",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetCaliFrameList: {
    fields: {
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  CaliFrameInfo: {
    fields: {
      expName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gain: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      progress: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      filterType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_filterType",
      },
      infoId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_infoId",
      },
      tempValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_tempValue",
      },
    },
    oneofs: {
      _filterType: ["filterType"],
      _infoId: ["infoId"],
      _tempValue: ["tempValue"],
    },
  },
  ResGetCaliFrameList: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      list: {
        type: "CaliFrameInfo",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqDelCaliFrameList: {
    fields: {
      infoIds: {
        type: "int32",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCaptureCaliFrame: {
    fields: {
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gain: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      capSize: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      filterType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_filterType",
      },
      sceneType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: { _filterType: ["filterType"] },
  },
  ReqStopCaptureCaliFrame: {
    fields: {
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  CaptureCaliFrameTaskParam: {
    fields: {
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetQuickSetList: {
    fields: {
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  QuikSetInfo: {
    fields: {
      expName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gain: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      infoId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetQuickSetList: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      quickSetList: {
        type: "QuikSetInfo",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetQuickSet: {
    fields: {
      infoId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResSetQuickSet: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      infoId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqOneClickShootingParam: {
    fields: {
      horizontalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      verticalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gain: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      filterType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      capSize: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqOneClickShooting: {
    fields: {
      gotoDso: {
        type: "ReqOneClickGotoDSO",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_gotoDso",
      },
      shootingParam: {
        type: "ReqOneClickShootingParam",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_shootingParam",
      },
    },
    oneofs: { _gotoDso: ["gotoDso"], _shootingParam: ["shootingParam"] },
  },
  ResAstroShooting: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_expName",
      },
      gain: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_gain",
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_resolution",
      },
      filterType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_filterType",
      },
      tempThreshold: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_tempThreshold",
      },
    },
    oneofs: {
      _expName: ["expName"],
      _gain: ["gain"],
      _resolution: ["resolution"],
      _filterType: ["filterType"],
      _tempThreshold: ["tempThreshold"],
    },
  },
  ReqStartSkyTargetFinder: {
    fields: {
      lon: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lat: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceRestart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      sceneType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResStartSkyTargetFinder: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zenithAzi: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zenithAlt: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      centerAzi: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      centerAlt: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      centerRoll: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      sceneType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopSkyTargetFinder: { fields: {}, oneofs: {} },
  ReqGetGyroAttitude: {
    fields: {
      durationMs: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetGyroAttitude: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      roll: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      pitch: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      yaw: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      azi: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      alt: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqContinueShooting: { fields: {}, oneofs: {} },
  WsPacket: {
    fields: {
      majorVersion: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      minorVersion: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      deviceId: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      moduleId: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cmd: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      type: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      data: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ComResponse: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ComResWithInt: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ComResWithDouble: {
    fields: {
      value: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ComResWithString: {
    fields: {
      str: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  CommonParam: {
    fields: {
      hasAuto: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      autoMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      modeIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      continueValue: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetconfig: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      blePsd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqAp: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      wifiType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      autoStart: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      countryList: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      country: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      blePsd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      forceRestart: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSta: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      autoStart: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      blePsd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetblewifi: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      blePsd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqReset: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetwifilist: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetsysteminfo: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      clientId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCheckFile: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      filePath: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      md5: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResCommon: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetconfig: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wifiMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      apMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      autoStart: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      apCountryList: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ip: { type: "string", kind: "scalar", rule: "singular", optional: false },
      apCountry: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResAp: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResSta: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psd: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ip: { type: "string", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ResSetblewifi: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResReset: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  WifiInfo: {
    fields: {
      signalLevel: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      securityCapability: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResWifilist: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
      wifiInfoList: {
        type: "WifiInfo",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetsysteminfo: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      protocolVersion: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      device: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      macAddress: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      dwarfOtaVersion: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResReceiveDataError: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResCheckFile: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ComDwarfMsg: {
    fields: {
      vocaltype: {
        type: "VocalType",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  DwarfPing: {
    fields: {
      vocaltype: {
        type: "VocalType",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      timestamp: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      magic: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      vocals: {
        type: "bytes",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
      mutes: {
        type: "bytes",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  StationModel: {
    fields: {
      family: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      revision: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  NifAP: {
    fields: {
      ifname: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      countryCode: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      sec: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psw: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ipv4: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ipv6: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_ipv6",
      },
    },
    oneofs: { _ipv6: ["ipv6"] },
  },
  NifSTA: {
    fields: {
      ifname: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ssid: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_ssid",
      },
      psw: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_psw",
      },
      rssi: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_rssi",
      },
      ipv4: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_ipv4",
      },
      ipv6: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_ipv6",
      },
    },
    oneofs: {
      _ssid: ["ssid"],
      _psw: ["psw"],
      _rssi: ["rssi"],
      _ipv4: ["ipv4"],
      _ipv6: ["ipv6"],
    },
  },
  DwarfEcho: {
    fields: {
      vocaltype: {
        type: "VocalType",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      timestamp: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      magic: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      tsPing: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      macAddress: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      model: {
        type: "StationModel",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      sn: { type: "string", kind: "scalar", rule: "singular", optional: false },
      name: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      psw: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      fwVersion: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wsScheme: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      session: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ap: { type: "NifAP", kind: "message", rule: "singular", optional: false },
      sta: {
        type: "NifSTA",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqOpenCamera: {
    fields: {
      binning: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rtspEncodeType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCloseCamera: { fields: {}, oneofs: {} },
  ReqPhoto: { fields: {}, oneofs: {} },
  ReqBurstPhoto: {
    fields: {
      count: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopBurstPhoto: { fields: {}, oneofs: {} },
  ReqStartRecord: {
    fields: {
      encodeType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopRecord: { fields: {}, oneofs: {} },
  ReqSetExpMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetExpMode: { fields: {}, oneofs: {} },
  ReqSetExp: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetExp: { fields: {}, oneofs: {} },
  ReqSetGainMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetGainMode: { fields: {}, oneofs: {} },
  ReqSetGain: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetGain: { fields: {}, oneofs: {} },
  ReqSetBrightness: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetBrightness: { fields: {}, oneofs: {} },
  ReqSetContrast: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetContrast: { fields: {}, oneofs: {} },
  ReqSetHue: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetHue: { fields: {}, oneofs: {} },
  ReqSetSaturation: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetSaturation: { fields: {}, oneofs: {} },
  ReqSetSharpness: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetSharpness: { fields: {}, oneofs: {} },
  ReqSetWBMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetWBMode: { fields: {}, oneofs: {} },
  ReqSetWBSence: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetWBSence: { fields: {}, oneofs: {} },
  ReqSetWBCT: {
    fields: {
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetWBCT: { fields: {}, oneofs: {} },
  ReqSetIrCut: {
    fields: {
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetNdFilter: {
    fields: {
      value: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetIrcut: { fields: {}, oneofs: {} },
  ReqStartTimeLapse: { fields: {}, oneofs: {} },
  ReqStopTimeLapse: { fields: {}, oneofs: {} },
  ReqSetAllParams: {
    fields: {
      expMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ircutValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wbMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wbIndexType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wbIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      brightness: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      contrast: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      hue: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      saturation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      sharpness: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      jpgQuality: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetAllParams: { fields: {}, oneofs: {} },
  ResGetAllParams: {
    fields: {
      allParams: {
        type: "CommonParam",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetFeatureParams: {
    fields: {
      param: {
        type: "CommonParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetAllFeatureParams: { fields: {}, oneofs: {} },
  ResGetAllFeatureParams: {
    fields: {
      allFeatureParams: {
        type: "CommonParam",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetSystemWorkingState: { fields: {}, oneofs: {} },
  ReqSetJpgQuality: {
    fields: {
      quality: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetJpgQuality: { fields: {}, oneofs: {} },
  ReqPhotoRaw: { fields: {}, oneofs: {} },
  ReqSetRtspBitRateType: {
    fields: {
      bitrateType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqDisableAllIspProcessing: { fields: {}, oneofs: {} },
  ReqEnableAllIspProcessing: { fields: {}, oneofs: {} },
  IspModuleState: {
    fields: {
      moduleId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetIspModuleState: {
    fields: {
      moduleStates: {
        type: "IspModuleState",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetIspModuleState: {
    fields: {
      moduleIds: {
        type: "int32",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSwitchResolution: {
    fields: {
      resolutionIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSwitchFrameRate: {
    fields: {
      fpsIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSwitchCropRatio: {
    fields: {
      cropRatio: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetPreviewQuality: {
    fields: {
      level: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      quality: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqLensDefog: {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqAutoCooling: {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqAutoShutdown: {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetSN: {
    fields: {
      sn: { type: "string", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqGetSN: { fields: {}, oneofs: {} },
  ReqGetNTCValue: { fields: {}, oneofs: {} },
  ReqGetEMMCValue: { fields: {}, oneofs: {} },
  ReqSetAUDSTART: { fields: {}, oneofs: {} },
  ReqSetAUDSTOP: { fields: {}, oneofs: {} },
  ReqSetAUDPLAYSTART: { fields: {}, oneofs: {} },
  ReqSetAUDPLAYSTOP: { fields: {}, oneofs: {} },
  ReqSetFatigueTestMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetRgb: { fields: {}, oneofs: {} },
  ReqGetELE: { fields: {}, oneofs: {} },
  ReqGetFactoryTestState: { fields: {}, oneofs: {} },
  ReqSetWiFiStartUpMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetFactoryTestState: {
    fields: {
      sn: { type: "string", kind: "scalar", rule: "singular", optional: false },
      fatigueTestMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      wifiStartUp: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      macAddress: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  FatigueTestIrcutParam: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      interval: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  FatigueTestMotorParam: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mStep: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      interval: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  FatigueTestLightsParam: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      interval: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  FatigueTestCameraParam: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  FatigueTestParam: {
    fields: {
      ircutParam: {
        type: "FatigueTestIrcutParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      motorRotateParam: {
        type: "FatigueTestMotorParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      motorPitchParam: {
        type: "FatigueTestMotorParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      motorAfParam: {
        type: "FatigueTestMotorParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      lightParam: {
        type: "FatigueTestLightsParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      cameraParam: {
        type: "FatigueTestCameraParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResEMMCInAadOutSpeed: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      readspeed: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      writespeed: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFocusMotorBacklashTest: {
    fields: {
      motorId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_motorId",
      },
    },
    oneofs: { _motorId: ["motorId"] },
  },
  ReqCaptureTeleDark: { fields: {}, oneofs: {} },
  ReqCaptureTeleBias: { fields: {}, oneofs: {} },
  ReqCaptureTeleFlat: { fields: {}, oneofs: {} },
  ReqCaptureWideDark: { fields: {}, oneofs: {} },
  ReqCaptureWideBias: { fields: {}, oneofs: {} },
  ReqCaptureWideFlat: { fields: {}, oneofs: {} },
  ReqCaptureGuideFlat: { fields: {}, oneofs: {} },
  ReqCaptureGuideBias: { fields: {}, oneofs: {} },
  ReqResetMotorMcu: { fields: {}, oneofs: {} },
  ResErrorTeststart: { fields: {}, oneofs: {} },
  ResErrorTestState: {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      angle: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      dir: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqTestOpenAllCamera: { fields: {}, oneofs: {} },
  ReqFactoryTestSuccess: { fields: {}, oneofs: {} },
  ReqGetRssi: { fields: {}, oneofs: {} },
  ReqGetMCUUART: { fields: {}, oneofs: {} },
  ReqGetFIRMWAREVERISON: { fields: {}, oneofs: {} },
  ReqTestRgbUart: {
    fields: {
      count: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqPasswordEncryption: { fields: {}, oneofs: {} },
  ReqPasswordEncryptionState: { fields: {}, oneofs: {} },
  ReqRestPasswordEncryption: { fields: {}, oneofs: {} },
  ReqFactoryTecState: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactoryFanState: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactoryHeadTapeState: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      time: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetGyroCal: {
    fields: {
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactoryGyroAttitude: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResFactoryGyroAttitude: {
    fields: {
      cmd: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      pitch: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      yaw: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      roll: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  TemperatureItem: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      name: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResAllTemperature: {
    fields: {
      temps: {
        type: "TemperatureItem",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactoryMoveIrcutFloor: {
    fields: {
      floor: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      dir: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ResFactoryMicRms: {
    fields: {
      allMicRms: {
        type: "double",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetVcmRom: {
    fields: {
      addr: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResVcmK: {
    fields: {
      value: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactorySetUsbMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactoryDualPeSwitchState: {
    fields: {
      motorId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResFactoryDualPeSwitchState: {
    fields: {
      motorId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state1: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state2: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactorySetRollHorizontalDegree: { fields: {}, oneofs: {} },
  ReqFactoryGetRollHorizontalDegree: { fields: {}, oneofs: {} },
  ResFactoryGetRollHorizontalDegree: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      degree: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqFactorySetRollHorizontalPosition: {
    fields: {
      offsetMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      moveMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqManualSingleStepFocus: {
    fields: {
      direction: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqManualContinuFocus: {
    fields: {
      direction: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopManualContinuFocus: { fields: {}, oneofs: {} },
  ReqNormalAutoFocus: {
    fields: {
      mode: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      centerX: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      centerY: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqAstroAutoFocus: {
    fields: {
      mode: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopAstroAutoFocus: { fields: {}, oneofs: {} },
  ReqManualSingleStepFocusForFactory: {
    fields: {
      direction: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionLevel: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetUserInfinityPos: { fields: {}, oneofs: {} },
  ReqSetUserInfinityPos: {
    fields: {
      pos: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ResUserInfinityPos: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      pos: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqSfrAutoFocusForFactory: {
    fields: {
      mode: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      fastSpos: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_fastSpos",
      },
      fastPulse: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_fastPulse",
      },
      fastScope: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_fastScope",
      },
      slowPulse: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_slowPulse",
      },
      slowScope: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_slowScope",
      },
    },
    oneofs: {
      _fastSpos: ["fastSpos"],
      _fastPulse: ["fastPulse"],
      _fastScope: ["fastScope"],
      _slowPulse: ["slowPulse"],
      _slowScope: ["slowScope"],
    },
  },
  ReqSetVcmCode: {
    fields: {
      codeValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorServiceJoystick: {
    fields: {
      vectorAngle: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      vectorLength: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorServiceJoystickFixedAngle: {
    fields: {
      vectorAngle: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      vectorLength: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorServiceJoystickStop: { fields: {}, oneofs: {} },
  ReqMotorRun: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      speed: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      direction: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speedRamping: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionLevel: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorRunInPulse: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      frequency: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      direction: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speedRamping: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      pulse: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: { type: "bool", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqMotorRunTo: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      endPosition: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speedRamping: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionLevel: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorGetPosition: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqMotorStop: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqMotorReset: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      direction: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorChangeSpeed: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      speed: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorChangeDirection: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      direction: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResMotor: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResMotorPosition: {
    fields: {
      id: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      position: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorLevelCalibrationMove: {
    fields: {
      direction: {
        type: "MotorLevelCalibrationDirection",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqMotorLevelCalibrationSave: { fields: {}, oneofs: {} },
  ReqMotorLevelCalibrationResetDefault: { fields: {}, oneofs: {} },
  ReqDualCameraLinkage: {
    fields: {
      x: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      y: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqMotorStartDeviceAttitudeNotify: { fields: {}, oneofs: {} },
  ReqMotorStopDeviceAttitudeNotify: { fields: {}, oneofs: {} },
  "notify.PictureMatching": {
    fields: {
      x: { type: "uint32", kind: "scalar", rule: "singular", optional: false },
      y: { type: "uint32", kind: "scalar", rule: "singular", optional: false },
      width: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      height: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.StorageInfo": {
    fields: {
      availableSize: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalSize: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      storageType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      isValid: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.Temperature": {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      temperature: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CmosTemperature": {
    fields: {
      temperature: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_temperature",
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: { _temperature: ["temperature"] },
  },
  "notify.RecordTime": {
    fields: {
      recordTime: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.TimeLapseOutTime": {
    fields: {
      interval: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      outTime: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalTime: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.OperationStateNotify": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroCalibrationState": {
    fields: {
      state: {
        type: "notify.AstroState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      plateSolvingTimes: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroGotoState": {
    fields: {
      state: {
        type: "notify.AstroState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroTrackingState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ProgressCaptureRawDark": {
    fields: {
      progress: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      remainingTime: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ProgressCaptureRawLiveStacking": {
    fields: {
      totalCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      updateType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      stackedCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTime: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_shootingTime",
      },
      stackedTime: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_stackedTime",
      },
    },
    oneofs: { _shootingTime: ["shootingTime"], _stackedTime: ["stackedTime"] },
  },
  "notify.Param": {
    fields: {
      param: {
        type: "CommonParam",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.BurstProgress": {
    fields: {
      totalCount: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      completedCount: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaProgress": {
    fields: {
      totalCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      completedCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.RgbState": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PowerIndState": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ChargingState": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.BatteryInfo": {
    fields: {
      percentage: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cycleCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_cycleCount",
      },
      soh: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: true,
        oneof: "_soh",
      },
    },
    oneofs: { _cycleCount: ["cycleCount"], _soh: ["soh"] },
  },
  "notify.HostSlaveMode": {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      lock: { type: "bool", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  "notify.MTPState": {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.TrackResult": {
    fields: {
      x: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      y: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      w: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      h: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  "notify.CPUMode": {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroTrackingSpecialState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      index: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PowerOff": { fields: {}, oneofs: {} },
  "notify.AlbumUpdate": {
    fields: {
      mediaType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SentryState": {
    fields: {
      state: {
        type: "notify.SentryModeState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      objectType: {
        type: "notify.SentryObjectType",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.OneClickGotoState": {
    fields: {
      astroAutoFocusState: {
        type: "notify.AstroAutoFocusState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroCalibrationState: {
        type: "notify.AstroCalibrationState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroGotoState: {
        type: "notify.AstroGotoState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroTrackingState: {
        type: "notify.AstroTrackingState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
    },
    oneofs: {
      currentState: [
        "astroAutoFocusState",
        "astroCalibrationState",
        "astroGotoState",
        "astroTrackingState",
      ],
    },
  },
  "notify.StreamType": {
    fields: {
      streamType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      camId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.EqSolvingState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.LongExpPhotoProgress": {
    fields: {
      totalTime: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      exposuredTime: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ShootingScheduleResultAndState": {
    fields: {
      scheduleId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      result: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ShootingTaskState": {
    fields: {
      scheduleTaskId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SkySeacherState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ProgressAiEnhance": {
    fields: {
      progress: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalTime: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CommonProgress": {
    fields: {
      current: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      total: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      progressType: {
        type: "notify.CommonProgress.ProgressType",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CalibrationResult": {
    fields: {
      azi: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      alt: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.FocusPosition": {
    fields: {
      pos: { type: "int32", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  "notify.RollLevelCalibrationAngle": {
    fields: {
      offsetDegree: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SentryAutoHand": {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaStitchUploadComplete": {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaCompressionComplete": {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zipFilePath: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zipFileMd5: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zipFileSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      stitchParam: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaCompressionProgress": {
    fields: {
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      compressedFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaUploadCompressionProgress": {
    fields: {
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      compressedFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaUploadProgress": {
    fields: {
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      uploadedSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      speed: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaCurrentUploadState": {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      compressedFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      uploadedSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      step: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.LowTempProtectionMode": {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.StateSystemResourceOccupation": {
    fields: {
      taskId: {
        type: "notify.StateSystemResourceOccupation.TaskId",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.BodyStatus": {
    fields: {
      bodyStatus: {
        type: "notify.BodyStatus.BodyStatusEnum",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ProgressCaptureMosaic": {
    fields: {
      totalCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      updateType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      stackedCount: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      expIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      gainIndex: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      targetName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      horizontalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      verticalScale: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rotation: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      fovId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      fovTotal: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.Wb": {
    fields: {
      mode: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ct: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      scene: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.GeneralIntParam": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.GeneralFloatParam": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.GeneralBoolParams": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SwitchShootingMode": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      sourceMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      dstMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SwitchCropRatioState": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cropRatio: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.ResolutionParam": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentResValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentFpsValue: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      supportedFpsList: {
        type: "int32",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
      supportedResolutionList: {
        type: "int32",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CaptureRawState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PhotoState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.BurstState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.RecordState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.TimeLapseState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CaptureRawDarkState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoramaState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroAutoFocusState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.NormalAutoFocusState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AstroAutoFocusFastState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AreaAutoFocusState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.DualCameraLinkageState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.NormalTrackState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SwitchResolutionFpsState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CaptureCaliFrameState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.CaptureCaliFrameProgress": {
    fields: {
      progress: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      caliFrameType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.DeviceAttitude": {
    fields: {
      pitch: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      yaw: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      roll: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.SkyTargetFinderState": {
    fields: {
      state: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      sceneType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoFramingThumbnailUpdateNotify": {
    fields: {
      webpData: {
        type: "bytes",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoFramingRectUpdateNotify": {
    fields: {
      normXTl: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normYTl: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normXBr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normYBr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normLimitXLeft: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normLimitYTop: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normLimitXRight: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normLimitYBottom: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rectHorFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      rectVerFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      errorCode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.PanoFramingStateNotify": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AutoShutdown": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.LensDefog": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "notify.AutoCooling": {
    fields: {
      state: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartPanoramaByGrid: { fields: {}, oneofs: {} },
  ReqStartPanoramaByEulerRange: {
    fields: {
      yawRange: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      pitchRange: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartPanoramaStitchUpload: {
    fields: {
      resourceId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      appPlatform: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      ak: { type: "string", kind: "scalar", rule: "singular", optional: false },
      sk: { type: "string", kind: "scalar", rule: "singular", optional: false },
      token: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      bucket: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      bucketPrefix: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      from: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      envType: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResStartPanoramaStitchUpload: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentPanoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentUserId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResStopPanoramaStitchUpload: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentPanoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      currentUserId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopPanorama: { fields: {}, oneofs: {} },
  ReqStopPanoramaStitchUpload: {
    fields: {
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetPanoramaCurrentUploadState: { fields: {}, oneofs: {} },
  ResGetPanoramaCurrentUploadState: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      compressedFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      uploadedSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      step: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetUploadPredict: {
    fields: {
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetUploadPredict: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      fileNums: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolution: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cloudDataSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      zipDataSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      appZipDataSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  PanoramaUploadParam: {
    fields: {
      userId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      busiNo: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mac: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      compressedFilesNum: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      totalSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      uploadedSize: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      step: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCompressPanorama: {
    fields: {
      panoramaName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopCompressPanorama: { fields: {}, oneofs: {} },
  ReqStartPanoramaFraming: { fields: {}, oneofs: {} },
  ReqResetPanoramaFraming: { fields: {}, oneofs: {} },
  ReqStopPanoramaFraming: { fields: {}, oneofs: {} },
  ReqStopPanoramaFramingAndStartGrid: { fields: {}, oneofs: {} },
  ReqUpdatePanoramaFramingRect: {
    fields: {
      normXTl: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normYTl: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normXBr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      normYBr: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqNotifyPanoramaFraming: { fields: {}, oneofs: {} },
  "param.ReqSetExposure": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetGain": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetWb": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetGeneralIntParam": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetGeneralFloatParam": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "float",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetGeneralBoolParams": {
    fields: {
      paramId: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      value: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ReqSetAutoParam": {
    fields: {
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTech: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      isAuto: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  "param.ResSetAutoParam": {
    fields: {
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cameraType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTech: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      isAuto: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      updateAll: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqOpenRgb: { fields: {}, oneofs: {} },
  ReqCloseRgb: { fields: {}, oneofs: {} },
  ReqPowerDown: { fields: {}, oneofs: {} },
  ReqOpenPowerInd: { fields: {}, oneofs: {} },
  ReqClosePowerInd: { fields: {}, oneofs: {} },
  ReqReboot: { fields: {}, oneofs: {} },
  ShootingTaskMsg: {
    fields: {
      scheduleId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      params: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "ShootingTaskState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      createdTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      updatedTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      scheduleTaskId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      paramMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      paramVersion: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      createFrom: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ShootingScheduleMsg: {
    fields: {
      scheduleId: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      scheduleName: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      deviceId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      macAddress: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      startTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      endTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      result: {
        type: "ShootingScheduleResult",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      createdTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      updatedTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "ShootingScheduleState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      lock: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTasks: {
        type: "ShootingTaskMsg",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      paramMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      paramVersion: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      params: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      scheduleTime: {
        type: "int64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      syncState: {
        type: "ShootingScheduleSyncState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSyncShootingSchedule: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResSyncShootingSchedule: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      timeConflictScheduleIds: {
        type: "string",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      canReplace: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqCancelShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResCancelShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetAllShootingSchedule: { fields: {}, oneofs: {} },
  ResGetAllShootingSchedule: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetShootingScheduleById: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ResGetShootingScheduleById: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetShootingTaskById: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ResGetShootingTaskById: {
    fields: {
      shootingTask: {
        type: "ShootingTaskMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqReplaceShootingSchedule: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResReplaceShootingSchedule: {
    fields: {
      shootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      replacedShootingSchedule: {
        type: "ShootingScheduleMsg",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqUnlockShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResUnlockShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqLockShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResLockShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqDeleteShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      password: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResDeleteShootingSchedule: {
    fields: {
      id: { type: "string", kind: "scalar", rule: "singular", optional: false },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetTime: {
    fields: {
      timestamp: {
        type: "uint64",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      timezoneOffset: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetTimezone: {
    fields: {
      timezone: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetMtpMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetCpuMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqsetMasterLock: {
    fields: {
      lock: { type: "bool", kind: "scalar", rule: "singular", optional: false },
    },
    oneofs: {},
  },
  ReqSetLowTempProtectionMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSetLocation: {
    fields: {
      latitude: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      longitude: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      altitude: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      countryRegion: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      province: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      city: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      district: {
        type: "string",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      enable: {
        type: "bool",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  TaskAttr: {
    fields: {
      exclusiveMask: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      priority: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  TaskState: {
    fields: {
      baseState: {
        type: "notify.OperationState",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      astroExtendedState: {
        type: "notify.AstroState",
        kind: "enum",
        rule: "singular",
        optional: false,
        oneof: "extendedState",
      },
    },
    oneofs: { extendedState: ["astroExtendedState"] },
  },
  TaskParam: {
    fields: {
      panoramaUpload: {
        type: "PanoramaUploadParam",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
      makeFitsThumbTaskParam: {
        type: "MakeFitsThumbTaskParam",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
      repostprocessTaskParam: {
        type: "RepostprocessTaskParam",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
      captureCaliFrameTaskParam: {
        type: "CaptureCaliFrameTaskParam",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
    },
    oneofs: {
      param: [
        "panoramaUpload",
        "makeFitsThumbTaskParam",
        "repostprocessTaskParam",
        "captureCaliFrameTaskParam",
      ],
    },
  },
  ResNotifyTaskState: {
    fields: {
      taskId: {
        type: "TaskId",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      taskAttr: {
        type: "TaskAttr",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      state: {
        type: "TaskState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      param: {
        type: "TaskParam",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartTask: {
    fields: {
      taskId: {
        type: "TaskId",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
      reqMakeFitsThumbParam: {
        type: "ReqStartMakeFitsThumb",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
      reqRepostprocessParam: {
        type: "ReqStartRepostprocess",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "param",
      },
    },
    oneofs: { param: ["reqMakeFitsThumbParam", "reqRepostprocessParam"] },
  },
  ReqStopTask: {
    fields: {
      taskId: {
        type: "TaskId",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResTaskCenter: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      taskId: {
        type: "TaskId",
        kind: "enum",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ClientParams: {
    fields: {
      encodeType: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqEnterCamera: {
    fields: {
      clientParam: {
        type: "ClientParams",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResEnterCamera: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingModeId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSwitchShootingMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResSwitchShootingMode: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingModeId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqSwitchShootingTech: {
    fields: {
      tech: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResSwitchShootingTech: {
    fields: {
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTechId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqGetDeviceStateInfo: { fields: {}, oneofs: {} },
  ExclusiveCameraState: {
    fields: {
      captureRawState: {
        type: "notify.CaptureRawState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      photoState: {
        type: "notify.PhotoState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      burstState: {
        type: "notify.BurstState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      recordState: {
        type: "notify.RecordState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      timelapseState: {
        type: "notify.TimeLapseState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      captureCaliFrameState: {
        type: "notify.CaptureCaliFrameState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      panoramaState: {
        type: "notify.PanoramaState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      sentryState: {
        type: "notify.SentryState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
    },
    oneofs: {
      currentState: [
        "captureRawState",
        "photoState",
        "burstState",
        "recordState",
        "timelapseState",
        "captureCaliFrameState",
        "panoramaState",
        "sentryState",
      ],
    },
  },
  TeleCameraStateInfo: {
    fields: {
      exclusiveState: {
        type: "ExclusiveCameraState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      streamType: {
        type: "notify.StreamType",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      hFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      vFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionWidth: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionHeight: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cmosTemperature: {
        type: "notify.CmosTemperature",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_cmosTemperature",
      },
    },
    oneofs: { _cmosTemperature: ["cmosTemperature"] },
  },
  WideCameraStateInfo: {
    fields: {
      exclusiveState: {
        type: "ExclusiveCameraState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      streamType: {
        type: "notify.StreamType",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      hFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      vFov: {
        type: "double",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionWidth: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      resolutionHeight: {
        type: "uint32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      cmosTemperature: {
        type: "notify.CmosTemperature",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_cmosTemperature",
      },
    },
    oneofs: { _cmosTemperature: ["cmosTemperature"] },
  },
  ExclusiveFocusMotorState: {
    fields: {
      astroAutoFocusState: {
        type: "notify.AstroAutoFocusState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      normalAutoFocusState: {
        type: "notify.NormalAutoFocusState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroAutoFocusFastState: {
        type: "notify.AstroAutoFocusFastState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      areaAutoFocusState: {
        type: "notify.AreaAutoFocusState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
    },
    oneofs: {
      currentState: [
        "astroAutoFocusState",
        "normalAutoFocusState",
        "astroAutoFocusFastState",
        "areaAutoFocusState",
      ],
    },
  },
  FocusMotorStateInfo: {
    fields: {
      exclusiveState: {
        type: "ExclusiveFocusMotorState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      focusPosition: {
        type: "notify.FocusPosition",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_focusPosition",
      },
    },
    oneofs: { _focusPosition: ["focusPosition"] },
  },
  ExclusiveMotionMotorState: {
    fields: {
      astroCalibrationState: {
        type: "notify.AstroCalibrationState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroGotoState: {
        type: "notify.AstroGotoState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      astroTrackingState: {
        type: "notify.AstroTrackingState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      normalTrackState: {
        type: "notify.NormalTrackState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      oneClickGotoState: {
        type: "notify.OneClickGotoState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      eqState: {
        type: "notify.EqSolvingState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      sentryState: {
        type: "notify.SentryState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
      skyTargetFinderState: {
        type: "notify.SkyTargetFinderState",
        kind: "message",
        rule: "singular",
        optional: false,
        oneof: "currentState",
      },
    },
    oneofs: {
      currentState: [
        "astroCalibrationState",
        "astroGotoState",
        "astroTrackingState",
        "normalTrackState",
        "oneClickGotoState",
        "eqState",
        "sentryState",
        "skyTargetFinderState",
      ],
    },
  },
  MotionMotorStateInfo: {
    fields: {
      exclusiveState: {
        type: "ExclusiveMotionMotorState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      sentryAutoHand: {
        type: "notify.SentryAutoHand",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      rollLevelCalibrationAngle: {
        type: "notify.RollLevelCalibrationAngle",
        kind: "message",
        rule: "singular",
        optional: true,
        oneof: "_rollLevelCalibrationAngle",
      },
    },
    oneofs: { _rollLevelCalibrationAngle: ["rollLevelCalibrationAngle"] },
  },
  DeviceStateInfo: {
    fields: {
      rgbState: {
        type: "notify.RgbState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      powerIndState: {
        type: "notify.PowerIndState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      chargingState: {
        type: "notify.ChargingState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      storageInfo: {
        type: "notify.StorageInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      mtpState: {
        type: "notify.MTPState",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      cpuMode: {
        type: "notify.CPUMode",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      temperature: {
        type: "notify.Temperature",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      bodyStatus: {
        type: "notify.BodyStatus",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      batteryInfo: {
        type: "notify.BatteryInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      calibrationResult: {
        type: "notify.CalibrationResult",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      pictureMatching: {
        type: "notify.PictureMatching",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      autoShutdown: {
        type: "notify.AutoShutdown",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      lensDefog: {
        type: "notify.LensDefog",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      autoCooling: {
        type: "notify.AutoCooling",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ConnectionStateInfo: {
    fields: {
      hostSlaveMode: {
        type: "notify.HostSlaveMode",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ShootingModeAndTech: {
    fields: {
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      parentShootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      shootingTechs: {
        type: "int32",
        kind: "scalar",
        rule: "repeated",
        optional: false,
      },
    },
    oneofs: {},
  },
  ResGetDeviceStateInfo: {
    fields: {
      shootingMode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      teleCameraStateInfo: {
        type: "TeleCameraStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      wideCameraStateInfo: {
        type: "WideCameraStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      focusMotorStateInfo: {
        type: "FocusMotorStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      motionMotorStateInfo: {
        type: "MotionMotorStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      deviceStateInfo: {
        type: "DeviceStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      code: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
      connectionStateInfo: {
        type: "ConnectionStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      shootingModeAndTechs: {
        type: "ShootingModeAndTech",
        kind: "message",
        rule: "repeated",
        optional: false,
      },
      wideFocusMotorStateInfo: {
        type: "FocusMotorStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
      guideFocusMotorStateInfo: {
        type: "FocusMotorStateInfo",
        kind: "message",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartTrack: {
    fields: {
      x: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      y: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      w: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      h: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      camId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopTrack: { fields: {}, oneofs: {} },
  ReqPauseTrack: { fields: {}, oneofs: {} },
  ReqContinueTrack: { fields: {}, oneofs: {} },
  ReqStartSentryMode: {
    fields: {
      type: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStopSentryMode: { fields: {}, oneofs: {} },
  ReqUFOAutoHandMode: {
    fields: {
      mode: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
  ReqStartTrackClick: {
    fields: {
      x: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      y: { type: "int32", kind: "scalar", rule: "singular", optional: false },
      camId: {
        type: "int32",
        kind: "scalar",
        rule: "singular",
        optional: false,
      },
    },
    oneofs: {},
  },
};
/** @type {Record<string, Record<string, number>>} */
export const currentEnums = {
  "ResGetAstroShootingTime.AstroMode": { NORMAL: 0, MOSAIC: 1 },
  WsMajorVersion: { WS_MAJOR_VERSION_UNKNOWN: 0, WS_MAJOR_VERSION_NUMBER: 1 },
  WsMinorVersion: { WS_MINOR_VERSION_UNKNOWN: 0, WS_MINOR_VERSION_NUMBER: 9 },
  VocalType: { VT_UNKNOWN: 0, VT_PING: 1, VT_ECHO: 2 },
  MotorLevelCalibrationDirection: {
    MOTOR_LEVEL_CALIBRATION_DIRECTION_CW: 0,
    MOTOR_LEVEL_CALIBRATION_DIRECTION_CCW: 1,
  },
  "notify.OperationState": {
    OPERATION_STATE_IDLE: 0,
    OPERATION_STATE_RUNNING: 1,
    OPERATION_STATE_STOPPING: 2,
    OPERATION_STATE_STOPPED: 3,
  },
  "notify.AstroState": {
    ASTRO_STATE_IDLE: 0,
    ASTRO_STATE_RUNNING: 1,
    ASTRO_STATE_STOPPING: 2,
    ASTRO_STATE_STOPPED: 3,
    ASTRO_STATE_PLATE_SOLVING: 4,
  },
  "notify.SentryModeState": {
    SENTRY_MODE_STATE_IDLE: 0,
    SENTRY_MODE_STATE_INIT: 1,
    SENTRY_MODE_STATE_DETECT: 2,
    SENTRY_MODE_STATE_TRACK: 3,
    SENTRY_MODE_STATE_TRACK_FINISH: 4,
    SENTRY_MODE_STATE_STOPPING: 5,
  },
  "notify.SentryObjectType": {
    SENTRY_OBJECT_TYPE_UNKNOWN: 0,
    SENTRY_OBJECT_TYPE_UFO: 1,
    SENTRY_OBJECT_TYPE_BIRD: 2,
    SENTRY_OBJECT_TYPE_PERSON: 3,
    SENTRY_OBJECT_TYPE_ANIMAL: 4,
    SENTRY_OBJECT_TYPE_VEHICLE: 5,
    SENTRY_OBJECT_TYPE_FLYING: 6,
    SENTRY_OBJECT_TYPE_BOAT: 7,
  },
  "notify.CommonProgress.ProgressType": {
    PROGRESS_TYPE_INITING: 0,
    PROGRESS_TYPE_MOSAIC_MOVING: 1,
  },
  "notify.StateSystemResourceOccupation.TaskId": {
    IDLE: 0,
    PANORAMA_UPLOAD: 1,
    ASTRO_MULTI_STACK: 2,
  },
  "notify.BodyStatus.BodyStatusEnum": { UNKNOWN: 0, EQ_MODE: 1, AZI_MODE: 2 },
  ModuleId: {
    MODULE_NONE: 0,
    MODULE_CAMERA_TELE: 1,
    MODULE_CAMERA_WIDE: 2,
    MODULE_ASTRO: 3,
    MODULE_SYSTEM: 4,
    MODULE_RGB_POWER: 5,
    MODULE_MOTOR: 6,
    MODULE_TRACK: 7,
    MODULE_FOCUS: 8,
    MODULE_NOTIFY: 9,
    MODULE_PANORAMA: 10,
    MODULE_SHOOTING_SCHEDULE: 13,
    MODULE_DEVICE_CONFIG: 14,
    MODULE_CAMERA_PARAMS: 15,
  },
  MessageTypeId: {
    TYPE_REQUEST: 0,
    TYPE_REQUEST_RESPONSE: 1,
    TYPE_NOTIFICATION: 2,
    TYPE_NOTIFICATION_RESPONSE: 3,
  },
  DwarfCMD: {
    NO_CMD: 0,
    CMD_CAMERA_TELE_OPEN_CAMERA: 10000,
    CMD_CAMERA_TELE_CLOSE_CAMERA: 10001,
    CMD_CAMERA_TELE_PHOTOGRAPH: 10002,
    CMD_CAMERA_TELE_BURST: 10003,
    CMD_CAMERA_TELE_STOP_BURST: 10004,
    CMD_CAMERA_TELE_START_RECORD: 10005,
    CMD_CAMERA_TELE_STOP_RECORD: 10006,
    CMD_CAMERA_TELE_SET_EXP_MODE: 10007,
    CMD_CAMERA_TELE_GET_EXP_MODE: 10008,
    CMD_CAMERA_TELE_SET_EXP: 10009,
    CMD_CAMERA_TELE_GET_EXP: 10010,
    CMD_CAMERA_TELE_SET_GAIN_MODE: 10011,
    CMD_CAMERA_TELE_GET_GAIN_MODE: 10012,
    CMD_CAMERA_TELE_SET_GAIN: 10013,
    CMD_CAMERA_TELE_GET_GAIN: 10014,
    CMD_CAMERA_TELE_SET_BRIGHTNESS: 10015,
    CMD_CAMERA_TELE_GET_BRIGHTNESS: 10016,
    CMD_CAMERA_TELE_SET_CONTRAST: 10017,
    CMD_CAMERA_TELE_GET_CONTRAST: 10018,
    CMD_CAMERA_TELE_SET_SATURATION: 10019,
    CMD_CAMERA_TELE_GET_SATURATION: 10020,
    CMD_CAMERA_TELE_SET_HUE: 10021,
    CMD_CAMERA_TELE_GET_HUE: 10022,
    CMD_CAMERA_TELE_SET_SHARPNESS: 10023,
    CMD_CAMERA_TELE_GET_SHARPNESS: 10024,
    CMD_CAMERA_TELE_SET_WB_MODE: 10025,
    CMD_CAMERA_TELE_GET_WB_MODE: 10026,
    CMD_CAMERA_TELE_SET_WB_SCENE: 10027,
    CMD_CAMERA_TELE_GET_WB_SCENE: 10028,
    CMD_CAMERA_TELE_SET_WB_CT: 10029,
    CMD_CAMERA_TELE_GET_WB_CT: 10030,
    CMD_CAMERA_TELE_SET_IRCUT: 10031,
    CMD_CAMERA_TELE_GET_IRCUT: 10032,
    CMD_CAMERA_TELE_START_TIMELAPSE_PHOTO: 10033,
    CMD_CAMERA_TELE_STOP_TIMELAPSE_PHOTO: 10034,
    CMD_CAMERA_TELE_SET_ALL_PARAMS: 10035,
    CMD_CAMERA_TELE_GET_ALL_PARAMS: 10036,
    CMD_CAMERA_TELE_SET_FEATURE_PARAM: 10037,
    CMD_CAMERA_TELE_GET_ALL_FEATURE_PARAMS: 10038,
    CMD_CAMERA_TELE_GET_SYSTEM_WORKING_STATE: 10039,
    CMD_CAMERA_TELE_SET_JPG_QUALITY: 10040,
    CMD_CAMERA_TELE_PHOTO_RAW: 10041,
    CMD_CAMERA_TELE_SET_RTSP_BITRATE_TYPE: 10042,
    CMD_CAMERA_TELE_SET_PREVIEW_QUALITY: 10050,
    CMD_V3_CAMERA_TELE_OPEN_CAMERA: 10050,
    CMD_ASTRO_START_CALIBRATION: 11000,
    CMD_ASTRO_STOP_CALIBRATION: 11001,
    CMD_ASTRO_START_GOTO_DSO: 11002,
    CMD_ASTRO_START_GOTO_SOLAR_SYSTEM: 11003,
    CMD_ASTRO_STOP_GOTO: 11004,
    CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING: 11005,
    CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING: 11006,
    CMD_ASTRO_START_CAPTURE_RAW_DARK: 11007,
    CMD_ASTRO_STOP_CAPTURE_RAW_DARK: 11008,
    CMD_ASTRO_CHECK_GOT_DARK: 11009,
    CMD_ASTRO_GO_LIVE: 11010,
    CMD_ASTRO_START_TRACK_SPECIAL_TARGET: 11011,
    CMD_ASTRO_STOP_TRACK_SPECIAL_TARGET: 11012,
    CMD_ASTRO_START_ONE_CLICK_GOTO_DSO: 11013,
    CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM: 11014,
    CMD_ASTRO_STOP_ONE_CLICK_GOTO: 11015,
    CMD_ASTRO_START_WIDE_CAPTURE_LIVE_STACKING: 11016,
    CMD_ASTRO_STOP_WIDE_CAPTURE_LIVE_STACKING: 11017,
    CMD_ASTRO_START_EQ_SOLVING: 11018,
    CMD_ASTRO_STOP_EQ_SOLVING: 11019,
    CMD_ASTRO_WIDE_GO_LIVE: 11020,
    CMD_ASTRO_START_CAPTURE_RAW_DARK_WITH_PARAM: 11021,
    CMD_ASTRO_STOP_CAPTURE_RAW_DARK_WITH_PARAM: 11022,
    CMD_ASTRO_GET_DARK_FRAME_LIST: 11023,
    CMD_ASTRO_DEL_DARK_FRAME_LIST: 11024,
    CMD_ASTRO_START_CAPTURE_WIDE_RAW_DARK_WITH_PARAM: 11025,
    CMD_ASTRO_STOP_CAPTURE_WIDE_RAW_DARK_WITH_PARAM: 11026,
    CMD_ASTRO_GET_WIDE_DARK_FRAME_LIST: 11027,
    CMD_ASTRO_DEL_WIDE_DARK_FRAME_LIST: 11028,
    CMD_ASTRO_START_MAKE_FITS_THUMB: 11033,
    CMD_V3_ASTRO_SAVE_STACKED_IMAGE: 11033,
    CMD_ASTRO_STOP_MAKE_FITS_THUMB: 11034,
    CMD_V3_ASTRO_LIST_SAVED_IMAGES: 11034,
    CMD_ASTRO_STOP_RESTACKED: 11036,
    CMD_V3_ASTRO_SAVE_COMPLETE: 11036,
    CMD_ASTRO_GET_ASTRO_SHOOTING_TIME: 11039,
    CMD_V3_ASTRO_STATUS_POLLING: 11039,
    CMD_ASTRO_GET_QUICK_SET_LIST: 11040,
    CMD_V3_ASTRO_GET_PARAMS: 11040,
    CMD_ASTRO_SET_QUICK_SET: 11041,
    CMD_V3_ASTRO_SET_PARAMS: 11041,
    CMD_ASTRO_GET_CALI_FRAME_LIST: 11043,
    CMD_V3_ASTRO_GET_PRESETS: 11043,
    CMD_ASTRO_START_SKY_TARGET_FINDER: 11047,
    CMD_V3_ASTRO_SET_LOCATION: 11047,
    CMD_ASTRO_STOP_SKY_TARGET_FINDER: 11048,
    CMD_V3_ASTRO_CONFIRM: 11048,
    CMD_ASTRO_CONTINUE_SHOOTING: 11050,
    CMD_CAMERA_WIDE_OPEN_CAMERA: 12000,
    CMD_CAMERA_WIDE_CLOSE_CAMERA: 12001,
    CMD_CAMERA_WIDE_SET_EXP_MODE: 12002,
    CMD_CAMERA_WIDE_GET_EXP_MODE: 12003,
    CMD_CAMERA_WIDE_SET_EXP: 12004,
    CMD_CAMERA_WIDE_GET_EXP: 12005,
    CMD_CAMERA_WIDE_SET_GAIN: 12006,
    CMD_CAMERA_WIDE_GET_GAIN: 12007,
    CMD_CAMERA_WIDE_SET_BRIGHTNESS: 12008,
    CMD_CAMERA_WIDE_GET_BRIGHTNESS: 12009,
    CMD_CAMERA_WIDE_SET_CONTRAST: 12010,
    CMD_CAMERA_WIDE_GET_CONTRAST: 12011,
    CMD_CAMERA_WIDE_SET_SATURATION: 12012,
    CMD_CAMERA_WIDE_GET_SATURATION: 12013,
    CMD_CAMERA_WIDE_SET_HUE: 12014,
    CMD_CAMERA_WIDE_GET_HUE: 12015,
    CMD_CAMERA_WIDE_SET_SHARPNESS: 12016,
    CMD_CAMERA_WIDE_GET_SHARPNESS: 12017,
    CMD_CAMERA_WIDE_SET_WB_MODE: 12018,
    CMD_CAMERA_WIDE_GET_WB_MODE: 12019,
    CMD_CAMERA_WIDE_SET_WB_CT: 12020,
    CMD_CAMERA_WIDE_GET_WB_CT: 12021,
    CMD_CAMERA_WIDE_PHOTOGRAPH: 12022,
    CMD_CAMERA_WIDE_BURST: 12023,
    CMD_CAMERA_WIDE_STOP_BURST: 12024,
    CMD_CAMERA_WIDE_START_TIMELAPSE_PHOTO: 12025,
    CMD_CAMERA_WIDE_STOP_TIMELAPSE_PHOTO: 12026,
    CMD_CAMERA_WIDE_GET_ALL_PARAMS: 12027,
    CMD_CAMERA_WIDE_SET_ALL_PARAMS: 12028,
    CMD_CAMERA_WIDE_START_RECORD: 12030,
    CMD_CAMERA_WIDE_STOP_RECORD: 12031,
    CMD_CAMERA_WIDE_SET_PREVIEW_QUALITY: 12036,
    CMD_V3_CAMERA_WIDE_OPEN_CAMERA: 12036,
    CMD_SYSTEM_SET_TIME: 13000,
    CMD_SYSTEM_SET_TIME_ZONE: 13001,
    CMD_SYSTEM_SET_MTP_MODE: 13002,
    CMD_SYSTEM_SET_CPU_MODE: 13003,
    CMD_SYSTEM_SET_MASTER: 13004,
    CMD_SYSTEM_SET_MASTERLOCK: 13004,
    CMD_SYSTEM_SET_LOCATION: 13010,
    CMD_V3_SYSTEM_SET_GPS_LOCATION: 13010,
    CMD_RGB_POWER_OPEN_RGB: 13500,
    CMD_RGB_POWER_CLOSE_RGB: 13501,
    CMD_RGB_POWER_POWER_DOWN: 13502,
    CMD_RGB_POWER_POWERIND_ON: 13503,
    CMD_RGB_POWER_POWERIND_OFF: 13504,
    CMD_RGB_POWER_REBOOT: 13505,
    CMD_STEP_MOTOR_RUN: 14000,
    CMD_STEP_MOTOR_RUN_TO: 14001,
    CMD_STEP_MOTOR_STOP: 14002,
    CMD_STEP_MOTOR_RESET: 14003,
    CMD_STEP_MOTOR_CHANGE_SPEED: 14004,
    CMD_STEP_MOTOR_CHANGE_DIRECTION: 14005,
    CMD_STEP_MOTOR_SERVICE_JOYSTICK: 14006,
    CMD_STEP_MOTOR_SERVICE_JOYSTICK_FIXED_ANGLE: 14007,
    CMD_STEP_MOTOR_SERVICE_JOYSTICK_STOP: 14008,
    CMD_STEP_MOTOR_SERVICE_DUAL_CAMERA_LINKAGE: 14009,
    CMD_STEP_MOTOR_RUN_IN_PULSE: 14010,
    CMD_STEP_MOTOR_GET_POSITION: 14011,
    CMD_TRACK_START_TRACK: 14800,
    CMD_TRACK_STOP_TRACK: 14801,
    CMD_SENTRY_MODE_START: 14802,
    CMD_SENTRY_MODE_STOP: 14803,
    CMD_MOT_START: 14804,
    CMD_MOT_TRACK_ONE: 14805,
    CMD_UFOTRACK_MODE_START: 14806,
    CMD_UFOTRACK_MODE_STOP: 14807,
    CMD_MOT_WIDE_TRACK_ONE: 14808,
    CMD_SWITCH_MAIN_PREVIEW: 14809,
    CMD_WIDE_TELE_TRACK_SWITCH: 14809,
    CMD_UFO_HAND_AOTO_MODE: 14810,
    CMD_FOCUS_AUTO_FOCUS: 15000,
    CMD_FOCUS_MANUAL_SINGLE_STEP_FOCUS: 15001,
    CMD_FOCUS_START_MANUAL_CONTINU_FOCUS: 15002,
    CMD_FOCUS_STOP_MANUAL_CONTINU_FOCUS: 15003,
    CMD_FOCUS_START_ASTRO_AUTO_FOCUS: 15004,
    CMD_FOCUS_STOP_ASTRO_AUTO_FOCUS: 15005,
    CMD_FOCUS_GET_USER_INFINITY_POS: 15011,
    CMD_V3_FOCUS_INIT: 15011,
    CMD_NOTIFY_TELE_WIDE_PICTURE_MATCHING: 15200,
    CMD_NOTIFY_TELE_WIDI_PICTURE_MATCHING: 15200,
    CMD_NOTIFY_ELE: 15201,
    CMD_NOTIFY_CHARGE: 15202,
    CMD_NOTIFY_SDCARD_INFO: 15203,
    CMD_NOTIFY_TELE_RECORD_TIME: 15204,
    CMD_NOTIFY_TELE_TIMELAPSE_OUT_TIME: 15205,
    CMD_NOTIFY_STATE_CAPTURE_RAW_DARK: 15206,
    CMD_NOTIFY_PROGRASS_CAPTURE_RAW_DARK: 15207,
    CMD_NOTIFY_STATE_CAPTURE_RAW_LIVE_STACKING: 15208,
    CMD_NOTIFY_PROGRASS_CAPTURE_RAW_LIVE_STACKING: 15209,
    CMD_NOTIFY_STATE_ASTRO_CALIBRATION: 15210,
    CMD_NOTIFY_STATE_ASTRO_GOTO: 15211,
    CMD_NOTIFY_STATE_ASTRO_TRACKING: 15212,
    CMD_NOTIFY_TELE_SET_PARAM: 15213,
    CMD_NOTIFY_WIDE_SET_PARAM: 15214,
    CMD_NOTIFY_TELE_FUNCTION_STATE: 15215,
    CMD_NOTIFY_WIDE_FUNCTION_STATE: 15216,
    CMD_NOTIFY_SET_FEATURE_PARAM: 15217,
    CMD_NOTIFY_TELE_BURST_PROGRESS: 15218,
    CMD_NOTIFY_PANORAMA_PROGRESS: 15219,
    CMD_NOTIFY_WIDE_BURST_PROGRESS: 15220,
    CMD_NOTIFY_RGB_STATE: 15221,
    CMD_NOTIFY_POWER_IND_STATE: 15222,
    CMD_NOTIFY_WS_HOST_SLAVE_MODE: 15223,
    CMD_NOTIFY_MTP_STATE: 15224,
    CMD_NOTIFY_TRACK_RESULT: 15225,
    CMD_NOTIFY_WIDE_TIMELAPSE_OUT_TIME: 15226,
    CMD_NOTIFY_CPU_MODE: 15227,
    CMD_NOTIFY_STATE_ASTRO_TRACKING_SPECIAL: 15228,
    CMD_NOTIFY_POWER_OFF: 15229,
    CMD_NOTIFY_ALBUM_UPDATE: 15230,
    CMD_NOTIFY_SENTRY_MODE_STATE: 15231,
    CMD_NOTIFY_SENTRY_MODE_TRACK_RESULT: 15232,
    CMD_NOTIFY_STATE_ASTRO_ONE_CLICK_GOTO: 15233,
    CMD_NOTIFY_STREAM_TYPE: 15234,
    CMD_NOTIFY_WIDE_RECORD_TIME: 15235,
    CMD_NOTIFY_STATE_WIDE_CAPTURE_RAW_LIVE_STACKING: 15236,
    CMD_NOTIFY_PROGRASS_WIDE_CAPTURE_RAW_LIVE_STACKING: 15237,
    CMD_NOTIFY_MULTI_TRACK_RESULT: 15238,
    CMD_NOTIFY_EQ_SOLVING_STATE: 15239,
    CMD_NOTIFY_UFO_MODE_STATE: 15240,
    CMD_NOTIFY_TELE_LONG_EXP_PROGRESS: 15241,
    CMD_NOTIFY_WIDE_LONG_EXP_PROGRESS: 15242,
    CMD_NOTIFY_TEMPERATURE: 15243,
    CMD_NOTIFY_PANORAMA_UPLOAD_COMPRESS_PROGRESS: 15244,
    CMD_NOTIFY_PANORAMA_UPLOAD_UPLOAD_PROGRESS: 15245,
    CMD_NOTIFY_PANORAMA_UPLOAD_COMPLETE: 15245,
    CMD_NOTIFY_STATE_CAPTURE_WIDE_RAW_DARK: 15247,
    CMD_NOTIFY_SHOOTING_SCHEDULE_RESULT_AND_STATE: 15248,
    CMD_NOTIFY_SHOOTING_TASK_STATE: 15249,
    CMD_NOTIFY_SKY_SEACHER_STATE: 15250,
    CMD_NOTIFY_WIDE_MULTI_TRACK_RESULT: 15251,
    CMD_NOTIFY_WIDE_TRACK_RESULT: 15252,
    CMD_NOTIFY_CALIBRATION_RESULT: 15256,
    CMD_NOTIFY_FOCUS_POSITION: 15257,
    CMD_NOTIFY_FOCUS: 15257,
    CMD_NOTIFY_WAIT_SHOOTING_PROGRESS: 15255,
    CMD_V3_NOTIFY_EXPOSURE_PROGRESS: 15255,
    CMD_NOTIFY_EXCLUSIVE_SYSTEM_IO_TASK_STATE: 15261,
    CMD_V3_NOTIFY_DEVICE_STATE: 15261,
    CMD_NOTIFY_GENERAL_INT_PARAM: 15264,
    CMD_V3_NOTIFY_CAMERA_PARAM_STATE: 15264,
    CMD_NOTIFY_SWITCH_SHOOTING_MODE: 15267,
    CMD_V3_NOTIFY_MODE_CHANGE: 15267,
    CMD_NOTIFY_WB: 15270,
    CMD_V3_NOTIFY_STACKING_DATA: 15270,
    CMD_NOTIFY_PHOTO_STATE: 15273,
    CMD_V3_NOTIFY_PHOTO_STATE: 15273,
    CMD_NOTIFY_BURST_STATE: 15274,
    CMD_V3_NOTIFY_BURST_STATE: 15274,
    CMD_NOTIFY_RECORD_STATE: 15275,
    CMD_V3_NOTIFY_VIDEO_STATE: 15275,
    CMD_NOTIFY_TIMELAPSE_STATE: 15276,
    CMD_V3_NOTIFY_TIMELAPSE_STATE: 15276,
    CMD_NOTIFY_ASTRO_AUTO_FOCUS_STATE: 15278,
    CMD_V3_NOTIFY_AUTOFOCUS_STATE: 15278,
    CMD_NOTIFY_ASTRO_AUTO_FOCUS_FAST_STATE: 15280,
    CMD_V3_NOTIFY_AUTOFOCUS_STATE_ALT: 15280,
    CMD_NOTIFY_BURST_PROGRESS: 15285,
    CMD_V3_NOTIFY_PHOTO_BURST_PROGRESS: 15285,
    CMD_NOTIFY_RECORD_TIME: 15286,
    CMD_V3_NOTIFY_VIDEO_PROGRESS: 15286,
    CMD_NOTIFY_TIMELAPSE_OUT_TIME: 15287,
    CMD_V3_NOTIFY_TIMELAPSE_PROGRESS: 15287,
    CMD_NOTIFY_LONG_EXP_PROGRESS: 15288,
    CMD_NOTIFY_STATE_CAPTURE_CALI_FRAME: 15290,
    CMD_V3_NOTIFY_CALI_FRAME_STATE: 15290,
    CMD_NOTIFY_PROGRESS_CAPTURE_CALI_FRAME: 15291,
    CMD_V3_NOTIFY_CALI_FRAME_PROGRESS: 15291,
    CMD_NOTIFY_CMOS_TEMPERATURE: 15292,
    CMD_V3_NOTIFY_TEMPERATURE2: 15292,
    CMD_NOTIFY_SKY_TARGET_FINDER_STATE: 15296,
    CMD_V3_NOTIFY_OBSERVATION_STATE: 15296,
    CMD_PANORAMA_START_GRID: 15500,
    CMD_PANORAMA_STOP: 15501,
    CMD_PANORAMA_START_EULER_RANGE: 15502,
    CMD_GET_ALL_SHOOTING_SCHEDULE: 16102,
    CMD_V3_SCHEDULE_GET: 16102,
    CMD_GLOBAL_TASK_MANAGER_SWITCH_SHOOTING_MODE: 16402,
    CMD_V3_DEVICE_CONFIG_MODE_QUERY: 16402,
    CMD_GLOBAL_TASK_MANAGER_SWITCH_SHOOTING_TECH: 16403,
    CMD_V3_DEVICE_CONFIG_SHOOTING_MODE: 16403,
    CMD_GLOBAL_TASK_MANAGER_ENTER_CAMERA: 16404,
    CMD_V3_DEVICE_CONFIG_MODE_SWITCH: 16404,
    CMD_GLOBAL_TASK_GET_DEVICE_STATE_INFO: 16405,
    CMD_V3_DEVICE_CONFIG_GET_CONFIG: 16405,
    CMD_PARAM_SET_EXPOSURE: 16700,
    CMD_V3_CAMERA_PARAMS_SET_PARAM: 16700,
    CMD_PARAM_SET_GAIN: 16701,
    CMD_V3_CAMERA_PARAMS_SET_EXP_GAIN: 16701,
    CMD_PARAM_SET_GENERAL_INT_PARAM: 16703,
    CMD_V3_CAMERA_PARAMS_ADJUST: 16703,
    CMD_PARAM_SET_AUTO_PARAMS: 16706,
    CMD_V3_CAMERA_PARAMS_STREAM_CTRL: 16706,
  },
  DwarfErrorCode: {
    OK: 0,
    WS_OK: 0,
    WS_PARSE_PROTOBUF_ERROR: -1,
    WS_SDCARD_NOT_EXIST: -2,
    WS_INVAID_PARAM: -3,
    WS_SDCARD_WRITE_ERROR: -4,
    WS_DEVICE_NOT_ACTIVATED: -5,
    WS_SDCARD_FULL_ERROR: -6,
    CODE_CAMERA_TELE_OPENED: -10500,
    CODE_CAMERA_TELE_CLOSED: -10501,
    CODE_CAMERA_TELE_ISP_SET_FAILED: -10502,
    CODE_CAMERA_TELE_OPEN_FAILED: -10503,
    CODE_CAMERA_TELE_START_RECORD_FAILED: -10504,
    CODE_CAMERA_TELE_STOP_RECORD_FAILED: -10505,
    CODE_CAMERA_TELE_CAPTURE_RAW_FAILED: -10506,
    CODE_CAMERA_TELE_WORKING_BUSY: -10507,
    CODE_CAMERA_TELE_GET_IMAGE_FAILED: -10508,
    CODE_CAMERA_TELE_RUNNING_PHOTO: -10509,
    CODE_CAMERA_TELE_RUNNING_RECORD: -10510,
    CODE_CAMERA_TELE_RUNNING_PANORAMA: -10511,
    CODE_CAMERA_TELE_RUNNING_TIMELAPSE: -10512,
    CODE_CAMERA_TELE_RUNNING_CAPTURE_DARK: -10513,
    CODE_CAMERA_TELE_RUNNING_CAPTURE_LIVE_STACKING: -10514,
    CODE_CAMERA_TELE_EXP_TOO_LONG: -10515,
    CODE_CAMERA_TELE_SWITCH_WORK_MODE_FAILED: -10516,
    CODE_CAMERA_TELE_RUNNING_TRACK: -10517,
    CODE_CAMERA_TELE_RECORD_FILE_ERROR: -10518,
    CODE_ASTRO_PLATE_SOLVING_FAILED: -11500,
    CODE_ASTRO_FUNCTION_BUSY: -11501,
    CODE_ASTRO_DARK_GAIN_OUT_OF_RANGE: -11502,
    CODE_ASTRO_DARK_NOT_FOUND: -11503,
    CODE_ASTRO_CALIBRATION_FAILED: -11504,
    CODE_ASTRO_GOTO_FAILED: -11505,
    CODE_ASTRO_DARK_RUNNING: -11506,
    CODE_ASTRO_CALIBRATION_RUNNING: -11507,
    CODE_ASTRO_GOTO_RUNNING: -11508,
    CODE_ASTRO_LIVE_STACKING_RUNNING: -11509,
    CODE_ASTRO_RESET_PITCH_MOTOR_FAILED: -11510,
    CODE_ASTRO_NEED_CALIBRATION: -11511,
    CODE_ASTRO_GOTO_READ_MOTOR_POSITION_AND_PLATE_SOLVING_FAILED: -11512,
    CODE_ASTRO_NEED_GOTO: -11513,
    CODE_ASTRO_NEED_ADJUST_SHOOT_PARAM: -11514,
    CODE_ASTRO_CALIBRATION_PLATE_SOLVING_FAILED_TOO_MUCH: -11515,
    CODE_ASTRO_EQ_SOLVING_FAILED: -11516,
    CODE_ASTRO_SKY_SEARCH_FAILED: -11517,
    CODE_ASTRO_NEED_GOTO_DSO: -11518,
    CODE_ASTRO_RESTACK_CAMERA_MISMATCH: -11519,
    CODE_ASTRO_RESTACK_BINNING_MISMATCH: -11520,
    CODE_ASTRO_RESTACK_FILTER_MISMATCH: -11521,
    CODE_ASTRO_RESTACK_TARGET_MISMATCH: -11522,
    CODE_ASTRO_RESTACK_DARKFRAME_MISMATCH: -11523,
    CODE_ASTRO_RESTACK_FAILED: -11524,
    CODE_ASTRO_RESTACK_INVALID_DATA: -11525,
    CODE_ASTRO_OVEREXPOSURE_WARNING: -11526,
    CODE_ASTRO_EXP_TOO_LONG: -11527,
    CODE_ASTRO_NEED_EQ: -11528,
    CODE_ASTRO_STAR_TOO_FEW: -11529,
    CODE_ASTRO_DARK_TEMP_MISMATCH: -11530,
    CODE_ASTRO_SUN_MOON_NOT_FOUND: -11531,
    CODE_ASTRO_GUIDING_FAILED_LOWER_EXPOSURE: -11532,
    CODE_ASTRO_GUIDING_FAILED_TARGET_BLOCKED: -11533,
    CODE_CAMERA_WIDE_OPENED: -12500,
    CODE_CAMERA_WIDE_CLOSED: -12501,
    CODE_CAMERA_WIDE_CANNOT_FOUND: -12502,
    CODE_CAMERA_WIDE_OPEN_FAILED: -12503,
    CODE_CAMERA_WIDE_CLOSE_FAILED: -12504,
    CODE_CAMERA_WIDE_SET_ISP_FAILED: -12505,
    CODE_CAMERA_WIDE_PHOTOGRAPHING: -12506,
    CODE_CAMERA_WIDE_TIMELAPSE_RECORDING: -12507,
    CODE_CAMERA_WIDE_EXP_TOO_LONG: -12508,
    CODE_CAMERA_WIDE_RECORD_FILE_ERROR: -12509,
    CODE_SYSTEM_SET_TIME_FAILED: -13300,
    CODE_SYSTEM_SET_TIMEZONE_FAILED: -13301,
    CODE_RGB_POWER_UART_INIT_FAILED: -13800,
    CODE_RGB_POWER_UART_SEND_FAILED: -13801,
    CODE_STEP_MOTOR_IS_RUNNING: -14500,
    CODE_STEP_MOTOR_IS_STOPPED: -14501,
    CODE_STEP_MOTOR_PARALLEL_IN: -14502,
    CODE_STEP_MOTOR_PARALLEL_END: -14503,
    CODE_STEP_MOTOR_INVALID_PARAMETER_ID: -14504,
    CODE_STEP_MOTOR_INVALID_PARAMETER_ANGLE: -14505,
    CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED: -14506,
    CODE_STEP_MOTOR_INVALID_PARAMETER_SPEED_RAMPING: -14507,
    CODE_STEP_MOTOR_INVALID_PARAMETER_RESOLUTION: -14508,
    CODE_STEP_MOTOR_INVALID_PARAMETER_POSITION: -14509,
    CODE_STEP_MOTOR_OVERTIME_GET_LIMIT_RETURN: -14510,
    CODE_STEP_MOTOR_OVERTIME_GET_RESET_RETURN: -14511,
    CODE_STEP_MOTOR_OVERTIME_GET_ABSOLUTE_POSITION_RETURN: -14512,
    CODE_STEP_MOTOR_OVERTIME_GET_RELATIVE_POSITION_RETURN: -14513,
    CODE_STEP_MOTOR_OVERTIME_WAIT_TO_STOP: -14514,
    CODE_STEP_MOTOR_OVERTIME_WAIT_TO_RUN: -14515,
    CODE_STEP_MOTOR_LIMIT_SPEED_TO_MAX: -14516,
    CODE_STEP_MOTOR_LIMIT_SPEED_TO_MIN: -14517,
    CODE_STEP_MOTOR_LIMIT_POSITION_WARNING: -14518,
    CODE_STEP_MOTOR_LIMIT_POSITION_HIT: -14519,
    CODE_STEP_MOTOR_NEED_RESET: -14520,
    CODE_STEP_MOTOR_OVERTIME_GET_PE_SWITCH_RETURN: -14521,
    CODE_STEP_MOTOR_OVERTIME_TO_RESET: -14522,
    CODE_STEP_MOTOR_ROLL_LIMIT_ANGLE_WARNING: -14523,
    CODE_TRACK_TRACKER_INITING: -14900,
    CODE_TRACK_TRACKER_FAILED: -14901,
    CODE_TRACK_SENTRY_MODE_INITING: -14902,
    CODE_TRACK_SENTRY_MODE_FAILED: -14903,
    CODE_UFOTRACK_MODE_INITING: -14904,
    CODE_UFOTRACK_MODE_FAILED: -14905,
    CODE_UFO_DAY_AUTO_MODE: -14906,
    CODE_FOCUS_ASTRO_AUTO_FOCUS_SLOW_ERROR: -15100,
    CODE_FOCUS_ASTRO_AUTO_FOCUS_FAST_ERROR: -15101,
    CODE_FOCUS_EXP_TOO_LONG: -15106,
    CODE_FOCUS_INFINITY_POS_ERROR: -15107,
    CODE_FOCUS_GET_NOW_POS_FAILED: -15108,
    CODE_PANORAMA_PHOTO_FAILED: -15600,
    CODE_PANORAMA_MOTOR_RESET_FAILED: -15601,
    CODE_PANORAMA_UPLOAD_USER_STOP: -15602,
    CODE_PANORAMA_UPLOAD_FILE_CHECK_FAILED: -15603,
    CODE_PANORAMA_UPLOAD_COMPRESS_FAILED: -15604,
    CODE_PANORAMA_UPLOAD_UPLOAD_FAILED: -15605,
    CODE_PANORAMA_UPLOAD_NOT_EXIST: -15606,
    CODE_PANORAMA_UPLOAD_IS_RUNNING: -15607,
    CODE_PANORAMA_UPLOAD_CAMERA_BUSY: -15608,
    CODE_PANORAMA_UPLOAD_NOT_IN_STA: -15609,
    CODE_PANORAMA_COMPRESSION_IS_RUNNING: -15612,
    CODE_PANORAMA_COMPOSE_IS_IDEL: -15614,
    CODE_PANORAMA_COMPOSE_IS_RUNNING: -15615,
    CODE_SHOOTING_SCHEDULE_DEVICE_ID_NOT_MATCH: -16300,
    CODE_SHOOTING_SCHEDULE_INVALID_SHOOTING_DURATION: -16301,
    CODE_SHOOTING_SCHEDULE_TIME_CONFLICT: -16302,
    CODE_SHOOTING_SCHEDULE_INVALID_TASK_DURATION: -16303,
    CODE_SHOOTING_SCHEDULE_DATABASE_OPERATION_FAILED: -16305,
    CODE_SHOOTING_SCHEDULE_PASSWORD_ERROR: -16306,
    CODE_SHOOTING_SCHEDULE_SHOOTING: -16307,
    CODE_SHOOTING_SCHEDULE_START_TIME_TOO_FAR: -16308,
    CODE_SHOOTING_SCHEDULE_DEVICE_BUSY: -16309,
    CODE_SHOOTING_SCHEDULE_INTERRUPTED: -16310,
    CODE_SHOOTING_SCHEDULE_NOT_SYNCED: -16311,
    CODE_SHOOTING_SCHEDULE_TASK_TIME_TOO_SHORT: -16312,
    CODE_SHOOTING_SCHEDULE_TASK_EXPIRED: -16313,
    CODE_GLOBAL_TASK_MANAGER_BUSY: -16600,
  },
  AstroTrackingSpecial: { TRACKING_SUN: 0, TRACKING_MOON: 1 },
  SolarSystemTarget: {
    Unknown: 0,
    Mercury: 1,
    Venus: 2,
    Mars: 3,
    Jupiter: 4,
    Saturn: 5,
    Uranus: 6,
    Neptune: 7,
    Moon: 8,
    Sun: 9,
  },
  PhotoMode: { Auto: 0, Manual: 1 },
  WBMode: { ColorTemperature: 0, SceneMode: 1 },
  IrCut: { CUT: 0, PASS: 1 },
  ShootingScheduleState: {
    SHOOTING_SCHEDULE_STATE_INITIALIZED: 0,
    SHOOTING_SCHEDULE_STATE_PENDING_SHOOT: 1,
    SHOOTING_SCHEDULE_STATE_SHOOTING: 2,
    SHOOTING_SCHEDULE_STATE_COMPLETED: 3,
    SHOOTING_SCHEDULE_STATE_EXPIRED: 4,
  },
  ShootingScheduleSyncState: {
    SHOOTING_SCHEDULE_SYNC_STATE_PENDING_SYNC: 0,
    SHOOTING_SCHEDULE_SYNC_STATE_SYNCED: 1,
  },
  ShootingScheduleResult: {
    SHOOTING_SCHEDULE_RESULT_PENDING_START: 0,
    SHOOTING_SCHEDULE_RESULT_ALL_COMPLETED: 1,
    SHOOTING_SCHEDULE_RESULT_PARTIALLY_COMPLETED: 2,
    SHOOTING_SCHEDULE_RESULT_ALL_FAILED: 3,
  },
  ShootingTaskState: {
    SHOOTING_TASK_STATUS_IDLE: 0,
    SHOOTING_TASK_STATUS_SHOOTING: 1,
    SHOOTING_TASK_STATUS_SUCCESS: 2,
    SHOOTING_TASK_STATUS_FAILED: 3,
    SHOOTING_TASK_STATUS_INTERRUPTED: 4,
  },
  ShootingScheduleMode: { SHOOTING_SCHEDULE_MODE_ASTRO_DEEP_SKY: 0 },
  TaskId: {
    TASK_ID_IDLE: 0,
    TASK_ID_PANORAMA_UPLOAD: 1,
    TASK_ID_ASTRO_MULTI_STACK_THUMBNAIL_GENERATION: 2,
    TASK_ID_ASTRO_MULTI_STACK: 3,
    TASK_ID_CAPTURE_CALI_FRAME: 4,
  },
  ExclusiveTaskType: {
    EXCLUSIVE_TYPE_NONE: 0,
    EXCLUSIVE_TYPE_CAMERA: 1,
    EXCLUSIVE_TYPE_MOTOR: 2,
    EXCLUSIVE_TYPE_FOCUS_MOTOR: 4,
    EXCLUSIVE_TYPE_SYSTEM_IO: 8,
    EXCLUSIVE_TYPE_SYSTEM_WIFI: 16,
  },
};
