<script setup lang="ts">
import { DialogTrigger } from 'radix-vue'
import type { DialogTriggerProps } from './dialog.types'

const props = withDefaults(defineProps<DialogTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
