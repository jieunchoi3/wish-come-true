import { useId, useRef, type ChangeEvent } from 'react'

interface ListCoverPickerProps {
  coverUrl: string | null
  onFile: (file: File) => void
  onRemove?: () => void
  uploading?: boolean
  disabled?: boolean
  className?: string
}

/** Rectangular list cover — not the polaroid memory photo flow. */
export function ListCoverPicker({
  coverUrl,
  onFile,
  onRemove,
  uploading = false,
  disabled = false,
  className = '',
}: ListCoverPickerProps) {
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
      <span className="font-hand text-sm text-ink/45">list photo</span>
      <p className="mt-0.5 font-hand text-xs text-ink/35">
        optional — for the list itself, not your done-it polaroids
      </p>

      <label
        htmlFor={inputId}
        className={`mt-2 block max-w-[220px] ${pickerDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <div className="list-cover-preview aspect-[3/2] w-full overflow-hidden rounded border border-ink/15 bg-paper-shadow/30 shadow-[1px_2px_6px_rgba(44,42,38,0.08)]">
          {coverUrl ? (
            <img src={coverUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center font-hand text-sm text-ink/35">
              tap to add a cover
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
        {coverUrl && onRemove && (
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
