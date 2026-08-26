#!/usr/bin/env node
// Verification script for v3_camera_params encode/decode and filter wheel constants.
// Run: node src/__tests__/v3_camera_params.test.js

import {
  encodeParamId,
  decodeParamId,
  messageV3FilterWheelSet,
  messageV3AstroFrameCountSet,
  V3_SHOOTING_MODE,
  V3_PARAM_CATEGORY,
  V3_CAMERA_ID,
  V3_PARAM_INDEX,
} from "../v3_camera_params.js";

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${msg}`);
  } else {
    failed++;
    console.error(`  ✗ ${msg}`);
  }
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

console.log("\n=== encodeParamId / decodeParamId roundtrip ===\n");

// ASTRO/OPTICAL/TELE/FILTER_WHEEL → matches pcap value
const astroFilter = encodeParamId(
  V3_SHOOTING_MODE.ASTRO,
  V3_PARAM_CATEGORY.OPTICAL,
  V3_CAMERA_ID.TELE,
  V3_PARAM_INDEX.FILTER_WHEEL
);
assert(
  astroFilter === "144396663052566541",
  `ASTRO filter wheel encodes to 144396663052566541 (got ${astroFilter})`
);

const decoded1 = decodeParamId(astroFilter);
assert(
  deepEqual(decoded1, {
    shootingMode: 2,
    category: 1,
    cameraId: 0,
    paramIndex: 13,
  }),
  `decodes back to {shootingMode:2, category:1, cameraId:0, paramIndex:13}`
);

// PHOTO/OPTICAL/TELE/FILTER_WHEEL → matches pcap notification value
const photoFilter = encodeParamId(
  V3_SHOOTING_MODE.PHOTO,
  V3_PARAM_CATEGORY.OPTICAL,
  V3_CAMERA_ID.TELE,
  V3_PARAM_INDEX.FILTER_WHEEL
);
assert(
  photoFilter === "281474976710669",
  `PHOTO filter wheel encodes to 281474976710669 (got ${photoFilter})`
);

const decoded2 = decodeParamId(photoFilter);
assert(
  deepEqual(decoded2, {
    shootingMode: 0,
    category: 1,
    cameraId: 0,
    paramIndex: 13,
  }),
  `decodes back to {shootingMode:0, category:1, cameraId:0, paramIndex:13}`
);

// Arbitrary roundtrip
const encoded3 = encodeParamId(1, 3, 1, 7);
const decoded3 = decodeParamId(encoded3);
assert(
  deepEqual(decoded3, {
    shootingMode: 1,
    category: 3,
    cameraId: 1,
    paramIndex: 7,
  }),
  `roundtrip (1,3,1,7) works`
);

console.log("\n=== decodeParamId input types ===\n");

// BigInt input
const fromBigInt = decodeParamId(144396663052566541n);
assert(
  fromBigInt.shootingMode === 2 && fromBigInt.paramIndex === 13,
  "accepts BigInt input"
);

// protobuf.js Long object
// 144396663052566541 = 0x020100000000000D → high=0x02010000=33619968, low=0x0000000D=13
const fromLong = decodeParamId({ low: 13, high: 33619968 });
assert(
  deepEqual(fromLong, {
    shootingMode: 2,
    category: 1,
    cameraId: 0,
    paramIndex: 13,
  }),
  "accepts protobuf Long object"
);

// Unsafe number should throw
let threw = false;
try {
  decodeParamId(144396663052566541);
} catch (e) {
  threw = e instanceof RangeError;
}
assert(threw, "throws RangeError on unsafe number");

console.log("\n=== Constants ===\n");
assert(V3_SHOOTING_MODE.ASTRO === 2, "V3_SHOOTING_MODE.ASTRO = 2");
assert(V3_PARAM_CATEGORY.OPTICAL === 1, "V3_PARAM_CATEGORY.OPTICAL = 1");
assert(V3_CAMERA_ID.TELE === 0, "V3_CAMERA_ID.TELE = 0");
assert(
  V3_PARAM_INDEX.FILTER_WHEEL === 0x0d,
  "V3_PARAM_INDEX.FILTER_WHEEL = 0x0D"
);
assert(V3_PARAM_CATEGORY.CAPTURE === 2, "V3_PARAM_CATEGORY.CAPTURE = 2");
assert(
  V3_PARAM_INDEX.FRAME_COUNT === 0x10,
  "V3_PARAM_INDEX.FRAME_COUNT = 0x10"
);

const astroFrameCount = encodeParamId(
  V3_SHOOTING_MODE.ASTRO,
  V3_PARAM_CATEGORY.CAPTURE,
  V3_CAMERA_ID.TELE,
  V3_PARAM_INDEX.FRAME_COUNT
);
assert(
  astroFrameCount === "144678138029277200",
  `ASTRO frame count encodes to 144678138029277200 (got ${astroFrameCount})`
);

console.log("\n=== messageV3FilterWheelSet ===\n");

// Returns a Uint8Array packet
const packet = messageV3FilterWheelSet(2);
assert(packet instanceof Uint8Array, "returns Uint8Array");
assert(packet.length > 0, `packet length > 0 (got ${packet.length})`);

// Uses correct paramId (astro/optical/tele/filterWheel by default)
const packetDefault = messageV3FilterWheelSet(1);
assert(
  packetDefault instanceof Uint8Array && packetDefault.length > 0,
  "default args (ASTRO, TELE) produce valid packet"
);

// Custom shooting mode
const photoPacket = messageV3FilterWheelSet(
  1,
  V3_SHOOTING_MODE.PHOTO,
  V3_CAMERA_ID.TELE
);
assert(
  photoPacket instanceof Uint8Array && photoPacket.length > 0,
  "PHOTO mode produces valid packet"
);

console.log("\n=== messageV3AstroFrameCountSet ===\n");
const frameCountPacket = messageV3AstroFrameCountSet(1);
assert(
  frameCountPacket?.constructor?.name === "Uint8Array",
  "returns Uint8Array"
);
assert(
  frameCountPacket.length > 0,
  `packet length > 0 (got ${frameCountPacket.length})`
);

let invalidFrameCountThrew = false;
try {
  messageV3AstroFrameCountSet(0);
} catch (e) {
  invalidFrameCountThrew = e instanceof RangeError;
}
assert(invalidFrameCountThrew, "rejects a non-positive frame count");

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);
