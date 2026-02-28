import { readonly, ref, type Ref, watch } from 'vue'

export interface UsePresenceReturn {
  isPresent: Readonly<Ref<boolean>>
  isAnimating: Readonly<Ref<boolean>>
  safeToRemove: () => void
}

export function usePresence(show: Ref<boolean>): UsePresenceReturn {
  const isPresent = ref(show.value)
  const isAnimating = ref(false)

  watch(show, (newValue) => {
    if (newValue) {
      // Entering: add to DOM immediately
      isPresent.value = true
      isAnimating.value = false
    }
    else {
      // Exiting: start exit animation, keep in DOM until safeToRemove() is called
      isAnimating.value = true
    }
  })

  function safeToRemove() {
    // Called when exit animation completes — remove from DOM
    isPresent.value = false
    isAnimating.value = false
  }

  return {
    isPresent: readonly(isPresent),
    isAnimating: readonly(isAnimating),
    safeToRemove,
  }
}
