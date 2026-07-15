import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Collection, CollectionItem } from '../../types/supabase'
import type { CollectionGestureType } from '../../types/supabase'
import { cardRotation } from '../../lib/utils'
import { useCollections } from '../../hooks/useCollections'
import { Scrap } from '../primitives'

const THRESHOLD = 90
const FLY_MS = 280

type SwipeDirection = 'left' | 'right' | 'up'

function directionForGesture(gesture: CollectionGestureType): SwipeDirection {
  if (gesture === 'ticked') return 'left'
  if (gesture === 'starred') return 'up'
  return 'right'
}

function gestureForOffset(x: number, y: number): CollectionGestureType | null {
  if (Math.abs(x) < THRESHOLD && Math.abs(y) < THRESHOLD) return null
  if (Math.abs(y) > Math.abs(x) && y < -THRESHOLD) return 'starred'
  if (x < -THRESHOLD) return 'ticked'
  if (x > THRESHOLD) return 'skipped'
  return null
}

function overlayForGesture(gesture: CollectionGestureType | null) {
  if (gesture === 'ticked') return { mark: '✓', color: 'rgba(168,181,162,0.6)' }
  if (gesture === 'starred') return { mark: '⭐', color: 'rgba(217,168,95,0.6)' }
  if (gesture === 'skipped') return { mark: '✗', color: 'rgba(212,165,165,0.6)' }
  return null
}

interface SwipeDeckProps {
  collection: Collection
  items: CollectionItem[]
  onEmpty?: () => void
  onGoBack?: () => void
}

export function SwipeDeck({ collection, items, onEmpty, onGoBack }: SwipeDeckProps) {
  const { applyGesture } = useCollections()
  const [deck, setDeck] = useState(items)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    setDeck(items)
  }, [items])

  const current = deck[0]
  const behind = deck.slice(1, 4)

  const commitGesture = useCallback(
    async (item: CollectionItem, gesture: CollectionGestureType) => {
      setExiting(true)
      const dir = directionForGesture(gesture)
      const flyX = dir === 'left' ? -400 : dir === 'right' ? 400 : 0
      const flyY = dir === 'up' ? -400 : 0

      await new Promise((r) => setTimeout(r, FLY_MS))
      await applyGesture(item, collection, gesture)
      setDeck((d) => d.slice(1))
      setExiting(false)

      void flyX
      void flyY
    },
    [applyGesture, collection],
  )

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!current || exiting) return
      if (e.key === 'ArrowLeft') commitGesture(current, 'ticked')
      if (e.key === 'ArrowUp') commitGesture(current, 'starred')
      if (e.key === 'ArrowRight') commitGesture(current, 'skipped')
    },
    [current, exiting, commitGesture],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    if (deck.length === 0) onEmpty?.()
  }, [deck.length, onEmpty])

  if (!current) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <p className="font-hand text-2xl text-ink/50">that&apos;s all of them.</p>
        {onGoBack && (
          <button
            type="button"
            onClick={onGoBack}
            className="font-hand text-base text-ink/45 underline"
          >
            ← back to list
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
      {behind.map((item, i) => (
        <div
          key={item.id}
          className="pointer-events-none absolute w-[min(100%,320px)]"
          style={{
            transform: `rotate(${cardRotation(item.id) * 0.8}deg) translateY(${(i + 1) * 8}px) scale(${1 - (i + 1) * 0.03})`,
            zIndex: 5 - i,
            opacity: 0.55 - i * 0.12,
          }}
          aria-hidden
        >
          <Scrap id={`${item.id}-back`} index={i} tape={false} layout={false}>
            <div className="h-48" />
          </Scrap>
        </div>
      ))}

      <SwipeCard
        key={current.id}
        item={current}
        collection={collection}
        exiting={exiting}
        onCommit={commitGesture}
      />

      <div className="mt-6 flex gap-6 font-hand text-lg text-ink/60">
        <ActionButton label="✓ done it" onClick={() => commitGesture(current, 'ticked')} />
        <ActionButton label="⭐ want it" onClick={() => commitGesture(current, 'starred')} />
        <ActionButton label="✗ not for me" onClick={() => commitGesture(current, 'skipped')} />
      </div>
    </div>
  )
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-opacity hover:opacity-100"
      style={{ opacity: 0.75 }}
    >
      {label}
    </button>
  )
}

