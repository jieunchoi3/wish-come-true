import type { ReactNode } from 'react'
import { Scrap } from '../primitives'

interface PaperSheetProps {
  id: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

/** Slide-in paper sheet — not a modal */
export function PaperSheet({ id, children, className = '' }: PaperSheetProps) {
  return (
    <div className={`paper-sheet absolute inset-0 z-40 overflow-y-auto ${className}`}>
      <Scrap id={id} index={0} layout={false} tapePosition="top-center" className="mx-2 my-2 min-h-full">
        <div className="px-7 py-8">{children}</div>
      </Scrap>
    </div>
  )
}

interface RubberStampButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  rotation?: number
}

export function RubberStampButton({
  label,
  onClick,
  disabled,
  rotation = -2,
}: RubberStampButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border-2 border-stamp/40 px-4 py-2 font-hand text-xl text-stamp/70 transition hover:border-stamp/60 hover:text-stamp disabled:opacity-40"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {label}
    </button>
  )
}

interface HandwrittenErrorProps {
  message: string
}

export function HandwrittenError({ message }: HandwrittenErrorProps) {
  return (
    <p className="font-hand text-base text-rose-deep">{message}</p>
  )
}
