<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuTrigger as NavigationMenuTriggerPrimitive } from 'radix-vue'
import { cn } from '../../utils'
import type { NavigationMenuTriggerProps } from './navigation-menu.types'

const props = withDefaults(defineProps<NavigationMenuTriggerProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
    props.class,
  ),
)
</script>

<template>
  <NavigationMenuTriggerPrimitive :disabled="props.disabled" :class="classes">
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </NavigationMenuTriggerPrimitive>
</template>
