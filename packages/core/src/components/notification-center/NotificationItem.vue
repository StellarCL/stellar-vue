<script setup lang="ts">
import { computed } from 'vue'
import type { NotificationItemProps } from './notification-center.types'
import { cn } from '../../utils'

const props = defineProps<NotificationItemProps>()

const emit = defineEmits<{
  'mark-read': [id: string]
  'dismiss': [id: string]
  'action': [id: string]
}>()

const classes = computed(() =>
  cn(
    'flex items-start gap-3 px-4 py-3 border-b border-border transition-colors hover:bg-accent/50',
    !props.notification.read && 'bg-accent/20',
    props.class,
  ),
)

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
</script>

<template>
  <div
    :class="classes"
    :data-read="notification.read"
    data-testid="notification-item"
    role="article"
    @click="!notification.read && emit('mark-read', notification.id)"
  >
    <!-- Unread indicator -->
    <div class="mt-1.5 shrink-0">
      <div
        v-if="!notification.read"
        class="h-2 w-2 rounded-full bg-primary"
        data-testid="unread-indicator"
      />
      <div v-else class="h-2 w-2" />
    </div>

    <!-- Avatar -->
    <div
      v-if="notification.avatar"
      class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
    >
      <img
        v-if="notification.avatar.startsWith('http')"
        :src="notification.avatar"
        :alt="notification.title"
        class="h-8 w-8 rounded-full object-cover"
      />
      <span v-else>{{ notification.avatar }}</span>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <p
          class="text-sm leading-tight"
          :class="!notification.read ? 'font-semibold' : 'font-normal'"
        >
          {{ notification.title }}
        </p>
        <button
          type="button"
          class="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
          aria-label="Dismiss notification"
          @click.stop="emit('dismiss', notification.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <p v-if="notification.description" class="mt-0.5 text-xs text-muted-foreground line-clamp-2">
        {{ notification.description }}
      </p>

      <div class="mt-1 flex items-center gap-2">
        <span class="text-xs text-muted-foreground">
          {{ formatTimestamp(notification.timestamp) }}
        </span>
        <button
          v-if="notification.action"
          type="button"
          class="text-xs font-medium text-primary hover:underline"
          @click.stop="() => { notification.action?.onClick(); emit('action', notification.id) }"
        >
          {{ notification.action.label }}
        </button>
      </div>
    </div>
  </div>
</template>
