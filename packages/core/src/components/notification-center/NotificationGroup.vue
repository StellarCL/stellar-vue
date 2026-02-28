<script setup lang="ts">
import { computed } from 'vue'
import type { NotificationGroupProps } from './notification-center.types'
import { cn } from '../../utils'
import NotificationItem from './NotificationItem.vue'

const props = defineProps<NotificationGroupProps>()

const emit = defineEmits<{
  'mark-read': [id: string]
  'dismiss': [id: string]
  'action': [id: string]
}>()

const classes = computed(() =>
  cn('', props.class),
)
</script>

<template>
  <div :class="classes" data-testid="notification-group">
    <div class="sticky top-0 bg-background/95 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
      {{ label }}
    </div>
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @mark-read="emit('mark-read', $event)"
      @dismiss="emit('dismiss', $event)"
      @action="emit('action', $event)"
    />
  </div>
</template>
