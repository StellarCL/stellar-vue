import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import FileUpload from './FileUpload.vue'
import FileUploadDropzone from './FileUploadDropzone.vue'
import FileUploadTrigger from './FileUploadTrigger.vue'
import FileUploadPreview from './FileUploadPreview.vue'
import FileUploadProgress from './FileUploadProgress.vue'
import FileUploadList from './FileUploadList.vue'
import { useFileUpload } from '../../composables/useFileUpload'
import type { FileWithPreview } from './file-upload.types'

// ─── helpers ────────────────────────────────────────────────────────────────

function makeFile(name: string, type: string, size = 1024): File {
  const content = new Array(size).fill('a').join('')
  return new File([content], name, { type })
}

function makeFileWithPreview(overrides: Partial<FileWithPreview> = {}): FileWithPreview {
  return {
    id: 'test-id-1',
    file: makeFile('test.png', 'image/png'),
    previewUrl: 'blob:http://localhost/preview',
    progress: 0,
    error: null,
    ...overrides,
  }
}

// Mock URL.createObjectURL / revokeObjectURL
const mockObjectUrl = 'blob:http://localhost/mock-url'
const createObjectUrlMock = vi.fn(() => mockObjectUrl)
const revokeObjectUrlMock = vi.fn()

// ─── setup / teardown ───────────────────────────────────────────────────────

