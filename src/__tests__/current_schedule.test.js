import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildCurrentTimedSchedule,
  createCurrentTimedSchedule,
  submitCurrentTimedSchedule,
  supportsCurrentNativeSchedules,
} from "../../dist/src/current_schedule.js";
import { normalizeCurrentCameraCatalog } from "../../dist/src/current_catalog.js";
import {
  CurrentProtocolError,
  createCurrentPacket,
  decodeCurrentPacket,
  getCurrentProfile,
} from "../../dist/src/current_protocol.js";

const now = 1_800_000_000;
const identity = {
  hardwareId: 4,
  macAddress: "00:11:22:33:44:55",
  protocolVersion: { majorVersion: 2, minorVersion: 6 },
};
const catalog = normalizeCurrentCameraCatalog(
  {
    code: 0,
    data: {
      cameraParams: [
        {
          cameraId: 0,
          specialParams: {
            exp: {
              paramId: "144396663052566529",
              values: [{ name: "1", value: 120 }],
            },
            gain: { paramId: "144396663052566530", values: [60] },
          },
          generalParams: [],
        },
      ],
    },
  },
  2,
);
const input = (overrides = {}) => ({
  id: "plan-1",
  name: "Offline fixture",
  latitude: 52,
  longitude: 13,
  timezone: "Europe/Berlin",
  autofocus: false,
  tasks: [
    {
      id: "task-1",
      target: "Fixture target",
      rightAscensionHours: 5.5,
      declinationDegrees: -2.5,
      startTimeSeconds: now + 3600,
      endTimeSeconds: now + 4200,
      exposureSeconds: 1,
      gain: 60,
      filterIndex: 1,
    },
  ],
  ...overrides,
});
const kind = (expected) => (error) =>
  error instanceof CurrentProtocolError && error.kind === expected;

test("HTTP protocol gates are model-specific and independent of firmware/WS envelope", () => {
  assert.equal(
    supportsCurrentNativeSchedules(2, { majorVersion: 1, minorVersion: 8 }),
    false,
  );
  assert.equal(
    supportsCurrentNativeSchedules(4, { majorVersion: 1, minorVersion: 8 }),
    true,
  );
  assert.equal(
    supportsCurrentNativeSchedules(2, { majorVersion: 2, minorVersion: 6 }),
    true,
  );
  assert.equal(supportsCurrentNativeSchedules(4, undefined), false);
  assert.equal(
    supportsCurrentNativeSchedules(99, { majorVersion: 2, minorVersion: 6 }),
    false,
  );
});

test("builder creates pending-shoot state1 and preserves UNIX seconds on the wire", () => {
  const schedule = buildCurrentTimedSchedule(identity, catalog, input(), now);
  assert.equal(schedule.state, 1);
  assert.equal(schedule.startTime, String(now + 3600));
  assert.equal(schedule.createdTime, String(now));
  assert.equal(schedule.scheduleTime, String(now));
  assert.equal(schedule.shootingTasks[0].createdTime, undefined);
  const task = JSON.parse(schedule.shootingTasks[0].params);
  assert.equal(task.shutterIndex, 120);
  assert.equal(task.gainIndex, 60);
  assert.equal(task.ra, 5.5);
  assert.equal(task.startTime, now + 3600);
  assert.equal(task.count, 0);
  assert.equal(JSON.parse(schedule.params).calibrationMode, 0);
  const packet = decodeCurrentPacket(
    createCurrentPacket(getCurrentProfile(4), "syncShootingSchedule", {
      shootingSchedule: schedule,
    }),
  );
  assert.equal(packet.data.shootingSchedule.state, 1);
});

