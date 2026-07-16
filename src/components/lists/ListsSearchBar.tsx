import { HAND_DRAWN_RADIUS } from '../../lib/utils'

interface ListsSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ListsSearchBar({
  value,
  onChange,
  placeholder = 'search lists & things…',
}: ListsSearchBarProps) {
  return (
    <div
      className="relative shrink-0 border border-ink/20 bg-transparent px-3 py-2"
      style={{ borderRadius: HAND_DRAWN_RADIUS }}
    >
      <label className="sr-only" htmlFor="lists-search">
        Search lists and things
      </label>
      <input
        id="lists-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full border-0 bg-transparent font-hand text-xl text-ink outline-none placeholder:text-ink/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-hand text-sm text-ink/40 underline decoration-dotted"
        >
          clear
        </button>
      )}
    </div>
  )
}
