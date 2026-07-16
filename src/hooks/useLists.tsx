import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { computeEngagedListIds } from '../lib/listQueries'
import {
  clearCommittedMonth,
  recordCommittedMonth,
} from '../lib/committedMonth'
import { DISMISSED_SNOOZE_UNTIL, isItemDismissed } from '../lib/dismissed'
import {
  dismissListId,
  loadDismissedListIds,
} from '../lib/dismissedLists'
import { TABLES } from '../lib/tables'
import { supabase } from '../lib/supabase'
import type { ListItemView, ListWithCounts } from '../types/database'
import type {
  List,
  ListItem,
  ListItemInsert,
  ListItemProgress,
  ListItemUpdate,
} from '../types/supabase'

export interface CreateListItemInput {
  list_id: string
  title: string
  note?: string | null
  category?: ListItemInsert['category']
  image_url?: string | null
  time_needed?: ListItemInsert['time_needed']
  cost?: ListItemInsert['cost']
  company?: ListItemInsert['company']
  setting?: ListItemInsert['setting']
  seasons?: string[]
  topic_tags?: string[]
}

interface ListsContextValue {
  lists: ListWithCounts[]
  items: ListItemView[]
  engagedListIds: Set<string>
  loading: boolean
  error: string | null
  clearError: () => void
  refresh: () => Promise<void>
  itemsForList: (listId: string) => ListItemView[]
  createList: (title: string, emoji?: string) => Promise<List | null>
  updateList: (id: string, patch: { title?: string; emoji?: string | null }) => Promise<boolean>
  deleteList: (id: string) => Promise<boolean>
  createItem: (input: CreateListItemInput) => Promise<ListItemView | null>
  updateItem: (id: string, patch: ListItemUpdate, isSeeded: boolean) => Promise<void>
  markDone: (item: ListItemView) => Promise<void>
  markDoneQuick: (item: ListItemView) => Promise<void>
  undoDone: (item: ListItemView) => Promise<void>
  deleteItem: (id: string) => Promise<boolean>
  markSurfaced: (item: ListItemView) => Promise<void>
  commitItem: (item: ListItemView) => Promise<void>
  uncommitItem: (item: ListItemView) => Promise<void>
}

const ListsContext = createContext<ListsContextValue | null>(null)

function mergeItem(
  row: ListItem,
  progress: ListItemProgress | undefined,
): ListItemView {
  if (row.is_seeded && progress) {
    return {
      ...row,
      status: progress.status,
      completed_at: progress.completed_at,
      completion_photo_url: progress.completion_photo_url,
      completion_note: progress.completion_note,
      snoozed_until: progress.snoozed_until,
      last_surfaced_at: progress.last_surfaced_at,
      surfaced_count: progress.surfaced_count,
      last_notified_at: progress.last_notified_at,
    }
  }
  return { ...row }
}

/** Keep optimistic user rows when a stale fetch completes after local writes. */
function mergePendingLists(prev: List[], fetched: List[]): List[] {
  const fetchedIds = new Set(fetched.map((l) => l.id))
  const pending = prev.filter((l) => !l.is_seeded && !fetchedIds.has(l.id))
  return [...pending, ...fetched].sort(
    (a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title),
  )
}

function mergePendingItems(prev: ListItem[], fetched: ListItem[]): ListItem[] {
  const fetchedIds = new Set(fetched.map((i) => i.id))
  const pending = prev.filter((i) => !i.is_seeded && !fetchedIds.has(i.id))
  return [...pending, ...fetched]
}

