<script setup lang="ts">
import { RichTextEditor } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const basicContent = ref('<p>Start typing here...</p>')
const charCountContent = ref(
  '<p>This editor has a character count and a max length of 200 characters.</p>',
)
const disabledContent = ref(
  '<p>This content is <strong>read-only</strong>. The editor is disabled.</p>',
)
const htmlOutputContent = ref(
  '<p>Edit this text and watch the <strong>HTML output</strong> update below.</p>',
)
const errorContent = ref('')
</script>

<template>
  <div>
    <PageHeader
      title="Rich Text Editor"
      description="A WYSIWYG rich text editor built on Tiptap with a configurable toolbar."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Editor -->
      <DemoSection
        title="Basic Editor"
        description="A simple rich text editor with the default toolbar."
      >
        <div class="max-w-2xl">
          <RichTextEditor v-model="basicContent" placeholder="Write something amazing..." />
        </div>
      </DemoSection>

      <!-- With Character Count -->
      <DemoSection
        title="Character Count"
        description="Editor with character count display and a max length of 200."
      >
        <div class="max-w-2xl">
          <RichTextEditor
            v-model="charCountContent"
            :max-length="200"
            show-character-count
            placeholder="Limited to 200 characters..."
          />
        </div>
      </DemoSection>

      <!-- Disabled State -->
      <DemoSection title="Disabled" description="The editor can be disabled to prevent editing.">
        <div class="max-w-2xl">
          <RichTextEditor v-model="disabledContent" disabled />
        </div>
      </DemoSection>

      <!-- Error State -->
      <DemoSection title="Error State" description="Visual error indicator for form validation.">
        <div class="max-w-2xl">
          <RichTextEditor v-model="errorContent" error placeholder="This field is required..." />
          <p class="mt-1 text-sm text-destructive">Content is required.</p>
        </div>
      </DemoSection>

      <!-- HTML Output -->
      <DemoSection
        title="HTML Output"
        description="Edit the text above and see the raw HTML below."
      >
        <div class="max-w-2xl space-y-4">
          <RichTextEditor v-model="htmlOutputContent" min-height="120px" max-height="300px" />
          <div>
            <p class="text-xs font-medium text-muted-foreground mb-2">Raw HTML Output</p>
            <pre
              class="rounded-md bg-muted p-4 text-xs overflow-x-auto whitespace-pre-wrap break-all"
              >{{ htmlOutputContent }}</pre
            >
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
