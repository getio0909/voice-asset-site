---
title: v1.0 Release Notes (Draft)
description: VoiceAsset v1.0 candidate scope, evidence, and publication gates.
---

> **Status: draft, not released.** VoiceAsset has no `v1.0.0` tag and no binary,
> container, or APK that can be labeled Stable. This page does not treat local
> candidates or the isolated test deployment as a formal release.

## Candidate Scope

All five local components currently pin OpenAPI `0.22.0`. Server covers uploads,
immutable audio, asynchronous waveforms, ASR, revisions, correction/review, API keys, and device
sessions, full-text search, Provider/Speaker filters, Segment timecodes, and
trash/restore, Owner-confirmed durable permanent deletion, administrative
job/audit/system-status reads, local workspace profile/membership lifecycle,
and session-only personal password rotation. Contract 0.22 adds authenticated
WebSocket realtime transcription. Contract 0.21 adds Owner
Session-only outbound Webhook management, one-time encrypted secrets, durable
delivery, leased retries, signed requests, and bounded history; the Console
exposes the matching management page. Contract 0.20 adds personal
terminal-job events for interactive Sessions only. Notifications commit with
job state, copy only safe fields, bind cursors to workspace and user, and reject
API keys; Console, Android, and MCP do not consume the capability yet. Contract
0.19 also adds an audited,
read-only deployment System Settings projection containing only allowlisted
runtime facts. Workspace roles cannot mutate it, and neither the API nor Console
exposes paths, endpoints, credentials, or the global settings table. Console covers the main Owner workflows. MCP exposes 21 tools, five
resources, and six prompts. Site provides bilingual product and operations
documentation. Android includes offline recording, transactional incremental
asset caching, and a bounded Compose view of the active profile's 50 most recently
updated assets. Compatible servers without the incremental capability now use a
strictly validated, bounded asset-catalog bootstrap; a credential-redacted
strict-TLS smoke verified the deployed `0.13.0`/10443 pagination. A separate local recording view reports upload/transcription
progress and errors without requiring the 0.16 feed. Application
compile, lint, Room schema, debug/test APK, unsigned release APK/AAB, and SBOM
gates pass. Hosted Android CI `29667693126` also runs all 44 API 35 emulator
instrumentation tests. Failed or blocked sync rows can resume from their last durable
checkpoint with a fresh transcription retry generation; connected-device
runtime gates remain open. Profiles now select upload and batch-transcription
policies independently; WorkManager constrains each stage separately, and manual
policies expose explicit start actions at durable checkpoints. The next recording
can inherit either profile default or override it; Room migration 4 snapshots the
nullable choices so restart and retry preserve their meaning. One offline query
filters cached assets and local recordings by identity, metadata, status, and
error while retaining total/match counts, 50-row caps, and controls for the
active playback row if it is hidden.
Non-trashed cached assets can also load the latest strong ETag and replace title,
language, and nullable Collection with exact `If-Match`; conflicts require a
reload, and success refreshes only the Room row without advancing its cursor.
Saved recordings can be played in-app or shared only after identity,
canonical-path, size, and SHA-256 verification. Playback supports pause, resume,
stop, and failure retry,
keeps one active engine, and handles audio focus plus headphone disconnects;
export uses a non-exported, read-only content URI. A bounded mobile-administration
card reads system counts, 20 recent jobs, and safe ASR/LLM profile state, with
exact-version state changes and explicit safe health checks. Failed jobs that
the Server marks retryable can keep the same UUID and receive one bounded
attempt. The app exposes no shell or arbitrary-command surface. The 0.18
candidate also adds five-minute, single-use personal device pairing: Console
shows the copy payload only in memory, while Android strictly parses it and
stores the complete access/refresh session through Keystore. Expiring access
credentials rotate through one serialized boundary, and the device inventory
uses two-step exact-UUID revocation with local cleanup only after remote success.
The same existing Profile can reconnect without changing its offline identity;
the password leaves UI state before network I/O, is never persisted, and a
rejected authentication does not change a stored session. No QR dependency is
required for the current fallback.

