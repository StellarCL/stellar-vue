import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { expect } from 'vitest'

// ─── Types ───────────────────────────────────────────────────────────────────

type AnyWrapper = VueWrapper<any> | DOMWrapper<Element>

interface MatcherResult {
  pass: boolean
  message: () => string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getElement(wrapper: AnyWrapper): Element {
  return wrapper.element
}

function hasValidAriaRole(element: Element): { valid: boolean, issue?: string } {
  const validRoles = new Set([
    'alert',
    'alertdialog',
    'application',
    'article',
    'banner',
    'button',
    'cell',
    'checkbox',
    'columnheader',
    'combobox',
    'complementary',
    'contentinfo',
    'definition',
    'dialog',
    'directory',
    'document',
    'feed',
    'figure',
    'form',
    'grid',
    'gridcell',
    'group',
    'heading',
    'img',
    'link',
    'list',
    'listbox',
    'listitem',
    'log',
    'main',
    'marquee',
    'math',
    'menu',
    'menubar',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'navigation',
    'none',
    'note',
    'option',
    'presentation',
    'progressbar',
    'radio',
    'radiogroup',
    'region',
    'row',
    'rowgroup',
    'rowheader',
    'scrollbar',
    'search',
    'searchbox',
    'separator',
    'slider',
    'spinbutton',
    'status',
    'switch',
    'tab',
    'table',
    'tablist',
    'tabpanel',
    'term',
    'textbox',
    'timer',
    'toolbar',
    'tooltip',
    'tree',
    'treegrid',
    'treeitem',
  ])

  const allElements = [element, ...Array.from(element.querySelectorAll('[role]'))]

  for (const el of allElements) {
    const role = el.getAttribute('role')
    if (role && !validRoles.has(role)) {
      return {
        valid: false,
        issue: `Element <${el.tagName.toLowerCase()}> has invalid ARIA role "${role}"`,
      }
    }
  }

  return { valid: true }
}

function hasImagesWithAlt(element: Element): { valid: boolean, issue?: string } {
  const images = Array.from(element.querySelectorAll('img'))
  for (const img of images) {
    if (!img.hasAttribute('alt')) {
      return {
        valid: false,
        issue: `<img> element is missing an alt attribute (src="${img.getAttribute('src') ?? ''}")`,
      }
    }
  }
  return { valid: true }
}

function hasLabelsForInputs(element: Element): { valid: boolean, issue?: string } {
  const inputs = Array.from(
    element.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"])'),
  )

  for (const input of inputs) {
    const id = input.getAttribute('id')
    const hasAriaLabel = input.hasAttribute('aria-label')
    const hasAriaLabelledby = input.hasAttribute('aria-labelledby')
    const hasAssociatedLabel = id
      ? (element.querySelector(`label[for="${id}"]`) !== null
        || document.querySelector(`label[for="${id}"]`) !== null)
      : false
    const isInsideLabel = input.closest('label') !== null

    if (!hasAriaLabel && !hasAriaLabelledby && !hasAssociatedLabel && !isInsideLabel) {
      return {
        valid: false,
        issue: `<input type="${input.getAttribute('type') ?? 'text'}"> is missing an accessible label (no aria-label, aria-labelledby, or associated <label>)`,
      }
    }
  }

  return { valid: true }
}

// ─── Custom Matchers ──────────────────────────────────────────────────────────

export const accessibilityMatchers = {
  /**
   * Checks basic ARIA accessibility: valid roles, img alt attributes, and labelled inputs.
   */
  toBeAccessible(wrapper: AnyWrapper): MatcherResult {
    const el = getElement(wrapper)

    const roleCheck = hasValidAriaRole(el)
    if (!roleCheck.valid) {
      return {
        pass: false,
        message: () => `Expected element to be accessible, but found ARIA issue: ${roleCheck.issue}`,
      }
    }

    const altCheck = hasImagesWithAlt(el)
    if (!altCheck.valid) {
      return {
        pass: false,
        message: () => `Expected element to be accessible, but found accessibility issue: ${altCheck.issue}`,
      }
    }

    const labelCheck = hasLabelsForInputs(el)
    if (!labelCheck.valid) {
      return {
        pass: false,
        message: () => `Expected element to be accessible, but found accessibility issue: ${labelCheck.issue}`,
      }
    }

    return {
      pass: true,
      message: () => 'Expected element not to be accessible, but all basic accessibility checks passed',
    }
  },

  /**
   * Checks if the document's active element is within the given wrapper.
   */
  toHaveFocusWithin(wrapper: AnyWrapper): MatcherResult {
    const el = getElement(wrapper)
    const active = document.activeElement

    if (!active || active === document.body) {
      return {
        pass: false,
        message: () => 'Expected focus to be within the element, but no element is focused',
      }
    }

    const hasFocus = el.contains(active)

    return {
      pass: hasFocus,
      message: () =>
        hasFocus
          ? `Expected focus not to be within the element, but <${active.tagName.toLowerCase()}> is focused inside it`
          : `Expected focus to be within the element, but the focused element <${active.tagName.toLowerCase()}> is outside it`,
    }
  },

  /**
   * Checks that the wrapper root element has a valid aria-label or aria-labelledby attribute.
   */
  toHaveAriaLabel(wrapper: AnyWrapper, label: string): MatcherResult {
    const el = getElement(wrapper)

    const ariaLabel = el.getAttribute('aria-label')
    if (ariaLabel === label) {
      return {
        pass: true,
        message: () => `Expected element not to have aria-label "${label}", but it does`,
      }
    }

    const labelledById = el.getAttribute('aria-labelledby')
    if (labelledById) {
      const labelEl = document.getElementById(labelledById)
      if (labelEl && labelEl.textContent?.trim() === label) {
        return {
          pass: true,
          message: () =>
            `Expected element not to have aria-labelledby pointing to "${label}", but it does`,
        }
      }
    }

    const hasAnyLabel = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby')
    const actualLabel = ariaLabel ?? (labelledById ? `[labelledby: ${labelledById}]` : 'none')

    return {
      pass: false,
      message: () =>
        hasAnyLabel
          ? `Expected element to have aria label "${label}", but got "${actualLabel}"`
          : `Expected element to have aria label "${label}", but no aria-label or aria-labelledby attribute was found`,
    }
  },

  /**
   * Checks that the element is disabled accessibly (via disabled attribute or aria-disabled="true").
   */
  toBeDisabledAccessibly(wrapper: AnyWrapper): MatcherResult {
    const el = getElement(wrapper)
    const hasDisabledAttr = (el as HTMLElement).hasAttribute('disabled')
    const hasAriaDisabled = el.getAttribute('aria-disabled') === 'true'

    const isDisabled = hasDisabledAttr || hasAriaDisabled

    return {
      pass: isDisabled,
      message: () =>
        isDisabled
          ? 'Expected element not to be disabled accessibly, but it has disabled or aria-disabled="true"'
          : 'Expected element to be disabled accessibly, but neither disabled attribute nor aria-disabled="true" was found',
    }
  },
}

/**
 * Installs all custom accessibility matchers into Vitest's expect.
 * Call this in your test setup file or at the top of a test file.
 *
 * @example
 * // vitest.setup.ts
 * import { setupMatchers } from '@stellar-vue-ui/test-utils'
 * setupMatchers()
 */
export function setupMatchers(): void {
  expect.extend(accessibilityMatchers)
}
