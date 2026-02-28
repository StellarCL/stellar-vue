<script setup lang="ts">
import { computed } from 'vue'
import { type TransitionPresetName, transitionPresets } from './presets'

interface StellarTransitionGroupProps {
  preset?: TransitionPresetName
  duration?: number
  appear?: boolean
  tag?: string
  stagger?: number
}

const props = withDefaults(defineProps<StellarTransitionGroupProps>(), {
  preset: 'fade',
  appear: false,
  tag: 'div',
  stagger: 0,
})

const classes = computed(() => transitionPresets[props.preset])

function onBeforeEnter(el: Element) {
  if (props.stagger > 0) {
    const htmlEl = el as HTMLElement
    const index = Number(htmlEl.dataset.index ?? 0)
    htmlEl.style.transitionDelay = `${index * props.stagger}ms`
    htmlEl.style.setProperty('--stagger-delay', `${index * props.stagger}ms`)
  }
}
</script>

<template>
  <TransitionGroup
    :enter-active-class="classes.enterActiveClass"
    :leave-active-class="classes.leaveActiveClass"
    :enter-from-class="classes.enterFromClass"
    :enter-to-class="classes.enterToClass"
    :leave-from-class="classes.leaveFromClass"
    :leave-to-class="classes.leaveToClass"
    :appear="appear"
    :tag="tag"
    @before-enter="onBeforeEnter"
  >
    <slot />
  </TransitionGroup>
</template>
