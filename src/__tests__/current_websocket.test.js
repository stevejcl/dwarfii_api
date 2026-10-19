// Synthetic in-memory transport lifecycle tests. No socket or telescope access.
// Wire bytes are generated from canonical fixtures here; literal golden capture
// fidelity is covered separately in current_schema/current_session tests.
import assert from "node:assert/strict";
import { test } from "node:test";
import { CurrentWebSocketHandler } from "../../dist/src/current_websocket.js";
import {
  CurrentDwarfSchema,
  CurrentCommands,
  encodeCurrentMessage,
  getCurrentProfile,
} from "../../dist/src/current_protocol.js";

class FakeSocket {
  readyState = 0;
  binaryType = "blob";
  handlers = new Map();
  sent = [];
  closes = [];
  constructor(url) {
    this.url = url;
  }
  addEventListener(name, callback) {
    if (!this.handlers.has(name)) this.handlers.set(name, new Set());
    this.handlers.get(name).add(callback);
  }
  removeEventListener(name, callback) {
    this.handlers.get(name)?.delete(callback);
  }
  emit(name, event = {}) {
    if (name === "open") this.readyState = 1;
    if (name === "close") this.readyState = 3;
    for (const callback of [...(this.handlers.get(name) ?? [])])
      callback(event);
  }
  send(data) {
    if (this.readyState !== 1) throw new Error("Fake socket not open");
    this.sent.push(typeof data === "string" ? data : new Uint8Array(data));
  }
  close(code, reason) {
    this.closes.push({ code, reason });
    this.readyState = 3;
  }
  message(data) {
    this.emit("message", { data });
  }
}

const flush = async () => {
  for (let index = 0; index < 12; index++) await Promise.resolve();
};
function wire(moduleId, cmd, type, name, values = {}) {
  return CurrentDwarfSchema.WsPacket.encode({
    majorVersion: 1,
    minorVersion: 20,
    deviceId: 4,
    moduleId,
    cmd,
    type,
    data: name ? encodeCurrentMessage(name, values) : new Uint8Array(),
    clientId: "offline-test",
  }).finish();
}
function response(operation, values = {}) {
  const [moduleId, cmd, , name] = CurrentCommands[operation];
  return wire(moduleId, cmd, 1, name, values);
}
const snapshot = (percentage = 70) =>
  response("getDeviceState", {
    deviceStateInfo: { batteryInfo: { percentage } },
  });
const commandIds = (socket) =>
  socket.sent
    .filter((data) => typeof data !== "string")
    .map((data) => CurrentDwarfSchema.WsPacket.decode(data).cmd);

function harness(t, options = {}, model = 4) {
  const sockets = [];
  const client = new CurrentWebSocketHandler(getCurrentProfile(model), {
    heartbeatIntervalMs: 0,
    reconnectDelaysMs: [],
    ...options,
    webSocketFactory:
      options.webSocketFactory ??
      ((url) => {
        const socket = new FakeSocket(url);
        sockets.push(socket);
        return socket;
      }),
  });
  t.after(() => client.close("Test cleanup"));
  return { client, sockets };
}

async function ready(client, socket) {
  socket.emit("open");
  socket.message(snapshot());
  await flush();
  assert.equal(client.ready, true);
}

test("foreground state reads share the pending bootstrap/poll snapshot without duplicate sends", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  const socket = sockets[0];
  socket.emit("open");
  const foreground = client.request("getDeviceState");
  assert.deepEqual(commandIds(socket), [16405]);
  socket.message(snapshot());
  assert.equal((await foreground).cmd, 16405);
  await flush();
  const poll = client.request("getDeviceState");
  const preview = client.request("getDeviceState");
  assert.strictEqual(poll, preview);
  assert.deepEqual(commandIds(socket), [16405, 16405]);
  socket.message(snapshot(80));
  assert.strictEqual(await poll, await preview);
});

test("shared state reads reject together on disconnect and never cross connection generations", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  const first = client.request("getDeviceState");
  const second = client.request("getDeviceState");
  const rejected = Promise.all([
    assert.rejects(first, /closed/i),
    assert.rejects(second, /closed/i),
  ]);
  client.close();
  await rejected;
  client.connect("ws://offline.test");
  sockets[1].emit("open");
  const fresh = client.request("getDeviceState");
  assert.notStrictEqual(first, fresh);
  sockets[1].message(snapshot());
  assert.equal((await fresh).cmd, 16405);
});

