# Changelog

All notable changes follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and Semantic Versioning.

## [Unreleased]

- Synchronized the bilingual project-status pages to the current `0.22.0`
  contract and Android's explicit `0.13.0`–`0.22.0` compatibility list. The
  pages now describe local-first Android startup accurately; the Site contract,
  i18n, static build, accessibility, link, and license gates pass.
- Synchronized the 84-operation generated API reference to Server contract
  `0.20.0` and documented the Session-only personal terminal-job event feed.
  All 51-page static gates and eight compatibility fixtures pass; isolated
  10443 runs `.20260718.5`/schema 17 after a verified restore drill and strict-
  TLS event acceptance. Console, Android, and MCP intentionally gain no route,
  persisted state, or Agent authority. Public Caddy and the reused certificate
  remained unchanged.
- Synchronized the bilingual generated API reference to local Server contract
  `0.19.0` with 83 operations and documented the audited, read-only System
  Settings projection. The local five-repository compatibility gate now has
  seven fixtures and requires the advertised route plus Console feature pin;
  the isolated deployment now runs matching `.20260718.4` binaries and Console
  after a verified 42-object/42-file backup and strict-TLS allowlist/audit
  acceptance. Schema 16, both Caddy processes/configurations, and the reused
  certificate remained unchanged.
- Synchronized the bilingual generated API reference to local Server contract
  `0.18.0` with 82 operations and documented the dependency-free, five-minute
  Console-to-Android pairing fallback. The isolated deployment now runs
  `.20260718.3`, contract `0.18.0`, and schema 16 after verified backups and a
  real issue/claim/replay/logout flow. Ports 443 and 10443 still present the
  same reused certificate, and public Caddy remains unchanged.

### Changed

- Documented Android's complete Keystore access/refresh persistence, serialized
  rotation, two-step exact-UUID device-session revocation, and exact-Profile
  reconnect in both locales. Reconnect clears the password before network I/O,
  never stores it, and does not mutate an existing session after rejected
  authentication. The current gate passes 134 JVM tests and compiles 41
  instrumentation methods; the 14,619,252-byte V2 development-signed APK
  SHA-256 is
  `9253a623451db78596d1f645b4bb038d8f6e07f4b0423f82e5200ea6481ae1ec`.
- Documented Android's bounded mobile-administration card for system counts,
  recent jobs, exact-version ASR/LLM profile state changes, and explicit safe
  health checks. The updated development-signed APK is 14,348,236 bytes with
  SHA-256
  `5a5afed75d841ddef861e58fdf30b1f6a60b8323790414a3792288d6d10965c2`;
  the gate passes 112 JVM tests and compiles 32 instrumentation tests.
- Documented Android's bounded legacy asset-catalog bootstrap, manual refresh,
  monotonic Room merge, and credential-redacted strict-TLS `0.13.0`/10443 smoke
  in both locales; the updated gate passes 112 JVM tests and compiles 32
  instrumentation tests.
- Documented Android's exact-ETag cached-asset metadata editor, monotonic Room
  refresh, conflict reload behavior, 112 JVM/32 compiled instrumentation tests,
  and the replacement debug APK in both locales.
- Documented Android's unified offline-library search, bounded match counts,
  hidden-playback controls, 112 JVM/32 compiled instrumentation tests, and the
  replacement debug APK in both locales.
- Documented Android's integrity-verified local playback, audio-focus and
  headphone-disconnect behavior in both locales.
- Documented the local five-repository runtime-capability gate, its four
  failure-mode tests, exact Site OpenAPI comparison, and the still-unrun hosted
  workflow in both locales.
- Documented Android's independent per-profile upload/transcription policies,
  manual stage actions, separate WorkManager constraints, and 30 compiled
  instrumentation tests in both locales.
- Advanced the shared local documentation pin and generated 79-operation API
  reference to Server contract `0.16.0`. Both locales document transactional
  incremental asset changes, Android cursor persistence, and the independent
  gateway's reuse of the system-trusted public certificate.
- Advanced the shared local documentation pin and generated 78-operation API
  reference to Server contract `0.15.0`. Both locales document session-only
  password changes, all-session revocation, and credential-free auditing.
- Advanced the shared local documentation pin and generated 77-operation API
  reference to Server contract `0.14.0`. Both locales document the tested
  workspace profile/member lifecycle and distinguish it from the still-running
  remote `0.13.0` candidate.
- Advanced the shared documentation pin and generated 72-operation API
  reference to Server contract `0.13.0`. Bilingual status and release guidance
  record the deployed Job Center/audit/system-status slice and remaining v1.0
  product gaps.
- Recorded the isolated `.6` Server/Worker, `.4` MCP, and matching Console
  `0.13.0` deployment. Strict-TLS administration and official-SDK MCP smokes,
  loopback monitoring health, zero restarts, and the unchanged public Caddy
  boundary are documented in both locales.

- Upgraded Astro from `7.0.9` to `7.1.0` after pnpm 11's default 24-hour
  minimum-release-age window elapsed. The lockfile retains Vite `8.1.4` so the
  bounded update matches Dependabot PR #4; the full static-site gate and high-
  severity dependency audit pass. Two verified release archives are byte-
  identical with SHA-256
  `0f02adc4221f027e04820691af49a7a7a0e21b008f8d049eabbab47ba6d2bf44`
  after the bilingual monitoring evidence update.
- Documented the deployed `.5` Server API/Worker histograms, structured logs,
  loopback Prometheus 3.13.1 retention/restart evidence, four unit-tested rules,
  public non-exposure, and still-open OpenTelemetry/notification-delivery gates
  in both locales.
