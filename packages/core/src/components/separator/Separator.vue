<script setup lang="ts">
import type { SeparatorProps } from './separator.types'
import { Separator as SeparatorPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'
import { separatorVariants } from './separator.variants'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: false,
})

const classes = computed(() =>
  cn(
    separatorVariants({ orientation: props.orientation }),
    props.class,
  ),
)
</script>

<template>
  <SeparatorPrimitive
    :orientation="orientation"
    :decorative="decorative"
    :class="classes"
  />
</template>
