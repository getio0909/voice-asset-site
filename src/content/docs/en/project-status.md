---
title: Project Status
description: Honest VoiceAsset implementation and validation status.
---

Current milestone: **Phase 6: v1.0 gap closure**. The shared local REST
contract is OpenAPI 0.22.0; `v1.0.0` has not been released.

| Area            | Status       | Evidence and remaining gate                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server API      | Experimental | `0.22.0` adds the authenticated WebSocket realtime transcription upgrade, `voiceasset.realtime.v1` subprotocol, text event frames, and a Mock ASR resumable session. API/Worker also include the SDK-backed S3 driver and optional OTLP/HTTP tracing. Real PostgreSQL, WebSocket transport unit tests, and isolated 10443 acceptance pass; the deployment is `.20260718.11` with schema 18. Remote S3 performance/backup, a collector, and an alert receiver remain gates. |
| Web Console     | Experimental | The fail-closed pin is `0.22.0`; the Webhook page supports create, enable/disable, edit, secret rotation, test delivery, and history. Formatting, lint, type checking, 110 unit tests, production build, and license gates pass; 10443 serves the matching bundle. |
| Android         | Experimental | The pin is `0.22.0`, with the `0.13.0`–`0.22.0` sync subset explicitly compatible. Startup prioritizes local recordings and does not require login or a server connection. JVM/Ktlint, Debug/Release lint, APK/AAB, and hosted API 35 emulator instrumentation pass; Android CI `29667693126` executed all 44 instrumentation tests. A development-signed APK is available while physical-device execution remains user acceptance. |
| MCP             | Experimental | The pin is `0.22.0`; realtime transcription adds no MCP tool, resource, prompt, scope, subscription, or Agent authority. Go test/vet/build pass; the isolated deployment runs matching `.20260718.11` MCP. |
| Site/operations | Experimental | Twenty-five bilingual pages, the 91-operation 0.22 reference, 51-page static/link/accessibility/license gates, and eight compatibility fixtures pass. The 10443 gateway reuses the existing Let's Encrypt certificate through restricted symlinks; ports 443/10443 present the same leaf and public Caddy was not modified or reloaded. |

Status uses only **Stable**, **Beta**, **Experimental**, or **Planned**. This page
separates verified evidence from remaining gates and does not claim unrun local
Docker or Android physical-device checks.
