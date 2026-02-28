<script setup lang="ts">
import type { BreadcrumbLinkProps } from './breadcrumb.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<BreadcrumbLinkProps>(), {
  asChild: false,
})

const classes = computed(() =>
  cn(
    'transition-colors hover:text-foreground',
    props.class,
  ),
)
</script>

<template>
  <component
    :is="props.asChild ? 'span' : 'a'"
    :href="props.asChild ? undefined : props.href"
    :class="classes"
  >
    <slot />
  </component>
</template>
