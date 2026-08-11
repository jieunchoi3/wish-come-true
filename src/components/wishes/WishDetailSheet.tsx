import { useState } from 'react'
import { COMPLETION_ACTION_LABEL } from '../../constants/completion'
import {
  addMonthsISO,
  addSeasonISO,
  addWeeksISO,
} from '../../lib/wishQueries'
import { formatImaginedAgo } from '../../lib/utils'
import type { Wish } from '../../types/supabase'
import { useWishes } from '../../hooks/useWishes'
import { PolaroidFrame } from '../PolaroidFrame'
import { Chip } from '../ScrapbookElements'
import { PaperSheet, RubberStampButton } from './WishUi'

interface WishDetailSheetProps {
  wish: Wish
  onClose: () => void
  onEdit: () => void
  onDeleted: () => void
}

export function WishDetailSheet({
  wish,
  onClose,
  onEdit,
  onDeleted,
}: WishDetailSheetProps) {
  const { updateWish, deleteWish, snoozeWish } = useWishes()
  const [showCalendar, setShowCalendar] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [tearing, setTearing] = useState(false)

  const imaginedAgo = formatImaginedAgo(new Date(wish.created_at))

  async function handleCommit(date: string) {
    await updateWish(wish.id, {
      status: 'committed',
      committed_for: date,
    })
    setShowCalendar(false)
  }

  async function handleDone() {
    await updateWish(wish.id, {
      status: 'done',
      completed_at: new Date().toISOString(),
    })
    onClose()
  }

  async function handleDelete() {
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      return
    }
    setTearing(true)
    window.setTimeout(async () => {
      await deleteWish(wish.id)
      onDeleted()
    }, 260)
  }

  return (
    <PaperSheet id={`detail-${wish.id}`}>
      <div className={tearing ? 'wish-tear' : ''}>
        {wish.image_url && (
          <PolaroidFrame className="mb-4 w-40">
            <img src={wish.image_url} alt="" className="polaroid-photo" />
          </PolaroidFrame>
        )}

        <p className="font-hand text-xl text-ink/55">imagined {imaginedAgo}</p>
        <h2 className="mt-1 font-serif text-3xl font-medium text-ink">{wish.title}</h2>
        {wish.note && (
          <p className="mt-3 font-hand text-xl text-ink/70">{wish.note}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip index={0} label={`${categoryEmoji(wish.category)} ${wish.category}`} selected />
          {wish.time_needed && <Chip index={1} label={wish.time_needed} selected={false} />}
          {wish.topic_tags.map((t, i) => (
            <span key={t} className="font-hand text-sm text-ink/45">
              {i > 0 ? ' · ' : ''}
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <RubberStampButton
            label="commit"
            rotation={-1}
            onClick={() => setShowCalendar(!showCalendar)}
          />
          <RubberStampButton label={COMPLETION_ACTION_LABEL} rotation={1} onClick={handleDone} />
        </div>

        {showCalendar && (
          <MiniCalendar onPick={handleCommit} />
        )}

        <div className="mt-6 flex flex-wrap gap-3 font-hand text-lg text-ink/50">
          <button type="button" onClick={() => snoozeWish(wish.id, addWeeksISO(1))}>
            snooze · next week
          </button>
          <button type="button" onClick={() => snoozeWish(wish.id, addMonthsISO(1))}>
            · next month
          </button>
          <button type="button" onClick={() => snoozeWish(wish.id, addSeasonISO())}>
            · next season
          </button>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={onEdit}
            className="font-hand text-lg text-ink/45 hover:text-ink/65"
          >
            edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="font-hand text-lg text-ink/45 hover:text-stamp/70"
          >
            {deleteConfirm ? 'yes, tear it out' : 'tear this page out'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="font-hand text-lg text-ink/35"
          >
            close
          </button>
        </div>
      </div>
    </PaperSheet>
  )
}

function MiniCalendar({ onPick }: { onPick: (iso: string) => void }) {
  const today = new Date()
  const days: Date[] = []
  for (let i = 0; i < 28; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }

  return (
    <div
      className="mt-4 grid grid-cols-7 gap-1 rounded-sm border border-dashed border-ink/20 p-3"
      style={{ maxWidth: 280 }}
    >
      {days.map((d) => {
        const iso = d.toISOString().slice(0, 10)
        return (
          <button
            key={iso}
            type="button"
            onClick={() => onPick(iso)}
            className="font-hand text-sm text-ink/55 hover:bg-ochre/20 hover:text-ink"
          >
            {d.getDate()}
          </button>
        )
      })}
    </div>
  )
}
