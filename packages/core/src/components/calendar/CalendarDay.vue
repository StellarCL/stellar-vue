<script setup lang="ts">
import { computed } from 'vue'
import { CalendarCellTrigger } from 'radix-vue'
import type { CalendarDayProps } from './calendar.types'
import { cn } from '../../utils'

const props = defineProps<CalendarDayProps>()

const classes = computed(() =>
  cn(
    'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal ring-offset-background transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    // Selected state
    'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
    // Disabled state
    'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
    // Today
    'data-[today]:bg-accent data-[today]:text-accent-foreground',
    // Selected + today combination
    'data-[selected]:data-[today]:bg-primary data-[selected]:data-[today]:text-primary-foreground',
    // Outside month
    'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50',
    // Unavailable
    'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
    props.class,
  ),
)
</script>

<template>
  <CalendarCellTrigger
    :day="props.day"
    :month="props.month"
    :class="classes"
  />
</template>
