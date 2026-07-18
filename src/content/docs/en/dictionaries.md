---
title: Hotwords and Dictionaries
description: Keep ASR recognition hints separate from LLM correction terminology.
---

VoiceAsset intentionally maintains two independent systems:

| Type | Stage | Typical content |
| --- | --- | --- |
| ASR hotword | Before/during provider recognition | Names, product terms, abbreviations, optional weights |
| LLM glossary | Post-ASR correction | Misrecognition → canonical form, term notes, context rules |

Both are workspace-scoped and versioned immutably, with collection or asset
resolution. A job snapshots the resolved versions when it starts. Later edits
cannot change existing jobs, revisions, or audit evidence.

Put short, unambiguous terms likely to occur in audio into hotwords. Do not add
whole prompts, secrets, or conflicting spellings. Use glossaries to normalize
format and correct recurring recognition errors, while still requiring
structured patch validation and human review. Deleting a logical dictionary
does not erase historical version references.

When diagnosing results, inspect the job's provider/profile and version IDs,
then compare raw ASR, normalized, and corrected revisions instead of looking
only at final text. Configuration operations are in the
[API reference](../api-reference/).
