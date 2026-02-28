<script setup lang="ts">
import type { AvatarFallbackProps } from './avatar.types'
import { AvatarFallback } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AvatarFallbackProps>(), {})

const classes = computed(() =>
  cn('flex h-full w-full items-center justify-center rounded-full bg-muted', props.class),
)
</script>

<template>
  <AvatarFallback :delay-ms="props.delayMs" :class="classes">
    <slot />
  </AvatarFallback>
</template>
