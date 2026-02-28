<script setup lang="ts">
import type { SidebarGroupProps } from './sidebar.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SidebarGroupProps>()

const classes = computed(() =>
  cn('flex w-full min-w-0 flex-col p-2', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
