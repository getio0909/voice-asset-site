---
title: Product Features
description: Implemented VoiceAsset asset, transcription, review, and agent capabilities.
---

## Asset workflow

- Create workspace assets and upload checksum-verified WAV or Android M4A
  originals in resumable parts.
- Run recoverable Mock, Alibaba Cloud, or Tencent Cloud ASR jobs while retaining
  the immutable raw provider response.
- Store timestamped transcript revisions and generate structured corrections
  through Mock or OpenAI-compatible LLM providers.
- Accept or reject individual changes before creating an immutable approved
  revision.

## Discovery and delivery

The Console covers login, account password changes with all-session revocation,
upload, transcription, correction review, bounded
bulk trash/restore for up to 100 loaded assets, ASR profile/hotword management,
LLM profile/glossary management, and scoped API-key lifecycle administration.
For a trashed asset, only a workspace Owner can request permanent deletion after
typing the exact asset ID; the Console exposes the durable job and explicit
terminal-failure recovery rather than claiming immediate erasure.
Each bulk call carries its asset's resource version, and one conflict does not
stop other items. LLM API keys and custom-header values are write-only and never
enter browser persistence. Manual review is the default;
administrators may select `validated_glossary_only`, which auto-approves only
non-empty glossary replacements that pass every safety validation. The public
API supports PostgreSQL full-text search over titles and latest Transcript
Segments, Collection/Tag/status/date/Provider/Speaker filters, bounded timecoded
hits, organization metadata, exact transcript ranges, byte-range audio,
integrity-checked immutable waveform PNGs, short clips, and JSON, Markdown, SRT, or WebVTT
exports. MCP exposes 21 tools plus resources and prompts across the same
authorization boundary; write tools are disabled by default. Interactive
Sessions can also read a personal terminal-job history committed with job
state. API keys are rejected, and Console, Android, and MCP do not yet consume
this feed.

## Security and operations

Web sessions use HttpOnly cookies. Agents use one-time, expiring, revocable,
least-privilege API keys. Provider credentials are encrypted, workspaces are
isolated, and access is audited. Server includes migrations, health probes,
offline consistent backup, and clean-target-only restore tooling.
The worker generates waveforms asynchronously; Console supports pointer or
keyboard seeking and 0.75–2x playback. The worker also reaps expired clip/export
files and metadata in integrity-checked, retryable batches while retaining
source records and audits unless an Owner separately confirms asset purge.

This is a Phase 6 candidate, not a production SLA. Review the
[project status](../project-status/) and [security model](../security/) before deployment.
