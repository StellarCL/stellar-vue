<script setup lang="ts">
import { computed } from 'vue'
import { SelectSeparator as SelectSeparatorPrimitive } from 'radix-vue'
import type { SelectSeparatorProps } from './select.types'
import { cn } from '../../utils'

const props = defineProps<SelectSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-muted', props.class))
</script>

<template>
  <SelectSeparatorPrimitive :class="classes" />
</template>
