import { useState } from 'react'
import {
  Chip,
  CollapsedChips,
  DateStamp,
  HandDrawnLabel,
  WeatherSticker,
} from '../components/ScrapbookElements'
import { LifePackSpread } from '../components/LifePackSpread'
import { NostalgiaCard } from '../components/NostalgiaCard'
import { PaperPage } from '../components/primitives'
import { HAND_DRAWN_RADIUS } from '../lib/utils'
import { FAKE_TODAY } from '../data/fakeToday'

export function TodayScreen() {
  const [availability, setAvailability] = useState<string | null>(
    FAKE_TODAY.selectedAvailability,
  )
  const [mood, setMood] = useState<string | null>(FAKE_TODAY.selectedMood)
  const [chipsExpanded, setChipsExpanded] = useState(false)

  const { date, weather, lifePack, nostalgia } = FAKE_TODAY

  const timeLabel =
    FAKE_TODAY.availabilityOptions.find((o) => o.id === availability)?.label ?? ''
  const moodLabel = mood
    ? (FAKE_TODAY.moodOptions.find((o) => o.id === mood)?.label ?? null)
    : null

  const showCollapsed = availability !== null && !chipsExpanded

  function handleTimeSelect(id: string) {
    setAvailability(id)
    setChipsExpanded(false)
  }

  function handleMoodSelect(id: string) {
    setMood(mood === id ? null : id)
    if (availability) setChipsExpanded(false)
  }

  return (
    <PaperPage>
      <main className="relative mx-auto max-w-md px-5 pb-16 pt-5">
        <header className="mb-4 flex flex-col gap-2.5">
          <DateStamp date={date} />
          <WeatherSticker
            temp={weather.temp}
            condition={weather.condition}
            sunset={weather.sunset}
          />
        </header>

        {/* Chips — collapse after time selection */}
        <section className="mb-4 overflow-hidden">
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: showCollapsed ? '0fr' : '1fr' }}
          >
            <div className="min-h-0 overflow-hidden">
              <HandDrawnLabel>how much time do you have?</HandDrawnLabel>
              <div className="mb-3 flex flex-wrap gap-2.5">
                {FAKE_TODAY.availabilityOptions.map((opt, i) => (
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
              <div className="flex flex-wrap gap-2.5 pb-1">
                {FAKE_TODAY.moodOptions.map((opt, i) => (
                  <Chip
                    key={opt.id}
                    index={i + 10}
                    label={opt.label}
                    selected={mood === opt.id}
                    onClick={() => handleMoodSelect(opt.id)}
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

        <div className="mb-10">
          <p
            className="mb-3 font-hand text-2xl text-ink/70"
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            today's edition
          </p>
          <LifePackSpread
            title={lifePack.title}
            moodLine={lifePack.moodLine}
            items={lifePack.items}
            connectiveTissue={lifePack.connectiveTissue}
            rerollsRemaining={lifePack.rerollsRemaining}
          />

          <button
            type="button"
            className="mt-5 w-full border border-dashed border-ink/20 bg-transparent py-2.5 font-hand text-lg text-ink/50 transition hover:border-ink/30 hover:text-ink/70"
            style={{ borderRadius: HAND_DRAWN_RADIUS, transform: 'rotate(-0.3deg)' }}
          >
            shuffle the pack
          </button>
        </div>

        <NostalgiaCard
          id={nostalgia.id}
          title={nostalgia.title}
          imaginedAgo={nostalgia.imaginedAgo}
          addedDate={nostalgia.addedDate}
        />

        <div className="mt-12 flex justify-end opacity-40">
          <div
            className="border-2 border-stamp/30 px-3 py-1 font-hand text-lg text-stamp/50"
            style={{ transform: 'rotate(8deg)', borderRadius: HAND_DRAWN_RADIUS }}
            aria-hidden
          >
            edition № 196
          </div>
        </div>
      </main>
    </PaperPage>
  )
}
