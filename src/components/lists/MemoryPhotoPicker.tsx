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
    if (entry.kind === 'file' && entry.type.startsWith('image/')) {
      return entry.getAsFile()
    }
  }
  const file = dataTransfer.files[0]
  return file?.type.startsWith('image/') ? file : null
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
  onFileRef.current = onFile

  function handleFile(file: File) {
    if (uploading) return
    onFile(file)
  }

  function openFilePicker() {
    if (uploading) return
    inputRef.current?.click()
  }

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    function onPaste(e: ClipboardEvent) {
      const file = pickImageFile(e.clipboardData)
      if (!file) return
      e.preventDefault()
      onFileRef.current(file)
    }

    zone.addEventListener('paste', onPaste)
    return () => zone.removeEventListener('paste', onPaste)
  }, [])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = pickImageFile(e.dataTransfer)
    if (file) handleFile(file)
  }

  const pickerDisabled = uploading

  return (
    <div
      ref={zoneRef}
      tabIndex={0}
      className={`relative outline-none ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="relative w-full">
        <PolaroidFrame className="w-full !pb-3 [&>div:first-child]:min-w-0">
          <div className="pointer-events-none h-full w-full">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              placeholder ?? (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 p-6">
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
          className="photo-file-overlay"
          disabled={pickerDisabled}
          aria-label="upload photo"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>

      <button
        type="button"
        disabled={pickerDisabled}
        onClick={openFilePicker}
        className={`mt-2 font-hand text-sm text-ink/40 underline decoration-dotted decoration-ink/20 transition-colors hover:text-ink/60 ${
          pickerDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        }`}
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
