# TASKS.md - Stellar Vue UI Implementation Tasks

**Version:** 1.0.0
**Project Root:** /Users/dev/Development/Stellar
**Spec File:** /Users/dev/Development/Stellar/vue-component-library-spec.md
**Bible File:** /Users/dev/Development/Stellar/BIBLE.md

---

## PHASE 0: PROJECT INITIALIZATION

Set up the monorepo skeleton, git repository, and all package.json files. No code yet — just structure and configuration manifests.

---

### Task 0.1: Create Monorepo Directory Structure

- **ID:** 0.1
- **Phase:** 0
- **Depends On:** None
- **Model:** sonnet

**Prompt:**

> ## Task: Create Monorepo Directory Structure
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 2.1 (Monorepo Layout)
>
> **Context:** This is a brand-new blank project. We need the complete directory structure for a pnpm + Turborepo monorepo. Every subsequent task depends on this skeleton existing.
>
> **Instructions:**
>
> **Step 1: Create all package directories**
> Create the full directory tree as specified in BIBLE.md Section 2.1:
>
> - .github/workflows/
> - .github/ISSUE_TEMPLATE/
> - packages/core/src/components/
> - packages/core/src/composables/
> - packages/core/src/utils/
> - packages/core/src/types/
> - packages/cli/src/commands/
> - packages/cli/src/utils/
> - packages/cli/src/templates/
> - packages/nuxt/src/runtime/composables/
> - packages/nuxt/src/runtime/components/
> - packages/nuxt/src/runtime/plugins/
> - packages/nuxt/src/types/
> - packages/nuxt/playground/
> - packages/theme/src/themes/
> - packages/theme/src/tokens/
> - packages/theme/src/generator/
> - packages/theme/src/validator/
> - packages/animations/src/transitions/
> - packages/animations/src/composables/
> - packages/test-utils/src/wrappers/
> - packages/test-utils/src/mocks/
> - packages/test-utils/src/matchers/
> - apps/docs/.vitepress/theme/
> - apps/docs/.vitepress/components/
> - apps/docs/guide/
> - apps/docs/components/
> - apps/docs/composables/
> - apps/docs/examples/
> - apps/docs/recipes/
> - apps/docs/blocks/
> - apps/docs/api/
> - apps/playground/src/
> - apps/examples/basic-vue/
> - apps/examples/nuxt-app/
> - apps/examples/vite-ts/
> - tooling/eslint-config/
> - tooling/tsconfig/
> - tooling/prettier-config/
> - tests/unit/
> - tests/integration/
> - tests/e2e/
> - tests/a11y/
> - scripts/
> - .changeset/
> - .husky/
>
> **Step 2: Add .gitkeep files**
> Place a .gitkeep file in every empty leaf directory so git tracks them.
>
> **Step 3: Create root README.md**
> Create a minimal README.md with project name (Stellar Vue UI), tagline from BIBLE.md Section 1.1, "Under Development" badge, MIT license mention.
>
> **Step 4: Create LICENSE file**
> Create an MIT license file with copyright "2026 Terry McCann".
>
> **Step 5: Create .gitignore**
> Comprehensive .gitignore for: node_modules, dist, .output, .nuxt, IDE files (.vscode, .idea), OS files (.DS_Store, Thumbs.db), environment files (.env, .env.local), coverage and test results, Turbo cache (.turbo). Lock files should NOT be ignored.
>
> **Step 6: Create .npmrc**
> Contents: shamefully-hoist=false, strict-peer-dependencies=false, auto-install-peers=true

**Success Criteria:**
- All directories from BIBLE.md Section 2.1 exist
- Every empty leaf directory has a .gitkeep
- README.md, LICENSE, .gitignore, .npmrc exist at root
- No extraneous directories outside the spec

**Outputs:** README.md, LICENSE, .gitignore, .npmrc, packages/, apps/, tooling/, tests/, scripts/

**Done When:** All directories created matching BIBLE.md Section 2.1 layout with .gitkeep files, and root config files in place.

---

### Task 0.2: Initialize Git Repository and Hooks

- **ID:** 0.2
- **Phase:** 0
- **Depends On:** 0.1
- **Model:** sonnet

**Prompt:**

> ## Task: Initialize Git Repository and Hooks
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 5 (Development Workflow)
>
> **Context:** The directory structure is in place. We need git initialized with proper hooks for commit message linting and pre-commit checks.
>
> **Instructions:**
>
> **Step 1:** Initialize git repository with `git init`.
>
> **Step 2:** Stage all files and create the initial commit with message: `chore: initial project structure`
>
> **Step 3:** Create and push the `develop` branch from `main`.
>
> **Step 4: Create GitHub templates**
> - `.github/PULL_REQUEST_TEMPLATE.md` with: Summary section, type of change (feature, fix, refactor, docs), checklist (tests, docs, accessibility, types, no console.logs)
> - `.github/ISSUE_TEMPLATE/bug_report.md` with: Description, steps to reproduce, expected behavior, screenshots, environment
> - `.github/ISSUE_TEMPLATE/feature_request.md` with: Description, use case, proposed solution, alternatives considered
>
> **Step 5: Create CONTRIBUTING.md**
> Write a contribution guide covering: Development setup (clone, pnpm install, pnpm dev), branch naming convention from BIBLE.md Section 5.1, commit message convention from BIBLE.md Section 5.2, PR process from BIBLE.md Section 5.3, component checklist from BIBLE.md Appendix A.
>
> **Step 6: Create CODE_OF_CONDUCT.md**
> Use the Contributor Covenant v2.1 with contact: Terry McCann.

**Success Criteria:**
- `git log` shows initial commit
- `.github/` contains PR template and issue templates
- CONTRIBUTING.md covers all workflow topics from BIBLE.md Section 5
- CODE_OF_CONDUCT.md exists

**Outputs:** .github/PULL_REQUEST_TEMPLATE.md, .github/ISSUE_TEMPLATE/bug_report.md, .github/ISSUE_TEMPLATE/feature_request.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md

**Done When:** Git repo initialized with initial commit, GitHub templates, and contribution docs in place.

---

### Task 0.3: Create All Package Manifests

- **ID:** 0.3
- **Phase:** 0
- **Depends On:** 0.1
- **Model:** opus

**Prompt:**

> ## Task: Create All Package Manifests
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 4 (Package Configuration)
>
> **Context:** Every package in the monorepo needs a properly configured package.json. These must use exact versions and scopes from BIBLE.md Section 4.
>
> **Instructions:**
>
> **Step 1: Create root package.json**
> Use the EXACT configuration from BIBLE.md Section 4.1, including: name "stellar-vue-ui-monorepo", private true, packageManager "pnpm@9.14.2", all scripts (dev, build, test, lint, etc.), all devDependencies with exact versions from BIBLE.md Section 3.
>
> **Step 2: Create pnpm-workspace.yaml**
> Packages: "packages/*", "apps/*", "tooling/*"
>
> **Step 3: Create packages/core/package.json**
> Use the EXACT configuration from BIBLE.md Section 4.2: name "@stellar-vue-ui/core", proper exports map with types/import/require, sideEffects false, peerDependencies (vue >=3.6.0, @vueuse/core >=11.0.0), dependencies (radix-vue, clsx, tailwind-merge, class-variance-authority).
>
> **Step 4: Create packages/cli/package.json**
> Use the EXACT configuration from BIBLE.md Section 4.3: name "@stellar-vue-ui/cli", bin { "stellar-ui": "./dist/index.cjs" }, dependencies (commander, prompts, picocolors, ora, execa, fast-glob, diff).
>
> **Step 5: Create packages/nuxt/package.json**
> Name "@stellar-vue-ui/nuxt", main "./dist/module.mjs", types "./dist/module.d.ts", peerDependencies (nuxt >=4.0.0), dependencies (@stellar-vue-ui/core workspace:*).
>
> **Step 6: Create packages/theme/package.json**
> Name "@stellar-vue-ui/theme", exports with types/import/require, dependencies (culori for color conversion).
>
> **Step 7: Create packages/animations/package.json**
> Name "@stellar-vue-ui/animations", peerDependencies (vue >=3.6.0).
>
> **Step 8: Create packages/test-utils/package.json**
> Name "@stellar-vue-ui/test-utils", peerDependencies (vitest >=3.0.0, @vue/test-utils >=2.4.0, vue >=3.6.0).
>
> **Step 9: Create tooling package.json files**
> - tooling/eslint-config/package.json (name: "@stellar-vue-ui/eslint-config")
> - tooling/tsconfig/package.json (name: "@stellar-vue-ui/tsconfig")
> - tooling/prettier-config/package.json (name: "@stellar-vue-ui/prettier-config")
>
> **Step 10: Create apps package.json files**
> - apps/docs/package.json (VitePress-based)
> - apps/playground/package.json (Vite + Vue app)
>
> All packages should have version "0.1.0" and license "MIT". Use workspace protocol (workspace:*) for internal dependencies.

