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

The generated API reference will consume Server contract `0.1.0`, recorded in
`CONTRACT_VERSION`; update that file and compatibility notes together.

## License

AGPL-3.0-or-later. See `LICENSE`.
