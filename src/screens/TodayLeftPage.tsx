import { useMemo, useState } from 'react'
import { DateStamp } from '../components/ScrapbookElements'
import { PhotoboothPolaroid } from '../components/PhotoboothPolaroid'
import { MemoryDetailSheet } from '../components/lists/MemoryDetailSheet'
import { Tape } from '../components/primitives/Tape'
import { useLists } from '../hooks/useLists'
import { PHOTOBOOTH_COUNT, pickPhotoboothItems } from '../lib/photobooth'
import { londonDateISO } from '../lib/season'
import { tapeColorForId, tapeRotation } from '../lib/utils'
import type { ListItemView } from '../types/database'

export function TodayLeftPage() {
  const { items } = useLists()
  const date = new Date()
  const todayISO = londonDateISO(date)

  const photoboothItems = useMemo(
    () => pickPhotoboothItems(items, PHOTOBOOTH_COUNT, todayISO, date),
    [items, todayISO],
  )

  const [detailItem, setDetailItem] = useState<ListItemView | null>(null)

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="relative mb-4 inline-block pt-2">
        <Tape
          color={tapeColorForId('date-sticker')}
          rotation={tapeRotation('date-sticker')}
          position="top-center"
        />
        <DateStamp date={date} />
      </div>

      {photoboothItems.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto pb-2">
          <div className="grid grid-cols-3 gap-x-2 gap-y-5 pt-1">
            {photoboothItems.map((item) => (
              <PhotoboothPolaroid
                key={item.id}
                item={item}
                onOpen={() => setDetailItem(item)}
              />
            ))}
          </div>
        </div>
      )}

      {detailItem && (
        <MemoryDetailSheet
          item={detailItem}
          onClose={() => setDetailItem(null)}
          backLabel="back to today"
        />
      )}

      <div
        className="pointer-events-none absolute bottom-10 right-6 select-none opacity-[0.08]"
        style={{ transform: 'rotate(12deg)' }}
        aria-hidden
      >
        <div
          className="h-16 w-16 rounded-full border-2 border-ink"
          style={{
            borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-ink" />
        <div className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-ink" />
      </div>
    </div>
  )
}
