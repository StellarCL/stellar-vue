<script setup lang="ts">
import { computed } from 'vue'
import { DialogTitle } from 'radix-vue'
import type { DialogTitleProps } from './dialog.types'
import { cn } from '../../utils'

const props = defineProps<DialogTitleProps>()

const classes = computed(() =>
  cn('text-lg font-semibold leading-none tracking-tight', props.class),
)
</script>

<template>
  <DialogTitle :class="classes">
    <slot />
  </DialogTitle>
</template>
