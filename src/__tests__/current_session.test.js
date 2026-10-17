#!/usr/bin/env node
// Offline contract tests. No sockets, HTTP requests, or telescope commands.
// Literal goldens: dwarfAlp b5a56f0 tests/test_protocol_golden.py.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CurrentCommands,
  CurrentDwarfSchema,
  CurrentNotifications,
  CurrentProtocolError,
  assertCurrentSuccess,
  createCurrentPacket,
  currentMessageType,
  decodeCurrentMessage,
  decodeCurrentPacket,
  degreesFromRaHours,
  encodeCurrentMessage,
  getCurrentProfile,
} from "../../dist/src/current_protocol.js";
import { CurrentSession } from "../../dist/src/current_session.js";

const bytes = (hex) => new Uint8Array(Buffer.from(hex, "hex"));
const hex = (value) => Buffer.from(value).toString("hex");
const kind = (expected) => (error) =>
  error instanceof CurrentProtocolError && error.kind === expected;

function packet(moduleId, cmd, type, schemaName, values = {}) {
  return CurrentDwarfSchema.WsPacket.encode({
    majorVersion: 1,
    minorVersion: 20,
    deviceId: 4,
    moduleId,
    cmd,
    type,
    data: schemaName
      ? encodeCurrentMessage(schemaName, values)
      : new Uint8Array(),
    clientId: getCurrentProfile(4).clientId,
  }).finish();
}

function response(operation, values = {}) {
  const [moduleId, cmd, , schemaName] = CurrentCommands[operation];
  return packet(moduleId, cmd, 1, schemaName, values);
}

function notification(cmd, schemaName, values = {}, moduleId = 9, type = 2) {
  return packet(moduleId, cmd, type, schemaName, values);
}

function harness(t, hardwareId = 4) {
  const session = new CurrentSession(getCurrentProfile(hardwareId));
  const sent = [];
  session.open((value) => sent.push(value));
  t.after(() => session.close("Test cleanup"));
  return { session, sent };
}

test("joystick packet validates canonical degree/vector fields", () => {
  const packet = decodeCurrentPacket(
    createCurrentPacket(getCurrentProfile(4), "joystick", {
      vectorAngle: 45,
      vectorLength: 0.5,
    }),
  );
  assert.equal(hex(packet.rawData), "09000000000080464011000000000000e03f");
  assert.throws(
    () =>
      createCurrentPacket(getCurrentProfile(4), "joystick", {
        vectorAngle: 45,
        vectorLength: 2,
      }),
    kind("invalid-parameter"),
  );
  assert.throws(
    () =>
      createCurrentPacket(getCurrentProfile(4), "focusStep", { direction: 2 }),
    kind("invalid-parameter"),
  );
});

test("parameter echoes match exact namespaces and values, not just notification IDs", async (t) => {
  const { session } = harness(t);
  const exposureId = "144396663052566529";
  const gainId = "144396663052566530";
  let exposureDone = false;
  const exposure = session
    .request("setExposure", { paramId: exposureId, mode: 1, value: 120 })
    .then(() => {
      exposureDone = true;
    });
  const gain = session.request("setGain", {
    paramId: gainId,
    mode: 1,
    value: 60,
  });
  session.receive(
    notification(
      15264,
      "notify.GeneralIntParam",
      { paramId: exposureId, mode: 1, value: 141 },
      15,
    ),
  );
  await Promise.resolve();
  assert.equal(exposureDone, false);
  session.receive(
    notification(
      15264,
      "notify.GeneralIntParam",
      { paramId: gainId, mode: 1, value: 60 },
      9,
    ),
  );
  assert.equal((await gain).data.paramId, gainId);
  assert.equal(exposureDone, false);
  session.receive(
    notification(
      15264,
      "notify.GeneralIntParam",
      { paramId: exposureId, mode: 1, value: 120 },
      15,
    ),
  );
  await exposure;
  assert.equal(exposureDone, true);
  assert.equal(session.state.parameters.get(exposureId).value, 120);
});

