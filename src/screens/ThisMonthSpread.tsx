import { useEffect, useMemo, useRef, useState } from 'react'
import { COMPLETION_ACTION_LABEL } from '../constants/completion'
import { ProgressRing } from '../components/collections/ProgressRing'
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
import {
  monthPreviewSourceLine,
  pickMonthPreviewItems,
} from '../lib/monthPreview'
import type { ListItemView } from '../types/database'

const COMMIT_ANIM_MS = 200

function monthBanner(date = new Date()): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function BrowseLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-hand text-base text-ink/40 underline decoration-dotted decoration-ink/15 transition-colors hover:text-ink/60"
      style={{ transform: 'rotate(-0.4deg)' }}
    >
      browse everything →
    </button>
  )
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
  const progress = totalFocus > 0 ? doneCount / totalFocus : 0

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
        className="mb-6 max-w-xs shrink-0 font-hand text-xl text-ink/55"
        style={{ transform: 'rotate(0.3deg)' }}
      >
        what you actually decided to do this month.
      </p>

      {totalFocus > 0 && (
        <div className="mb-6 shrink-0">
          <ProgressRing
            id="this-month"
            progress={progress}
            ticked={doneCount}
            total={totalFocus}
            accent="#C9B8B5"
            size={56}
          />
        </div>
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
      ) : null}
    </div>
  )
}

function MonthPreviewCard({
  item,
  listEmoji,
  listTitle,
  index,
  onCommit,
}: {
  item: ListItemView
  listEmoji: string
  listTitle: string
  index: number
  onCommit: (item: ListItemView) => Promise<void>
}) {
  const [committing, setCommitting] = useState(false)

  async function handleCommit() {
    setCommitting(true)
    await new Promise((r) => window.setTimeout(r, COMMIT_ANIM_MS))
    await onCommit(item)
  }

  return (
    <div className={committing ? 'pack-card-commit' : ''}>
      <Scrap
        id={`month-preview-${item.id}`}
        index={index}
        tapePosition={index % 2 === 0 ? 'top-left' : 'top-right'}
      >
        <div className="px-5 py-4">
          <div className="list-item-tier-content">
            <span
              className="mr-1.5 inline-block font-hand text-base text-ink/45"
              aria-hidden
            >
              {listEmoji}
            </span>
            <h3 className="inline list-item-title text-base">{item.title}</h3>
          </div>
          <p
            className="mt-2 font-hand text-sm text-ink/45"
            style={{ transform: 'rotate(-0.2deg)' }}
          >
            {monthPreviewSourceLine(listTitle)}
          </p>
          <div className="mt-3">
            <button
              type="button"
              disabled={committing}
              onClick={() => void handleCommit()}
              className="list-item-action-primary"
              style={{ transform: 'rotate(-0.3deg)' }}
            >
              add to this month
            </button>
          </div>
        </div>
      </Scrap>
    </div>
  )
}

function EmptyMonthPreview({
  items,
  listEmojiById,
  listTitleById,
  onBrowseLists,
  onCommit,
  hasLeftPicks = false,
}: {
  items: ListItemView[]
  listEmojiById: Map<string, string>
  listTitleById: Map<string, string>
  onBrowseLists: () => void
  onCommit: (item: ListItemView) => Promise<void>
  hasLeftPicks?: boolean
}) {
  const monthKey = currentMonthKey()
  const [previewItems, setPreviewItems] = useState<ListItemView[]>([])
  const generatedRef = useRef(false)

  useEffect(() => {
    if (generatedRef.current || items.length === 0) return
    setPreviewItems(pickMonthPreviewItems(items))
    generatedRef.current = true
  }, [items])

  const visiblePreview = previewItems.filter(
    (item) => !isFocusedThisMonth(item, monthKey),
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      <p
        className="mb-4 shrink-0 font-hand text-xl text-ink/50"
        style={{ transform: 'rotate(-0.3deg)' }}
      >
        {hasLeftPicks ? 'more you might pick.' : 'nothing chosen yet.'}
      </p>

      {visiblePreview.length > 0 && (
        <div className="wishes-scroll min-h-0 flex-1">
          <ScrapCollage className="pb-6">
            {visiblePreview.map((item, index) => (
              <MonthPreviewCard
                key={item.id}
                item={item}
                listEmoji={listEmojiById.get(item.list_id) ?? '📋'}
                listTitle={listTitleById.get(item.list_id) ?? 'lists'}
                index={index}
                onCommit={onCommit}
              />
            ))}
          </ScrapCollage>
        </div>
      )}

      <div className="mt-4 shrink-0">
        <BrowseLink onClick={onBrowseLists} />
      </div>
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
  const { items, markDoneQuick, uncommitItem } = useLists()
  const [completing, setCompleting] = useState(false)
  const [showRollover, setShowRollover] = useState(() =>
    needsRolloverPrompt(item.id),
  )

  const liveItem = items.find((i) => i.id === item.id) ?? item

  async function handleDidIt() {
    if (liveItem.is_seeded) {
      await markDoneQuick(liveItem)
      return
    }
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
      <Scrap id={item.id} index={index} tapePosition="top-right">
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

          <div className="list-item-tier-actions mt-4">
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

export function ThisMonthRightPage({ onBrowseLists }: { onBrowseLists: () => void }) {
  const { items, lists, loading, commitItem } = useLists()
  const monthKey = currentMonthKey()

  const listEmojiById = useMemo(() => {
    const map = new Map<string, string>()
    for (const list of lists) {
      map.set(list.id, list.emoji?.trim() || '📋')
    }
    return map
  }, [lists])

  const listTitleById = useMemo(() => {
    const map = new Map<string, string>()
    for (const list of lists) {
      map.set(list.id, list.title)
    }
    return map
  }, [lists])

  const focused = useMemo(
    () => items.filter((i) => isFocusedThisMonth(i, monthKey)),
    [items, monthKey],
  )

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">opening this month…</p>
      </div>
    )
  }

  return (
    <EmptyMonthPreview
      items={items}
      listEmojiById={listEmojiById}
      listTitleById={listTitleById}
      onBrowseLists={onBrowseLists}
      onCommit={commitItem}
      hasLeftPicks={focused.length > 0}
    />
  )
}
