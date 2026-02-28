<script setup lang="ts">
import type { SidebarFooterProps } from './sidebar.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SidebarFooterProps>()

const classes = computed(() =>
  cn('flex flex-col gap-2 p-4', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
