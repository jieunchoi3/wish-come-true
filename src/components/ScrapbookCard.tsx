import type { ReactNode } from 'react'
import { cardRotation, tapeColorForId, type TapeColor } from '../lib/utils'

const tapeStyles: Record<TapeColor, string> = {
  sage: 'bg-sage/70',
  rose: 'bg-rose/70',
  ochre: 'bg-ochre/70',
}

interface ScrapbookCardProps {
  id: string
  children: ReactNode
  className?: string
  tape?: boolean
  tapePosition?: 'top-left' | 'top-right' | 'top-center'
}

export function ScrapbookCard({
  id,
  children,
  className = '',
  tape = true,
  tapePosition = 'top-center',
}: ScrapbookCardProps) {
  const rotation = cardRotation(id)
  const tapeColor = tapeColorForId(id)

  const tapePositionClass = {
    'top-left': 'left-4 -top-2 rotate-[-8deg]',
    'top-right': 'right-4 -top-2 rotate-[6deg]',
    'top-center': 'left-1/2 -translate-x-1/2 -top-2 rotate-[-2deg]',
  }[tapePosition]

  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {tape && (
        <div
          className={`absolute z-10 h-5 w-16 rounded-sm shadow-sm ${tapeStyles[tapeColor]} ${tapePositionClass}`}
          aria-hidden
        />
      )}
      <div className="relative rounded-sm bg-paper shadow-[2px_3px_12px_rgba(44,42,38,0.12),0_1px_3px_rgba(44,42,38,0.06)] ring-1 ring-paper-shadow/60">
        {children}
      </div>
    </div>
  )
}