**Success Criteria:**
- All package.json files match BIBLE.md Section 4 exactly
- pnpm-workspace.yaml correctly lists all workspace patterns
- Package names use @stellar-vue-ui/* scope
- Internal deps use workspace:* protocol
- All versions match BIBLE.md Section 3 Technology Stack

**Edge Cases:**
- Ensure no duplicate dependency versions across packages
- Ensure engines field specifies node >=18.0.0 on root

**Outputs:** package.json, pnpm-workspace.yaml, packages/core/package.json, packages/cli/package.json, packages/nuxt/package.json, packages/theme/package.json, packages/animations/package.json, packages/test-utils/package.json, tooling/eslint-config/package.json, tooling/tsconfig/package.json, tooling/prettier-config/package.json, apps/docs/package.json, apps/playground/package.json

**Done When:** All package.json files created with correct names, versions, dependencies, and workspace references; pnpm-workspace.yaml configured.

---

## PHASE 1: BUILD TOOLING AND CONFIGURATION

Install dependencies, configure TypeScript, ESLint, Prettier, Turborepo, Husky, lint-staged, and Changesets.

---

### Task 1.1: Install Dependencies and Configure pnpm

- **ID:** 1.1
- **Phase:** 1
- **Depends On:** 0.3
- **Model:** sonnet

**Prompt:**

> ## Task: Install Dependencies and Configure pnpm
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 3 (Technology Stack)
>
> **Context:** All package.json files are in place. We need to run pnpm install to resolve the workspace and fetch all dependencies.
>
> **Instructions:**
>
> **Step 1:** Verify pnpm version is >= 9.0.0. If not, install with `corepack enable && corepack prepare pnpm@9.14.2 --activate`.
>
> **Step 2:** Run `pnpm install` to install all dependencies.
>
> **Step 3:** Verify workspace resolution with `pnpm ls --depth 0 -r`. Ensure all workspace packages are linked correctly.
>
> **Step 4:** Fix any peer dependency warnings. Review output and adjust package.json files if there are critical warnings.

**Success Criteria:**
- `pnpm install` completes without errors
- pnpm-lock.yaml is generated
- All workspace packages are linked
- No critical peer dependency warnings

**Outputs:** pnpm-lock.yaml, node_modules/

**Done When:** pnpm install succeeds, lock file generated, all workspace packages linked.

---

### Task 1.2: Configure TypeScript Across Monorepo

- **ID:** 1.2
- **Phase:** 1
- **Depends On:** 1.1
- **Model:** opus

**Prompt:**

> ## Task: Configure TypeScript Across Monorepo
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Sections 3.1 and 14.1
>
> **Context:** TypeScript strict mode is required per BIBLE.md. Each package needs its own tsconfig.json that extends a shared base. This enables independent compilation while maintaining consistent settings.
>
> **Instructions:**
>
> **Step 1: Create shared base tsconfig**
> File: tooling/tsconfig/base.json
> compilerOptions: strict true, target ES2022, module ESNext, moduleResolution bundler, esModuleInterop true, skipLibCheck true, forceConsistentCasingInFileNames true, resolveJsonModule true, isolatedModules true, declaration true, declarationMap true, sourceMap true, noUnusedLocals true, noUnusedParameters true, noFallthroughCasesInSwitch true, noUncheckedIndexedAccess true. Exclude node_modules and dist.
>
> **Step 2: Create Vue-specific tsconfig**
> File: tooling/tsconfig/vue.json — Extends base.json, adds: jsx "preserve", jsxImportSource "vue", types ["vite/client"], paths with "@/*" alias.
>
> **Step 3: Create Nuxt-specific tsconfig**
> File: tooling/tsconfig/nuxt.json — Extends vue.json with Nuxt-specific types.
>
> **Step 4: Create root tsconfig.json**
> Extends tooling/tsconfig/base.json with project references to all packages.
>
> **Step 5: Create per-package tsconfig.json files**
> Each package extends the appropriate shared config:
> - packages/core → extends vue.json
> - packages/cli → extends base.json
> - packages/nuxt → extends nuxt.json
> - packages/theme → extends base.json
> - packages/animations → extends vue.json
> - packages/test-utils → extends vue.json
>
> **Step 6: Create env.d.ts for Vue types**
> File: packages/core/src/types/global.d.ts — Declare module for .vue files and any global type augmentations.
>
> **Step 7:** Verify TypeScript compiles with `pnpm exec tsc --noEmit --project packages/core/tsconfig.json`

**Success Criteria:**
- Shared tsconfig files in tooling/tsconfig/ (base, vue, nuxt)
- Every package has tsconfig.json extending the correct shared config
- TypeScript strict mode enabled everywhere
- `tsc --noEmit` passes for all packages (may have no source files yet, that's OK)
- Path aliases configured (@/* → src/*)

**Edge Cases:**
- Vue SFC type support via volar/vue-tsc
- Ensure .vue files are recognized by TypeScript

**Outputs:** tooling/tsconfig/base.json, tooling/tsconfig/vue.json, tooling/tsconfig/nuxt.json, tsconfig.json, packages/core/tsconfig.json, packages/cli/tsconfig.json, packages/nuxt/tsconfig.json, packages/theme/tsconfig.json, packages/animations/tsconfig.json, packages/test-utils/tsconfig.json, packages/core/src/types/global.d.ts

**Done When:** All tsconfig files created, strict mode enabled, tsc --noEmit passes for each package.

---

### Task 1.3: Configure ESLint and Prettier

- **ID:** 1.3
- **Phase:** 1
- **Depends On:** 1.1
- **Model:** sonnet

**Prompt:**

> ## Task: Configure ESLint and Prettier
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 3.2 (Development Dependencies) and Section 14 (Code Style Guide)
>
> **Context:** Code quality tooling is critical before writing any component code. BIBLE.md specifies @antfu/eslint-config for ESLint and standard Prettier.
>
> **Instructions:**
>
> **Step 1:** Create tooling/eslint-config/index.js — Use @antfu/eslint-config with: Vue support enabled, TypeScript support enabled, no semicolons (antfu default), single quotes, disable rules that conflict with Prettier, ignore dist/node_modules/.nuxt/.output.
>
> **Step 2:** Create root eslint.config.js — Import and use the shared config.
>
> **Step 3:** Create tooling/prettier-config/index.js — semi false, singleQuote true, trailingComma "all", printWidth 100, tabWidth 2, useTabs false, bracketSpacing true, arrowParens "always", endOfLine "lf", vueIndentScriptAndStyle false.
>
> **Step 4:** Create root .prettierrc.js — Import and re-export the shared config.
>
> **Step 5:** Create .prettierignore — Ignore: dist, node_modules, pnpm-lock.yaml, .nuxt, .output, coverage, *.d.ts
>
> **Step 6:** Create .editorconfig — utf-8, lf, 2-space indent, trim trailing whitespace, final newline.
>
> **Step 7:** Verify linting works with `pnpm lint`.

**Success Criteria:**
- `pnpm lint` runs without crashing (may have 0 files to lint)
- `pnpm format` runs without crashing
- ESLint config handles .vue, .ts, .js files
- Prettier config matches BIBLE.md Section 14 code style
- .editorconfig present

**Outputs:** tooling/eslint-config/index.js, tooling/prettier-config/index.js, eslint.config.js, .prettierrc.js, .prettierignore, .editorconfig

**Done When:** ESLint and Prettier configured and running successfully across the monorepo.

---

### Task 1.4: Configure Turborepo Build Pipeline

- **ID:** 1.4
- **Phase:** 1
- **Depends On:** 1.1
- **Model:** sonnet

**Prompt:**

> ## Task: Configure Turborepo Build Pipeline
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 2.2 (Monorepo Tool)
>
> **Context:** Turborepo orchestrates builds, tests, and linting across all packages. It needs to understand the dependency graph and caching strategy.
>
> **Instructions:**
>
> **Step 1: Create turbo.json**
> Define tasks: build (dependsOn ^build, outputs dist/**, cache true), dev (dependsOn ^build, cache false, persistent true), test (dependsOn build, cache true), test:unit (cache true), lint (cache true), typecheck (dependsOn ^build, cache true), clean (cache false).
>
> **Step 2: Add per-package build scripts**
> Add to each package's package.json where applicable: "build" (appropriate build command), "dev" (appropriate dev command), "typecheck" ("tsc --noEmit"), "clean" ("rm -rf dist"). For packages/core use vite build with lib mode. For packages/cli use tsup. For packages/theme use tsup. For apps/docs use vitepress build.
>
> **Step 3:** Verify turbo runs with `pnpm turbo build --dry-run`.

**Success Criteria:**
- turbo.json exists with correct task definitions
- `pnpm turbo build --dry-run` shows correct dependency graph
- Each package has build, dev, typecheck, clean scripts
- Caching configured for build, test, lint, typecheck

**Outputs:** turbo.json

**Done When:** Turborepo configured with correct task pipeline, dependency graph resolves correctly in dry-run.

---

### Task 1.5: Configure Husky, lint-staged, and Changesets

- **ID:** 1.5
- **Phase:** 1
- **Depends On:** 1.3
- **Model:** sonnet

**Prompt:**

> ## Task: Configure Husky, lint-staged, and Changesets
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Sections 5.2 (Commit Convention) and 11 (Release Process)
>
> **Context:** Git hooks enforce code quality at commit time. Changesets manage versioning and changelogs across the monorepo.
>
> **Instructions:**
>
> **Step 1:** Initialize Husky with `pnpm exec husky init`.
>
> **Step 2:** Create .husky/pre-commit — Run lint-staged on staged files.
>
> **Step 3:** Create .husky/commit-msg — Validate commit message follows Conventional Commits format from BIBLE.md Section 5.2. Use a simple script or commitlint.
>
> **Step 4:** Configure lint-staged in root package.json: "*.{ts,tsx,vue}" runs ["eslint --fix"], "*.{ts,tsx,vue,css,md,json}" runs ["prettier --write"].
>
> **Step 5:** Initialize Changesets with `pnpm exec changeset init`. Configure .changeset/config.json: access "public", baseBranch "main", updateInternalDependencies "patch", changelog "@changesets/cli/changelog".
>
> **Step 6:** Create CHANGELOG.md following the format from BIBLE.md Section 11.3.

**Success Criteria:**
- `git commit` triggers lint-staged (verify with a test commit)
- Invalid commit messages are rejected
- .changeset/config.json exists with correct settings
- CHANGELOG.md exists with proper template

**Edge Cases:**
- Ensure hooks are executable (chmod +x)
- Husky should work on macOS and Linux

**Outputs:** .husky/pre-commit, .husky/commit-msg, .changeset/config.json, CHANGELOG.md

**Done When:** Git hooks enforce linting on commit, commit messages validated, Changesets initialized.

---

## PHASE 2: CORE INFRASTRUCTURE AND STYLING

Build the foundational code that every component depends on: utility functions, variant system, Tailwind CSS configuration, and the base styling layer.

---

### Task 2.1: Create Core Utility Functions

- **ID:** 2.1
- **Phase:** 2
- **Depends On:** 1.2
- **Model:** sonnet

**Prompt:**

> ## Task: Create Core Utility Functions
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 7.2 (Utility Functions) and vue-component-library-spec.md Section 4
>
> **Context:** The cn() utility and variant system are used by every single component. These must be in place before any component work begins.
>
> **Instructions:**
>
> **Step 1: Create cn utility**
> File: packages/core/src/utils/cn.ts — Import ClassValue from clsx and twMerge from tailwind-merge. Export function cn(...inputs: ClassValue[]): string that returns twMerge(clsx(inputs)). Include full JSDoc with @example.
>
> **Step 2: Create variant system helper**
> File: packages/core/src/utils/variants.ts — Re-export cva and VariantProps from class-variance-authority.
>
> **Step 3: Create utils index**
> File: packages/core/src/utils/index.ts — Export all utilities.
>
> **Step 4: Create core type definitions**
> File: packages/core/src/types/components.ts — Define shared types: BaseComponentProps (class, id), Size type ('sm' | 'md' | 'lg'), Variant type, Orientation type ('horizontal' | 'vertical').
>
> **Step 5: Create types index**
> File: packages/core/src/types/index.ts — Export all types.
>
> **Step 6: Create main package entry point**
> File: packages/core/src/index.ts — Export utils and types (components will be added later).
>
> **Step 7: Write unit tests for cn utility**
> File: packages/core/src/utils/cn.test.ts — Test cases: merges basic classes, handles conditional classes (falsy values), resolves Tailwind conflicts (e.g., px-4 vs px-6), handles empty inputs, handles undefined/null values.

**Success Criteria:**
- cn() correctly merges and deduplicates Tailwind classes
- VariantProps type is re-exported from CVA
- Shared component types are defined
- Unit tests pass for cn utility
- Package entry point exports all public API

**Outputs:** packages/core/src/utils/cn.ts, packages/core/src/utils/variants.ts, packages/core/src/utils/index.ts, packages/core/src/utils/cn.test.ts, packages/core/src/types/components.ts, packages/core/src/types/index.ts, packages/core/src/index.ts

**Done When:** cn() utility, variant helpers, and shared types created with passing tests.

---

### Task 2.2: Configure Tailwind CSS v4 and Design Tokens

- **ID:** 2.2
- **Phase:** 2
- **Depends On:** 1.1
- **Model:** opus

**Prompt:**

> ## Task: Configure Tailwind CSS v4 and Design Tokens
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 7 (Styling System) and vue-component-library-spec.md Section 10
>
> **Context:** Tailwind v4 uses CSS-first configuration with @theme directives instead of tailwind.config.js. This is the design token foundation that all components and themes build upon. The color system uses OKLCH color space.
>
> **Instructions:**
>
> **Step 1: Create the main CSS file with Tailwind v4 theme**
> File: packages/core/src/assets/app.css
>
> This file must contain:
> 1. @import "tailwindcss";
> 2. @theme block with ALL design tokens from BIBLE.md Section 7.1: full semantic color system (background, foreground, primary, secondary, accent, destructive, muted, card, popover, border, input, ring), each color pair (DEFAULT + foreground), additional semantic colors (success, warning, info with foreground pairs), border radius tokens (sm, md, lg, xl), container configuration, custom animation keyframes (accordion-down, accordion-up).
> 3. Dark mode colors using @media (prefers-color-scheme: dark) { @theme { } }
> 4. Class-based dark mode using .dark { @theme { } }
> 5. Custom keyframes for accordion animations
>
> Use OKLCH color values as specified in the spec.
>
> **Step 2: Create Vite config for core package**
> File: packages/core/vite.config.ts — Configure: vue() plugin, @tailwindcss/vite plugin, library mode build output, external dependencies (vue, radix-vue), proper entry point and output formats (es, cjs), dts generation.
>
> **Step 3: Create a base CSS file**
> File: packages/core/src/assets/base.css — Foundational reset/normalization plus custom base styles (smooth scrolling, antialiased text).
>
> **Step 4:** Verify Tailwind processes correctly. Ensure the CSS file is valid and all @theme tokens are properly defined.

**Success Criteria:**
- app.css contains full OKLCH color system from spec
- Both media-query and class-based dark mode defined
- All semantic color tokens have DEFAULT + foreground pairs
- Border radius, animation tokens defined
- Vite config set up for library mode build
- CSS is valid and parseable by Tailwind v4

**Edge Cases:**
- OKLCH values must be syntactically correct
- Ensure no Tailwind v3 syntax leaks in (no hsl(var(--color)) wrappers)
- Container queries should work without plugins in v4

**Outputs:** packages/core/src/assets/app.css, packages/core/src/assets/base.css, packages/core/vite.config.ts

**Done When:** Tailwind v4 configured with full OKLCH design token system, dark mode support, and Vite library build config.

---

### Task 2.3: Configure Vitest for Unit Testing

- **ID:** 2.3
- **Phase:** 2
- **Depends On:** 1.2, 2.2
- **Model:** sonnet

**Prompt:**

> ## Task: Configure Vitest for Unit Testing
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 9 (Testing Strategy)
>
> **Context:** Tests must work before we build components. Vitest needs to understand Vue SFC files, TypeScript, and Tailwind class assertions.
>
> **Instructions:**
>
> **Step 1: Create root vitest workspace config**
> File: vitest.workspace.ts — Define workspace projects for each package that has tests.
>
> **Step 2: Create vitest config for core package**
> File: packages/core/vitest.config.ts — plugins [vue()], test globals true, environment jsdom, include src/**/*.test.ts, coverage provider v8 with reporters [text, json, html], thresholds (statements 80, branches 75, functions 80, lines 80). Resolve alias @ to /src.
>
> **Step 3: Create test setup file**
> File: packages/core/src/test-setup.ts — Import global test utilities, mock IntersectionObserver, ResizeObserver, and other browser APIs not available in jsdom.
>
> **Step 4:** Run the existing cn.test.ts with `cd packages/core && pnpm vitest run`.

**Success Criteria:**
- `pnpm test:unit` runs from root via Turborepo
- `vitest run` passes in packages/core with cn.test.ts
- Coverage thresholds configured per BIBLE.md Section 9.4
- jsdom environment configured for Vue component testing
- Browser API mocks in place

**Outputs:** vitest.workspace.ts, packages/core/vitest.config.ts, packages/core/src/test-setup.ts

**Done When:** Vitest configured and running, cn.test.ts passes, coverage thresholds set.

---

## PHASE 3: THEME SYSTEM

Build the theme package with all 6 star-themed presets, the theme generator, validator, and useTheme composable.

---

### Task 3.1: Build Theme Package Foundation

- **ID:** 3.1
- **Phase:** 3
- **Depends On:** 2.2
- **Model:** opus

**Prompt:**

> ## Task: Build Theme Package Foundation
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix C (Advanced Theming Guide) and BIBLE.md Section 8
>
> **Context:** The theme system is a standalone package that provides design tokens, theme presets, and utilities for generating/validating themes. It is independent of the component package.
>
> **Instructions:**
>
> **Step 1: Create theme type definitions**
> File: packages/theme/src/types.ts — Define: ThemeColors interface (all semantic color pairs), ThemeBorderRadius interface, ThemeConfig interface (name, type, colors, borderRadius, shadows, animation), DefineThemeOptions interface (with optional extends field).
>
> **Step 2: Create defineTheme helper**
> File: packages/theme/src/generator/define-theme.ts — A type-safe helper function: `export function defineTheme(options: DefineThemeOptions): ThemeConfig`
>
> **Step 3: Create generateTheme utility**
> File: packages/theme/src/generator/generate-theme.ts — Takes a single brand color and generates a full palette. Uses culori for color manipulation. Generates complementary/analogous colors. Auto-calculates accessible foreground colors. Generates light and dark variants.
>
> **Step 4: Create theme CSS generator**
> File: packages/theme/src/generator/css-generator.ts — Converts a ThemeConfig into CSS @theme blocks: `export function generateCSS(theme: ThemeConfig): string`
>
> **Step 5: Create theme validator**
> File: packages/theme/src/validator/contrast-checker.ts — Checks WCAG contrast ratios between color pairs: `export function validateTheme(theme: ThemeConfig): ValidationIssue[]`. Must check all foreground/background pairs meet 4.5:1 for normal text.
>
> **Step 6: Create package entry point**
> File: packages/theme/src/index.ts — Export all public API.
>
> **Step 7: Write unit tests**
> Files: packages/theme/src/generator/define-theme.test.ts, packages/theme/src/validator/contrast-checker.test.ts — Test defineTheme returns valid config, generateTheme creates all required color tokens, validateTheme catches low-contrast pairs, CSS generator outputs valid @theme blocks.

