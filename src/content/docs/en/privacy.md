---
title: Privacy
description: Self-hosted data flow, third-party providers, logs, and retention responsibility.
---

VoiceAsset is self-hosted software, not a hosted SaaS. Recordings, transcripts,
users, audit records, and configuration remain in PostgreSQL and object volumes
controlled by the operator. The project code does not automatically collect
product telemetry, although infrastructure, reverse proxies, or cloud providers
may have separate logging policies.

Mock providers send no audio or text to third parties. Alibaba Cloud, Tencent
Cloud, and OpenAI-compatible providers receive the audio or text required for a
configured job. Operators must assess provider location, retention, training,
and compliance terms and provide appropriate notice and consent to end users.

For traceability, original audio, raw ASR responses, transcript revisions, and
audit records are immutable during normal use. Trash is reversible. A workspace
Owner may separately request permanent deletion with exact-ID and version
confirmation; the retryable job removes the primary asset bytes and relational
graph but retains governance audits. Existing backups are not automatically
rewritten. Operators must define retention for accounts, audio, logs, audits,
and backups; restrict administrator access; observe purge completion; and test
export and deletion procedures.

Avoid real recordings outside necessary environments. Prefer generated short
audio, Mock providers, and sanitized fixtures. Treat backups and support bundles
as sensitively as the production database. This page describes product behavior
and is not legal advice.
