<script setup lang="ts">
import type { PaginationLinkProps } from './pagination.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<PaginationLinkProps>(), {
  isActive: false,
  disabled: false,
})

const emit = defineEmits<{
  click: [page: number]
}>()

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'h-10 w-10',
    props.isActive
      ? 'bg-accent text-accent-foreground border border-input'
      : 'hover:bg-accent hover:text-accent-foreground',
    props.class,
  ),
)

function handleClick() {
  if (!props.disabled) {
    emit('click', props.page)
  }
}
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="props.disabled"
    :aria-current="props.isActive ? 'page' : undefined"
    @click="handleClick"
  >
    <slot>{{ props.page }}</slot>
  </button>
</template>
