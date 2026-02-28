<script setup lang="ts">
import type { ShellHeaderProps } from './shell.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ShellHeaderProps>(), {
  height: '4rem',
})

const classes = computed(() =>
  cn(
    'flex shrink-0 items-center border-b bg-background px-4',
    props.class,
  ),
)
</script>

<template>
  <header :class="classes" :style="{ height }">
    <slot />
  </header>
</template>
