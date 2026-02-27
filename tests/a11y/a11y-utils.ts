import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export async function checkAccessibility(page: Page, options?: { exclude?: string[] }) {
  const builder = new AxeBuilder({ page })
  if (options?.exclude) {
    for (const selector of options.exclude) {
      builder.exclude(selector)
    }
  }
  const results = await builder.analyze()
  return results.violations
}

export async function expectNoViolations(page: Page, options?: { exclude?: string[] }) {
  const violations = await checkAccessibility(page, options)
  expect(violations, `Found ${violations.length} accessibility violations:\n${
    violations.map(v => `- ${v.id}: ${v.description} (${v.nodes.length} nodes)`).join('\n')
  }`).toHaveLength(0)
}
