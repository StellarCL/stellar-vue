<script setup lang="ts">
import { computed } from 'vue'
import { ToastDescription } from 'radix-vue'
import type { ToastDescriptionProps } from './toast.types'
import { cn } from '../../utils'

const props = defineProps<ToastDescriptionProps>()

const classes = computed(() =>
  cn('text-sm opacity-90', props.class),
)
</script>

<template>
  <ToastDescription :class="classes">
    <slot />
  </ToastDescription>
</template>
