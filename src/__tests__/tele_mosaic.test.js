#!/usr/bin/env node

import assert from "node:assert/strict";

import { messageStartTeleMosaic } from "../../dist/index.js";
import {
  Dwarfii_Api,
  analyzePacket,
  setDwarfMinorVersion,
} from "../api_utils.js";
import { cmdMapping, notifyMapping } from "../cmd_mapping.js";

setDwarfMinorVersion(Dwarfii_Api.WsMinorVersion.WS_MINOR_VERSION_V3);

const packet = messageStartTeleMosaic(2, 2, 0, 1, false);
const envelope = Dwarfii_Api.WsPacket.decode(packet);
const request = Dwarfii_Api.ReqStartMosaic.decode(envelope.data);

assert.equal(envelope.moduleId, Dwarfii_Api.ModuleId.MODULE_ASTRO);
assert.equal(envelope.cmd, 11031);
assert.equal(envelope.type, Dwarfii_Api.MessageTypeId.TYPE_REQUEST);
assert.deepEqual(Dwarfii_Api.ReqStartMosaic.toObject(request), {
  horizontalScale: 2,
  verticalScale: 2,
  rotation: 0,
  irIndex: 1,
  forceStart: false,
});

assert.equal(cmdMapping[11031], "ReqStartMosaic");
assert.equal(notifyMapping[15263], "ProgressCaptureMosaic");
assert.equal(Dwarfii_Api.DwarfCMD[11032], "CMD_ASTRO_CHECK_IF_RESTACKABLE");

const progressValues = {
  totalCount: 40,
  updateType: 3,
  currentCount: 12,
  stackedCount: 10,
  expIndex: 7,
  gainIndex: 80,
  targetName: "M31",
  horizontalScale: 140,
  verticalScale: 120,
  rotation: -1,
  fovId: 2,
  fovTotal: 4,
};
const progressPayload = Dwarfii_Api.ProgressCaptureMosaic.encode(
  Dwarfii_Api.ProgressCaptureMosaic.create(progressValues),
).finish();
const progressPacket = Dwarfii_Api.WsPacket.encode(
  Dwarfii_Api.WsPacket.create({
    majorVersion: 1,
    minorVersion: 20,
    deviceId: 4,
    moduleId: Dwarfii_Api.ModuleId.MODULE_ASTRO,
    cmd: 15263,
    type: Dwarfii_Api.MessageTypeId.TYPE_NOTIFICATION,
    data: progressPayload,
  }),
).finish();

const decodedProgress = JSON.parse(analyzePacket(progressPacket, false));
assert.equal(decodedProgress.data.class, "Dwarfii_Api.ProgressCaptureMosaic");
for (const [field, value] of Object.entries(progressValues)) {
  assert.equal(decodedProgress.data[field], value, field);
}

console.log("Tele Mosaic request and progress protocol tests passed.");
