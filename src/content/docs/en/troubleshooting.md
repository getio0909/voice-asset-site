---
title: Troubleshooting
description: Diagnose startup, login, upload, provider, MCP, and recovery failures.
---

## Console shows 502 or a blank page

Run `docker compose -f deploy/compose/compose.yaml ps`. Migrations must have
exited successfully, API must be healthy, and gateway must be running. Use
`curl http://127.0.0.1:18080/readyz` to separate API from proxy failures. After
rebuilding Console, clear stale browser assets.

## Login fails or cookies disappear

The browser origin and `VOICEASSET_PUBLIC_ORIGIN` must match exactly, including
scheme and port. HTTPS deployments require Secure cookies. Do not access API
through a different hostname. After repeated 401 responses, wait for the login
throttle window rather than disabling protection.

## Upload or transcription stalls

Check object-volume space, part sizes/numbers, and SHA-256, then inspect worker
logs for `request_id`, leases, and retries. Use a short WAV with Mock ASR first.
M4A must be supported ISO BMFF/AAC; an extension alone does not pass probing.

## Provider or MCP fails

Run profile health checks and confirm the encryption master key did not change.
For MCP, check Server API-key scopes, expiry/revocation, inbound bearer, TLS
trust, and `--enable-writes`. Capabilities are public and do not prove a token;
call the smallest protected read endpoint.

## Backup or restore fails

Confirm `pg_dump`/`pg_restore`, non-overlapping paths, and quiesced writers.
Restore requires a clean database and empty object directory. Discard new
targets and retry after failure; never empty production paths.
