---
title: Downloads
description: Currently available source builds and planned release artifacts.
---

VoiceAsset has not released `v1.0.0`. There are no prebuilt binaries, APKs, or
container tags that can honestly be labeled stable. Do not install unofficial
attachments or treat the isolated test server as a production download source.

Source is available from the five official repositories:

- [Server](https://github.com/getio0909/voice-asset-server)
- [Console](https://github.com/getio0909/voice-asset-console)
- [Android](https://github.com/getio0909/voice-asset-android)
- [MCP](https://github.com/getio0909/voice-asset-mcp)
- [Site](https://github.com/getio0909/voice-asset-site)

Build current candidates with `make build`, `pnpm build`,
`./gradlew assembleDebug`, `make build`, and `pnpm build`, respectively. For a
deployment, follow the [quick start](../quick-start/) and build Compose images
from immutable commits.

Phase 6 will produce AMD64/ARM64 Server and MCP binaries, Console/Site static
bundles, a signed Android APK, container manifests, SHA-256 files, SBOMs,
release notes, and a compatibility matrix. This page will link versioned
artifacts only after CI, cross-repository E2E, security, migration, recovery,
and Android device gates pass. The [draft v1.0 release notes](../release-notes/)
separate verified evidence from the gates that are still open.
