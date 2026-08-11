import type { ReactNode } from 'react'

interface PolaroidFrameProps {
  children?: ReactNode
  caption?: string
  className?: string
  placeholder?: boolean
  /** Rendered on the white frame — outside the clipped photo window */
  overlay?: ReactNode
}

/** Thick white border, thicker at the bottom — the completion/memory aesthetic */
export function PolaroidFrame({
  children,
  caption,
  className = '',
  placeholder = false,
  overlay,
}: PolaroidFrameProps) {
  return (
    <div className="polaroid-root relative min-w-0 max-w-full">
      <div className={`polaroid-shell ${className}`}>
        <div
          className={`polaroid-window bg-paper-shadow/40 ${
            placeholder ? 'bg-gradient-to-br from-sage/20 to-rose/20' : ''
          }`}
        >
          {placeholder ? (
            <div className="polaroid-photo-fill flex items-center justify-center">
              <span className="font-hand text-2xl text-ink/25">a moment</span>
            </div>
          ) : (
            <div className="polaroid-photo-fill">{children}</div>
          )}
        </div>
        {caption && (
          <p className="mt-2 text-center font-hand text-lg text-ink/60">{caption}</p>
        )}
      </div>
      {overlay}
    </div>
  )
}
