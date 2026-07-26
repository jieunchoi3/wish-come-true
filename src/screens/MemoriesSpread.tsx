import { useEffect, useMemo } from 'react'
import { RubberStamp } from '../components/ScrapbookElements'
import { PolaroidFrame } from '../components/PolaroidFrame'
import { ScrapCollage } from '../components/ScrapCollage'
import { Scrap } from '../components/primitives'
import {
  CATEGORY_ACCENTS,
  categoryEmoji,
} from '../constants/wishMeta'
import { useLists } from '../hooks/useLists'
import {
  formatDoneStampDate,
  hashString,
} from '../lib/utils'
import type { ListItemView } from '../types/database'
import {
  adjacentChapterId,
  buildContents,
  chapterItems,
  defaultChapterId,
  type ContentsEntry as ContentsRow,
} from './memoriesData'
import { useMemoriesTab } from './memoriesTabState'

function listEmoji(list: { emoji: string | null; title: string }): string {
  return list.emoji?.trim() || '📋'
}

function formatCaptionDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function denseOffset(index: number, id: string): { marginTop: number; marginLeft: number } {
  const h = Math.abs(hashString(`${id}:dense`))
  return {
    marginTop: index < 2 ? 0 : 4 + (h % 4),
    marginLeft: (h % 11) - 5,
  }
}

function PageCurl({
  direction,
  onClick,
  label,
  disabled = false,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`memory-page-curl memory-page-curl--${direction}${
        disabled ? ' memory-page-curl--disabled' : ''
      }`}
      aria-label={label}
    />
  )
}

function chapterPageClass(
  anim: 'idle' | 'leave' | 'enter',
  direction: 'next' | 'prev' | null,
): string {
  if (anim === 'idle' || !direction) return 'memory-chapter-page'
  return `memory-chapter-page memory-chapter-page--${anim}-${direction}`
}

