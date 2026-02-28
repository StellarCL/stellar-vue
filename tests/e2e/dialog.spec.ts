import { expect, test } from '@playwright/test'

test.describe('Dialog Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dialog')
  })

  test('opens on trigger click', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('closes on Escape key', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('closes on overlay click', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    // Click the overlay (outside the dialog content)
    await page.locator('[data-radix-dialog-overlay]').click({ position: { x: 10, y: 10 } })
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('traps focus within dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Tab through focusable elements — focus should stay within dialog
    const focusableElements = dialog.locator('button, input, [tabindex="0"]')
    const count = await focusableElements.count()

    for (let i = 0; i < count + 1; i++) {
      await page.keyboard.press('Tab')
      const activeElement = page.locator(':focus')
      await expect(dialog).toContainText(await activeElement.textContent() ?? '')
    }
  })

  test('renders title and description', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click()
    await expect(page.getByRole('dialog')).toContainText('Dialog Title')
    await expect(page.getByRole('dialog')).toContainText('Dialog description text')
  })
})
