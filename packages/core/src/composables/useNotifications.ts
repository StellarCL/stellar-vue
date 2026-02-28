import type { Notification } from '../components/notification-center/notification-center.types'
import { computed, ref } from 'vue'

export interface UseNotificationsOptions {
  /** Initial notifications */
  initial?: Notification[]
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const notifications = ref<Notification[]>(options.initial ? [...options.initial] : [])

  const unreadCount = computed(() =>
    notifications.value.filter(n => !n.read).length,
  )

  function markAsRead(id: string) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => {
      n.read = true
    })
  }

  function dismiss(id: string) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function add(notification: Omit<Notification, 'id'> & { id?: string }) {
    const id = notification.id ?? `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    notifications.value.unshift({
      ...notification,
      id,
    })
    return id
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismiss,
    add,
  }
}
