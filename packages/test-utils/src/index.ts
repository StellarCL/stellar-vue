// ─── Wrappers ────────────────────────────────────────────────────────────────
export { renderWithTheme } from './wrappers/render-with-theme'
export type { RenderWithThemeOptions, ThemeName } from './wrappers/render-with-theme'

// ─── Form Utilities ───────────────────────────────────────────────────────────
export { fillForm, submitForm, getErrors } from './wrappers/form-utils'
export type { FillFormOptions } from './wrappers/form-utils'

// ─── Mock Generators ─────────────────────────────────────────────────────────
export {
  mockTableData,
  mockFormData,
  mockSelectOptions,
  mockBreadcrumbs,
} from './mocks/generators'
export type {
  MockTableRow,
  MockFormData,
  MockSelectOption,
  MockBreadcrumb,
} from './mocks/generators'

// ─── Custom Matchers ─────────────────────────────────────────────────────────
export { accessibilityMatchers, setupMatchers } from './matchers/accessibility'
