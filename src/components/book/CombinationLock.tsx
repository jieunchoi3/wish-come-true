import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import {
  isLockSoundsMuted,
  playLatchClunk,
  playDialClick,
  setLockSoundsMuted,
} from '../../lib/lockSounds'
import { LockDial } from './LockDial'

export interface CombinationLockProps {
  /** Expected 4-digit code — ritual only, not security */
  code: string
  onUnlock: () => void
  disabled?: boolean
  initialUnlocked?: boolean
  /** check = validate against code; set = collect digits only */
  mode?: 'check' | 'set'
  onCodeChange?: (code: string) => void
  scale?: number
  showNewBookHint?: boolean
}

export function CombinationLock({
  code,
  onUnlock,
  disabled = false,
  initialUnlocked = false,
  mode = 'check',
  onCodeChange,
  scale = 1,
  showNewBookHint = true,
}: CombinationLockProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [digits, setDigits] = useState<[number, number, number, number]>([0, 0, 0, 0])
  const [latchOpen, setLatchOpen] = useState(false)
  const [latchPopped, setLatchPopped] = useState(initialUnlocked)
  const [soundsOn, setSoundsOn] = useState(() => !isLockSoundsMuted())
  const unlockFired = useRef(false)

  const dialsActive = !disabled && !initialUnlocked && !latchOpen
  const currentCode = digits.join('')

  useEffect(() => {
    onCodeChange?.(currentCode)
  }, [currentCode, onCodeChange])

  const fireUnlock = useCallback(() => {
    if (unlockFired.current) return
    unlockFired.current = true
    onUnlock()
  }, [onUnlock])

  const popLatchAndUnlock = useCallback(() => {
    if (unlockFired.current) return
    setLatchPopped(true)
    if (soundsOn && !reducedMotion) playLatchClunk()

    window.setTimeout(() => {
      setLatchOpen(true)
      fireUnlock()
    }, reducedMotion ? 0 : 280)
  }, [soundsOn, reducedMotion, fireUnlock])

  /** Returning user: check code match */
  useEffect(() => {
    if (mode !== 'check' || latchOpen || disabled || initialUnlocked) return
    if (currentCode === code.slice(0, 4)) {
      const t = window.setTimeout(() => {
        popLatchAndUnlock()
      }, reducedMotion ? 0 : 200)
      return () => clearTimeout(t)
    }
  }, [
    currentCode,
    code,
    mode,
    latchOpen,
    disabled,
    initialUnlocked,
    popLatchAndUnlock,
    reducedMotion,
  ])

  const handleLatchClick = () => {
    if (!initialUnlocked || latchOpen || disabled) return
    popLatchAndUnlock()
  }

  const setDigit = (i: number, v: number) => {
    setDigits((prev) => {
      const next = [...prev] as [number, number, number, number]
      next[i] = v
      return next
    })
  }

  const toggleMute = () => {
    const next = !soundsOn
    setSoundsOn(next)
    setLockSoundsMuted(!next)
    if (next && !reducedMotion) playDialClick()
  }

  const s = scale

  return (
    <div
      className="combination-lock relative"
      style={{ transform: `scale(${s})`, transformOrigin: 'center center' }}
    >
      {/* Cast shadow on leather */}
      <div
        className="pointer-events-none absolute rounded-[3px]"
        style={{
          inset: '4px -2px -6px -2px',
          background: 'rgba(43,42,39,0.14)',
          filter: 'blur(5px)',
        }}
        aria-hidden
      />

      <div
        className="relative flex items-center gap-0"
        style={{
          filter: disabled ? 'saturate(0.5) brightness(0.92)' : undefined,
        }}
      >
        {/* Latch / shackle plate */}
        <button
          type="button"
          onClick={handleLatchClick}
          disabled={!initialUnlocked || latchOpen || disabled}
          className={`lock-latch relative shrink-0 ${latchPopped || latchOpen ? 'lock-latch-popped' : ''} ${
            initialUnlocked && !latchOpen ? 'cursor-pointer' : 'cursor-default'
          }`}
          style={{
            width: 22,
            height: 36,
            marginRight: -2,
            borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #b8944f 0%, #9a7a3a 100%)',
            border: '1px solid rgba(60,45,20,0.35)',
            boxShadow: latchPopped
              ? '2px 2px 4px rgba(43,42,39,0.2)'
              : 'inset 0 1px 0 rgba(255,255,255,0.15)',
            transform: latchPopped
              ? 'translate(-4px, -2px)'
              : latchOpen
                ? 'translate(-6px, -3px)'
                : undefined,
            transition: reducedMotion
              ? 'none'
              : 'transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label={
            initialUnlocked && !latchOpen ? 'Open latch' : 'Latch'
          }
        />

        {/* Brass lock body */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 3,
            background:
              'linear-gradient(180deg, #e8d2a0 0%, #c4a265 35%, #a88848 65%, #8c6f3a 100%)',
            border: '1px solid #7a6030',
            boxShadow:
              'inset 0 0 0 1px rgba(60,45,20,0.25), inset 0 1px 2px rgba(255,255,255,0.2)',
            padding: '8px 10px 8px 8px',
          }}
        >
          {/* Brushed texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
            }}
            aria-hidden
          />
          {/* Specular */}
          {!disabled && (
            <div
              className="pointer-events-none absolute left-2 top-1.5 h-1.5 w-1.5 rounded-full bg-white opacity-50"
              style={{ filter: 'blur(0.5px)' }}
              aria-hidden
            />
          )}

          {/* Dial channel — recessed */}
          <div
            className="relative flex gap-1 rounded-sm px-1 py-0.5"
            style={{
              boxShadow: 'inset 1px 2px 5px rgba(43,42,39,0.28)',
              background: 'linear-gradient(180deg, #7a6030 0%, #9a7a42 100%)',
            }}
          >
            {digits.map((d, i) => (
              <LockDial
                key={i}
                value={d}
                index={i}
                onChange={(v) => setDigit(i, v)}
                disabled={!dialsActive}
                soundsEnabled={soundsOn}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute -bottom-5 right-0 font-hand text-xs text-ink/35 transition hover:text-ink/55"
        aria-label={soundsOn ? 'Mute lock sounds' : 'Enable lock sounds'}
      >
        {soundsOn ? '♪' : '○'}
      </button>

      {showNewBookHint && initialUnlocked && !latchOpen && !disabled && (
        <p
          className="absolute -bottom-8 left-1/2 w-max -translate-x-1/2 font-hand text-sm text-ink/45"
          style={{ transform: 'translateX(-50%) rotate(2deg)' }}
        >
          a new book — it isn&apos;t locked yet
        </p>
      )}
    </div>
  )
}
