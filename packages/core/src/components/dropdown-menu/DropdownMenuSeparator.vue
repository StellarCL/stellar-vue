<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuSeparator as DropdownMenuSeparatorPrimitive } from 'radix-vue'
import type { DropdownMenuSeparatorProps } from './dropdown-menu.types'
import { cn } from '../../utils'

const props = defineProps<DropdownMenuSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-muted', props.class))
</script>

<template>
  <DropdownMenuSeparatorPrimitive :class="classes" />
</template>
