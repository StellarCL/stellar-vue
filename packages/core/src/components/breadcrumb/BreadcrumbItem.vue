<script setup lang="ts">
import type { BreadcrumbItemProps } from './breadcrumb.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<BreadcrumbItemProps>()

const classes = computed(() =>
  cn('inline-flex items-center gap-1.5', props.class),
)
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
