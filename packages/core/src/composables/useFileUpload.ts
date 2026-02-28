import { ref, readonly } from 'vue'
import type { FileWithPreview, UseFileUploadOptions, UseFileUploadReturn } from '../components/file-upload/file-upload.types'

let fileIdCounter = 0
const generateFileId = () => `stellar-file-${fileIdCounter++}`

/** Returns true if the file's MIME type matches the accept string */
function isAcceptedType(file: File, accept: string): boolean {
  const accepted = accept.split(',').map((s) => s.trim())
  return accepted.some((pattern) => {
    if (pattern === '*' || pattern === '*/*') return true
    if (pattern.endsWith('/*')) {
      const baseType = pattern.slice(0, -2)
      return file.type.startsWith(baseType + '/')
    }
    return file.type === pattern || file.name.endsWith(pattern.replace('*', ''))
  })
}

/** Generate a preview URL for image files */
function generatePreviewUrl(file: File): string | null {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
}

export function useFileUpload(options: UseFileUploadOptions = {}): UseFileUploadReturn {
  const files = ref<FileWithPreview[]>([])
  const isDragging = ref(false)
  const errors = ref<string[]>([])

  function addFiles(newFiles: File[]): void {
    const newErrors: string[] = []
    const toAdd: FileWithPreview[] = []

    for (const file of newFiles) {
      // Validate type
      if (options.accept && !isAcceptedType(file, options.accept)) {
        newErrors.push(`"${file.name}" has an invalid file type.`)
        continue
      }

      // Validate size
      if (options.maxSize !== undefined && file.size > options.maxSize) {
        const maxMB = (options.maxSize / 1024 / 1024).toFixed(1)
        newErrors.push(`"${file.name}" exceeds the maximum size of ${maxMB} MB.`)
        continue
      }

      // Validate maxFiles
      const currentCount = files.value.length + toAdd.length
      if (options.maxFiles !== undefined && currentCount >= options.maxFiles) {
        newErrors.push(`Cannot add "${file.name}": maximum of ${options.maxFiles} file(s) reached.`)
        continue
      }

      const fileWithPreview: FileWithPreview = {
        file,
        previewUrl: generatePreviewUrl(file),
        progress: 0,
        error: null,
        id: generateFileId(),
      }
      toAdd.push(fileWithPreview)
    }

    errors.value = newErrors

    if (toAdd.length > 0) {
      files.value = [...files.value, ...toAdd]
      options.onFilesAdded?.(toAdd)
    }

    if (newErrors.length > 0) {
      options.onError?.(newErrors)
    }
  }

  function removeFile(id: string): void {
    const index = files.value.findIndex((f) => f.id === id)
    if (index === -1) return

    const removed = files.value[index]

    // Revoke object URL to avoid memory leaks
    if (removed.previewUrl) {
      URL.revokeObjectURL(removed.previewUrl)
    }

    files.value = files.value.filter((f) => f.id !== id)
    options.onFileRemoved?.(removed)
  }

  function clearFiles(): void {
    // Revoke all object URLs
    for (const f of files.value) {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl)
      }
    }
    files.value = []
    errors.value = []
  }

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    isDragging,
    errors,
  }
}
