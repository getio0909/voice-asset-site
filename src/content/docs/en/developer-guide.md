---
title: Developer Guide
description: Five-repository commands, contract synchronization, and validation order.
---

Clone all five repositories as siblings. The business contract exists only in
`voice-asset-server/contracts/openapi.yaml`. Clients fail closed through their
own `CONTRACT_VERSION` and must not copy Server business rules.

| Repository | Minimum validation |
| --- | --- |
| Server | `go test ./... && go vet ./... && make contract` |
| Console | `pnpm run verify` |
| Android | `./gradlew test lint assembleDebug` |
| MCP | `make verify` |
| Site | `pnpm test` |

Run the smallest unit tests first, then lint/typecheck/build, and only then
integration tests requiring PostgreSQL, browsers, Android SDK, or real
providers. Mock ASR/LLM and recorded fixtures must pass without cloud
credentials. Live tests require explicit environment switches.

API change order: edit OpenAPI and Server tests → implement Server → update the
contract version and compatibility matrix → update Console/Android/MCP pins →
run `pnpm generate:api-reference` in Site → run cross-repository E2E. Add a new
ADR for breaking design decisions; never rewrite accepted records.

Keep changes focused and tests reproducible. Do not commit `.env`,
`local.properties`, tokens, real provider responses, or generated reports. Each
repository's `AGENTS.md` and `CONTRIBUTING.md` define its exact layout and style.
