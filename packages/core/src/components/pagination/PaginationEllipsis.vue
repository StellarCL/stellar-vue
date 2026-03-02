<script setup lang="ts">
import type { PaginationEllipsisProps } from './pagination.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<PaginationEllipsisProps>()

const classes = computed(() =>
  cn('flex h-8 min-w-[2rem] items-center justify-center font-inter', props.class),
)
</script>

<template>
  <span aria-hidden="true" :class="classes">
    <slot>
      <span>&#8230;</span>
      <span class="sr-only">More pages</span>
    </slot>
  </span>
</template>
