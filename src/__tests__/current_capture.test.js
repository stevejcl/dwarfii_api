// Offline synthetic catalog/transport fixtures. Sequence and quick-set examples
// follow dwarfAlp b5a56f0 tests/test_session_camera.py:200/250/310; no hardware.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildCurrentCapturePlan,
  currentCaptureControlsForObservedMode,
  executeCurrentCapture,
  resolveCurrentCaptureControls,
  resolveCurrentScienceFilter,
} from "../../dist/src/current_capture.js";
import {
  decodeCurrentParamId,
  encodeCurrentParamId,
  normalizeCurrentCameraCatalog,
} from "../../dist/src/current_catalog.js";
import {
  CurrentCommands,
  CurrentProtocolError,
  getCurrentProfile,
} from "../../dist/src/current_protocol.js";

const id = (cameraId, category, paramIndex, reserved = "0") =>
  encodeCurrentParamId({
    shootingMode: 2,
    cameraId,
    category,
    paramIndex,
    reserved,
  });
function catalog() {
  return normalizeCurrentCameraCatalog(
    {
      code: 0,
      data: {
        cameraParams: [0, 1].map((cameraId) => ({
          cameraId,
          specialParams: {
            exp: {
              paramId: id(cameraId, 1, 1),
              values: [
                { value: 30, name: "1/1000" },
                { value: 120, name: "1" },
                { value: 141, name: "5" },
                { value: 156, name: "15" },
              ],
            },
            gain: { paramId: id(cameraId, 1, 2), values: [40, 60, 100] },
          },
          generalParams: [
            {
              name: "frameCount",
              paramId: id(cameraId, 2, 16),
              values: [1, 2, 10],
            },
          ],
        })),
      },
    },
    2,
  );
}
const settings = (overrides = {}) => ({
  cameraId: 0,
  exposureSeconds: 1,
  gain: 60,
  frameCount: 2,
  filterIndex: 1,
  ...overrides,
});
function presets(cameraType = 0, infoId = "0|0|15|60|1|null") {
  return { cameraType, quickSetList: [{ cameraType, infoId }] };
}
const kind = (value) => (error) =>
  error instanceof CurrentProtocolError && error.kind === value;
function transport({ responseOverride, failOn } = {}) {
  const calls = [];
  const client = {
    state: { session: { generation: 1 } },
    async request(operation, values) {
      calls.push({ operation, values: structuredClone(values) });
      if (operation === failOn)
        throw new CurrentProtocolError("device", "Synthetic rejection", -1);
      let data = {};
      if (operation === "switchShootingMode") data = { shootingModeId: 8 };
      if (operation === "enterCamera") data = { shootingModeId: 8 };
      if (operation === "switchShootingTech") data = { shootingTechId: 2 };
      if (operation === "getQuickSets") data = presets(values.cameraType);
      if (operation === "setQuickSet") data = { infoId: values.infoId };
      data = responseOverride?.(operation, data, values, client) ?? data;
      const [moduleId, cmd] = CurrentCommands[operation];
      return { moduleId, cmd, type: 1, data, known: true };
    },
  };
  return { client, calls };
}

test("Mini/D3/D2 filters resolve semantically, never as shifted UI ordinals", () => {
  assert.equal(resolveCurrentScienceFilter(getCurrentProfile(4), "Astro"), 1);
  assert.equal(resolveCurrentScienceFilter(getCurrentProfile(4), "Duo"), 2);
  assert.equal(resolveCurrentScienceFilter(getCurrentProfile(2), "VIS"), 0);
  assert.equal(resolveCurrentScienceFilter(getCurrentProfile(1), "IR-cut"), 0);
  for (const unsupported of [0, 3, "VIS", "Dark", "unknown"])
    assert.throws(
      () => resolveCurrentScienceFilter(getCurrentProfile(4), unsupported),
      kind("invalid-parameter"),
    );
});

test("runtime exposure is an advertised index, gain is an advertised gain, IDs stay exact", () => {
  const controls = resolveCurrentCaptureControls(
    getCurrentProfile(4),
    catalog(),
    settings(),
  );
  assert.deepEqual(controls.exposure, {
    paramId: "144396663052566529",
    mode: 1,
    value: 120,
  });
  assert.deepEqual(controls.gain, {
    paramId: "144396663052566530",
    mode: 1,
    value: 60,
  });
  assert.deepEqual(controls.frameCount, {
    paramId: "144678138029277200",
    value: 2,
  });
});

