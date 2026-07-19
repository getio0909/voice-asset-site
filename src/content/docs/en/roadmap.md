---
title: Roadmap
description: Remaining work from Phase 6 to the formal v1.0 release.
---

The project is in **Phase 6: v1.0 release candidate**. Bilingual docs, generated
API reference, a single-host Compose gateway, offline-consistent backup/clean
restore, and the isolated `10443` 0.11 Server/Console/MCP waveform slice are
verified. The coordinated default branches are merged and their CI baselines
are green; the Android main run `29667693126` also executed all 44 hosted
emulator tests.

Remaining Phase 6 work:

- full cross-repository Mock ASR → LLM → review → MCP → export → restore E2E;
- performance, security, migration, Docker upgrade, and Android stability tests;
- final AMD64/ARM64 artifacts, external signing, checksums, SBOMs, and release
  notes;
- the full compatibility matrix and v1.0 release checklist.

v1.0 explicitly excludes iOS, call recording, arbitrary Shell/SSH management,
SaaS billing, multi-region active/active, Kubernetes operators, Kafka, service
mesh, foundation-model development, video editing, and unrestricted plugins.
Those may enter a later roadmap without weakening current acceptance gates.
