import { useMemo, useState } from 'react'
import { ScrapCollage } from '../components/ScrapCollage'
import { ListAccordion } from '../components/lists/ListAccordion'
import { ReorderableListCards } from '../components/lists/ReorderableListCards'
import { NewListSheet } from '../components/lists/NewListSheet'
import { ListsSearchBar } from '../components/lists/ListsSearchBar'
import { ListItemRow } from '../components/lists/ListItemRow'
import { useLists } from '../hooks/useLists'
import { searchListsAndItems } from '../lib/smartSearch'
import type { ListItemView, ListWithCounts } from '../types/database'
import { useListsTab } from './listsTabState'

function PageHeading({ children }: { children: string }) {
  return (
    <h2
      className="mb-2 shrink-0 font-hand text-lg text-ink/40"
      style={{ transform: 'rotate(-0.3deg)' }}
    >
      {children}
    </h2>
  )
}

function ListCards({
  lists,
  openListId,
  onReorder,
}: {
  lists: ListWithCounts[]
  openListId?: string | null
  onReorder?: (orderedIds: string[]) => void | Promise<unknown>
}) {
  if (onReorder) {
    return (
      <ReorderableListCards
        lists={lists}
        openListId={openListId}
        onReorder={(ids) => onReorder(ids)}
      />
    )
  }

  return (
    <ScrapCollage className="pb-8">
      {lists.map((list) => (
        <ListAccordion
          key={list.id}
          list={list}
          defaultOpen={openListId != null && list.id === openListId}
        />
      ))}
    </ScrapCollage>
  )
}

/** Left spread — seeded / catalogue lists (desktop only). */
export function ListsLeftPage() {
  const { lists, loading, reorderLists } = useLists()
  const { query, setQuery } = useListsTab()
  const seededLists = lists.filter((l) => l.is_seeded)

  if (loading) {
    return (
      <div className="hidden h-full items-center justify-center lg:flex">
        <p className="font-hand text-lg text-ink/30">loading lists…</p>
      </div>
    )
  }

  return (
    <div className="hidden h-full min-h-0 flex-col lg:flex">
      <div className="mb-3 shrink-0">
        <ListsSearchBar value={query} onChange={setQuery} />
      </div>
      <div className="wishes-scroll min-h-0 flex-1">
        <ListCards
          lists={seededLists}
          onReorder={(ids) => reorderLists(ids, { seeded: true })}
        />
      </div>
    </div>
  )
}

