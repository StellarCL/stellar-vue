<script setup lang="ts">
import type { BreadcrumbListProps } from './breadcrumb.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<BreadcrumbListProps>()

const classes = computed(() =>
  cn(
    'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
    props.class,
  ),
)
</script>

<template>
  <ol :class="classes">
    <slot />
  </ol>
</template>
