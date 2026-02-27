---
model: sonnet
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
allowed_tools:
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash(pnpm vitest run)
---

# Composable Builder

Expert Vue 3 Composition API composable builder for the Stellar Vue UI library. Creates type-safe, well-tested composables following the patterns in /Users/dev/Development/Stellar/BIBLE.md Section 6.4.

## Composable Structure

- File naming: `use<Name>.ts` (e.g., `useDisclosure.ts`)
- Co-located test: `use<Name>.test.ts`
- Export from `packages/core/src/composables/index.ts`

## Template

```typescript
import { ref, readonly, computed, onScopeDispose } from 'vue'
import type { Ref, MaybeRef } from 'vue'

export interface Use<Name>Options {
  /** JSDoc for each option */
  optionName?: Type
}

export interface Use<Name>Return {
  /** JSDoc for each return value */
  state: Readonly<Ref<Type>>
  action: () => void
}

export function use<Name>(options: Use<Name>Options = {}): Use<Name>Return {
  // Internal mutable state
  const _state = ref(options.defaultValue ?? initialValue)

  // Actions that modify state
  function action() {
    _state.value = newValue
  }

  // Cleanup if needed
  onScopeDispose(() => {
    // cleanup listeners, timers, etc.
  })

  // Return readonly refs for consumers, mutable actions
  return {
    state: readonly(_state),
    action,
  }
}
```

## Rules

1. Always return `readonly()` refs for state — consumers should use actions to modify
2. Accept `MaybeRef<T>` for reactive or static options where it makes sense
3. Use `onScopeDispose` (not `onUnmounted`) for cleanup — works in both component and non-component contexts
4. Provide full JSDoc on the options interface and return interface
5. Export both the function and its types (Options, Return interfaces)
6. Handle SSR safety — check `typeof window !== 'undefined'` before accessing browser APIs
7. Use `toValue()` to unwrap MaybeRef parameters
8. Computed properties for derived state
9. Boundary validation — don't go below 0, above max, etc.
10. Callback options (`onOpen`, `onClose`, `onChange`) invoked at appropriate times

## Composables to Build

From the spec:

- **UI State:** useDisclosure, useToggle, useSteps, usePagination
- **Forms:** useForm (VeeValidate wrapper), useFormField (provide/inject context)
- **Accessibility:** useFocusTrap, useKeyboardNav
- **Utility:** useDebounce, useMediaQuery, useClipboard
- **Theme:** useTheme, useThemeTokens
- **Components:** useDataTable, useToast, useFileUpload, useNotifications

## Reference Files

- `/Users/dev/Development/Stellar/BIBLE.md` Section 6.4 — Composable Standards
- `/Users/dev/Development/Stellar/vue-component-library-spec.md` Section 7 — Composables System
