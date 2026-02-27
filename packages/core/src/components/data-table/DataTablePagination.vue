<script setup lang="ts">
import { computed } from 'vue'
import type { DataTablePaginationProps } from './data-table.types'
import { cn } from '../../utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
} from '../pagination'

const props = defineProps<DataTablePaginationProps>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const classes = computed(() =>
  cn('flex items-center justify-between px-2', props.class),
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize)),
)

const isFirstPage = computed(() => props.page <= 1)
const isLastPage = computed(() => props.page >= totalPages.value)

// Build page range with ellipsis markers
const pageRange = computed<Array<number | 'ellipsis'>>(() => {
  const total = totalPages.value
  const current = props.page
  const siblings = 1
  const DOTS = 'ellipsis' as const

  const showAll = total <= siblings * 2 + 5
  if (showAll) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(current - siblings, 1)
  const rightSiblingIndex = Math.min(current + siblings, total)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < total - 1

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + siblings * 2
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, DOTS, total]
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + siblings * 2
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1,
    )
    return [1, DOTS, ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  )
  return [1, DOTS, ...middleRange, DOTS, total]
})

function goTo(p: number) {
  emit('update:page', p)
}
</script>

<template>
  <div :class="classes">
    <!-- Row selection info -->
    <div class="flex-1 text-sm text-muted-foreground">
      {{ selectedCount }} of {{ total }} row(s) selected
    </div>

    <!-- Pagination controls -->
    <Pagination
      :total="total"
      :page-size="pageSize"
      :page="page"
      @update:page="goTo"
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            :disabled="isFirstPage"
            @click="goTo(1)"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            :disabled="isFirstPage"
            @click="goTo(page - 1)"
          />
        </PaginationItem>

        <template
          v-for="(p, idx) in pageRange"
          :key="typeof p === 'number' ? p : `ellipsis-${idx}`"
        >
          <PaginationItem v-if="p === 'ellipsis'">
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem v-else>
            <PaginationLink
              :page="p"
              :is-active="p === page"
              @click="goTo(p)"
            />
          </PaginationItem>
        </template>

        <PaginationItem>
          <PaginationNext
            :disabled="isLastPage"
            @click="goTo(page + 1)"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            :disabled="isLastPage"
            @click="goTo(totalPages)"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
</template>
