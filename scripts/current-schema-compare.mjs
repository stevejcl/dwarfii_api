// Compare every fully qualified message/enum; short-name similarity is not equality.
import protobuf from "protobufjs";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function inspect(relative) {
  const dir = resolve(root, relative);
  const paths = readdirSync(dir)
    .filter((name) => name.endsWith(".proto"))
    .sort()
    .map((name) => resolve(dir, name));
  const schema = new protobuf.Root()
    .loadSync(paths, { keepCase: true })
    .resolveAll();
  const types = new Map();
  const enums = new Map();
  function visit(node) {
    if (node instanceof protobuf.Type) {
      types.set(node.fullName.slice(1), {
        fields: node.fieldsArray
          .map((field) => ({
            number: field.id,
            name: field.name,
            type: field.resolvedType?.fullName.slice(1) ?? field.type,
            rule: field.rule ?? "singular",
            keyType: field.keyType ?? null,
            oneof: field.partOf?.name ?? null,
            proto3Optional: field.options?.proto3_optional === true,
          }))
          .sort((a, b) => a.number - b.number),
        oneofs: (node.oneofsArray ?? [])
          .map((oneof) => ({
            name: oneof.name,
            fields: [...oneof.oneof].sort(),
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      });
    }
    if (node instanceof protobuf.Enum) {
      enums.set(node.fullName.slice(1), {
        // Declaration order matters: first-name aliases are the canonical display names.
        values: Object.entries(node.values),
        allowAlias: node.options?.allow_alias === true,
      });
    }
    for (const child of node.nestedArray ?? []) visit(child);
  }
  visit(schema);
  return {
    types,
    enums,
    count: {
      files: paths.length,
      messages: types.size,
      fields: [...types.values()].reduce(
        (sum, type) => sum + type.fields.length,
        0,
      ),
      enums: enums.size,
      enumValues: [...enums.values()].reduce(
        (sum, item) => sum + item.values.length,
        0,
      ),
    },
  };
}
const legacy = inspect("src/proto");
const current = inspect("src/current_proto");
const source = JSON.parse(
  readFileSync(resolve(root, "src/current_proto/provenance.json"), "utf8"),
);
function compare(left, right) {
  return [...new Set([...left.keys(), ...right.keys()])].sort().map((name) => ({
    name,
    old: left.get(name),
    current: right.get(name),
    status: !left.has(name)
      ? "CURRENT ONLY"
      : !right.has(name)
        ? "LEGACY / COMPATIBILITY ONLY"
        : JSON.stringify(left.get(name)) === JSON.stringify(right.get(name))
          ? "EXACT"
          : "DIFFERENT",
  }));
}
const messages = compare(legacy.types, current.types);
const enums = compare(legacy.enums, current.enums);
const count = (rows, status) =>
  rows.filter((row) => row.status === status).length;
const lines = [
  "# Canonical current schema comparison",
  "",
  "Generated with `node scripts/current-schema-compare.mjs`. This report compares source definitions, not generated code or hardware behavior.",
  "",
  `Canonical source: [dwarfAlp ${source.commit}](https://github.com/acocalypso/dwarfAlp/tree/${source.commit}/src/dwarf_alpaca/proto). SHA-256 hashes of unchanged source blobs are recorded in \`src/current_proto/provenance.json\`.`,
  "",
  "The legacy SDK root is intentionally retained for external compatibility. Dwarfium's current protocol uses the separately generated `dwarfCurrent` root; legacy and current types do not overwrite one another.",
  "",
  "Empty compatibility stubs and the provisional command 15255 schema are not imported. Merely retaining a legacy declaration or command enum does not establish that a current device supports it.",
  "",
  "## Coverage",
  "",
  "| Source | Files | Messages | Fields | Enums | Enum values |",
  "| --- | ---: | ---: | ---: | ---: | ---: |",
  ...[
    ["Legacy SDK", legacy.count],
    ["Canonical current", current.count],
  ].map(
    ([name, c]) =>
      `| ${name} | ${c.files} | ${c.messages} | ${c.fields} | ${c.enums} | ${c.enumValues} |`,
  ),
  "",
  "Equality includes every field number/name/type, fully qualified type reference, repetition/map key, oneof membership, and explicit proto3 optional presence. Enum equality includes numeric values, declared aliases and their order. Moving a message into a package is not reported as a false short-name match.",
  "",
  "| Definition | Exact | Different | Legacy / compatibility only | Current only |",
  "| --- | ---: | ---: | ---: | ---: |",
  ...[
    ["Messages", messages],
    ["Enums", enums],
  ].map(
    ([name, rows]) =>
      `| ${name} | ${count(rows, "EXACT")} | ${count(rows, "DIFFERENT")} | ${count(rows, "LEGACY / COMPATIBILITY ONLY")} | ${count(rows, "CURRENT ONLY")} |`,
  ),
  "",
];
for (const [label, rows] of [
  ["Messages", messages],
  ["Enums", enums],
]) {
  lines.push(
    `## ${label}`,
    "",
    "| Fully qualified definition | Classification |",
    "| --- | --- |",
  );
  for (const row of rows) lines.push(`| \`${row.name}\` | ${row.status} |`);
  lines.push("", `### ${label}: complete changed definitions`, "");
  for (const row of rows.filter((entry) => entry.status === "DIFFERENT")) {
    lines.push(
      `#### ${row.name}`,
      "",
      "Legacy:",
      "",
      "```json",
      JSON.stringify(row.old, null, 2),
      "```",
      "",
      "Current:",
      "",
      "```json",
      JSON.stringify(row.current, null, 2),
      "```",
      "",
    );
  }
}
mkdirSync(resolve(root, "docs"), { recursive: true });
writeFileSync(
  resolve(root, "docs/current-schema-comparison.md"),
  lines.join("\n") + "\n",
);
console.log(
  JSON.stringify(
    {
      legacy: legacy.count,
      current: current.count,
      messages: Object.fromEntries(
        [
          "EXACT",
          "DIFFERENT",
          "LEGACY / COMPATIBILITY ONLY",
          "CURRENT ONLY",
        ].map((status) => [status, count(messages, status)]),
      ),
      enums: Object.fromEntries(
        [
          "EXACT",
          "DIFFERENT",
          "LEGACY / COMPATIBILITY ONLY",
          "CURRENT ONLY",
        ].map((status) => [status, count(enums, status)]),
      ),
    },
    null,
    2,
  ),
);