test("canonical registry entries all resolve to real schemas", () => {
  for (const descriptor of Object.values(CurrentCommands)) {
    assert.ok(currentMessageType(descriptor[2]));
    assert.ok(currentMessageType(descriptor[3]));
  }
  for (const [cmd, name] of Object.entries(CurrentNotifications)) {
    assert.ok(currentMessageType(cmd === "15261" ? name : `notify.${name}`));
  }
});

test("Mini and DWARF 3 separate hardware/client identity from shared wire identity", () => {
  for (const [hardwareId, model, clientPrefix] of [
    [2, "dwarf3", "0000DAF3"],
    [4, "dwarfmini", "0000DAF4"],
  ]) {
    const profile = getCurrentProfile(hardwareId);
    assert.equal(profile.model, model);
    assert.equal(profile.hardwareId, hardwareId);
    assert.equal(profile.wireDeviceId, 4);
    assert.ok(profile.clientId.startsWith(clientPrefix));
    assert.equal(Object.isFrozen(profile), true);
    const envelope = CurrentDwarfSchema.WsPacket.decode(
      createCurrentPacket(profile, "enterCamera", {
        clientParam: { encodeType: 1 },
      }),
    );
    assert.equal(envelope.majorVersion, 1);
    assert.equal(envelope.minorVersion, 20);
    assert.equal(envelope.deviceId, 4);
    assert.equal(envelope.clientId, profile.clientId);
    assert.equal(envelope.type, 0);
    assert.equal(hex(envelope.data), "1a020801");
  }
  assert.deepEqual(
    getCurrentProfile(4).scienceFilters.map((f) => f.index),
    [1, 2],
  );
  assert.deepEqual(
    getCurrentProfile(2).scienceFilters.map((f) => f.index),
    [0, 1, 2],
  );
  assert.throws(() => getCurrentProfile(99), kind("unsupported"));
});

test("decodes the independent canonical enter-camera envelope golden", () => {
  const golden = "080110141804200e289480013a041a020801420474657374";
  const decoded = decodeCurrentPacket(bytes(golden));
  assert.equal(decoded.moduleId, 14);
  assert.equal(decoded.cmd, 16404);
  assert.equal(decoded.type, 0);
  assert.deepEqual(decoded.data, { clientParam: { encodeType: 1 } });
  assert.equal(
    hex(
      createCurrentPacket(
        { ...getCurrentProfile(4), clientId: "test" },
        "enterCamera",
        { clientParam: { encodeType: 1 } },
      ),
    ),
    golden,
  );
});

test("matches exact canonical payload goldens and retains uint64 identifiers", () => {
  assert.equal(
    hex(encodeCurrentMessage("ReqSwitchShootingMode", { mode: 8 })),
    "0808",
  );
  assert.equal(hex(encodeCurrentMessage("ReqPhoto")), "");
  assert.equal(hex(encodeCurrentMessage("ReqGetUserInfinityPos")), "");
  assert.equal(
    hex(
      encodeCurrentMessage("param.ReqSetExposure", {
        paramId: "144396663052566529",
        mode: 1,
        value: 120,
      }),
    ),
    "08818080808080c0800210011878",
  );
  assert.deepEqual(
    decodeCurrentMessage(
      "param.ReqSetExposure",
      bytes("08818080808080c0800210011878"),
    ),
    { paramId: "144396663052566529", mode: 1, value: 120 },
  );
  assert.equal(
    hex(
      encodeCurrentMessage("param.ReqSetGeneralIntParam", {
        paramId: "144678138029277200",
        value: 2,
      }),
    ),
    "089080808080808081021002",
  );
  assert.equal(
    hex(
      encodeCurrentMessage("ReqMotorServiceJoystick", {
        vectorAngle: 45,
        vectorLength: 0.5,
      }),
    ),
    "09000000000080464011000000000000e03f",
  );
  assert.deepEqual(
    decodeCurrentMessage("notify.CmosTemperature", bytes("08001001")),
    { temperature: 0, cameraType: 1, _temperature: "temperature" },
  );
  assert.deepEqual(
    decodeCurrentMessage("notify.CmosTemperature", new Uint8Array()),
    {},
  );
});

