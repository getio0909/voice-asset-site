---
title: Monitoring
description: Health probes, logs, key signals, and a minimum alerting baseline.
---

Reverse proxies and orchestrators use these secret-free endpoints:

| Endpoint                      | Purpose                                                |
| ----------------------------- | ------------------------------------------------------ |
| `/livez`                      | API process liveness; use only for restart decisions   |
| `/readyz`                     | Dependency readiness; route traffic only on success    |
| `/healthz`                    | Aggregate health for operator diagnosis                |
| `/api/v1/system/capabilities` | Version/feature negotiation, not credential validation |
| direct API `/metrics`         | Process-local Prometheus HTTP metrics; do not proxy     |

For Compose, inspect `docker compose ps`, `logs --since`, and restart counts. For
systemd, use `systemctl is-active/show` and `journalctl -u voiceasset-*`.
Structured request logs should retain time, status, latency, and `request_id`,
but never cookies, API keys, provider secrets, audio, or transcript text.

At minimum, monitor 5xx/429 rates, P95 latency, database connections and disk,
object-volume space, expired clip/export backlog, expired worker leases/retries,
oldest queued job, provider
timeouts, upload checksum failures, login throttles, API-key denials, last
successful backup, and periodic recovery drills. Alert on sustained readiness
failure, low disk, queue growth, audit-write failure, and stale backups.

The worker reaps up to 25 expired clips/exports per fair scheduler turn after
verifying size and SHA-256. Alert if the oldest artifact expiry stays behind
current time for several heartbeats or `artifact.reaped` system audits stop
while the backlog grows.

The direct API listener exposes Prometheus text at `GET /metrics`. Its bounded
labels contain method, route family, and status only—never raw paths, query
strings, credentials, or resource identifiers. The same-origin gateway does not
proxy this endpoint. Scrape it over the loopback or private operations network;
do not expose it publicly or grant a monitor business write scopes. Request
duration uses fixed cumulative histogram buckets so P95 can be calculated
without introducing raw-path labels.

The isolated test deployment runs checksum-pinned Prometheus 3.13.1 only on
`127.0.0.1:19090`, scraping/evaluating every 15 seconds and retaining its TSDB
for 7 days or 1 GiB. Four `promtool`-tested rules cover API down, sustained 5xx,
sustained P95 latency, and failed configuration reload. Both scrape targets are
healthy, range history survives restart, and neither `/metrics` nor port `19090`
is exposed by the gateway, UFW, or public network.

The API's in-memory counters still reset with its process, but scraped samples
remain in that bounded TSDB. The rules have no notification receiver yet, so an
operator must select and validate alert delivery separately. API and Worker
export OTLP/HTTP traces when `VOICEASSET_OTEL_EXPORTER_OTLP_ENDPOINT` is set;
this deployment has no configured collector, and worker/database/storage signals
still require external collection.