test("construction has no network effects and duplicate connect is idempotent", (t) => {
  const { client, sockets } = harness(t);
  assert.equal(sockets.length, 0);
  client.connect("ws://offline.test:9900");
  client.connect("ws://offline.test:9900/");
  assert.equal(sockets.length, 1);
  assert.equal(sockets[0].binaryType, "arraybuffer");
  assert.equal(client.state.transport, "connecting");
  assert.equal(client.connected, false);
});

test("open sends only read-only device state and does not imply readiness or ownership", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  assert.deepEqual(commandIds(sockets[0]), [16405]);
  assert.equal(client.transportOpen, true);
  assert.equal(client.connected, false);
  assert.equal(client.state.session.phase, "transport-open");
  assert.equal(client.state.session.ownership, "unknown");
  sockets[0].message("ping");
  sockets[0].message("pong");
  await flush();
  assert.equal(
    sockets[0].sent.some((data) => typeof data === "string"),
    false,
  );
  assert.equal(client.ready, false);
  assert.deepEqual(commandIds(sockets[0]), [16405]);
});

test("only a real snapshot establishes readiness; an empty ACK does not", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  sockets[0].message(response("getDeviceState", {}));
  await flush();
  assert.equal(client.ready, false);
  sockets[0].message(snapshot(72));
  await flush();
  assert.equal(client.ready, true);
  assert.equal(
    client.state.session.snapshot.deviceStateInfo.batteryInfo.percentage,
    72,
  );
  assert.equal(client.state.session.ownership, "unknown");
});

test("all operation requests are gated until protocol readiness", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  await assert.rejects(
    client.request("enterCamera", { clientParam: { encodeType: 1 } }),
    (error) => error.kind === "transport",
  );
  assert.deepEqual(commandIds(sockets[0]), [16405]);
  sockets[0].message(snapshot());
  await flush();
  const request = client.request("enterCamera", {
    clientParam: { encodeType: 1 },
  });
  sockets[0].message(response("enterCamera", {}));
  await request;
  assert.deepEqual(commandIds(sockets[0]), [16405, 16404]);
});

test("instances and model identities are independent, never a shared singleton", async (t) => {
  const mini = harness(t, {}, 4);
  const d3 = harness(t, {}, 2);
  mini.client.connect("ws://mini.test");
  d3.client.connect("ws://d3.test");
  await ready(mini.client, mini.sockets[0]);
  d3.sockets[0].emit("open");
  const miniPacket = CurrentDwarfSchema.WsPacket.decode(
    mini.sockets[0].sent[0],
  );
  const d3Packet = CurrentDwarfSchema.WsPacket.decode(d3.sockets[0].sent[0]);
  assert.ok(miniPacket.clientId.startsWith("0000DAF4"));
  assert.ok(d3Packet.clientId.startsWith("0000DAF3"));
  assert.equal(d3.client.ready, false);
  d3.client.close();
  assert.equal(mini.client.ready, true);
});

test("close clears all authoritative state and rejects outstanding requests", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  const rejection = assert.rejects(
    client.request("getQuickSets", {}),
    (error) => error.kind === "transport",
  );
  client.close();
  await rejection;
  assert.equal(client.connected, false);
  assert.equal(client.state.session.snapshot, undefined);
  assert.equal(client.state.session.parameters.size, 0);
  assert.equal(client.state.session.notifications.size, 0);
  assert.equal(client.state.session.ownership, "unknown");
  assert.equal(sockets[0].closes.length, 1);
  for (const handlers of sockets[0].handlers.values())
    assert.equal(handlers.size, 0);
});

test("changing endpoint invalidates even captured callbacks from the old socket", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://first.test");
  const oldMessage = [...sockets[0].handlers.get("message")][0];
  const oldClose = [...sockets[0].handlers.get("close")][0];
  await ready(client, sockets[0]);
  client.connect("ws://second.test");
  await ready(client, sockets[1]);
  oldMessage({ data: snapshot(3) });
  oldClose({ code: 1006 });
  await flush();
  assert.equal(client.ready, true);
  assert.equal(
    client.state.session.snapshot.deviceStateInfo.batteryInfo.percentage,
    70,
  );
  assert.equal(sockets[1].closes.length, 0);
});

