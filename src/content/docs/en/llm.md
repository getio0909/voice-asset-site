---
title: LLM Configuration
description: Configure Mock or OpenAI-compatible correction with immutable revision review.
---

Mock LLM needs no network or key and validates correction, review, and approval
end to end. A real workspace-scoped OpenAI-compatible profile contains an HTTPS
base URL, model, encrypted API key, and bounded custom headers. Server rejects
unsafe schemes, loopback/private SSRF targets, and out-of-contract responses.

Correction never overwrites ASR. A job reads one immutable source revision and
a fixed LLM glossary version, requires a structured patch from the provider,
then validates timestamps, text, and change boundaries. Reviewers accept or
reject individual changes in an append-only log. Only explicit approval creates
a new approved revision.

Profiles default to `never`, preserving manual review. The optional
`validated_glossary_only` policy accepts only a non-empty deterministic
replacement from a non-empty effective glossary after text, number, semantic,
ratio, and timeline validation all pass. One transaction still records the
automated review, system audit, `human_edited`, and `approved` revisions; it
does not accept arbitrary model rewriting.

Recommended sequence:

1. Keep `VOICEASSET_PROFILE_MASTER_KEY` stable and securely backed up.
2. Create a disabled profile, run its health check, then enable it.
3. Validate prompts and glossary behavior with Mock and a short, non-sensitive transcript.
4. Review structured differences by default; consider auto-approval only for validated deterministic glossary replacements.
5. Alert on timeouts, rate limits, and schema errors without logging full prompts or credentials.

ASR hotwords and LLM glossaries have different semantics; see
[hotwords and dictionaries](../dictionaries/).
