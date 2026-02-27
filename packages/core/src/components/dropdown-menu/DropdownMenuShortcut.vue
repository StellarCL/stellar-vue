<script setup lang="ts">
import { computed } from 'vue'
import type { DropdownMenuShortcutProps } from './dropdown-menu.types'
import { cn } from '../../utils'

const props = defineProps<DropdownMenuShortcutProps>()

const classes = computed(() => cn('ml-auto text-xs tracking-widest opacity-60', props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
