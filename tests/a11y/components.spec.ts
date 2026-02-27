import { test } from '@playwright/test'
import { expectNoViolations } from './a11y-utils'

test.describe('Accessibility Tests', () => {
  test('Button - all variants pass accessibility checks', async ({ page }) => {
    await page.goto('/button')
    await expectNoViolations(page)
  })

  test('Input - with label passes accessibility checks', async ({ page }) => {
    await page.goto('/form-inputs')
    await expectNoViolations(page)
  })

  test('Dialog - when open passes accessibility checks', async ({ page }) => {
    await page.goto('/dialog')
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    await expectNoViolations(page)
  })

  test('Select - passes accessibility checks', async ({ page }) => {
    await page.goto('/form-inputs')
    await expectNoViolations(page)
  })

  test('Checkbox - passes accessibility checks', async ({ page }) => {
    await page.goto('/form-inputs')
    await expectNoViolations(page)
  })

  test('Radio Group - passes accessibility checks', async ({ page }) => {
    await page.goto('/form-inputs')
    await expectNoViolations(page)
  })

  test('Switch - passes accessibility checks', async ({ page }) => {
    await page.goto('/form-inputs')
    await expectNoViolations(page)
  })
})
