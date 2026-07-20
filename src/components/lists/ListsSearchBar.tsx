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
    <div className="lists-search-bar group relative shrink-0">
      <label className="sr-only" htmlFor="lists-search">
        Search lists and things
      </label>
      <span
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-hand text-xl text-ink/25 transition-colors group-focus-within:text-ochre-deep/50"
        aria-hidden
      >
        ⌕
      </span>
      <input
        id="lists-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full border-0 bg-transparent py-2.5 pl-10 pr-10 font-hand text-lg text-ink outline-none placeholder:text-ink/28"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full font-hand text-sm text-ink/45 transition hover:bg-ink/5 hover:text-ink/70"
          aria-label="clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}
