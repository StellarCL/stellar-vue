<script setup lang="ts">
import type { CommandSeparatorProps } from './command.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandSeparatorProps>(), {})

const classes = computed(() => cn('-mx-1 h-px bg-border', props.class))
</script>

<template>
  <div :class="classes" role="separator" aria-orientation="horizontal" />
</template>
