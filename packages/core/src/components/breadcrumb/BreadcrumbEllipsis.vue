<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbEllipsisProps } from './breadcrumb.types'
import { cn } from '../../utils'

const props = defineProps<BreadcrumbEllipsisProps>()

const classes = computed(() =>
  cn('flex h-9 w-9 items-center justify-center', props.class),
)
</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    :class="classes"
  >
    <slot>
      <span aria-hidden="true">&#8230;</span>
      <span class="sr-only">More</span>
    </slot>
  </span>
</template>
