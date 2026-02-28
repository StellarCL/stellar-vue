<script setup lang="ts">
import type { ToastViewportProps } from './toast.types'
import { ToastViewport } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ToastViewportProps>(), {
  hotkey: () => ['F8'],
})

const classes = computed(() =>
  cn(
    'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
    props.class,
  ),
)
</script>

<template>
  <ToastViewport :class="classes" :hotkey="hotkey" :label="label" />
</template>
