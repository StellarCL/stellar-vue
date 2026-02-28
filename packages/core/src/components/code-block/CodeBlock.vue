<script setup lang="ts">
import type { CodeBlockProps } from './code-block.types'
import { computed, provide } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CodeBlockProps>(), {
  showLineNumbers: true,
})

provide('code-block-code', computed(() => props.code))
provide('code-block-language', computed(() => props.language))
provide('code-block-showLineNumbers', computed(() => props.showLineNumbers))

const classes = computed(() =>
  cn(
    'overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
