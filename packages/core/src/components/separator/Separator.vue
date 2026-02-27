<script setup lang="ts">
import { computed } from 'vue'
import { Separator as SeparatorPrimitive } from 'radix-vue'
import type { SeparatorProps } from './separator.types'
import { separatorVariants } from './separator.variants'
import { cn } from '../../utils'

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
