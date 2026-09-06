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
  const blockBackdropCloseUntilRef = useRef(0)

  function blockBackdropClose(ms = 500) {
    blockBackdropCloseUntilRef.current = performance.now() + ms
  }

  useEffect(() => {
    if (!onClose) return
    const close = onClose

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    function handleWindowFocus() {
      blockBackdropClose(450)
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      if (target.matches('input[type="file"]') || target.closest('label')) {
        blockBackdropClose(650)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('focus', handleWindowFocus)
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('focus', handleWindowFocus)
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [onClose])

  function handleBackdropClose() {
    if (!onClose) return
    if (performance.now() < blockBackdropCloseUntilRef.current) return
    onClose()
  }

  return (
    <div
      className={`paper-sheet fixed inset-0 z-[100] flex min-h-0 flex-col ${className}`}
      role="dialog"
      aria-modal="true"
    >
      {onClose && (
        <button
          type="button"
          className="paper-sheet-backdrop absolute inset-0 cursor-pointer border-0 bg-desk/20 p-0"
          aria-label="Close"
          tabIndex={-1}
          onClick={handleBackdropClose}
        />
      )}
      <div
        ref={panelRef}
        className="paper-sheet-panel relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-2 py-3 sm:px-3 sm:py-4 pointer-events-none"
      >
        <Scrap
          id={id}
          index={0}
          layout={false}
          tapePosition="top-center"
          className="paper-sheet-card pointer-events-auto w-fit max-w-xl sm:my-2"
        >
          <div className="px-7 py-8 scrap-interactive">{children}</div>
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
