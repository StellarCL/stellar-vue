import { computed, isRef, readonly, ref, type Ref, unref } from 'vue'

interface UsePaginationOptions {
  total: Ref<number> | number
  pageSize?: Ref<number> | number
  page?: number
}

export function usePagination(options: UsePaginationOptions) {
  const page = ref(options.page ?? 1)
  const pageSize = isRef(options.pageSize) ? options.pageSize : ref(options.pageSize ?? 10)
  const total = isRef(options.total) ? options.total : ref(options.total)

  const totalPages = computed(() => Math.max(1, Math.ceil(unref(total) / unref(pageSize))))
  const isFirstPage = computed(() => page.value === 1)
  const isLastPage = computed(() => page.value >= totalPages.value)
  const range = computed(() => {
    const start = (page.value - 1) * unref(pageSize) + 1
    const end = Math.min(page.value * unref(pageSize), unref(total))
    return { start, end }
  })

  function next() {
    if (page.value < totalPages.value)
      page.value++
  }

  function prev() {
    if (page.value > 1)
      page.value--
  }

  function goTo(p: number) {
    if (p >= 1 && p <= totalPages.value)
      page.value = p
  }

  return {
    page,
    pageSize: readonly(pageSize),
    totalPages: readonly(totalPages),
    isFirstPage: readonly(isFirstPage),
    isLastPage: readonly(isLastPage),
    range: readonly(range),
    next,
    prev,
    goTo,
  }
}
