<script setup lang="ts">
import { computed } from 'vue'
import { AvatarRoot } from 'radix-vue'
import type { AvatarProps } from './avatar.types'
import { avatarVariants } from './avatar.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
})

const classes = computed(() =>
  cn(
    avatarVariants({ size: props.size }),
    props.class,
  ),
)
</script>

<template>
  <AvatarRoot :class="classes">
    <slot />
  </AvatarRoot>
</template>
