<script setup lang="ts">
import type { MenubarShortcutProps } from './menubar.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<MenubarShortcutProps>()

const classes = computed(() => cn('ml-auto text-xs tracking-widest opacity-60', props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
