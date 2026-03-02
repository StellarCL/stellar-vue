<script setup lang="ts">
import type { DropdownMenuCheckboxItemProps } from './dropdown-menu.types'
import {
  DropdownMenuCheckboxItem as DropdownMenuCheckboxItemPrimitive,
  DropdownMenuItemIndicator,
} from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuCheckboxItemProps>(), {
  checked: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()

const classes = computed(() =>
  cn(
    'relative flex h-8 cursor-default select-none items-center rounded-sm pl-8 pr-3 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <DropdownMenuCheckboxItemPrimitive
    :checked="checked"
    :disabled="disabled"
    :class="classes"
    @update:checked="emit('update:checked', $event)"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
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
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItemPrimitive>
</template>
