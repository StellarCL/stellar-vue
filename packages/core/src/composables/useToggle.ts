import { readonly, ref } from 'vue'

export function useToggle(defaultValue = false) {
  const value = ref(defaultValue)

  return {
    value: readonly(value),
    toggle: () => { value.value = !value.value },
    setTrue: () => { value.value = true },
    setFalse: () => { value.value = false },
  }
}
