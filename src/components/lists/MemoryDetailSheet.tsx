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

/** Strip cache-bust query before persisting to Supabase. */
function storagePhotoUrl(url: string): string {
  return url.split('?')[0] ?? url
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
  const { items, updateItem } = useLists()
  const liveItem = items.find((row) => row.id === item.id) ?? item
  const accent = CATEGORY_ACCENTS[liveItem.category]
  const completedLabel = liveItem.completed_at
    ? formatCaptionDate(liveItem.completed_at)
    : ''
  const imaginedSpan =
    !liveItem.is_seeded && liveItem.created_at && liveItem.completed_at
      ? formatImaginedBeforeDone(liveItem.created_at, liveItem.completed_at)
      : null

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    liveItem.completion_photo_url,
  )
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [photoError, setPhotoError] = useState<string | null>(null)

  useEffect(() => {
    if (uploading) return
    setPreviewUrl(liveItem.completion_photo_url)
  }, [liveItem.completion_photo_url, liveItem.id, uploading])

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
        liveItem.id,
        file,
        setUploadPct,
      )
      const saved = await updateItem(
        liveItem.id,
        {
          completion_photo_url: storagePhotoUrl(url),
          status: liveItem.status,
          completed_at: liveItem.completed_at,
        },
        liveItem.is_seeded,
      )
      if (!saved) throw new Error('save failed')
      setPreviewUrl(url)
    } catch (err) {
      setPreviewUrl(prev)
      setPhotoError(
        err instanceof Error && err.message === 'not signed in'
          ? 'sign in to save photos'
          : 'could not save photo — try again',
      )
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
        {categoryEmoji(liveItem.category)}
      </span>
      <p className="text-center font-serif text-lg font-medium text-ink">
        {liveItem.title}
      </p>
    </div>
  )

  return (
    <PaperSheet id={`memory-detail-${liveItem.id}`} onClose={onClose}>
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
          stampOverlay={
            liveItem.completed_at ? (
              <RubberStamp
                date={formatDoneStampDate(liveItem.completed_at)}
                className="pointer-events-none top-[38%] z-20 text-xl"
              />
            ) : undefined
          }
        />
      </div>

      {photoError && (
        <p className="mt-2 font-hand text-sm text-rose-deep">{photoError}</p>
      )}

      <h2 className="mt-6 font-serif text-2xl font-medium text-ink">
        {liveItem.title}
      </h2>

      {liveItem.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/65">
          {liveItem.completion_note}
        </p>
      )}
      {liveItem.note && !liveItem.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/55">{liveItem.note}</p>
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
