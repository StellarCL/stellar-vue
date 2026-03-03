---
'@stellar-vue-ui/core': minor
'@stellar-vue-ui/cli': minor
---

### @stellar-vue-ui/core

- **Composable barrel exports**: Component barrel files now re-export their associated composables (e.g., `useToast` from `toast/index.ts`), making imports more intuitive for CLI users
- **SidebarMenuButton**: Fixed `asChild` to use Radix `Primitive` component for proper attribute forwarding
- **DataTable enhancements**: Added column filtering (`setFilter`, `clearFilters`, `filteredData`), `DataTableColumnToggle` component, `DataTableFilter` component, and `exportTableData` CSV/clipboard utility
- **useCommand composable + CommandPalette**: New composable for registering app-wide command actions with fuzzy search, keyboard shortcuts (Cmd+K), recent history, and a pre-wired `CommandPalette` component
- **AutoForm**: New `toFormFields()` utility that introspects Zod schemas into form field configs, plus `AutoForm` component for automatic form generation with slot overrides

### @stellar-vue-ui/cli

- **`stellar-ui doctor`**: New diagnostic command with 10 checks (config, CSS wiring, Tailwind integration, component files, peer deps, composables, import paths, NPM deps, lock file integrity). Supports `--fix`, `--verbose`, and `--json` flags
- **`stellar-ui init --scaffold`**: New flag that generates an App.vue with AppShell + Sidebar layout and auto-installs required components
- **Template regeneration**: CLI templates updated to include new components and composables
