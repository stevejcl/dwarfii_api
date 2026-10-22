// Compile-only contract for the generated default-only namespace declaration.
import current from "../src/protobuf/current.js";

const enter: current.IReqEnterCamera = { clientParam: { encodeType: 1 } };
current.ReqEnterCamera.encode(enter).finish();
const exposure: current.param.IReqSetExposure =
  current.param.ReqSetExposure.fromObject({
    paramId: "144396663052566529",
    mode: 1,
    value: 120,
  });
current.param.ReqSetExposure.encode(exposure);
current.notify.CmosTemperature.decode(new Uint8Array()).temperature;
// @ts-expect-error Wrong legacy property is not a current camera-entry field.
const invalid: current.IReqEnterCamera = { targetMode: 2 };
void invalid;
