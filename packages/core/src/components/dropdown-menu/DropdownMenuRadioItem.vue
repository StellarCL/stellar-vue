<script setup lang="ts">
import type { DropdownMenuRadioItemProps } from './dropdown-menu.types'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem as DropdownMenuRadioItemPrimitive,
} from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuRadioItemProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'relative flex h-8 cursor-default select-none items-center rounded-sm pl-8 pr-3 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <DropdownMenuRadioItemPrimitive :value="value" :disabled="disabled" :class="classes">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" fill="currentColor" />
        </svg>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItemPrimitive>
</template>
