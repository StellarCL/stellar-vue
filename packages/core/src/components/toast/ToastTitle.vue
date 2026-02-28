<script setup lang="ts">
import type { ToastTitleProps } from './toast.types'
import { ToastTitle } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ToastTitleProps>()

const classes = computed(() =>
  cn('text-sm font-semibold', props.class),
)
</script>

<template>
  <ToastTitle :class="classes">
    <slot />
  </ToastTitle>
</template>