export function ListsProvider({
  children,
  userId,
}: {
  children: ReactNode
  userId: string
}) {
  const [lists, setLists] = useState<List[]>([])
  const [rawItems, setRawItems] = useState<ListItem[]>([])
  const [progressMap, setProgressMap] = useState<Map<string, ListItemProgress>>(
    new Map(),
  )
  const [dismissedListIds, setDismissedListIds] = useState<Set<string>>(
    () => loadDismissedListIds(),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchGenerationRef = useRef(0)

  const fetchAll = useCallback(async (opts?: { silent?: boolean }) => {
    if (!supabase) {
      setError('supabase is not configured')
      setLoading(false)
      return
    }

    const generation = ++fetchGenerationRef.current

    if (!opts?.silent) setLoading(true)
    try {
      const listsRes = await supabase
        .from(TABLES.lists)
        .select('*')
        .order('sort_order')

      if (listsRes.error) {
        setError(listsRes.error.message)
        return
      }

      if ((listsRes.data ?? []).filter((l) => l.is_seeded).length === 0) {
        setError('no lists found — run migrations and seed')
        return
      }

      if (generation !== fetchGenerationRef.current) return

      setError(null)
      setLists((prev) => mergePendingLists(prev, listsRes.data ?? []))
      if (!opts?.silent) setLoading(false)

      // Items + progress load after the shell is visible (catalogue is large)
      const [itemsRes, progressRes] = await Promise.all([
        supabase.from(TABLES.items).select('*').order('sort_order'),
        supabase.from(TABLES.itemProgress).select('*'),
      ])

      if (itemsRes.error) {
        setError(itemsRes.error.message)
        return
      }
      if (progressRes.error) {
        setError(progressRes.error.message)
        return
      }

      if (generation !== fetchGenerationRef.current) return

      setRawItems((prev) => mergePendingItems(prev, itemsRes.data ?? []))
      const pmap = new Map<string, ListItemProgress>()
      for (const p of progressRes.data ?? []) {
        pmap.set(p.list_item_id, p)
      }
      setProgressMap(pmap)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'could not load lists')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const items = useMemo(
    () =>
      rawItems
        .map((row) =>
          mergeItem(row, row.is_seeded ? progressMap.get(row.id) : undefined),
        )
        .filter((row) => !isItemDismissed(row)),
    [rawItems, progressMap],
  )

  const listsWithCounts = useMemo((): ListWithCounts[] => {
    return lists
      .filter((list) => !dismissedListIds.has(list.id))
      .map((list) => {
        const listItems = items.filter((i) => i.list_id === list.id)
        const total = listItems.length
        const done = listItems.filter((i) => i.status === 'done').length
        return { ...list, doneCount: done, totalCount: total }
      })
  }, [lists, items, dismissedListIds])

  const engagedListIds = useMemo(() => {
    const doneSeeded = new Set(
      [...progressMap.entries()]
        .filter(([, p]) => p.status === 'done')
        .map(([id]) => id),
    )
    return computeEngagedListIds(items, doneSeeded)
  }, [items, progressMap])

  const clearError = useCallback(() => setError(null), [])

  const itemsForList = useCallback(
    (listId: string) =>
      items
        .filter((i) => i.list_id === listId)
        .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title)),
    [items],
  )

  const createList = useCallback(async (title: string, emoji = '📝') => {
    if (!supabase || !userId) return null

    const { data, error: insertError } = await supabase
      .from(TABLES.lists)
      .insert({
        user_id: userId,
        title,
        emoji,
        is_seeded: false,
        sort_order: 0,
      })
      .select()
      .single()

    if (insertError || !data) {
      setError(insertError?.message ?? 'could not create list')
      return null
    }
    setLists((prev) => [data, ...prev.filter((l) => l.id !== data.id)])
    setError(null)
    return data
  }, [userId])

  const updateList = useCallback(
    async (
      id: string,
      patch: { title?: string; emoji?: string | null },
    ): Promise<boolean> => {
      if (!supabase) return false
      const list = lists.find((l) => l.id === id)
      if (!list) return false
      if (list.is_seeded) {
        // Catalogue lists are shared — rename only personal lists
        return false
      }

      setLists((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...patch } : l)),
      )

      const { error: updateError } = await supabase
        .from(TABLES.lists)
        .update(patch)
        .eq('id', id)
        .eq('is_seeded', false)

      if (updateError) {
        await fetchAll({ silent: true })
        return false
      }
      return true
    },
    [fetchAll, lists],
  )

  const deleteList = useCallback(
    async (id: string): Promise<boolean> => {
      if (!supabase) return false
      const list = lists.find((l) => l.id === id)
      if (!list) return false

      // Imported catalogues: hide for you (can't hard-delete shared seed)
      if (list.is_seeded) {
        setDismissedListIds(dismissListId(id))
        return true
      }

      setLists((prev) => prev.filter((l) => l.id !== id))
      setRawItems((prev) => prev.filter((i) => i.list_id !== id))

      const { error: deleteError } = await supabase
        .from(TABLES.lists)
        .delete()
        .eq('id', id)
        .eq('is_seeded', false)

      if (deleteError) {
        await fetchAll({ silent: true })
        return false
      }
      return true
    },
    [fetchAll, lists],
  )

  const createItem = useCallback(
    async (input: CreateListItemInput): Promise<ListItemView | null> => {
      if (!supabase || !userId) {
        setError('not signed in — could not add item')
        return null
      }

      const row: ListItemInsert = {
        list_id: input.list_id,
        user_id: userId,
        title: input.title,
        note: input.note ?? null,
        category: input.category ?? 'micro_joys',
        image_url: input.image_url ?? null,
        is_seeded: false,
        time_needed: input.time_needed ?? 'few_hours',
        cost: input.cost ?? 'cheap',
        company: input.company ?? 'any',
        setting: input.setting ?? 'home',
        seasons: input.seasons ?? [],
        topic_tags: input.topic_tags ?? [],
        status: 'open',
      }

      const { data, error: insertError } = await supabase
        .from(TABLES.items)
        .insert(row)
        .select()
        .single()

      if (insertError || !data) {
        setError(insertError?.message ?? 'could not add item')
        return null
      }
      setRawItems((prev) => [data, ...prev.filter((i) => i.id !== data.id)])
      setError(null)
      return mergeItem(data, undefined)
    },
    [userId],
  )

  const updateItem = useCallback(
    async (id: string, patch: ListItemUpdate, isSeeded: boolean) => {
      if (!supabase) return

      if (isSeeded) {
        // Optimistic: flip UI immediately, sync in the background
        setProgressMap((prev) => {
          const existing = prev.get(id)
          const optimistic: ListItemProgress = {
            user_id: existing?.user_id ?? '',
            list_item_id: id,
            status: patch.status ?? existing?.status ?? 'open',
            completed_at:
              patch.completed_at !== undefined
                ? patch.completed_at
                : (existing?.completed_at ?? null),
            completion_photo_url:
              patch.completion_photo_url !== undefined
                ? patch.completion_photo_url
                : (existing?.completion_photo_url ?? null),
            completion_note:
              patch.completion_note !== undefined
                ? patch.completion_note
                : (existing?.completion_note ?? null),
            snoozed_until:
              patch.snoozed_until !== undefined
                ? patch.snoozed_until
                : (existing?.snoozed_until ?? null),
            last_surfaced_at:
              patch.last_surfaced_at !== undefined
                ? patch.last_surfaced_at
                : (existing?.last_surfaced_at ?? null),
            surfaced_count:
              patch.surfaced_count !== undefined
                ? patch.surfaced_count
                : (existing?.surfaced_count ?? 0),
            last_notified_at:
              patch.last_notified_at !== undefined
                ? patch.last_notified_at
                : (existing?.last_notified_at ?? null),
            updated_at: new Date().toISOString(),
          }
          return new Map(prev).set(id, optimistic)
        })

        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          // Background sync failed — don't flash the full-page loader
          await fetchAll({ silent: true })
          return
        }

        const progPatch = {
          status: patch.status,
          completed_at: patch.completed_at,
          completion_photo_url: patch.completion_photo_url,
          completion_note: patch.completion_note,
          snoozed_until: patch.snoozed_until,
          last_surfaced_at: patch.last_surfaced_at,
          surfaced_count: patch.surfaced_count,
          last_notified_at: patch.last_notified_at,
        }

        const { data, error: upsertError } = await supabase
          .from(TABLES.itemProgress)
          .upsert(
            { user_id: user.id, list_item_id: id, ...progPatch },
            { onConflict: 'user_id,list_item_id' },
          )
          .select()
          .single()

        if (upsertError) {
          setError(upsertError.message)
          await fetchAll({ silent: true })
          return
        }
        if (data) {
          setProgressMap((prev) => new Map(prev).set(id, data))
        }
        return
      }

      setRawItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      )

      const { error: updateError } = await supabase
        .from(TABLES.items)
        .update(patch)
        .eq('id', id)

      if (updateError) {
        setError(updateError.message)
        await fetchAll()
      }
    },
    [fetchAll],
  )

  const markDoneQuick = useCallback(
    async (item: ListItemView) => {
      const now = new Date().toISOString()
      await updateItem(
        item.id,
        { status: 'done', completed_at: now },
        item.is_seeded,
      )
    },
    [updateItem],
  )

  const markDone = useCallback(
    async (item: ListItemView) => {
      if (item.is_seeded) {
        await markDoneQuick(item)
        return
      }
      // Full completion sheet handled by UI — markDoneQuick for seeded only here
      await markDoneQuick(item)
    },
    [markDoneQuick],
  )

  const undoDone = useCallback(
    async (item: ListItemView) => {
      await updateItem(
        item.id,
        {
          status: 'open',
          completed_at: null,
          completion_photo_url: null,
          completion_note: null,
        },
        item.is_seeded,
      )
    },
    [updateItem],
  )

  const commitItem = useCallback(
    async (item: ListItemView) => {
      await updateItem(item.id, { status: 'committed' }, item.is_seeded)
      recordCommittedMonth(item.id)
    },
    [updateItem],
  )

  const uncommitItem = useCallback(
    async (item: ListItemView) => {
      await updateItem(item.id, { status: 'open' }, item.is_seeded)
      clearCommittedMonth(item.id)
    },
    [updateItem],
  )

  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      if (!supabase) return false
      const item = rawItems.find((i) => i.id === id)
      if (!item) return false

      // Imported catalogue rows stay in the shared seed — dismiss them for you only.
      if (item.is_seeded) {
        const existing = progressMap.get(id)
        const optimistic: ListItemProgress = {
          user_id: existing?.user_id ?? '',
          list_item_id: id,
          status: existing?.status ?? 'open',
          completed_at: existing?.completed_at ?? null,
          completion_photo_url: existing?.completion_photo_url ?? null,
          completion_note: existing?.completion_note ?? null,
          snoozed_until: DISMISSED_SNOOZE_UNTIL,
          last_surfaced_at: existing?.last_surfaced_at ?? null,
          surfaced_count: existing?.surfaced_count ?? 0,
          last_notified_at: existing?.last_notified_at ?? null,
          updated_at: new Date().toISOString(),
        }
        setProgressMap((prev) => new Map(prev).set(id, optimistic))

        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          await fetchAll({ silent: true })
          return false
        }

        const { data, error: upsertError } = await supabase
          .from(TABLES.itemProgress)
          .upsert(
            {
              user_id: user.id,
              list_item_id: id,
              status: optimistic.status,
              completed_at: optimistic.completed_at,
              completion_photo_url: optimistic.completion_photo_url,
              completion_note: optimistic.completion_note,
              snoozed_until: DISMISSED_SNOOZE_UNTIL,
              last_surfaced_at: optimistic.last_surfaced_at,
              surfaced_count: optimistic.surfaced_count,
              last_notified_at: optimistic.last_notified_at,
            },
            { onConflict: 'user_id,list_item_id' },
          )
          .select()
          .single()

        if (upsertError) {
          await fetchAll({ silent: true })
          return false
        }
        if (data) {
          setProgressMap((prev) => new Map(prev).set(id, data))
        }
        return true
      }

      setRawItems((prev) => prev.filter((i) => i.id !== id))
      const { error: deleteError } = await supabase
        .from(TABLES.items)
        .delete()
        .eq('id', id)
        .eq('is_seeded', false)
      if (deleteError) {
        await fetchAll({ silent: true })
        return false
      }
      return true
    },
    [fetchAll, progressMap, rawItems],
  )

  const markSurfaced = useCallback(
    async (item: ListItemView) => {
      const now = new Date().toISOString()
      await updateItem(
        item.id,
        {
          last_surfaced_at: now,
          surfaced_count: item.surfaced_count + 1,
        },
        item.is_seeded,
      )
    },
    [updateItem],
  )

  const value = useMemo(
    () => ({
      lists: listsWithCounts,
      items,
      engagedListIds,
      loading,
      error,
      clearError,
      refresh: fetchAll,
      itemsForList,
      createList,
      updateList,
      deleteList,
      createItem,
      updateItem,
      markDone,
      markDoneQuick,
      undoDone,
      deleteItem,
      markSurfaced,
      commitItem,
      uncommitItem,
    }),
    [
      listsWithCounts,
      items,
      engagedListIds,
      loading,
      error,
      clearError,
      fetchAll,
      itemsForList,
      createList,
      updateList,
      deleteList,
      createItem,
      updateItem,
      markDone,
      markDoneQuick,
      undoDone,
      deleteItem,
      markSurfaced,
      commitItem,
      uncommitItem,
    ],
  )

  return (
    <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
  )
}

export function useLists(): ListsContextValue {
  const ctx = useContext(ListsContext)
  if (!ctx) throw new Error('useLists must be used within ListsProvider')
  return ctx
}
