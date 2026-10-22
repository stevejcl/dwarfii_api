// Explicit, offline import from the pinned research checkout. Never used by build.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkout = process.argv[2];
const commit = "b5a56f00519a1b76ab36d6e445e1d332216816f6";
const prefix = "src/dwarf_alpaca/proto/";
const names = [
  "astro.proto",
  "base.proto",
  "ble.proto",
  "camera.proto",
  "device.proto",
  "factoryTest.proto",
  "focus.proto",
  "motor_control.proto",
  "notify.proto",
  "panorama.proto",
  "param.proto",
  "protocol.proto",
  "rgb.proto",
  "shooting_schedule.proto",
  "system.proto",
  "task_center.proto",
  "track.proto",
];
if (!checkout)
  throw new Error(
    "Usage: node scripts/current-schema-import.mjs <dwarfAlp checkout>",
  );
const git = (...args) =>
  execFileSync("git", ["-C", resolve(checkout), ...args], {
    maxBuffer: 32 * 1024 * 1024,
  });
if (git("rev-parse", `${commit}^{commit}`).toString().trim() !== commit) {
  throw new Error(
    "Pinned research commit is not present in the supplied checkout",
  );
}
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const dest = resolve(root, "src/current_proto");
mkdirSync(dest, { recursive: true });
const files = names.map((name) => {
  const sourcePath = prefix + name;
  const bytes = git("show", `${commit}:${sourcePath}`);
  writeFileSync(resolve(dest, name), bytes);
  return { name, sourcePath, bytes: bytes.length, sha256: hash(bytes) };
});
const evidencePaths = [
  "tests/test_protocol_golden.py",
  "docs/protocol/firmware-schema-audit.json",
  "firmware-analysis/metadata/bilbo-protos.pb",
];
const evidence = evidencePaths.map((sourcePath) => {
  const bytes = git("show", `${commit}:${sourcePath}`);
  return { sourcePath, bytes: bytes.length, sha256: hash(bytes) };
});
const licenseBytes = git("show", `${commit}:LICENSE`);
writeFileSync(resolve(dest, "LICENSE.upstream"), licenseBytes);
writeFileSync(
  resolve(dest, "provenance.json"),
  JSON.stringify(
    {
      repository: "https://github.com/acocalypso/dwarfAlp",
      commit,
      importMethod:
        "git show <commit>:<path>; original git blob bytes, no transformations",
      purpose:
        "Canonical current schema, isolated from retained legacy SDK schema",
      omitted: [
        "camera_params.proto (empty compatibility stub)",
        "device_config.proto (empty compatibility stub)",
        "v3_astro.proto (empty compatibility stub)",
        "v3_camera.proto (empty compatibility stub)",
        "v3_focus.proto (empty compatibility stub)",
        "v3_notify.proto (provisional 15255 capture-derived schema, not descriptor verified)",
        "v3_system.proto (empty compatibility stub)",
      ],
      files,
      evidence,
      upstreamLicense: {
        sourcePath: "LICENSE",
        localPath: "LICENSE.upstream",
        bytes: licenseBytes.length,
        sha256: hash(licenseBytes),
        declaredLicense: "GNU General Public License, Version 3",
        note: "Preserved upstream terms; importing these sources does not relicense them under the SDK's existing ISC label. Review redistribution licensing before publishing.",
      },
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Imported ${files.length} unchanged protocol source files at ${commit}.`,
);