/** Right spread — my lists (+ mobile combines both sides). */
export function ListsRightPage() {
  const { lists, items, loading, createList, reorderLists, error, clearError } = useLists()
  const { query, setQuery } = useListsTab()
  const [newListOpen, setNewListOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [openListId, setOpenListId] = useState<string | null>(null)

  const userLists = lists.filter((l) => !l.is_seeded)
  const seededLists = lists.filter((l) => l.is_seeded)
  const searching = query.trim().length > 0

  const listMeta = useMemo(() => {
    const map = new Map<string, { title: string; emoji: string | null }>()
    for (const l of lists) map.set(l.id, { title: l.title, emoji: l.emoji })
    return map
  }, [lists])

  const hits = useMemo(
    () =>
      searching
        ? searchListsAndItems(query, lists, items, listMeta)
        : [],
    [searching, query, lists, items, listMeta],
  )

  const listHits = hits.filter((h) => h.kind === 'list')
  const itemHits = hits.filter((h) => h.kind === 'item')

  const listById = useMemo(() => {
    const map = new Map<string, ListWithCounts>()
    for (const l of lists) map.set(l.id, l)
    return map
  }, [lists])

  const itemById = useMemo(() => {
    const map = new Map<string, ListItemView>()
    for (const i of items) map.set(i.id, i)
    return map
  }, [items])

  async function handleCreateList(title: string, emoji: string, ratingEnabled: boolean) {
    setCreating(true)
    setCreateError(null)
    clearError()
    const created = await createList(title, emoji, ratingEnabled)
    setCreating(false)
    if (!created) {
      setCreateError('couldn’t create that list — try again')
      return
    }
    setOpenListId(created.id)
    setNewListOpen(false)
  }

  const listControls = (
    <div className="mb-3 shrink-0 lg:hidden">
      <ListsSearchBar value={query} onChange={setQuery} />
    </div>
  )

  const userListBody = searching ? (
    <SearchResults
      query={query}
      listHits={listHits}
      itemHits={itemHits}
      listById={listById}
      itemById={itemById}
    />
  ) : (
    <>
      {userLists.length === 0 && (
        <p className="mb-4 font-hand text-base text-ink/45">
          nothing yet. add your own whenever something catches you.
        </p>
      )}
      <ListCards
        lists={userLists}
        openListId={openListId}
        onReorder={(ids) => reorderLists(ids)}
      />
    </>
  )

  if (loading) {
    return (
      <div className="flex h-full flex-col">
        {listControls}
        <div className="flex flex-1 items-center justify-center">
          <p className="font-hand text-lg text-ink/30">loading lists…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {listControls}

      {newListOpen && (
        <NewListSheet
          busy={creating}
          error={
            createError ?? (error && error.includes('create') ? error : null)
          }
          onClose={() => {
            setNewListOpen(false)
            setCreateError(null)
          }}
          onCreate={handleCreateList}
        />
      )}

      {/* Desktop — your lists scroll independently under the rings */}
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <PageHeading>your lists</PageHeading>
        <div className="wishes-scroll min-h-0 flex-1 pb-16">{userListBody}</div>
      </div>

      {/* Mobile — one column: my lists, then catalogue */}
      <div className="pb-20 lg:hidden">
        <PageHeading>your lists</PageHeading>
        {userListBody}

        {!searching && seededLists.length > 0 && (
          <div className="mt-6 border-t border-ink/10 pt-6">
            <ListCards
              lists={seededLists}
              onReorder={(ids) => reorderLists(ids, { seeded: true })}
            />
          </div>
        )}
      </div>

      {!searching && (
        <button
          type="button"
          onClick={() => {
            setCreateError(null)
            setNewListOpen(true)
          }}
          className="lists-fab absolute bottom-5 right-4 z-20 flex h-12 w-12 items-center justify-center font-hand text-3xl leading-none text-ink/65 transition hover:scale-[1.04] hover:text-ink active:scale-[0.98]"
          aria-label="new list"
        >
          +
        </button>
      )}
    </div>
  )
}

function SearchResults({
  query,
  listHits,
  itemHits,
  listById,
  itemById,
}: {
  query: string
  listHits: ReturnType<typeof searchListsAndItems>
  itemHits: ReturnType<typeof searchListsAndItems>
  listById: Map<string, ListWithCounts>
  itemById: Map<string, ListItemView>
}) {
  const listsOnly = listHits.filter((h) => h.kind === 'list')
  const itemsOnly = itemHits.filter((h) => h.kind === 'item')
  const empty = listsOnly.length === 0 && itemsOnly.length === 0

  if (empty) {
    return (
      <p className="font-hand text-lg text-ink/40">
        nothing like “{query.trim()}” yet
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {listsOnly.length > 0 && (
        <section>
          <p className="mb-2 font-hand text-base text-ink/40">lists</p>
          {listsOnly.map((hit) => {
            if (hit.kind !== 'list') return null
            const full = listById.get(hit.list.id)
            if (!full) return null
            return <ListAccordion key={full.id} list={full} defaultOpen />
          })}
        </section>
      )}

      {itemsOnly.length > 0 && (
        <section>
          <p className="mb-2 font-hand text-base text-ink/40">things</p>
          <div className="space-y-1">
            {itemsOnly.map((hit) => {
              if (hit.kind !== 'item') return null
              const full = itemById.get(hit.item.id)
              if (!full) return null
              return (
                <div key={full.id} className="border-b border-ink/8 pb-2">
                  <p className="mb-1 font-hand text-xs text-ink/40">
                    {hit.listEmoji ? `${hit.listEmoji} ` : ''}
                    {hit.listTitle}
                  </p>
                  <ul>
                    <ListItemRow item={full} />
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