test("quick-set modifies only exposure/gain slots and preserves Mini resolution and unknown suffix", () => {
  const input = presets(0, "0|0|15|100|1|null|future-value");
  const plan = buildCurrentCapturePlan(
    getCurrentProfile(4),
    catalog(),
    settings(),
    input,
  );
  assert.equal(plan.quickSetInfoId, "0|0|1|60|1|null|future-value");
  assert.equal(plan.resolutionIndex, 1);
  assert.equal(input.quickSetList[0].infoId, "0|0|15|100|1|null|future-value");
  assert.equal(plan.steps[5].values.value, 2);
  assert.notEqual(plan.quickSetInfoId.split("|")[4], "2");
});

test("D3 zero resolution placeholder is retained without borrowing Mini settings", () => {
  const plan = buildCurrentCapturePlan(
    getCurrentProfile(2),
    catalog(),
    settings({ filterIndex: 0 }),
    presets(0, "0|0|1|100|0|null"),
  );
  assert.equal(plan.quickSetInfoId, "0|0|1|60|0|null");
  assert.equal(plan.resolutionIndex, 0);
  assert.deepEqual(plan.steps.at(-1), {
    operation: "startTeleCapture",
    values: { irIndex: 0 },
  });
});

test("nearest template is selected by duration then gain while other tuple fields remain opaque", () => {
  const input = {
    cameraType: 0,
    quickSetList: [
      { infoId: "a|b|15|60|1|null" },
      { infoId: "c|d|1|100|0|opaque" },
      { infoId: "e|f|1|60|3|opaque" },
    ],
  };
  const plan = buildCurrentCapturePlan(
    getCurrentProfile(2),
    catalog(),
    settings(),
    input,
  );
  assert.equal(plan.quickSetInfoId, "e|f|1|60|3|opaque");
});

test("wide capture uses only its discovered IDs and no telephoto filter field", async () => {
  const { client, calls } = transport();
  const result = await executeCurrentCapture(
    client,
    getCurrentProfile(4),
    catalog(),
    settings({ cameraId: 1, filterIndex: undefined }),
  );
  assert.equal(result.plan.controls.exposure.paramId, id(1, 1, 1));
  assert.deepEqual(
    calls.find((call) => call.operation === "getQuickSets").values,
    { cameraType: 1 },
  );
  assert.deepEqual(calls.at(-1), { operation: "startWideCapture", values: {} });
  assert.equal(result.status, "awaiting-progress");
});

test("verified submission sequence reapplies live parameters after persisted quick-set", async () => {
  const { client, calls } = transport();
  const result = await executeCurrentCapture(
    client,
    getCurrentProfile(4),
    catalog(),
    settings(),
  );
  assert.deepEqual(
    calls.map((call) => CurrentCommands[call.operation][1]),
    [
      16402, 16404, 16403, 11040, 16700, 16701, 11041, 16700, 16701, 16703,
      11005,
    ],
  );
  assert.deepEqual(calls[0].values, { mode: 8 });
  assert.deepEqual(calls[1].values, { clientParam: { encodeType: 1 } });
  assert.deepEqual(calls[2].values, { tech: 2 });
  assert.deepEqual(calls.at(-1).values, { irIndex: 1 });
  assert.equal(result.status, "awaiting-progress");
  assert.equal(result.acknowledgement.cmd, 11005);
  assert.equal(result.completed, undefined);
});

test("invalid settings/catalog fail locally before any mode, parameter or capture command", async () => {
  const cases = [
    [catalog(), settings({ gain: 999 })],
    [catalog(), settings({ exposureSeconds: 1.5 })],
    [catalog(), settings({ frameCount: 3 })],
    [catalog(), settings({ frameCount: 0 })],
    [catalog(), settings({ filterIndex: 0 })],
    [catalog(), settings({ cameraId: 1 })],
    [{ ...catalog(), modeId: 8 }, settings()],
  ];
  const noCount = catalog();
  noCount.cameras[0].parameters = noCount.cameras[0].parameters.filter(
    (parameter) => parameter.key !== "frameCount",
  );
  cases.push([noCount, settings()]);
  const wrongId = catalog();
  wrongId.cameras[0].parameters[0].paramId = id(1, 1, 1);
  cases.push([wrongId, settings()]);
  for (const [cameraCatalog, parameters] of cases) {
    const { client, calls } = transport();
    await assert.rejects(
      executeCurrentCapture(
        client,
        getCurrentProfile(4),
        cameraCatalog,
        parameters,
      ),
    );
    assert.equal(calls.length, 0);
  }
});

test("empty, malformed or wrong-camera quick sets are never replaced with an invented template", () => {
  for (const quick of [
    {},
    presets(1),
    presets(0, "bad"),
    presets(0, "0|0|15|60||null"),
    presets(0, "0|0|0|60|1|null"),
    { cameraType: 0, quickSetList: [] },
  ]) {
    assert.throws(() =>
      buildCurrentCapturePlan(
        getCurrentProfile(4),
        catalog(),
        settings(),
        quick,
      ),
    );
  }
});

