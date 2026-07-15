import { useMemo } from 'react'
import { useCollections } from '../hooks/useCollections'
import { useCollectionsTab } from './collectionsTabState'

export function CollectionsLeftPage() {
  const { view, goHome } = useCollectionsTab()
  const { collections, gestures, undoStack, undoLast, tickedCount, starredCount } =
    useCollections()

  const detailCollection = useMemo(() => {
    if (view.kind !== 'detail') return null
    return collections.find((c) => c.id === view.collectionId) ?? null
  }, [view, collections])

  const sessionStats = useMemo(() => {
    if (view.kind !== 'detail' && view.kind !== 'onboarding-swipe') return null
    let ticked = 0
    let starred = 0
    for (const g of Object.values(gestures)) {
      if (g === 'ticked') ticked++
      if (g === 'starred') starred++
    }
    if (view.kind === 'detail' && detailCollection) {
      return {
        ticked: tickedCount(detailCollection.id),
        starred: starredCount(detailCollection.id),
      }
    }
    return { ticked, starred }
  }, [view, gestures, detailCollection, tickedCount, starredCount])

  if (view.kind === 'onboarding-pick') {
    return (
      <div className="flex h-full flex-col justify-center">
        <h1
          className="font-hand text-2xl leading-snug text-ink/80 lg:text-3xl"
          style={{ transform: 'rotate(-0.8deg)' }}
        >
          before we begin.
          <br />
          what are you curious about?
        </h1>
      </div>
    )
  }

  if (view.kind === 'onboarding-swipe') {
    return (
      <div className="flex h-full flex-col">
        <p className="font-hand text-lg text-ink/50">swiping through your picks…</p>
        {sessionStats && (
          <p className="mt-4 font-hand text-xl text-ink/65">
            ⭐ {sessionStats.starred} starred · ✓ {sessionStats.ticked} ticked
          </p>
        )}
        {undoStack.length > 0 && (
          <button
            type="button"
            onClick={() => undoLast()}
            className="mt-auto font-hand text-lg text-ink/45 underline decoration-dotted"
          >
            undo
          </button>
        )}
      </div>
    )
  }

  if (view.kind === 'detail' && detailCollection) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        <button
          type="button"
          onClick={goHome}
          className="mb-2 self-start font-hand text-sm text-ink/40 underline"
        >
          ← all lists
        </button>
        <h1 className="font-serif text-xl text-ink">{detailCollection.title}</h1>
        {sessionStats && (
          <p className="mt-3 font-hand text-lg text-ink/60">
            ⭐ {sessionStats.starred} starred · ✓ {sessionStats.ticked} ticked
          </p>
        )}
        {view.mode === 'swipe' && undoStack.length > 0 && (
          <button
            type="button"
            onClick={() => undoLast()}
            className="mt-auto font-hand text-lg text-ink/45 underline decoration-dotted"
          >
            undo
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <h1
        className="font-hand text-3xl text-ink/75"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        the world&apos;s lists
      </h1>
      <p className="mt-3 font-hand text-xl text-ink/50">
        tick what you&apos;ve done. star what you want.
      </p>
    </div>
  )
}