test("canonical oneof golden and EQ state do not use legacy inferred fields", () => {
  const oneClick = decodeCurrentMessage(
    "notify.OneClickGotoState",
    bytes("220a08011206437573746f6d"),
  );
  assert.deepEqual(oneClick, {
    astroTrackingState: { state: 1, targetName: "Custom" },
    currentState: "astroTrackingState",
  });
  assert.deepEqual(
    decodeCurrentMessage("notify.EqSolvingState", bytes("0801")),
    { state: 1 },
  );
  assert.equal(
    hex(encodeCurrentMessage("notify.LongExpPhotoProgress", { totalTime: 1 })),
    "09000000000000f03f",
  );
});

test("rejects unknown root and nested fields, invalid scalar types and lossy IDs", () => {
  const invalid = [
    ["ReqPhoto", { x: 100 }],
    ["ReqEnterCamera", { clientParam: { encodeType: 1, invented: true } }],
    ["ReqSwitchShootingMode", { mode: "not-a-number" }],
    ["ReqSwitchShootingMode", { mode: 1.5 }],
    ["ReqSwitchShootingMode", { mode: Infinity }],
    [
      "notify.OneClickGotoState",
      { astroGotoState: { state: 1 }, astroTrackingState: { state: 1 } },
    ],
    [
      "param.ReqSetExposure",
      { paramId: Number("144396663052566529"), mode: 1, value: 120 },
    ],
    [
      "param.ReqSetExposure",
      { paramId: "18446744073709551616", mode: 1, value: 120 },
    ],
    ["param.ReqSetExposure", { paramId: "-1", mode: 1, value: 120 }],
    ["param.ReqSetExposure", { paramId: "1.5", mode: 1, value: 120 }],
  ];
  for (const [name, value] of invalid) {
    assert.throws(
      () => encodeCurrentMessage(name, value),
      kind("invalid-parameter"),
      JSON.stringify(value),
    );
  }
  const max = "18446744073709551615";
  const encoded = encodeCurrentMessage("param.ReqSetGeneralIntParam", {
    paramId: max,
    value: 1,
  });
  assert.equal(
    decodeCurrentMessage("param.ReqSetGeneralIntParam", encoded).paramId,
    max,
  );
});

test("signed firmware error codes remain signed and never imply success", () => {
  const errorPacket = decodeCurrentPacket(
    response("startTeleCapture", { code: -11514 }),
  );
  assert.equal(errorPacket.data.code, -11514);
  assert.throws(
    () => assertCurrentSuccess(errorPacket),
    (error) =>
      kind("device")(error) && error.code === -11514 && error.command === 11005,
  );
  assert.doesNotThrow(() =>
    assertCurrentSuccess(decodeCurrentPacket(response("startTeleCapture"))),
  );
});

test("explicit RA-hours conversion neither guesses nor accepts out-of-range coordinates", () => {
  assert.equal(degreesFromRaHours(12), 180);
  assert.equal(degreesFromRaHours(0), 0);
  for (const value of [-1, 24, NaN, Infinity]) {
    assert.throws(() => degreesFromRaHours(value), kind("invalid-parameter"));
  }
});

test("requests require transport and correlate by both module and command", async (t) => {
  const disconnected = new CurrentSession(getCurrentProfile(4));
  await assert.rejects(
    disconnected.request("getDeviceState"),
    kind("transport"),
  );
  const { session, sent } = harness(t);
  const pending = session.request("getDeviceState");
  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  assert.equal(sent.length, 1);
  session.receive(packet(3, 16405, 1, "ComResponse"));
  await Promise.resolve();
  assert.equal(settled, false);
  await assert.rejects(session.request("getDeviceState"), kind("busy"));
  session.receive(response("getDeviceState"));
  assert.equal((await pending).cmd, 16405);
});

