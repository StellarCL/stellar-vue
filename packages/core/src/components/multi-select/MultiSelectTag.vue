<script setup lang="ts">
import type { MultiSelectTagProps } from './multi-select.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MultiSelectTagProps>(), {
  removable: true,
})

const emit = defineEmits<{
  remove: [value: string]
}>()

const context = inject<any>('multiSelectContext')

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1 rounded-md border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground',
    props.class,
  ),
)

function handleRemove(event: MouseEvent) {
  event.stopPropagation()
  if (context?.disabled?.value)
    return
  context?.removeValue(props.value)
  emit('remove', props.value)
}
</script>

<template>
  <span :class="classes" data-multi-select-tag>
    <span>{{ label }}</span>
    <button
      v-if="removable"
      type="button"
      class="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-1 hover:bg-secondary-foreground/20"
      :aria-label="`Remove ${label}`"
      data-multi-select-tag-remove
      @click="handleRemove"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-3 w-3"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>
