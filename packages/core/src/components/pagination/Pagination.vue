<script setup lang="ts">
import type { PaginationProps } from './pagination.types'
import { computed, provide, toRef, watch } from 'vue'
import { usePagination } from '../../composables/usePagination'
import { cn } from '../../utils'

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  page: 1,
  siblingCount: 1,
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const pagination = usePagination({
  total: toRef(props, 'total'),
  pageSize: toRef(props, 'pageSize'),
  page: props.page,
})

// Keep internal page in sync when the prop changes externally
watch(
  () => props.page,
  (newPage) => {
    if (newPage !== pagination.page.value) {
      pagination.goTo(newPage)
    }
  },
)

function goTo(p: number) {
  pagination.goTo(p)
  emit('update:page', pagination.page.value)
}

function next() {
  pagination.next()
  emit('update:page', pagination.page.value)
}

function prev() {
  pagination.prev()
  emit('update:page', pagination.page.value)
}

function goToFirst() {
  pagination.goTo(1)
  emit('update:page', pagination.page.value)
}

function goToLast() {
  pagination.goTo(pagination.totalPages.value)
  emit('update:page', pagination.page.value)
}

/**
 * Build the page range array including ellipsis markers.
 * Returns an array of page numbers and 'ellipsis' strings.
 */
const pageRange = computed<Array<number | 'ellipsis'>>(() => {
  const total = pagination.totalPages.value
  const current = pagination.page.value
  const siblings = props.siblingCount

  // Always show first, last, current, and siblings around current
  const DOTS = 'ellipsis' as const

  // Total items shown = first + last + current + (siblings * 2) + potentially 2 ellipsis
  // If total pages is small enough to show all without ellipsis:
  const showAll = total <= siblings * 2 + 5
  if (showAll) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(current - siblings, 1)
  const rightSiblingIndex = Math.min(current + siblings, total)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < total - 1

  if (!showLeftDots && showRightDots) {
    // Show more pages at the start
    const leftItemCount = 3 + siblings * 2
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, DOTS, total]
  }

  if (showLeftDots && !showRightDots) {
    // Show more pages at the end
    const rightItemCount = 3 + siblings * 2
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1,
    )
    return [1, DOTS, ...rightRange]
  }

  // Show dots on both sides
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  )
  return [1, DOTS, ...middleRange, DOTS, total]
})

provide('pagination', {
  page: pagination.page,
  totalPages: pagination.totalPages,
  isFirstPage: pagination.isFirstPage,
  isLastPage: pagination.isLastPage,
  pageRange,
  goTo,
  next,
  prev,
  goToFirst,
  goToLast,
})

const classes = computed(() =>
  cn('mx-auto flex w-full justify-center', props.class),
)
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    :class="classes"
  >
    <slot />
  </nav>
</template>
