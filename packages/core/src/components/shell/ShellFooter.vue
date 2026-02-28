<script setup lang="ts">
import type { ShellFooterProps } from './shell.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ShellFooterProps>()

const classes = computed(() =>
  cn('shrink-0 border-t bg-background px-4', props.class),
)
</script>

<template>
  <footer :class="classes">
    <slot />
  </footer>
</template>
