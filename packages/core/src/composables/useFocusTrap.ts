import { onUnmounted, readonly, ref, type Ref } from 'vue'

interface UseFocusTrapOptions {
  enabled?: Ref<boolean> | boolean
  returnFocusOnDeactivate?: boolean
  initialFocus?: Ref<HTMLElement | null>
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, options: UseFocusTrapOptions = {}) {
  const isActive = ref(false)
  let previousFocus: HTMLElement | null = null

  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value)
      return []
    return Array.from(containerRef.value.querySelectorAll(FOCUSABLE_SELECTOR))
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !isActive.value)
      return
    const elements = getFocusableElements()
    if (elements.length === 0)
      return

    const first = elements[0]
    const last = elements[elements.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
    else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function activate() {
    if (isActive.value)
      return
    previousFocus = document.activeElement as HTMLElement
    isActive.value = true
    document.addEventListener('keydown', handleKeyDown)

    // Focus initial element or first focusable
    const initialEl = options.initialFocus && 'value' in options.initialFocus ? options.initialFocus.value : null
    if (initialEl) {
      initialEl.focus()
    }
    else {
      const elements = getFocusableElements()
      if (elements.length > 0)
        elements[0].focus()
    }
  }

  function deactivate() {
    if (!isActive.value)
      return
    isActive.value = false
    document.removeEventListener('keydown', handleKeyDown)

    if (options.returnFocusOnDeactivate !== false && previousFocus) {
      previousFocus.focus()
    }
  }

  onUnmounted(() => {
    deactivate()
  })

  return { activate, deactivate, isActive: readonly(isActive) }
}
