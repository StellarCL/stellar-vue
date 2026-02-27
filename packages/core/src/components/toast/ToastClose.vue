<script setup lang="ts">
import { computed } from 'vue'
import { ToastClose } from 'radix-vue'
import type { ToastCloseProps } from './toast.types'
import { cn } from '../../utils'

const props = defineProps<ToastCloseProps>()

const classes = computed(() =>
  cn(
    'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
    props.class,
  ),
)
</script>

<template>
  <ToastClose :class="classes">
    <slot>
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
    </slot>
  </ToastClose>
</template>
