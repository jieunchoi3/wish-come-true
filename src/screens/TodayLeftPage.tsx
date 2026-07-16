import { useMemo, useState } from 'react'
import { DateStamp, WeatherSticker } from '../components/ScrapbookElements'
import { PhotoboothPolaroid } from '../components/PhotoboothPolaroid'
import { MemoryDetailSheet } from '../components/lists/MemoryDetailSheet'
import { Scrap } from '../components/primitives'
import { Tape } from '../components/primitives/Tape'
import { useLists } from '../hooks/useLists'
import { useWeather } from '../hooks/useWeather'
import { pickPhotoboothItem } from '../lib/photobooth'
import { londonDateISO } from '../lib/season'
import { tapeColorForId, tapeRotation } from '../lib/utils'
import type { ListItemView } from '../types/database'

export function TodayLeftPage() {
  const { items } = useLists()
  const { weather, loading: weatherLoading } = useWeather()
  const date = new Date()
  const todayISO = londonDateISO(date)

  const photoboothItem = useMemo(
    () => pickPhotoboothItem(items, todayISO, date),
    [items, todayISO],
  )

  const [detailItem, setDetailItem] = useState<ListItemView | null>(null)

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="relative mb-3 inline-block pt-2">
        <Tape
          color={tapeColorForId('date-sticker')}
          rotation={tapeRotation('date-sticker')}
          position="top-center"
        />
        <DateStamp date={date} />
      </div>

      <div className="mb-4 w-fit">
        <Scrap id="weather-scrap" index={0} layout={false} tapePosition="top-right">
          <div className="px-4 py-3">
            {weather ? (
              <WeatherSticker
                temp={weather.temp}
                condition={weather.condition}
                sunset={weather.sunset}
              />
            ) : (
              <p className="font-hand text-base text-ink/35">
                {weatherLoading ? 'checking the sky…' : 'weather offline'}
              </p>
            )}
          </div>
        </Scrap>
      </div>

      {photoboothItem && (
        <PhotoboothPolaroid
          item={photoboothItem}
          onOpen={() => setDetailItem(photoboothItem)}
        />
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
