<script setup lang="ts">
import {
  Button,
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadProgress,
  FileUploadTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const demoProgress = ref(45)

function incrementProgress() {
  demoProgress.value = Math.min(100, demoProgress.value + 15)
}

function resetProgress() {
  demoProgress.value = 0
}
</script>

<template>
  <div>
    <PageHeader
      title="File Upload"
      description="A flexible file upload component with drag-and-drop, file preview, progress indicator, and validation support."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Dropzone -->
      <DemoSection title="Dropzone" description="Drag and drop files or click to browse.">
        <div class="max-w-lg">
          <FileUpload :multiple="true">
            <template #default="{ files }">
              <FileUploadDropzone />
              <FileUploadList v-if="files.length > 0" :files="files" />
            </template>
          </FileUpload>
        </div>
      </DemoSection>

      <!-- Button Trigger -->
      <DemoSection title="Button Trigger" description="A simple button to open the file picker.">
        <div class="max-w-lg">
          <FileUpload>
            <template #default="{ files }">
              <FileUploadTrigger />
              <FileUploadList v-if="files.length > 0" :files="files" />
            </template>
          </FileUpload>
        </div>
      </DemoSection>

      <!-- Multiple Files -->
      <DemoSection title="Multiple Files" description="Allow multiple file selection at once.">
        <div class="max-w-lg">
          <FileUpload :multiple="true" :max-files="5">
            <template #default="{ files }">
              <FileUploadDropzone :multiple="true" :max-files="5" />
              <FileUploadList v-if="files.length > 0" :files="files" />
            </template>
          </FileUpload>
        </div>
      </DemoSection>

      <!-- Images Only -->
      <DemoSection
        title="Images Only"
        description="Restrict uploads to image files with a 5 MB size limit."
      >
        <div class="max-w-lg">
          <FileUpload accept="image/*" :max-size="5 * 1024 * 1024" :multiple="true">
            <template #default="{ files }">
              <FileUploadDropzone accept="image/*" :max-size="5 * 1024 * 1024" />
              <FileUploadList v-if="files.length > 0" :files="files" />
            </template>
          </FileUpload>
        </div>
      </DemoSection>

      <!-- Progress Bar -->
      <DemoSection
        title="Progress Bar"
        description="Standalone progress indicator for upload status."
      >
        <div class="max-w-lg space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Uploading file...</span>
              <span class="font-medium">{{ demoProgress }}%</span>
            </div>
            <FileUploadProgress :progress="demoProgress" />
          </div>
          <div class="flex gap-2">
            <Button size="sm" variant="outline" @click="incrementProgress"> Increase </Button>
            <Button size="sm" variant="outline" @click="resetProgress"> Reset </Button>
          </div>
        </div>
      </DemoSection>

      <!-- Disabled -->
      <DemoSection title="Disabled State">
        <div class="max-w-lg">
          <FileUpload :disabled="true">
            <template #default>
              <FileUploadDropzone :disabled="true" />
            </template>
          </FileUpload>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
