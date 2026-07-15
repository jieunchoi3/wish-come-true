import { useMemo, useState } from 'react'
import type { Collection, CollectionItem } from '../../types/supabase'
import type { CollectionGesture } from '../../types/database'
import { matchesGestureFilter, type GestureFilter } from '../../lib/collectionQueries'
import { useCollections } from '../../hooks/useCollections'
import { GestureToggle } from './ModeToggle'

interface BrowseListProps {
  collection: Collection
  items: CollectionItem[]
  groupByContinent?: boolean
}

function gestureOpacity(gesture: CollectionGesture | null): number {
  if (gesture === 'ticked') return 0.55
  if (gesture === 'skipped') return 0.35
  return 1
}

function GestureMark({ gesture }: { gesture: CollectionGesture | null }) {
  if (gesture === 'ticked') {
    return (
      <span className="font-hand text-sage-deep" aria-label="done">
        ✓
      </span>
    )
  }
  if (gesture === 'starred') {
    return (
      <span className="text-ochre" aria-label="starred">
        ⭐
      </span>
    )
  }
  return null
}

export function BrowseList({
  collection,
  items,
  groupByContinent = false,
}: BrowseListProps) {
  const { getGesture, applyGesture, removeGesture } = useCollections()
  const [filter, setFilter] = useState<GestureFilter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmUnstarId, setConfirmUnstarId] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        matchesGestureFilter(getGesture(item.id), filter),
      ),
    [items, filter, getGesture],
  )

  const grouped = useMemo(() => {
    if (!groupByContinent) return [{ heading: null as string | null, items: filtered }]
    const map = new Map<string, CollectionItem[]>()
    for (const item of filtered) {
      const continent =
        (item.meta as { continent?: string })?.continent ?? 'Other'
      const list = map.get(continent) ?? []
      list.push(item)
      map.set(continent, list)
    }
    return [...map.entries()].map(([heading, groupItems]) => ({
      heading,
      items: groupItems,
    }))
  }, [filtered, groupByContinent])

  const filters: { id: GestureFilter; label: string }[] = [
    { id: 'all', label: 'all' },
    { id: 'undecided', label: 'not yet decided' },
    { id: 'ticked', label: 'ticked' },
    { id: 'starred', label: 'starred' },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className="font-hand text-sm px-2 py-0.5"
            style={{
              opacity: filter === f.id ? 1 : 0.5,
              fontWeight: filter === f.id ? 600 : 400,
              textDecoration: filter === f.id ? 'underline' : 'none',
              textDecorationColor: 'rgba(217,168,95,0.5)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-8">
        {grouped.map(({ heading, items: groupItems }) => (
          <div key={heading ?? 'all'}>
            {heading && (
              <h3
                className="sticky top-0 z-[1] bg-paper/90 py-2 font-hand text-lg text-ink/60"
                style={{ transform: 'rotate(-0.3deg)' }}
              >
                {heading}
              </h3>
            )}
            <ul className="space-y-2">
              {groupItems.map((item) => {
                const gesture = getGesture(item.id)
                const expanded = expandedId === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedId(expanded ? null : item.id)
                        setConfirmUnstarId(null)
                      }}
                      className="flex w-full items-start gap-2 border-b border-ink/8 py-2 text-left transition-opacity"
                      style={{ opacity: gestureOpacity(gesture) }}
                    >
                      <GestureMark gesture={gesture} />
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-base leading-snug text-ink">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="font-hand text-sm text-ink/50">
                            {item.subtitle}
                          </p>
                        )}
                        {gesture === 'starred' && (
                          <p className="font-hand text-xs text-ochre-deep/80">
                            in your wishes
                          </p>
                        )}
                      </div>
                    </button>
                    {expanded && (
                      <div className="pb-2 pl-6">
                        <GestureToggle
                          current={gesture}
                          confirmUnstar={confirmUnstarId === item.id}
                          onSelect={async (g) => {
                            if (gesture === 'starred' && confirmUnstarId !== item.id) {
                              setConfirmUnstarId(item.id)
                              return
                            }
                            await applyGesture(item, collection, g)
                            setExpandedId(null)
                            setConfirmUnstarId(null)
                          }}
                          onClear={async () => {
                            if (gesture === 'starred' && confirmUnstarId !== item.id) {
                              setConfirmUnstarId(item.id)
                              return
                            }
                            await removeGesture(item.id)
                            setExpandedId(null)
                            setConfirmUnstarId(null)
                          }}
                        />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
