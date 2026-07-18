---
title: Architecture
description: Five-repository boundaries, data flow, and immutability constraints.
---

VoiceAsset consists of exactly five sibling repositories:

| Repository | Responsibility |
| --- | --- |
| `voice-asset-server` | Go API, worker, migrations, PostgreSQL, and object boundary |
| `voice-asset-console` | Vue 3 administration UI and same-origin reverse proxy |
| `voice-asset-android` | Kotlin/Compose recording, Room state, and WorkManager resume |
| `voice-asset-mcp` | Agent semantic layer that calls only public REST APIs |
| `voice-asset-site` | Bilingual Astro/Starlight static documentation |

The normal flow is: create asset → upload original in parts → worker invokes ASR
→ retain raw response and timestamped revision → LLM creates a correction patch
→ human review → approved revision → search, export, or exact MCP citation.

Server is a modular monolith and the sole authority for business rules and
OpenAPI. Clients never connect directly to PostgreSQL, object storage, or
providers. Original audio, provider responses, and transcript revisions are
immutable; mutable metadata uses explicit versions or audit records.
PostgreSQL holds authoritative metadata and local storage holds content-addressed
files. Protect both together with a [consistent backup](../backup-restore/).
