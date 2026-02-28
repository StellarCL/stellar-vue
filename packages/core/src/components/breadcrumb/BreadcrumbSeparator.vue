<script setup lang="ts">
import type { BreadcrumbSeparatorProps } from './breadcrumb.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<BreadcrumbSeparatorProps>()

const classes = computed(() =>
  cn('[&>svg]:w-3.5 [&>svg]:h-3.5 text-muted-foreground', props.class),
)
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="classes"
  >
    <slot>/</slot>
  </li>
</template>