test("late Blob completion cannot revive a disconnected session or block its replacement", async (t) => {
  const { client, sockets } = harness(t);
  let release;
  class DeferredBlob extends Blob {
    arrayBuffer() {
      return new Promise((resolve) => {
        release = resolve;
      });
    }
  }
  client.connect("ws://first.test");
  sockets[0].emit("open");
  sockets[0].message(new DeferredBlob());
  await flush();
  client.connect("ws://second.test");
  await ready(client, sockets[1]);
  release(Uint8Array.from(snapshot(2)).buffer);
  await flush();
  assert.equal(client.ready, true);
  assert.equal(
    client.state.session.snapshot.deviceStateInfo.batteryInfo.percentage,
    70,
  );
});

test("Blob decoding and later binary frames are processed in wire order", async (t) => {
  const { client, sockets } = harness(t);
  let release;
  class DeferredBlob extends Blob {
    arrayBuffer() {
      return new Promise((resolve) => {
        release = resolve;
      });
    }
  }
  const seen = [];
  client.subscribe((state, packet) => {
    if (packet?.cmd === 16405)
      seen.push(state.session.snapshot.deviceStateInfo.batteryInfo.percentage);
  });
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  sockets[0].message(new DeferredBlob());
  sockets[0].message(snapshot(65));
  await flush();
  assert.deepEqual(seen, []);
  release(Uint8Array.from(snapshot(64)).buffer);
  await flush();
  assert.deepEqual(seen, [64, 65]);
});

test("typed-array views honor their byte offset and length", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  const packet = snapshot(83);
  const padded = new Uint8Array(packet.length + 12);
  padded.fill(255);
  padded.set(packet, 5);
  sockets[0].message(new DataView(padded.buffer, 5, packet.length));
  await flush();
  assert.equal(
    client.state.session.snapshot.deviceStateInfo.batteryInfo.percentage,
    83,
  );
});

test("unknown valid notifications remain diagnostic packets and do not establish readiness", async (t) => {
  const { client, sockets } = harness(t);
  const seen = [];
  client.subscribe((_state, packet) => {
    if (packet) seen.push(packet);
  });
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  sockets[0].message(wire(9, 15999, 2));
  await flush();
  assert.equal(client.ready, false);
  assert.equal(seen[0].known, false);
  assert.equal(client.transportOpen, true);
});

test("malformed binary data becomes a bounded decode failure, not a success state", async (t) => {
  const { client, sockets } = harness(t);
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  sockets[0].message(Uint8Array.from([255]));
  await flush();
  assert.equal(client.state.transport, "disconnected");
  assert.equal(client.state.error.kind, "decode");
  assert.equal(client.ready, false);
});

test("readiness timeout and retry budget terminate even after repeated successful handshakes", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, {
    readinessTimeoutMs: 20,
    requestTimeoutMs: 1000,
    reconnectDelaysMs: [5, 10],
  });
  client.connect("ws://offline.test");
  for (const [index, delay] of [
    [0, 5],
    [1, 10],
  ]) {
    sockets[index].emit("open");
    t.mock.timers.tick(20);
    await flush();
    assert.equal(client.state.transport, "reconnecting");
    t.mock.timers.tick(delay);
    await flush();
  }
  sockets[2].emit("open");
  t.mock.timers.tick(20);
  await flush();
  assert.equal(client.state.transport, "disconnected");
  assert.equal(client.state.error.kind, "timeout");
  t.mock.timers.tick(1_000_000);
  await flush();
  assert.equal(sockets.length, 3);
  assert.equal(client.state.reconnectAttempt, 2);
});

test("protocol readiness does not reset the finite reconnect budget during flapping", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, { reconnectDelaysMs: [5] });
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  sockets[0].emit("close", { code: 1006 });
  t.mock.timers.tick(5);
  await ready(client, sockets[1]);
  assert.equal(client.state.error, undefined);
  sockets[1].emit("close", { code: 1006 });
  assert.equal(client.state.transport, "disconnected");
  t.mock.timers.tick(100_000);
  assert.equal(sockets.length, 2);
  client.connect("ws://offline.test");
  assert.equal(sockets.length, 3);
  assert.equal(client.state.reconnectAttempt, 0);
});

test("lost heartbeat clears readiness and never retransmits an application command", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, {
    heartbeatIntervalMs: 5,
    heartbeatTimeoutMs: 15,
    reconnectDelaysMs: [5],
  });
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  const rejection = assert.rejects(
    client.request("getQuickSets", {}),
    (error) => error.kind === "transport",
  );
  t.mock.timers.tick(5);
  assert.deepEqual(commandIds(sockets[0]), [16405, 11040, 16405]);
  assert.equal(
    sockets[0].sent.some((data) => typeof data === "string"),
    false,
  );
  t.mock.timers.tick(10);
  await flush();
  await rejection;
  assert.equal(client.ready, false);
  t.mock.timers.tick(5);
  sockets[1].emit("open");
  assert.deepEqual(commandIds(sockets[1]), [16405]);
});

