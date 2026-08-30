import { useMemo, useState } from 'react'
import { Scrap } from '../components/primitives'
import { useLists } from '../hooks/useLists'
import type { ListItemView, ListWithCounts } from '../types/database'

function formatAbandonedDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function AbandonedListCard({
  list,
  onRestore,
  onDelete,
}: {
  list: ListWithCounts
  onRestore: () => void
  onDelete: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    setBusy(true)
    await onDelete()
    setBusy(false)
  }

  return (
    <Scrap id={`abandoned-list-${list.id}`} index={0} layout={false} flat>
      <div className="px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden>
            {list.emoji ?? '📋'}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg text-ink">{list.title}</h3>
            <p className="font-hand text-sm text-ink/45">
              {list.totalCount} things · abandoned{' '}
              {formatAbandonedDate(list.abandoned_at)}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-hand text-sm text-ink/50">
          <button
            type="button"
            disabled={busy}
            onClick={onRestore}
            className="underline decoration-dotted hover:text-ink/75 disabled:opacity-40"
          >
            bring back
          </button>
          {confirmDelete ? (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleDelete()}
                className="text-stamp/80 underline decoration-dotted"
              >
                yes, delete forever
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="underline decoration-dotted"
              >
                keep in sea
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-stamp/70 underline decoration-dotted"
            >
              delete forever
            </button>
          )}
        </div>
      </div>
    </Scrap>
  )
}

function AbandonedItemRow({
  item,
  listTitle,
  onRestore,
  onDelete,
}: {
  item: ListItemView
  listTitle: string
  onRestore: () => void
  onDelete: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleDelete() {
    setBusy(true)
    await onDelete()
    setBusy(false)
  }

  return (
    <li className="border-b border-ink/8 py-3">
      <p className="font-serif text-base text-ink">{item.title}</p>
      {item.note && (
        <p className="mt-0.5 font-hand text-sm text-ink/55">{item.note}</p>
      )}
      <p className="mt-1 font-hand text-xs text-ink/40">
        from {listTitle} · abandoned {formatAbandonedDate(item.abandoned_at)}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-hand text-sm text-ink/50">
        <button
          type="button"
          disabled={busy}
          onClick={onRestore}
          className="underline decoration-dotted hover:text-ink/75 disabled:opacity-40"
        >
          bring back
        </button>
        {confirmDelete ? (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleDelete()}
              className="text-stamp/80 underline decoration-dotted"
            >
              yes, delete forever
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="underline decoration-dotted"
            >
              keep in sea
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="text-stamp/70 underline decoration-dotted"
          >
            delete forever
          </button>
        )}
      </div>
    </li>
  )
}

export function SeaOfIdeasLeftPage() {
  const { abandonedItems, abandonedLists, loading } = useLists()
  const total = abandonedItems.length + abandonedLists.length

  return (
    <div className="flex h-full min-h-0 flex-col px-4 py-5 lg:px-6">
      <h2 className="font-hand text-lg text-ink/40">sea of ideas</h2>
      <p className="mt-3 font-hand text-base leading-relaxed text-ink/55">
        ideas you set aside — not gone, just resting until you&apos;re ready.
      </p>
      <p className="mt-4 font-hand text-sm text-ink/40">
        {loading
          ? 'loading…'
          : total === 0
            ? 'nothing here yet. abandon something from your lists when it no longer fits.'
            : `${total} thing${total === 1 ? '' : 's'} in the sea`}
      </p>
    </div>
  )
}

export function SeaOfIdeasRightPage() {
  const {
    lists,
    abandonedItems,
    abandonedLists,
    loading,
    restoreItem,
    restoreList,
    deleteItem,
    deleteList,
  } = useLists()

  const listTitles = useMemo(
    () => new Map(lists.map((list) => [list.id, list.title])),
    [lists],
  )

  const orphanedItems = useMemo(
    () =>
      abandonedItems.filter((item) => {
        const list = lists.find((l) => l.id === item.list_id)
        if (!list) return true
        if (list.is_seeded && abandonedLists.some((l) => l.id === list.id)) {
          return false
        }
        if (!list.is_seeded && list.abandoned_at) return false
        return true
      }),
    [abandonedItems, abandonedLists, lists],
  )

  if (loading) {
    return (
      <div className="px-4 py-8 font-hand text-lg text-ink/40 lg:px-6">
        gathering what you set aside…
      </div>
    )
  }

  if (abandonedLists.length === 0 && orphanedItems.length === 0) {
    return (
      <div className="px-4 py-8 lg:px-6">
        <p className="font-hand text-lg text-ink/45">
          the sea is calm — no abandoned ideas yet.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 lg:px-6">
      {abandonedLists.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 font-hand text-sm text-ink/40">whole lists</h3>
          <div className="space-y-4">
            {abandonedLists.map((list) => (
              <AbandonedListCard
                key={list.id}
                list={list}
                onRestore={() => void restoreList(list.id)}
                onDelete={() => void deleteList(list.id)}
              />
            ))}
          </div>
        </section>
      )}

      {orphanedItems.length > 0 && (
        <section>
          <h3 className="mb-3 font-hand text-sm text-ink/40">individual ideas</h3>
          <ul>
            {orphanedItems.map((item) => (
              <AbandonedItemRow
                key={item.id}
                item={item}
                listTitle={listTitles.get(item.list_id) ?? 'a list'}
                onRestore={() => void restoreItem(item.id)}
                onDelete={() => void deleteItem(item.id)}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
