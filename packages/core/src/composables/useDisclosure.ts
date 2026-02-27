import { ref, readonly, type Ref } from 'vue'

interface UseDisclosureOptions {
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const isOpen = ref(options.defaultOpen ?? false)

  function open() {
    if (!isOpen.value) {
      isOpen.value = true
      options.onOpen?.()
    }
  }

  function close() {
    if (isOpen.value) {
      isOpen.value = false
      options.onClose?.()
    }
  }

  function toggle() {
    if (isOpen.value) close()
    else open()
  }

  return { isOpen: readonly(isOpen), open, close, toggle }
}