test("text pong cannot mask a dead binary protocol connection", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, {
    heartbeatIntervalMs: 5,
    heartbeatTimeoutMs: 15,
    readinessTimeoutMs: 100,
    requestTimeoutMs: 100,
  });
  client.connect("ws://offline.test");
  sockets[0].emit("open");
  for (let index = 0; index < 2; index++) {
    t.mock.timers.tick(10);
    sockets[0].message("pong");
    await flush();
  }
  assert.equal(client.transportOpen, false);
  assert.equal(client.ready, false);
});

test("correlated read-only state probes keep an idle telescope connected", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, {
    heartbeatIntervalMs: 5,
    heartbeatTimeoutMs: 15,
  });
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  for (let index = 0; index < 4; index++) {
    t.mock.timers.tick(5);
    assert.equal(commandIds(sockets[0]).at(-1), 16405);
    sockets[0].message(snapshot(60 + index));
    await flush();
  }
  assert.equal(client.ready, true);
  assert.equal(sockets[0].sent.length, 5);
  assert.equal(
    sockets[0].sent.some((data) => typeof data === "string"),
    false,
  );
});

test("explicit close cancels pending reconnect and every lifecycle timer", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client, sockets } = harness(t, {
    reconnectDelaysMs: [5],
    heartbeatIntervalMs: 5,
  });
  client.connect("ws://offline.test");
  sockets[0].emit("error");
  assert.equal(client.state.transport, "reconnecting");
  client.close();
  t.mock.timers.tick(100_000);
  await flush();
  assert.equal(sockets.length, 1);
  assert.equal(client.state.transport, "disconnected");
  assert.equal(client.state.error, undefined);
});

test("handshake timeout and constructor failure are explicit bounded failures", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 0 });
  const { client } = harness(t, { connectionTimeoutMs: 20 });
  client.connect("ws://offline.test");
  t.mock.timers.tick(20);
  assert.equal(client.state.error.kind, "timeout");
  let attempts = 0;
  const failing = harness(t, {
    reconnectDelaysMs: [5],
    webSocketFactory: () => {
      attempts++;
      throw new Error("offline factory failure");
    },
  });
  failing.client.connect("ws://offline.test");
  t.mock.timers.tick(5);
  await flush();
  assert.equal(attempts, 2);
  assert.equal(failing.client.state.error.kind, "transport");
  assert.equal(failing.client.state.transport, "disconnected");
});

test("subscriber exceptions do not corrupt protocol state or hide it from other subscribers", async (t) => {
  const errors = [];
  const { client, sockets } = harness(t, {
    onListenerError: (error) => errors.push(error),
  });
  client.subscribe(() => {
    throw new Error("UI subscriber failure");
  });
  const seen = [];
  const unsubscribe = client.subscribe((state) =>
    seen.push(state.session.phase),
  );
  client.connect("ws://offline.test");
  await ready(client, sockets[0]);
  assert.ok(errors.length > 0);
  assert.ok(seen.includes("ready"));
  unsubscribe();
  const length = seen.length;
  client.close();
  assert.equal(seen.length, length);
});

test("invalid URL and timeout options fail locally before creating a socket", async (t) => {
  const { client, sockets } = harness(t);
  assert.throws(
    () => client.connect("https://offline.test"),
    (error) => error.kind === "invalid-parameter",
  );
  assert.throws(
    () => client.connect("not-a-url"),
    (error) => error.kind === "invalid-parameter",
  );
  assert.throws(
    () =>
      new CurrentWebSocketHandler(getCurrentProfile(4), {
        reconnectDelaysMs: [Infinity],
      }),
    (error) => error.kind === "invalid-parameter",
  );
  await assert.rejects(
    client.request("getDeviceState", {}, 0),
    (error) => error.kind === "invalid-parameter",
  );
  assert.equal(sockets.length, 0);
});

test("closing from a transport subscriber cannot leave an orphan attempt", async (t) => {
  const { client, sockets } = harness(t);
  client.subscribe((state) => {
    if (state.transport === "connecting") client.close();
  });
  client.connect("ws://offline.test");
  await flush();
  assert.equal(sockets.length, 0);
  assert.equal(client.state.transport, "disconnected");
});
