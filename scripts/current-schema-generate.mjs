// Reproducible local generation: no network, shell globs, or mutable source checkout.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import protobuf from "protobufjs";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(root, "src/current_proto");
const manifest = JSON.parse(
  readFileSync(resolve(dir, "provenance.json"), "utf8"),
);
const actualFiles = readdirSync(dir)
  .filter((name) => name.endsWith(".proto"))
  .sort();
const expectedFiles = manifest.files.map(({ name }) => name).sort();
if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
  throw new Error("Canonical proto file set differs from provenance manifest");
}
for (const file of manifest.files) {
  const bytes = readFileSync(resolve(dir, file.name));
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (sha256 !== file.sha256 || bytes.length !== file.bytes) {
    throw new Error(
      `Canonical source differs from recorded research blob: ${file.name}`,
    );
  }
}
const licenseBytes = readFileSync(
  resolve(dir, manifest.upstreamLicense.localPath),
);
if (
  createHash("sha256").update(licenseBytes).digest("hex") !==
    manifest.upstreamLicense.sha256 ||
  licenseBytes.length !== manifest.upstreamLicense.bytes
) {
  throw new Error(
    "Preserved upstream license differs from the recorded source blob",
  );
}
const run = (entry, args) =>
  execFileSync(process.execPath, [resolve(root, entry), ...args], {
    cwd: root,
    stdio: "inherit",
  });
mkdirSync(resolve(root, "src/protobuf"), { recursive: true });
const schema = new protobuf.Root()
  .loadSync(expectedFiles.map((name) => resolve(dir, name)))
  .resolveAll();
