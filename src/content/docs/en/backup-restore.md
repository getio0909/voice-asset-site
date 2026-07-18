---
title: Backup and Restore
description: Create a verifiable consistent backup and restore into new database and object targets.
---

A backup contains a PostgreSQL custom archive, the complete local object tree,
and a versioned SHA-256 manifest. Stop API, worker, and external MCP writes while
creating it. Verification is safe online.

```bash
make backup BACKUP_DIR=/app/backups/2026-07-16T2000Z
make backup-verify BACKUP_DIR=/app/backups/2026-07-16T2000Z
```

The Make entry point builds the administration image, stops Compose API and
worker, and uses an exit trap to restart both after success or failure. Stop a
separately deployed MCP service first. The gateway may stay running. Because
the backup volume is still on the same host, export, encrypt, and copy completed
backups off-host.

Restore accepts only a new database without user objects and a new or empty
object path. Create the target database, point
`VOICEASSET_COMPOSE_DATABASE_URL` to it, then run:

```bash
make restore \
  BACKUP_DIR=/app/backups/2026-07-16T2000Z \
  RESTORE_STORAGE=/app/var/restored
```

Never point at production; the tool rejects non-empty targets. Before switching
traffic, run disposable API/worker instances and verify `/readyz`, users,
assets, byte-range audio, revisions, dictionaries, audits, and object hashes. If
the database committed but object publication failed, discard both new targets
and retry.

The Server `docs/operations/backup-restore.md` runbook includes systemd commands,
failure handling, and the passing 30-table/13-file recovery drill.
