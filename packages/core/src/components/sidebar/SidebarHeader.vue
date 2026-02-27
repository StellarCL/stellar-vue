<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarHeaderProps } from './sidebar.types'
import { cn } from '../../utils'

const props = defineProps<SidebarHeaderProps>()

const classes = computed(() =>
  cn('flex flex-col gap-2 p-4', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
