# Repository Guidelines

## Scope

This repository owns the bilingual VoiceAsset website and documentation. It
must remain statically buildable and must not depend on a live Server.

## Commands

- `pnpm dev`: run the local documentation server.
- `pnpm check`: type-check Astro content and configuration.
- `pnpm test`: run checks and produce the static build.

## Content Rules

Keep English pages in `src/content/docs/en/` and Simplified Chinese pages in
`src/content/docs/zh-cn/` with matching slugs. Mark features only as `Stable`,
`Beta`, `Experimental`, or `Planned`. Do not claim unverified functionality,
downloads, metrics, customers, or compatibility.

Use Conventional Commits such as `docs(site): add deployment guide`. Include
both locale updates in the same pull request when content is user-facing.
