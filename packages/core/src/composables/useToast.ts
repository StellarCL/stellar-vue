import { ref, readonly } from 'vue'
import type { ToastItem, ToastOptions, ToastVariant } from '../components/toast/toast.types'

// Singleton toast state shared across all useToast() calls
const toasts = ref<ToastItem[]>([])
let toastId = 0

export function useToast() {
  function toast(options: ToastOptions): { id: number; dismiss: () => void } {
    const id = toastId++
    const t: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'default',
      action: options.action,
      duration: options.duration ?? 5000,
      open: true,
    }
    toasts.value.push(t)

    // Auto-dismiss after duration (unless duration is 0)
    if (t.duration > 0) {
      setTimeout(() => dismiss(id), t.duration)
    }

    return { id, dismiss: () => dismiss(id) }
  }

  function dismiss(id: number) {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value[index].open = false
      // Remove after animation completes
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, 300)
    }
  }

  return {
    toast,
    dismiss,
    toasts: readonly(toasts),
  }
}
