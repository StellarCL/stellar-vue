<script setup lang="ts">
import type { AvatarImageProps } from './avatar.types'
import { AvatarImage } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<AvatarImageProps>()

const classes = computed(() =>
  cn('aspect-square h-full w-full object-cover', props.class),
)
</script>

<template>
  <AvatarImage :src="props.src" :alt="props.alt" :class="classes" />
</template>
