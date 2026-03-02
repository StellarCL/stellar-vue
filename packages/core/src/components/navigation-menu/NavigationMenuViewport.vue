<script setup lang="ts">
import type { NavigationMenuViewportProps } from './navigation-menu.types'
import { NavigationMenuViewport as NavigationMenuViewportPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<NavigationMenuViewportProps>(), {})

const classes = computed(() =>
  cn(
    'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-slate-150 bg-white text-popover-foreground shadow-soft font-inter dark:border-navy-500 dark:bg-navy-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
    props.class,
  ),
)
</script>

<template>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewportPrimitive :class="classes" />
  </div>
</template>