const currentFields = {};
const currentEnums = {};
function collect(node) {
  if (node instanceof protobuf.Type) {
    currentFields[node.fullName.slice(1)] = {
      fields: Object.fromEntries(
        node.fieldsArray.map((field) => [
          field.name,
          {
            type: field.resolvedType?.fullName.slice(1) ?? field.type,
            kind:
              field.resolvedType instanceof protobuf.Type
                ? "message"
                : field.resolvedType instanceof protobuf.Enum
                  ? "enum"
                  : "scalar",
            rule: field.rule ?? "singular",
            optional: field.options?.proto3_optional === true,
            ...(field.partOf ? { oneof: field.partOf.name } : {}),
            ...(field.keyType ? { keyType: field.keyType } : {}),
          },
        ]),
      ),
      oneofs: Object.fromEntries(
        (node.oneofsArray ?? []).map((oneof) => [oneof.name, [...oneof.oneof]]),
      ),
    };
  }
  if (node instanceof protobuf.Enum)
    currentEnums[node.fullName.slice(1)] = node.values;
  for (const nested of node.nestedArray ?? []) collect(nested);
}
collect(schema);
writeFileSync(
  resolve(root, "src/protobuf/current-fields.js"),
  [
    "// Generated from src/current_proto. Do not edit by hand.",
    "/** @typedef {{type:string, kind:'message'|'enum'|'scalar', rule:string, optional:boolean, oneof?:string, keyType?:string}} CurrentField */",
    "/** @type {Record<string, {fields:Record<string, CurrentField>, oneofs:Record<string, string[]>}>} */",
    `export const currentFields = ${JSON.stringify(currentFields)};`,
    "/** @type {Record<string, Record<string, number>>} */",
    `export const currentEnums = ${JSON.stringify(currentEnums)};`,
    "",
  ].join("\n"),
);
run("node_modules/prettier/bin/prettier.cjs", [
  "--write",
  "src/protobuf/current-fields.js",
]);
run("node_modules/protobufjs-cli/bin/pbjs", [
  "-t",
  "static-module",
  "-w",
  "./wrapper/wrapper.js",
  "--root",
  "dwarfCurrent",
  "--dependency",
  "protobufjs/minimal.js",
  "-o",
  "./src/protobuf/current.js",
  ...expectedFiles.map((name) => resolve(dir, name)),
]);
run("node_modules/protobufjs-cli/bin/pbjs", [
  "-t",
  "json",
  "-o",
  "./src/protobuf/current-descriptor.json",
  ...expectedFiles.map((name) => resolve(dir, name)),
]);
run("node_modules/prettier/bin/prettier.cjs", [
  "--write",
  "src/protobuf/current.js",
]);
run("node_modules/protobufjs-cli/bin/pbts", [
  "-o",
  "./src/protobuf/current.d.ts",
  "./src/protobuf/current.js",
]);
// The custom static wrapper exports only its root as default. pbts otherwise
// describes named runtime exports that do not exist; expose the declarations
// through a default namespace matching the generated JavaScript module.
const declarationPath = resolve(root, "src/protobuf/current.d.ts");
const declaration = readFileSync(declarationPath, "utf8");
const imports = declaration.match(/^import[^\n]+\n/gm) ?? [];
const definitions = declaration.replace(/^import[^\n]+\n/gm, "");
// pbts 1.3.x/JSDoc drops some interfaces with this custom static wrapper. Restore
// absent declarations mechanically from the exact reflected source, never from
// handwritten field guesses. Existing interfaces are not duplicated or changed.
const declaredInterfaces = new Set();
function inspectDeclaration(node, scope = []) {
  if (ts.isModuleDeclaration(node)) {
    if (node.body) inspectDeclaration(node.body, [...scope, node.name.text]);
    return;
  }
  if (ts.isInterfaceDeclaration(node))
    declaredInterfaces.add([...scope, node.name.text].join("."));
  if (ts.isSourceFile(node) || ts.isModuleBlock(node)) {
    for (const statement of node.statements)
      inspectDeclaration(statement, scope);
  }
}
inspectDeclaration(
  ts.createSourceFile(
    "current.d.ts",
    definitions,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  ),
);
const interfaceName = (name) => {
  const parts = name.split(".");
  parts[parts.length - 1] = "I" + parts[parts.length - 1];
  return parts.join(".");
};
const supplement = [];
for (const [name, message] of Object.entries(currentFields)) {
  const fullName = interfaceName(name);
  if (declaredInterfaces.has(fullName)) continue;
  const parts = fullName.split(".");
  const localName = parts.pop();
  const fields = Object.entries(message.fields).map(([fieldName, field]) => {
    let fieldType =
      field.kind === "message"
        ? interfaceName(field.type)
        : field.kind === "enum"
          ? field.type
          : field.type === "string"
            ? "string"
            : field.type === "bool"
              ? "boolean"
              : field.type === "bytes"
                ? "Uint8Array"
                : /64$/.test(field.type)
                  ? "(number | Long)"
                  : "number";
    if (field.keyType) fieldType = `{ [key: string]: ${fieldType} }`;
    else if (field.rule === "repeated") fieldType = `Array<${fieldType}>`;
    return `${fieldName}?: ${fieldType} | null;`;
  });
  let generatedInterface = `export interface ${localName} {\n${fields.join("\n")}\n}`;
  for (const scope of parts.reverse())
    generatedInterface = `export namespace ${scope} {\n${generatedInterface}\n}`;
  supplement.push(generatedInterface);
}
writeFileSync(
  declarationPath,
  `${imports.join("")}\ndeclare namespace CurrentSchema {\n${definitions}\n${supplement.join("\n")}\n}\nexport default CurrentSchema;\n`,
);
console.log(
  `Restored ${supplement.length} canonical interfaces omitted by pbts.`,
);
run("node_modules/prettier/bin/prettier.cjs", [
  "--write",
  "src/protobuf/current.d.ts",
]);
if (process.argv.includes("--browser")) {
  const browserDir = resolve(root, "dist_js/src/protobuf");
  mkdirSync(browserDir, { recursive: true });
  const generated = readFileSync(
    resolve(root, "src/protobuf/current.js"),
    "utf8",
  );
  const dependency = 'import $protobuf from "protobufjs/minimal.js";';
  if (!generated.includes(dependency))
    throw new Error("Unexpected generated protobuf dependency import");
  writeFileSync(
    resolve(browserDir, "current.js"),
    generated.replace(dependency, 'import $protobuf from "./minimal.js";'),
  );
  writeFileSync(
    resolve(browserDir, "current-fields.js"),
    readFileSync(resolve(root, "src/protobuf/current-fields.js")),
  );
  writeFileSync(
    resolve(browserDir, "current-descriptor.json"),
    readFileSync(resolve(root, "src/protobuf/current-descriptor.json")),
  );
}
console.log(
  "Canonical current schema generated in isolated dwarfCurrent protobuf root.",
);
