import { useId, useRef, type ChangeEvent } from 'react'

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
  const pickerDisabled = disabled || uploading

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFile(file)
    e.target.value = ''
  }

  return (
    <div className={className}>
      <span className="font-hand text-sm text-ink/45">add photo</span>
      <p className="mt-0.5 font-hand text-xs text-ink/35">
        optional — pattern, sketch, or reference to keep with this idea
      </p>

      <label
        htmlFor={inputId}
        className={`mt-2 block max-w-[180px] ${pickerDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded border border-ink/15 bg-paper-shadow/30 shadow-[1px_2px_6px_rgba(44,42,38,0.08)]">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-3 text-center font-hand text-sm text-ink/35">
              tap to add photo
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
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => inputRef.current?.click()}
          className="text-ink/45 underline decoration-dotted hover:text-ink/65 disabled:opacity-40"
        >
          {uploading ? 'uploading…' : 'upload photo'}
        </button>
        {imageUrl && onRemove && (
          <button
            type="button"
            disabled={pickerDisabled}
            onPointerDown={(e) => e.stopPropagation()}
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
