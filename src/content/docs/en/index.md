---
title: VoiceAsset
description: Self-hosted, agent-native voice digital asset management.
template: splash
hero:
  tagline: Turn recordings into durable, searchable, auditable assets.
  actions:
    - text: Quick start
      link: ./quick-start/
      icon: right-arrow
    - text: Explore features
      link: ./features/
      icon: open-book
---

VoiceAsset combines WAV/Android M4A ingestion, transcription, LLM correction,
human review, exports, and agent access in one self-hosted workflow. Original
audio, ASR responses, and transcript revisions remain immutable; Web, Android,
and MCP clients cooperate only through the public API.

The project is in **Phase 6: v1.0 gap closure**. All five local repositories now
align on OpenAPI `0.22.0`, including authenticated WebSocket realtime
transcription and Owner Session-only outbound Webhook management with durable
delivery. The isolated `10443` environment runs verified `.20260718.9`
Server/Worker/MCP, contract `0.22.0`, schema 18, and the
matching Console. Webhook create, test, secret rotation, and delivery-history
acceptance passes while the existing certificate and public Caddy remain
unchanged. This is not yet
`v1.0.0`; read the
[project status](./project-status/)
and [download guidance](./downloads/) first.
