<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationItemProps } from './pagination.types'
import { cn } from '../../utils'

const props = defineProps<PaginationItemProps>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
