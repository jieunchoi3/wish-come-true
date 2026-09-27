import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { getBinderOverlayRoot } from '../../lib/binderOverlay'
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
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setPortalReady(true)
  }, [])

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

  const sheet = (
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
        className="paper-sheet-panel relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 pointer-events-none"
      >
        <Scrap
          id={id}
          index={0}
          layout={false}
          flat
          tapePosition="top-center"
          className="paper-sheet-card pointer-events-auto mx-auto w-full max-w-lg sm:max-w-xl"
        >
          <div className="px-6 py-7 sm:px-8 sm:py-8 scrap-interactive">{children}</div>
        </Scrap>
      </div>
    </div>
  )

  if (!portalReady) return null
  const overlayRoot = getBinderOverlayRoot()
  if (!overlayRoot) return null
  return createPortal(sheet, overlayRoot)
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
