<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from './context-menu.types'
import { ContextMenuSubTrigger as ContextMenuSubTriggerPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ContextMenuSubTriggerProps>(), {
  inset: false,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'flex h-8 cursor-default select-none items-center rounded-sm px-3 text-sm outline-none focus:bg-primary/10 focus:text-primary data-[state=open]:bg-primary/10',
    props.inset && 'pl-8',
    props.class,
  ),
)
</script>

<template>
  <ContextMenuSubTriggerPrimitive :disabled="disabled" :class="classes">
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
      class="ml-auto h-4 w-4"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </ContextMenuSubTriggerPrimitive>
</template>
