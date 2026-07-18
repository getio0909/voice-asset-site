---
title: Android Configuration
description: Build the native client and connect it to a self-hosted Server.
---

The Android client requires JDK 21, Android SDK Platform 37, and Build Tools
37.0.0. Set the local SDK path in `voice-asset-android/local.properties`; never
commit that file.

```bash
./gradlew test lintDebug assembleDebug
```

Use `gradlew.bat` on Windows. The debug APK is written under
`app/build/outputs/apk/debug/`. With an API 26+ device or emulator connected,
run `./gradlew connectedDebugAndroidTest`.

The release-candidate path also runs `lintRelease assembleRelease bundleRelease`.
Repository-local package and verification scripts emit and inspect explicitly
unsigned APK/AAB files, a 141-component CycloneDX SBOM, and complete SHA-256
checksums. Keys never enter the repository or CI. Direct installation uses the
externally signed APK; sign the AAB with an upload key for Play App Signing.

When creating a Server profile in the app, enter the deployment HTTPS origin,
not PostgreSQL, object-storage, or provider addresses. The app reads
`/api/v1/system/capabilities` first, accepts only the explicit `0.13.0`–`0.22.0`
compatibility set with required capabilities, and fails closed otherwise. The
current `https://api.getio.net:10443` deployment reuses a publicly trusted
certificate, so leave custom CA blank. For another private-CA test deployment,
install that CA into the test device trust store; never bypass TLS in application code.

The app does not require login or a server connection at startup. It opens on
the local recording entry point; without a Server profile, users can still
record, stop, play, and export local files. Upload, transcription, and sync
become available after a server is configured.

The current `0.22.0` candidate supports one-time device pairing. On the Console
**Device sessions** page, select **Create pairing payload**, copy the masked URI,
paste it into the Android Server Profile, and select **Pair server**. Both clients
keep the payload only in memory; it expires after five minutes, and a newer issue
revokes older unclaimed payloads for that account. Android clears the input before
network claim and stores the resulting access/refresh credentials and expiries only
through Keystore. This fallback
does not require a QR dependency.

The same encrypted session boundary rotates expiring access credentials once and
removes unusable local state after a rejected refresh. Select **Refresh device
sessions** to load credential-free rows for the active profile. Revocation requires
a second confirmation and a fresh Server lookup of the exact session UUID;
revoking **This device** removes its local credential only after remote success.
Access-only records from an older app version remain usable until expiry. After
expiry or current-device revocation, use **Reconnect current server** to replace
the encrypted session on the existing Profile. This avoids a duplicate Profile
and preserves its offline recording identity and settings. The password leaves
UI state before network I/O and is never stored; rejected authentication does
not change an existing local session.

## Physical-device acceptance

Install the newest debug APK over the existing debug build. Use
`https://api.getio.net:10443` as the Server origin and leave custom CA blank.
Prefer the one-time pairing URI created on the Console **Device sessions** page;
pairing does not require an account password in Android. After **This device**
appears, record for at least ten seconds while offline, stop and play the local
file, restore connectivity, and verify upload plus transcript sync.

Next, revoke **This device** with the second confirmation. Use **Reconnect
current server** with the same credentials used for Console login and verify
that the Profile, offline recording count, and settings are unchanged. There is
no default project account password. When reporting a failure, include the step,
visible error, device model, Android version, and approximate UTC time. Never
include passwords, pairing URIs, session IDs, or tokens in screenshots or logs.

The deployed `0.22.0` Server advertises `incremental_sync`, so Android uses its
fixed-high-watermark durable change cursor. Compatible `0.13.0`–`0.15.0`
servers without that capability use the stable paginated asset list as a
bounded bootstrap. Each response is validated for one workspace, strict
shape, identifiers, timestamps, descending order, and cursor progress. Room
only accepts newer versions and never resurrects a tombstone; absence from this
legacy list is not interpreted as deletion. Save/select schedules the pull, and
**Refresh server assets** queues it manually. Servers advertising
`incremental_sync` continue to use the durable change cursor.

The **Mobile administration** card loads only when the user selects **Refresh
administration**. An account with `admin:read` can inspect bounded workspace
status, the 20 most recent credential-free jobs, and existing ASR/LLM Profiles.
An account with `admin:write` can enable or disable a Profile using its displayed
version as an exact `If-Match`, and retry failed jobs that the Server explicitly
marks retryable. Retry preserves the job UUID and grants one bounded attempt;
conflicts require refresh. Provider credentials,
SSH, shell, and arbitrary commands are never exposed. **Check health** is an
explicit action that retains only a safe status, optional error class, and
timestamp. The real `0.13.0`/10443 smoke validated these reads, restored the
tested LLM Profile to its original enabled state, and separately returned a
healthy Mock LLM check before revoking each temporary session. A real failed-
Job retry also passes against the current 0.17 Server; the Android button flow
still requires physical-device acceptance.

Foreground recording writes M4A. Room persists asset/upload checkpoints plus a
Server-Profile-scoped incremental-sync cursor, and WorkManager resumes multipart
upload and pulls ordered asset changes after connectivity returns. Sessions
remain in Keystore-protected storage. Failed or blocked local rows expose
**Retry sync**; Room migration 3 restores the last durable checkpoint and uses a
new transcription retry generation. New profiles select upload and batch-
transcription policies independently, and WorkManager applies network/charging
constraints to each stage separately. Manual upload exposes **Start upload**;
manual transcription waits at the uploaded checkpoint for **Start transcription**.
The recording card can inherit either server default or override it for the next
recording. Room migration 4 snapshots those nullable choices at capture start,
so restart, retry, and manual actions resolve the same policies; older recordings
continue to inherit their server defaults.
The real-time option stays hidden until its Server adapter and device E2E are
complete. One offline-library search filters cached asset title/ID/language/
status fields and local recording filename/ID/status/error fields case-
insensitively. Total and matching counts remain separate, each list renders at
most 50 results, and controls remain available if the active playback row is
hidden. Non-trashed cached assets expose **Edit metadata**. The app first reads
the latest asset and strong ETag, then replaces title, language, and nullable
Collection with that exact `If-Match`. Conflicts and ambiguous network failures
require a reload; success refreshes only the matching Room row without moving
the incremental cursor, and stale sync pages cannot overwrite a newer version.
Saved recordings expose **Play** and **Export** actions. Both paths
verify Room identity, canonical location, size, and SHA-256 metadata first.
Playback supports pause, resume, stop, and failure retry, keeps one MediaPlayer
active, and handles audio focus plus headphone disconnects. Export grants a
read-only content URI to the system share chooser; the provider is not exported,
accepts no writes, and reveals no internal filesystem path. Phase 6 still requires QR
rendering/scanning and broader safe administration, device recording,
offline resume, background-limit, and external-signing validation before an APK
is a release artifact; see [downloads](../downloads/) and
[project status](../project-status/).