test("different command keys can complete out of order", async (t) => {
  const { session } = harness(t);
  const first = session.request("getDeviceState");
  const second = session.request("enterCamera", {
    clientParam: { encodeType: 1 },
  });
  session.receive(response("enterCamera", { shootingModeId: 2 }));
  assert.equal((await second).cmd, 16404);
  session.receive(response("getDeviceState"));
  assert.equal((await first).cmd, 16405);
});

test("request frames cannot settle their own pending requests", async (t) => {
  const { session, sent } = harness(t);
  const pending = session.request("enterCamera");
  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  session.receive(sent[0]);
  await Promise.resolve();
  assert.equal(settled, false);
  session.receive(response("enterCamera"));
  await pending;
});

test("device rejection rejects the matching request without changing operation state", async (t) => {
  const { session } = harness(t);
  const pending = session.request("startTeleCapture", { irIndex: 1 });
  const rejection = assert.rejects(
    pending,
    (error) => kind("device")(error) && error.code === -11514,
  );
  session.receive(response("startTeleCapture", { code: -11514 }));
  await rejection;
  assert.equal(session.state.notifications.size, 0);
  assert.equal(session.state.phase, "transport-open");
});

test("pending registration precedes transport send for synchronous replies", async (t) => {
  const session = new CurrentSession(getCurrentProfile(4));
  t.after(() => session.close());
  session.open(() => session.receive(response("enterCamera")));
  assert.equal((await session.request("enterCamera")).cmd, 16404);
});

test("timeouts quarantine the same key even after a late response, until reconnect", async (t) => {
  const { session } = harness(t);
  await assert.rejects(session.request("enterCamera", {}, 10), kind("timeout"));
  session.receive(response("enterCamera"));
  await assert.rejects(session.request("enterCamera"), kind("timeout"));
  session.open(() => {});
  const retry = session.request("enterCamera");
  session.receive(response("enterCamera"));
  assert.equal((await retry).cmd, 16404);
});

test("ordinary notifications are state, not generic request acknowledgements", async (t) => {
  const { session } = harness(t);
  const pending = session.request("astroAutoFocus", { mode: 1 }, 10);
  const rejection = assert.rejects(pending, kind("timeout"));
  session.receive(
    notification(15278, "notify.AstroAutoFocusState", { state: 3 }),
  );
  assert.equal(session.state.notifications.get(15278).data.state, 3);
  await rejection;
});

test("command ACKs do not optimistically complete capture or autofocus", async (t) => {
  const { session } = harness(t);
  session.receive(notification(15208, "notify.CaptureRawState", { state: 1 }));
  const stopping = session.request("stopTeleCapture");
  session.receive(response("stopTeleCapture"));
  await stopping;
  assert.equal(session.state.notifications.get(15208).data.state, 1);
  session.receive(notification(15208, "notify.CaptureRawState", { state: 3 }));
  assert.equal(session.state.notifications.get(15208).data.state, 3);
  const focus = session.request("astroAutoFocus", { mode: 1 });
  session.receive(response("astroAutoFocus"));
  await focus;
  assert.equal(session.state.notifications.has(15278), false);
});

for (const moduleId of [4, 9]) {
  for (const type of [2, 3]) {
    test(`ownership accepts evidenced alternate 15223 from module ${moduleId}, type ${type}`, async (t) => {
      const { session } = harness(t);
      const pending = session.request("setMasterLock", { lock: true });
      session.receive(
        notification(
          15223,
          "notify.HostSlaveMode",
          { mode: 0, lock: true },
          moduleId,
          type,
        ),
      );
      assert.equal((await pending).cmd, 15223);
      assert.equal(session.state.ownership, "control");
      assert.equal(session.state.phase, "transport-open");
    });
  }
}

test("ownership command ACK alone does not claim control", async (t) => {
  const { session } = harness(t);
  const pending = session.request("setMasterLock", { lock: true });
  session.receive(response("setMasterLock"));
  await pending;
  assert.equal(session.state.ownership, "unknown");
  session.receive(
    notification(15223, "notify.HostSlaveMode", { mode: 1, lock: true }),
  );
  assert.equal(session.state.ownership, "slave");
  session.receive(
    notification(15223, "notify.HostSlaveMode", { mode: 0, lock: false }),
  );
  assert.notEqual(session.state.ownership, "control");
});

