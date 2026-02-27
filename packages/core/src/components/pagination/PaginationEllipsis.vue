<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationEllipsisProps } from './pagination.types'
import { cn } from '../../utils'

const props = defineProps<PaginationEllipsisProps>()

const classes = computed(() =>
  cn('flex h-10 w-10 items-center justify-center', props.class),
)
</script>

<template>
  <span
    aria-hidden="true"
    :class="classes"
  >
    <slot>
      <span>&#8230;</span>
      <span class="sr-only">More pages</span>
    </slot>
  </span>
</template>
