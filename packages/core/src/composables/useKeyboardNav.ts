import { ref, readonly, type Ref } from 'vue'

interface UseKeyboardNavOptions {
  items: Ref<HTMLElement[]>
  orientation?: 'horizontal' | 'vertical'
  loop?: boolean
}

export function useKeyboardNav(options: UseKeyboardNavOptions) {
  const activeIndex = ref(0)
  const { orientation = 'vertical', loop = true } = options

  const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  function onKeyDown(e: KeyboardEvent) {
    const items = options.items.value
    if (items.length === 0) return

    if (e.key === nextKey) {
      e.preventDefault()
      if (activeIndex.value < items.length - 1) {
        activeIndex.value++
      } else if (loop) {
        activeIndex.value = 0
      }
      items[activeIndex.value]?.focus()
    } else if (e.key === prevKey) {
      e.preventDefault()
      if (activeIndex.value > 0) {
        activeIndex.value--
      } else if (loop) {
        activeIndex.value = items.length - 1
      }
      items[activeIndex.value]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      activeIndex.value = 0
      items[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      activeIndex.value = items.length - 1
      items[items.length - 1]?.focus()
    }
  }

  return { activeIndex: readonly(activeIndex), onKeyDown }
}
