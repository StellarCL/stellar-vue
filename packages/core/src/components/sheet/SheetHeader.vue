<script setup lang="ts">
import { computed } from 'vue'
import type { SheetHeaderProps } from './sheet.types'
import { cn } from '../../utils'

const props = defineProps<SheetHeaderProps>()

const classes = computed(() =>
  cn('flex flex-col space-y-1.5 p-6', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