test("device readiness requires meaningful state, not an empty ACK", async (t) => {
  const { session } = harness(t);
  const empty = session.request("getDeviceState");
  session.receive(response("getDeviceState"));
  await empty;
  assert.equal(session.state.phase, "transport-open");
  session.receive(response("getDeviceState", { deviceStateInfo: {} }));
  assert.equal(session.state.phase, "transport-open");
  session.receive(
    response("getDeviceState", {
      code: -1,
      deviceStateInfo: { batteryInfo: { percentage: 70 } },
    }),
  );
  assert.equal(session.state.phase, "transport-open");
  session.receive(
    response("getDeviceState", {
      deviceStateInfo: { batteryInfo: { percentage: 0 } },
      connectionStateInfo: { hostSlaveMode: { mode: 0, lock: true } },
    }),
  );
  assert.equal(session.state.phase, "ready");
  // Battery percentage is non-optional: an existing battery message with its
  // default scalar omitted means zero, unlike a missing battery message.
  assert.equal(
    session.state.snapshot.deviceStateInfo.batteryInfo.percentage ?? 0,
    0,
  );
  assert.equal(session.state.ownership, "control");
});

test("parameter IDs remain exact and module-15 notifications are supported", (t) => {
  const { session } = harness(t);
  const paramId = "144396663052566529";
  session.receive(
    notification(
      15264,
      "notify.GeneralIntParam",
      { paramId, mode: 1, value: 120 },
      15,
    ),
  );
  assert.equal(session.state.parameters.size, 1);
  assert.deepEqual(session.state.parameters.get(paramId), {
    paramId,
    mode: 1,
    value: 120,
  });
});

test("close rejects pending work and clears cached state and ownership", async (t) => {
  const { session } = harness(t);
  session.receive(notification(15223, "notify.HostSlaveMode", { lock: true }));
  session.receive(
    notification(
      15264,
      "notify.GeneralIntParam",
      { paramId: "144396663052566529", value: 120 },
      15,
    ),
  );
  session.receive(
    response("getDeviceState", {
      deviceStateInfo: { batteryInfo: { percentage: 70 } },
    }),
  );
  const previousGeneration = session.state.generation;
  const pending = session.request("enterCamera");
  const rejected = assert.rejects(pending, kind("transport"));
  session.close();
  await rejected;
  assert.equal(session.state.phase, "disconnected");
  assert.equal(session.state.snapshot, undefined);
  assert.equal(session.state.ownership, "unknown");
  assert.equal(session.state.notifications.size, 0);
  assert.equal(session.state.parameters.size, 0);
  assert.ok(session.state.generation > previousGeneration);
  session.receive(notification(15223, "notify.HostSlaveMode", { lock: true }));
  assert.equal(session.state.ownership, "unknown");
});

test("corrupt, unknown and wrong-module packets cannot manufacture state", (t) => {
  const { session } = harness(t);
  assert.throws(() => session.receive(bytes("ff")), kind("decode"));
  const corruptPayload = CurrentDwarfSchema.WsPacket.encode({
    majorVersion: 1,
    minorVersion: 20,
    deviceId: 4,
    moduleId: 9,
    cmd: 15201,
    type: 2,
    data: bytes("08ff"),
  }).finish();
  assert.throws(() => session.receive(corruptPayload), kind("decode"));
  const unknown = session.receive(packet(9, 15999, 2));
  assert.equal(unknown.known, false);
  const wrongModule = session.receive(
    notification(15223, "notify.HostSlaveMode", { lock: true }, 1),
  );
  assert.equal(wrongModule.known, false);
  assert.equal(session.state.ownership, "unknown");
  assert.equal(session.state.notifications.size, 0);
  assert.equal(session.state.phase, "transport-open");
});

