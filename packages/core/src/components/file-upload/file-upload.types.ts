import type { HTMLAttributes } from 'vue'

/** A File object augmented with preview URL, upload progress, and error message */
export interface FileWithPreview {
  /** The native File object */
  file: File
  /** Object URL for image preview (created via URL.createObjectURL) */
  previewUrl: string | null
  /** Upload progress percentage (0–100) */
  progress: number
  /** Validation or upload error message */
  error: string | null
  /** Unique identifier for this file entry */
  id: string
}

export interface FileUploadProps {
  /** Accepted MIME types (e.g. "image/*", "application/pdf") */
  accept?: string

  /** Maximum file size in bytes */
  maxSize?: number

  /** Maximum number of files allowed */
  maxFiles?: number

  /** Allow selecting multiple files */
  multiple?: boolean

  /** Disable the upload control */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FileUploadDropzoneProps {
  /** Accepted MIME types */
  accept?: string

  /** Maximum file size in bytes */
  maxSize?: number

  /** Maximum number of files allowed */
  maxFiles?: number

  /** Allow dropping multiple files */
  multiple?: boolean

  /** Disable drag-and-drop */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FileUploadTriggerProps {
  /** Accepted MIME types */
  accept?: string

  /** Allow selecting multiple files */
  multiple?: boolean

  /** Disable the trigger button */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FileUploadPreviewProps {
  /** The file-with-preview entry to display */
  file: FileWithPreview

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FileUploadProgressProps {
  /** Upload progress percentage (0–100) */
  progress: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FileUploadListProps {
  /** List of files to display */
  files: FileWithPreview[]

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface UseFileUploadOptions {
  /** Accepted MIME types */
  accept?: string

  /** Maximum file size in bytes */
  maxSize?: number

  /** Maximum number of files allowed */
  maxFiles?: number

  /** Whether multiple files are allowed */
  multiple?: boolean

  /** Callback when files are added */
  onFilesAdded?: (files: FileWithPreview[]) => void

  /** Callback when a file is removed */
  onFileRemoved?: (file: FileWithPreview) => void

  /** Callback when validation errors occur */
  onError?: (errors: string[]) => void
}

export interface UseFileUploadReturn {
  /** Current list of files with previews */
  files: import('vue').Ref<FileWithPreview[]>

  /** Add files to the list (validates against accept/maxSize/maxFiles) */
  addFiles: (newFiles: File[]) => void

  /** Remove a file by its id */
  removeFile: (id: string) => void

  /** Clear all files */
  clearFiles: () => void

  /** Whether a drag operation is in progress over the dropzone */
  isDragging: import('vue').Ref<boolean>

  /** Validation/upload errors keyed by file name */
  errors: import('vue').Ref<string[]>
}
