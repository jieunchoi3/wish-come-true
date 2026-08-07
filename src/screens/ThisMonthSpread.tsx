import { useMemo, useState } from 'react'
import { COMPLETION_ACTION_LABEL } from '../constants/completion'
import { CommitAction } from '../components/lists/CommitAction'
import { ItemCompleteSheet } from '../components/lists/ItemCompleteSheet'
import { ScrapCollage } from '../components/ScrapCollage'
import { Scrap } from '../components/primitives'
import { RubberStampButton } from '../components/wishes/WishUi'
import { useLists } from '../hooks/useLists'
import {
  currentMonthKey,
  getCommittedMonth,
  isFocusedThisMonth,
  markRolloverPrompted,
  needsRolloverPrompt,
  recordCommittedMonth,
} from '../lib/committedMonth'
import type { ListItemView } from '../types/database'

function monthBanner(date = new Date()): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export function ThisMonthLeftPage() {
  const { items, lists, loading } = useLists()
  const monthKey = currentMonthKey()

  const focused = useMemo(
    () => items.filter((i) => isFocusedThisMonth(i, monthKey)),
    [items, monthKey],
  )
  const doneThisMonth = items.filter(
    (i) => i.status === 'done' && getCommittedMonth(i.id) === monthKey,
  )
  const totalFocus = focused.length + doneThisMonth.length
  const doneCount = doneThisMonth.length

  const listEmojiById = useMemo(() => {
    const map = new Map<string, string>()
    for (const list of lists) {
      map.set(list.id, list.emoji?.trim() || '📋')
    }
    return map
  }, [lists])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h1
        className="mb-3 shrink-0 font-hand text-4xl leading-tight text-ink lg:text-5xl"
        style={{ transform: 'rotate(-0.6deg)' }}
      >
        {monthBanner()}
      </h1>

      <p
        className="mb-2 max-w-xs shrink-0 font-hand text-xl text-ink/55"
        style={{ transform: 'rotate(0.3deg)' }}
      >
        what you actually decided to do this month.
      </p>

      {totalFocus > 0 && (
        <p
          className="mb-4 shrink-0 font-hand text-sm text-ink/55"
          style={{ transform: 'rotate(-0.2deg)' }}
        >
          <span className="relative inline-block pb-1">
            {doneCount} of {totalFocus}
            <svg
              viewBox="0 0 56 6"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-px left-0 h-1.5 w-full text-ink/25"
              aria-hidden
            >
              <path
                d="M1 4.5 C10 1.5, 18 5, 28 3.5 S46 2, 55 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          done so far.
        </p>
      )}

      {loading ? (
        <p className="font-hand text-lg text-ink/30">opening this month…</p>
      ) : focused.length > 0 ? (
        <div className="wishes-scroll min-h-0 flex-1">
          <ScrapCollage className="pb-8">
            {focused.map((item, index) => (
              <ThisMonthCard
                key={item.id}
                item={item}
                listEmoji={listEmojiById.get(item.list_id) ?? '📋'}
                index={index}
              />
            ))}
          </ScrapCollage>
        </div>
      ) : (
        <p
          className="font-hand text-lg text-ink/45"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          nothing chosen yet — add suggestions from today&apos;s edition →
        </p>
      )}
    </div>
  )
}

function MonthRolloverPrompt({
  onKeep,
  onLetGo,
}: {
  onKeep: () => void
  onLetGo: () => void
}) {
  return (
    <div
      className="mt-3 border-t border-ink/10 pt-3"
      style={{ transform: 'rotate(-0.2deg)' }}
    >
      <p className="font-hand text-sm text-ink/50">still this month?</p>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={onKeep}
          className="font-hand text-sm text-ink/45 underline decoration-dotted"
        >
          yes, keep it
        </button>
        <button
          type="button"
          onClick={onLetGo}
          className="font-hand text-sm text-ink/45 underline decoration-dotted"
        >
          let it go
        </button>
      </div>
    </div>
  )
}

function ThisMonthCard({
  item,
  listEmoji,
  index,
}: {
  item: ListItemView
  listEmoji: string
  index: number
}) {
  const { items, uncommitItem } = useLists()
  const [completing, setCompleting] = useState(false)
  const [showRollover, setShowRollover] = useState(() =>
    needsRolloverPrompt(item.id),
  )

  const liveItem = items.find((i) => i.id === item.id) ?? item

  function handleDidIt() {
    setCompleting(true)
  }

  function handleCompleteClose() {
    setCompleting(false)
  }

  function handleKeep() {
    recordCommittedMonth(item.id)
    markRolloverPrompted(item.id)
    setShowRollover(false)
  }

  async function handleLetGo() {
    markRolloverPrompted(item.id)
    setShowRollover(false)
    await uncommitItem(item)
  }

  return (
    <>
      <Scrap
        id={item.id}
        index={index}
        tapePosition="top-right"
        layout={false}
        className="w-full"
      >
        <div className="list-item-card px-5 py-4">
          <div className="list-item-tier-content">
            <span
              className="mr-1.5 inline-block font-hand text-base text-ink/45"
              aria-hidden
            >
              {listEmoji}
            </span>
            <h3 className="inline list-item-title text-lg">
              {liveItem.title}
            </h3>
            {liveItem.note && (
              <p className="list-item-note mt-1.5">{liveItem.note}</p>
            )}
          </div>

          <div className="list-item-tier-actions relative z-10 mt-4">
            <div className="list-item-actions-row">
              <CommitAction item={liveItem} variant="primary" rotation={0.2} />
            </div>
            <RubberStampButton
              label={COMPLETION_ACTION_LABEL}
              onClick={() => void handleDidIt()}
              rotation={-2}
            />
          </div>

          {showRollover && (
            <MonthRolloverPrompt
              onKeep={handleKeep}
              onLetGo={() => void handleLetGo()}
            />
          )}
        </div>
      </Scrap>

      {completing && (
        <ItemCompleteSheet
          item={liveItem}
          onClose={handleCompleteClose}
        />
      )}
    </>
  )
}