- Advanced the shared documentation pin and generated 69-operation API
  reference to Server contract `0.12.0`. Bilingual product, privacy, and release
  pages now document Owner-confirmed storage-first permanent asset deletion,
  durable status/recovery, and retained audit/backup boundaries.
- Advanced the shared documentation pin and generated 67-operation API
  reference to Server contract `0.11.0`, including the authenticated immutable
  waveform GET/HEAD surface and Console seek/playback behavior.
- Recorded the isolated `0.11.0` deployment: migration 11, verified pre-upgrade
  backup, complete waveform backfill, authenticated real-browser PNG/playback
  flow, strict-CA performance, official-SDK MCP read, and unchanged public and
  independent Caddy PIDs.
- Advanced all current documentation and the generated 65-operation API
  reference to Server contract `0.10.0`. The bilingual feature and release
  pages now describe PostgreSQL title/latest-Transcript search,
  Provider/Speaker filters, and bounded Segment timecodes. The deployed 0.10
  browser/MCP proofs and unchanged public/isolated Caddy PIDs are recorded.
- Advanced all current documentation and the generated 65-operation API
  reference to Server contract `0.9.0`. Recorded migrations 1–9 and the
  deployed `.2` asset-filter/tag/trash/restore browser proof, strict-CA MCP
  smoke, deterministic archive hashes, and unchanged public/isolated Caddy PIDs.
- Canonicalized Pagefind's parallel language-map output after every static build
  so semantically identical `en`/`zh-cn` indexes produce byte-identical archives.
- Upgraded the direct Sharp runtime to `0.35.3`, deduplicated Astro onto that
  compatible version, and moved CI and Tag workflows to the signed
  `pnpm/action-setup` `v6.0.9` commit for native Node.js 24 execution.
- Updated bilingual Android guidance for Platform/Build Tools 37, all-module
  tests, unsigned release APK/AAB verification, and external signing gates.
- Recorded the deployed Server/MCP `0.1.0-dev+phase5.20260717.1` and contract
  `0.8.0` evidence: migration 8, strict CA/hostname checks, real browser refresh
  rotation/device revocation, official-SDK MCP reads, verified release archives,
  and unchanged public/isolated Caddy PIDs.
- Advanced the documented Server contract pin to `0.8.0` and synchronized the
  generated authentication/session operations from the Server source contract.
- Recorded Server `0.1.0-dev+phase5.20260716.6`, conservative glossary-only
  auto-approval, its atomic lineage/audit proof, and the deployed strict-TLS
  browser smoke. The rollback exercise and corrected deployment left MCP and
  both Caddy processes unchanged.
- Recorded the deployed Console LLM Profile/Glossary administration proof with
  strict TLS, credential-free ASR-plus-LLM responses, empty browser storage,
  manual review enforcement, and unchanged public/isolated Caddy PIDs.
- Recorded the deployed Console ASR Provider/Hotword administration proof with
  strict TLS, credential-free responses, empty browser storage, and unchanged
  public/isolated Caddy PIDs.
- Recorded Server `0.1.0-dev+phase5.20260716.5`, deterministic remote
  expired-artifact reaping, and the deployed Console API-key lifecycle proof
  with strict TLS, empty browser storage, revocation, and unchanged Caddy PIDs.
- Recorded Server `0.1.0-dev+phase5.20260716.4`, the passing 30-table/13-file
  recovery drill, and the verified deployment rollback without changing either
  Caddy process.
- Recorded the deployed Server `0.1.0-dev+phase4.20260716.3` and contract
  `0.7.0` evidence from the isolated `10443` environment.
- Updated bilingual MCP status for twelve read tools, nine opt-in write tools,
  five resources, six prompts, and authenticated clip/export artifacts.
- Advanced the documented Server contract pin to `0.7.0` for the additive
  collection, tag, annotation, and processing-status read models.
- Advanced the documented Server contract pin to `0.6.0` for durable scoped
  Agent credentials used by the remote MCP service.
- Advanced the documented Server contract pin to `0.5.0` and recorded the
  implemented MCP asset search, revision, and exact time-range read slice.

### Added

- Deterministic static-site packaging, complete SHA-256 manifests, safe-path and
  symlink rejection, exact `dist/` comparison, packaged-contract checks,
  deterministic license reporting, and a required-CycloneDX mode for Tags.
- Draft bilingual v1.0 release notes that separate retained candidate evidence
  from the CI, artifact, Docker, Android, and S3 gates still blocking publication.
- Twenty-five aligned Chinese/English pages covering product, architecture,
  quick start, Compose deployment, Android, ASR/LLM, dictionaries, MCP, API,
  security, privacy, backup, monitoring, troubleshooting, development, project,
  and release guidance.
- A generated 62-operation OpenAPI `0.8.0` reference, downloadable contract
  snapshot, required-content gate, and static accessibility-structure test.
- A Tag-triggered draft release pipeline for the static site, dependency
  licenses, checksum, and CycloneDX SBOM.
- Initial bilingual Astro and Starlight foundation.
- Chinese root locale, English `/en` locale, localized navigation, i18n parity,
  root-route, broken-link, dependency, secret, and SBOM checks.
- Dependabot policy holds TypeScript on the Astro-compatible 6.x line until the
  Astro checker supports TypeScript 7's compiler API.
- Honest bilingual implementation evidence, Server contract `0.4.0`, and an
  automated documentation pin check.
- Bilingual Phase 3 evidence for the deployed encrypted provider/correction API
  and real remote browser workflow from Mock ASR through approval.
