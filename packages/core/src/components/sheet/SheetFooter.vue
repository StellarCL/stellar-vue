<script setup lang="ts">
import type { SheetFooterProps } from './sheet.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SheetFooterProps>()

const classes = computed(() =>
  cn('flex flex-col gap-2 p-6 pt-0', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
