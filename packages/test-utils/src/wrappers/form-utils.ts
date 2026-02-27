import type { VueWrapper, DOMWrapper } from '@vue/test-utils'

type AnyWrapper = VueWrapper<any>

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FillFormOptions {
  /**
   * If true, triggers the 'input' event in addition to 'change'. Defaults to true.
   */
  triggerInput?: boolean
  /**
   * If true, triggers the 'change' event. Defaults to true.
   */
  triggerChange?: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Finds all labels in a wrapper and returns a map of label text -> associated input element.
 */
function buildLabelMap(wrapper: AnyWrapper): Map<string, Element> {
  const map = new Map<string, Element>()
  const el = wrapper.element

  // Find all label elements
  const labels = Array.from(el.querySelectorAll('label'))
  for (const label of labels) {
    const text = label.textContent?.trim() ?? ''
    if (!text) continue

    // Find associated input by for/id pair
    const forAttr = label.getAttribute('for')
    if (forAttr) {
      const input =
        el.querySelector(`[id="${forAttr}"]`) ?? document.getElementById(forAttr)
      if (input) {
        map.set(text, input)
        continue
      }
    }

    // Find input nested inside label
    const nested = label.querySelector('input, select, textarea')
    if (nested) {
      map.set(text, nested)
    }
  }

  return map
}

// ─── Utilities ───────────────────────────────────────────────────────────────

/**
 * Fills form fields in a mounted wrapper by matching label text to inputs,
 * then setting values and triggering appropriate events.
 *
 * @param wrapper - The VTU wrapper containing the form
 * @param fieldValues - A map of label text to the value to set
 * @param options - Additional options for event triggering
 *
 * @example
 * await fillForm(wrapper, { Email: 'user@example.com', Password: 'secret' })
 */
export async function fillForm(
  wrapper: AnyWrapper,
  fieldValues: Record<string, string>,
  options: FillFormOptions = {},
): Promise<void> {
  const { triggerInput = true, triggerChange = true } = options
  const labelMap = buildLabelMap(wrapper)

  for (const [labelText, value] of Object.entries(fieldValues)) {
    // Try matching by label first
    let inputEl = labelMap.get(labelText) ?? null

    // Fallback: find by placeholder, name, or id attribute matching the key
    if (!inputEl) {
      const key = labelText.toLowerCase().replace(/\s+/g, '-')
      inputEl =
        wrapper.element.querySelector(`[placeholder="${labelText}"]`) ??
        wrapper.element.querySelector(`[name="${key}"]`) ??
        wrapper.element.querySelector(`[id="${key}"]`) ??
        null
    }

    if (!inputEl) {
      console.warn(`[fillForm] Could not find input for label "${labelText}"`)
      continue
    }

    const tagName = inputEl.tagName.toLowerCase()
    const inputType = (inputEl as HTMLInputElement).type?.toLowerCase()

    if (tagName === 'select') {
      const selectWrapper = wrapper.find(`[id="${inputEl.id}"], [name="${(inputEl as HTMLSelectElement).name}"]`) as DOMWrapper<HTMLSelectElement>
      if (selectWrapper.exists()) {
        await selectWrapper.setValue(value)
      }
    } else if (tagName === 'input' && (inputType === 'checkbox' || inputType === 'radio')) {
      ;(inputEl as HTMLInputElement).checked = value === 'true' || value === '1'
      if (triggerChange) {
        inputEl.dispatchEvent(new Event('change', { bubbles: true }))
      }
    } else {
      // Text input or textarea
      ;(inputEl as HTMLInputElement | HTMLTextAreaElement).value = value

      if (triggerInput) {
        inputEl.dispatchEvent(new Event('input', { bubbles: true }))
      }
      if (triggerChange) {
        inputEl.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }

    // Allow Vue to process updates
    await wrapper.vm.$nextTick?.()
  }
}

/**
 * Triggers form submission on the first form element found in the wrapper.
 *
 * @param wrapper - The VTU wrapper containing the form
 *
 * @example
 * await submitForm(wrapper)
 */
export async function submitForm(wrapper: AnyWrapper): Promise<void> {
  const formEl = wrapper.element.tagName === 'FORM'
    ? wrapper.element
    : wrapper.element.querySelector('form')

  if (!formEl) {
    // Try finding a submit button and clicking it
    const submitBtn =
      wrapper.element.querySelector('[type="submit"]') ??
      wrapper.element.querySelector('button:not([type="button"]):not([type="reset"])')

    if (submitBtn) {
      ;(submitBtn as HTMLElement).click()
    } else {
      console.warn('[submitForm] No form element or submit button found')
    }
    return
  }

  formEl.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

  if (wrapper.vm?.$nextTick) {
    await wrapper.vm.$nextTick()
  }
}

/**
 * Returns an array of error message strings displayed inside the form wrapper.
 * Looks for common error message patterns: [role="alert"], .error, [aria-invalid] messages.
 *
 * @param wrapper - The VTU wrapper containing the form
 *
 * @example
 * const errors = getErrors(wrapper)
 * expect(errors).toContain('Email is required')
 */
export function getErrors(wrapper: AnyWrapper): string[] {
  const errorSelectors = [
    '[role="alert"]',
    '[aria-live="polite"]',
    '[aria-live="assertive"]',
    '.error-message',
    '.field-error',
    '[data-error]',
    'p.text-destructive',
    '[id$="-message"]',
    '.form-message',
  ]

  const seen = new Set<string>()
  const errors: string[] = []

  for (const selector of errorSelectors) {
    const els = Array.from(wrapper.element.querySelectorAll(selector))
    for (const el of els) {
      const text = el.textContent?.trim()
      if (text && !seen.has(text)) {
        seen.add(text)
        errors.push(text)
      }
    }
  }

  return errors
}
