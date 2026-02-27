<script setup lang="ts">
import { computed } from 'vue'
import type { MenubarShortcutProps } from './menubar.types'
import { cn } from '../../utils'

const props = defineProps<MenubarShortcutProps>()

const classes = computed(() => cn('ml-auto text-xs tracking-widest opacity-60', props.class))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
