---
title: Contributing
description: Minimum requirements for issues, code, and cross-repository changes.
---

Search the relevant repository's issues first, then read its `CONTRIBUTING.md`,
`AGENTS.md`, and architecture decisions. Use the private channel in
`SECURITY.md` for vulnerabilities; never open a public exploit issue.

Fork and create a short-lived branch from the latest default branch. Use
Conventional Commits such as `feat(server): add backup verification` or
`docs(site): explain MCP scopes`. Keep each commit single-purpose and exclude
unrelated formatting or refactors.

A pull request must identify:

- affected repositories and user-visible behavior;
- linked issues, compatibility, and migration risks;
- commands actually run and their results;
- screenshots and accessibility evidence for UI changes;
- OpenAPI, tests, client pins, compatibility matrix, and any required ADR for API changes.

Never commit secrets, real user audio, raw provider responses, signing keys, or
local configuration. Explain the need, license, and security impact of new
dependencies and update lockfiles/SBOMs. Maintainers may split cross-repository
work into several pull requests merged in contract order.
