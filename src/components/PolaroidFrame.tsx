import type { ReactNode } from 'react'

interface PolaroidFrameProps {
  children?: ReactNode
  caption?: string
  className?: string
  placeholder?: boolean
}

/** Thick white border, thicker at the bottom — the completion/memory aesthetic */
export function PolaroidFrame({
  children,
  caption,
  className = '',
  placeholder = false,
}: PolaroidFrameProps) {
  return (
    <div
      className={`inline-block bg-white p-2 pb-8 shadow-[1px_2px_8px_rgba(44,42,38,0.15)] ${className}`}
    >
      <div
        className={`flex aspect-[4/5] w-full min-w-[120px] items-center justify-center overflow-hidden bg-paper-shadow/40 ${
          placeholder ? 'bg-gradient-to-br from-sage/20 to-rose/20' : ''
        }`}
      >
        {placeholder ? (
          <span className="font-hand text-2xl text-ink/25">a moment</span>
        ) : (
          children
        )}
      </div>
      {caption && (
        <p className="mt-2 text-center font-hand text-lg text-ink/60">{caption}</p>
      )}
    </div>
  )
}
