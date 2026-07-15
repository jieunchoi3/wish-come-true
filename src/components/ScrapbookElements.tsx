import type { ReactNode } from 'react'
import { chipRotation, HAND_DRAWN_RADIUS, HIGHLIGHTER_SWEEP } from '../lib/utils'

interface DateStampProps {
  date: Date
  className?: string
}

export function DateStamp({ date, className = '' }: DateStampProps) {
  const formatted = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div
      className={`inline-block border-2 border-ink/20 px-3 py-1.5 font-hand text-lg text-ink/70 ${className}`}
      style={{ transform: 'rotate(-2deg)', borderRadius: HAND_DRAWN_RADIUS }}
    >
      {formatted}
    </div>
  )
}

interface WeatherStickerProps {
  temp: number
  condition: string
  sunset: string
}

export function WeatherSticker({ temp, condition, sunset }: WeatherStickerProps) {
  return (
    <div
      className="inline-flex items-center gap-2 border border-ink/15 bg-transparent px-3 py-1.5 text-sm text-ink-muted"
      style={{ transform: 'rotate(2.5deg)', borderRadius: HAND_DRAWN_RADIUS }}
    >
      <span className="text-base" aria-hidden>
        {condition === 'rain' ? '🌧️' : condition === 'cloud' ? '☁️' : '☀️'}
      </span>
      <span>{temp}°C</span>
      <span className="text-ink/25">·</span>
      <span className="font-hand text-base text-ink/60">sunset {sunset}</span>
    </div>
  )
}

interface ChipProps {
  label: string
  index: number
  selected?: boolean
  onClick?: () => void
}

export function Chip({ label, index, selected = false, onClick }: ChipProps) {
  const rotation = chipRotation(index, selected)

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative border border-ink/25 bg-transparent px-3.5 py-1.5 text-sm text-ink transition-all duration-200"
      style={{
        borderRadius: HAND_DRAWN_RADIUS,
        transform: `rotate(${rotation}deg)`,
        fontWeight: selected ? 600 : 400,
        color: selected ? '#2B2A27' : '#2B2A27',
        opacity: selected ? 1 : 0.75,
      }}
    >
      {selected && (
        <span
          className="pointer-events-none absolute inset-0 -left-1 -right-1"
          style={{
            backgroundImage: HIGHLIGHTER_SWEEP,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'skewX(-3deg) scaleY(1.3)',
            filter: 'blur(0.5px)',
            zIndex: 0,
          }}
          aria-hidden
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

interface HandDrawnLabelProps {
  children: ReactNode
}

export function HandDrawnLabel({ children }: HandDrawnLabelProps) {
  return (
    <p
      className="mb-2 font-hand text-lg text-ink/70"
      style={{ transform: 'rotate(-1deg)' }}
    >
      {children}
    </p>
  )
}

interface HandDrawnActionProps {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  rotation?: number
}

export function HandDrawnAction({
  label,
  variant = 'secondary',
  onClick,
  rotation = 0,
}: HandDrawnActionProps) {
  const base =
    'relative border bg-transparent px-4 py-2 text-sm transition-all duration-150'

  const variants = {
    primary:
      'border-ink/30 font-semibold text-ink',
    secondary:
      'border-ink/15 text-ink-muted',
    ghost:
      'border-transparent text-ink/40',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
      style={{
        borderRadius: HAND_DRAWN_RADIUS,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-0 -left-0.5 -right-0.5"
          style={{
            backgroundImage: HIGHLIGHTER_SWEEP,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: 'skewX(-2deg) scaleY(1.4)',
            filter: 'blur(0.5px)',
            zIndex: 0,
          }}
          aria-hidden
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}

interface RubberStampProps {
  date: string
  className?: string
}

export function RubberStamp({ date, className = '' }: RubberStampProps) {
  return (
    <div
      className={`pointer-events-none select-none font-hand text-2xl font-semibold tracking-wider text-stamp/35 ${className}`}
      style={{ transform: 'rotate(-12deg)' }}
      aria-hidden
    >
      DONE {date}
    </div>
  )
}

interface CollapsedChipsProps {
  timeLabel: string
  moodLabel: string | null
  onEdit: () => void
}

export function CollapsedChips({ timeLabel, moodLabel, onEdit }: CollapsedChipsProps) {
  const summary = moodLabel ? `${timeLabel} · ${moodLabel}` : timeLabel

  return (
    <button
      type="button"
      onClick={onEdit}
      className="group flex items-center gap-2 font-hand text-xl text-ink/65 transition hover:text-ink/85"
      style={{ transform: 'rotate(-0.5deg)' }}
    >
      <span>「 {summary} 」</span>
      <span
        className="text-base text-ink/40 transition group-hover:text-ink/60"
        aria-label="Edit time and mood"
      >
        ✎
      </span>
    </button>
  )
}
