import type { ReactNode } from 'react'

interface ScrapCollageProps {
  children: ReactNode
  className?: string
}

/**
 * Collage container — cards overlap on edges only (max 14px via Scrap layout).
 * Content padding inside each Scrap is protected (min 28px).
 */
export function ScrapCollage({ children, className = '' }: ScrapCollageProps) {
  return (
    <div className={`relative ${className}`} style={{ isolation: 'isolate' }}>
      {children}
    </div>
  )
}
