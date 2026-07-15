import type { ReactNode } from 'react'
import { DESK_COLOR, PAGE_GRAIN } from '../../lib/binder'

interface DeskSurfaceProps {
  children: ReactNode
  className?: string
}

/** Warm desk — linen grain, top-down */
export function DeskSurface({ children, className = '' }: DeskSurfaceProps) {
  return (
    <div
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden p-6 ${className}`}
      style={{ backgroundColor: DESK_COLOR }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: PAGE_GRAIN,
          backgroundSize: '220px 220px',
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
      {children}
    </div>
  )
}
