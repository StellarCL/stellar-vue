<script setup lang="ts">
import { computed } from 'vue'
import { Label as LabelPrimitive } from 'radix-vue'
import type { LabelProps } from './label.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<LabelProps>(), {
  required: false,
})

const classes = computed(() =>
  cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.class,
  ),
)
</script>

<template>
  <LabelPrimitive :for="for" :class="classes">
    <slot />
    <span v-if="required" class="text-destructive"> *</span>
  </LabelPrimitive>
</template>
