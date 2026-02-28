<script setup lang="ts">
import type { AppShellProps } from './shell.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<AppShellProps>()

const classes = computed(() =>
  cn('flex flex-col h-screen w-full overflow-hidden', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
