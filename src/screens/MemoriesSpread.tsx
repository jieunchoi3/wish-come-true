import { useMemo } from 'react'
import { PolaroidFrame } from '../components/PolaroidFrame'
import { Scrap } from '../components/primitives'
import { useLists } from '../hooks/useLists'
import type { ListItemView } from '../types/database'

export function MemoriesLeftPage() {
  return (
    <div className="flex h-full flex-col justify-center">
      <h1
        className="font-hand text-3xl text-ink/75"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        memories
      </h1>
      <p className="mt-3 font-hand text-xl text-ink/50">
        things you&apos;ve done. yours loom large; catalogue ticks stay small.
      </p>
    </div>
  )
}

export function MemoriesRightPage() {
  const { items, loading } = useLists()

  const done = useMemo(
    () =>
      items
        .filter((i) => i.status === 'done' && i.completed_at)
        .sort(
          (a, b) =>
            new Date(b.completed_at!).getTime() -
            new Date(a.completed_at!).getTime(),
        ),
    [items],
  )

  const userDone = done.filter((i) => !i.is_seeded)
  const seededDone = done.filter((i) => i.is_seeded)

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">loading memories…</p>
      </div>
    )
  }

  if (done.length === 0) {
    return (
      <p className="font-hand text-lg text-ink/45">
        nothing stamped yet. tick something off when you&apos;re ready.
      </p>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-6">
      {userDone.length > 0 && (
        <section className="grid grid-cols-2 gap-3">
          {userDone.map((item, i) => (
            <UserMemoryPolaroid key={item.id} item={item} index={i} />
          ))}
        </section>
      )}
      {seededDone.length > 0 && (
        <section className="flex flex-wrap gap-2 pt-2">
          {seededDone.map((item) => (
            <SeededMemoryStamp key={item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  )
}

function UserMemoryPolaroid({ item, index }: { item: ListItemView; index: number }) {
  const date = item.completed_at
    ? new Date(item.completed_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  return (
    <Scrap
      id={`memory-${item.id}`}
      index={index}
      tapePosition={index % 2 === 0 ? 'top-left' : 'top-right'}
      layout={false}
    >
      <div className="p-3">
        <PolaroidFrame className="w-full" placeholder={!item.completion_photo_url}>
          {item.completion_photo_url ? (
            <img
              src={item.completion_photo_url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : item.image_url ? (
            <img src={item.image_url} alt="" className="h-full w-full object-cover" />
          ) : null}
        </PolaroidFrame>
        <p className="mt-2 font-serif text-sm font-medium text-ink">{item.title}</p>
        {item.completion_note && (
          <p className="font-hand text-xs text-ink/55">{item.completion_note}</p>
        )}
        <p className="mt-1 font-hand text-xs text-ink/40">{date}</p>
      </div>
    </Scrap>
  )
}

function SeededMemoryStamp({ item }: { item: ListItemView }) {
  return (
    <span
      className="inline-block border border-stamp/30 px-2 py-0.5 font-hand text-sm text-stamp/80"
      style={{ transform: 'rotate(-2deg)' }}
    >
      {item.title}
    </span>
  )
}