**Success Criteria:**
- defineTheme() is type-safe and returns a complete ThemeConfig
- generateTheme() creates full palette from single color
- validateTheme() catches WCAG violations
- generateCSS() outputs valid Tailwind v4 @theme CSS
- All tests pass

**Outputs:** packages/theme/src/types.ts, packages/theme/src/generator/define-theme.ts, packages/theme/src/generator/generate-theme.ts, packages/theme/src/generator/css-generator.ts, packages/theme/src/validator/contrast-checker.ts, packages/theme/src/index.ts, packages/theme/src/generator/define-theme.test.ts, packages/theme/src/validator/contrast-checker.test.ts

**Done When:** Theme package foundation built with defineTheme, generateTheme, validateTheme, and CSS generator, all tests passing.

---

### Task 3.2: Create 6 Built-in Star-Themed Presets

- **ID:** 3.2
- **Phase:** 3
- **Depends On:** 3.1
- **Model:** opus

**Prompt:**

> ## Task: Create 6 Built-in Star-Themed Presets
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 8.1 (Built-in Themes) and vue-component-library-spec.md Appendix C
>
> **Context:** The library ships with 6 star-themed presets. Each must have light and dark variants with full semantic color coverage and WCAG AA compliance.
>
> **Instructions:**
>
> **Step 1:** Create packages/theme/src/themes/stellar.ts — Purple/cosmic palette based on brand colors (#667eea, #764ba2). Both light and dark variants. Must be the default theme.
>
> **Step 2:** Create packages/theme/src/themes/sirius.ts — Bright blue palette (inspired by the brightest star). Clean, professional feel.
>
> **Step 3:** Create packages/theme/src/themes/polaris.ts — Cool neutral palette (inspired by the North Star). Minimal, gray-scale with subtle cool tones.
>
> **Step 4:** Create packages/theme/src/themes/antares.ts — Warm red/orange palette (inspired by the red supergiant). Bold, warm, energetic feel.
>
> **Step 5:** Create packages/theme/src/themes/vega.ts — Green/teal palette (inspired by the blue-white star). Fresh, natural, calming feel.
>
> **Step 6:** Create packages/theme/src/themes/aldebaran.ts — Amber/gold palette (inspired by the orange giant). Warm, rich, luxurious feel.
>
> **Step 7:** Create packages/theme/src/themes/index.ts — Export all themes as named exports and as a themes array.
>
> **Step 8:** Write packages/theme/src/themes/themes.test.ts — Run validateTheme() on each preset and ensure all pass WCAG AA contrast requirements.
>
> For each theme, define ALL semantic colors using OKLCH: background, foreground, primary + foreground, secondary + foreground, accent + foreground, destructive + foreground, muted + foreground, card + foreground, popover + foreground, border, input, ring, success + foreground, warning + foreground, info + foreground.

**Success Criteria:**
- All 6 themes created with both light and dark variants
- Each theme has complete semantic color coverage
- All themes pass WCAG AA contrast validation
- Themes are visually distinct and match their star inspiration
- Themes index exports all themes correctly

**Outputs:** packages/theme/src/themes/stellar.ts, sirius.ts, polaris.ts, antares.ts, vega.ts, aldebaran.ts, index.ts, themes.test.ts

**Done When:** All 6 star-themed presets created with full OKLCH color systems, both light/dark variants, passing WCAG validation.

---

### Task 3.3: Create useTheme Composable

- **ID:** 3.3
- **Phase:** 3
- **Depends On:** 3.2, 2.1
- **Model:** sonnet

**Prompt:**

> ## Task: Create useTheme Composable
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix C (Theme Switching, Persistence)
>
> **Context:** Components and applications need a runtime API to switch themes, detect dark mode, and persist preferences.
>
> **Instructions:**
>
> **Step 1: Create useTheme composable**
> File: packages/core/src/composables/useTheme.ts
>
> API: theme (Readonly Ref string), isDark (Readonly Ref boolean), setTheme (function), toggleDark (function), themes (Readonly Ref string[]).
>
> Options: storage ('localStorage' | 'sessionStorage' | 'cookie', default localStorage), key (string, default 'stellar-theme'), sync (boolean, default true — sync across tabs), defaultTheme (string, default 'stellar').
>
> Implementation: Apply theme by setting data-theme attribute on html. Apply dark mode by toggling .dark class on html. Persist preference to storage. Listen for storage events to sync across tabs. Listen for system prefers-color-scheme changes. Use CSS custom properties to inject theme colors at runtime.
>
> **Step 2: Create useThemeTokens composable**
> File: packages/core/src/composables/useThemeTokens.ts — Provides reactive access to current theme token values by reading computed styles from the document root.
>
> **Step 3:** Create packages/core/src/composables/index.ts — Export useTheme and useThemeTokens.
>
> **Step 4: Write unit tests**
> File: packages/core/src/composables/useTheme.test.ts — Test: default theme is 'stellar', setTheme updates reactive value, toggleDark flips isDark, theme persists to localStorage (mock), themes list returns all available themes.

**Success Criteria:**
- useTheme() provides reactive theme state
- Theme switching applies data-theme attribute
- Dark mode toggling applies .dark class
- Preferences persist across page loads
- Cross-tab sync works via storage events
- All tests pass

**Outputs:** packages/core/src/composables/useTheme.ts, packages/core/src/composables/useThemeTokens.ts, packages/core/src/composables/index.ts, packages/core/src/composables/useTheme.test.ts

**Done When:** useTheme and useThemeTokens composables created with full reactivity, persistence, and passing tests.

---

## PHASE 4: TIER 1 COMPONENTS

Build the 15 foundational MVP components. Split into logical groups so each task stays within a single session.

---

### Task 4.1: Button Component

- **ID:** 4.1
- **Phase:** 4
- **Depends On:** 2.1, 2.2, 2.3
- **Model:** opus

**Prompt:**

> ## Task: Build Button Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards) and vue-component-library-spec.md Sections 3.2, 4.1
>
> **Context:** Button is the most fundamental component and establishes the pattern all other components will follow. It must be exemplary in structure, types, variants, accessibility, and tests.
>
> **Instructions:**
>
> Follow the EXACT component file structure from BIBLE.md Section 6.1.
>
> **Step 1: Create button types**
> File: packages/core/src/components/button/button.types.ts — Props: variant ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'), size ('sm' | 'md' | 'lg' | 'icon'), disabled (boolean), loading (boolean), asChild (boolean — Radix Vue slot forwarding), class (HTMLAttributes['class']). All props must have JSDoc comments.
>
> **Step 2: Create button variants**
> File: packages/core/src/components/button/button.variants.ts — Use CVA with the exact variants from vue-component-library-spec.md Section 4.1: 6 visual variants (default, destructive, outline, secondary, ghost, link), 4 sizes (sm, md, lg, icon), compound variant (outline + sm gets border-2), default variants (variant=default, size=md). Base classes: inline-flex, items-center, justify-center, rounded-md, font-medium, transition-colors, focus-visible ring, disabled opacity.
>
> **Step 3: Create Button.vue**
> File: packages/core/src/components/button/Button.vue — Use script setup lang="ts". Import types, variants, cn utility. Render as button by default or use Radix Vue Primitive for asChild. Support loading state with a spinner SVG. Disable pointer events and reduce opacity when loading. Forward all native button attributes. Proper aria-disabled when loading. Slot for content.
>
> **Step 4:** Create packages/core/src/components/button/index.ts — Export Button, buttonVariants, types.
>
> **Step 5:** Update packages/core/src/index.ts to export button.
>
> **Step 6: Write comprehensive unit tests**
> File: packages/core/src/components/button/button.test.ts — Test: renders default button with slot content, applies correct variant classes for each variant, applies correct size classes for each size, disabled state (sets disabled attribute, applies opacity), loading state (shows spinner, disables button, sets aria-disabled), emits click event, does NOT emit click when disabled, does NOT emit click when loading, merges custom classes via class prop, renders as different element with asChild, keyboard (responds to Enter and Space), has no accessibility violations (basic check).

**Success Criteria:**
- All 6 variants render with correct Tailwind classes
- All 4 sizes render correctly
- Loading state shows spinner and prevents interaction
- Disabled state prevents interaction
- Full TypeScript types with no `any`
- All unit tests pass with >90% coverage for the component
- Component follows BIBLE.md Section 6 structure exactly

**Edge Cases:**
- Button inside a form should not submit by default (type="button")
- asChild with router-link or `<a>` tag
- Loading + disabled simultaneously

**Outputs:** packages/core/src/components/button/Button.vue, button.types.ts, button.variants.ts, button.test.ts, index.ts

**Done When:** Button component complete with 6 variants, 4 sizes, loading/disabled states, full types, and all tests passing.

---

### Task 4.2: Label and Separator Components

- **ID:** 4.2
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Label and Separator Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Label and Separator are small, simple components grouped together because each can be completed quickly.
>
> **Instructions:**
>
> Follow the EXACT component file structure from BIBLE.md Section 6.1 for each.
>
> **Label Component** (packages/core/src/components/label/):
> Built on Radix Vue's Label primitive. Props: for (htmlFor), class, required (shows asterisk). Variants: default size, error state (text-destructive). Peer styling: peer-disabled:cursor-not-allowed peer-disabled:opacity-70. Proper `for` attribute linking to input id. Tests: renders, links to input, required asterisk, disabled styling.
>
> **Separator Component** (packages/core/src/components/separator/):
> Built on Radix Vue's Separator primitive. Props: orientation ('horizontal' | 'vertical'), decorative (boolean), class. Horizontal: h-[1px] w-full. Vertical: h-full w-[1px]. Uses bg-border color token. role="separator" or role="none" when decorative. Tests: renders horizontal/vertical, decorative mode, correct ARIA.
>
> Register both in main index.

**Success Criteria:**
- Label properly links to form inputs via htmlFor
- Label shows required indicator when required=true
- Separator renders horizontally and vertically
- Separator uses role="none" when decorative
- All tests pass for both components

**Outputs:** packages/core/src/components/label/, packages/core/src/components/separator/

**Done When:** Label and Separator components complete with Radix Vue primitives, full types, and all tests passing.

---

### Task 4.3: Badge, Skeleton, and Alert Components

- **ID:** 4.3
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Build Badge, Skeleton, and Alert Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Badge, Skeleton, and Alert are display-only components with no complex interaction patterns.
>
> **Instructions:**
>
> Follow the EXACT component file structure from BIBLE.md Section 6.1 for each.
>
> **Badge Component** (packages/core/src/components/badge/):
> Pure styled component (no Radix Vue needed). Props: variant ('default' | 'secondary' | 'destructive' | 'outline'), class. CVA variants: default (bg-primary text-primary-foreground), secondary (bg-secondary text-secondary-foreground), destructive (bg-destructive text-destructive-foreground), outline (border text-foreground). Base: inline-flex, items-center, rounded-full, px-2.5, py-0.5, text-xs, font-semibold, transition-colors. Default slot for content.
>
> **Skeleton Component** (packages/core/src/components/skeleton/):
> Pure styled component. Props: class, width, height. Base classes: animate-pulse, rounded-md, bg-muted. Accepts arbitrary width/height via style or class. role="status" with aria-label="Loading".
>
> **Alert Component** (packages/core/src/components/alert/):
> Props: variant ('default' | 'destructive' | 'success' | 'warning' | 'info'), class. Sub-components: Alert, AlertTitle, AlertDescription. CVA variants for background/border/text color per variant. role="alert" with aria-live="polite". Icon slot for leading icon. Base: relative, w-full, rounded-lg, border, p-4. AlertTitle: font-semibold, leading-none, tracking-tight. AlertDescription: text-sm, mt-1.
>
> Register all in main index.

**Success Criteria:**
- Badge renders 4 variants with correct styling
- Skeleton animates with pulse effect and accepts dimensions
- Alert renders 5 variants with title, description, and icon
- Alert has proper role="alert" and aria-live
- All tests pass for all three components

**Outputs:** packages/core/src/components/badge/, packages/core/src/components/skeleton/, packages/core/src/components/alert/

**Done When:** Badge, Skeleton, and Alert components complete with all variants, accessibility attributes, and passing tests.

---

### Task 4.4: Card Component

- **ID:** 4.4
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Card Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Card is a container component with structured sub-components. Heavily used in layouts and examples.
>
> **Instructions:**
>
> Follow the EXACT component file structure from BIBLE.md Section 6.1.
>
> **Sub-components** (packages/core/src/components/card/):
> - Card.vue — Root container. Rounded border, bg-card, text-card-foreground, shadow-sm.
> - CardHeader.vue — Flex column with gap, p-6.
> - CardTitle.vue — text-2xl, font-semibold, tracking-tight. Renders as h3.
> - CardDescription.vue — text-sm, text-muted-foreground.
> - CardContent.vue — p-6, pt-0.
> - CardFooter.vue — flex, items-center, p-6, pt-0.
>
> CardTitle also accepts `as` prop for heading level (h1-h6). Card supports one optional variant: 'default' | 'bordered' | 'elevated' (default: border bg-card shadow-sm, bordered: border-2 bg-card, elevated: bg-card shadow-lg).
>
> Tests: renders Card with all sub-components, applies variant classes, CardTitle renders correct heading level, accepts custom classes, slots render content correctly.

**Success Criteria:**
- All 6 sub-components render correctly
- Components compose together naturally
- CardTitle heading level is configurable
- All tests pass

**Outputs:** packages/core/src/components/card/

**Done When:** Card component with all 6 sub-components complete with tests.

---

### Task 4.5: Input and Textarea Components

- **ID:** 4.5
- **Phase:** 4
- **Depends On:** 4.1, 4.2
- **Model:** opus

**Prompt:**

> ## Task: Build Input and Textarea Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards) and vue-component-library-spec.md Section 3.2
>
> **Context:** Input and Textarea are the primary text entry components. They must support v-model, validation states, and work with the Label component.
>
> **Instructions:**
>
> **Input Component** (packages/core/src/components/input/):
> Native input element. Props: type (text, email, password, number, search, tel, url), modelValue, placeholder, disabled, required, readonly, error (boolean), class. v-model support via defineModel(). Variants: default, error (destructive border color). Base classes: flex, h-10, w-full, rounded-md, border, border-input, bg-background, px-3, py-2, text-sm, ring-offset-background, file styles, placeholder:text-muted-foreground, focus-visible ring, disabled styles. Error state: border-destructive, focus-visible:ring-destructive. Emits: update:modelValue, blur, focus, input. Generate unique id if not provided.
>
> **Textarea Component** (packages/core/src/components/textarea/):
> Native textarea element. Props: modelValue, placeholder, disabled, required, readonly, error, rows (default 3), class. v-model via defineModel(). Same styling pattern as Input with min-h-[80px] and resize support. Same error state behavior.
>
> Tests: renders with placeholder, v-model two-way binding, disabled state, error state styling, blur/focus events, custom classes, Input handles different types, Textarea respects rows prop.

**Success Criteria:**
- Input supports all specified type variants
- Both components support v-model with defineModel()
- Error state styling works
- Disabled state prevents interaction
- Both generate unique IDs for label association
- All tests pass

**Edge Cases:**
- Number input should handle non-numeric values gracefully
- Password input type should be toggleable
- Textarea auto-resize is NOT included (future composable)

**Outputs:** packages/core/src/components/input/, packages/core/src/components/textarea/

**Done When:** Input and Textarea components complete with v-model, error states, all types, and passing tests.

---

### Task 4.6: Checkbox, Radio Group, and Switch Components

- **ID:** 4.6
- **Phase:** 4
- **Depends On:** 4.1, 4.2
- **Model:** opus

**Prompt:**

> ## Task: Build Checkbox, Radio Group, and Switch Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** The three primary toggle/selection inputs. All built on Radix Vue primitives for accessibility. Must support v-model.
>
> **Instructions:**
>
> **Checkbox** (packages/core/src/components/checkbox/):
> Built on Radix Vue Checkbox primitive. Props: modelValue (boolean | 'indeterminate'), disabled, required, id, class. v-model support. Visual: border rounded, bg-primary when checked, check icon when checked. Indeterminate state: minus icon. Accessibility: keyboard Space to toggle.
>
> **Radio Group** (packages/core/src/components/radio-group/):
> Built on Radix Vue RadioGroup + RadioGroupItem. Components: RadioGroup, RadioGroupItem. RadioGroup props: modelValue, disabled, orientation, class. RadioGroupItem props: value, disabled, id, class. v-model on RadioGroup. Visual: circle border, filled circle indicator when selected. Accessibility: arrow keys navigate.
>
> **Switch** (packages/core/src/components/switch/):
> Built on Radix Vue Switch primitive. Props: modelValue (boolean), disabled, class. v-model support. Visual: rounded-full track (bg-input unchecked, bg-primary checked), circular thumb that slides. Transition animation. Size variants: sm, md, lg. Accessibility: role="switch", aria-checked.
>
> Tests: Checkbox toggles, supports indeterminate, keyboard Space. RadioGroup selects item, arrow key nav, v-model. Switch toggles, visual state change, keyboard Space. All: disabled state, proper ARIA, v-model binding.

**Success Criteria:**
- Checkbox supports checked, unchecked, and indeterminate states
- RadioGroup supports keyboard arrow key navigation
- Switch has smooth toggle animation
- All three support v-model via defineModel()
- All three use Radix Vue primitives
- All tests pass

**Outputs:** packages/core/src/components/checkbox/, packages/core/src/components/radio-group/, packages/core/src/components/switch/

**Done When:** Checkbox, RadioGroup, and Switch components built on Radix Vue with v-model, accessibility, and passing tests.

---

### Task 4.7: Select Component

- **ID:** 4.7
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Build Select Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Select is a complex component built on Radix Vue's Select primitive with trigger, content, items, groups, and separators.
>
> **Instructions:**
>
> Files in packages/core/src/components/select/
>
> **Sub-components:** Select (Radix SelectRoot), SelectTrigger, SelectValue, SelectContent (Teleport), SelectItem, SelectGroup, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton — 10 total.
>
> Implementation: Built on Radix Vue Select primitives. v-model for selected value. SelectTrigger styled like Input with chevron-down icon. SelectContent: bg-popover, rounded-md, border, shadow-md, animate in/out with scale + fade. SelectItem: hover:bg-accent, focus:bg-accent, check icon when selected. Keyboard: arrow keys, type-ahead, Enter to select, Escape to close. Teleport content to body. Position: 'popper'.
>
> Tests: opens on trigger click, selects item and updates v-model, keyboard navigation, displays selected value, groups and labels render, disabled items, content uses Teleport.

**Success Criteria:**
- All 10 sub-components work together
- v-model binding works correctly
- Full keyboard navigation (arrows, Enter, Escape, type-ahead)
- Content is teleported to body
- Smooth enter/exit animations
- All tests pass

**Edge Cases:**
- Long option lists should scroll
- Empty state when no options
- Placeholder display when no value selected

**Outputs:** packages/core/src/components/select/

**Done When:** Select component with all 10 sub-components built on Radix Vue, keyboard navigation, teleport, and passing tests.

---

### Task 4.8: Dialog (Modal) Component

- **ID:** 4.8
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Build Dialog (Modal) Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6, vue-component-library-spec.md Sections 3.2, 11.2
>
> **Context:** Dialog is a critical overlay component. It must trap focus, handle Escape key, and prevent background scroll. Built on Radix Vue Dialog.
>
> **Instructions:**
>
> Files in packages/core/src/components/dialog/
>
> **Sub-components:** Dialog (v-model:open), DialogTrigger, DialogPortal, DialogOverlay (backdrop blur), DialogContent, DialogHeader, DialogFooter, DialogTitle (aria-labelledby), DialogDescription, DialogClose (X icon) — 10 total.
>
> Implementation: v-model:open on root. Overlay: fixed inset-0, bg-black/80, backdrop-blur-sm, z-50. Content: fixed centered, z-50, bg-background, border, rounded-lg, shadow-lg, p-6, max-w-lg. Entry animation: fade in + scale up (0.95 → 1.0). Exit animation: fade out + scale down. Focus trap. Escape closes. Overlay click closes (configurable). Scroll lock on body. aria-modal="true", role="dialog". Close button in top-right with X icon.
>
> Tests: opens on trigger, closes on overlay click, closes on Escape, focus trapped, focus returns to trigger on close, v-model:open works, title/description provide accessible labels, teleported to body, body scroll locked.

**Success Criteria:**
- Focus trap works correctly (Tab cycles within dialog)
- Escape closes the dialog
- Overlay click closes the dialog
- Body scroll is locked
- Smooth enter/exit animations
- Proper ARIA: role="dialog", aria-modal, aria-labelledby, aria-describedby
- All tests pass

**Edge Cases:**
- Nested dialogs
- Dialog opened programmatically (without trigger)
- Long content scrolling within dialog

**Outputs:** packages/core/src/components/dialog/

**Done When:** Dialog component with 10 sub-components, focus trap, scroll lock, animations, full ARIA, and passing tests.

---

### Task 4.9: Dropdown Menu Component

- **ID:** 4.9
- **Phase:** 4
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Build Dropdown Menu Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Dropdown Menu is used for action menus, settings menus, and navigation. One of the most complex Radix Vue components with sub-menus, checkboxes, radio items, and groups.
>
> **Instructions:**
>
> Files in packages/core/src/components/dropdown-menu/
>
> **Sub-components (14 total):** DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut (keyboard shortcut display), DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger (with chevron-right), DropdownMenuSubContent.
>
> Implementation: Built on Radix Vue DropdownMenu primitives. Content: bg-popover, rounded-md, border, shadow-md, p-1, min-w-[8rem]. Item: relative, flex, cursor-default, select-none, rounded-sm, px-2, py-1.5, text-sm, focus:bg-accent, data-[disabled] styles. Animations: slide in from direction. Keyboard: arrow keys, Enter, Space, Escape, sub-menu via right arrow.
>
> Tests: opens on trigger, item click fires handler, keyboard navigation, checkbox items toggle, radio items select, sub-menus open/close, shortcut text displays, disabled items non-interactive.

**Success Criteria:**
- All 14 sub-components work together
- Full keyboard navigation per WAI-ARIA menu pattern
- Checkbox and radio items maintain state
- Sub-menus open on hover/right-arrow
- Smooth animations
- All tests pass

**Outputs:** packages/core/src/components/dropdown-menu/

**Done When:** DropdownMenu with all 14 sub-components, sub-menu support, checkbox/radio items, keyboard nav, and passing tests.

---

## PHASE 5: FORM SYSTEM

Build the form wrapper components and VeeValidate integration that connect form inputs into a cohesive validation system.

---

### Task 5.1: Build Form System Components with VeeValidate

- **ID:** 5.1
- **Phase:** 5
- **Depends On:** 4.2, 4.5, 4.6
- **Model:** opus

**Prompt:**

> ## Task: Build Form System Components with VeeValidate
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 8 (Form System)
>
> **Context:** The form system wraps VeeValidate to provide declarative form handling with automatic validation, error display, and accessibility. Form components compose with Input, Textarea, Checkbox, etc.
>
> **Instructions:**
>
> **Step 1: Create useFormField composable**
> File: packages/core/src/composables/useFormField.ts — Provides field context (error, touched, dirty, name, id) to child components using Vue's provide/inject.
>
> **Step 2: Create Form Components** (packages/core/src/components/form/):
>
> - Form.vue — Wraps VeeValidate's Form component. Props: validationSchema (Zod, Yup, or custom), initialValues, onSubmit. Provides form context. Handles submit with loading state.
> - FormField.vue — Wraps VeeValidate's Field. Props: name, rules, label, validateOnBlur/Change/Input. Provides field context via slot props.
> - FormItem.vue — Layout wrapper. Provides unique field ID. Flex column with gap.
> - FormLabel.vue — Extends Label component. Auto-connects to form field via ID. Error styling when field has error.
> - FormControl.vue — Input wrapper. Passes aria-describedby, aria-invalid, field ID.
> - FormDescription.vue — Help text. text-sm, text-muted-foreground. Has ID for aria-describedby.
> - FormMessage.vue — Error message. text-sm, text-destructive. Has ID for aria-describedby. role="alert".
>
> **Step 3:** Create form.types.ts.
>
> **Step 4: Write tests** — Form submits with valid data, shows errors for invalid data, FormMessage displays error text, FormLabel connects to input, aria-invalid set on error, aria-describedby links, Zod schema validation, field-level validation.
>
> **Step 5: Create useForm composable**
> File: packages/core/src/composables/useForm.ts — Wraps VeeValidate's useForm with our defaults and types. Supports Zod, Yup, and function validators.

**Success Criteria:**
- Form system integrates seamlessly with VeeValidate
- Zod schema validation produces field-level errors
- Error messages display automatically
- ARIA attributes link labels, descriptions, and errors correctly
- Form handles submission with loading state
- All tests pass

**Edge Cases:**
- Async validation (e.g., checking if username is taken)
- Cross-field validation (e.g., password confirmation)
- Dynamic form fields (added/removed at runtime)

**Outputs:** packages/core/src/components/form/, packages/core/src/composables/useFormField.ts, packages/core/src/composables/useForm.ts

**Done When:** Form system with 7 components and VeeValidate integration, Zod support, automatic ARIA linkage, and all tests passing.

---

## PHASE 6: CORE COMPOSABLES

Build the shared composables that components and users depend on.

---

### Task 6.1: Build UI State Composables

- **ID:** 6.1
- **Phase:** 6
- **Depends On:** 2.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build UI State Composables
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 7 (Composables System)
>
> **Context:** These composables encapsulate common UI state patterns. Used by components internally and exported for user consumption.
>
> **Instructions:**
>
> **Step 1: Create useDisclosure** (packages/core/src/composables/useDisclosure.ts) — Manages open/close state. Returns isOpen (readonly), open, close, toggle. Options: defaultOpen, onOpen callback, onClose callback.
>
> **Step 2: Create useToggle** (packages/core/src/composables/useToggle.ts) — Simple boolean toggle. Returns value (readonly), toggle, setTrue, setFalse.
>
> **Step 3: Create useSteps** (packages/core/src/composables/useSteps.ts) — Multi-step flow. Options: total, initial. Returns current (readonly), total, isFirst (readonly), isLast (readonly), next, prev, goTo, progress (0-100 readonly).
>
> **Step 4: Create usePagination** (packages/core/src/composables/usePagination.ts) — Pagination logic. Options: total (Ref or number), pageSize, page. Returns page, pageSize, totalPages (readonly), isFirstPage (readonly), isLastPage (readonly), next, prev, goTo, range (readonly {start, end}).
>
> **Step 5:** Write tests for all 4 composables.
>
> **Step 6:** Update composables index.

**Success Criteria:**
- All 4 composables have correct TypeScript types
- All expose readonly refs where appropriate
- Boundary conditions handled (can't go below step 1, above total, etc.)
- All tests pass
- Exported from package entry point

**Outputs:** packages/core/src/composables/useDisclosure.ts, useToggle.ts, useSteps.ts, usePagination.ts, plus test files

**Done When:** 4 UI state composables created with full types and passing tests.

---

### Task 6.2: Build Accessibility and Utility Composables

- **ID:** 6.2
- **Phase:** 6
- **Depends On:** 2.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Accessibility and Utility Composables
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 7 (Composables System)
>
> **Context:** Accessibility and utility composables support component internals and end-user consumption.
>
> **Instructions:**
>
> **Step 1: Create useFocusTrap** (packages/core/src/composables/useFocusTrap.ts) — Traps keyboard focus within a container element. Options: enabled (Ref or boolean), returnFocusOnDeactivate, initialFocus. Returns activate, deactivate, isActive (readonly). Finds all focusable elements, intercepts Tab/Shift+Tab, cycles focus.
>
> **Step 2: Create useKeyboardNav** (packages/core/src/composables/useKeyboardNav.ts) — Arrow key navigation within items. Options: items (Ref HTMLElement[]), orientation, loop. Returns activeIndex, onKeyDown.
>
> **Step 3: Create useDebounce** (packages/core/src/composables/useDebounce.ts) — Returns debounced readonly Ref of the input value.
>
> **Step 4: Create useMediaQuery** (packages/core/src/composables/useMediaQuery.ts) — Returns readonly Ref boolean for a media query string.
>
> **Step 5: Create useClipboard** (packages/core/src/composables/useClipboard.ts) — Returns copy function, copied state (readonly), isSupported boolean.
>
> **Step 6:** Write tests for all 5.
>
> **Step 7:** Update composables index.

**Success Criteria:**
- useFocusTrap correctly traps Tab/Shift+Tab within container
- useKeyboardNav handles arrow keys with optional looping
- useDebounce delays value updates
- useMediaQuery reacts to viewport changes (mocked in tests)
- useClipboard copies text and shows copied state
- All tests pass

**Outputs:** packages/core/src/composables/useFocusTrap.ts, useKeyboardNav.ts, useDebounce.ts, useMediaQuery.ts, useClipboard.ts

**Done When:** 5 accessibility/utility composables created with full types and passing tests.

---

## PHASE 7: TIER 2 COMPONENTS

Build the advanced components that extend the foundation.

---

### Task 7.1: Accordion Component

- **ID:** 7.1
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Accordion Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Accordion provides collapsible content sections. Built on Radix Vue Accordion primitive with smooth height animations.
>
> **Instructions:**
>
> Files in packages/core/src/components/accordion/
>
> **Sub-components:** Accordion (Radix AccordionRoot — type 'single' | 'multiple', collapsible, modelValue), AccordionItem (value, disabled, border-b), AccordionTrigger (chevron that rotates, full width, hover underline), AccordionContent (animated height using accordion-down/accordion-up keyframes, overflow-hidden, pb-4 pt-0).
>
> Animation: Use data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up from CSS theme keyframes.
>
> Tests: single mode (one open at a time), multiple mode, collapsible, keyboard (Enter/Space toggles, arrows navigate), disabled items, animation classes, v-model.

**Success Criteria:**
- Single and multiple modes work correctly
- Smooth height animation on open/close
- Keyboard navigation per WAI-ARIA accordion pattern
- All tests pass

**Outputs:** packages/core/src/components/accordion/

**Done When:** Accordion with 4 sub-components, animated height transitions, single/multiple modes, and passing tests.

---

### Task 7.2: Tabs Component

- **ID:** 7.2
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Tabs Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Tabs provide tabbed navigation for switching between content panels. Built on Radix Vue Tabs primitive.
>
> **Instructions:**
>
> Files in packages/core/src/components/tabs/
>
> **Sub-components:** Tabs (Radix TabsRoot — modelValue, defaultValue, orientation), TabsList (inline-flex, items-center, rounded-md, bg-muted, p-1), TabsTrigger (value, disabled — active state: bg-background, text-foreground, shadow-sm), TabsContent (value, mt-2, focus-visible ring).
>
> v-model for active tab. Keyboard: arrow keys switch tabs, Tab moves to panel. ARIA roles via Radix.
>
> Tests: default tab active, clicking switches content, keyboard arrow nav, Tab to panel, v-model, disabled tabs skipped.

**Success Criteria:**
- Tab switching works via click and keyboard
- Proper ARIA roles and attributes
- Active tab has visual distinction
- All tests pass

**Outputs:** packages/core/src/components/tabs/

**Done When:** Tabs with 4 sub-components, keyboard navigation, ARIA roles, and passing tests.

---

### Task 7.3: Popover and Tooltip Components

- **ID:** 7.3
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Popover and Tooltip Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Floating content components. Both use Radix Vue positioning. Tooltip is hover-triggered, Popover is click-triggered.
>
> **Instructions:**
>
> **Popover** (packages/core/src/components/popover/):
> Popover (Radix PopoverRoot), PopoverTrigger, PopoverContent (z-50, w-72, rounded-md, border, bg-popover, p-4, shadow-md, teleported, positioned with side/align/sideOffset props, enter/exit animations).
>
> **Tooltip** (packages/core/src/components/tooltip/):
> TooltipProvider (delayDuration default 200, skipDelayDuration), Tooltip (Radix TooltipRoot), TooltipTrigger, TooltipContent (z-50, rounded-md, border, bg-popover, px-3, py-1.5, text-sm, shadow-md, fade+slide animation, side/align/sideOffset props).
>
> Tests: Popover opens on click, closes on outside click, Escape. Tooltip shows on hover after delay, hides on leave. Both: positioning, teleport, animations.

**Success Criteria:**
- Popover opens on click, closes on outside click
- Tooltip shows on hover with configurable delay
- Both use Radix positioning (side, align, offset)
- Smooth animations
- All tests pass

**Outputs:** packages/core/src/components/popover/, packages/core/src/components/tooltip/

**Done When:** Popover and Tooltip components with Radix positioning, animations, and passing tests.

---

### Task 7.4: Avatar and Progress Components

- **ID:** 7.4
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Avatar and Progress Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Avatar displays user images with fallbacks. Progress shows completion indicators.
>
> **Instructions:**
>
> **Avatar** (packages/core/src/components/avatar/):
> Avatar (Radix AvatarRoot — sizes sm/md/lg/xl, rounded-full, overflow-hidden), AvatarImage (src, alt, object-cover), AvatarFallback (shows initials or icon, bg-muted, centered).
>
> **Progress** (packages/core/src/components/progress/):
> Built on Radix Vue Progress. Props: modelValue (0-100), max, class. Root: relative, h-4, w-full, overflow-hidden, rounded-full, bg-secondary. Indicator: h-full, bg-primary, rounded-full, transition-all. Width based on value percentage. aria-valuenow/min/max. Color variants: default, success, warning, destructive.
>
> Tests: Avatar shows image and fallback on error, size variants. Progress renders correct width, updates on value change, ARIA attributes.

**Success Criteria:**
- Avatar shows image and falls back to initials/icon
- Avatar has 4 size variants
- Progress bar width reflects value accurately
- Progress has correct ARIA value attributes
- All tests pass

**Outputs:** packages/core/src/components/avatar/, packages/core/src/components/progress/

**Done When:** Avatar and Progress components with variants, Radix primitives, and passing tests.

---

### Task 7.5: Slider Component

- **ID:** 7.5
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Slider Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Range input built on Radix Vue Slider with full keyboard support.
>
> **Instructions:**
>
> Files in packages/core/src/components/slider/
>
> **Sub-components:** Slider (Radix SliderRoot — modelValue number[], min 0, max 100, step 1, disabled, orientation), SliderTrack (h-2, w-full, rounded-full, bg-secondary), SliderRange (absolute, h-full, bg-primary), SliderThumb (h-5, w-5, rounded-full, border-2, border-primary, bg-background, focus ring, cursor grab/grabbing).
>
> Keyboard: arrows increment/decrement by step, Page Up/Down by 10x step. Supports range selection (two thumbs). ARIA: aria-valuemin/max/now/orientation.
>
> Tests: renders initial value, v-model updates, keyboard arrows, respects min/max/step, disabled state, ARIA attributes.

**Success Criteria:**
- Slider value changes via drag and keyboard
- Respects min, max, step constraints
- Supports range selection (two thumbs)
- Full ARIA support
- All tests pass

**Outputs:** packages/core/src/components/slider/

**Done When:** Slider with track, range, thumb sub-components, keyboard support, and passing tests.

---

### Task 7.6: Breadcrumb and Pagination Components

- **ID:** 7.6
- **Phase:** 7
- **Depends On:** 4.1, 6.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Breadcrumb and Pagination Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Navigation components. Pagination uses the usePagination composable.
>
> **Instructions:**
>
> **Breadcrumb** (packages/core/src/components/breadcrumb/):
> Breadcrumb (nav, aria-label="Breadcrumb"), BreadcrumbList (ol), BreadcrumbItem (li), BreadcrumbLink, BreadcrumbPage (aria-current="page"), BreadcrumbSeparator (default /, customizable), BreadcrumbEllipsis (...).
>
> **Pagination** (packages/core/src/components/pagination/):
> Pagination (nav, aria-label="pagination"), PaginationContent (ul flex), PaginationItem, PaginationLink (page number), PaginationPrevious (chevron-left), PaginationNext (chevron-right), PaginationEllipsis (...), PaginationFirst, PaginationLast. Props on root: total, pageSize, page, siblingCount. Uses usePagination composable internally.
>
> Tests: Breadcrumb renders items/separator/current page. Pagination correct page numbers, previous/next, ellipsis, disabled at bounds.

**Success Criteria:**
- Breadcrumb renders full trail with separators, marks current page with aria-current
- Pagination calculates correct page ranges
- Previous/Next disabled at first/last page
- Ellipsis shown for large page counts
- All tests pass

**Outputs:** packages/core/src/components/breadcrumb/, packages/core/src/components/pagination/

**Done When:** Breadcrumb and Pagination components with full sub-components, navigation logic, and passing tests.

---

### Task 7.7: Command Palette Component

- **ID:** 7.7
- **Phase:** 7
- **Depends On:** 4.5, 4.8
- **Model:** opus

**Prompt:**

> ## Task: Build Command Palette Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** The Command palette (Cmd+K) provides fuzzy search over actions and navigation.
>
> **Instructions:**
>
> Files in packages/core/src/components/command/
>
> **Sub-components (9 total):** Command (root with search context), CommandDialog (Command wrapped in Dialog for Cmd+K), CommandInput (search input with magnifying glass), CommandList (scrollable results), CommandEmpty (empty state), CommandGroup (group with heading), CommandItem (selectable item), CommandSeparator, CommandShortcut (keyboard shortcut display).
>
> Implementation: client-side fuzzy filtering, keyboard (up/down navigate, Enter selects, Escape closes), CommandDialog opens with Cmd+K/Ctrl+K, items can have icons/descriptions/shortcuts, highlighted item state with bg-accent, search input always focused when open, groups hidden when no items match.
>
> Tests: renders items/groups, search filters, keyboard nav, CommandDialog keyboard shortcut, empty state, selected item callback.

**Success Criteria:**
- Fuzzy search filters items in real-time
- Full keyboard navigation
- CommandDialog integrates with Dialog component
- Groups and separators organize items
- All tests pass

**Edge Cases:**
- Very long item lists (virtual scrolling not required for v1)
- Items with identical labels but different groups

**Outputs:** packages/core/src/components/command/

**Done When:** Command palette with 9 sub-components, fuzzy search, keyboard navigation, Dialog integration, and passing tests.

---

### Task 7.8: Context Menu and Menubar Components

- **ID:** 7.8
- **Phase:** 7
- **Depends On:** 4.9
- **Model:** sonnet

**Prompt:**

> ## Task: Build Context Menu and Menubar Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Context Menu and Menubar share DropdownMenu's structure. Context Menu triggered by right-click, Menubar is a horizontal menu bar.
>
> **Instructions:**
>
> **Context Menu** (packages/core/src/components/context-menu/):
> Mirrors DropdownMenu pattern — ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent. Key difference: opens on right-click, positioned at cursor.
>
> **Menubar** (packages/core/src/components/menubar/):
> Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarSub, MenubarSubTrigger, MenubarSubContent. Key difference: horizontal bar of triggers, each opening a dropdown. Trigger: h-10, px-3, font-medium, rounded-sm, hover:bg-accent.
>
> Tests: Context Menu opens on right-click, Menubar triggers open dropdowns, keyboard navigation between menus.

**Success Criteria:**
- Context Menu opens at cursor position on right-click
- Menubar renders horizontal menu triggers
- Both support full keyboard navigation
- Sub-menus, checkboxes, radio items work in both
- All tests pass

**Outputs:** packages/core/src/components/context-menu/, packages/core/src/components/menubar/

**Done When:** Context Menu and Menubar components with all sub-components, right-click/horizontal patterns, and passing tests.

---

### Task 7.9: Navigation Menu Component

- **ID:** 7.9
- **Phase:** 7
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Navigation Menu Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 6 (Component Standards)
>
> **Context:** Site-level navigation for headers. Built on Radix Vue NavigationMenu with mega-menu support.
>
> **Instructions:**
>
> Files in packages/core/src/components/navigation-menu/
>
> **Sub-components (8 total):** NavigationMenu (Radix NavigationMenuRoot), NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger (dropdown trigger with chevron), NavigationMenuContent (dropdown panel), NavigationMenuLink, NavigationMenuViewport (animated viewport container), NavigationMenuIndicator (active indicator line).
>
> Implementation: horizontal items, simple links or dropdown triggers, content panels for mega-menus, viewport animates between content sizes, indicator slides under active item. Keyboard: arrows navigate, Enter opens/follows.
>
> Tests: renders items, dropdown opens, keyboard navigation, links navigate, viewport animation.

**Success Criteria:**
- Horizontal navigation with dropdown support
- Smooth viewport animation between panels
- Full keyboard navigation
- Works as site header navigation
- All tests pass

**Outputs:** packages/core/src/components/navigation-menu/

**Done When:** Navigation Menu with 8 sub-components, mega-menu support, viewport animation, and passing tests.

---

### Task 7.10: Stepper and Wizard Components

- **ID:** 7.10
- **Phase:** 7
- **Depends On:** 5.1, 6.1
- **Model:** opus

**Prompt:**

> ## Task: Build Stepper and Wizard Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 5 (Multi-Step Forms/Wizard)
>
> **Context:** Stepper shows multi-step progress. Wizard wraps Stepper with form validation per step. Uses useSteps composable internally.
>
> **Instructions:**
>
> **Stepper** (packages/core/src/components/stepper/):
> Stepper (root with step context — steps StepConfig[], activeStep, orientation), StepperItem, StepperTrigger (circle + label), StepperSeparator (line between), StepperContent (content for active step). StepConfig: { title, description?, icon? }. States: completed (check icon), active (highlighted), upcoming (dimmed).
>
> **Wizard** (packages/core/src/components/wizard/):
> Wizard (root — v-model:step, total, validateOnNext), WizardStep (step, title, validate async function), WizardActions (Previous/Next/Submit buttons). Validates current step before allowing navigation to next. Uses useSteps composable.
>
> Tests: Stepper renders steps with active/completed/upcoming states. Wizard navigates steps, validates before next, submits on last step.

**Success Criteria:**
- Stepper displays horizontal/vertical step indicators
- Completed steps show check icon
- Wizard validates before advancing
- Wizard Previous/Next/Submit buttons work correctly
- All tests pass

**Edge Cases:**
- Async validation (server-side check)
- Programmatic step navigation
- Step with errors prevents navigation

**Outputs:** packages/core/src/components/stepper/, packages/core/src/components/wizard/

**Done When:** Stepper and Wizard components with step progression, validation, and passing tests.

---

### Task 7.11: Data Table Component

- **ID:** 7.11
- **Phase:** 7
- **Depends On:** 4.1, 4.5, 4.6, 7.6
- **Model:** opus

**Prompt:**

> ## Task: Build Data Table Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 3 (Advanced Data Table)
>
> **Context:** DataTable is the most complex Tier 2 component. This task covers core functionality: column definitions, sorting, pagination, and row selection.
>
> **Instructions:**
>
> Files in packages/core/src/components/data-table/
>
> **Sub-components (10 total):** DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableHead, DataTableCell, DataTablePagination (uses Pagination), DataTableColumnHeader (sortable with sort icon), DataTableToolbar (search/filters/actions area), DataTableRowActions (row-level action dropdown).
>
> **Core types** (data-table.types.ts): ColumnDef<T> with id, header, accessorKey, accessorFn, cell, enableSorting, enableHiding, size/minSize/maxSize.
>
> **useDataTable composable** (packages/core/src/composables/useDataTable.ts): Manages table state — sorting, pagination, row selection, column visibility.
>
> Implementation: column definitions define structure, client-side sorting (header click toggles asc/desc/none), client-side pagination with configurable page size, row selection via checkbox column, select all/deselect all, column hiding toggle, responsive horizontal scroll.
>
> Tests: renders data from columns, sorting toggles, pagination shows correct rows, row selection, column visibility, empty state.

**Success Criteria:**
- Renders tabular data from column definitions
- Client-side sorting works (asc/desc/none cycle)
- Client-side pagination with configurable page size
- Row selection with checkbox column and select-all
- Column visibility can be toggled
- All tests pass

**Edge Cases:**
- Empty data set
- Single row
- Columns with complex cell renderers

**Outputs:** packages/core/src/components/data-table/, packages/core/src/composables/useDataTable.ts

**Done When:** DataTable with column definitions, sorting, pagination, row selection, and passing tests.

---

## PHASE 8: ANIMATION SYSTEM

Build the animation package with Vue transitions, animation composables, and preset animations.

---

### Task 8.1: Build Animation Package

- **ID:** 8.1
- **Phase:** 8
- **Depends On:** 2.2
- **Model:** sonnet

**Prompt:**

> ## Task: Build Animation Package with Transitions and Composables
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 9 (Animation System)
>
> **Context:** Standalone animation package providing reusable Vue transitions and composables.
>
> **Instructions:**
>
> **Step 1:** Create packages/animations/src/transitions/presets.ts — Define 10+ named transition presets: fade, fadeUp, fadeDown, fadeLeft, fadeRight, slideUp, slideDown, slideLeft, slideRight, scale, scaleUp, scaleDown, expand (height), collapse, bounce, shake, blur. Each preset: enterActiveClass, leaveActiveClass, enterFromClass, enterToClass, leaveFromClass, leaveToClass.
>
> **Step 2:** Create packages/animations/src/transitions/StellarTransition.vue — Wrapper around Vue's Transition accepting a preset name prop.
>
> **Step 3:** Create packages/animations/src/transitions/StellarTransitionGroup.vue — Same for TransitionGroup with staggered animations.
>
> **Step 4:** Create packages/animations/src/composables/usePresence.ts — Manages enter/exit presence: isPresent (readonly), isAnimating (readonly), safeToRemove function.
>
> **Step 5:** Create packages/animations/src/composables/useMotion.ts — Web Animation API wrapper: animate function, isAnimating (readonly).
>
> **Step 6:** Create packages/animations/src/index.ts.
>
> **Step 7:** Write tests — presets have required CSS classes, StellarTransition applies correct classes, usePresence manages lifecycle, useMotion triggers animations.

**Success Criteria:**
- 10+ transition presets defined
- StellarTransition component works as Vue Transition wrapper
- usePresence handles exit animations before removal
- useMotion wraps Web Animation API
- All tests pass

**Outputs:** packages/animations/src/transitions/presets.ts, StellarTransition.vue, StellarTransitionGroup.vue, packages/animations/src/composables/usePresence.ts, useMotion.ts, packages/animations/src/index.ts

**Done When:** Animation package with 10+ transition presets, StellarTransition component, usePresence/useMotion composables, and passing tests.

---

## PHASE 9: CLI TOOL

Build the CLI tool for initializing projects, adding components, managing themes, and handling updates.

---

### Task 9.1: CLI Tool Foundation and Init Command

- **ID:** 9.1
- **Phase:** 9
- **Depends On:** 0.3
- **Model:** opus

**Prompt:**

> ## Task: Build CLI Tool Foundation and Init Command
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 12 (CLI Tool Specifications) and vue-component-library-spec.md Section 5
>
> **Context:** The CLI is how users interact with the library. Must be polished, helpful, and handle errors gracefully.
>
> **Instructions:**
>
> **Step 1:** Create packages/cli/src/index.ts — Commander.js program: name stellar-ui, version from package.json, description "CLI for Stellar Vue UI component library".
>
> **Step 2:** Create packages/cli/src/commands/init.ts — Interactive flow: detect framework (Vue/Nuxt), ask components dir (default components/ui), composables dir (default composables), utils dir (default lib), default theme (list 6), include animations? (Y/n), icon library (lucide/heroicons/phosphor/none). Creates stellar-ui.config.ts, CSS file with theme tokens, installs dependencies, creates components.lock.json, shows success.
>
> **Step 3:** Create packages/cli/src/utils/config.ts — Read/write stellar-ui.config.ts and components.lock.json.
>
> **Step 4:** Create packages/cli/src/utils/registry.ts — Fetch component metadata from embedded registry.
>
> **Step 5:** Create packages/cli/src/utils/prompts.ts — Reusable prompt helpers with picocolors styling.
>
> **Step 6:** Create CLI build config (tsup).
>
> **Step 7:** Write tests — config generated correctly, framework detection, default values.

**Success Criteria:**
- `stellar-ui init` runs interactively and creates config
- stellar-ui.config.ts matches BIBLE.md Section 12.2 format
- components.lock.json is initialized
- CLI binary is bundled and executable
- All tests pass

**Edge Cases:**
- Running init in project that already has config
- Non-standard project structures
- Missing package.json

**Outputs:** packages/cli/src/index.ts, packages/cli/src/commands/init.ts, packages/cli/src/utils/config.ts, packages/cli/src/utils/registry.ts, packages/cli/src/utils/prompts.ts

**Done When:** CLI tool foundation built with init command that creates config, detects framework, and initializes project.

---

### Task 9.2: CLI Add, Update, and Remove Commands

- **ID:** 9.2
- **Phase:** 9
- **Depends On:** 9.1
- **Model:** opus

**Prompt:**

> ## Task: Build CLI Add, Update, and Remove Commands
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 12 and vue-component-library-spec.md Appendix D Section 1
>
> **Context:** Core CLI interactions. They copy components into the user's project and track versions.
>
> **Instructions:**
>
> **Step 1: add command** (packages/cli/src/commands/add.ts) — Read config, show fuzzy-searchable list if no name, resolve dependencies (e.g., Button depends on cn.ts), check if exists (warn + prompt overwrite), copy files, copy required utils/composables, install npm deps if needed, update lock, show success. Support multiple: `stellar-ui add button input card`.
>
> **Step 2: update command** (packages/cli/src/commands/update.ts) — Read lock for installed versions, check for newer, detect customization via hash, show diff preview, apply or skip, update lock. Support --all flag.
>
> **Step 3: remove command** (packages/cli/src/commands/remove.ts) — Check exists, check dependents (warn), remove files, update lock, suggest removing unused npm deps.
>
> **Step 4: list command** (packages/cli/src/commands/list.ts) — `stellar-ui list` (all available), `stellar-ui list --installed` (with versions), show status: installed/outdated/not installed.
>
> **Step 5:** Create packages/cli/src/utils/diff.ts — Human-readable diffs.
>
> **Step 6:** Write tests.

**Success Criteria:**
- `stellar-ui add button` copies component files
- `stellar-ui update button` shows diff and applies changes
- `stellar-ui remove button` removes files and lock entry
- `stellar-ui list` shows all components with status
- components.lock.json accurately tracks installations
- Customization detection warns users
- All tests pass

**Outputs:** packages/cli/src/commands/add.ts, update.ts, remove.ts, list.ts, packages/cli/src/utils/diff.ts

**Done When:** Add, update, remove, and list commands functional with version tracking, diff preview, and customization detection.

---

### Task 9.3: CLI Theme and Utility Commands

- **ID:** 9.3
- **Phase:** 9
- **Depends On:** 9.1, 3.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build CLI Theme and Utility Commands
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 12 (CLI Tool Specifications)
>
> **Context:** Theme commands for creating, applying, and managing themes. Utility commands for info, deps, and audit.
>
> **Instructions:**
>
> **Step 1: theme command** (packages/cli/src/commands/theme.ts) — Sub-commands: `theme create` (interactive wizard: name, base, primary color, border radius, generate, validate contrast, output CSS + TypeScript), `theme list`, `theme apply <name>`, `theme export <name> --format css|json|tailwind`.
>
> **Step 2: info command** (packages/cli/src/commands/info.ts) — Show component description, dependencies, files, size, installed vs latest version.
>
> **Step 3: deps command** (packages/cli/src/commands/deps.ts) — Show all required deps, check for missing, --update flag.
>
> **Step 4: audit command** (packages/cli/src/commands/audit.ts) — Contrast ratio check of current theme, WCAG violations report, --contrast for detailed analysis, --keyboard placeholder.
>
> **Step 5:** Write tests.

**Success Criteria:**
- Theme wizard creates valid, accessible themes
- Theme export produces correct format
- Info shows comprehensive component details
- Deps detects missing packages
- Audit checks contrast ratios
- All tests pass

**Outputs:** packages/cli/src/commands/theme.ts, info.ts, deps.ts, audit.ts

**Done When:** Theme management, info, deps, and audit CLI commands complete with tests.

---

## PHASE 10: NUXT MODULE

Build the Nuxt 4 module for auto-imports, config, and runtime integration.

---

### Task 10.1: Build Nuxt 4 Module

- **ID:** 10.1
- **Phase:** 10
- **Depends On:** 2.1, 3.3
- **Model:** opus

**Prompt:**

> ## Task: Build Nuxt 4 Module
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 6 (Nuxt Module)
>
> **Context:** Provides auto-imports, component registration, and runtime configuration for Nuxt 4.
>
> **Instructions:**
>
> **Step 1:** Create packages/nuxt/src/module.ts — defineNuxtModule with meta { name '@stellar-vue-ui/nuxt', configKey 'stellarUI' }, defaults { autoImport true, prefix 'UI', theme 'stellar', darkMode 'class' }. Setup: register component auto-imports with prefix, register composable auto-imports, add CSS theme file, provide global config via runtimeConfig, add theme plugin.
>
> **Step 2:** Create packages/nuxt/src/runtime/plugins/stellar-ui.ts — Initialize theme on app start, set up dark mode detection, provide theme context.
>
> **Step 3:** Create packages/nuxt/src/runtime/composables/useServerTheme.ts — Server-safe theme detection using cookies or headers.
>
> **Step 4:** Create packages/nuxt/src/types/module.ts — Module options interface.
>
> **Step 5:** Create module build config.
>
> **Step 6:** Create packages/nuxt/playground/nuxt.config.ts — Minimal Nuxt app using the module.
>
> **Step 7:** Write tests — module registers components, auto-imports work with prefix, theme applied, dark mode works.

**Success Criteria:**
- Module registers in nuxt.config.ts with stellarUI config key
- Auto-imports work for all components and composables
- Optional prefix (e.g., UIButton) works
- Theme initialized on app start
- Dark mode via class strategy works
- Playground app starts
- Tests pass

**Edge Cases:**
- SSR theme detection (no window on server)
- Only importing specific components

**Outputs:** packages/nuxt/src/module.ts, packages/nuxt/src/runtime/plugins/stellar-ui.ts, packages/nuxt/src/runtime/composables/useServerTheme.ts, packages/nuxt/src/types/module.ts, packages/nuxt/playground/nuxt.config.ts

**Done When:** Nuxt module with auto-imports, theme initialization, dark mode, SSR support, and playground app running.

---

## PHASE 11: TESTING AND QUALITY

Set up E2E testing, accessibility audits, test utilities package, and CI/CD pipelines.

---

### Task 11.1: Set Up Playwright E2E and Accessibility Testing

- **ID:** 11.1
- **Phase:** 11
- **Depends On:** 4.1, 4.8
- **Model:** sonnet

**Prompt:**

> ## Task: Set Up Playwright E2E and Accessibility Testing
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 9 (Testing Strategy) and vue-component-library-spec.md Section 12
>
> **Context:** E2E tests verify components in a real browser. Accessibility tests use axe-core.
>
> **Instructions:**
>
> **Step 1:** Create playwright.config.ts — Projects: chromium, firefox, webkit. Base URL localhost:5173. Timeout 30s. Retries 2 on CI. Reporter HTML. Web server starts playground.
>
> **Step 2:** Create tests/a11y/a11y-utils.ts — Helper that injects axe-core and checks for violations.
>
> **Step 3:** Write tests/e2e/button.spec.ts — Visual rendering, click, keyboard, disabled, loading.
>
> **Step 4:** Write tests/e2e/dialog.spec.ts — Open/close, focus trap, Escape, overlay click, scroll lock.
>
> **Step 5:** Write tests/a11y/components.spec.ts — axe-core on Button (all variants), Input (with label, with error), Dialog, Select, Checkbox, Radio, Switch.
>
> **Step 6:** Create playground pages for E2E testing.

**Success Criteria:**
- Playwright configured for 3 browsers
- axe-core tests pass for all tested components
- E2E tests verify real browser behavior
- Tests can run in CI
- All tests pass

**Outputs:** playwright.config.ts, tests/a11y/a11y-utils.ts, tests/e2e/button.spec.ts, tests/e2e/dialog.spec.ts, tests/a11y/components.spec.ts

**Done When:** Playwright E2E and accessibility testing configured and passing for Button, Dialog, and form inputs.

---

### Task 11.2: Build Test Utilities Package

- **ID:** 11.2
- **Phase:** 11
- **Depends On:** 2.3, 3.3
- **Model:** sonnet

**Prompt:**

> ## Task: Build Test Utilities Package
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 9
>
> **Context:** Helpers for users testing their own components that use Stellar Vue UI.
>
> **Instructions:**
>
> **Step 1:** Create packages/test-utils/src/wrappers/render-with-theme.ts — Wraps mount() with theme provider context.
>
> **Step 2:** Create packages/test-utils/src/mocks/generators.ts — mockTableData, mockFormData, mockSelectOptions, mockBreadcrumbs.
>
> **Step 3:** Create packages/test-utils/src/matchers/accessibility.ts — toBeAccessible, toHaveFocusWithin, toHaveAriaLabel, toBeDisabledAccessibly.
>
> **Step 4:** Create packages/test-utils/src/wrappers/form-utils.ts — fillForm, submitForm, getErrors.
>
> **Step 5:** Create packages/test-utils/src/index.ts.
>
> **Step 6:** Write tests for the test utils.

**Success Criteria:**
- renderWithTheme provides proper theme context
- Mock generators produce valid test data
- Custom matchers provide helpful error messages
- Form utilities simplify form testing
- Tree-shakeable
- All tests pass

**Outputs:** packages/test-utils/src/wrappers/render-with-theme.ts, packages/test-utils/src/mocks/generators.ts, packages/test-utils/src/matchers/accessibility.ts, packages/test-utils/src/wrappers/form-utils.ts, packages/test-utils/src/index.ts

**Done When:** Test utils package with renderWithTheme, mock generators, custom matchers, and form utilities complete.

---

### Task 11.3: Set Up CI/CD Pipeline with GitHub Actions

- **ID:** 11.3
- **Phase:** 11
- **Depends On:** 11.1
- **Model:** sonnet

**Prompt:**

> ## Task: Set Up CI/CD Pipeline
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 2.1 (.github/workflows/)
>
> **Context:** CI/CD ensures code quality on every PR and automates releases.
>
> **Instructions:**
>
> **Step 1: CI workflow** (.github/workflows/ci.yml) — Triggers: push main/develop, PRs. Jobs: lint, typecheck, test-unit (with coverage), test-e2e, build. pnpm caching, Node 20, Turborepo remote caching.
>
> **Step 2: Release workflow** (.github/workflows/release.yml) — Triggers: push to main (changeset PRs merged). Jobs: build, test, publish to npm via changesets/action, create GitHub release.
>
> **Step 3: Docs deploy workflow** (.github/workflows/docs-deploy.yml) — Triggers: push to main (docs/ changes), manual. Jobs: build VitePress, deploy to CloudFlare Pages.
>
> **Step 4: Ecosystem CI workflow** (.github/workflows/ecosystem-ci.yml) — Triggers: weekly. Jobs: test against latest Vue 3.6, Nuxt 4, Radix Vue.

**Success Criteria:**
- CI runs on every PR with lint, typecheck, test, build
- Release workflow publishes to npm
- Docs deploy pushes to CloudFlare Pages
- Ecosystem CI catches compatibility issues
- All workflows are valid YAML

**Outputs:** .github/workflows/ci.yml, release.yml, docs-deploy.yml, ecosystem-ci.yml

**Done When:** All 4 GitHub Actions workflows created and valid.

---

## PHASE 12: DOCUMENTATION SITE

Set up the VitePress documentation site with guides, component docs, and interactive examples.

---

### Task 12.1: Set Up VitePress Documentation Site

- **ID:** 12.1
- **Phase:** 12
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Set Up VitePress Documentation Site
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 10 (Documentation Standards)
>
> **Context:** The documentation site is the primary interface for developers.
>
> **Instructions:**
>
> **Step 1:** Create apps/docs/.vitepress/config.ts — Title "Stellar Vue UI", description from BIBLE.md, navigation matching Section 10.1, sidebar for each section, local search enabled, social links (GitHub).
>
> **Step 2:** Create apps/docs/.vitepress/theme/index.ts — Extend default theme with custom CSS using Stellar colors, ComponentPreview component, CodeGroup component.
>
> **Step 3:** Create apps/docs/.vitepress/components/ComponentPreview.vue — Live component example with preview area (light/dark toggle), code tab with copy button, variant/size controls.
>
> **Step 4:** Create apps/docs/index.md — Hero section, features grid (6 features), quick start example, testimonials placeholder.
>
> **Step 5:** Create guide pages — introduction.md, installation.md, quickstart.md, theming.md, dark-mode.md, accessibility.md, cli.md (7 pages).
>
> **Step 6:** Create apps/docs/components/button.md — Follow BIBLE.md Section 10.2 template exactly.
>
> **Step 7:** Verify with `cd apps/docs && pnpm vitepress build`.

**Success Criteria:**
- VitePress builds without errors
- Navigation matches BIBLE.md Section 10.1
- ComponentPreview renders live examples
- Homepage has hero, features, quick start
- 7 guide pages written
- Button docs page follows template
- Search works

**Outputs:** apps/docs/.vitepress/config.ts, apps/docs/.vitepress/theme/index.ts, apps/docs/.vitepress/components/ComponentPreview.vue, apps/docs/index.md, apps/docs/guide/ (7 files), apps/docs/components/button.md

**Done When:** VitePress site configured, building, with homepage, 7 guide pages, and Button component docs.

---

### Task 12.2: Write Component Documentation Pages

- **ID:** 12.2
- **Phase:** 12
- **Depends On:** 12.1, 7.11
- **Model:** opus

**Prompt:**

> ## Task: Write Documentation for All Tier 1 and Tier 2 Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 10.2 (Component Documentation Template)
>
> **Context:** Every component needs a documentation page following the BIBLE.md template.
>
> **Instructions:**
>
> Create docs in apps/docs/components/ for all 31 components:
>
> **Tier 1 (15):** button.md, input.md, label.md, card.md, dialog.md, dropdown-menu.md, select.md, checkbox.md, radio-group.md, switch.md, textarea.md, alert.md, badge.md, separator.md, skeleton.md
>
> **Tier 2 (16):** accordion.md, tabs.md, popover.md, tooltip.md, avatar.md, progress.md, slider.md, form.md, data-table.md, pagination.md, breadcrumb.md, navigation-menu.md, command.md, context-menu.md, menubar.md, stepper.md
>
> Each page MUST include: description/use case, installation command, basic usage example, variant examples, props table (types, defaults, descriptions), events table, slots table, accessibility notes (keyboard + ARIA), related components.
>
> Update .vitepress/config.ts sidebar navigation.

**Success Criteria:**
- All 31 component docs created
- Each follows BIBLE.md Section 10.2 template
- Props, events, slots documented
- Accessibility notes included
- Sidebar updated
- Site builds

**Outputs:** apps/docs/components/*.md (31 files)

**Done When:** All 31 Tier 1 and Tier 2 component docs written following template, sidebar updated, site builds.

---

## PHASE 13: TIER 3 COMPONENTS

Build specialized components that complete the library.

---

### Task 13.1: Toast/Notification Component

- **ID:** 13.1
- **Phase:** 13
- **Depends On:** 4.1, 8.1
- **Model:** opus

**Prompt:**

> ## Task: Build Toast and Notification Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 12
>
> **Context:** Toast provides transient notifications with imperative API.
>
> **Instructions:**
>
> Files in packages/core/src/components/toast/
>
> **Sub-components:** Toaster (fixed container), Toast (Radix Toast), ToastTitle, ToastDescription, ToastAction, ToastClose, ToastViewport — 7 total.
>
> **useToast composable** (packages/core/src/composables/useToast.ts): Returns toast function (options → {id, dismiss}), dismiss function, toasts (readonly Ref). ToastOptions: title, description, variant, action, duration. Variants: default, success, destructive, warning, info. Positions: top-right/left, bottom-right/left, top/bottom-center. Auto-dismiss (default 5000ms). Swipe to dismiss. Stacking animation.
>
> Tests: appears and auto-dismisses, useToast creates/dismisses, variants render correctly, action button, swipe dismiss, stacking.

**Success Criteria:**
- useToast() provides imperative API
- Auto-dismiss with configurable duration
- Swipe to dismiss
- 5 variants
- Stack animation
- All tests pass

**Outputs:** packages/core/src/components/toast/, packages/core/src/composables/useToast.ts

**Done When:** Toast system with Toaster, useToast composable, 5 variants, auto-dismiss, and passing tests.

---

### Task 13.2: Drawer and Sheet Components

- **ID:** 13.2
- **Phase:** 13
- **Depends On:** 4.8
- **Model:** sonnet

**Prompt:**

> ## Task: Build Drawer and Sheet Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 3.1 Tier 3
>
> **Context:** Drawer slides from side, Sheet from bottom. Both overlay patterns built on Radix Vue Dialog.
>
> **Instructions:**
>
> **Drawer** (packages/core/src/components/drawer/):
> Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose, DrawerOverlay — 9 sub-components. DrawerContent props: side ('left' | 'right'), size ('sm' | 'md' | 'lg' | 'xl' | 'full'). Focus trap, scroll lock, Escape close.
>
> **Sheet** (packages/core/src/components/sheet/):
> Mirrors Drawer but: slides from bottom on mobile, supports top/left/right too, drag handle for touch, snap points (50%, 100%).
>
> Tests: opens/closes with animation, focus trap, Escape closes, overlay closes, Drawer slides from correct side, Sheet touch drag.

**Success Criteria:**
- Drawer slides from left or right with configurable size
- Sheet slides from bottom with drag handle
- Both trap focus and support Escape
- Smooth slide animations
- All tests pass

**Outputs:** packages/core/src/components/drawer/, packages/core/src/components/sheet/

**Done When:** Drawer and Sheet components with slide animations, focus trap, and passing tests.

---

### Task 13.3: Combobox and Multi-Select Components

- **ID:** 13.3
- **Phase:** 13
- **Depends On:** 4.5, 4.7
- **Model:** opus

**Prompt:**

> ## Task: Build Combobox and Multi-Select Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 3.1 Tier 3
>
> **Context:** Combobox is searchable select, Multi-Select allows multiple selections with tags. Both on Radix Vue Combobox.
>
> **Instructions:**
>
> **Combobox** (packages/core/src/components/combobox/):
> Combobox (Radix ComboboxRoot), ComboboxInput, ComboboxTrigger, ComboboxContent, ComboboxItem, ComboboxEmpty, ComboboxGroup, ComboboxLabel — 8 sub-components. v-model for selected, search filters client-side, keyboard type-to-search/arrows/Enter, selected shown in input, clear button.
>
> **Multi-Select** (packages/core/src/components/multi-select/):
> Built on Combobox with multiple selection. Selected as removable tags/chips. v-model as array. Tags overflow (+N more). Clear all button. max prop.
>
> Tests: Combobox search/selects/keyboard. Multi-Select selects multiple/removes tags/max limit. Both: v-model, empty state, disabled.

**Success Criteria:**
- Combobox provides searchable dropdown with keyboard support
- Multi-Select allows multiple selections with tag display
- Both support v-model
- Search filtering works
- All tests pass

**Outputs:** packages/core/src/components/combobox/, packages/core/src/components/multi-select/

**Done When:** Combobox and Multi-Select with search, keyboard navigation, tag display, and passing tests.

---

### Task 13.4: Date Picker and Calendar Components

- **ID:** 13.4
- **Phase:** 13
- **Depends On:** 4.1, 7.3
- **Model:** opus

**Prompt:**

> ## Task: Build Date Picker and Calendar Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 3.1 Tier 3
>
> **Context:** Calendar is the underlying date grid. Date Picker wraps Calendar in a Popover with Input trigger. Built on Radix Vue Calendar primitives.
>
> **Instructions:**
>
> **Calendar** (packages/core/src/components/calendar/):
> Calendar, CalendarHeader, CalendarGrid, CalendarGridHead, CalendarGridBody, CalendarGridRow, CalendarCell, CalendarDay, CalendarHeading, CalendarNextButton, CalendarPrevButton — 11 sub-components. v-model for selected date. Month/year navigation. Keyboard: arrows navigate days, Page Up/Down for months. Today highlighted. Disabled dates (min, max, specific). Range selection mode. Locale support.
>
> **Date Picker** (packages/core/src/components/date-picker/):
> Combines Popover + Input + Calendar. Input shows formatted date. Click opens popover. Date format configurable. v-model. Range mode.
>
> Tests: Calendar renders correct days, navigates months, selects date, keyboard nav, disabled dates, range. Date Picker opens calendar, selects, formats.

**Success Criteria:**
- Calendar renders correct month grid
- Month/year navigation works
- Date selection with v-model
- Range selection mode
- Keyboard navigation
- Date Picker formats selected date
- All tests pass

**Edge Cases:**
- Leap years, month boundaries
- Different locale date formats
- Disabled date ranges

**Outputs:** packages/core/src/components/calendar/, packages/core/src/components/date-picker/

**Done When:** Calendar and Date Picker with month navigation, range mode, keyboard nav, and passing tests.

---

### Task 13.5: Remaining Tier 3 Display Components

- **ID:** 13.5
- **Phase:** 13
- **Depends On:** 4.1, 4.3
- **Model:** opus

**Prompt:**

> ## Task: Build Remaining Tier 3 Display Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 3.1 Tier 3
>
> **Context:** Remaining specialized display components that round out the library.
>
> **Instructions:**
>
> Build 7 components, each following BIBLE.md Section 6.1:
>
> **1. Color Picker** (packages/core/src/components/color-picker/) — Hue/saturation area, hue slider, opacity slider, hex/RGB/HSL input, preset swatches, v-model hex string.
>
> **2. Tree View** (packages/core/src/components/tree-view/) — Recursive nodes, expand/collapse, selectable (single/multi), keyboard arrows/Enter/Space, indentation with lines.
>
> **3. Rating** (packages/core/src/components/rating/) — Star rating (configurable max), half-star, hover preview, readonly, v-model, custom icon.
>
> **4. Timeline** (packages/core/src/components/timeline/) — Timeline, TimelineItem, TimelineConnector, TimelineContent. Vertical with dots. Left/right/alternating layout. Custom icons. Date display.
>
> **5. Carousel** (packages/core/src/components/carousel/) — Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext. Horizontal sliding, dot indicators, auto-play with pause on hover, touch swipe, loop.
>
> **6. Empty State** (packages/core/src/components/empty-state/) — EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateAction. Centered layout, customizable icon, action button slot.
>
> **7. Code Block** (packages/core/src/components/code-block/) — Syntax highlighting (highlight.js or shiki), line numbers, copy button, language indicator, dark/light aware.
>
> Tests for each: basic rendering, v-model where applicable, accessibility.

**Success Criteria:**
- All 7 components built with correct structure
- Each has types, variants (where applicable), and tests
- v-model on interactive components
- Accessibility keyboard navigation where needed
- All tests pass

**Outputs:** packages/core/src/components/color-picker/, tree-view/, rating/, timeline/, carousel/, empty-state/, code-block/

**Done When:** 7 Tier 3 display components built with tests.

---

### Task 13.6: Layout Components

- **ID:** 13.6
- **Phase:** 13
- **Depends On:** 4.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Layout Components
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 10
>
> **Context:** Structural primitives for building application layouts.
>
> **Instructions:**
>
> **Stack** (packages/core/src/components/stack/) — Props: direction ('vertical' | 'horizontal'), gap, align, justify, wrap. Maps to flex with gap. Responsive changes.
>
> **Grid** (packages/core/src/components/grid/) — Props: cols (number or responsive object), gap, rows. Maps to CSS Grid. Responsive column changes.
>
> **Sidebar** (packages/core/src/components/sidebar/) — Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton. Collapsible with toggle. Mobile: drawer overlay. Desktop: persistent or collapsible.
>
> **Shell** (packages/core/src/components/shell/) — AppShell, ShellHeader, ShellSidebar, ShellMain, ShellFooter. Full-page layout scaffold. Header fixed, sidebar optional, main scrollable.
>
> Tests: Stack direction/gap, Grid columns, Sidebar collapse/expand, Shell renders all sections.

**Success Criteria:**
- Stack handles vertical/horizontal with configurable gap
- Grid renders responsive column layouts
- Sidebar collapses with animation, mobile drawer
- Shell provides complete app layout
- All tests pass

**Outputs:** packages/core/src/components/stack/, grid/, sidebar/, shell/

**Done When:** Stack, Grid, Sidebar, and Shell layout components built with responsive behavior and passing tests.

---

## PHASE 14: ADVANCED FEATURES

Build advanced features: rich text editor, file upload, filter builder, chart wrapper, and recipe/block systems.

---

### Task 14.1: Rich Text Editor Component

- **ID:** 14.1
- **Phase:** 14
- **Depends On:** 4.1
- **Model:** opus

**Prompt:**

> ## Task: Build Rich Text Editor Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 6
>
> **Context:** Wraps Tiptap with styled toolbar and Stellar theme integration.
>
> **Instructions:**
>
> Files in packages/core/src/components/rich-text-editor/
>
> **Sub-components:** RichTextEditor, EditorToolbar, EditorContent, ToolbarButton, ToolbarSeparator, ToolbarGroup.
>
> Implementation: @tiptap/vue-3 as peer dependency. Props: modelValue (HTML string), placeholder, disabled, toolbar (array of items). v-model. Default toolbar: bold, italic, underline, strikethrough | h1, h2, h3 | bulletList, orderedList | blockquote, codeBlock | link, image | undo, redo. Markdown import/export. Bubble menu. Themed to match Stellar. min/max-height with scroll. Character count.
>
> Tests: renders editor with toolbar, bold/italic works, v-model outputs HTML, toolbar buttons toggle, disabled, placeholder.

**Success Criteria:**
- WYSIWYG editing with full toolbar
- v-model outputs HTML
- Toolbar configurable
- Styled to match Stellar
- All tests pass

**Edge Cases:**
- Paste from Word (sanitize HTML)
- Large documents performance
- Image upload (provide hook, not storage)

**Outputs:** packages/core/src/components/rich-text-editor/

**Done When:** Rich Text Editor with Tiptap, configurable toolbar, v-model, and passing tests.

---

### Task 14.2: File Upload Component

- **ID:** 14.2
- **Phase:** 14
- **Depends On:** 4.1, 7.4
- **Model:** sonnet

**Prompt:**

> ## Task: Build File Upload Component
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Section 7
>
> **Context:** Drag-and-drop file uploading with preview, progress, and validation.
>
> **Instructions:**
>
> Files in packages/core/src/components/file-upload/
>
> **Sub-components:** FileUpload, FileUploadDropzone, FileUploadTrigger, FileUploadPreview, FileUploadProgress, FileUploadList.
>
> Props: accept (mime types), maxSize (bytes), maxFiles, multiple, disabled, v-model (File[]). Drag-and-drop with visual feedback. File type/size validation. Image preview thumbnails. Progress callback. Remove from list. Error display.
>
> **useFileUpload composable** (packages/core/src/composables/useFileUpload.ts): Returns files, addFiles, removeFile, clearFiles, isDragging, errors.
>
> Tests: accepts via click, drag-and-drop, validates type/size, image preview, remove files, maxFiles limit.

**Success Criteria:**
- Drag-and-drop with visual feedback
- File validation (type, size, count)
- Image preview thumbnails
- v-model provides File array
- useFileUpload composable
- All tests pass

**Outputs:** packages/core/src/components/file-upload/, packages/core/src/composables/useFileUpload.ts

**Done When:** File Upload with drag-drop, validation, preview, useFileUpload composable, and passing tests.

---

### Task 14.3: Loading Component and Chart Wrapper

- **ID:** 14.3
- **Phase:** 14
- **Depends On:** 4.3
- **Model:** sonnet

**Prompt:**

> ## Task: Build Loading Component and Chart Wrapper
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 3.1 Tier 3
>
> **Context:** Loading provides full-page loaders. Chart provides themed wrapper around a chart library.
>
> **Instructions:**
>
> **Loading** (packages/core/src/components/loading/):
> Loading, LoadingSpinner (SVG), LoadingDots, LoadingBar (top progress bar like YouTube), LoadingOverlay (full overlay). Props: variant ('spinner' | 'dots' | 'bar' | 'skeleton'), size, text.
>
> **Chart** (packages/core/src/components/chart/):
> Thin wrapper applying Stellar theme colors. chart.js or lightweight alternative as peer dep. ChartContainer, ChartTooltip, ChartLegend. useChart composable. Auto theme integration. Responsive. Types: line, bar, pie, area.
>
> Tests: Loading renders each variant, LoadingOverlay covers viewport, Chart renders with data and theme colors.

**Success Criteria:**
- Loading provides 4 animation variants
- LoadingOverlay provides full-page loading
- Chart applies Stellar theme colors
- All tests pass

**Outputs:** packages/core/src/components/loading/, packages/core/src/components/chart/

**Done When:** Loading component (4 variants + overlay) and Chart wrapper with theme integration built with tests.

---

### Task 14.4: Filter Builder and Notification Center

- **ID:** 14.4
- **Phase:** 14
- **Depends On:** 4.5, 4.7, 13.1
- **Model:** opus

**Prompt:**

> ## Task: Build Filter Builder and Notification Center
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Appendix D Sections 12-13
>
> **Context:** Filter Builder for visual query construction. Notification Center for inbox-style management.
>
> **Instructions:**
>
> **Filter Builder** (packages/core/src/components/filter-builder/):
> FilterBuilder, FilterRow, FilterGroup, FilterField (Select), FilterOperator, FilterValue (adapts to field type). Props: v-model (FilterRule[]), fields (FieldConfig[]), operators. Nested groups (AND/OR logic). Add/remove rules dynamically.
>
> **Notification Center** (packages/core/src/components/notification-center/):
> NotificationCenter (root with badge), NotificationList, NotificationItem, NotificationGroup (by date), NotificationEmpty.
>
> **useNotifications composable** (packages/core/src/composables/useNotifications.ts): notifications, unreadCount, markAsRead, markAllAsRead, dismiss, add.
>
> Tests: Filter Builder adds/removes rules, nested groups, v-model. Notification Center displays, marks read, badge count.

**Success Criteria:**
- Filter Builder supports nested AND/OR logic
- Field types adapt value inputs
- Notification Center shows badge count
- Mark as read/unread works
- All tests pass

**Outputs:** packages/core/src/components/filter-builder/, packages/core/src/components/notification-center/, packages/core/src/composables/useNotifications.ts

**Done When:** Filter Builder with nested logic and Notification Center with useNotifications composable built with tests.

---

## PHASE 15: RELEASE PREPARATION

Final checks, playground app, example projects, and v0.1.0 release.

---

### Task 15.1: Build Interactive Playground App

- **ID:** 15.1
- **Phase:** 15
- **Depends On:** 12.1
- **Model:** sonnet

**Prompt:**

> ## Task: Build Interactive Playground App
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read vue-component-library-spec.md Section 13.3
>
> **Context:** Vite + Vue app for testing components interactively. Also serves as E2E test target.
>
> **Instructions:**
>
> **Step 1:** Create apps/playground/vite.config.ts — Vue plugin, Tailwind CSS plugin, import from packages/core via workspace.
>
> **Step 2:** Create apps/playground/src/App.vue — Sidebar with component list, main area showing selected component, theme switcher in header, dark mode toggle.
>
> **Step 3:** Create component demo pages for each Tier 1 component showing all variants, sizes, interactive prop toggles, code snippets.
>
> **Step 4:** Create theme preview page showing all 6 themes side by side.
>
> **Step 5:** Verify with `cd apps/playground && pnpm dev`.

**Success Criteria:**
- Playground starts with `pnpm dev`
- All Tier 1 components render
- Theme switching works
- Dark mode toggle works
- Interactive controls modify props

**Outputs:** apps/playground/vite.config.ts, apps/playground/src/App.vue, apps/playground/src/pages/

**Done When:** Playground app running with all Tier 1 component demos, theme switching, and dark mode.

---

### Task 15.2: Create Example Projects

- **ID:** 15.2
- **Phase:** 15
- **Depends On:** 10.1
- **Model:** sonnet

**Prompt:**

> ## Task: Create Example Projects
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 2.1 (apps/examples/)
>
> **Context:** Show users how to integrate the library in real applications.
>
> **Instructions:**
>
> **Step 1: Basic Vue** (apps/examples/basic-vue/) — Minimal Vite + Vue 3 app. Imports @stellar-vue-ui/core. Shows Button, Card, Input in simple layout. README with setup.
>
> **Step 2: Nuxt app** (apps/examples/nuxt-app/) — Nuxt 4 using @stellar-vue-ui/nuxt. Auto-imports. Theme config. Form example with validation. README.
>
> **Step 3: Vite + TypeScript** (apps/examples/vite-ts/) — Vite + Vue 3 + TypeScript strict. Shows TS integration. Custom theme config. Component composition example. README.

**Success Criteria:**
- All three install and run
- Each demonstrates different integration patterns
- READMEs provide clear setup steps
- No errors or warnings

**Outputs:** apps/examples/basic-vue/, apps/examples/nuxt-app/, apps/examples/vite-ts/

**Done When:** Three example projects created and running.

---

### Task 15.3: Final Quality Checks and v0.1.0 Release Prep

- **ID:** 15.3
- **Phase:** 15
- **Depends On:** 15.1, 15.2, 11.3
- **Model:** opus

**Prompt:**

> ## Task: Final Quality Checks and v0.1.0 Release Preparation
>
> **Working Directory:** /Users/dev/Development/Stellar
>
> **Reference:** Read BIBLE.md Section 11 (Release Process) and Section 24 (Final Checklist)
>
> **Context:** Before releasing v0.1.0, every quality gate must pass.
>
> **Instructions:**
>
> **Step 1:** Run full quality pipeline: pnpm lint, pnpm typecheck, pnpm test, pnpm build. Fix any failures.
>
> **Step 2:** Verify bundle sizes: individual component < 5KB gzipped, core package < 50KB gzipped. Optimize if over budget.
>
> **Step 3:** Verify tree-shaking: create test importing a single component and verify bundle only includes that component.
>
> **Step 4:** Run accessibility audit: axe-core on all Tier 1 components. Fix violations.
>
> **Step 5:** Review all package.json exports maps are correct.
>
> **Step 6:** Update README.md: logo placeholder, tagline, quick install, quick usage, feature highlights, docs links, contributing, license.
>
> **Step 7:** Create v0.1.0 changeset with `pnpm changeset`. Mark as minor for all packages.
>
> **Step 8:** Update CHANGELOG.md with all v0.1.0 features.
>
> **Step 9:** Verify docs build with `cd apps/docs && pnpm vitepress build`.

**Success Criteria:**
- All lint, typecheck, test, build commands pass
- Bundle sizes within budget
- Tree-shaking works
- No accessibility violations in Tier 1
- Package exports resolve correctly
- README comprehensive and professional
- CHANGELOG documents all v0.1.0 features
- Docs build without errors

**Outputs:** README.md, CHANGELOG.md, .changeset/*.md

**Done When:** All quality gates pass, README and CHANGELOG finalized, v0.1.0 changeset created, ready to publish.

---

## TASK SUMMARY

| Phase | Name | Tasks | Dependencies |
|-------|------|-------|-------------|
| 0 | Project Initialization | 3 | None |
| 1 | Build Tooling & Configuration | 5 | Phase 0 |
| 2 | Core Infrastructure & Styling | 3 | Phase 1 |
| 3 | Theme System | 3 | Phase 2 |
| 4 | Tier 1 Components | 9 | Phase 2 |
| 5 | Form System | 1 | Phase 4 |
| 6 | Core Composables | 2 | Phase 2 |
| 7 | Tier 2 Components | 11 | Phases 4-6 |
| 8 | Animation System | 1 | Phase 2 |
| 9 | CLI Tool | 3 | Phase 0, 3 |
| 10 | Nuxt Module | 1 | Phase 2, 3 |
| 11 | Testing & Quality | 3 | Phase 4 |
| 12 | Documentation Site | 2 | Phase 4, 7 |
| 13 | Tier 3 Components | 6 | Phases 4, 7 |
| 14 | Advanced Features | 4 | Phases 4, 13 |
| 15 | Release Preparation | 3 | Phases 10-14 |

**Total Tasks: 60**
**Total Components: 50+**
**Total Composables: 15+**
