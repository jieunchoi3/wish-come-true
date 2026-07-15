import type { ReactNode } from 'react'
import {
  PAGE_CLIP_LEFT,
  PAGE_CLIP_RIGHT,
  PAGE_CLIP_SINGLE,
  PAGE_FILL,
  PAGE_GRAIN,
  getLoopPositions,
  HOLE_HEIGHT,
  HOLE_WIDTH,
} from '../../lib/binder'

export type BinderPageSide = 'left' | 'right' | 'single'

interface BinderPageProps {
  side: BinderPageSide
  children: ReactNode
  className?: string
}

function spineShadow(side: BinderPageSide): string | undefined {
  if (side === 'left') return 'inset -14px 0 24px -10px rgba(43,42,39,0.14)'
  if (side === 'right') return 'inset 14px 0 24px -10px rgba(43,42,39,0.14)'
  return 'inset 0 10px 20px -8px rgba(43,42,39,0.1)'
}

function pageClip(side: BinderPageSide): string {
  if (side === 'left') return PAGE_CLIP_LEFT
  if (side === 'right') return PAGE_CLIP_RIGHT
  return PAGE_CLIP_SINGLE
}

function holeSide(side: BinderPageSide): 'left' | 'right' | 'top' {
  if (side === 'left') return 'right'
  if (side === 'right') return 'left'
  return 'top'
}

export function BinderPage({ side, children, className = '' }: BinderPageProps) {
  const holesOn = holeSide(side)
  const loopPositions = getLoopPositions()

  return (
    <div className={`relative h-full min-h-0 flex-1 ${className}`}>
      {/* Stacked page slivers beneath */}
      {side !== 'single' && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: '#F5F0E6',
              clipPath: pageClip(side),
              transform:
                side === 'left' ? 'translate(-2px, 2px)' : 'translate(2px, 2px)',
              boxShadow: '1px 1px 2px rgba(43,42,39,0.06)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: '#F8F4EB',
              clipPath: pageClip(side),
              transform:
                side === 'left' ? 'translate(-1px, 1px)' : 'translate(1px, 1px)',
            }}
            aria-hidden
          />
        </>
      )}

      {/* Main page surface */}
      <div
        className="relative flex h-full min-h-0 flex-col overflow-hidden"
        style={{
          backgroundColor: PAGE_FILL,
          clipPath: pageClip(side),
          boxShadow: spineShadow(side),
        }}
      >
        {/* Paper grain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: PAGE_GRAIN,
            backgroundSize: '200px 200px',
            opacity: 0.05,
            mixBlendMode: 'multiply',
          }}
          aria-hidden
        />

        {/* Punched holes — dense twin-loop alignment */}
        {loopPositions.map((pos, i) => (
          <div
            key={i}
            className="pointer-events-none absolute z-10"
            style={{
              width: holesOn === 'top' ? HOLE_WIDTH : HOLE_WIDTH * 0.85,
              height: holesOn === 'top' ? HOLE_HEIGHT : HOLE_HEIGHT,
              borderRadius: '50%',
              background: 'rgba(43,42,39,0.2)',
              boxShadow:
                'inset 0 1px 2px rgba(43,42,39,0.38), inset 0 -1px 1px rgba(255,255,255,0.22)',
              ...(holesOn === 'right' && {
                right: 8,
                top: `${pos.pct}%`,
                transform: `translateY(calc(-50% + ${pos.jitterPx}px))`,
              }),
              ...(holesOn === 'left' && {
                left: 8,
                top: `${pos.pct}%`,
                transform: `translateY(calc(-50% + ${pos.jitterPx}px))`,
              }),
              ...(holesOn === 'top' && {
                left: `${pos.pct}%`,
                top: 16,
                transform: `translateX(calc(-50% + ${pos.jitterPx}px))`,
              }),
            }}
            aria-hidden
          />
        ))}

        {/* Page content — no scroll on desktop spread */}
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-6 py-5 lg:px-8 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}
