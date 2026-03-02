<script setup lang="ts">
import { NotificationCenter, NotificationItem, NotificationList } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const notifications = ref([
  {
    id: '1',
    title: 'Deployment successful',
    description: 'Your application has been deployed to production.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    type: 'success' as const,
  },
  {
    id: '2',
    title: 'New comment on PR #42',
    description: 'Alice left a comment: "Looks great, just one small suggestion..."',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    type: 'info' as const,
  },
  {
    id: '3',
    title: 'Build warning',
    description: 'There are 3 deprecation warnings in your latest build.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    type: 'warning' as const,
  },
  {
    id: '4',
    title: 'Pipeline failed',
    description: 'CI pipeline for branch "feature/auth" has failed at the test stage.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    type: 'error' as const,
  },
  {
    id: '5',
    title: 'Team member joined',
    description: 'Bob has been added to the development team.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    type: 'info' as const,
  },
  {
    id: '6',
    title: 'Subscription renewed',
    description: 'Your Pro plan subscription has been renewed successfully.',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    read: true,
    type: 'success' as const,
  },
])

function handleMarkRead(id: string) {
  const notification = notifications.value.find((n) => n.id === id)
  if (notification) {
    notification.read = true
  }
}

function handleMarkAllRead() {
  notifications.value.forEach((n) => {
    n.read = true
  })
}

function handleDismiss(id: string) {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}
</script>

<template>
  <div>
    <PageHeader
      title="Notification Center"
      description="A bell-triggered dropdown panel that displays a list of notifications with read/unread states and action support."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Full Notification Center -->
      <DemoSection
        title="Notification Center"
        description="Click the bell icon to open the notification dropdown. Includes a mix of read and unread notifications with different types."
      >
        <div class="flex items-start justify-center py-8">
          <NotificationCenter
            :notifications="notifications"
            @mark-read="handleMarkRead"
            @mark-all-read="handleMarkAllRead"
            @dismiss="handleDismiss"
          />
        </div>
      </DemoSection>

      <!-- Notification List (inline) -->
      <DemoSection
        title="Notification List (Inline)"
        description="The notification list rendered inline without the dropdown trigger."
      >
        <div class="max-w-md mx-auto rounded-lg border border-border overflow-hidden">
          <NotificationList
            :notifications="notifications"
            @mark-read="handleMarkRead"
            @mark-all-read="handleMarkAllRead"
            @dismiss="handleDismiss"
          />
        </div>
      </DemoSection>

      <!-- Individual Notification Items -->
      <DemoSection
        title="Notification Types"
        description="Individual notification items showcasing different types: info, success, warning, and error."
      >
        <div class="max-w-md mx-auto space-y-2">
          <NotificationItem
            :notification="{
              id: 'demo-info',
              title: 'Info Notification',
              description: 'This is an informational notification.',
              timestamp: new Date(),
              read: false,
              type: 'info',
            }"
          />
          <NotificationItem
            :notification="{
              id: 'demo-success',
              title: 'Success Notification',
              description: 'Operation completed successfully.',
              timestamp: new Date(),
              read: false,
              type: 'success',
            }"
          />
          <NotificationItem
            :notification="{
              id: 'demo-warning',
              title: 'Warning Notification',
              description: 'This requires your attention.',
              timestamp: new Date(),
              read: true,
              type: 'warning',
            }"
          />
          <NotificationItem
            :notification="{
              id: 'demo-error',
              title: 'Error Notification',
              description: 'Something went wrong. Please try again.',
              timestamp: new Date(),
              read: true,
              type: 'error',
            }"
          />
        </div>
      </DemoSection>
    </div>
  </div>
</template>
