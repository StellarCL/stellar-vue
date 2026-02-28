<script setup lang="ts">
import type { Notification, NotificationListProps } from './notification-center.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import NotificationEmpty from './NotificationEmpty.vue'
import NotificationGroup from './NotificationGroup.vue'

const props = defineProps<NotificationListProps>()

const emit = defineEmits<{
  markRead: [id: string]
  markAllRead: []
  dismiss: [id: string]
  action: [id: string]
}>()

const classes = computed(() =>
  cn('max-h-96 overflow-y-auto', props.class),
)

interface GroupedNotifications {
  label: string
  notifications: Notification[]
}

function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate()
  )
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    date.getFullYear() === yesterday.getFullYear()
    && date.getMonth() === yesterday.getMonth()
    && date.getDate() === yesterday.getDate()
  )
}

const groupedNotifications = computed<GroupedNotifications[]>(() => {
  const today: Notification[] = []
  const yesterday: Notification[] = []
  const older: Notification[] = []

  // Sort by timestamp descending (newest first)
  const sorted = [...props.notifications].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  )

  for (const notification of sorted) {
    if (isToday(notification.timestamp)) {
      today.push(notification)
    }
    else if (isYesterday(notification.timestamp)) {
      yesterday.push(notification)
    }
    else {
      older.push(notification)
    }
  }

  const groups: GroupedNotifications[] = []
  if (today.length > 0)
    groups.push({ label: 'Today', notifications: today })
  if (yesterday.length > 0)
    groups.push({ label: 'Yesterday', notifications: yesterday })
  if (older.length > 0)
    groups.push({ label: 'Older', notifications: older })

  return groups
})

const unreadCount = computed(() =>
  props.notifications.filter(n => !n.read).length,
)
</script>

<template>
  <div :class="classes" data-testid="notification-list">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-border px-4 py-2">
      <h3 class="text-sm font-semibold">
        Notifications
      </h3>
      <button
        v-if="unreadCount > 0"
        type="button"
        class="text-xs font-medium text-primary hover:underline"
        data-testid="mark-all-read-button"
        @click="emit('markAllRead')"
      >
        Mark all as read
      </button>
    </div>

    <!-- Empty state -->
    <NotificationEmpty v-if="notifications.length === 0" />

    <!-- Grouped notifications -->
    <template v-else>
      <NotificationGroup
        v-for="group in groupedNotifications"
        :key="group.label"
        :label="group.label"
        :notifications="group.notifications"
        @mark-read="emit('markRead', $event)"
        @dismiss="emit('dismiss', $event)"
        @action="emit('action', $event)"
      />
    </template>
  </div>
</template>
