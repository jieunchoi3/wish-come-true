import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { computeEngagedListIds } from '../lib/listQueries'
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
  createItem: (input: CreateListItemInput) => Promise<ListItemView | null>
  updateItem: (id: string, patch: ListItemUpdate, isSeeded: boolean) => Promise<void>
  markDone: (item: ListItemView) => Promise<void>
  markDoneQuick: (item: ListItemView) => Promise<void>
  deleteItem: (id: string) => Promise<boolean>
  markSurfaced: (item: ListItemView) => Promise<void>
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

export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<List[]>([])
  const [rawItems, setRawItems] = useState<ListItem[]>([])
  const [progressMap, setProgressMap] = useState<Map<string, ListItemProgress>>(
    new Map(),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    if (!supabase) {
      setError('supabase is not configured')
      setLoading(false)
      return
    }

    setLoading(true)
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

      setError(null)
      setLists(listsRes.data ?? [])
      setLoading(false)

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

      setRawItems(itemsRes.data ?? [])
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
      rawItems.map((row) =>
        mergeItem(row, row.is_seeded ? progressMap.get(row.id) : undefined),
      ),
    [rawItems, progressMap],
  )

  const listsWithCounts = useMemo((): ListWithCounts[] => {
    return lists.map((list) => {
      const listItems = items.filter((i) => i.list_id === list.id)
      const total = list.is_seeded
        ? listItems.filter((i) => i.is_seeded).length
        : listItems.length
      const done = listItems.filter((i) => i.status === 'done').length
      return { ...list, doneCount: done, totalCount: total }
    })
  }, [lists, items])

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
    if (!supabase) return null
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error: insertError } = await supabase
      .from(TABLES.lists)
      .insert({
        user_id: user.id,
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
    setLists((prev) => [data, ...prev])
    return data
  }, [])

  const createItem = useCallback(
    async (input: CreateListItemInput): Promise<ListItemView | null> => {
      if (!supabase) return null
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return null

      const now = new Date().toISOString()
      const row: ListItemInsert = {
        list_id: input.list_id,
        user_id: user.id,
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
        created_at: now,
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
      setRawItems((prev) => [data, ...prev])
      return mergeItem(data, undefined)
    },
    [],
  )

  const updateItem = useCallback(
    async (id: string, patch: ListItemUpdate, isSeeded: boolean) => {
      if (!supabase) return

      if (isSeeded) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

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

  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      if (!supabase) return false
      setRawItems((prev) => prev.filter((i) => i.id !== id))
      const { error: deleteError } = await supabase
        .from(TABLES.items)
        .delete()
        .eq('id', id)
      if (deleteError) {
        setError(deleteError.message)
        await fetchAll()
        return false
      }
      return true
    },
    [fetchAll],
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
      createItem,
      updateItem,
      markDone,
      markDoneQuick,
      deleteItem,
      markSurfaced,
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
      createItem,
      updateItem,
      markDone,
      markDoneQuick,
      deleteItem,
      markSurfaced,
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
