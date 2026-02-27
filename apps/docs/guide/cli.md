# CLI

The `@stellar-vue-ui/cli` package provides the `stellar` command-line tool for managing components in your project. It handles initialization, adding and removing components, theme management, dependency auditing, and more.

## Installation

```bash
pnpm add -D @stellar-vue-ui/cli
```

Or run commands directly with `npx`:

```bash
npx stellar <command>
```

## Commands

### `stellar init`

Initialize Stellar Vue UI in your project. This command detects your project setup and creates a configuration file.

```bash
npx stellar init
```

The init wizard will:

1. Detect your framework (Vite, Nuxt, or custom)
2. Detect your package manager (pnpm, npm, or yarn)
3. Ask where to place component files (default: `src/components/ui/`)
4. Ask which theme preset to use
5. Install required dependencies (`radix-vue`, Tailwind CSS)
6. Create `stellar.config.ts` in your project root

Example output:

```
Detecting project...
  Framework: Vite + Vue 3
  Package manager: pnpm
  TypeScript: Yes

Where should components be placed? src/components/ui/
Which theme preset? stellar

Creating stellar.config.ts...
Installing dependencies...
Done! Run `npx stellar add button` to add your first component.
```

### `stellar add`

Add one or more components to your project. Components are copied into your configured directory.

```bash
# Add a single component
npx stellar add button

# Add multiple components at once
npx stellar add button input card dialog

# Add all components
npx stellar add --all
```

Each component is copied with its full source: the Vue component file, types, variants, and an index barrel file. Dependencies between components are resolved automatically. For example, adding `form` will also add `label` if it is not already present.

### `stellar update`

Update previously added components to the latest version from the registry. This command shows a diff of changes and asks for confirmation before overwriting.

```bash
# Update a specific component
npx stellar update button

# Update all components
npx stellar update --all

# Force update without confirmation
npx stellar update button --force
```

If you have modified a component locally, the update will show you a side-by-side diff so you can decide whether to accept the upstream changes, keep your modifications, or merge manually.

### `stellar remove`

Remove a component from your project.

```bash
npx stellar remove button

# Remove multiple components
npx stellar remove button input card
```

This removes the component files and cleans up any barrel exports. It will warn you if other components in your project depend on the component being removed.

### `stellar list`

List all available components and their installation status.

```bash
npx stellar list
```

Example output:

```
Component        Status      Version
accordion        installed   0.1.0
alert            installed   0.1.0
avatar           not added   0.1.0
badge            installed   0.1.0
breadcrumb       not added   0.1.0
button           installed   0.1.0 (modified)
card             installed   0.1.0
...
```

Components marked as "modified" have local changes that differ from the registry version.

### `stellar theme`

Manage theme presets in your project.

```bash
# List available themes
npx stellar theme list

# Apply a theme preset
npx stellar theme apply sirius

# Show the current active theme
npx stellar theme current

# Preview a theme (prints CSS variables)
npx stellar theme preview polaris
```

The `theme apply` command updates your CSS custom properties to match the selected preset. It modifies your main CSS file in place.

### `stellar info`

Display information about your Stellar Vue UI setup.

```bash
npx stellar info
```

Example output:

```
Stellar Vue UI Info
  Config: stellar.config.ts
  Component dir: src/components/ui/
  Theme: stellar
  Components installed: 12 / 32
  Core version: 0.1.0
  CLI version: 0.1.0
  Vue: 3.5.29
  Radix Vue: 1.9.0
```

### `stellar deps`

Analyze component dependencies and show the dependency tree.

```bash
# Show dependencies for a component
npx stellar deps dialog

# Show reverse dependencies (what depends on this component)
npx stellar deps button --reverse
```

Example output:

```
dialog
  radix-vue (peer)
  button (used in DialogClose)
  separator (used in DialogContent)
```

### `stellar audit`

Audit your installed components for issues.

```bash
npx stellar audit
```

This checks for:
- Outdated components that have newer versions available
- Missing peer dependencies
- Components with local modifications
- Unused components that are installed but not imported anywhere
- Accessibility issues in component usage patterns

Example output:

```
Audit Results
  2 outdated components (button, card)
  0 missing dependencies
  1 locally modified (button)
  3 unused components (skeleton, separator, badge)

Run `npx stellar update --all` to update outdated components.
```

## Configuration

The `stellar init` command creates a `stellar.config.ts` file in your project root:

```typescript
import { defineConfig } from '@stellar-vue-ui/cli'

export default defineConfig({
  // Where components are placed
  componentDir: 'src/components/ui',

  // Theme preset
  theme: 'stellar',

  // TypeScript configuration
  typescript: true,

  // Tailwind CSS file path
  tailwindCss: 'src/assets/main.css',

  // Import aliases
  aliases: {
    components: '@/components/ui',
    utils: '@/lib/utils',
  },
})
```

## Next Steps

- [Install Stellar Vue UI](/guide/installation) and run `stellar init`
- Browse [Components](/components/button) to see what is available
- Learn about the [Theme System](/guide/theming) to customize your project's look
