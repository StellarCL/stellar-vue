<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbProps } from './breadcrumb.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  ariaLabel: 'Breadcrumb',
})

const classes = computed(() => cn(props.class))
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    :class="classes"
  >
    <slot />
  </nav>
</template>
