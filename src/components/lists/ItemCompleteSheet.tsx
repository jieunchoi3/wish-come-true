import { useState } from 'react'
import { createPortal } from 'react-dom'
import { COMPLETION_ACTION_LABEL } from '../../constants/completion'
import { MemoryPhotoPicker } from './MemoryPhotoPicker'
import { StarRating } from './StarRating'
import type { ListItemView } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { getBinderOverlayRoot } from '../../lib/binderOverlay'
import { uploadCompletionPhoto } from '../../lib/listItemStorage'
import { supabase } from '../../lib/supabase'
import { PaperSheet, RubberStampButton } from '../wishes/WishUi'

interface ItemCompleteSheetProps {
  item: ListItemView
  onClose: () => void
}

export function ItemCompleteSheet({ item, onClose }: ItemCompleteSheetProps) {
  const { lists, items, updateItem } = useLists()
  const liveItem = items.find((row) => row.id === item.id) ?? item
  const list = lists.find((row) => row.id === liveItem.list_id)
  const [note, setNote] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [stamping, setStamping] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadPct, setUploadPct] = useState(0)
  const [saving, setSaving] = useState(false)

  function handlePhoto(file: File) {
    setPhotoFile(file)
    setPreviewUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  async function handleDone() {
    setStamping(true)
    setSaving(true)
    const now = new Date().toISOString()

    try {
      let completionPhotoUrl: string | null = null
      if (photoFile && supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          completionPhotoUrl = await uploadCompletionPhoto(
            user.id,
            liveItem.id,
            photoFile,
            setUploadPct,
          )
          completionPhotoUrl = completionPhotoUrl.split('?')[0] ?? completionPhotoUrl
        }
      }

      await updateItem(
        liveItem.id,
        {
          status: 'done',
          completed_at: now,
          completion_note: note.trim() || null,
          completion_photo_url: completionPhotoUrl,
          rating,
        },
        liveItem.is_seeded,
      )
      window.setTimeout(onClose, 400)
    } finally {
      setSaving(false)
    }
  }

  const sheet = (
    <PaperSheet id={`complete-${liveItem.id}`} onClose={onClose}>
      <p className="font-hand text-xl text-ink/55">you did it.</p>
      <h2 className="mt-1 font-serif text-2xl text-ink">{liveItem.title}</h2>
      <p className="mt-2 font-hand text-base text-ink/45">
        got a photo? optional — tap the polaroid or skip straight to done it.
      </p>

      <div className="mt-4">
        <MemoryPhotoPicker
          photoUrl={previewUrl}
          onFile={handlePhoto}
          uploading={saving && uploadPct > 0 && uploadPct < 1}
          uploadPct={uploadPct}
          className="w-40"
        />
      </div>

      {list?.rating_enabled && (
        <StarRating
          className="mt-6"
          label="rate it (optional)"
          value={rating}
          onChange={setRating}
        />
      )}

      <label className="mt-6 block">
        <span className="font-hand text-lg text-ink/50">how was it?</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-2 w-full resize-none border-0 border-b border-ink/20 bg-transparent font-hand text-xl text-ink outline-none"
        />
      </label>
      <div className={`mt-8 ${stamping ? 'stamp-press' : ''}`}>
        <RubberStampButton
          label={COMPLETION_ACTION_LABEL}
          rotation={-1}
          onClick={handleDone}
          disabled={saving}
        />
      </div>
      <button type="button" onClick={onClose} className="mt-4 font-hand text-ink/40">
        not yet — don&apos;t mark done
      </button>
    </PaperSheet>
  )

  const overlayRoot = getBinderOverlayRoot()
  if (!overlayRoot) return null
  return createPortal(sheet, overlayRoot)
}
