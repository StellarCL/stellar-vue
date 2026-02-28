<script setup lang="ts">
import type { ShellMainProps } from './shell.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ShellMainProps>()

const classes = computed(() =>
  cn('flex-1 overflow-y-auto', props.class),
)
</script>

<template>
  <main :class="classes">
    <slot />
  </main>
</template>
