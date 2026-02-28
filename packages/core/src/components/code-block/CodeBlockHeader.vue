<script setup lang="ts">
import type { CodeBlockHeaderProps } from './code-block.types'
import { computed, inject, ref, type Ref } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CodeBlockHeaderProps>()

const injectedLanguage = inject<Ref<string | undefined>>('code-block-language', ref(undefined))
const injectedCode = inject<Ref<string>>('code-block-code', ref(''))

const displayLanguage = computed(() => props.language ?? injectedLanguage?.value)
const codeToCopy = computed(() => props.code ?? injectedCode?.value ?? '')

const copied = ref(false)

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(codeToCopy.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    // Clipboard API not available
  }
}

const classes = computed(() =>
  cn(
    'flex items-center justify-between border-b border-zinc-800 px-4 py-2',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <span v-if="displayLanguage" class="text-xs text-zinc-400">{{ displayLanguage }}</span>
    <span v-else />
    <button
      class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
      aria-label="Copy code"
      @click="handleCopy"
    >
      <svg
        v-if="!copied"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
  </div>
</template>
