<script setup lang="ts">
import { computed, inject } from 'vue'
import type { MultiSelectContentProps } from './multi-select.types'
import { cn } from '../../utils'

const props = defineProps<MultiSelectContentProps>()

const context = inject<any>('multiSelectContext')

const classes = computed(() =>
  cn(
    'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
    props.class,
  ),
)
</script>

<template>
  <div
    v-if="context?.open?.value"
    :class="classes"
    role="listbox"
    aria-multiselectable="true"
    data-multi-select-content
  >
    <slot />
  </div>
</template>
