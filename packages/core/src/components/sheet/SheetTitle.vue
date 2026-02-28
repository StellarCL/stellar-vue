<script setup lang="ts">
import type { SheetTitleProps } from './sheet.types'
import { DialogTitle } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SheetTitleProps>()

const classes = computed(() =>
  cn('text-lg font-semibold leading-none tracking-tight', props.class),
)
</script>

<template>
  <DialogTitle :class="classes">
    <slot />
  </DialogTitle>
</template>