interface SwipeCardProps {
  item: CollectionItem
  collection: Collection
  exiting: boolean
  onCommit: (item: CollectionItem, gesture: CollectionGestureType) => void
}

function SwipeCard({ item, collection, exiting, onCommit }: SwipeCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const [activeGesture, setActiveGesture] = useState<CollectionGestureType | null>(
    null,
  )

  const overlay = useMemo(() => overlayForGesture(activeGesture), [activeGesture])

  const onDrag = (_: unknown, info: PanInfo) => {
    const g = gestureForOffset(info.offset.x, info.offset.y)
    setActiveGesture(g)
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const g = gestureForOffset(info.offset.x, info.offset.y)
    if (g) {
      const dir = directionForGesture(g)
      const flyX = dir === 'left' ? -500 : dir === 'right' ? 500 : 0
      const flyY = dir === 'up' ? -500 : 0
      animate(x, flyX, { duration: FLY_MS / 1000, ease: 'easeIn' })
      animate(y, flyY, { duration: FLY_MS / 1000, ease: 'easeIn' })
      onCommit(item, g)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 25 })
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 25 })
    }
    setActiveGesture(null)
  }

  return (
    <motion.div
      className="relative z-10 w-[min(100%,340px)] touch-none cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate, opacity: exiting ? 0 : 1 }}
      drag
      dragElastic={0.85}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      <Scrap id={item.id} index={0} tape tapePosition="top-center" layout={false}>
        <div className="relative px-2 py-6 text-center">
          <span className="text-3xl" aria-hidden>
            {collection.emoji}
          </span>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink">
            {item.title}
          </h2>
          {item.subtitle && (
            <p className="mt-2 font-hand text-xl text-ink/55">{item.subtitle}</p>
          )}
          {overlay && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center font-hand text-7xl"
              style={{ color: overlay.color }}
              aria-hidden
            >
              {overlay.mark}
            </div>
          )}
        </div>
      </Scrap>
    </motion.div>
  )
}

/** Multi-collection interleaved deck for onboarding */
interface InterleavedSwipeDeckProps {
  collections: Collection[]
  itemSets: CollectionItem[][]
  onStarCount?: (count: number) => void
}

export function InterleavedSwipeDeck({
  collections,
  itemSets,
  onStarCount,
}: InterleavedSwipeDeckProps) {
  const { applyGesture, gestures } = useCollections()

  const initialDeck = useMemo(() => {
    const buckets = new Map<string, CollectionItem[]>()
    collections.forEach((c, i) => {
      buckets.set(
        c.id,
        itemSets[i].filter((item) => !gestures[item.id]),
      )
    })
    const result: { item: CollectionItem; collection: Collection }[] = []
    let added = true
    while (added) {
      added = false
      for (const collection of collections) {
        const q = buckets.get(collection.id) ?? []
        if (q.length > 0) {
          result.push({ item: q.shift()!, collection })
          added = true
        }
      }
    }
    return result
  }, [collections, itemSets, gestures])

  const [deck, setDeck] = useState(initialDeck)
  const [exiting, setExiting] = useState(false)

  const starCount = useMemo(
    () => Object.values(gestures).filter((g) => g === 'starred').length,
    [gestures],
  )

  useEffect(() => {
    onStarCount?.(starCount)
  }, [starCount, onStarCount])

  const current = deck[0]

  const commit = useCallback(
    async (gesture: CollectionGestureType) => {
      if (!current) return
      setExiting(true)
      await new Promise((r) => setTimeout(r, FLY_MS))
      await applyGesture(current.item, current.collection, gesture)
      setDeck((d) => d.slice(1))
      setExiting(false)
    },
    [current, applyGesture],
  )

  if (!current) {
    return (
      <p className="font-hand text-xl text-ink/50 text-center py-12">
        that&apos;s all of them.
      </p>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SwipeCard
        key={current.item.id}
        item={current.item}
        collection={current.collection}
        exiting={exiting}
        onCommit={(_, g) => commit(g)}
      />
      <div className="mt-4 flex justify-center gap-4 font-hand text-base text-ink/55">
        <ActionButton label="✓" onClick={() => commit('ticked')} />
        <ActionButton label="⭐" onClick={() => commit('starred')} />
        <ActionButton label="✗" onClick={() => commit('skipped')} />
      </div>
    </div>
  )
}
