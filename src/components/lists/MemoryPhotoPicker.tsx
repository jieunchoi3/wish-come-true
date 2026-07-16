import { useEffect, useId, useRef, type ReactNode } from 'react'
import { PolaroidFrame } from '../PolaroidFrame'

interface MemoryPhotoPickerProps {
  photoUrl: string | null
  placeholder?: ReactNode
  onFile: (file: File) => void
  uploading?: boolean
  uploadPct?: number
  className?: string
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
}: MemoryPhotoPickerProps) {
  const inputId = useId()
  const zoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    function onPaste(e: ClipboardEvent) {
      const file = pickImageFile(e.clipboardData)
      if (!file) return
      e.preventDefault()
      onFile(file)
    }

    zone.addEventListener('paste', onPaste)
    return () => zone.removeEventListener('paste', onPaste)
  }, [onFile])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = pickImageFile(e.dataTransfer)
    if (file) onFile(file)
  }

  return (
    <div
      ref={zoneRef}
      tabIndex={0}
      className={`outline-none ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <label htmlFor={inputId} className="block cursor-pointer">
        <PolaroidFrame className="w-full">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            placeholder ?? (
              <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 p-6">
                <span className="font-hand text-lg text-ink/35">add a photo</span>
                <span className="font-hand text-sm text-ink/30">
                  click · paste · drop
                </span>
              </div>
            )
          )}
        </PolaroidFrame>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onFile(file)
            e.target.value = ''
          }}
        />
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-hand text-sm text-ink/40">
        <label htmlFor={inputId} className="cursor-pointer hover:text-ink/60">
          choose a photo
        </label>
        <span aria-hidden>·</span>
        <span>paste from clipboard</span>
        <span aria-hidden>·</span>
        <span>drop here</span>
        {photoUrl && (
          <>
            <span aria-hidden>·</span>
            <label htmlFor={inputId} className="cursor-pointer hover:text-ink/60">
              change photo
            </label>
          </>
        )}
      </div>

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
