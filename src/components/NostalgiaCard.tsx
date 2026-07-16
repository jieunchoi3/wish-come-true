import { formatImaginedAgo } from '../lib/utils'
import type { ListItemView } from '../types/database'
import { Scrap } from './primitives'

interface NostalgiaCardProps {
  item: ListItemView
  onYes: () => void
  onNotNow: () => void
  onNeverMind: () => void
}

function NostalgiaAction({
  label,
  onClick,
  rotation = 0,
}: {
  label: string
  onClick: () => void
  rotation?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-hand text-sm text-ink/40 underline decoration-dotted decoration-ink/15 transition-colors hover:text-ink/65"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {label}
    </button>
  )
}

export function NostalgiaCard({
  item,
  onYes,
  onNotNow,
  onNeverMind,
}: NostalgiaCardProps) {
  const wantedAgo = formatImaginedAgo(new Date(item.created_at))

  return (
    <section className="mt-2 max-w-xs">
      <Scrap id={`nostalgia-${item.id}`} index={0} tapePosition="top-right" layout={false}>
        <div className="p-5 pt-6">
          <p className="font-hand text-lg text-ink/65">
            you wanted this {wantedAgo}. still?
          </p>
          <h3 className="mt-2 font-serif text-xl font-medium text-ink">{item.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <NostalgiaAction label="yes, let's" onClick={onYes} rotation={-0.3} />
            <NostalgiaAction label="not now" onClick={onNotNow} rotation={0.2} />
            <NostalgiaAction label="never mind" onClick={onNeverMind} rotation={-0.2} />
          </div>
        </div>
      </Scrap>
    </section>
  )
}
