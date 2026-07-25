import { useEffect, useId, useRef, type ReactNode } from 'react'
import { PolaroidFrame } from '../PolaroidFrame'

interface MemoryPhotoPickerProps {
  photoUrl: string | null
  placeholder?: ReactNode
  onFile: (file: File) => void
  uploading?: boolean
  uploadPct?: number
  className?: string
  /** Decorative overlay on the polaroid — must use pointer-events-none */
  stampOverlay?: ReactNode
}

function pickImageFile(
  dataTransfer: DataTransfer | null | undefined,
): File | null {
  if (!dataTransfer) return null

  for (const entry of dataTransfer.items) {
    if (entry.kind !== 'file') continue
    const file = entry.getAsFile()
    if (!file) continue
    if (file.type.startsWith('image/')) return file
    // macOS screenshots sometimes arrive with an empty MIME type
    if (!file.type && file.size > 0) return file
  }

  for (let i = 0; i < dataTransfer.files.length; i++) {
    const file = dataTransfer.files[i]
    if (!file) continue
    if (file.type.startsWith('image/')) return file
    if (!file.type && file.size > 0) return file
  }

  return null
}

function isEditablePasteTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  )
}

export function MemoryPhotoPicker({
  photoUrl,
  placeholder,
  onFile,
  uploading = false,
  uploadPct = 0,
  className = 'w-full',
  stampOverlay,
}: MemoryPhotoPickerProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const onFileRef = useRef(onFile)
  const uploadingRef = useRef(uploading)
  onFileRef.current = onFile
  uploadingRef.current = uploading

  function handleFile(file: File) {
    if (uploading) return
    onFile(file)
  }

  useEffect(() => {
    zoneRef.current?.focus({ preventScroll: true })

    function onPaste(e: ClipboardEvent) {
      if (uploadingRef.current || isEditablePasteTarget(e.target)) return
      const file = pickImageFile(e.clipboardData)
      if (!file) return
      e.preventDefault()
      onFileRef.current(file)
    }

    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = pickImageFile(e.dataTransfer)
    if (file) handleFile(file)
  }

  const pickerDisabled = uploading
  const linkClass = pickerDisabled
    ? 'cursor-not-allowed opacity-50'
    : 'cursor-pointer hover:text-ink/60'

  return (
    <div
      ref={zoneRef}
      tabIndex={0}
      className={`relative outline-none ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <label
        className={`relative block w-full ${linkClass}`}
        aria-disabled={pickerDisabled}
      >
        <PolaroidFrame className="w-full !pb-3 [&>div:first-child]:min-w-0">
          <div className="pointer-events-none h-full w-full min-h-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              placeholder ?? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6">
                  <span className="font-hand text-lg text-ink/35">
                    add a photo
                  </span>
                </div>
              )
            )}
          </div>
        </PolaroidFrame>
        {stampOverlay}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/webp,image/gif,image/*"
          className="hidden"
          disabled={pickerDisabled}
          aria-label="upload photo"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </label>

      <button
        type="button"
        disabled={pickerDisabled}
        onClick={() => inputRef.current?.click()}
        className={`mt-2 inline-block font-hand text-sm text-ink/40 underline decoration-dotted decoration-ink/20 transition-colors ${linkClass}`}
      >
        paste or upload photo
      </button>

      {uploading && uploadPct < 1 && (
        <div className="mt-2 h-0.5 w-full bg-ink/10">
          <div
            className="h-full bg-ink/40 transition-all"
            style={{ width: `${uploadPct * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
