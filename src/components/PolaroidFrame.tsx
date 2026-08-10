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
    <div className="relative min-w-0 max-w-full">
      <div
        className={`block w-full overflow-hidden bg-white p-2 pb-8 shadow-[1px_2px_8px_rgba(44,42,38,0.15)] ${className}`}
      >
        <div
          className={`relative aspect-[4/5] w-full min-w-0 overflow-hidden bg-paper-shadow/40 ${
            placeholder
              ? 'bg-gradient-to-br from-sage/20 to-rose/20'
              : ''
          }`}
        >
          {placeholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-hand text-2xl text-ink/25">a moment</span>
            </div>
          ) : (
            <div className="absolute inset-0 min-h-0 min-w-0 [&>*]:h-full [&>*]:min-h-0 [&>*]:w-full [&>*]:min-w-0">
              {children}
            </div>
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
