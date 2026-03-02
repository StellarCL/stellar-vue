<script setup lang="ts">
import { CodeBlock, CodeBlockContent, CodeBlockHeader } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const showLineNumbers = ref(true)

const jsCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are logged in as \${user.role}.\`;
}`

const cssCode = `.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`

const shortCode = `const message = 'Hello, world!';
console.log(message);`
</script>

<template>
  <div>
    <PageHeader
      title="Code Block"
      description="Displays formatted code with syntax highlighting support, line numbers, and a copy-to-clipboard button."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- JavaScript Example -->
      <DemoSection title="JavaScript">
        <div class="max-w-2xl">
          <CodeBlock :code="jsCode" language="javascript">
            <CodeBlockHeader />
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>

      <!-- TypeScript Example -->
      <DemoSection title="TypeScript">
        <div class="max-w-2xl">
          <CodeBlock :code="tsCode" language="typescript">
            <CodeBlockHeader />
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>

      <!-- CSS Example -->
      <DemoSection title="CSS">
        <div class="max-w-2xl">
          <CodeBlock :code="cssCode" language="css">
            <CodeBlockHeader />
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>

      <!-- Toggle Line Numbers -->
      <DemoSection title="Line Numbers Toggle" description="Toggle line numbers on or off.">
        <div class="max-w-2xl space-y-4">
          <label class="flex items-center gap-2 text-sm">
            <input v-model="showLineNumbers" type="checkbox" class="rounded border-input" />
            Show line numbers
          </label>
          <CodeBlock :code="shortCode" language="javascript" :show-line-numbers="showLineNumbers">
            <CodeBlockHeader />
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>

      <!-- Without Header -->
      <DemoSection title="Without Header" description="Code block without the header bar.">
        <div class="max-w-2xl">
          <CodeBlock :code="shortCode" language="javascript">
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>

      <!-- No Line Numbers -->
      <DemoSection title="Without Line Numbers">
        <div class="max-w-2xl">
          <CodeBlock :code="jsCode" language="javascript" :show-line-numbers="false">
            <CodeBlockHeader />
            <CodeBlockContent />
          </CodeBlock>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
