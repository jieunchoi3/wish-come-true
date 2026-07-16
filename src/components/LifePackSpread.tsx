import { COMPLETION_ACTION_LABEL } from '../constants/completion'
import { ScrapCollage } from './ScrapCollage'
import { Scrap } from './primitives'
import { PolaroidFrame } from './PolaroidFrame'
import { RubberStampButton } from './wishes/WishUi'
import type { PackCardAnim } from '../hooks/useTodayPack'

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
  isSeeded?: boolean
  animState?: PackCardAnim | null
  onDoneIt?: () => void
  onNotToday?: () => void
  onTellMore?: () => void
  committed?: boolean
  onToggleCommit?: () => void
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

const animClass: Record<PackCardAnim, string> = {
  commit: 'pack-card-commit',
  dismiss: 'pack-card-dismiss',
  enter: 'pack-card-enter',
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
  isSeeded: _isSeeded = false,
  animState = null,
  onDoneIt,
  onNotToday,
  onTellMore,
  committed = false,
  onToggleCommit,
}: LifePackItemProps) {
  const animationClass = animState ? animClass[animState] : ''

  return (
    <div className={animationClass}>
      <Scrap
        id={id}
        index={index}
        tapePosition={index % 2 === 0 ? 'top-left' : 'top-right'}
        tornBottom={tornBottom}
      >
        <div className="overflow-hidden px-7 py-6 pt-7">
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

          <div className="pack-card-actions mt-4">
            <div className="pack-card-actions-row">
              <RubberStampButton
                label={COMPLETION_ACTION_LABEL}
                onClick={() => onDoneIt?.()}
                rotation={-2}
              />
              <button
                type="button"
                onClick={() => onNotToday?.()}
                className="pack-action-secondary"
                style={{ transform: 'rotate(0.15deg)' }}
              >
                not today
              </button>
              <button
                type="button"
                onClick={() => onTellMore?.()}
                className="pack-action-tertiary"
                style={{ transform: 'rotate(-0.2deg)' }}
              >
                tell me more
              </button>
            </div>
            {onToggleCommit && (
              <div className="pack-action-commit-row">
                <button
                  type="button"
                  onClick={() => onToggleCommit()}
                  className="pack-action-month"
                  style={{ transform: 'rotate(0.1deg)' }}
                >
                  <span className="pack-action-month-mark" aria-hidden>
                    ◆
                  </span>
                  {committed ? 'remove from this month' : 'add to this month'}
                </button>
              </div>
            )}
          </div>
        </div>
      </Scrap>
    </div>
  )
}

interface LifePackSpreadProps {
  title: string
  moodLine: string
  items: Omit<
    LifePackItemProps,
    'index' | 'tornBottom' | 'compact' | 'animState'
  >[]
  compact?: boolean
  animMap?: Map<string, PackCardAnim>
}

export function LifePackSpread({
  title,
  moodLine,
  items,
  compact = false,
  animMap,
}: LifePackSpreadProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div
        className={`shrink-0 ${
          compact ? 'mb-5 space-y-1 pb-1' : 'mb-4 space-y-1'
        }`}
      >
        {title ? (
          <h2
            className={`font-serif font-medium text-ink ${
              compact ? 'text-lg leading-tight' : 'text-2xl'
            }`}
          >
            {title}
          </h2>
        ) : null}
        <p
          className={`text-ink-muted ${
            compact ? 'text-xs leading-[1.5]' : 'text-[15px] leading-[1.65]'
          }`}
        >
          {moodLine}
        </p>
      </div>

      <ScrapCollage
        className={`min-h-0 flex-1 ${compact ? 'pt-4' : 'pt-3'}`}
      >
        {items.map((item, index) => (
          <LifePackItemCard
            key={item.id}
            {...item}
            index={index}
            tornBottom={index === 1}
            compact={compact}
            animState={animMap?.get(item.id) ?? null}
          />
        ))}
      </ScrapCollage>
    </section>
  )
}