beforeEach(() => {
  vi.stubGlobal('URL', {
    createObjectURL: createObjectUrlMock,
    revokeObjectURL: revokeObjectUrlMock,
  })
  createObjectUrlMock.mockClear()
  revokeObjectUrlMock.mockClear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ─── FileUpload (root) ──────────────────────────────────────────────────────

describe('FileUpload', () => {
  it('renders without crashing', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.exists()).toBe(true)
  })

  it('applies custom class', () => {
    const wrapper = mount(FileUpload, { props: { class: 'custom-upload' } })
    expect(wrapper.classes()).toContain('custom-upload')
  })

  it('renders slot content', () => {
    const wrapper = mount(FileUpload, {
      slots: { default: '<span>Upload area</span>' },
    })
    expect(wrapper.text()).toContain('Upload area')
  })

  it('accepts modelValue prop', () => {
    const wrapper = mount(FileUpload, {
      props: { modelValue: [] },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

// ─── FileUploadDropzone ─────────────────────────────────────────────────────

describe('FileUploadDropzone', () => {
  it('renders without crashing', () => {
    const wrapper = mount(FileUploadDropzone)
    expect(wrapper.exists()).toBe(true)
  })

  it('applies default classes', () => {
    const wrapper = mount(FileUploadDropzone)
    expect(wrapper.classes().join(' ')).toContain('border-dashed')
  })

  it('shows drag state classes when isDragging', async () => {
    const wrapper = mount(FileUploadDropzone)
    await wrapper.trigger('dragenter', {
      dataTransfer: { files: [] },
    })
    // After drag enter, isDragging becomes true — class should update
    await nextTick()
    expect(wrapper.classes().join(' ')).toContain('border-primary')
  })

  it('resets drag state on dragleave', async () => {
    const wrapper = mount(FileUploadDropzone)
    await wrapper.trigger('dragenter', { dataTransfer: { files: [] } })
    await nextTick()
    await wrapper.trigger('dragleave', { relatedTarget: null })
    await nextTick()
    expect(wrapper.classes().join(' ')).not.toContain('border-primary')
  })

  it('emits filesDropped on drop when used standalone', async () => {
    const wrapper = mount(FileUploadDropzone, {
      props: { multiple: true },
    })
    const file = makeFile('photo.jpg', 'image/jpeg')
    const dataTransfer = { files: [file] }

    await wrapper.trigger('drop', { dataTransfer, preventDefault: () => {} })
    await nextTick()

    // Without a FileUpload parent context, emits 'filesDropped'
    const emitted = wrapper.emitted('filesDropped')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toContain(file)
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(FileUploadDropzone, { props: { disabled: true } })
    const file = makeFile('photo.jpg', 'image/jpeg')
    await wrapper.trigger('drop', { dataTransfer: { files: [file] } })
    expect(wrapper.emitted('filesDropped')).toBeFalsy()
  })

  it('applies disabled classes when disabled', () => {
    const wrapper = mount(FileUploadDropzone, { props: { disabled: true } })
    expect(wrapper.classes().join(' ')).toContain('opacity-50')
  })

  it('renders custom slot content', () => {
    const wrapper = mount(FileUploadDropzone, {
      slots: { default: '<p>Drop here</p>' },
    })
    expect(wrapper.text()).toContain('Drop here')
  })

  it('shows accept info in default slot', () => {
    const wrapper = mount(FileUploadDropzone, {
      props: { accept: 'image/*' },
    })
    expect(wrapper.text()).toContain('image/*')
  })

  it('limits to one file when multiple is false', async () => {
    const wrapper = mount(FileUploadDropzone, { props: { multiple: false } })
    const files = [
      makeFile('a.jpg', 'image/jpeg'),
      makeFile('b.jpg', 'image/jpeg'),
    ]
    await wrapper.trigger('drop', { dataTransfer: { files } })
    const emitted = wrapper.emitted('filesDropped')
    if (emitted) {
      expect((emitted[0][0] as File[]).length).toBe(1)
    }
  })
})

// ─── FileUploadTrigger ──────────────────────────────────────────────────────

describe('FileUploadTrigger', () => {
  it('renders without crashing', () => {
    const wrapper = mount(FileUploadTrigger)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a hidden file input', () => {
    const wrapper = mount(FileUploadTrigger)
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('sr-only')
  })

  it('passes accept to the input', () => {
    const wrapper = mount(FileUploadTrigger, { props: { accept: 'image/*' } })
    expect(wrapper.find('input').attributes('accept')).toBe('image/*')
  })

  it('passes multiple to the input', () => {
    const wrapper = mount(FileUploadTrigger, { props: { multiple: true } })
    expect(wrapper.find('input').attributes('multiple')).toBeDefined()
  })

  it('emits filesSelected when files are chosen (standalone)', async () => {
    const wrapper = mount(FileUploadTrigger)
    const file = makeFile('doc.pdf', 'application/pdf')
    const input = wrapper.find('input[type="file"]')

    // Simulate file selection by triggering change with a mock FileList
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true,
    })
    await input.trigger('change')

    const emitted = wrapper.emitted('filesSelected')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toContain(file)
  })

  it('renders default button with "Choose file" text', () => {
    const wrapper = mount(FileUploadTrigger)
    expect(wrapper.text()).toContain('Choose file')
  })

  it('renders "Choose files" when multiple', () => {
    const wrapper = mount(FileUploadTrigger, { props: { multiple: true } })
    expect(wrapper.text()).toContain('Choose files')
  })

  it('disables input when disabled', () => {
    const wrapper = mount(FileUploadTrigger, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})

// ─── FileUploadPreview ──────────────────────────────────────────────────────

describe('FileUploadPreview', () => {
  it('renders without crashing', () => {
    const file = makeFileWithPreview()
    const wrapper = mount(FileUploadPreview, { props: { file } })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays image thumbnail when previewUrl is present', () => {
    const file = makeFileWithPreview({ previewUrl: 'blob:http://localhost/img' })
    const wrapper = mount(FileUploadPreview, { props: { file } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('blob:http://localhost/img')
  })

  it('shows file icon when no previewUrl', () => {
    const nonImage = makeFileWithPreview({
      file: makeFile('doc.pdf', 'application/pdf'),
      previewUrl: null,
    })
    const wrapper = mount(FileUploadPreview, { props: { file: nonImage } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('shows file name', () => {
    const file = makeFileWithPreview({ file: makeFile('my-photo.png', 'image/png') })
    const wrapper = mount(FileUploadPreview, { props: { file } })
    expect(wrapper.text()).toContain('my-photo.png')
  })

  it('shows file size', () => {
    const file = makeFileWithPreview({ file: makeFile('img.png', 'image/png', 2048) })
    const wrapper = mount(FileUploadPreview, { props: { file } })
    expect(wrapper.text()).toMatch(/2\.0 KB|2048 B/)
  })

  it('shows error message when error is present', () => {
    const file = makeFileWithPreview({ error: 'File too large' })
    const wrapper = mount(FileUploadPreview, { props: { file } })
    expect(wrapper.text()).toContain('File too large')
  })

  it('does not show error section when error is null', () => {
    const file = makeFileWithPreview({ error: null })
    const wrapper = mount(FileUploadPreview, { props: { file } })
    expect(wrapper.text()).not.toContain('error')
  })

  it('renders slot content', () => {
    const file = makeFileWithPreview()
    const wrapper = mount(FileUploadPreview, {
      props: { file },
      slots: { default: '<button>Remove</button>' },
    })
    expect(wrapper.text()).toContain('Remove')
  })
})

// ─── FileUploadProgress ─────────────────────────────────────────────────────

describe('FileUploadProgress', () => {
  it('renders without crashing', () => {
    const wrapper = mount(FileUploadProgress, { props: { progress: 0 } })
    expect(wrapper.exists()).toBe(true)
  })

  it('sets aria-valuenow', () => {
    const wrapper = mount(FileUploadProgress, { props: { progress: 42 } })
    expect(wrapper.attributes('aria-valuenow')).toBe('42')
  })

  it('clamps progress to 0–100', () => {
    const wrapper = mount(FileUploadProgress, { props: { progress: 150 } })
    expect(wrapper.attributes('aria-valuenow')).toBe('100')
  })

  it('sets inner div width to match progress', () => {
    const wrapper = mount(FileUploadProgress, { props: { progress: 60 } })
    // Vue applies :style bindings directly to element.style properties in jsdom
    // so we check the rendered html string which includes style="width: 60%;"
    const html = wrapper.html()
    expect(html).toContain('60%')
  })

  it('has progressbar role', () => {
    const wrapper = mount(FileUploadProgress, { props: { progress: 0 } })
    expect(wrapper.attributes('role')).toBe('progressbar')
  })

  it('applies custom class', () => {
    const wrapper = mount(FileUploadProgress, {
      props: { progress: 0, class: 'custom-progress' },
    })
    expect(wrapper.classes()).toContain('custom-progress')
  })
})

// ─── FileUploadList ─────────────────────────────────────────────────────────

describe('FileUploadList', () => {
  it('renders without crashing', () => {
    const wrapper = mount(FileUploadList, { props: { files: [] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders nothing (no ul) when files is empty', () => {
    const wrapper = mount(FileUploadList, { props: { files: [] } })
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('renders list items for each file', () => {
    const files = [makeFileWithPreview({ id: 'a' }), makeFileWithPreview({ id: 'b' })]
    const wrapper = mount(FileUploadList, { props: { files } })
    expect(wrapper.findAll('li').length).toBe(2)
  })

  it('renders file names', () => {
    const files = [makeFileWithPreview({ file: makeFile('hello.png', 'image/png') })]
    const wrapper = mount(FileUploadList, { props: { files } })
    expect(wrapper.text()).toContain('hello.png')
  })

  it('emits remove event when remove button is clicked (standalone)', async () => {
    const file = makeFileWithPreview({ id: 'file-123', previewUrl: null })
    const wrapper = mount(FileUploadList, { props: { files: [file] } })

    const removeBtn = wrapper.find('button[aria-label]')
    expect(removeBtn.exists()).toBe(true)
    await removeBtn.trigger('click')

    const emitted = wrapper.emitted('remove')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe('file-123')
  })

  it('shows progress bar when file.progress is between 0 and 100', () => {
    const file = makeFileWithPreview({ progress: 50 })
    const wrapper = mount(FileUploadList, { props: { files: [file] } })
    const progressBar = wrapper.find('[role="progressbar"]')
    expect(progressBar.exists()).toBe(true)
  })

  it('does not show progress bar when progress is 0', () => {
    const file = makeFileWithPreview({ progress: 0 })
    const wrapper = mount(FileUploadList, { props: { files: [file] } })
    const progressBar = wrapper.find('[role="progressbar"]')
    expect(progressBar.exists()).toBe(false)
  })

  it('has accessible role and label', () => {
    const file = makeFileWithPreview()
    const wrapper = mount(FileUploadList, { props: { files: [file] } })
    const ul = wrapper.find('ul')
    expect(ul.attributes('role')).toBe('list')
    expect(ul.attributes('aria-label')).toBe('Uploaded files')
  })
})

// ─── Integrated FileUpload composition ─────────────────────────────────────

describe('FileUpload composition (FileUpload + FileUploadDropzone + FileUploadTrigger + FileUploadList)', () => {
  it('mounts all sub-components together without errors', () => {
    const wrapper = mount({
      components: { FileUpload, FileUploadDropzone, FileUploadTrigger, FileUploadList },
      template: `
        <FileUpload accept="image/*" :max-files="5">
          <template #default="{ files, isDragging }">
            <FileUploadDropzone>
              <FileUploadTrigger />
            </FileUploadDropzone>
            <FileUploadList :files="files" />
          </template>
        </FileUpload>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('passes files to slot scope', () => {
    const wrapper = mount({
      components: { FileUpload },
      template: `
        <FileUpload>
          <template #default="{ files }">
            <span data-testid="count">{{ files.length }}</span>
          </template>
        </FileUpload>
      `,
    })
    expect(wrapper.find('[data-testid="count"]').text()).toBe('0')
  })
})

// ─── useFileUpload composable ────────────────────────────────────────────────

describe('useFileUpload composable', () => {
  it('starts with empty files', () => {
    const { files } = useFileUpload()
    expect(files.value).toEqual([])
  })

  it('starts with empty errors', () => {
    const { errors } = useFileUpload()
    expect(errors.value).toEqual([])
  })

  it('isDragging starts as false', () => {
    const { isDragging } = useFileUpload()
    expect(isDragging.value).toBe(false)
  })

  it('addFiles adds valid files', () => {
    const { files, addFiles } = useFileUpload()
    const file = makeFile('test.png', 'image/png')
    addFiles([file])
    expect(files.value.length).toBe(1)
    expect(files.value[0].file).toBe(file)
  })

  it('addFiles generates a preview URL for image files', () => {
    const { files, addFiles } = useFileUpload()
    addFiles([makeFile('image.png', 'image/png')])
    expect(createObjectUrlMock).toHaveBeenCalledOnce()
    expect(files.value[0].previewUrl).toBe(mockObjectUrl)
  })

  it('addFiles does NOT generate a preview URL for non-image files', () => {
    const { files, addFiles } = useFileUpload()
    addFiles([makeFile('doc.pdf', 'application/pdf')])
    expect(createObjectUrlMock).not.toHaveBeenCalled()
    expect(files.value[0].previewUrl).toBeNull()
  })

  it('addFiles rejects file with wrong MIME type', () => {
    const { files, errors, addFiles } = useFileUpload({ accept: 'image/*' })
    addFiles([makeFile('doc.pdf', 'application/pdf')])
    expect(files.value.length).toBe(0)
    expect(errors.value.length).toBe(1)
    expect(errors.value[0]).toContain('invalid file type')
  })

  it('addFiles accepts file with matching MIME type', () => {
    const { files, addFiles } = useFileUpload({ accept: 'image/*' })
    addFiles([makeFile('photo.jpg', 'image/jpeg')])
    expect(files.value.length).toBe(1)
    expect(files.value[0].error).toBeNull()
  })

  it('addFiles rejects file that exceeds maxSize', () => {
    const { files, errors, addFiles } = useFileUpload({ maxSize: 500 })
    addFiles([makeFile('big.png', 'image/png', 1024)])
    expect(files.value.length).toBe(0)
    expect(errors.value[0]).toContain('exceeds the maximum size')
  })

  it('addFiles accepts file within maxSize', () => {
    const { files, addFiles } = useFileUpload({ maxSize: 5000 })
    addFiles([makeFile('small.png', 'image/png', 100)])
    expect(files.value.length).toBe(1)
  })

  it('addFiles enforces maxFiles limit', () => {
    const { files, errors, addFiles } = useFileUpload({ maxFiles: 2 })
    addFiles([
      makeFile('a.png', 'image/png'),
      makeFile('b.png', 'image/png'),
      makeFile('c.png', 'image/png'),
    ])
    expect(files.value.length).toBe(2)
    expect(errors.value.length).toBe(1)
    expect(errors.value[0]).toContain('maximum')
  })

  it('addFiles respects maxFiles across multiple calls', () => {
    const { files, addFiles } = useFileUpload({ maxFiles: 2 })
    addFiles([makeFile('a.png', 'image/png')])
    addFiles([makeFile('b.png', 'image/png')])
    addFiles([makeFile('c.png', 'image/png')]) // should be rejected
    expect(files.value.length).toBe(2)
  })

  it('removeFile removes a file by id', () => {
    const { files, addFiles, removeFile } = useFileUpload()
    addFiles([makeFile('test.png', 'image/png')])
    const id = files.value[0].id
    removeFile(id)
    expect(files.value.length).toBe(0)
  })

  it('removeFile revokes the previewUrl', () => {
    const { files, addFiles, removeFile } = useFileUpload()
    addFiles([makeFile('img.png', 'image/png')])
    const id = files.value[0].id
    removeFile(id)
    expect(revokeObjectUrlMock).toHaveBeenCalledWith(mockObjectUrl)
  })

  it('removeFile does nothing for unknown id', () => {
    const { files, addFiles, removeFile } = useFileUpload()
    addFiles([makeFile('test.png', 'image/png')])
    removeFile('nonexistent-id')
    expect(files.value.length).toBe(1)
  })

  it('clearFiles removes all files', () => {
    const { files, addFiles, clearFiles } = useFileUpload()
    addFiles([makeFile('a.png', 'image/png'), makeFile('b.png', 'image/png')])
    clearFiles()
    expect(files.value.length).toBe(0)
  })

  it('clearFiles revokes all preview URLs', () => {
    const { files, addFiles, clearFiles } = useFileUpload()
    addFiles([makeFile('a.png', 'image/png'), makeFile('b.png', 'image/png')])
    clearFiles()
    expect(revokeObjectUrlMock).toHaveBeenCalledTimes(2)
  })

  it('clearFiles clears errors too', () => {
    const { errors, addFiles, clearFiles } = useFileUpload({ accept: 'image/*' })
    addFiles([makeFile('doc.pdf', 'application/pdf')])
    expect(errors.value.length).toBeGreaterThan(0)
    clearFiles()
    expect(errors.value.length).toBe(0)
  })

  it('calls onFilesAdded callback when files are added', () => {
    const onFilesAdded = vi.fn()
    const { addFiles } = useFileUpload({ onFilesAdded })
    addFiles([makeFile('test.png', 'image/png')])
    expect(onFilesAdded).toHaveBeenCalledOnce()
    expect(onFilesAdded.mock.calls[0][0]).toHaveLength(1)
  })

  it('calls onFileRemoved callback when file is removed', () => {
    const onFileRemoved = vi.fn()
    const { files, addFiles, removeFile } = useFileUpload({ onFileRemoved })
    addFiles([makeFile('test.png', 'image/png')])
    const id = files.value[0].id
    removeFile(id)
    expect(onFileRemoved).toHaveBeenCalledOnce()
  })

  it('calls onError callback when validation fails', () => {
    const onError = vi.fn()
    const { addFiles } = useFileUpload({ accept: 'image/*', onError })
    addFiles([makeFile('doc.pdf', 'application/pdf')])
    expect(onError).toHaveBeenCalledOnce()
  })

  it('each file gets a unique id', () => {
    const { files, addFiles } = useFileUpload()
    addFiles([makeFile('a.png', 'image/png'), makeFile('b.png', 'image/png')])
    const ids = files.value.map((f) => f.id)
    expect(new Set(ids).size).toBe(2)
  })

  it('isDragging can be set to true', () => {
    const { isDragging } = useFileUpload()
    isDragging.value = true
    expect(isDragging.value).toBe(true)
  })
})