export function MemoriesLeftPage() {
  const { lists, items, loading } = useLists()
  const { activeChapterId, setInitialChapter } = useMemoriesTab()
  const contents = useMemo(() => buildContents(lists, items), [lists, items])

  useEffect(() => {
    if (activeChapterId !== null) return
    const id = defaultChapterId(contents)
    if (id) setInitialChapter(id)
  }, [activeChapterId, contents, setInitialChapter])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">loading contents…</p>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h1
        className="mb-4 shrink-0 font-hand text-2xl text-ink/70 lg:text-3xl"
        style={{ transform: 'rotate(-0.6deg)' }}
      >
        contents
      </h1>

      {contents.length === 0 ? (
        <p
          className="font-hand text-lg text-ink/45"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          nothing in the contents yet. go do something.
        </p>
      ) : (
        <nav
          className="wishes-scroll min-h-0 flex-1"
          aria-label="Memory chapters"
        >
          <ul className="space-y-1 pb-4">
            {contents.map(({ list, count }, index) => {
              const active = list.id === activeChapterId
              return (
                <li key={list.id}>
                  <ContentsEntry
                    list={list}
                    count={count}
                    active={active}
                    index={index}
                    contents={contents}
                  />
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}

function ContentsEntry({
  list,
  count,
  active,
  index,
  contents,
}: {
  list: { id: string; title: string; emoji: string | null }
  count: number
  active: boolean
  index: number
  contents: ContentsRow[]
}) {
  const { selectChapter, activeChapterId } = useMemoriesTab()

  return (
    <button
      type="button"
      onClick={() => {
        if (list.id === activeChapterId) return
        const currentIdx = contents.findIndex((c) => c.list.id === activeChapterId)
        const direction =
          currentIdx === -1 || index >= currentIdx ? 'next' : 'prev'
        selectChapter(list.id, direction)
      }}
      className={`memory-contents-entry w-full px-1 py-2 text-left transition-colors ${
        active
          ? 'font-medium text-ink'
          : 'text-ink/65 hover:text-ink/80'
      }`}
      style={{
        transform: `rotate(${(index % 3) * 0.25 - 0.25}deg)`,
      }}
    >
      <span className="flex items-baseline gap-1">
        <span className="shrink-0 text-base" aria-hidden>
          {listEmoji(list)}
        </span>
        <span className="min-w-0 truncate font-hand text-base leading-snug">
          {list.title}
        </span>
        <span
          className="mx-1 min-w-[1.5rem] flex-1 translate-y-[-2px] border-b border-dotted border-ink/20"
          aria-hidden
        />
        <span className="shrink-0 font-hand text-sm tabular-nums text-ink/50">
          {count}
        </span>
      </span>
    </button>
  )
}

export function MemoriesRightPage() {
  const { lists, items, loading } = useLists()
  const {
    activeChapterId,
    chapterAnim,
    flipDirection,
    openMemory,
    goToChapter,
    setInitialChapter,
  } = useMemoriesTab()

  const contents = useMemo(() => buildContents(lists, items), [lists, items])
  const activeList = contents.find((c) => c.list.id === activeChapterId)?.list

  const done = useMemo(
    () => (activeChapterId ? chapterItems(items, activeChapterId) : []),
    [items, activeChapterId],
  )

  useEffect(() => {
    if (activeChapterId !== null) return
    const id = defaultChapterId(contents)
    if (id) setInitialChapter(id)
  }, [activeChapterId, contents, setInitialChapter])

  useEffect(() => {
    if (!activeChapterId || contents.some((c) => c.list.id === activeChapterId)) {
      return
    }
    const fallback = defaultChapterId(contents)
    if (fallback) setInitialChapter(fallback)
  }, [activeChapterId, contents, setInitialChapter])

  const chapterFlipping = chapterAnim !== 'idle'

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">loading memories…</p>
      </div>
    )
  }

  if (contents.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="memory-empty-polaroid bg-white p-2 pb-10 shadow-[1px_2px_6px_rgba(44,42,38,0.1)]">
          <div className="aspect-[4/5] w-40 border border-dashed border-ink/15 bg-paper-shadow/20" />
        </div>
        <p className="mt-6 font-hand text-lg text-ink/45">
          nothing here yet. go and do something.
        </p>
      </div>
    )
  }

  const showNav = contents.length > 1

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {activeList && (
        <h2
          className="mb-3 shrink-0 font-serif text-2xl font-medium text-ink lg:text-3xl"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          <span className="mr-2" aria-hidden>
            {listEmoji(activeList)}
          </span>
          {activeList.title}
        </h2>
      )}

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="memory-chapter-flip-viewport h-full">
          <div
            key={activeChapterId ?? 'none'}
            className={chapterPageClass(chapterAnim, flipDirection)}
          >
            <div className="wishes-scroll memories-scroll h-full pb-14">
              {done.length === 0 ? (
                <p className="font-hand text-base text-ink/45">
                  no memories in this chapter yet.
                </p>
              ) : (
                <ScrapCollage className="grid grid-cols-3 gap-x-2 gap-y-3 items-start">
                  {done.map((item, index) => (
                    <MemoryPolaroid
                      key={item.id}
                      item={item}
                      index={index}
                      onOpen={() => openMemory(item)}
                    />
                  ))}
                </ScrapCollage>
              )}
            </div>
          </div>
        </div>

        {showNav && activeChapterId && (
          <>
            <PageCurl
              direction="prev"
              label="Previous chapter"
              disabled={chapterFlipping}
              onClick={() => {
                const id = adjacentChapterId(contents, activeChapterId, 'prev')
                if (id) goToChapter(id, 'prev')
              }}
            />
            <PageCurl
              direction="next"
              label="Next chapter"
              disabled={chapterFlipping}
              onClick={() => {
                const id = adjacentChapterId(contents, activeChapterId, 'next')
                if (id) goToChapter(id, 'next')
              }}
            />
          </>
        )}

      </div>
    </div>
  )
}

function MemoryPolaroid({
  item,
  index,
  onOpen,
}: {
  item: ListItemView
  index: number
  onOpen: () => void
}) {
  const offset = denseOffset(index, item.id)
  const hasPhoto = Boolean(item.completion_photo_url)
  const accent = CATEGORY_ACCENTS[item.category]
  const stampDate = formatDoneStampDate(item.completed_at!)
  const captionDate = formatCaptionDate(item.completed_at!)
  const tapeSide = index % 3 === 0 ? 'top-left' : index % 3 === 1 ? 'top-right' : 'top-center'

  return (
    <div
      className="memory-polaroid-cell w-full"
      style={{
        marginTop: offset.marginTop,
        marginLeft: offset.marginLeft,
      }}
    >
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <Scrap
          id={`memory-${item.id}`}
          index={index}
          tapePosition={tapeSide}
          layout={false}
          className="w-full"
        >
          <div className="p-2">
            <PolaroidFrame
              className="w-full"
              overlay={
                <RubberStamp date={stampDate} size="sm" className="top-[34%]" />
              }
            >
              {hasPhoto ? (
                <img
                  src={item.completion_photo_url!}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-2 p-3"
                  style={{ backgroundColor: accent }}
                >
                  <span className="text-2xl" aria-hidden>
                    {categoryEmoji(item.category)}
                  </span>
                  <p className="line-clamp-3 text-center font-serif text-xs font-medium leading-snug text-ink/80">
                    {item.title}
                  </p>
                </div>
              )}
            </PolaroidFrame>
          </div>
        </Scrap>
        <div className="memory-polaroid-caption mt-1.5 px-1 pb-4">
          <p className="font-hand text-sm leading-snug text-ink/75">{item.title}</p>
          <p className="font-hand text-xs text-ink/40">{captionDate}</p>
        </div>
      </button>
    </div>
  )
}
