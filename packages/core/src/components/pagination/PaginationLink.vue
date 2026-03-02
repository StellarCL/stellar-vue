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
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-inter transition-colors',
    'focus:outline-none focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'h-8 min-w-[2rem]',
    props.isActive ? 'bg-primary text-white' : 'hover:bg-accent hover:text-accent-foreground',
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
