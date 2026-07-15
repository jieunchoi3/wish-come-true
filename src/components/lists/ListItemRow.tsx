import { useState } from 'react'
import type { ListItemView } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { formatImaginedAgo } from '../../lib/utils'
import { RubberStampButton } from '../wishes/WishUi'
import { ItemCompleteSheet } from './ItemCompleteSheet'

interface ListItemRowProps {
  item: ListItemView
}

export function ListItemRow({ item }: ListItemRowProps) {
  const { markDoneQuick } = useLists()
  const [completing, setCompleting] = useState(false)

  const isDone = item.status === 'done'
  const opacity = isDone ? 0.55 : 1
  const showAddedAgo = !item.is_seeded && !isDone

  async function handleDidIt() {
    if (item.is_seeded) {
      await markDoneQuick(item)
      return
    }
    setCompleting(true)
  }

  return (
    <>
      <li
        className="flex items-start justify-between gap-2 border-b border-ink/8 py-2"
        style={{ opacity }}
      >
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base leading-snug text-ink">{item.title}</p>
          {item.note && (
            <p className="font-hand text-sm text-ink/50">{item.note}</p>
          )}
          {showAddedAgo && (
            <p className="font-hand text-xs text-ink/40">
              added {formatImaginedAgo(new Date(item.created_at))}
            </p>
          )}
        </div>
        {!isDone && (
          <RubberStampButton
            label="did it"
            onClick={() => void handleDidIt()}
            rotation={-2}
          />
        )}
        {isDone && (
          <span
            className="shrink-0 border border-stamp/25 px-1.5 py-0.5 font-hand text-xs text-stamp/75"
            style={{ transform: 'rotate(-3deg)' }}
            aria-label="done"
          >
            done
          </span>
        )}
      </li>
      {completing && (
        <ItemCompleteSheet
          item={item}
          onClose={() => setCompleting(false)}
        />
      )}
    </>
  )
}
