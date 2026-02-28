import { readonly, ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard
  let timer: ReturnType<typeof setTimeout> | null = null

  async function copy(text: string) {
    if (!isSupported)
      return
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      if (timer)
        clearTimeout(timer)
      timer = setTimeout(() => {
        copied.value = false
      }, 2000)
    }
    catch {
      copied.value = false
    }
  }

  return { copy, copied: readonly(copied), isSupported }
}
