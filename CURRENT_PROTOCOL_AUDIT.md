# Current protocol implementation — research verification

Local implementation checkpoint, 2026-09-08. Not a hardware certification.

## Research provenance

Source: https://github.com/acocalypso/dwarfAlp at commit `b5a56f00519a1b76ab36d6e445e1d332216816f6`.

All 17 imported canonical `.proto` files were compared to the original Git blobs using SHA-256. Every file matched. `src/current_proto/provenance.json` records each path, size and checksum, plus the firmware descriptor and golden-test source hashes. Generation rejects modified or missing schema sources.

The recovered firmware descriptor SHA-256 is `4370a369cb1d151d052efbdaa8fd251658d3ced898dbe264aa01b612fa7aaf24`. The schema comparison reports 428 current messages / 957 fields; against the legacy schema there are 157 exact messages, 27 changed messages, 122 legacy-only messages and 244 current-only messages. This comparison is structural evidence, not proof that every command has been exercised on hardware.

## Why library changes are necessary

| Shared change | Research evidence | Validation |
|---|---|---|
| Isolated current protobuf graph, preserving field numbers, types, oneofs and optional presence | Canonical `protocol.proto`, `task_center.proto`, `notify.proto`, `param.proto` and the remaining imported graph | Schema comparison, generated declarations, encoding/decoding and golden fixtures |
| Model identity separated from wire identity and client ID | Research model profiles and current session implementation | Mini, DWARF 3 and DWARF II profile tests; no claim of new live verification |
| Correlation by module/command, bounded pending lifecycle and verified alternate replies | Research `dwarf/ws_client.py` and notification handling | Duplicate-key, timeout, late-reply, ownership and exact parameter-match tests |
| Meaningful successful device snapshot establishes readiness; reconnect does not replay mutations | Research `ResGetDeviceStateInfo` graph and session behavior | Transport, readiness, generation, heartbeat and reconnect tests |
| Lossless uint64 parameter identifiers and advertised catalog values | Canonical `param.proto` plus `/shootingMode/getParamAndSetting` research | Unsafe-number rejection, mode/camera namespace, catalog and exposure tests |
| Capture selects a quick-set and reapplies runtime exposure/gain before starting | Research capture workflow, `astro.proto` and `param.proto` | 16 capture tests, including Mini/DWARF 3 filters, request order, rejection, generation changes and concurrency |
| Focus and mount command semantics use the current schema | Canonical `focus.proto`, `motor_control.proto`, `astro.proto` | Packet validation and golden/unit tests; saved-infinity read is not movement |

The old public surface remains available for compatibility during application migration. Its continued export does not certify old workflows. The current command registry is intentionally bounded; unsupported/unverified operations must not fall back to guessed legacy packets. Provisional notification 15255 is not treated as exposure-completion evidence.

## Executed validation in the user-provided clone

- `npm install --ignore-scripts`: 201 packages installed, zero reported vulnerabilities.
- `npm run build`: passed canonical generation, legacy generation, lint, formatting, TypeScript, distribution and JSDoc generation.
- `npm test`: passed existing tests and all new schema, session, catalog, WebSocket and capture tests.
- `npm run audit-current`: passed and produced the structural comparison.

No telescope was contacted. No focus, mount, ownership or capture command was sent to hardware. Mini live testing still requires the application's completed automated gate and fresh user authorization; DWARF 3 remains evidence-/automated-tested, not live-certified.

## Distribution and licensing

The imported research license is preserved verbatim in `src/current_proto/LICENSE.upstream`, with provenance. Existing SDK metadata says ISC; that metadata does not relicense the imported GPLv3 source. Review the resulting distribution terms before publication. The app must continue referencing this library by Git URL and, once available, a reviewed commit SHA—not a `file:` dependency or an uncommitted checkout.
