// Golden bytes are copied, not synthesized, from dwarfAlp at the commit recorded
// in current_proto/provenance.json, tests/test_protocol_golden.py. These are
// offline schema/serialization tests, not fresh observations of a telescope.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";
import legacy from "../protobuf/protobuf.js";
import current from "../protobuf/current.js";
import { currentFields, currentEnums } from "../protobuf/current-fields.js";

const bytes = (hex) => Buffer.from(hex, "hex");
const encoded = (type, values) =>
  Buffer.from(type.encode(type.fromObject(values)).finish()).toString("hex");

test("canonical generated root cannot overwrite legacy SDK types", () => {
  assert.notEqual(current, legacy);
  assert.notEqual(current.WsPacket, legacy.WsPacket);
  assert.notEqual(current.ReqPhoto, legacy.ReqPhoto);
  assert.ok(current.param.ReqSetExposure);
  assert.ok(current.notify.OneClickGotoState);
  assert.equal(current.V3ResNotifyExposureProgress, undefined);
});

test("generated validation metadata preserves qualification and optional/oneof presence", () => {
  assert.equal(Object.keys(currentFields).length, 428);
  assert.equal(Object.keys(currentEnums).length, 28);
  assert.equal(
    currentFields["param.ReqSetExposure"].fields.paramId.type,
    "uint64",
  );
  assert.equal(
    currentFields["notify.CmosTemperature"].fields.temperature.optional,
    true,
  );
  assert.equal(
    currentFields["notify.CmosTemperature"].fields.cameraType.optional,
    false,
  );
  assert.equal(
    currentFields["notify.OneClickGotoState"].fields.astroTrackingState.type,
    "notify.AstroTrackingState",
  );
  assert.deepEqual(
    currentFields["notify.OneClickGotoState"].oneofs.currentState,
    [
      "astroAutoFocusState",
      "astroCalibrationState",
      "astroGotoState",
      "astroTrackingState",
    ],
  );
  assert.deepEqual(Object.keys(currentFields.ReqMotorServiceJoystick.fields), [
    "vectorAngle",
    "vectorLength",
  ]);
  assert.equal(currentFields.V3ResNotifyExposureProgress, undefined);
});

test("default namespace declarations include every canonical message interface", () => {
  const declaration = readFileSync(
    new URL("../protobuf/current.d.ts", import.meta.url),
    "utf8",
  );
  const interfaces = new Set();
  const classes = new Set();
  function visit(node, scope = []) {
    if (ts.isModuleDeclaration(node)) {
      if (node.body)
        visit(
          node.body,
          node.name.text === "CurrentSchema"
            ? scope
            : [...scope, node.name.text],
        );
      return;
    }
    if (ts.isInterfaceDeclaration(node))
      interfaces.add([...scope, node.name.text].join("."));
    if (ts.isClassDeclaration(node))
      classes.add([...scope, node.name.text].join("."));
    if (ts.isModuleBlock(node) || ts.isSourceFile(node))
      for (const child of node.statements) visit(child, scope);
  }
  visit(
    ts.createSourceFile(
      "current.d.ts",
      declaration,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    ),
  );
  for (const name of Object.keys(currentFields)) {
    const parts = name.split(".");
    parts[parts.length - 1] = "I" + parts[parts.length - 1];
    assert.ok(
      interfaces.has(parts.join(".")),
      `Missing interface ${parts.join(".")}`,
    );
    assert.ok(classes.has(name), `Missing class ${name}`);
  }
  assert.ok(declaration.includes("export default CurrentSchema;"));
});

test("all canonical sources exactly match the pinned research provenance", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../current_proto/provenance.json", import.meta.url)),
  );
  assert.equal(manifest.commit, "b5a56f00519a1b76ab36d6e445e1d332216816f6");
  assert.equal(manifest.files.length, 17);
  for (const file of manifest.files) {
    const content = readFileSync(
      new URL(`../current_proto/${file.name}`, import.meta.url),
    );
    assert.equal(content.length, file.bytes, file.name);
    assert.equal(
      createHash("sha256").update(content).digest("hex"),
      file.sha256,
      file.name,
    );
  }
});

test("task-center and preview requests match APK golden bytes", () => {
  assert.equal(encoded(current.ReqSwitchShootingMode, { mode: 8 }), "0808");
  assert.equal(
    encoded(current.ReqEnterCamera, { clientParam: { encodeType: 1 } }),
    "1a020801",
  );
  assert.equal(encoded(current.ReqSwitchShootingTech, { tech: 2 }), "0802");
  assert.equal(encoded(current.ReqSetPreviewQuality, { level: 1 }), "0801");
});

