import { useMemo, useState } from 'react'
import { ScrapCollage } from '../components/ScrapCollage'
import { CollectionCover } from '../components/collections/CollectionCover'
import { BrowseList } from '../components/collections/BrowseList'
import { ModeToggle } from '../components/collections/ModeToggle'
import { SwipeDeck, InterleavedSwipeDeck } from '../components/collections/SwipeDeck'
import { useCollections } from '../hooks/useCollections'
import {
  ONBOARDING_DONE_STARS,
  ONBOARDING_EXIT_STARS,
  ONBOARDING_MAX_COLLECTIONS,
  ONBOARDING_MIN_COLLECTIONS,
} from '../lib/collectionQueries'
import { markOnboardingDoneInDb } from '../lib/profile'
import { supabase } from '../lib/supabase'
import { useCollectionsTab } from './collectionsTabState'

interface CollectionsRightPageProps {
  onGoToday?: () => void
}

export function CollectionsRightPage({ onGoToday }: CollectionsRightPageProps) {
  const {
    view,
    openCollection,
    goHome,
    setMode,
    startOnboarding,
    startOnboardingSwipe,
    finishOnboarding: finishOnboardingView,
  } = useCollectionsTab()

  const finishOnboarding = async () => {
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) await markOnboardingDoneInDb(user.id)
    }
    finishOnboardingView()
  }

  const { collections, itemsByCollection, gestures, tickedCount, loading } =
    useCollections()

  const [pickedIds, setPickedIds] = useState<string[]>([])

  const detailCollection = useMemo(() => {
    if (view.kind !== 'detail') return null
    return collections.find((c) => c.id === view.collectionId) ?? null
  }, [view, collections])

  const detailItems = useMemo(() => {
    if (!detailCollection) return []
    return itemsByCollection.get(detailCollection.id) ?? []
  }, [detailCollection, itemsByCollection])

  const undecidedItems = useMemo(
    () => detailItems.filter((item) => !gestures[item.id]),
    [detailItems, gestures],
  )

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">loading lists…</p>
      </div>
    )
  }

  if (view.kind === 'onboarding-pick') {
    const togglePick = (id: string) => {
      setPickedIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id)
        if (prev.length >= ONBOARDING_MAX_COLLECTIONS) return prev
        return [...prev, id]
      })
    }

    const canContinue =
      pickedIds.length >= ONBOARDING_MIN_COLLECTIONS &&
      pickedIds.length <= ONBOARDING_MAX_COLLECTIONS

    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <ScrapCollage className="pb-4">
          {collections.map((col, i) => (
            <CollectionCover
              key={col.id}
              collection={col}
              ticked={tickedCount(col.id)}
              index={i}
              selected={pickedIds.includes(col.id)}
              onClick={() => togglePick(col.id)}
            />
          ))}
        </ScrapCollage>
        {canContinue && (
          <button
            type="button"
            onClick={() => startOnboardingSwipe(pickedIds)}
            className="mt-4 self-center font-hand text-xl text-ink underline decoration-ochre/60"
          >
            let&apos;s swipe →
          </button>
        )}
        <p className="mt-2 text-center font-hand text-sm text-ink/40">
          pick {ONBOARDING_MIN_COLLECTIONS}–{ONBOARDING_MAX_COLLECTIONS} ({pickedIds.length}{' '}
          chosen)
        </p>
      </div>
    )
  }

  if (view.kind === 'onboarding-swipe') {
    const pickedCollections = collections.filter((c) =>
      view.collectionIds.includes(c.id),
    )
    const itemSets = pickedCollections.map(
      (c) => itemsByCollection.get(c.id) ?? [],
    )

    const totalStars = Object.values(gestures).filter((g) => g === 'starred').length

    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <InterleavedSwipeDeck
          collections={pickedCollections}
          itemSets={itemSets}
        />
        <div className="mt-4 shrink-0">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-ink/10"
            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
          >
            <div
              className="h-full bg-ochre/70 transition-all duration-300"
              style={{
                width: `${Math.min(100, (totalStars / ONBOARDING_DONE_STARS) * 100)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-center font-hand text-base text-ink/55">
            {totalStars} starred… keep going
          </p>
          {totalStars >= ONBOARDING_EXIT_STARS && (
            <button
              type="button"
              onClick={() => {
                void finishOnboarding()
                onGoToday?.()
              }}
              className="mt-2 block w-full text-center font-hand text-sm text-ink/45 underline"
            >
              that&apos;s enough for now
            </button>
          )}
          {totalStars >= ONBOARDING_DONE_STARS && (
            <div className="mt-6 text-center">
              <p className="font-hand text-xl text-ink/70">
                You&apos;ve imagined {totalStars} things. Let&apos;s start living them.
              </p>
              <button
                type="button"
                onClick={() => {
                  void finishOnboarding()
                  onGoToday?.()
                }}
                className="mt-3 font-hand text-lg text-ink underline decoration-sage/60"
              >
                turn to today →
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (view.kind === 'detail' && detailCollection) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mb-3 flex items-start gap-2">
          <ModeToggle mode={view.mode} onChange={setMode} />
        </div>
        {view.mode === 'browse' ? (
          <BrowseList
            collection={detailCollection}
            items={detailItems}
            groupByContinent={detailCollection.slug === 'countries'}
          />
        ) : (
          <SwipeDeck
            collection={detailCollection}
            items={undecidedItems}
            onEmpty={goHome}
            onGoBack={goHome}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <ScrapCollage className="pb-8">
        {collections.map((col, i) => (
          <CollectionCover
            key={col.id}
            collection={col}
            ticked={tickedCount(col.id)}
            index={i}
            onClick={() => openCollection(col.id, 'browse')}
          />
        ))}
      </ScrapCollage>
      <button
        type="button"
        onClick={() => {
          setPickedIds([])
          startOnboarding()
        }}
        className="mt-2 self-center font-hand text-sm text-ink/40 underline"
      >
        fill your deck again
      </button>
    </div>
  )
}
