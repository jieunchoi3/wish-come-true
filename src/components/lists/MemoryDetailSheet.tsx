import { useEffect, useState } from 'react'
import { RubberStamp } from '../ScrapbookElements'
import { MemoryPhotoPicker } from './MemoryPhotoPicker'
import { StarRating } from './StarRating'
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

function isoToDateInputValue(iso: string): string {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function dateInputToIso(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0, 0).toISOString()
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
  const { lists, items, updateItem } = useLists()
  const liveItem = items.find((row) => row.id === item.id) ?? item
  const list = lists.find((row) => row.id === liveItem.list_id)
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
  const [editingDate, setEditingDate] = useState(false)
  const [dateDraft, setDateDraft] = useState('')
  const [dateSaving, setDateSaving] = useState(false)
  const [dateError, setDateError] = useState<string | null>(null)
  const [ratingSaving, setRatingSaving] = useState(false)

  useEffect(() => {
    setEditingDate(false)
    setDateError(null)
  }, [liveItem.id])

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

  function startEditDate() {
    if (!liveItem.completed_at) return
    setDateDraft(isoToDateInputValue(liveItem.completed_at))
    setEditingDate(true)
    setDateError(null)
  }

  async function saveDate() {
    if (!dateDraft) return
    setDateSaving(true)
    setDateError(null)
    const saved = await updateItem(
      liveItem.id,
      {
        status: liveItem.status,
        completed_at: dateInputToIso(dateDraft),
      },
      liveItem.is_seeded,
    )
    setDateSaving(false)
    if (!saved) {
      setDateError('couldn’t save date — try again')
      return
    }
    setEditingDate(false)
  }

  async function saveRating(nextRating: number | null) {
    setRatingSaving(true)
    const saved = await updateItem(
      liveItem.id,
      {
        status: liveItem.status,
        completed_at: liveItem.completed_at,
        rating: nextRating,
      },
      liveItem.is_seeded,
    )
    setRatingSaving(false)
    if (!saved) return
  }

  const placeholder = (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 p-6"
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

      {list?.rating_enabled && (
        <StarRating
          className="mt-3"
          label="your rating"
          value={liveItem.rating}
          onChange={(next) => void saveRating(next)}
        />
      )}
      {ratingSaving && (
        <p className="mt-1 font-hand text-xs text-ink/40">saving…</p>
      )}

      {liveItem.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/65">
          {liveItem.completion_note}
        </p>
      )}
      {liveItem.note && !liveItem.completion_note && (
        <p className="mt-2 font-hand text-lg text-ink/55">{liveItem.note}</p>
      )}

      <div className="mt-3">
        {editingDate ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <label className="sr-only" htmlFor={`memory-date-${liveItem.id}`}>
              Completion date
            </label>
            <input
              id={`memory-date-${liveItem.id}`}
              type="date"
              value={dateDraft}
              onChange={(e) => setDateDraft(e.target.value)}
              disabled={dateSaving}
              className="border-0 border-b border-ink/25 bg-transparent font-hand text-base text-ink outline-none"
            />
            <button
              type="button"
              disabled={dateSaving || !dateDraft}
              onClick={() => void saveDate()}
              className="font-hand text-sm text-ink/55 underline decoration-dotted hover:text-ink/75 disabled:opacity-40"
            >
              save
            </button>
            <button
              type="button"
              disabled={dateSaving}
              onClick={() => {
                setEditingDate(false)
                setDateError(null)
              }}
              className="font-hand text-sm text-ink/40 underline decoration-dotted hover:text-ink/60"
            >
              cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-hand text-base text-ink/40">{completedLabel}</p>
            {liveItem.completed_at && (
              <button
                type="button"
                onClick={startEditDate}
                className="font-hand text-sm text-ink/45 underline decoration-dotted decoration-ink/20 hover:text-ink/65"
              >
                edit date
              </button>
            )}
          </div>
        )}
        {dateError && (
          <p className="mt-1 font-hand text-sm text-rose-deep">{dateError}</p>
        )}
      </div>

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
