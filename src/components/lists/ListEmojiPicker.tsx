import { useState } from 'react'
import {
  DEFAULT_LIST_EMOJI,
  LIST_EMOJI_OPTIONS,
} from '../../constants/listEmojis'
import { chipRotation } from '../../lib/utils'

interface ListEmojiPickerProps {
  value: string
  onChange: (emoji: string) => void
}

function firstGrapheme(text: string): string {
  const chars = [...text]
  return chars[0] ?? ''
}

function EmojiTile({
  emoji,
  index,
  selected,
  onSelect,
}: {
  emoji: string
  index: number
  selected: boolean
  onSelect: () => void
}) {
  const rotation = chipRotation(index, false)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`pick ${emoji}`}
      aria-pressed={selected}
      className={`relative flex h-10 w-10 items-center justify-center bg-paper text-xl transition-all hover:opacity-90 ${
        selected
          ? 'border-2 border-yellow-500'
          : 'border border-ink/20'
      }`}
      style={{
        borderRadius: 2,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <span className="relative z-10" aria-hidden>
        {emoji}
      </span>
    </button>
  )
}

export function ListEmojiPicker({ value, onChange }: ListEmojiPickerProps) {
  const curatedValues = LIST_EMOJI_OPTIONS as readonly string[]
  const [showCustom, setShowCustom] = useState(() => !curatedValues.includes(value))
  const curatedSelected = curatedValues.includes(value)

  function pickCurated(emoji: string) {
    onChange(emoji)
    setShowCustom(false)
  }

  function handleCustomInput(raw: string) {
    const next = firstGrapheme(raw)
    if (next) onChange(next)
  }

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap gap-2"
        role="listbox"
        aria-label="pick a list emoji"
      >
        {LIST_EMOJI_OPTIONS.map((emoji, index) => (
          <EmojiTile
            key={emoji}
            emoji={emoji}
            index={index}
            selected={!showCustom && value === emoji}
            onSelect={() => pickCurated(emoji)}
          />
        ))}
      </div>

      {!showCustom ? (
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="font-hand text-sm text-ink/45 underline decoration-dotted hover:text-ink/65"
        >
          something else?
        </button>
      ) : (
        <label className="block">
          <span className="font-hand text-sm text-ink/45">your own emoji</span>
          <input
            type="text"
            inputMode="text"
            value={curatedSelected ? '' : value}
            placeholder={DEFAULT_LIST_EMOJI}
            onChange={(e) => handleCustomInput(e.target.value)}
            className="mt-1 w-14 border-0 border-b border-ink/25 bg-transparent py-1 text-center text-2xl outline-none"
            autoFocus
          />
        </label>
      )}
    </div>
  )
}
