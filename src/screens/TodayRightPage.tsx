import { useEffect, useMemo } from 'react'
import { LifePackSpread } from '../components/LifePackSpread'
import { useLists } from '../hooks/useLists'
import { getLifePackItems } from '../lib/listQueries'
import { loadTodayPrefs } from '../lib/todayPrefs'
import { formatImaginedAgo } from '../lib/utils'

export function TodayRightPage() {
  const { items, lists, engagedListIds, loading, markSurfaced } = useLists()
  const { availability } = loadTodayPrefs()

  const listTitles = useMemo(
    () => new Map(lists.map((l) => [l.id, l.title])),
    [lists],
  )

  const packEntries = getLifePackItems(
    items,
    engagedListIds,
    listTitles,
    availability,
    3,
  )

  useEffect(() => {
    if (packEntries.length === 0) return
    packEntries.forEach(({ item }) => void markSurfaced(item))
  }, [availability, packEntries, markSurfaced])

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
  }))

  return (
    <div
      className={`flex h-full min-h-0 flex-col transition-opacity duration-500 ${
        loading ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <p
        className="mb-2 shrink-0 font-serif text-xl font-medium tracking-tight text-ink/75 lg:text-2xl"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        today&apos;s edition
      </p>

      {spreadItems.length === 0 && !loading ? (
        <p className="font-sans text-base leading-relaxed text-ink/45">
          your lists are here to browse. add your own things as they come to you.
        </p>
      ) : (
        <LifePackSpread
          title="today's edition"
          moodLine="three things you've been meaning to do."
          items={spreadItems}
          compact
        />
      )}
    </div>
  )
}