## Verified Evidence

- Local tests, static checks, and builds pass for Server, Console, MCP, and Site.
  Android passes 134 JVM tests, Ktlint, core/app lint, debug/test APKs, unsigned
  release APK/AAB files, and 141-component SBOM/checksum gates; hosted Android
  CI `29667693126` executes all 44 API 35 emulator instrumentation tests.
  Physical-device execution and final signing are not claimed.
- The 0.11 waveform slice passes migrations 1–11, upgrades from every prior
  version, real PostgreSQL, byte-deterministic and performance-tested FFmpeg,
  authenticated reads, Console seek/speed behavior, and browser accessibility.
- The 0.12 permanent-deletion candidate passes migrations 1–12 from every prior
  version in real PostgreSQL plus success, integrity-failure, terminal-resume,
  graph-removal, and retained-audit scenarios. Mocked Chromium verifies exact-ID
  confirmation, durable status, recovery, and accessibility. A deployed browser
  flow additionally uploaded/transcribed a dedicated asset, trashed it, observed
  the exact-ID purge succeed, and verified the graph and both object files were
  gone while audits remained. A follow-up self-cleaning run also verified Server
  `404` and immediate removal of the matching transcript result from Console
  memory after the purge reached `succeeded`.
- The 0.13 administration-read candidate passes Server unit and real-PostgreSQL
  coverage for workspace isolation, filter-bound cursors, reduced fields, and
  fail-closed read auditing. Console's 76 unit tests and mocked Chromium cover
  Job Center, Audit Log, the live Dashboard, and System Status. Remote Owner
  acceptance also validates field allowlists, no unexpected writes, empty Web
  Storage, and zero axe violations.
- The local 0.14 workspace candidate adds audited profile reads, Owner-only
  exact-ETag renames, member inventory and lifecycle safeguards. Server unit,
  contract, and disposable real-PostgreSQL tests pass; Console's 89 unit tests
  and five default mocked Chromium flows cover Workspace and Members with empty
  Web Storage and zero axe violations. It is uncommitted and undeployed.
- The local 0.15 account candidate adds current-password verification, atomic
  PBKDF2 replacement, all-session revocation across the user's workspaces, and
  credential-free auditing. The full Server gate and disposable real-PostgreSQL
  rollback/old-token tests pass. Console's 95 unit tests and six default mocked
  Chromium flows verify immediate three-field clearing, no redundant logout,
  read-only Version Information, and zero axe violations; Android's 73 JVM/Debug APK gate, MCP verify, and the
  Site's 78-operation bilingual reference also pass. It is likewise uncommitted
  and undeployed.
- The local 0.16 incremental-sync candidate adds transaction-written ordered
  asset changes, fixed-high-watermark paging, immutable snapshots, and permanent-
  deletion tombstones. Migration 15 passes upgrades from versions 1–14 and real-
  PostgreSQL rollback coverage. Android Room 2 atomically stores pages/cursors per
  Server Profile; servers without the capability bootstrap from the stable
  catalog without regressing newer rows or tombstones. Compose reports
  the full cache count and renders the 50 most recent assets. One case-insensitive
  query filters both offline lists while preserving total/match counts, bounded
  rendering, and hidden active-playback controls. Cached-asset edits read the
  latest strong ETag and use exact `If-Match` for a full title/language/nullable-
  Collection replacement; conflicts and ambiguous transport failures require a
  reload, while monotonic Room refresh prevents stale pages from regressing the
  saved version. Saved servers can
  be selected explicitly, with switching blocked during capture. A local recording
  list independently shows upload, transcription, offline-text availability, and
  errors. Profile upload and batch-transcription policies are now wired into the
  form; WorkManager constrains the two stages separately, and manual upload or
  transcription starts explicitly from a durable checkpoint. Room migration 3 persists retry generations, restores the last durable
  checkpoint, and avoids reusing a terminal transcription idempotency key. Room
  migration 4 persists per-recording policy overrides. Recording playback and
  export share fail-closed identity, path, size, and SHA-256 verification;
  playback keeps one active engine and handles audio focus. Mobile administration
  adds system/job reads, exact-version provider state changes, and safe health
  checks. The 14,346,828-byte replacement Debug APK
  passes V2 signature verification with SHA-256
  `ee38901c9d0deaf9993132094a0341c8ed39007553c6127da46431993c22eca0`. Console, MCP, and Site pin `0.16.0`,
  and the Site reference now has 79 operations. A dependency-free five-repository
  gate executes the real `adminctl capabilities` output and checks every pin,
  Console/Android requirements, MCP API identity, and the exact Site OpenAPI;
  four failure-mode tests pass while the hosted workflow remains unrun. This
  slice is uncommitted and undeployed.
