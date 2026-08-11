import { useEffect, useRef, useState } from 'react'
import { Chip, HandDrawnLabel } from '../ScrapbookElements'
import {
  CATEGORY_META,
  COMPANY_OPTIONS,
  COST_OPTIONS,
  DEFAULT_WISH_TAGS,
  SEASON_OPTIONS,
  SETTING_OPTIONS,
  TIME_OPTIONS,
} from '../../constants/wishMeta'
import type { WishCategory } from '../../types/database'
import { uploadWishImage } from '../../lib/wishStorage'
import { supabase } from '../../lib/supabase'
import type { Wish } from '../../types/supabase'
import type { CreateWishInput } from '../../hooks/useWishes'
import { useWishes } from '../../hooks/useWishes'
import { PolaroidFrame } from '../PolaroidFrame'
import { HandwrittenError, PaperSheet, RubberStampButton } from './WishUi'

interface WishFormSheetProps {
  wish?: Wish | null
  existingTags: string[]
  onClose: () => void
  onSaved: () => void
}

export function WishFormSheet({
  wish,
  existingTags,
  onClose,
  onSaved,
}: WishFormSheetProps) {
  const { createWish, updateWish } = useWishes()
  const titleRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(wish?.title ?? '')
  const [note, setNote] = useState(wish?.note ?? '')
  const [category, setCategory] = useState<WishCategory>(
    wish?.category ?? 'micro_joys',
  )
  const [timeNeeded, setTimeNeeded] = useState(
    wish?.time_needed ?? DEFAULT_WISH_TAGS.time_needed,
  )
  const [cost, setCost] = useState(wish?.cost ?? DEFAULT_WISH_TAGS.cost)
  const [company, setCompany] = useState(wish?.company ?? DEFAULT_WISH_TAGS.company)
  const [setting, setSetting] = useState(wish?.setting ?? DEFAULT_WISH_TAGS.setting)
  const [seasons, setSeasons] = useState<string[]>(wish?.seasons ?? [])
  const [topicInput, setTopicInput] = useState(wish?.topic_tags.join(', ') ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(wish?.image_url ?? null)
  const [developing, setDeveloping] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [titleError, setTitleError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const topicTags = topicInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const suggestions = existingTags
    .filter((t) => !topicTags.includes(t))
    .filter((t) =>
      topicInput.length === 0
        ? true
        : t.toLowerCase().includes(topicInput.split(',').pop()?.trim().toLowerCase() ?? ''),
    )
    .slice(0, 5)

  function handleImage(file: File) {
    setImageFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setDeveloping(true)
    window.setTimeout(() => setDeveloping(false), 1200)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) handleImage(file)
  }

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('needs a title')
      return
    }
    setTitleError(null)
    setSaving(true)

    const input: CreateWishInput = {
      title: title.trim(),
      note: note.trim() || null,
      category,
      time_needed: timeNeeded,
      cost,
      company,
      setting,
      seasons,
      topic_tags: topicTags,
    }

    try {
      if (wish) {
        let imageUrl = wish.image_url
        if (imageFile && supabase) {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user) {
            imageUrl = await uploadWishImage(user.id, wish.id, imageFile, setUploadPct)
          }
        }
        await updateWish(wish.id, { ...input, image_url: imageUrl })
      } else {
        const created = await createWish(input)
        if (created && imageFile && supabase) {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user) {
            const imageUrl = await uploadWishImage(
              user.id,
              created.id,
              imageFile,
              setUploadPct,
            )
            await updateWish(created.id, { image_url: imageUrl })
          }
        }
      }
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  function toggleSeason(s: string) {
    setSeasons((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )
  }

  return (
    <PaperSheet id={wish ? `edit-${wish.id}` : 'add-wish'}>
      <label className="block">
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-0 border-b border-ink/30 bg-transparent py-2 font-hand text-3xl text-ink outline-none"
          placeholder=""
        />
        {titleError && <HandwrittenError message={titleError} />}
      </label>

      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border-b border-ink/15" />
        ))}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full resize-none border-0 bg-transparent font-hand text-xl text-ink/80 outline-none"
          placeholder=""
        />
      </div>

      <div className="mt-6">
        <HandDrawnLabel>category</HandDrawnLabel>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_META.map((c, i) => (
            <Chip
              key={c.id}
              index={i}
              label={`${c.emoji} ${c.label}`}
              selected={category === c.id}
              onClick={() => setCategory(c.id)}
            />
          ))}
        </div>
      </div>

      <TagRow label="time" options={TIME_OPTIONS} value={timeNeeded} onChange={setTimeNeeded} offset={20} />
      <TagRow label="cost" options={COST_OPTIONS} value={cost} onChange={setCost} offset={30} />
      <TagRow label="company" options={COMPANY_OPTIONS} value={company} onChange={setCompany} offset={40} />
      <TagRow label="setting" options={SETTING_OPTIONS} value={setting} onChange={setSetting} offset={50} />

      <div className="mt-4">
        <HandDrawnLabel>seasons</HandDrawnLabel>
        <div className="flex flex-wrap gap-2">
          {SEASON_OPTIONS.map((s, i) => (
            <Chip
              key={s}
              index={i + 60}
              label={s}
              selected={seasons.includes(s)}
              onClick={() => toggleSeason(s)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <HandDrawnLabel>topic tags</HandDrawnLabel>
        <input
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          className="w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-lg text-ink outline-none"
        />
        {suggestions.length > 0 && (
          <p className="mt-1 font-hand text-sm text-ink/40">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="mr-2 hover:text-ink/60"
                onClick={() =>
                  setTopicInput((prev) =>
                    prev.trim() ? `${prev}, ${s}` : s,
                  )
                }
              >
                {s}
              </button>
            ))}
          </p>
        )}
      </div>

      <div
        className="mt-6"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label className="cursor-pointer">
          <PolaroidFrame className="w-32">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="polaroid-photo transition-opacity duration-[1200ms]"
                style={{ opacity: developing ? 0.25 : 1 }}
              />
            ) : (
              <span className="font-hand text-lg text-ink/30">drop a photo</span>
            )}
          </PolaroidFrame>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleImage(f)
            }}
          />
        </label>
        {uploadPct > 0 && uploadPct < 1 && (
          <div className="mt-2 h-0.5 w-32 bg-ink/10">
            <div
              className="h-full bg-ink/40 transition-all"
              style={{ width: `${uploadPct * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <RubberStampButton
          label={wish ? 'save it' : 'add it'}
          onClick={handleSave}
          disabled={saving}
        />
        <button
          type="button"
          onClick={onClose}
          className="font-hand text-lg text-ink/40 hover:text-ink/60"
        >
          never mind
        </button>
      </div>
    </PaperSheet>
  )
}

function TagRow<T extends string>({
  label,
  options,
  value,
  onChange,
  offset,
}: {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
  offset: number
}) {
  return (
    <div className="mt-3">
      <HandDrawnLabel>{label}</HandDrawnLabel>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <Chip
            key={o.id}
            index={i + offset}
            label={o.label}
            selected={value === o.id}
            onClick={() => onChange(o.id)}
          />
        ))}
      </div>
    </div>
  )
}
