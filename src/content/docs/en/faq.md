---
title: FAQ
description: Common VoiceAsset deployment, data, provider, MCP, and release questions.
---

## Can it run fully offline?

Yes. Local storage, PostgreSQL, Mock ASR, and Mock LLM validate the complete
core workflow without cloud access. Choosing a cloud provider sends the audio
or text required by that service.

## Which upload formats are supported?

Current content probing accepts WAV and Android AAC/M4A. An extension never
bypasses size, structure, checksum, or audio-boundary validation.

## Does MCP connect directly to the database?

No. MCP calls only the public Server API. Server still enforces scopes,
workspace isolation, and audits.

## Is S3-compatible storage supported?

The Server API and Worker now use an AWS SDK v2 S3-compatible adapter with
conditional creation, full-hash verification, ETag deletion, and paginated
cleanup. Representative remote performance and backup/restore evidence are
still open, so v1.0 does not yet mark that backend release-grade.

## Why is in-place restore refused?

Rejecting non-empty databases and object roots prevents valid data from being
overwritten or mixed across versions. Restore to new targets, validate, then
switch traffic for an auditable rollback path.

## When are stable APKs and containers available?

`v1.0.0` artifacts with checksums and SBOMs follow Phase 6 Android-device,
cross-architecture, migration, security, and release gates. See
[downloads](../downloads/).