test("mode/entry/technology acknowledgements must confirm the requested workflow", async () => {
  for (const operation of [
    "switchShootingMode",
    "enterCamera",
    "switchShootingTech",
  ]) {
    const { client, calls } = transport({
      responseOverride: (name, data) => (name === operation ? {} : data),
    });
    await assert.rejects(
      executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      ),
      kind("device"),
    );
    assert.equal(calls.at(-1).operation, operation);
    assert.equal(
      calls.some((call) => call.operation === "startTeleCapture"),
      false,
    );
  }
  const { client } = transport({
    responseOverride: (operation, data) =>
      operation === "enterCamera" ? { shootingModeId: 2 } : data,
  });
  assert.equal(
    (
      await executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      )
    ).status,
    "awaiting-progress",
  );
});

test("every rejected configuration step stops the sequence without starting capture", async () => {
  for (const operation of [
    "switchShootingMode",
    "enterCamera",
    "switchShootingTech",
    "getQuickSets",
    "setExposure",
    "setGain",
    "setQuickSet",
    "setIntegerParameter",
  ]) {
    const { client, calls } = transport({ failOn: operation });
    await assert.rejects(
      executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      ),
      kind("device"),
    );
    assert.equal(calls.at(-1).operation, operation);
    assert.equal(
      calls.some((call) => call.operation === "startTeleCapture"),
      false,
    );
  }
});

test("returned nonzero error codes and mismatched quick-set echoes also stop configuration", async () => {
  for (const data of [{ code: -3 }, { infoId: "different" }]) {
    const { client, calls } = transport({
      responseOverride: (operation, current) =>
        operation === "setQuickSet" ? data : current,
    });
    await assert.rejects(
      executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      ),
      kind("device"),
    );
    assert.equal(calls.at(-1).operation, "setQuickSet");
  }
});

test("capture warnings never trigger automatic force or continue commands", async () => {
  for (const code of [-11513, -11514, -99999]) {
    const { client, calls } = transport({
      responseOverride: (operation, data) =>
        operation === "startTeleCapture" ? { code } : data,
    });
    await assert.rejects(
      executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      ),
      (error) => error.kind === "device" && error.code === code,
    );
    assert.equal(calls.at(-1).operation, "startTeleCapture");
    assert.equal(
      calls.some((call) => call.operation === "continueCapture"),
      false,
    );
    assert.equal(
      calls.some((call) => call.values.forceStart === true),
      false,
    );
  }
});

test("capture plan cannot continue across a connection generation change", async () => {
  const { client, calls } = transport({
    responseOverride: (operation, data, _values, current) => {
      if (operation === "setQuickSet") current.state.session.generation++;
      return data;
    },
  });
  await assert.rejects(
    executeCurrentCapture(client, getCurrentProfile(4), catalog(), settings()),
    kind("transport"),
  );
  assert.equal(calls.at(-1).operation, "setQuickSet");
});

test("two capture submissions cannot interleave on the same transport", async () => {
  const { client } = transport();
  const first = executeCurrentCapture(
    client,
    getCurrentProfile(4),
    catalog(),
    settings(),
  );
  await assert.rejects(
    executeCurrentCapture(client, getCurrentProfile(4), catalog(), settings()),
    kind("busy"),
  );
  await first;
  assert.equal(
    (
      await executeCurrentCapture(
        client,
        getCurrentProfile(4),
        catalog(),
        settings(),
      )
    ).status,
    "awaiting-progress",
  );
});

test("observed runtime mode adaptation is pure and preserves every nonmode identifier bit", () => {
  const controls = resolveCurrentCaptureControls(
    getCurrentProfile(4),
    catalog(),
    settings(),
  );
  controls.exposure.paramId = id(0, 1, 1, "4294967295");
  for (const mode of [11, 13]) {
    const adapted = currentCaptureControlsForObservedMode(controls, mode);
    for (const key of ["exposure", "gain", "frameCount"]) {
      assert.equal(
        decodeCurrentParamId(adapted[key].paramId).shootingMode,
        mode,
      );
      assert.equal(
        BigInt(adapted[key].paramId) & ((1n << 56n) - 1n),
        BigInt(controls[key].paramId) & ((1n << 56n) - 1n),
      );
    }
  }
  assert.equal(decodeCurrentParamId(controls.exposure.paramId).shootingMode, 2);
  assert.throws(
    () => currentCaptureControlsForObservedMode(controls, 8),
    kind("unsupported"),
  );
});
