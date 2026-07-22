import { useEffect, useRef, type ReactNode } from 'react'
import { Scrap } from '../primitives'

interface PaperSheetProps {
  id: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

/** Slide-in paper sheet — overlays its positioned parent, not page chrome above it */
export function PaperSheet({ id, children, onClose, className = '' }: PaperSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onClose) return
    const close = onClose

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className={`paper-sheet absolute inset-0 z-40 flex min-h-0 flex-col ${className}`}
      role="dialog"
      aria-modal="true"
    >
      {onClose && (
        <button
          type="button"
          className="paper-sheet-backdrop absolute inset-0 cursor-default border-0 bg-desk/20 p-0"
          aria-label="Close"
          tabIndex={-1}
          onClick={onClose}
        />
      )}
      <div
        ref={panelRef}
        className="paper-sheet-panel relative z-10 min-h-0 flex-1 overflow-y-auto"
      >
        <Scrap
          id={id}
          index={0}
          layout={false}
          tapePosition="top-center"
          className="mx-2 my-2 min-h-full"
        >
          <div className="px-7 py-8">{children}</div>
        </Scrap>
      </div>
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
      className="rubber-stamp-btn shrink-0"
      style={{ ['--stamp-rotate' as string]: `${rotation}deg` }}
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
