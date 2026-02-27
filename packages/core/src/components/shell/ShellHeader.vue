<script setup lang="ts">
import { computed } from 'vue'
import type { ShellHeaderProps } from './shell.types'
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
  <header :class="classes" :style="{ height: height }">
    <slot />
  </header>
</template>
