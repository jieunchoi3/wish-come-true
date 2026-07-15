import { useEffect, useState } from 'react'
import {
  Chip,
  CollapsedChips,
  DateStamp,
  HandDrawnLabel,
  WeatherSticker,
} from '../components/ScrapbookElements'
import { NostalgiaCard } from '../components/NostalgiaCard'
import { Scrap } from '../components/primitives'
import { Tape } from '../components/primitives/Tape'
import { AVAILABILITY_OPTIONS, MOOD_OPTIONS } from '../constants/wishMeta'
import { useLists } from '../hooks/useLists'
import { addMonthsISO, getNostalgiaItem } from '../lib/listQueries'
import { loadTodayPrefs, saveTodayPrefs } from '../lib/todayPrefs'
import { tapeColorForId, tapeRotation } from '../lib/utils'

export function TodayLeftPage() {
  const { items, updateItem } = useLists()
  const prefs = loadTodayPrefs()
  const [availability, setAvailability] = useState<string | null>(
    prefs.availability,
  )
  const [mood, setMood] = useState<string | null>(prefs.mood)
  const [chipsExpanded, setChipsExpanded] = useState(false)

  const date = new Date()
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const nostalgiaItem = getNostalgiaItem(items)

  const timeLabel =
    AVAILABILITY_OPTIONS.find((o) => o.id === availability)?.label ?? ''
  const moodLabel = mood ?? null
  const showCollapsed = availability !== null && !chipsExpanded

  useEffect(() => {
    saveTodayPrefs(availability, mood)
  }, [availability, mood])

  function handleTimeSelect(id: string) {
    setAvailability(id)
    setChipsExpanded(false)
  }

  function handleMoodSelect(id: string) {
    setMood(mood === id ? null : id)
    if (availability) setChipsExpanded(false)
  }

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
            <WeatherSticker temp={11} condition="rain" sunset="20:53" />
          </div>
        </Scrap>
      </div>

      <section className="relative z-10 shrink-0 overflow-hidden">
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: showCollapsed ? '0fr' : '1fr' }}
        >
          <div className="min-h-0 overflow-hidden">
            <HandDrawnLabel>how much time do you have?</HandDrawnLabel>
            <div className="mb-2 flex flex-wrap gap-2">
              {AVAILABILITY_OPTIONS.map((opt, i) => (
                <Chip
                  key={opt.id}
                  index={i}
                  label={opt.label}
                  selected={availability === opt.id}
                  onClick={() => handleTimeSelect(opt.id)}
                />
              ))}
            </div>
            <HandDrawnLabel>and how are you feeling? (optional)</HandDrawnLabel>
            <div className="flex flex-wrap gap-2 pb-1">
              {MOOD_OPTIONS.map((opt, i) => (
                <Chip
                  key={opt}
                  index={i + 10}
                  label={opt}
                  selected={mood === opt}
                  onClick={() => handleMoodSelect(opt)}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: showCollapsed ? '1fr' : '0fr' }}
        >
          <div className="min-h-0 overflow-hidden">
            <CollapsedChips
              timeLabel={timeLabel}
              moodLabel={moodLabel}
              onEdit={() => setChipsExpanded(true)}
            />
          </div>
        </div>
      </section>

      {nostalgiaItem && (
        <NostalgiaCard
          item={nostalgiaItem}
          onYes={() =>
            updateItem(
              nostalgiaItem.id,
              { snoozed_until: null, last_surfaced_at: null },
              false,
            )
          }
          onNotNow={() =>
            updateItem(
              nostalgiaItem.id,
              { snoozed_until: addMonthsISO(1) },
              false,
            )
          }
          onNeverMind={() =>
            updateItem(
              nostalgiaItem.id,
              { snoozed_until: addMonthsISO(12) },
              false,
            )
          }
        />
      )}

      <div
        className="pointer-events-none absolute bottom-6 left-2 select-none font-hand text-[clamp(4rem,12vw,7rem)] leading-none text-ink/[0.045]"
        style={{ transform: 'rotate(-4deg)' }}
        aria-hidden
      >
        {weekday}
      </div>
    </div>
  )
}
