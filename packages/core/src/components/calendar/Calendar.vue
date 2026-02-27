<script setup lang="ts">
import { computed } from 'vue'
import { CalendarRoot } from 'radix-vue'
import type { CalendarProps } from './calendar.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CalendarProps>(), {
  disabled: false,
  locale: 'en-US',
  weekStartsOn: 0,
  fixedWeeks: false,
  numberOfMonths: 1,
  preventDeselect: false,
})

const emit = defineEmits<{
  'update:modelValue': [date: CalendarProps['modelValue']]
  'update:placeholder': [date: NonNullable<CalendarProps['placeholder']>]
}>()

const classes = computed(() =>
  cn('p-3', props.class),
)
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :placeholder="props.placeholder"
    :min-value="props.minValue"
    :max-value="props.maxValue"
    :disabled="props.disabled"
    :is-date-disabled="props.isDateDisabled"
    :is-date-unavailable="props.isDateUnavailable"
    :locale="props.locale"
    :week-starts-on="props.weekStartsOn"
    :fixed-weeks="props.fixedWeeks"
    :number-of-months="props.numberOfMonths"
    :prevent-deselect="props.preventDeselect"
    :class="classes"
    @update:model-value="(v: CalendarProps['modelValue']) => emit('update:modelValue', v)"
    @update:placeholder="(v: NonNullable<CalendarProps['placeholder']>) => emit('update:placeholder', v)"
  >
    <slot :grid="grid" :week-days="weekDays" />
  </CalendarRoot>
</template>
