---
title: Security Model
description: Trust boundaries, authentication, secrets, network controls, and auditability.
---

Server is the sole business trust boundary. Console uses SameSite HttpOnly
session cookies and Origin checks, Android protects sessions with Keystore, and
agents use hashed API keys whose plaintext is shown once. Keys must be scoped to
a workspace, permissions, and expiry and remain revocable. An MCP inbound bearer
never replaces the outbound Server key.

Changing a password requires the current password again. In one transaction,
Server replaces the PBKDF2 hash, revokes every session for that user across
workspaces, and records an audit without passwords or hashes. Console then
forgets its local identity and requires a fresh sign-in. The endpoint rejects
API keys and limits attempts per user and client IP.

Provider credentials are encrypted with a stable random
`VOICEASSET_PROFILE_MASTER_KEY`. Store that key separately from database
backups; losing it makes saved profiles undecryptable. Secrets must never enter
Git, command arguments, URLs, logs, fixtures, or browser bundles.

Expose only an HTTPS reverse proxy. Keep PostgreSQL, API, worker, and MCP on
loopback or a private network. Remote MCP additionally requires TLS, an inbound
bearer, rate limits, and origin protection. The Console gateway sends CSP,
Permissions-Policy, Referrer-Policy, MIME, and framing protections.

Server enforces workspace queries, API-key scopes, ownership, and soft-delete
rules. Sensitive reads and writes create immutable audit records. Retain
`request_id` in logs while removing cookies, tokens, audio, and transcript text.
Encrypt, restrict, and store backups off-host.

Before deployment, run repository tests, dependency vulnerability/license
checks, secret scans, and a [recovery drill](../backup-restore/). Report security
issues privately through each repository's `SECURITY.md` without real data or
public exploit details.
