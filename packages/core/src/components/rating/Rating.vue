<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RatingProps } from './rating.types'
import { ratingVariants } from './rating.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<RatingProps>(), {
  modelValue: 0,
  max: 5,
  halfStars: false,
  readonly: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const hoverValue = ref<number | null>(null)

const displayValue = computed(() =>
  hoverValue.value !== null ? hoverValue.value : props.modelValue,
)

const classes = computed(() =>
  cn(
    ratingVariants({ size: props.size }),
    props.readonly ? 'pointer-events-none' : 'cursor-pointer',
    props.class,
  ),
)

function getStarValue(index: number, event?: MouseEvent): number {
  if (props.halfStars && event) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    if (x < rect.width / 2) {
      return index - 0.5
    }
  }
  return index
}

function handleClick(index: number, event: MouseEvent) {
  if (props.readonly) return
  const value = getStarValue(index, event)
  emit('update:modelValue', value)
}

function handleMouseMove(index: number, event: MouseEvent) {
  if (props.readonly) return
  hoverValue.value = getStarValue(index, event)
}

function handleMouseLeave() {
  if (props.readonly) return
  hoverValue.value = null
}

function getStarFill(index: number): 'full' | 'half' | 'empty' {
  const val = displayValue.value
  if (val >= index) return 'full'
  if (val >= index - 0.5 && props.halfStars) return 'half'
  return 'empty'
}
</script>

<template>
  <div
    :class="classes"
    role="radiogroup"
    :aria-label="`Rating: ${modelValue} out of ${max}`"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-for="i in max"
      :key="i"
      role="radio"
      :aria-checked="modelValue === i"
      :aria-label="`${i} star${i !== 1 ? 's' : ''}`"
      :tabindex="readonly ? -1 : 0"
      @click="handleClick(i, $event)"
      @mousemove="handleMouseMove(i, $event)"
      @keydown.enter.prevent="handleClick(i, $event)"
      @keydown.space.prevent="handleClick(i, $event)"
    >
      <slot name="icon" :index="i" :fill="getStarFill(i)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :fill="getStarFill(i) === 'full' ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="1.5"
          :class="cn(
            'transition-colors',
            getStarFill(i) === 'full' ? 'text-yellow-400' : '',
            getStarFill(i) === 'half' ? 'text-yellow-400' : '',
            getStarFill(i) === 'empty' ? 'text-muted-foreground' : '',
          )"
        >
          <defs v-if="getStarFill(i) === 'half'">
            <linearGradient :id="`half-fill-${i}`">
              <stop offset="50%" stop-color="currentColor" />
              <stop offset="50%" stop-color="transparent" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            :fill="getStarFill(i) === 'half' ? `url(#half-fill-${i})` : undefined"
          />
        </svg>
      </slot>
    </span>
  </div>
</template>
