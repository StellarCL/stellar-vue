<script setup lang="ts">
import { computed } from 'vue'
import { ToastTitle } from 'radix-vue'
import type { ToastTitleProps } from './toast.types'
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
