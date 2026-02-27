<script setup lang="ts">
import { computed } from 'vue'
import type { CommandListProps } from './command.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandListProps>(), {})

const classes = computed(() =>
  cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class),
)
</script>

<template>
  <div :class="classes" role="listbox">
    <slot />
  </div>
</template>