test("transport send failures reject pending requests without optimistic state", async (t) => {
  const session = new CurrentSession(getCurrentProfile(4));
  t.after(() => session.close());
  session.open(() => {
    throw new Error("mock transport failure");
  });
  await assert.rejects(session.request("enterCamera"), kind("transport"));
  await assert.rejects(session.request("enterCamera"), kind("transport"));
  assert.equal(session.state.phase, "transport-open");
  assert.equal(session.state.snapshot, undefined);
});

test("capture acknowledgements retain authoritative effective shooting parameters", () => {
  for (const operation of [
    "startTeleCapture",
    "startWideCapture",
    "startTeleMosaic",
  ]) {
    // Literal ResAstroShooting: code omitted (zero), exp_name=10, gain=80,
    // resolution=0 and filter_type=1. Optional zero must retain presence.
    const [moduleId, cmd] = CurrentCommands[operation];
    const frame = CurrentDwarfSchema.WsPacket.encode({
      majorVersion: 1,
      moduleId,
      cmd,
      type: 1,
      data: bytes("12023130185020002801"),
    }).finish();
    assert.deepEqual(decodeCurrentPacket(frame).data, {
      expName: "10",
      _expName: "expName",
      gain: 80,
      _gain: "gain",
      resolution: 0,
      _resolution: "resolution",
      filterType: 1,
      _filterType: "filterType",
    });
  }
});

test("schedule bindings preserve exact timestamps and decode conflict errors at field three", async (t) => {
  const { session, sent } = harness(t);
  const pending = session.request("syncShootingSchedule", {
    shootingSchedule: {
      scheduleId: "schedule-A",
      deviceId: 4,
      startTime: "9007199254740993",
      endTime: "9007199254741993",
      shootingTasks: [{ scheduleTaskId: "task-A", params: '{"target":"M31"}' }],
    },
  });
  const request = decodeCurrentPacket(sent[0]);
  assert.equal(request.moduleId, 13);
  assert.equal(request.cmd, 16100);
  assert.equal(request.data.shootingSchedule.startTime, "9007199254740993");
  const rejection = assert.rejects(
    pending,
    (error) => kind("device")(error) && error.code === -16302,
  );
  session.receive(
    response("syncShootingSchedule", {
      code: -16302,
      timeConflictScheduleIds: ["other-device-schedule"],
      canReplace: true,
    }),
  );
  await rejection;
  const list = session.request("getAllShootingSchedule");
  session.receive(
    response("getAllShootingSchedule", {
      shootingSchedule: [{ scheduleId: "schedule-A" }],
    }),
  );
  assert.equal((await list).data.shootingSchedule[0].scheduleId, "schedule-A");
});

test("mosaic progress retains panel identity and never settles an unrelated capture", async (t) => {
  const { session } = harness(t);
  const pending = session.request("startTeleMosaic", {
    horizontalScale: 140,
    verticalScale: 120,
    rotation: -1,
    irIndex: 1,
  });
  let complete = false;
  void pending.then(() => {
    complete = true;
  });
  session.receive(
    notification(15263, "notify.ProgressCaptureMosaic", {
      fovId: 2,
      fovTotal: 4,
      currentCount: 12,
    }),
  );
  await Promise.resolve();
  assert.equal(complete, false);
  assert.equal(session.state.notifications.get(15263).data.fovId, 2);
  session.receive(response("startTeleMosaic"));
  await pending;
});

test("float and boolean parameter echoes correlate by exact ID and wire value", async (t) => {
  const { session } = harness(t);
  for (const [operation, cmd, name, value] of [
    ["setFloatParameter", 15265, "notify.GeneralFloatParam", 0.1],
    ["setBooleanParameter", 15266, "notify.GeneralBoolParams", false],
  ]) {
    const paramId = "144396663052566540";
    const pending = session.request(operation, { paramId, value });
    session.receive(notification(cmd, name, { paramId, value }, 15));
    assert.equal((await pending).cmd, cmd);
    assert.ok(session.state.parameters.has(paramId));
  }
  await assert.rejects(
    session.request("getDeviceState", {}, NaN),
    kind("invalid-parameter"),
  );
});
