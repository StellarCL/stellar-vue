<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from './dropdown-menu.types'
import { DropdownMenuSubTrigger as DropdownMenuSubTriggerPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuSubTriggerProps>(), {
  inset: false,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
    props.inset && 'pl-8',
    props.class,
  ),
)
</script>

<template>
  <DropdownMenuSubTriggerPrimitive :disabled="disabled" :class="classes">
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
  </DropdownMenuSubTriggerPrimitive>
</template>
