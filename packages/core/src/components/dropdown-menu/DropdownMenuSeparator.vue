<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from './dropdown-menu.types'
import { DropdownMenuSeparator as DropdownMenuSeparatorPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DropdownMenuSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-muted', props.class))
</script>

<template>
  <DropdownMenuSeparatorPrimitive :class="classes" />
</template>
