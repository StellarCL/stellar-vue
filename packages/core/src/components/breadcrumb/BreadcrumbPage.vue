<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbPageProps } from './breadcrumb.types'
import { cn } from '../../utils'

const props = defineProps<BreadcrumbPageProps>()

const classes = computed(() =>
  cn('font-normal text-foreground', props.class),
)
</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="classes"
  >
    <slot />
  </span>
</template>
