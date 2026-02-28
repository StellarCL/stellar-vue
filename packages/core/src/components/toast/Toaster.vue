<script setup lang="ts">
import type { ToasterProps } from './toast.types'
import { ToastPortal, ToastProvider } from 'radix-vue'
import { computed } from 'vue'
import { useToast } from '../../composables/useToast'
import Toast from './Toast.vue'
import ToastAction from './ToastAction.vue'
import ToastClose from './ToastClose.vue'
import ToastDescription from './ToastDescription.vue'
import ToastTitle from './ToastTitle.vue'
import ToastViewport from './ToastViewport.vue'

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-right',
})

const { toasts } = useToast()

const positionClasses = computed(() => {
  const positions: Record<string, string> = {
    'top-right': 'top-0 right-0 flex-col',
    'top-left': 'top-0 left-0 flex-col',
    'bottom-right': 'bottom-0 right-0 flex-col-reverse',
    'bottom-left': 'bottom-0 left-0 flex-col-reverse',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
  }
  return positions[props.position] || positions['top-right']
})

const swipeDirection = computed(() => {
  if (props.position.includes('left'))
    return 'left' as const
  return 'right' as const
})
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection">
    <Toast
      v-for="t in toasts"
      :key="t.id"
      :variant="t.variant"
      :open="t.open"
      :duration="t.duration"
      :class="props.class"
    >
      <div class="grid gap-1">
        <ToastTitle v-if="t.title">
          {{ t.title }}
        </ToastTitle>
        <ToastDescription v-if="t.description">
          {{ t.description }}
        </ToastDescription>
      </div>
      <ToastAction
        v-if="t.action"
        :alt-text="t.action.label"
        @click="t.action.onClick"
      >
        {{ t.action.label }}
      </ToastAction>
      <ToastClose />
    </Toast>
    <ToastPortal>
      <ToastViewport
        class="fixed z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]" :class="[
          positionClasses,
        ]"
      />
    </ToastPortal>
  </ToastProvider>
</template>