test("invalid units, short windows, coordinates, duplicate IDs and unsupported filters fail before transport", () => {
  assert.throws(
    () =>
      buildCurrentTimedSchedule(
        identity,
        { ...catalog, modeId: 1 },
        input(),
        now,
      ),
    kind("invalid-parameter"),
  );
  const base = input();
  for (const change of [
    { startTimeSeconds: now * 1000 },
    { endTimeSeconds: now + 4199 },
    { rightAscensionHours: 24 },
    { declinationDegrees: 91 },
    { filterIndex: 0 },
    { gain: 99 },
    { id: "plan-1" },
  ]) {
    assert.throws(() =>
      buildCurrentTimedSchedule(
        identity,
        catalog,
        input({ tasks: [{ ...base.tasks[0], ...change }] }),
        now,
      ),
    );
  }
  assert.throws(
    () =>
      buildCurrentTimedSchedule(
        identity,
        catalog,
        input({ tasks: [base.tasks[0], { ...base.tasks[0], id: "task-2" }] }),
        now,
      ),
    kind("invalid-parameter"),
  );
});

function transport(options = {}) {
  const calls = [];
  let stored;
  const client = {
    profile: getCurrentProfile(options.hardwareId ?? 4),
    state: {
      session: {
        phase: "ready",
        ownership: "control",
        generation: 1,
        peerProtocolVersion: { majorVersion: 1, minorVersion: 8 },
      },
    },
    async request(operation, values) {
      calls.push(operation);
      if (options.failClock && operation === "setTime")
        throw new CurrentProtocolError("device", "Clock rejected", -1);
      if (operation === "syncShootingSchedule")
        stored = structuredClone(values.shootingSchedule);
      if (options.reconnect && operation === "getAllShootingSchedule")
        client.state.session.generation++;
      let rows = stored ? [stored] : [];
      if (stored && options.hideReadback) rows = [];
      if (stored && options.corrupt) rows[0].macAddress = "aa:bb:cc:dd:ee:ff";
      if (stored && options.reorderJson) {
        const parsed = JSON.parse(rows[0].params);
        rows[0].params = JSON.stringify(
          Object.fromEntries(Object.entries(parsed).reverse()),
        );
      }
      return {
        known: true,
        moduleId: 13,
        cmd: 16102,
        data:
          operation === "syncShootingSchedule"
            ? { timeConflictScheduleIds: options.conflict ? ["other"] : [] }
            : operation === "getShootingScheduleById"
              ? { shootingSchedule: rows[0], code: options.lookupCode ?? 0 }
              : { shootingSchedule: rows },
      };
    },
  };
  return { client, calls };
}

test("submission confirms queued plan by readback rather than ACK; JSON key order is irrelevant", async () => {
  const { client, calls } = transport({ reorderJson: true });
  const result = await submitCurrentTimedSchedule(
    client,
    identity,
    catalog,
    input(),
    () => now,
  );
  assert.equal(result.status, "queued");
  assert.deepEqual(calls, [
    "getAllShootingSchedule",
    "setTime",
    "setTimezone",
    "syncShootingSchedule",
    "getAllShootingSchedule",
  ]);
});

test("missing or different-device readback never claims successful queueing", async () => {
  for (const option of [{ hideReadback: true }, { corrupt: true }]) {
    const { client } = transport(option);
    await assert.rejects(
      submitCurrentTimedSchedule(client, identity, catalog, input(), () => now),
      kind("device"),
    );
  }
});

test("unknown HTTP capability or reconnection prevents any schedule write", async () => {
  const a = transport();
  await assert.rejects(
    submitCurrentTimedSchedule(
      a.client,
      { ...identity, protocolVersion: undefined },
      catalog,
      input(),
      () => now,
    ),
    kind("unsupported"),
  );
  assert.deepEqual(a.calls, []);
  const b = transport({ reconnect: true });
  await assert.rejects(
    submitCurrentTimedSchedule(b.client, identity, catalog, input(), () => now),
    kind("transport"),
  );
  assert.deepEqual(b.calls, ["getAllShootingSchedule"]);
});

test("conflict never triggers replacement or retry", async () => {
  const { client, calls } = transport({ conflict: true });
  await assert.rejects(
    submitCurrentTimedSchedule(client, identity, catalog, input(), () => now),
    kind("busy"),
  );
  assert.deepEqual(calls, [
    "getAllShootingSchedule",
    "setTime",
    "setTimezone",
    "syncShootingSchedule",
  ]);
});

