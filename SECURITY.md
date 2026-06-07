# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |

## Scope

This repository contains only JSON deck data files and build scripts. There is no executable code shipped to end users. The attack surface is intentionally narrow.

### What the validator enforces on every PR

- **Field allowlist** — only known top-level fields are permitted (`id`, `name`, `description`, `cardCount`, `supportsReversals`, `isBuiltIn`, `sourceUrl`, `metadata`, `cards`). Unknown fields are a hard error.
- **sourceUrl pinned to this repo** — any `sourceUrl` must begin with `https://github.com/w8s/obsidian-tarot-decks/releases/download/`. External URLs are a hard error.
- **Structural integrity** — valid JSON, required fields present, `cardCount` matches actual card array length, no duplicate indices, no missing card names.

### What is not in scope

- The build scripts (`scripts/`) are dev tooling, not shipped to users.
- The `archiver` npm dependency is used only at release time to zip deck files.

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report them privately via [GitHub's private vulnerability reporting](https://github.com/w8s/obsidian-tarot-decks/security/advisories/new).

Relevant things to report:
- A bypass of the `sourceUrl` validation that could redirect users to a malicious download
- An unknown field that the consuming plugin (`obsidian-tarot-practice`) would process unsafely
- A structural flaw in a deck file that could cause a crash or data corruption in the plugin

I'll acknowledge within a few days and aim to release a fix within 30 days depending on severity.
