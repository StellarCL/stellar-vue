# Accessibility

Accessibility is a core design principle of Stellar Vue UI. Every component is built on [Radix Vue](https://www.radix-vue.com/) primitives, which implement WAI-ARIA design patterns and have been extensively tested across screen readers and assistive technologies.

## What You Get Out of the Box

### ARIA Attributes

All interactive components include the correct ARIA roles, states, and properties automatically. For example:

- **Dialog** uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the dialog title
- **Accordion** uses `role="region"` with `aria-labelledby` and `aria-expanded` on triggers
- **Tabs** use `role="tablist"`, `role="tab"`, and `role="tabpanel"` with proper `aria-selected` states
- **Select** uses `role="combobox"` with `aria-expanded`, `aria-activedescendant`, and `listbox` patterns
- **Tooltip** uses `role="tooltip"` with `aria-describedby` linking the trigger to the content

You do not need to add these attributes manually. They are part of the component implementation.

### Keyboard Navigation

Every interactive component supports full keyboard navigation following WAI-ARIA authoring practices:

| Component | Key Patterns |
|-----------|-------------|
| **Button** | `Enter` or `Space` to activate |
| **Dialog** | `Escape` to close, focus trapped inside |
| **Dropdown Menu** | `Arrow Up/Down` to navigate, `Enter` to select, `Escape` to close |
| **Tabs** | `Arrow Left/Right` to switch tabs, `Home/End` for first/last |
| **Accordion** | `Arrow Up/Down` between items, `Enter/Space` to expand |
| **Select** | `Arrow Up/Down` to navigate options, `Enter` to select, type-ahead search |
| **Slider** | `Arrow Left/Right` to adjust, `Home/End` for min/max |
| **Switch** | `Space` to toggle |
| **Checkbox** | `Space` to toggle |
| **Radio Group** | `Arrow Up/Down` or `Arrow Left/Right` to navigate options |
| **Context Menu** | Right-click to open, arrow keys to navigate |
| **Command** | Type to filter, arrow keys to navigate, `Enter` to select |

### Focus Management

- **Focus trapping**: Dialogs and modal overlays trap focus inside the component so keyboard users cannot tab out to content behind the overlay
- **Focus restoration**: When a dialog closes, focus returns to the element that triggered it
- **Focus visible**: All interactive elements show a visible focus ring when navigated via keyboard, using the `:focus-visible` CSS pseudo-class
- **Skip navigation**: Components respect logical tab order and do not create tab traps

### Screen Reader Support

- All components announce their purpose, state, and available actions
- Live regions (`aria-live`) are used for dynamic content changes (e.g., toast notifications, loading states)
- Button loading states include `aria-busy="true"` so screen readers can announce the state change
- Form validation errors are linked to their inputs via `aria-describedby`

## Composables for Accessibility

Stellar provides composables that help you build accessible custom components:

### useFocusTrap

Traps focus within a container element. Used internally by Dialog and other modal components:

```vue
<script setup lang="ts">
import { useFocusTrap } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const { activate, deactivate } = useFocusTrap(containerRef)
</script>
```

### useKeyboardNav

Manages arrow key navigation within a list of items. Used internally by menus, selects, and radio groups:

```vue
<script setup lang="ts">
import { useKeyboardNav } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const items = ref(['Option A', 'Option B', 'Option C'])
const { activeIndex, onKeyDown } = useKeyboardNav(items, {
  orientation: 'vertical',
  loop: true,
})
</script>
```

## Testing Accessibility

### Automated Testing with axe-core

We recommend integrating [axe-core](https://github.com/dequelabs/axe-core) into your test suite to catch accessibility regressions automatically:

```typescript
import { Button } from '@stellar-vue-ui/core'
import { mount } from '@vue/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Button has no accessibility violations', async () => {
  const wrapper = mount(Button, {
    slots: { default: 'Click me' },
  })
  const results = await axe(wrapper.element)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

When building pages with Stellar components, verify these items:

1. **Keyboard-only navigation**: Can you reach and operate every interactive element using only the keyboard?
2. **Screen reader announcements**: Do components announce their type, state, and purpose? (Test with VoiceOver on macOS, NVDA or JAWS on Windows)
3. **Color contrast**: Do text and interactive elements meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)?
4. **Zoom**: Does the layout remain usable at 200% browser zoom?
5. **Reduced motion**: Do animations respect the `prefers-reduced-motion` media query?
6. **Focus indicators**: Is the currently focused element always visually identifiable?

### Browser Extensions

These tools help you inspect accessibility issues during development:

- **axe DevTools** — Scans the page for WCAG violations
- **Lighthouse** — Built into Chrome DevTools, includes an accessibility audit
- **WAVE** — Visual accessibility evaluation tool
- **Accessibility Insights** — Microsoft's accessibility testing tool

## Color Contrast in Themes

All 6 built-in theme presets are designed to meet WCAG 2.1 AA contrast ratios in both light and dark modes. If you create custom themes, use a contrast checker to verify that:

- `foreground` on `background` meets 4.5:1
- `primary-foreground` on `primary` meets 4.5:1
- `destructive-foreground` on `destructive` meets 4.5:1
- `muted-foreground` on `background` meets 4.5:1

The [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) and the [OKLCH color picker](https://oklch.com/) are helpful tools for designing accessible palettes.

## Reduced Motion

Stellar's animation system respects the `prefers-reduced-motion` media query. When a user has requested reduced motion in their OS settings, animations are disabled or replaced with instant transitions:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The `@stellar-vue-ui/animations` package handles this automatically for all transition presets.

## Next Steps

- Review the [Components](/components/button) documentation for component-specific accessibility details
- Set up [Dark Mode](/guide/dark-mode) with proper contrast in both modes
- Use the [CLI](/guide/cli) to scaffold accessible component patterns
