# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-28

### Added

#### Core Components (56 families)

- **Layout & Structure:** Grid, Stack, Shell, Sidebar, Separator
- **Navigation:** Breadcrumb, Navigation Menu, Menubar, Tabs, Pagination, Stepper, Wizard
- **Forms & Inputs:** Button, Input, Textarea, Checkbox, Radio Group, Select, Multi-Select, Combobox, Switch, Slider, Date Picker, Calendar, Color Picker, File Upload, Rating, Form, Filter Builder, Rich Text Editor
- **Data Display:** Card, Avatar, Badge, Skeleton, Timeline, Tree View, Data Table, Chart, Code Block, Empty State, Loading
- **Feedback:** Alert, Toast, Progress, Dialog, Drawer, Sheet, Tooltip, Popover, Notification Center
- **Overlay:** Context Menu, Dropdown Menu, Command, Carousel
- **Content:** Accordion

Full list: accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, code-block, color-picker, combobox, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, empty-state, file-upload, filter-builder, form, grid, input, label, loading, menubar, multi-select, navigation-menu, notification-center, pagination, popover, progress, radio-group, rating, rich-text-editor, select, separator, sheet, shell, sidebar, skeleton, slider, stack, stepper, switch, tabs, textarea, timeline, toast, tooltip, tree-view, wizard.

#### Composables (18)

- `useTheme` -- theme switching and dark mode management
- `useThemeTokens` -- access resolved theme design tokens
- `useForm` -- form state management and validation
- `useFormField` -- individual form field state
- `useDisclosure` -- open/close toggle pattern
- `useToggle` -- boolean toggle state management
- `useSteps` -- multi-step wizard/stepper logic
- `usePagination` -- pagination state and controls
- `useFocusTrap` -- focus trap for modals and dialogs
- `useKeyboardNav` -- keyboard navigation helpers
- `useDebounce` -- debounced reactive values
- `useMediaQuery` -- reactive media query matching
- `useClipboard` -- copy to clipboard functionality
- `useDataTable` -- table sorting, filtering, and pagination
- `useToast` -- toast notification management
- `useChart` -- chart data and configuration helpers
- `useFileUpload` -- file upload state management
- `useNotifications` -- notification center management

#### Theme System (`@stellar-vue-ui/theme`)

- 6 celestial-themed presets: Stellar, Sirius, Polaris, Antares, Vega, Aldebaran
- Full dark mode support across all presets
- Theme definition API with `defineTheme`
- Contrast checker and theme validator utilities
- CSS custom property generation

#### Animation System (`@stellar-vue-ui/animations`)

- 17 transition presets: fade, fadeUp, fadeDown, fadeLeft, fadeRight, slideUp, slideDown, slideLeft, slideRight, scale, scaleUp, scaleDown, expand, collapse, bounce, shake, blur
- `StellarTransition` component for declarative animations
- `StellarTransitionGroup` component for list animations
- `usePresence` composable for mount/unmount animations
- `useMotion` composable for imperative animation control

#### CLI Tool (`@stellar-vue-ui/cli`)

- `init` -- initialize Stellar Vue UI in a project
- `add` -- add components to a project
- `update` -- update installed components
- `remove` -- remove components from a project
- `list` -- list available components
- `theme` -- manage themes (apply, list, preview)
- `info` -- show component information and metadata
- `deps` -- check component dependency tree
- `audit` -- audit installed components for updates and issues

#### Nuxt Module (`@stellar-vue-ui/nuxt`)

- Auto-import for all components and composables
- Theme plugin integration
- SSR support with proper hydration
- Nuxt 4 compatible module configuration

#### Test Utilities (`@stellar-vue-ui/test-utils`)

- `renderWithTheme` -- render components with theme context
- Mock generators for common test scenarios
- Accessibility matchers for a11y testing
- Form testing utilities

#### Documentation

- VitePress documentation site at `apps/docs`
- Component API reference pages
- Getting started guides
- Theme customization documentation

#### Playground

- Interactive playground app at `apps/playground`
- Live component exploration and testing

#### Example Projects

- Basic Vue 3 + Vite example
- Vue 3 + Vite + TypeScript example
- Nuxt 4 integration example

#### Infrastructure

- Monorepo with pnpm workspaces and Turborepo
- Vitest test suite with 1879 tests across 92 files
- Playwright E2E testing with axe-core accessibility checks
- GitHub Actions CI/CD workflows (CI, Release, Docs Deploy, Ecosystem CI)
- ESLint and Prettier configuration
- Changesets for version management
- Husky pre-commit hooks with lint-staged
