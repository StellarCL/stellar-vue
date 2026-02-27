<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarGroupContentProps } from './sidebar.types'
import { cn } from '../../utils'

const props = defineProps<SidebarGroupContentProps>()

const classes = computed(() =>
  cn('w-full text-sm', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
