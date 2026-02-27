<script setup lang="ts">
import { DialogTrigger } from 'radix-vue'
import type { DrawerTriggerProps } from './drawer.types'

const props = withDefaults(defineProps<DrawerTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
