<script setup lang="ts">
import type { ToastProps } from './toast.types'
import { ToastRoot } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'
import { toastVariants } from './toast.variants'

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
  open: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const classes = computed(() =>
  cn(toastVariants({ variant: props.variant }), props.class),
)
</script>

<template>
  <ToastRoot
    :class="classes"
    :open="props.open"
    :duration="props.duration"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </ToastRoot>
</template>
