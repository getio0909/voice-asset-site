---
title: Changelog
description: Find versioned change records for all five components.
---

Each repository independently follows Keep a Changelog and Semantic Versioning.
Cross-repository features establish compatibility through the Server OpenAPI
version first, then record each client implementation. Never infer full-system
compatibility from one repository version alone.

- [Server CHANGELOG](https://github.com/getio0909/voice-asset-server/blob/main/CHANGELOG.md)
- [Console CHANGELOG](https://github.com/getio0909/voice-asset-console/blob/main/CHANGELOG.md)
- [Android CHANGELOG](https://github.com/getio0909/voice-asset-android/blob/main/CHANGELOG.md)
- [MCP CHANGELOG](https://github.com/getio0909/voice-asset-mcp/blob/main/CHANGELOG.md)
- [Site CHANGELOG](https://github.com/getio0909/voice-asset-site/blob/main/CHANGELOG.md)

The current local shared contract is OpenAPI `0.22.0`. Before upgrading, read
`[Unreleased]` in every affected component, Server migration notes, and the
compatibility matrix, then create a backup. The current
[draft v1.0 release notes](../release-notes/) separate verified candidate
evidence from open gates. The formal version will add exact commits, image
digests, checksums, SBOMs, and verified combinations.

The current Console `[Unreleased]` adds LLM profile/glossary administration and
explicit policy changes; manual review remains the default. Only
`validated_glossary_only` can atomically create the review, system audit, and
approved revision after non-empty glossary rules and deterministic changes pass
every Server validation. The `.6` read-only deployment smoke passed strict TLS
without returning credentials or restarting MCP or either Caddy process.

Android `[Unreleased]` now bootstraps cached assets from the bounded stable
catalog on compatible servers without `incremental_sync`; a real strict-TLS
`0.13.0`/10443 smoke verified the paginated response. Newer servers retain the
incremental cursor, and Room never regresses a newer row or tombstone. Android
also opens a metadata editor from cached assets. It reads
the latest strong ETag before replacing title, language, and nullable Collection
with exact `If-Match`. Conflicts require reload, while success refreshes only the
Room row without moving its sync cursor. A bounded mobile-administration card
reads system counts, recent jobs, and ASR/LLM profile states, and applies profile
state changes only with the exact resource version. Explicit health checks retain
only a safe classification and timestamp. The real `10443` smokes restored the
enabled LLM profile after its reversible mutation, returned `healthy` for Mock
LLM, and left both gateway services active without restarts; 112 JVM tests and
compilation of 32 device-test methods pass.

The Server `[Unreleased]` also adds authenticated WebSocket realtime
transcription and Owner Session-only outbound Webhooks with
one-time encrypted secrets, version preconditions, notification-triggered
durable deliveries, leased retries, signed requests, and bounded history. The
Console exposes the matching management page; real PostgreSQL, isolated 10443
acceptance, and the 91-operation API reference are synchronized.
