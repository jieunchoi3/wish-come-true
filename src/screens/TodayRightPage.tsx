import { LifePackSpread } from '../components/LifePackSpread'
import { ItemCompleteSheet } from '../components/lists/ItemCompleteSheet'
import { ListItemDetailSheet } from '../components/lists/ListItemDetailSheet'
import { useLists } from '../hooks/useLists'
import { useTodayPack } from '../hooks/useTodayPack'
import { useWeather } from '../hooks/useWeather'
import { formatImaginedAgo } from '../lib/utils'

export function TodayRightPage() {
  const { items, lists, loading, commitItem, uncommitItem } = useLists()
  const { weather } = useWeather()

  const listTitles = new Map(lists.map((l) => [l.id, l.title]))

  const {
    packReady,
    packEntries,
    moodLine,
    animMap,
    detailItem,
    setDetailItem,
    completingItem,
    handleCompleteClose,
    handleDoneIt,
    handleNotToday,
    handleReroll,
    rerollsRemaining,
  } = useTodayPack(items, listTitles, weather)

  const spreadItems = packEntries.map(({ item, whyThis, imaginedAgo }) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    whyThis,
    imaginedAgo: imaginedAgo
      ? formatImaginedAgo(new Date(imaginedAgo))
      : undefined,
    hasPolaroid: Boolean(item.image_url),
    imageUrl: item.image_url ?? undefined,
    isSeeded: item.is_seeded,
    onDoneIt: () => handleDoneIt(item),
    onNotToday: () => handleNotToday(item),
    onTellMore: () => setDetailItem(item),
    committed: item.status === 'committed',
    onToggleCommit: () =>
      void (item.status === 'committed' ? uncommitItem(item) : commitItem(item)),
  }))

  const detailWhy = detailItem
    ? packEntries.find((e) => e.item.id === detailItem.id)?.whyThis
    : undefined

  const showEmpty = spreadItems.length === 0 && !loading && packReady

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col transition-opacity duration-500 ${
        loading ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <p
        className="mb-2 shrink-0 font-sans text-xl font-medium tracking-tight text-ink/70 lg:text-2xl"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        today&apos;s edition
      </p>

      {packReady && spreadItems.length > 0 && (
        <div className="mb-3 shrink-0">
          {rerollsRemaining > 0 ? (
            <button
              type="button"
              onClick={handleReroll}
              className="inline-flex items-center gap-2 rounded-sm px-1 py-0.5 text-ink/45 transition hover:bg-ink/5 hover:text-ink/70"
              style={{ transform: 'rotate(-0.3deg)' }}
              aria-label={`Shuffle suggestions (${rerollsRemaining} left today)`}
              title={`Shuffle (${rerollsRemaining} left today)`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              <span className="font-hand text-sm text-ink/35">
                {rerollsRemaining} left today
              </span>
            </button>
          ) : (
            <p
              className="font-hand text-sm text-ink/35"
              style={{ transform: 'rotate(-0.2deg)' }}
            >
              that&apos;s all for today.
            </p>
          )}
        </div>
      )}

      {showEmpty ? (
        <p className="font-sans text-base leading-relaxed text-ink/45">
          your lists are here to browse. add your own things as they come to you.
        </p>
      ) : (
        <div className="wishes-scroll relative min-h-0 flex-1">
          <LifePackSpread
            title=""
            moodLine={moodLine}
            items={spreadItems}
            compact
            animMap={animMap}
          />

          {detailItem && (
            <ListItemDetailSheet
              item={detailItem}
              whyThis={detailWhy}
              onClose={() => setDetailItem(null)}
            />
          )}

          {completingItem && (
            <ItemCompleteSheet
              item={completingItem}
              onClose={() => handleCompleteClose(completingItem)}
            />
          )}
        </div>
      )}
    </div>
  )
}
