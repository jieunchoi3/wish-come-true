import type { CSSProperties, ReactNode } from 'react'
import { CARD_GRAIN, PAPER_SHADOW } from '../../lib/utils'

interface PaperProps {
  children?: ReactNode
  className?: string
  fill?: string
  variant?: 'page' | 'card'
  tornBottom?: boolean
  style?: CSSProperties
}

const PAGE_FILL = '#FAF6EF'

export function Paper({
  children,
  className = '',
  fill,
  variant = 'card',
  tornBottom = false,
  style,
}: PaperProps) {
  const bg = fill ?? (variant === 'page' ? PAGE_FILL : '#FFFDF8')

  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{
        backgroundColor: bg,
        borderRadius: '2px',
        boxShadow: variant === 'card' ? PAPER_SHADOW : undefined,
        clipPath: tornBottom
          ? 'polygon(0% 0%, 100% 0%, 100% 96%, 98.5% 98.5%, 96% 96.5%, 93% 99%, 89% 97%, 85% 99.5%, 80% 96%, 75% 98%, 70% 97%, 65% 99%, 60% 96.5%, 55% 98.5%, 50% 97%, 45% 99%, 40% 96%, 35% 98%, 30% 97.5%, 25% 99%, 20% 96.5%, 15% 98%, 10% 97%, 5% 99.5%, 0% 96%)'
          : undefined,
        ...style,
      }}
    >
      {variant === 'card' && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[2px]"
          style={{
            backgroundImage: CARD_GRAIN,
            backgroundSize: '180px 180px',
            opacity: 0.04,
            mixBlendMode: 'multiply',
          }}
          aria-hidden
        />
      )}
      <div className="relative pointer-events-auto">{children}</div>
    </div>
  )
}

/** Full-page paper background with grain overlay */
export function PaperPage({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative min-h-screen ${className}`} style={{ backgroundColor: PAGE_FILL }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: CARD_GRAIN,
          backgroundSize: '180px 180px',
          opacity: 0.045,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  )
}