- The 0.20 personal-event candidate passes the full five-repository gates.
  Migration 17 real-PostgreSQL tests cover terminal backfill, failed-then-
  succeeded retries, transaction rollback, recipient isolation, ordering, and
  immutability; the 84-operation Site gate and eight compatibility fixtures
  pass. A 42-object/42-file r2 backup restored into disposable targets and
  upgraded to schema 17 before `.20260718.5` deployment. Strict-TLS acceptance
  read 35 safe events and proved Session-only access, API-key denial, an empty
  checkpoint, authenticated workspace/user cursor binding, tamper/method
  rejection, safe auditing, logout, and post-logout 401. Public Caddy, the
  independent gateway, configuration hashes, restart counts, and reused
  certificate did not change. The 14,619,252-byte V2 development-signed APK is
  `VoiceAsset-0.1.0-dev-contract-0.20.0-personal-notifications-debug-20260718T085854Z.apk`
  with SHA-256
  `7eb84ec921b27140b151cd3bfe2bcb8136e5837c67718de1d916721ebcbadfd2`.
- The 0.19 System Settings candidate adds an audited `admin:read` safe runtime
  projection. The API returns exactly eight allowlisted fields, every mutation
  method returns `405`, query parameters return `400`, and the deployment-global
  `system_settings` table is never read. Console exposes no form or save action.
  Its 107 unit tests and seven local Chromium flows pass, as do Android's 134
  JVM tests/full build, MCP's full suite, the 83-operation Site gate, and seven
  cross-repository compatibility fixtures. Isolated 10443 now runs `.20260718.4`,
  contract 0.19, and schema 16 after a verified 42-object/42-file offline backup.
  Strict-TLS 401, allowlist read, mutation/query denial, audit, and logout checks
  pass while both Caddy processes/configurations and the reused certificate stay
  unchanged. The new 14,619,252-byte V2 development-signed APK is
  `VoiceAsset-0.1.0-dev-contract-0.19.0-device-sessions-reconnect-debug-20260718T071900Z.apk`
  with SHA-256
  `82708cc07bf0b8c148dfaf951314e111ff480b37d5800a7abdbcbfe2e4845a57`.
- The local 0.18 device-pairing candidate adds five-minute, single-use session
  exchange with only the secret SHA-256 stored. A newer issue revokes older
  unclaimed payloads for that user; claim atomically verifies an active account
  and creates the session plus credential-free audits. Full real-PostgreSQL,
  OpenAPI, and compatibility gates pass for Server, along with Console's 105
  tests/typecheck/lint/build, Android's 134 JVM tests/full build and 41 compiled
  instrumentation methods, MCP coverage/vet/build/race, and Site's 82-operation
  static gate. The current fallback adds no dependency and uses copy/paste.
  Reconnect replaces the encrypted session on the exact existing Profile,
  clears and never stores the password before network I/O, and leaves any stored
  session unchanged after rejected authentication. The 14,619,252-byte V2
  development-signed APK is
  `VoiceAsset-0.1.0-dev-contract-0.18.0-device-sessions-reconnect-debug-20260718T062602Z.apk`
  with SHA-256
  `9253a623451db78596d1f645b4bb038d8f6e07f4b0423f82e5200ea6481ae1ec`.
  At that checkpoint, the isolated 10443 environment ran `.20260718.3` and schema 16 after
  verified backups and a restore drill. Real strict-TLS issue, wrong-Origin,
  claim, session-read, replay, logout, hash-at-rest, and log-redaction checks
  pass. A live-discovered subsecond expiry mismatch was reproduced and fixed by
  canonicalizing both payload representations to one whole second. Physical-
  device pairing and hosted CI remain open.
