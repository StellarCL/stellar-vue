import { ref, readonly, watch, type Ref, onUnmounted } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 300): Readonly<Ref<T>> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(value, (newVal) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return readonly(debouncedValue)
}
