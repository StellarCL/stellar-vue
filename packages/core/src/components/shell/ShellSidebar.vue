<script setup lang="ts">
import { computed } from 'vue'
import type { ShellSidebarProps } from './shell.types'
import { cn } from '../../utils'

const props = defineProps<ShellSidebarProps>()

const classes = computed(() =>
  cn('shrink-0 border-r bg-background', props.class),
)
</script>

<template>
  <aside :class="classes">
    <slot />
  </aside>
</template>
