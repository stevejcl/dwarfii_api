# Canonical current schema

This is a separately generated current-protocol schema, not a rename of the old
V2 helpers. The old `src/proto` and `src/protobuf/protobuf.js` remain compatibility
surfaces for existing library consumers. Current code must import
`src/protobuf/current.js`; its generated root is `dwarfCurrent`, never `default`.
Loading both modules cannot silently replace types in either root.

## Provenance and scope

The 17 `.proto` files in `src/current_proto` are exact Git blob bytes from
[dwarfAlp commit b5a56f0](https://github.com/acocalypso/dwarfAlp/tree/b5a56f00519a1b76ab36d6e445e1d332216816f6/src/dwarf_alpaca/proto).
The manifest records the immutable source path, byte length and SHA-256 of every
file, plus hashes of the research golden tests and firmware descriptor evidence.
Build verifies all hashes before generation. No telescope access is involved.

The reference repository declares GPLv3 in its root `LICENSE`, while this SDK's
existing package metadata declares ISC. The unchanged upstream license is
preserved as `src/current_proto/LICENSE.upstream`; importing these sources does
not relabel them as ISC. Redistribution/package licensing needs explicit review
before publishing this candidate. This audit does not change either repository's
license or claim that ownership of a repository establishes all source rights.

Six empty compatibility `.proto` stubs are excluded. The provisional command
15255 payload is also excluded: the reference explicitly says its schema lacks
descriptor/APK handler confirmation. Such a notification must remain raw/unknown
instead of being treated as reliable exposure completion. Retaining a declaration
or an enum alias elsewhere does not establish current-device support.

The canonical set preserves 428 messages, 957 fields and 28 enums with 532
declared values, including qualified `param` and `notify` namespaces. Field
presence and oneofs are part of the contract. Source comparison against the old
SDK is in [current-schema-comparison.md](current-schema-comparison.md).

## Reproduction

From an installed SDK checkout, on Windows or POSIX:

```text
node scripts/current-schema-generate.mjs
node scripts/current-schema-compare.mjs
node src/__tests__/current_schema.test.js
```

`node scripts/current-schema-generate.mjs --browser` additionally generates the
browser distribution's schema and metadata, using its existing local
`./minimal.js` protobuf runtime. Package build must copy the generated source
JavaScript and declarations to `dist/src/protobuf` explicitly: TypeScript can
resolve the `.d.ts` without emitting its neighboring JavaScript.

The generation script uses only the lockfile-installed protobufjs CLI and
Prettier, passes explicit filenames instead of shell wildcard expansion, and
emits `current.js`, `current.d.ts`, `current-descriptor.json`, and compact
`current-fields.js` metadata. The metadata exports `currentFields` and
`currentEnums` for recursive input validation before encoding, preserving fully
qualified nested types, field rules, oneofs, and explicit optional presence.
The declarations expose a default namespace matching the default-only JavaScript
module instead of pbts's otherwise incorrect named runtime exports. The installed
pbts/JSDoc combination also omits some message interfaces with this wrapper; the
generator fills only the missing interfaces from the reflected canonical schema,
and automated coverage checks require every message class and interface. All generated artifacts
derive from source; they must not be hand-edited.

Source import is an explicit maintenance operation, not a normal build step:

```text
node scripts/current-schema-import.mjs C:\path\to\dwarfAlp
```

It uses the pinned commit's Git blobs, not the mutable working tree. Changing the
pin requires reviewing the schema diff and evidence, updating the import script,
then regenerating and re-running tests. No automatic fetch or upstream dependency
update is performed.

## Serialization guarantees and limits

`src/__tests__/current_schema.test.js` ports the exact bytes from the research
repository's `tests/test_protocol_golden.py`: mode selection, camera entry,
shooting technology, preview quality, 64-bit parameters, direct GOTO, joystick,
optional zero temperature, empty requests, long-exposure notification, envelope,
and nested one-click GOTO oneof. These are offline contract tests, not fresh
hardware results and not proof that every command succeeds on every model.

Parameter IDs exceed JavaScript's safe integer range. Pass them as decimal
strings or exact Long values; never round through Number. Ordinary proto3
default scalars can be omitted on the wire; protobufjs preserves an explicitly
provided zero unlike the reference Python/APK serializer. Application-level
canonical encoding may omit ordinary defaults but must preserve explicit
optional zero values and oneof branches. `fromObject` does not reject unknown
properties by itself: validate request keys against the descriptor first.

The research's retained protocol enums include historical compatibility names.
The semantic SDK facade must choose verified current command meanings, and must
not assume a current command is available just because an enum entry exists.

## Current WebSocket lifecycle

`CurrentWebSocketHandler` owns one `CurrentSession` and a constructor-provided
model profile; it has no process-global socket or client identity. Use a new
handler when changing the detected model, and close the old handler first.
`connect(url)` is idempotent for the same active endpoint. `subscribe` immediately
reports `{ transport, session, reconnectAttempt, error? }` and optionally the
decoded packet. `connected`/`ready` mean an authoritative device-state snapshot
was received, while `transportOpen` describes only the WebSocket handshake.

On open, the only automatic command is read-only device state (`16405`). Camera
entry, mode selection, ownership and all motion/capture/focus operations require
explicit application requests after readiness. Successful ACKs, heartbeat text,
and HTTP responses do not create protocol readiness. There is no automatic
request replay after reconnection.

Each socket has an epoch and its own ordered binary/Blob decoding queue. Closing
or replacing the connection detaches handlers, cancels all timers and pending
requests, and clears snapshots, ownership, notifications and parameter state.
Late callbacks and Blob completions have no authority in a replacement session.

Default application heartbeat is `ping` every five seconds with a fifteen-second
activity timeout; set `heartbeatIntervalMs: 0` to disable it. Handshake, bootstrap
and readiness failures are explicit. Reconnect delays default to `[1000, 3000]`,
a finite budget per explicit `connect` call that is **not** replenished by brief
readiness during connection flapping. After that budget is exhausted, another
explicit connection starts a fresh budget. `close()` cancels pending retries.

The injectable `webSocketFactory` is used in 21 offline lifecycle tests covering
readiness versus transport liveness, model isolation, request cancellation,
binary view offsets, wire-order Blob handling, late data, unknown notifications,
malformed packets, heartbeat loss, bounded retries, and cleanup. These tests do
not contact a telescope or establish live-device compatibility.

```text
node src/__tests__/current_websocket.test.js
```

Run the SDK TypeScript build before the transport tests; they execute the emitted
distribution. Rendering-subscriber errors cannot interrupt other state listeners;
an optional `onListenerError` callback lets the application report them.
