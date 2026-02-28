<script setup lang="ts">
import type { DialogTriggerProps } from './dialog.types'
import { DialogTrigger } from 'radix-vue'

const props = withDefaults(defineProps<DialogTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
