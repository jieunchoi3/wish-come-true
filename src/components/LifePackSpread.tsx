import { ScrapCollage } from './ScrapCollage'
import { Scrap } from './primitives'
import { PolaroidFrame } from './PolaroidFrame'

interface LifePackItemProps {
  id: string
  title: string
  category: string
  whyThis: string
  imaginedAgo?: string
  hasPolaroid?: boolean
  imageUrl?: string
  index: number
  tornBottom?: boolean
  compact?: boolean
}

const categoryEmoji: Record<string, string> = {
  taste: '🧀',
  watch_read: '🎬',
  go: '✈️',
  london: '🚇',
  make_learn: '🎨',
  micro_joys: '☁️',
  brave: '😰',
  people: '👥',
  someday: '🌠',
}

export function LifePackItemCard({
  id,
  title,
  category,
  whyThis,
  imaginedAgo,
  hasPolaroid = false,
  imageUrl,
  index,
  tornBottom = false,
  compact = false,
}: LifePackItemProps) {
  return (
    <Scrap
      id={id}
      index={index}
      tapePosition={index % 2 === 0 ? 'top-left' : 'top-right'}
      tornBottom={tornBottom}
    >
      <div
        className="overflow-hidden px-7 py-6 pt-7"
      >
        {hasPolaroid && (
          <PolaroidFrame
            placeholder={!imageUrl}
            className={`float-left mr-3 mb-1 ${compact ? 'w-[72px]' : 'w-20'}`}
          >
            {imageUrl && (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            )}
          </PolaroidFrame>
        )}
        <div className="min-w-0">
          <div className="mb-1 flex items-start justify-between gap-2">
            <span className={compact ? 'text-base' : 'text-lg'} aria-hidden>
              {categoryEmoji[category] ?? '✨'}
            </span>
            {imaginedAgo && (
              <span className="font-hand text-sm text-ink-muted">
                imagined {imaginedAgo}
              </span>
            )}
          </div>
          <h3
            className={`font-serif font-medium leading-snug text-ink ${
              compact ? 'text-base' : 'text-xl'
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 text-ink-muted ${
              compact ? 'text-xs leading-[1.5]' : 'text-[15px] leading-[1.65]'
            }`}
          >
            {whyThis}
          </p>
        </div>
      </div>
    </Scrap>
  )
}

interface LifePackSpreadProps {
  title: string
  moodLine: string
  items: Omit<LifePackItemProps, 'index' | 'tornBottom' | 'compact'>[]
  compact?: boolean
}

export function LifePackSpread({
  title,
  moodLine,
  items,
  compact = false,
}: LifePackSpreadProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className={`shrink-0 ${compact ? 'mb-2 space-y-0.5' : 'mb-3 space-y-1'}`}>
        <h2
          className={`font-serif font-medium text-ink ${
            compact ? 'text-lg leading-tight' : 'text-2xl'
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-ink-muted ${
            compact ? 'text-xs leading-[1.5]' : 'text-[15px] leading-[1.65]'
          }`}
        >
          {moodLine}
        </p>
      </div>

      <ScrapCollage className="min-h-0 flex-1">
        {items.map((item, index) => (
          <LifePackItemCard
            key={item.id}
            {...item}
            index={index}
            tornBottom={index === 1}
            compact={compact}
          />
        ))}
      </ScrapCollage>
    </section>
  )
}
