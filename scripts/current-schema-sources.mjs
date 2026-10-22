import { createHash } from "node:crypto";
import process from "node:process";
import {
  copyFileSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";

const releasePath = "src/current_proto/releases/dwarf3-1.5.3.9-mini-1.1.4.4";

/** Assemble an isolated import directory so an older proto's relative import
 * cannot accidentally load the historical version of an overridden schema.
 * Original research blobs remain untouched and independently hash-verified.
 */
export function currentSchemaSources(root) {
  const baselineDir = resolve(root, "src/current_proto");
  const releaseDir = resolve(root, releasePath);
  const original = JSON.parse(
    readFileSync(join(baselineDir, "provenance.json"), "utf8"),
  );
  const release = JSON.parse(
    readFileSync(join(releaseDir, "provenance.json"), "utf8"),
  );
  const paths = new Map();
  for (const [dir, manifest] of [
    [baselineDir, original],
    [releaseDir, release],
  ]) {
    const names = manifest.files.map((file) => file.name).sort();
    if (
      JSON.stringify(names) !==
      JSON.stringify(
        readdirSync(dir)
          .filter((name) => name.endsWith(".proto"))
          .sort(),
      )
    )
      throw new Error(`Schema file set differs from provenance: ${dir}`);
    for (const file of manifest.files) {
      if (basename(file.name) !== file.name)
        throw new Error("Invalid schema filename");
      const path = join(dir, file.name);
      const bytes = readFileSync(path);
      if (
        bytes.length !== file.bytes ||
        createHash("sha256").update(bytes).digest("hex") !== file.sha256
      )
        throw new Error(`Schema source differs from provenance: ${path}`);
      paths.set(file.name, path);
    }
  }
  const dir = mkdtempSync(join(tmpdir(), "dwarf-current-schema-"));
  const files = [...paths.keys()].sort().map((name) => {
    const target = join(dir, name);
    copyFileSync(paths.get(name), target);
    return target;
  });
  const cleanup = () => {
    if (
      dirname(resolve(dir)) !== resolve(tmpdir()) ||
      !basename(dir).startsWith("dwarf-current-schema-")
    )
      throw new Error(
        "Refusing to remove a schema directory outside its temporary workspace",
      );
    rmSync(dir, { recursive: true, force: true });
  };
  process.once("exit", cleanup);
  return { dir, files, original, release, cleanup };
}
