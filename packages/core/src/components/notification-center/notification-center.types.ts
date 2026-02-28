import type { HTMLAttributes } from 'vue'

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'default'

export interface NotificationAction {
  /** Label for the action button */
  label: string
  /** Callback when the action is clicked */
  onClick: () => void
}

export interface Notification {
  /** Unique identifier */
  id: string
  /** Notification title */
  title: string
  /** Optional description */
  description?: string
  /** Optional avatar URL or initials */
  avatar?: string
  /** Timestamp of the notification */
  timestamp: Date
  /** Whether the notification has been read */
  read: boolean
  /** Notification type for styling */
  type?: NotificationType
  /** Optional action button */
  action?: NotificationAction
}

export interface NotificationCenterProps {
  /** List of notifications */
  notifications: Notification[]
  /** Whether the dropdown is open */
  open?: boolean
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NotificationListProps {
  /** List of notifications */
  notifications: Notification[]
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NotificationItemProps {
  /** The notification to display */
  notification: Notification
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NotificationGroupProps {
  /** Group label (e.g. "Today", "Yesterday", "Older") */
  label: string
  /** Notifications in this group */
  notifications: Notification[]
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NotificationEmptyProps {
  /** Optional message to display */
  message?: string
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
