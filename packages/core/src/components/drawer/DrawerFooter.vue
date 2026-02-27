<script setup lang="ts">
import { computed } from 'vue'
import type { DrawerFooterProps } from './drawer.types'
import { cn } from '../../utils'

const props = defineProps<DrawerFooterProps>()

const classes = computed(() =>
  cn('flex flex-col gap-2 p-6 pt-0', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
