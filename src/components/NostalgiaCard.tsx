import { formatImaginedAgo } from '../lib/utils'
import type { ListItemView } from '../types/database'
import { HandDrawnAction } from './ScrapbookElements'
import { Scrap } from './primitives'

interface NostalgiaCardProps {
  item: ListItemView
  onYes: () => void
  onNotNow: () => void
  onNeverMind: () => void
}

export function NostalgiaCard({
  item,
  onYes,
  onNotNow,
  onNeverMind,
}: NostalgiaCardProps) {
  const addedAgo = formatImaginedAgo(new Date(item.created_at))
  const addedDate = new Date(item.created_at).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <section className="mt-4 space-y-2">
      <h2
        className="font-hand text-xl text-ink/80"
        style={{ transform: 'rotate(-1deg)' }}
      >
        from the back of the drawer
      </h2>

      <Scrap id={`nostalgia-${item.id}`} index={0} tapePosition="top-right" layout={false}>
        <div className="p-5 pt-6">
          <p className="font-serif text-base italic text-ink-muted">
            You added this {addedAgo}. Still?
          </p>
          <h3 className="mt-2 font-serif text-xl font-medium text-ink">{item.title}</h3>
          <p className="mt-1 font-hand text-lg text-ink/60">added {addedDate}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <HandDrawnAction label="Yes, let's" variant="primary" rotation={-1} onClick={onYes} />
            <HandDrawnAction label="Not now" variant="secondary" rotation={1.5} onClick={onNotNow} />
            <HandDrawnAction label="Never mind" variant="ghost" rotation={-0.5} onClick={onNeverMind} />
          </div>
        </div>
      </Scrap>
    </section>
  )
}
