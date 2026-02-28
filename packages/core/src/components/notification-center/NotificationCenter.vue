<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NotificationCenterProps } from './notification-center.types'
import { cn } from '../../utils'
import NotificationList from './NotificationList.vue'

const props = withDefaults(defineProps<NotificationCenterProps>(), {
  open: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'mark-read': [id: string]
  'mark-all-read': []
  'dismiss': [id: string]
  'action': [id: string]
}>()

const internalOpen = ref(false)

const isOpen = computed({
  get() {
    return props.open !== undefined ? props.open : internalOpen.value
  },
  set(value: boolean) {
    internalOpen.value = value
    emit('update:open', value)
  },
})

const unreadCount = computed(() =>
  props.notifications.filter((n) => !n.read).length,
)

const classes = computed(() =>
  cn('relative inline-block', props.class),
)

function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div :class="classes" data-testid="notification-center">
    <!-- Trigger button -->
    <button
      type="button"
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      aria-label="Notifications"
      data-testid="notification-trigger"
      @click="toggleOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>

      <!-- Badge count -->
      <span
        v-if="unreadCount > 0"
        class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-medium text-destructive-foreground"
        data-testid="notification-badge"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-background shadow-lg"
      data-testid="notification-dropdown"
    >
      <NotificationList
        :notifications="notifications"
        @mark-read="emit('mark-read', $event)"
        @mark-all-read="emit('mark-all-read')"
        @dismiss="emit('dismiss', $event)"
        @action="emit('action', $event)"
      />
    </div>
  </div>
</template>
