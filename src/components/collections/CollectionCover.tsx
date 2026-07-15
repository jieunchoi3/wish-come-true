import { HIGHLIGHTER_SWEEP } from '../../lib/utils'
import type { Collection } from '../../types/supabase'
import { Scrap } from '../primitives'
import { ProgressRing } from './ProgressRing'

const COVER_ACCENTS: Record<string, string> = {
  'ink-slate': '#6B6560',
  'ochre-warm': '#D9A85F',
  'sage-mist': '#A8B5A2',
  'dusty-rose': '#D4A5A5',
  terracotta: '#C4846A',
  'honey-glow': '#E8C078',
}

interface CollectionCoverProps {
  collection: Collection
  ticked: number
  index: number
  selected?: boolean
  onClick: () => void
}

export function CollectionCover({
  collection,
  ticked,
  index,
  selected = false,
  onClick,
}: CollectionCoverProps) {
  const accent = COVER_ACCENTS[collection.cover_style] ?? '#A8B5A2'
  const progress = collection.item_count > 0 ? ticked / collection.item_count : 0

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left transition-opacity"
      style={{ opacity: selected ? 1 : 0.92 }}
    >
      <Scrap id={collection.slug} index={index} tape tapePosition="top-left">
        {selected && (
          <span
            className="pointer-events-none absolute inset-0 -left-1 -right-1 z-10"
            style={{
              backgroundImage: HIGHLIGHTER_SWEEP,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'skewX(-2deg) scaleY(1.2)',
              opacity: 0.7,
            }}
            aria-hidden
          />
        )}
        <div className="relative flex items-start gap-3 px-1 py-2">
          <span className="text-2xl leading-none" aria-hidden>
            {collection.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg leading-tight text-ink">
              {collection.title}
            </h3>
            <ProgressRing
              id={collection.slug}
              progress={progress}
              ticked={ticked}
              total={collection.item_count}
              accent={accent}
              size={48}
            />
          </div>
        </div>
      </Scrap>
    </button>
  )
}
