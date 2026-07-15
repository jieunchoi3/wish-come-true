import { useEffect, useRef, useState } from 'react'
import { BinderRings } from '../binder/BinderRings'
import { CombinationLock } from './CombinationLock'
import { LeatherPattern } from './LeatherPattern'
import { NamePlate } from './NamePlate'

const LEATHER = '#F7F4EE'

interface BookCoverProps {
  name: string
  onNameChange: (name: string) => void
  lockCode: string
  initialUnlocked: boolean
  strapOpen: boolean
  coverOpen: boolean
  coverOpenReduced: boolean
  onUnlock: () => void
}

/** Stage 1 — closed leather organiser cover */
export function BookCover({
  name,
  onNameChange,
  lockCode,
  initialUnlocked,
  strapOpen,
  coverOpen,
  coverOpenReduced,
  onUnlock,
}: BookCoverProps) {
  const nameReady = name.trim().length > 0
  const coverRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 465, h: 620 })
  const [lockScale, setLockScale] = useState(1.35)

  useEffect(() => {
    const el = coverRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDims({ w: width, h: height })
      setLockScale(Math.max(1.1, Math.min(1.65, height / 460)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      className="book-scene relative"
      style={{ perspective: '1600px' }}
    >
      {/* Page block slivers — thickness on right */}
      <div
        className="pointer-events-none absolute z-0"
        style={{ right: 0, top: '1%', height: '98%' }}
        aria-hidden
      >
        {['#F5F0E6', '#F8F4EB', '#FAF6EF', '#FCF8F2'].map((color, i) => (
          <div
            key={color}
            className="absolute h-full"
            style={{
              right: i * 3,
              top: i * 2,
              width: 8,
              backgroundColor: color,
              borderRadius: '0 3px 3px 0',
              boxShadow: i === 3 ? '2px 0 4px rgba(43,42,39,0.08)' : undefined,
            }}
          />
        ))}
      </div>

      {/* Cover — swings on left hinge when opening */}
      <div
        ref={coverRef}
        className={`book-cover book-cover-outer relative z-10 ${
          coverOpen ? (coverOpenReduced ? 'book-cover-open-reduced' : 'book-cover-open') : ''
        }`}
        style={{ transformOrigin: 'left center' }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            backgroundColor: LEATHER,
            borderRadius: '14px',
            border: '1px solid rgba(43,42,39,0.16)',
            boxShadow:
              '0 48px 80px -20px rgba(43,42,39,0.28), 0 20px 40px -12px rgba(43,42,39,0.14), 0 4px 12px rgba(43,42,39,0.08)',
          }}
        >
          <LeatherPattern width={dims.w} height={dims.h} />

          <BinderRings orientation="vertical" layer="back" placement="left-edge" />
          <BinderRings orientation="vertical" layer="front" placement="left-edge" />

          <NamePlate name={name} onNameChange={onNameChange} />

          {/* Leather strap + combination lock ~45% down */}
          <div
            className={`book-strap absolute right-0 top-[45%] z-30 flex -translate-y-1/2 items-center ${
              strapOpen ? 'book-strap-swing' : ''
            }`}
            style={{
              transformOrigin: 'right center',
              width: Math.round(72 * lockScale),
              minHeight: Math.round(120 * lockScale),
            }}
          >
            <div
              className="relative flex h-full w-full items-center justify-center py-4"
              style={{
                background: `linear-gradient(90deg, ${LEATHER} 0%, #e8e2d6 55%, #ddd6c8 100%)`,
                borderRadius: '6px 12px 12px 6px',
                boxShadow: '-3px 5px 14px rgba(43,42,39,0.16)',
                border: '1px solid rgba(43,42,39,0.1)',
              }}
            >
              <CombinationLock
                code={lockCode}
                onUnlock={onUnlock}
                disabled={!nameReady}
                initialUnlocked={initialUnlocked}
                scale={lockScale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
