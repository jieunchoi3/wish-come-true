import { useEffect, useRef, useState } from 'react'
import { Chip, HandDrawnLabel } from '../ScrapbookElements'
import {
  CATEGORY_META,
  DEFAULT_WISH_TAGS,
} from '../../constants/wishMeta'
import type { WishCategory } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { PaperSheet, RubberStampButton, HandwrittenError } from '../wishes/WishUi'

interface ItemFormSheetProps {
  listId: string
  onClose: () => void
  onSaved: () => void
}

export function ItemFormSheet({ listId, onClose, onSaved }: ItemFormSheetProps) {
  const { createItem } = useLists()
  const titleRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState<WishCategory>('micro_joys')
  const [titleError, setTitleError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const topicTagsList: string[] = []

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('needs a title')
      return
    }
    setSaving(true)
    const result = await createItem({
      list_id: listId,
      title: title.trim(),
      note: note.trim() || null,
      category,
      time_needed: DEFAULT_WISH_TAGS.time_needed,
      cost: DEFAULT_WISH_TAGS.cost,
      company: DEFAULT_WISH_TAGS.company,
      setting: DEFAULT_WISH_TAGS.setting,
      seasons: [],
      topic_tags: topicTagsList,
    })
    setSaving(false)
    if (result) onSaved()
  }

  return (
    <PaperSheet id={`add-item-${listId}`}>
      <input
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border-0 border-b border-ink/30 bg-transparent py-2 font-hand text-2xl text-ink outline-none"
      />
      {titleError && <HandwrittenError message={titleError} />}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="mt-3 w-full resize-none border-0 bg-transparent font-hand text-lg text-ink/80 outline-none"
      />
      <div className="mt-4">
        <HandDrawnLabel>category</HandDrawnLabel>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_META.map((c, i) => (
            <Chip
              key={c.id}
              index={i}
              label={`${c.emoji}`}
              selected={category === c.id}
              onClick={() => setCategory(c.id)}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <RubberStampButton label="add it" onClick={handleSave} disabled={saving} />
        <button type="button" onClick={onClose} className="font-hand text-ink/40">
          never mind
        </button>
      </div>
    </PaperSheet>
  )
}
