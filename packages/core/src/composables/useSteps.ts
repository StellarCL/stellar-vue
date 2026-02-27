import { ref, readonly, computed } from 'vue'

interface UseStepsOptions {
  total: number
  initial?: number
}

export function useSteps(options: UseStepsOptions) {
  const current = ref(options.initial ?? 1)
  const total = options.total

  const isFirst = computed(() => current.value === 1)
  const isLast = computed(() => current.value === total)
  const progress = computed(() => ((current.value - 1) / (total - 1)) * 100)

  function next() {
    if (current.value < total) current.value++
  }

  function prev() {
    if (current.value > 1) current.value--
  }

  function goTo(step: number) {
    if (step >= 1 && step <= total) current.value = step
  }

  return {
    current: readonly(current),
    total,
    isFirst: readonly(isFirst),
    isLast: readonly(isLast),
    progress: readonly(progress),
    next,
    prev,
    goTo,
  }
}