- The 0.17 job-retry candidate adds a workspace-scoped `admin:write` boundary.
  Only Server-marked eligible failed Jobs retain their UUID and `attempts` while
  `max_attempts` increases by exactly one below the hard limit of 20; related
  Asset lifecycle, Job, and credential-free audit changes commit in one
  transaction. Server unit/HTTP/OpenAPI/full-Go and real-PostgreSQL gates pass,
  along with Console's 95 tests and six mocked Chromium flows, Android's 112 JVM
  tests/full build and 32 compiled instrumentation methods, MCP coverage/vet/
  build, Site's 80-operation static gate, and all five compatibility fixtures.
  The isolated 10443 environment now runs `.20260718.1`, schema 15, and the
  matching Console after a verified pre-upgrade backup. A real retry proved the
  same UUID, bounded attempt, duplicate conflict, safe audit, and mutable-fixture
  cleanup. The 19,421,634-byte deployment archive SHA-256 is
  `3950784247ce2870f684d4d42b8a209cc025bc144f5260004cdb20aa72b98f61`;
  the new 14,348,236-byte v2 development-signed APK SHA-256 is
  `5a5afed75d841ddef861e58fdf30b1f6a60b8323790414a3792288d6d10965c2`.
  Port 10443 continues to reuse the existing certificate through restricted
  symlinks; ports 443/10443 present the same leaf while the public Caddy config
  hash and process remain unchanged. Device execution and hosted CI remain
  open, so this is not v1.0.
- The isolated Debian `0.13.0` candidate runs `.6` API/Worker and `.4` MCP and passes strict TLS, complete
  waveform backfill, authenticated-PNG browser flow, full-text/trash/export and
  session rotation/revocation flows, exact MCP timecodes, auditing, and recovery
  checks. VoiceAsset exposes only `10443`. Its independent gateway now reuses the
  existing Let’s Encrypt certificate through restricted symlinks and its own hot
  reload; the existing public Caddy configuration hash, process, and restart count
  remain unchanged.
- Local upload, Mock Worker, audio-read, and real FFmpeg performance budgets
  pass. Reproducible Server/MCP six-target archives and deterministic Console/Site
  static archives pass complete SHA-256 and content checks.
- The direct API's bounded Prometheus HTTP metrics and structured status/latency
  logs pass unit, Linux race, deployed scrape/redaction, and gateway
  non-exposure coverage without raw path/query labels. Independent Prometheus
  3.13.1 retains histogram samples for 7 days or 1 GiB; both targets and four
  unit-tested rules are healthy, history survives restart, and loopback port
  `19090` returns no public HTTP response.

This evidence comes from uncommitted candidate slices, not immutable Tag
provenance. See [project status](../project-status/) for compatibility and
[downloads](../downloads/) for artifact availability.

## Upgrade Principles

Verify database and object backups before upgrading, stop writers, run Server
migrations, then check readiness and one representative upload/transcription
flow. Production migrations are forward-only. Roll back by restoring the
pre-upgrade backup into a clean target, not by down-migrating live data.

## Gates Before Publication

- Submit all five coordinated slices and pass default-branch CI.
- Run immutable Tag workflows and record exact commits, image digests,
  checksums, SBOMs, signatures, and provenance.
- Validate Linux amd64/arm64 containers and Docker upgrade/recovery.
- Using the installed Google Android SDK, run the suite on an accelerated
  emulator or physical device, then pass externally signed APK/AAB, microphone,
  process-death, and network-recovery gates.
- Retain representative remote compatibility, performance, and backup/restore
  evidence for the wired S3-compatible SDK adapter before marking that backend
  release-grade.
- Deploy and validate an OpenTelemetry Collector plus an operator-selected alert
  notification receiver.

Do not publish `v1.0.0` or promote any component to Stable until every gate is
closed.
