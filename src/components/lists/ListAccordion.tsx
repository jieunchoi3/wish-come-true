import { useState } from 'react'
import type { ListWithCounts } from '../../types/database'
import { ProgressRing } from '../collections/ProgressRing'
import { Scrap } from '../primitives'
import { ListItemRow } from './ListItemRow'
import { ItemFormSheet } from './ItemFormSheet'
import { useLists } from '../../hooks/useLists'

interface ListAccordionProps {
  list: ListWithCounts
  defaultOpen?: boolean
}

export function ListAccordion({ list, defaultOpen = false }: ListAccordionProps) {
  const { itemsForList } = useLists()
  const [open, setOpen] = useState(defaultOpen)
  const [adding, setAdding] = useState(false)

  const items = itemsForList(list.id)
  const progress = list.totalCount > 0 ? list.doneCount / list.totalCount : 0

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="block w-full text-left"
      >
        <Scrap id={list.id} index={0} tape tapePosition="top-left" layout={false}>
          <div className="flex items-center gap-3 px-2 py-3">
            <span className="text-2xl" aria-hidden>
              {list.emoji ?? '📋'}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg text-ink">{list.title}</h3>
              <p className="font-hand text-sm text-ink/50">
                {list.doneCount} / {list.totalCount} done
              </p>
            </div>
            <ProgressRing
              id={list.id}
              progress={progress}
              ticked={list.doneCount}
              total={list.totalCount}
              size={44}
            />
          </div>
        </Scrap>
      </button>

      {open && (
        <div className="mt-1 max-h-[min(50vh,400px)] overflow-y-auto pl-2">
          <ul className="space-y-1 pb-2">
            {items.map((item) => (
              <ListItemRow key={item.id} item={item} />
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="font-hand text-base text-ink/55 underline decoration-dotted"
          >
            ＋ add something
          </button>
          {adding && (
            <ItemFormSheet
              listId={list.id}
              onClose={() => setAdding(false)}
              onSaved={() => setAdding(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
