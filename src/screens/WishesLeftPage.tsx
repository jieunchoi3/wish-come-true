import { Chip, HandDrawnLabel } from '../components/ScrapbookElements'
import {
  CATEGORY_META,
  COMPANY_OPTIONS,
  COST_OPTIONS,
  SEASON_OPTIONS,
  SETTING_OPTIONS,
  TIME_OPTIONS,
} from '../constants/wishMeta'
import { useWishes } from '../hooks/useWishes'
import type { WishSort } from '../lib/wishQueries'
import { RubberStampButton } from '../components/wishes/WishUi'
import { useWishesTab } from './wishesTabState'

export function WishesLeftPage() {
  const { wishes } = useWishes()
  const { filters, setFilters, openAdd } = useWishesTab()

  const active = wishes.filter((w) => w.status !== 'done')
  const doneCount = wishes.filter((w) => w.status === 'done').length

  function setSort(sort: WishSort) {
    setFilters({ ...filters, sort })
  }

  function toggleFilter(key: keyof typeof filters, value: string) {
    const current = filters[key]
    setFilters({
      ...filters,
      [key]: current === value ? undefined : value,
    })
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <h1
        className="font-hand text-2xl text-ink/75"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        everything I&apos;ve imagined
      </h1>
      <p className="mt-1 font-hand text-lg text-ink/50">
        {active.length} wishes · {doneCount} done
      </p>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-16">
        <HandDrawnLabel>category</HandDrawnLabel>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {CATEGORY_META.map((c, i) => (
            <Chip
              key={c.id}
              index={i}
              label={`${c.emoji}`}
              selected={filters.category === c.id}
              onClick={() => toggleFilter('category', c.id)}
            />
          ))}
        </div>

        <FilterRow
          label="time"
          options={TIME_OPTIONS}
          value={filters.time_needed}
          onToggle={(v) => toggleFilter('time_needed', v)}
          offset={10}
        />
        <FilterRow
          label="cost"
          options={COST_OPTIONS}
          value={filters.cost}
          onToggle={(v) => toggleFilter('cost', v)}
          offset={20}
        />
        <FilterRow
          label="company"
          options={COMPANY_OPTIONS}
          value={filters.company}
          onToggle={(v) => toggleFilter('company', v)}
          offset={30}
        />
        <FilterRow
          label="setting"
          options={SETTING_OPTIONS}
          value={filters.setting}
          onToggle={(v) => toggleFilter('setting', v)}
          offset={40}
        />

        <HandDrawnLabel>season</HandDrawnLabel>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {SEASON_OPTIONS.map((s, i) => (
            <Chip
              key={s}
              index={i + 50}
              label={s}
              selected={filters.season === s}
              onClick={() => toggleFilter('season', s)}
            />
          ))}
        </div>

        <HandDrawnLabel>sort</HandDrawnLabel>
        <div className="mb-4 flex flex-wrap gap-2">
          {(['newest', 'oldest', 'forgotten'] as WishSort[]).map((s, i) => (
            <Chip
              key={s}
              index={i + 60}
              label={s === 'forgotten' ? 'most forgotten' : s}
              selected={filters.sort === s}
              onClick={() => setSort(s)}
            />
          ))}
        </div>

        <HandDrawnLabel>find…</HandDrawnLabel>
        <div className="border-b border-ink/25">
          <input
            value={filters.search ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="w-full border-0 bg-transparent py-1 font-hand text-lg text-ink outline-none"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-0">
        <RubberStampButton label="add a wish" onClick={openAdd} rotation={-2} />
      </div>
    </div>
  )
}

function FilterRow({
  label,
  options,
  value,
  onToggle,
  offset,
}: {
  label: string
  options: { id: string; label: string }[]
  value?: string
  onToggle: (v: string) => void
  offset: number
}) {
  return (
    <div className="mb-2">
      <HandDrawnLabel>{label}</HandDrawnLabel>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {options.map((o, i) => (
          <Chip
            key={o.id}
            index={i + offset}
            label={o.label}
            selected={value === o.id}
            onClick={() => onToggle(o.id)}
          />
        ))}
      </div>
    </div>
  )
}
