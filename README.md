# VoiceAsset Site

The bilingual product and documentation site for VoiceAsset. It uses Astro and
Starlight and builds to static files without requiring a running Server.

## Development

Requirements: Node.js 22.12 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Run all local validation with:

```bash
pnpm test
```

Implementation status must remain factual. Use only `Stable`, `Beta`,
`Experimental`, or `Planned`, and never publish download links for artifacts
that have not been produced and verified.

The generated API reference consumes Server contract `0.22.0`, recorded in
`CONTRACT_VERSION`. With the sibling Server repository present, synchronize the
downloadable contract and both localized operation indexes with:

```bash
pnpm generate:api-reference
```

`pnpm test` rejects generated-reference drift, missing required pages, locale
asymmetry, broken internal links, basic accessibility structure, and production
dependencies without license metadata.

## Release artifact validation

After `pnpm test`, package the validated `dist/` directory into a new empty
directory:

```bash
bash scripts/build-release.sh v0.1.0 dist-release
pnpm licenses:report
mv third-party-licenses.json dist-release/
bash scripts/write-checksums.sh dist-release
bash scripts/verify-release.sh v0.1.0 dist-release
```

The archive normalizes entry order, timestamps, ownership, and gzip metadata.
The verifier rejects unsafe paths, symlinks, unexpected artifacts, incomplete
checksums, an empty license inventory, contract drift, or content that differs
from `dist/`. Tag CI additionally requires and validates the CycloneDX SBOM
before it creates a draft prerelease.

## License

AGPL-3.0-or-later. See `LICENSE`.
