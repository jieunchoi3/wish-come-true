import { categoryEmoji } from '../../constants/wishMeta'
import { formatImaginedAgo } from '../../lib/utils'
import type { ListItemView } from '../../types/database'
import { PolaroidFrame } from '../PolaroidFrame'
import { PaperSheet } from '../wishes/WishUi'
import { CommitAction } from './CommitAction'

interface ListItemDetailSheetProps {
  item: ListItemView
  whyThis?: string
  onClose: () => void
  backLabel?: string
}

export function ListItemDetailSheet({
  item,
  whyThis,
  onClose,
  backLabel = 'back to spontaneous suggestions',
}: ListItemDetailSheetProps) {
  const imaginedAgo = item.created_at
    ? formatImaginedAgo(new Date(item.created_at))
    : null

  return (
    <PaperSheet id={`pack-detail-${item.id}`} onClose={onClose}>
      <button
        type="button"
        onClick={onClose}
        className="mb-4 font-hand text-sm text-ink/40 underline decoration-dotted"
      >
        {backLabel}
      </button>

      {item.image_url && (
        <PolaroidFrame className="mb-4 w-40">
          <img
            src={item.image_url}
            alt=""
            className="polaroid-photo"
          />
        </PolaroidFrame>
      )}

      {!item.is_seeded && imaginedAgo && (
        <p className="font-hand text-xl text-ink/55">imagined {imaginedAgo}</p>
      )}

      <h2 className="mt-1 font-serif text-3xl font-medium text-ink">
        {item.title}
      </h2>

      {item.note && (
        <p className="mt-3 font-hand text-xl text-ink/70">{item.note}</p>
      )}

      {whyThis && (
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          {whyThis}
        </p>
      )}

      <p className="mt-4 font-hand text-lg text-ink/45">
        {categoryEmoji(item.category)} {item.category.replace(/_/g, ' ')}
        {item.time_needed ? ` · ${item.time_needed.replace(/_/g, ' ')}` : ''}
      </p>

      <div className="mt-5">
        <CommitAction item={item} rotation={-0.3} />
      </div>
    </PaperSheet>
  )
}
