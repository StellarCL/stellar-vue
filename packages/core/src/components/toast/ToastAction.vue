<script setup lang="ts">
import { computed } from 'vue'
import { ToastAction } from 'radix-vue'
import type { ToastActionProps } from './toast.types'
import { cn } from '../../utils'

const props = defineProps<ToastActionProps>()

const classes = computed(() =>
  cn(
    'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
    props.class,
  ),
)
</script>

<template>
  <ToastAction :alt-text="props.altText" :class="classes">
    <slot />
  </ToastAction>
</template>
