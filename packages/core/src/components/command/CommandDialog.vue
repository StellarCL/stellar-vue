<script setup lang="ts">
import type { CommandDialogProps } from './command.types'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '../../utils'
import { Dialog, DialogContent } from '../dialog'
import Command from './Command.vue'

const props = withDefaults(defineProps<CommandDialogProps>(), {
  open: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const internalOpen = ref(props.open)

// Sync external prop changes into internal state
const isOpen = computed({
  get: () => (props.open !== undefined ? props.open : internalOpen.value),
  set: (value: boolean) => {
    internalOpen.value = value
    emit('update:open', value)
  },
})

function open(): void {
  isOpen.value = true
}

function close(): void {
  isOpen.value = false
}

// Global Cmd+K / Ctrl+K listener
function handleGlobalKeydown(event: KeyboardEvent): void {
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const commandClasses = computed(() =>
  cn(
    '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
    props.class,
  ),
)
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogContent class="overflow-hidden p-0 shadow-soft">
      <Command :class="commandClasses">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
