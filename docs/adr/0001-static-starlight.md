# ADR 0001: Use Astro and Starlight for the product site

- Status: Accepted
- Date: 2026-07-15

## Context

VoiceAsset needs bilingual product and technical documentation that builds
without access to a deployed Server.

## Decision

Use Astro with Starlight and static output. Keep English and Simplified Chinese
documents in parallel locale directories. Generate API reference from the
Server OpenAPI contract in a later vertical slice.

## Consequences

The site is portable to static hosts and easy to validate in CI. Cross-repository
contract synchronization requires an explicit versioned import workflow.
