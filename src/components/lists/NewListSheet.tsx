import { useState } from 'react'
import { DEFAULT_LIST_EMOJI } from '../../constants/listEmojis'
import { RubberStampButton, PaperSheet } from '../wishes/WishUi'
import { ListEmojiPicker } from './ListEmojiPicker'

interface NewListSheetProps {
  onClose: () => void
  onCreate: (title: string, emoji: string, ratingEnabled: boolean) => Promise<void>
  busy?: boolean
  error?: string | null
}

export function NewListSheet({
  onClose,
  onCreate,
  busy,
  error,
}: NewListSheetProps) {
  const [emoji, setEmoji] = useState(DEFAULT_LIST_EMOJI)
  const [title, setTitle] = useState('')
  const [ratingEnabled, setRatingEnabled] = useState(false)

  async function handleCreate() {
    const nextTitle = title.trim()
    if (!nextTitle || busy) return
    await onCreate(nextTitle, emoji || DEFAULT_LIST_EMOJI, ratingEnabled)
  }

  return (
    <PaperSheet id="new-list" onClose={onClose}>
      <p className="font-hand text-lg text-ink/50">new list</p>

      <div className="mt-4">
        <ListEmojiPicker value={emoji} onChange={setEmoji} />
      </div>

      <label className="mt-5 block">
        <span className="font-hand text-sm text-ink/45">name</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && title.trim() && !busy) void handleCreate()
            if (e.key === 'Escape') onClose()
          }}
          placeholder="name your list…"
          disabled={busy}
          className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-xl text-ink outline-none disabled:opacity-50"
        />
      </label>

      <label className="mt-5 flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={ratingEnabled}
          onChange={(e) => setRatingEnabled(e.target.checked)}
          disabled={busy}
          className="size-4 accent-ochre"
        />
        <span className="font-hand text-sm text-ink/55">
          rate items with stars when done (1–5)
        </span>
      </label>

      {error && (
        <p className="mt-3 font-hand text-sm text-stamp/80">{error}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <RubberStampButton
          label={busy ? 'creating…' : 'create'}
          onClick={() => void handleCreate()}
          disabled={busy || !title.trim()}
          rotation={-2}
        />
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="font-hand text-sm text-ink/40 underline decoration-dotted"
        >
          never mind
        </button>
      </div>
    </PaperSheet>
  )
}
