<script setup lang="ts">
import type { MenubarSeparatorProps } from './menubar.types'
import { MenubarSeparator as MenubarSeparatorPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<MenubarSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-muted', props.class))
</script>

<template>
  <MenubarSeparatorPrimitive :class="classes" />
</template>
