import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { playDialClick } from '../../lib/lockSounds'

const DIGIT_H = 32
const DRAG_THRESHOLD = 14

interface LockDialProps {
  value: number
  onChange: (value: number) => void
  index: number
  disabled?: boolean
  soundsEnabled?: boolean
}

export function LockDial({
  value,
  onChange,
  index,
  disabled = false,
  soundsEnabled = true,
}: LockDialProps) {
  const reducedMotion = usePrefersReducedMotion()
  const dragStartY = useRef(0)
  const dragAccum = useRef(0)
  const [dragging, setDragging] = useState(false)

  const snapDigit = useCallback(
    (next: number) => {
      const wrapped = ((next % 10) + 10) % 10
      if (wrapped !== value) {
        onChange(wrapped)
        if (soundsEnabled && !reducedMotion) playDialClick()
      }
    },
    [value, onChange, soundsEnabled, reducedMotion],
  )

  const handleWheel = (e: React.WheelEvent) => {
    if (disabled) return
    e.preventDefault()
    snapDigit(value + (e.deltaY > 0 ? 1 : -1))
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    setDragging(true)
    dragStartY.current = e.clientY
    dragAccum.current = 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || disabled) return
    const dy = e.clientY - dragStartY.current
    dragStartY.current = e.clientY
    dragAccum.current += dy

    while (dragAccum.current >= DRAG_THRESHOLD) {
      dragAccum.current -= DRAG_THRESHOLD
      snapDigit(value - 1)
    }
    while (dragAccum.current <= -DRAG_THRESHOLD) {
      dragAccum.current += DRAG_THRESHOLD
      snapDigit(value + 1)
    }
  }

  const handlePointerUp = () => setDragging(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      snapDigit(value - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      snapDigit(value + 1)
    }
  }

  const stripOffset = -(10 + value) * DIGIT_H

  return (
    <div
      className={`lock-dial relative ${disabled ? 'opacity-35' : ''}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="spinbutton"
      aria-label={`lock dial ${index + 1} of 4, current value ${value}`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={9}
      style={{
        width: 28,
        height: DIGIT_H,
        cursor: disabled ? 'default' : 'ns-resize',
        touchAction: 'none',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)',
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            transform: `translateY(${stripOffset}px)`,
            transition: reducedMotion
              ? 'none'
              : 'transform 120ms cubic-bezier(0.34, 1.45, 0.64, 1)',
          }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              className="flex items-center justify-center font-serif text-lg font-semibold text-[#3d3018]"
              style={{ height: DIGIT_H, width: 28 }}
            >
              {i % 10}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
