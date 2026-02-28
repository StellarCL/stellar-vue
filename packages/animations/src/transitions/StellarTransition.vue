<script setup lang="ts">
import { computed } from 'vue'
import { type TransitionPresetName, transitionPresets } from './presets'

interface StellarTransitionProps {
  preset?: TransitionPresetName
  duration?: number
  appear?: boolean
}

const props = withDefaults(defineProps<StellarTransitionProps>(), {
  preset: 'fade',
  appear: false,
})

const classes = computed(() => transitionPresets[props.preset])
</script>

<template>
  <Transition
    :enter-active-class="classes.enterActiveClass"
    :leave-active-class="classes.leaveActiveClass"
    :enter-from-class="classes.enterFromClass"
    :enter-to-class="classes.enterToClass"
    :leave-from-class="classes.leaveFromClass"
    :leave-to-class="classes.leaveToClass"
    :appear="appear"
  >
    <slot />
  </Transition>
</template>
