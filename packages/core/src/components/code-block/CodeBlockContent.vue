<script setup lang="ts">
import type { CodeBlockContentProps } from './code-block.types'
import { computed, inject, ref, type Ref } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CodeBlockContentProps>(), {
  code: '',
  showLineNumbers: undefined,
})

const injectedCode = inject<Ref<string>>('code-block-code', ref(''))
const injectedShowLineNumbers = inject<Ref<boolean>>('code-block-showLineNumbers', ref(true))

const displayCode = computed(() => props.code || injectedCode?.value || '')
const showLines = computed(() => props.showLineNumbers ?? injectedShowLineNumbers?.value ?? true)

const lines = computed(() => displayCode.value.split('\n'))

const classes = computed(() =>
  cn('overflow-x-auto p-4', props.class),
)
</script>

<template>
  <div :class="classes">
    <pre class="text-sm leading-relaxed"><code><table class="w-full border-collapse"><tbody><tr
      v-for="(line, index) in lines"
      :key="index"
    ><td
      v-if="showLines"
      class="select-none pr-4 text-right text-zinc-500"
      :style="{ minWidth: `${String(lines.length).length + 1}ch` }"
    >{{ index + 1 }}</td><td class="whitespace-pre">{{ line }}</td></tr></tbody></table></code></pre>
  </div>
</template>
