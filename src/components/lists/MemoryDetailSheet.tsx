import { useEffect, useState } from 'react'
import { RubberStamp } from '../ScrapbookElements'
import { MemoryPhotoPicker } from './MemoryPhotoPicker'
import { PaperSheet } from '../wishes/WishUi'
import {
  CATEGORY_ACCENTS,
  categoryEmoji,
} from '../../constants/wishMeta'
import { useLists } from '../../hooks/useLists'
import { uploadCompletionPhoto } from '../../lib/listItemStorage'
import { supabase } from '../../lib/supabase'
import {
  formatDoneStampDate,
  formatImaginedBeforeDone,
} from '../../lib/utils'
import type { ListItemView } from '../../types/database'

function formatCaptionDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface MemoryDetailSheetProps {
  item: ListItemView
  onClose: () => void
  backLabel?: string
}

export function MemoryDetailSheet({
  item,
  onClose,
  backLabel = 'back to the chapter',
}: MemoryDetailSheetProps) {
  const { updateItem } = useLists()
  const accent = CATEGORY_ACCENTS[item.category]
  const completedLabel = item.completed_at
    ? formatCaptionDate(item.completed_at)
    : ''
  const imaginedSpan =
    !item.is_seeded && item.created_at && item.completed_at
      ? formatImaginedBeforeDone(item.created_at, item.completed_at)
      : null

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    item.completion_photo_url,
  )
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [photoError, setPhotoError] = useState<string | null>(null)

  useEffect(() => {
    setPreviewUrl(item.completion_photo_url)
  }, [item.completion_photo_url, item.id])

  async function handlePhoto(file: File) {
    const prev = previewUrl
    const local = URL.createObjectURL(file)
    setPreviewUrl(local)
    setUploading(true)
    setUploadPct(0)
    setPhotoError(null)

    try {
      if (!supabase) throw new Error('offline')
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('not signed in')

      const url = await uploadCompletionPhoto(
        user.id,
        item.id,
        file,
        setUploadPct,
      )
      await updateItem(
        item.id,
        { completion_photo_url: url },
        item.is_seeded,
      )
      setPreviewUrl(url)
    } catch {
      setPreviewUrl(prev)
      setPhotoError('could not save photo — try again')
    } finally {
      setUploading(false)
      URL.revokeObjectURL(local)
    }
  }

  const placeholder = (
    <div
      className="flex min-h-[200px] w-full flex-col items-center justify-center gap-3 p-6"
      style={{ backgroundColor: accent }}
    >
      <span className="text-4xl" aria-hidden>
        {categoryEmoji(item.category)}
      </span>
      <p className="text-center font-serif text-lg font-medium text-ink">
        {item.title}
      </p>
    </div>
  )

  return (
    <PaperSheet id={`memory-detail-${item.id}`} onClose={onClose}>
      <button
        type="button"
        onClick={onClose}
        className="mb-4 font-hand text-sm text-ink/40 underline decoration-dotted"
      >
        {backLabel}
      </button>

      <div className="relative mx-auto max-w-xs">
        <MemoryPhotoPicker
          photoUrl={previewUrl}
          placeholder={placeholder}
          onFile={handlePhoto}
          uploading={uploading}
          uploadPct={uploadPct}
        />
        {item.completed_at && (
          <RubberStamp
            date={formatDoneStampDate(item.completed_at)}
            className="pointer-events-none top-[42%] text-xl"
          />
        )}
      </div>

      {photoError && (
        <p className="mt-2 font-hand text-sm text-rose-deep">{photoError}</p>
      )}

      <h2 className="mt-6 font-serif text-2xl font-medium text-ink">
        {item.title}
      </h2>

      {item.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/65">{item.completion_note}</p>
      )}
      {item.note && !item.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/55">{item.note}</p>
      )}

      <p className="mt-3 font-hand text-base text-ink/40">{completedLabel}</p>

      {imaginedSpan && (
        <p
          className="mt-6 font-hand text-xl leading-relaxed text-ink/65"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          you imagined this {imaginedSpan} before you did it
        </p>
      )}
    </PaperSheet>
  )
}
