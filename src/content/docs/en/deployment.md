---
title: Docker Compose Deployment
description: Single-host topology, configuration, volumes, upgrades, and rollback.
---

Compose starts PostgreSQL, one-shot migrations, API, worker, administration
tooling, and the Console gateway with embedded Caddy. By default only gateway
`127.0.0.1:8080` and diagnostic API `127.0.0.1:18080` are published. Never expose
the development configuration directly to a network.

```bash
cp .env.example .env
docker compose -f deploy/compose/compose.yaml up --build --detach
docker compose -f deploy/compose/compose.yaml ps
curl --fail http://localhost:8080/readyz
```

`postgres_data` contains the database, `object_data` contains originals, upload
parts, and generated artifacts, and `backup_data` contains administration-tool
backups. `docker compose down` preserves them. Do not use `down --volumes`
unless all data is intentionally disposable.

For a network deployment, replace database credentials, set a random
`VOICEASSET_PROFILE_MASTER_KEY`, set `VOICEASSET_PUBLIC_ORIGIN` to the single
HTTPS origin, and terminate TLS at a trusted reverse proxy. Publish only the
gateway; keep PostgreSQL, API, and MCP private or loopback-bound.

Before upgrades, [create and verify a backup](../backup-restore/), fetch an
immutable version, rebuild, run migrations, start services, and check `/readyz`.
Application rollback is safe only while new migrations remain backward
compatible; otherwise restore the pre-upgrade backup into a new database and
object root. Upstream images support AMD64 and ARM64, but each release must
still be built and tested on its target architecture.
