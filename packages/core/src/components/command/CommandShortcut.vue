<script setup lang="ts">
import type { CommandShortcutProps } from './command.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandShortcutProps>(), {})

const classes = computed(() =>
  cn('ml-auto text-xs tracking-widest text-muted-foreground', props.class),
)
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
