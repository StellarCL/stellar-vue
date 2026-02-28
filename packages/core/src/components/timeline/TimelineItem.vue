<script setup lang="ts">
import type { TimelineItemProps } from './timeline.types'
import { computed, inject, type Ref } from 'vue'
import { cn } from '../../utils'
import { timelineDotVariants } from './timeline.variants'

const props = withDefaults(defineProps<TimelineItemProps>(), {
  variant: 'default',
})

const layout = inject<Ref<'left' | 'right' | 'alternating'>>('timeline-layout')

const dotClasses = computed(() =>
  cn(timelineDotVariants({ variant: props.variant })),
)

const itemClasses = computed(() => {
  const l = layout?.value ?? 'left'
  return cn(
    'relative flex gap-4 pb-8 last:pb-0',
    l === 'right' ? 'flex-row-reverse text-right' : '',
    props.class,
  )
})
</script>

<template>
  <li :class="itemClasses">
    <div class="flex flex-col items-center">
      <div :class="dotClasses">
        <slot name="icon" />
      </div>
      <div class="mt-1 w-px flex-1 bg-border" />
    </div>
    <div class="flex-1 pb-2">
      <time v-if="date" class="text-xs text-muted-foreground">{{ date }}</time>
      <slot />
    </div>
  </li>
</template>
