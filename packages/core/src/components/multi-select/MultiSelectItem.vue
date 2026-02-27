<script setup lang="ts">
import { computed, inject } from 'vue'
import type { MultiSelectItemProps } from './multi-select.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MultiSelectItemProps>(), {
  selected: false,
  disabled: false,
})

const context = inject<any>('multiSelectContext')

const isSelected = computed(() =>
  context?.selectedValues?.value?.includes(props.value) ?? props.selected,
)

const classes = computed(() =>
  cn(
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
    props.disabled && 'pointer-events-none opacity-50',
    props.class,
  ),
)

function handleClick() {
  if (props.disabled) return
  context?.toggleOption(props.value)
}
</script>

<template>
  <div
    :class="classes"
    role="option"
    :aria-selected="isSelected"
    :data-disabled="disabled || undefined"
    data-multi-select-item
    @click.stop="handleClick"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg
        v-if="isSelected"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
    <slot>{{ label }}</slot>
  </div>
</template>
