<script setup lang="ts">
import { computed } from 'vue'
import type { NotificationEmptyProps } from './notification-center.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<NotificationEmptyProps>(), {
  message: 'No notifications',
})

const classes = computed(() =>
  cn(
    'flex flex-col items-center justify-center px-4 py-8 text-center text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" data-testid="notification-empty">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="mb-3 text-muted-foreground/50"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
    <p class="text-sm">{{ message }}</p>
    <slot />
  </div>
</template>
