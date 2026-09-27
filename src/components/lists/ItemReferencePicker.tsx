import {
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import {
  isEditablePasteTarget,
  pickImageFile,
} from '../../lib/clipboardImage'

interface ItemReferencePickerProps {
  imageUrl: string | null
  onFile: (file: File) => void
  onRemove?: () => void
  uploading?: boolean
  disabled?: boolean
  className?: string
}

/** Optional reference photo on a list item (separate from done-it polaroids). */
export function ItemReferencePicker({
  imageUrl,
  onFile,
  onRemove,
  uploading = false,
  disabled = false,
  className = '',
}: ItemReferencePickerProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const onFileRef = useRef(onFile)
  const pickerDisabledRef = useRef(false)
  const pickerDisabled = disabled || uploading
  onFileRef.current = onFile
  pickerDisabledRef.current = pickerDisabled

  useEffect(() => {
    if (pickerDisabled) return
    zoneRef.current?.focus({ preventScroll: true })

    function onPaste(e: ClipboardEvent) {
      if (pickerDisabledRef.current || isEditablePasteTarget(e.target)) return
      const file = pickImageFile(e.clipboardData)
      if (!file) return
      e.preventDefault()
      onFileRef.current(file)
    }

    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [pickerDisabled])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFile(file)
    e.target.value = ''
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    if (pickerDisabled) return
    const file = pickImageFile(e.dataTransfer)
    if (file) onFile(file)
  }

  return (
    <div
      ref={zoneRef}
      tabIndex={pickerDisabled ? -1 : 0}
      className={`outline-none ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <span className="font-hand text-sm text-ink/45">add photo</span>
      <p className="mt-0.5 font-hand text-xs text-ink/35">
        optional — paste, upload, or drop a pattern or reference
      </p>

      <label
        htmlFor={inputId}
        className={`mt-2 block max-w-[180px] ${pickerDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded border border-ink/15 bg-paper-shadow/30 shadow-[1px_2px_6px_rgba(44,42,38,0.08)]">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-3 text-center font-hand text-sm text-ink/35">
              paste or tap to add
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/webp,image/gif,image/*"
          className="hidden"
          disabled={pickerDisabled}
          onChange={handleChange}
        />
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-hand text-sm">
        <button
          type="button"
          disabled={pickerDisabled}
          onClick={() => inputRef.current?.click()}
          className="text-ink/45 underline decoration-dotted hover:text-ink/65 disabled:opacity-40"
        >
          {uploading ? 'uploading…' : 'upload photo'}
        </button>
        {imageUrl && onRemove && (
          <button
            type="button"
            disabled={pickerDisabled}
            onClick={onRemove}
            className="text-ink/40 underline decoration-dotted hover:text-ink/60 disabled:opacity-40"
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}
