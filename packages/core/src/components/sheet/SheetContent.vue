<script setup lang="ts">
import type { SheetContentProps } from './sheet.types'
import {
  DialogClose,
  DialogContent as DialogContentPrimitive,
  DialogOverlay,
  DialogPortal,
} from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'
import { sheetContentVariants } from './sheet.variants'

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'bottom',
  size: 'md',
})

const classes = computed(() =>
  cn(sheetContentVariants({ side: props.side, size: props.size }), props.class),
)

const isBottomSide = computed(() => props.side === 'bottom')
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContentPrimitive :class="classes" v-bind="$attrs">
      <!-- Drag handle for bottom sheet on mobile -->
      <div
        v-if="isBottomSide"
        class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted sheet-drag-handle"
        aria-hidden="true"
      />
      <slot />
      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContentPrimitive>
  </DialogPortal>
</template>
