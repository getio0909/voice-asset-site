---
title: MCP Configuration
description: Run local stdio or remote Streamable HTTP agents with least privilege.
---

MCP Server calls only the public VoiceAsset REST API. It never reads PostgreSQL
or object storage. `search_assets` accepts title/latest-transcript, Provider,
and Speaker filters and returns directly citable Revision, Segment, and
millisecond timecodes. Prefer stdio for a local client:

```bash
export VOICE_ASSET_SERVER_URL=https://voice.example.com
export VOICE_ASSET_SERVER_TOKEN='one-time-server-api-key'
go run ./cmd/voice-asset-mcp --transport=stdio
```

Write tools are disabled by default. They register only when the Server API key
has matching scopes and `--enable-writes` or
`VOICE_ASSET_MCP_ENABLE_WRITES=true` is explicit. A read-only agent normally
needs only `assets:read` and `transcripts:read`; add the smallest separate scopes
for clips, exports, or metadata mutations. Server remains authoritative for
authorization and audit records.

Remote mode serves `/mcp`:

```bash
go run ./cmd/voice-asset-mcp --transport=http --listen=127.0.0.1:8090
```

A non-loopback listener requires native TLS certificate/key files and a separate
inbound bearer. That bearer is not the outbound Server API key. Preserve rate
limits, origin protection, and request-size bounds. `--enable-writes` never
replaces scope management. Add an internal CA to client trust stores rather
than disabling production TLS verification. The MCP repository README lists
all tools and strict remote-test variables.
