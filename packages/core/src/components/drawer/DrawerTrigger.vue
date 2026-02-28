<script setup lang="ts">
import type { DrawerTriggerProps } from './drawer.types'
import { DialogTrigger } from 'radix-vue'

const props = withDefaults(defineProps<DrawerTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
