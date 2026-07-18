---
title: Quick Start
description: Start the local Mock workflow from sibling repositories with Docker Compose.
---

## 1. Prepare repositories

Install Git, Docker Engine, and Compose v2; GNU Make is an optional shortcut.
Server and Console must be sibling directories:

```bash
git clone https://github.com/getio0909/voice-asset-server.git
git clone https://github.com/getio0909/voice-asset-console.git
cd voice-asset-server
cp .env.example .env
make up
```

On PowerShell, use `Copy-Item .env.example .env`. After the first build, open
`http://localhost:8080`; the direct API diagnostic port is
`127.0.0.1:18080`.

## 2. Create the initial owner

Put the password in the current process environment, never in command arguments
or repository files:

```bash
export VOICEASSET_ADMIN_PASSWORD='replace-this-local-password'
make seed ADMIN_EMAIL=owner@example.com
unset VOICEASSET_ADMIN_PASSWORD
```

For PowerShell, set `$env:VOICEASSET_ADMIN_PASSWORD = '...'`, then remove it
with `Remove-Item Env:VOICEASSET_ADMIN_PASSWORD`.

## 3. Complete the first transcription

Sign in to Console, create an asset, upload a short WAV, choose built-in Mock
ASR, and wait for the worker. Mock needs no cloud credentials. Confirm that
audio plays and the transcript has timestamps before configuring a real
[ASR provider](../asr/) or [LLM provider](../llm/). Compose defaults are for
loopback development only; harden any network deployment with the
[deployment guide](../deployment/).
