<script setup lang="ts">
import type { AvatarProps } from './avatar.types'
import { AvatarRoot } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'
import { avatarVariants } from './avatar.variants'

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
