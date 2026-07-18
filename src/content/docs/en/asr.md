---
title: ASR Configuration
description: Configure Mock, Alibaba Cloud, and Tencent Cloud transcription providers.
---

Start every deployment with built-in Mock ASR. It makes no network request,
requires no credential, and produces a deterministic timeline suitable for
validating upload, worker, transcript, and backup paths.

Real provider profiles are workspace-scoped and can be created only by an
administrator through Console or the public API. Server encrypts Alibaba and
Tencent credentials with `VOICEASSET_PROFILE_MASTER_KEY`; browsers, Android,
and MCP never receive plaintext. Run a profile health check before enabling it,
then test with short non-sensitive audio. Never put App Keys, secrets, or tokens
in `.env.example`, logs, fixtures, or request URLs.

Server bounds concurrency, retries eligible failures, and fails over only when
policy permits. Every job retains the selected provider, profile, hotword
version, and raw response, so switching providers never rewrites history.
Recorded Alibaba and Tencent contract fixtures need no cloud credentials. Live
tests require explicit `VOICEASSET_LIVE_ASR=1` and provider variables in the
test process.

Recognition hints belong in separate [ASR hotwords](../dictionaries/), not
post-processing rules. See the [generated API reference](../api-reference/) for
operations and schemas.
