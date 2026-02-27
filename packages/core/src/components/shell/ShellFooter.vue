<script setup lang="ts">
import { computed } from 'vue'
import type { ShellFooterProps } from './shell.types'
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