test("uint64 parameter IDs retain every bit in descriptor golden bytes", () => {
  const paramId = "144396663052566529"; // 0x0201000000000001, exceeds MAX_SAFE_INTEGER.
  assert.equal(
    encoded(current.param.ReqSetExposure, { paramId, mode: 1, value: 120 }),
    "08818080808080c0800210011878",
  );
  const decoded = current.param.ReqSetExposure.decode(
    bytes("08818080808080c0800210011878"),
  );
  assert.equal(decoded.paramId.toString(), paramId);
  assert.equal(
    encoded(current.param.ReqSetGeneralIntParam, {
      paramId: "144678138029277200", // 0x0202000000000010.
      value: 2,
    }),
    "089080808080808081021002",
  );
});

test("direct GOTO and joystick encode the exact current field set", () => {
  assert.equal(
    encoded(current.ReqGotoDSO, {
      ra: 220.225,
      dec: 69.5667,
      targetName: "M11",
      gotoOnly: true,
    }),
    "093333333333876b40112aa913d0446451401a034d31312001",
  );
  assert.equal(
    encoded(current.ReqMotorServiceJoystick, {
      vectorAngle: 45,
      vectorLength: 0.5,
    }),
    "09000000000080464011000000000000e03f",
  );
  const descriptor = JSON.parse(
    readFileSync(
      new URL("../protobuf/current-descriptor.json", import.meta.url),
    ),
  );
  assert.deepEqual(
    Object.values(descriptor.nested.ReqMotorServiceJoystick.fields).map(
      (field) => field.id,
    ),
    [1, 2],
  );
});

test("explicit optional zero temperature remains present", () => {
  assert.equal(
    encoded(current.notify.CmosTemperature, { temperature: 0, cameraType: 1 }),
    "08001001",
  );
  const present = current.notify.CmosTemperature.decode(bytes("08001001"));
  const absent = current.notify.CmosTemperature.decode(bytes("1001"));
  assert.equal(Object.hasOwn(present, "temperature"), true);
  assert.equal(present.temperature, 0);
  assert.equal(Object.hasOwn(absent, "temperature"), false);
});

test("current empty requests do not carry removed legacy payload fields", () => {
  assert.equal(encoded(current.ReqPhoto, {}), "");
  assert.equal(encoded(current.ReqGetUserInfinityPos, {}), "");
  // Python/APK omit an ordinary proto3 scalar at its zero default. In contrast,
  // protobufjs writes an explicitly supplied zero; omit it for byte equality.
  assert.equal(encoded(current.ReqGetQuickSetList, {}), "");
});

test("captured long-exposure progress uses doubles and default camera type", () => {
  const decoded = current.notify.LongExpPhotoProgress.decode(
    bytes("09000000000000f03f"),
  );
  assert.equal(decoded.totalTime, 1);
  assert.equal(decoded.exposuredTime, 0);
  assert.equal(decoded.cameraType, 0);
});

test("WebSocket envelope matches the research profile golden bytes", () => {
  const data = current.ReqEnterCamera.encode(
    current.ReqEnterCamera.fromObject({ clientParam: { encodeType: 1 } }),
  ).finish();
  assert.equal(
    encoded(current.WsPacket, {
      majorVersion: 1,
      minorVersion: 20,
      deviceId: 4,
      moduleId: 14,
      cmd: 16404,
      // Ordinary proto3 type=0 is omitted in the reference serializer.
      data,
      clientId: "test",
    }),
    "080110141804200e289480013a041a020801420474657374",
  );
});

test("correct command names are exported without relying on misleading aliases", () => {
  assert.equal(
    current.DwarfCMD.CMD_GLOBAL_TASK_MANAGER_SWITCH_SHOOTING_MODE,
    16402,
  );
  assert.equal(current.DwarfCMD.CMD_GLOBAL_TASK_MANAGER_ENTER_CAMERA, 16404);
  assert.equal(current.DwarfCMD.CMD_ASTRO_GET_QUICK_SET_LIST, 11040);
  assert.equal(current.DwarfCMD.CMD_FOCUS_GET_USER_INFINITY_POS, 15011);
  assert.equal(current.DwarfCMD.CMD_PARAM_SET_EXPOSURE, 16700);
  assert.equal(current.DwarfCMD.CMD_NOTIFY_PANORAMA_UPLOAD_COMPLETE, 15245);
  assert.equal(current.DwarfCMD.CMD_NOTIFY_LONG_EXP_PROGRESS, 15288);
});

test("captured one-click GOTO decodes the exact nested firmware oneof", () => {
  const decoded = current.notify.OneClickGotoState.decode(
    bytes("220a08011206437573746f6d"),
  );
  assert.equal(decoded.currentState, "astroTrackingState");
  assert.equal(decoded.astroTrackingState.state, 1);
  assert.equal(decoded.astroTrackingState.targetName, "Custom");
  assert.equal(Object.hasOwn(decoded, "astroGotoState"), false);
});
