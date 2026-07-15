import { useState } from 'react'
import type { ListItemView } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { PaperSheet, RubberStampButton } from '../wishes/WishUi'

interface ItemCompleteSheetProps {
  item: ListItemView
  onClose: () => void
}

export function ItemCompleteSheet({ item, onClose }: ItemCompleteSheetProps) {
  const { updateItem } = useLists()
  const [note, setNote] = useState('')
  const [stamping, setStamping] = useState(false)

  async function handleDone() {
    setStamping(true)
    const now = new Date().toISOString()
    await updateItem(
      item.id,
      {
        status: 'done',
        completed_at: now,
        completion_note: note.trim() || null,
      },
      false,
    )
    window.setTimeout(onClose, 400)
  }

  return (
    <PaperSheet id={`complete-${item.id}`}>
      <p className="font-hand text-xl text-ink/55">you did it.</p>
      <h2 className="mt-1 font-serif text-2xl text-ink">{item.title}</h2>
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
        <RubberStampButton label="done" rotation={-1} onClick={handleDone} />
      </div>
      <button type="button" onClick={onClose} className="mt-4 font-hand text-ink/40">
        not yet
      </button>
    </PaperSheet>
  )
}
