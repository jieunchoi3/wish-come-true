import { categoryEmoji } from '../../constants/wishMeta'
import { formatImaginedAgo } from '../../lib/utils'
import type { Wish } from '../../types/supabase'
import { Scrap } from '../primitives'
import { PolaroidFrame } from '../PolaroidFrame'

interface WishCardProps {
  wish: Wish
  index: number
  onClick: () => void
  compact?: boolean
}

export function WishCard({ wish, index, onClick, compact = false }: WishCardProps) {
  const imaginedAgo = formatImaginedAgo(new Date(wish.created_at))

  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      <Scrap
        id={wish.id}
        index={index}
        tapePosition={index % 2 === 0 ? 'top-left' : 'top-right'}
        tornBottom={index % 3 === 1}
      >
        <div className="overflow-hidden px-7 py-6 pt-7">
          {wish.image_url && (
            <PolaroidFrame className={`float-left mr-3 mb-1 ${compact ? 'w-[72px]' : 'w-24'}`}>
              <img
                src={wish.image_url}
                alt=""
                className="h-full w-full object-cover"
              />
            </PolaroidFrame>
          )}
          <div className="min-w-0">
            <div className="mb-1 flex items-start justify-between gap-2">
              <span className="text-lg" aria-hidden>
                {categoryEmoji(wish.category)}
              </span>
              <span className="font-hand text-sm text-ink-muted">
                imagined {imaginedAgo}
              </span>
            </div>
            <h3 className="font-serif text-lg font-medium leading-snug text-ink">
              {wish.title}
            </h3>
            {wish.topic_tags.length > 0 && (
              <p className="mt-2 font-hand text-sm text-ink/45">
                {wish.topic_tags.join(' · ')}
              </p>
            )}
          </div>
        </div>
      </Scrap>
    </button>
  )
}
