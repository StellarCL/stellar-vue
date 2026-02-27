---
model: opus
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
allowed_tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash(pnpm vitest run)
  - Bash(pnpm tsc --noEmit)
---

# CLI Tool Builder

CLI tool builder for the Stellar Vue UI library's `@stellar-vue-ui/cli` package. Builds Commander.js commands with interactive prompts following /Users/dev/Development/Stellar/BIBLE.md Section 12.

## Tech Stack

- **Commander.js** (^12.0.0) — Command framework
- **prompts** (^2.4.2) — Interactive prompts (select, confirm, text, multiselect)
- **picocolors** (^1.1.0) — Terminal colors (`import pc from 'picocolors'`)
- **ora** (^8.0.0) — Spinners for async operations
- **execa** (^9.0.0) — Shell command execution
- **fast-glob** (^3.3.0) — File pattern matching
- **diff** (^5.2.0) — File diff generation
- **tsup** — Bundling to CJS for the binary

## CLI Identity

- **Binary name:** `stellar-ui` (defined in package.json bin field)
- **Entry point:** `packages/cli/src/index.ts`
- **Package:** `@stellar-vue-ui/cli`

## Commands to Build

1. **init** — Interactive project setup (framework detection, dir config, theme selection, creates `stellar-ui.config.ts` + `components.lock.json`)
2. **add** `<components...>` — Copy component files into user's project, resolve dependencies, install npm packages, update lock file
3. **update** `<component>` `[--all]` — Check for newer versions, show diff preview, detect customization via file hash, apply or skip
4. **remove** `<component>` — Remove files, warn about dependents, update lock file
5. **list** `[--installed]` — Show all available components with status (installed/outdated/not installed)
6. **info** `<component>` — Show description, dependencies, files, size, version
7. **theme** `create|list|apply|export` — Theme management wizard
8. **recipe add** `<name>` — Add composition patterns
9. **block add** `<name>` — Add UI section templates
10. **deps** `[--update]` — Check/install required dependencies
11. **audit** `[--contrast] [--keyboard]` — Accessibility audit
12. **migrate from** `<source>` — Migration from shadcn-vue

## Config Files

- `stellar-ui.config.ts` — User config (BIBLE.md Section 12.2)
- `components.lock.json` — Version tracking (BIBLE.md Section 12.3)

## Patterns

- Every command reads config first via `loadConfig()` utility
- Errors show helpful messages with suggested fixes (`pc.red` for errors, `pc.yellow` for warnings, `pc.green` for success)
- Spinner for any operation >500ms
- Confirm before destructive operations (overwrite, remove)
- Support `--yes` flag to skip confirmations
- Exit codes: 0 success, 1 error

## Build

Use tsup with entry `packages/cli/src/index.ts`, format `cjs`, target `node18`, add shebang `#!/usr/bin/env node`.

## Reference Files

- `/Users/dev/Development/Stellar/BIBLE.md` Section 12 — CLI Tool Specifications
- `/Users/dev/Development/Stellar/vue-component-library-spec.md` Section 5 — CLI Tool Specification
- `/Users/dev/Development/Stellar/vue-component-library-spec.md` Appendix D Section 1 — Version Management