test("scheduled preparation flags require the HTTP configuration's 2.5 feature gate", async () => {
  const { client, calls } = transport();
  await assert.rejects(
    submitCurrentTimedSchedule(
      client,
      { ...identity, protocolVersion: { majorVersion: 2, minorVersion: 4 } },
      catalog,
      input({ skipCalibration: true }),
      () => now,
    ),
    kind("unsupported"),
  );
  assert.deepEqual(calls, []);
});

test("a start that expires during list preparation is never written", async () => {
  const { client, calls } = transport();
  let clock = now;
  const request = client.request;
  client.request = async (...args) => {
    const response = await request(...args);
    clock = now + 3601;
    return response;
  };
  await assert.rejects(
    submitCurrentTimedSchedule(client, identity, catalog, input(), () => clock),
    kind("invalid-parameter"),
  );
  assert.deepEqual(calls, ["getAllShootingSchedule"]);
});

test("fresh-ID creation verifies by ID without assuming a silent list is empty", async () => {
  const { client, calls } = transport();
  const result = await createCurrentTimedSchedule(
    client,
    identity,
    catalog,
    input(),
    () => now,
  );
  assert.equal(result.status, "queued");
  assert.notEqual(result.schedule.scheduleId, "plan-1");
  assert.notEqual(result.schedule.shootingTasks[0].scheduleTaskId, "task-1");
  assert.deepEqual(calls, [
    "setTime",
    "setTimezone",
    "syncShootingSchedule",
    "getShootingScheduleById",
  ]);
});

test("a database error in per-ID readback is never accepted as a queued plan", async () => {
  const { client, calls } = transport({ lookupCode: -16305 });
  await assert.rejects(
    createCurrentTimedSchedule(client, identity, catalog, input(), () => now),
    kind("device"),
  );
  assert.deepEqual(calls, [
    "setTime",
    "setTimezone",
    "syncShootingSchedule",
    "getShootingScheduleById",
  ]);
});

test("site timezone controls clock offset and initialization precedes sync", async () => {
  const { client, calls } = transport();
  const original = client.request;
  let clockValues;
  client.request = async (operation, values) => {
    if (operation === "setTime") clockValues = values;
    return original(operation, values);
  };
  await createCurrentTimedSchedule(
    client,
    identity,
    catalog,
    input({ timezone: "Asia/Kathmandu" }),
    () => now,
  );
  assert.deepEqual(clockValues, {
    timestamp: String(now),
    timezoneOffset: 5.75,
  });
  assert.equal(
    calls.indexOf("setTime") < calls.indexOf("syncShootingSchedule"),
    true,
  );
});

test("failed clock preparation never submits a job", async () => {
  const { client, calls } = transport({ failClock: true });
  await assert.rejects(
    createCurrentTimedSchedule(client, identity, catalog, input(), () => now),
    kind("device"),
  );
  assert.deepEqual(calls, ["setTime"]);
});

test("invalid site timezone, sub-minute windows and starts beyond twelve hours fail before writes", async () => {
  for (const change of [
    { timezone: "invalid/site" },
    {
      tasks: [
        {
          ...input().tasks[0],
          startTimeSeconds: now + 3601,
          endTimeSeconds: now + 4201,
        },
      ],
    },
    {
      tasks: [
        {
          ...input().tasks[0],
          startTimeSeconds: now + 3600,
          endTimeSeconds: now + 4201,
        },
      ],
    },
    {
      tasks: [
        {
          ...input().tasks[0],
          startTimeSeconds: now + 13 * 3600,
          endTimeSeconds: now + 13 * 3600 + 600,
        },
      ],
    },
  ]) {
    const { client, calls } = transport();
    await assert.rejects(
      createCurrentTimedSchedule(
        client,
        identity,
        catalog,
        input(change),
        () => now,
      ),
      kind("invalid-parameter"),
    );
    assert.deepEqual(calls, []);
  }
});
