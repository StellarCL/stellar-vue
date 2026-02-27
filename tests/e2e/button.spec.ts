import { test, expect } from '@playwright/test'

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/button')
  })

  test('renders with correct text', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' })
    await expect(button).toBeVisible()
  })

  test('handles click events', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' })
    await button.click()
    await expect(page.getByText('Clicked!')).toBeVisible()
  })

  test('supports keyboard activation with Enter', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByText('Clicked!')).toBeVisible()
  })

  test('supports keyboard activation with Space', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Click me' })
    await button.focus()
    await page.keyboard.press('Space')
    await expect(page.getByText('Clicked!')).toBeVisible()
  })

  test('does not fire when disabled', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Disabled' })
    await expect(button).toBeDisabled()
  })

  test('shows loading state', async ({ page }) => {
    const button = page.getByTestId('loading-button')
    await expect(button).toBeVisible()
    await expect(button).toBeDisabled()
  })

  test('renders all variants', async ({ page }) => {
    for (const variant of ['Default', 'Secondary', 'Destructive', 'Outline', 'Ghost', 'Link']) {
      await expect(page.getByRole('button', { name: variant })).toBeVisible()
    }
  })
})
