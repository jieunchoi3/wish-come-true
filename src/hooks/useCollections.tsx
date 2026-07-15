import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  categoryForCollection,
  mergeCollectionTags,
  type CollectionDefaultTags,
} from '../lib/collectionQueries'
import { supabase } from '../lib/supabase'
import type {
  Collection,
  CollectionGestureType,
  CollectionItem,
} from '../types/supabase'
import type { CollectionGesture } from '../types/database'
import { useWishes } from './useWishes'

export interface GestureMap {
  [collectionItemId: string]: CollectionGesture
}

export interface UndoEntry {
  itemId: string
  collectionId: string
  previousGesture: CollectionGesture | null
  wishId: string | null
}

interface CollectionsContextValue {
  collections: Collection[]
  itemsByCollection: Map<string, CollectionItem[]>
  gestures: GestureMap
  loading: boolean
  error: string | null
  clearError: () => void
  refresh: () => Promise<void>
  getGesture: (itemId: string) => CollectionGesture | null
  tickedCount: (collectionId: string) => number
  starredCount: (collectionId: string) => number
  applyGesture: (
    item: CollectionItem,
    collection: Collection,
    gesture: CollectionGestureType,
  ) => Promise<void>
  removeGesture: (itemId: string) => Promise<void>
  undoStack: UndoEntry[]
  undoLast: () => Promise<void>
  findWishForItem: (itemId: string) => string | null
}

const CollectionsContext = createContext<CollectionsContextValue | null>(null)

const MAX_UNDO = 5

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const { wishes, createWish, deleteWish } = useWishes()
  const [collections, setCollections] = useState<Collection[]>([])
  const [itemsByCollection, setItemsByCollection] = useState<
    Map<string, CollectionItem[]>
  >(new Map())
  const [gestures, setGestures] = useState<GestureMap>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [undoStack, setUndoStack] = useState<UndoEntry[]>([])

  const fetchAll = useCallback(async () => {
    if (!supabase) {
      setError('supabase is not configured')
      setLoading(false)
      return
    }

    const [colRes, itemRes, gestureRes] = await Promise.all([
      supabase
        .from('collections')
        .select('*')
        .eq('is_system', true)
        .order('slug'),
      supabase.from('collection_items').select('*').order('sort_order'),
      supabase.from('collection_gestures').select('*'),
    ])

    if (colRes.error || itemRes.error || gestureRes.error) {
      setError(
        colRes.error?.message ??
          itemRes.error?.message ??
          gestureRes.error?.message ??
          'could not load collections',
      )
      setLoading(false)
      return
    }

    if ((colRes.data ?? []).length === 0) {
      setError(
        'no collections found — run migrations and supabase/seed_collections.sql',
      )
      setLoading(false)
      return
    }

    setCollections(colRes.data ?? [])

    const byCol = new Map<string, CollectionItem[]>()
    for (const item of itemRes.data ?? []) {
      const list = byCol.get(item.collection_id) ?? []
      list.push(item)
      byCol.set(item.collection_id, list)
    }
    setItemsByCollection(byCol)

    const gMap: GestureMap = {}
    for (const g of gestureRes.data ?? []) {
      gMap[g.collection_item_id] = g.gesture
    }
    setGestures(gMap)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const clearError = useCallback(() => setError(null), [])

  const getGesture = useCallback(
    (itemId: string) => gestures[itemId] ?? null,
    [gestures],
  )

  const tickedCount = useCallback(
    (collectionId: string) => {
      const items = itemsByCollection.get(collectionId) ?? []
      return items.filter((i) => gestures[i.id] === 'ticked').length
    },
    [itemsByCollection, gestures],
  )

  const starredCount = useCallback(
    (collectionId: string) => {
      const items = itemsByCollection.get(collectionId) ?? []
      return items.filter((i) => gestures[i.id] === 'starred').length
    },
    [itemsByCollection, gestures],
  )

  const findWishForItem = useCallback(
    (itemId: string) =>
      wishes.find((w) => w.source_collection_item_id === itemId)?.id ?? null,
    [wishes],
  )

  const pushUndo = useCallback((entry: UndoEntry) => {
    setUndoStack((prev) => [entry, ...prev].slice(0, MAX_UNDO))
  }, [])

  const upsertGestureDb = async (
    itemId: string,
    gesture: CollectionGestureType,
    userId: string,
  ) => {
    if (!supabase) return false
    const { error: upsertError } = await supabase
      .from('collection_gestures')
      .upsert(
        {
          user_id: userId,
          collection_item_id: itemId,
          gesture,
        },
        { onConflict: 'user_id,collection_item_id' },
      )
    if (upsertError) {
      setError(upsertError.message)
      return false
    }
    return true
  }

  const deleteGestureDb = async (itemId: string) => {
    if (!supabase) return false
    const { error: delError } = await supabase
      .from('collection_gestures')
      .delete()
      .eq('collection_item_id', itemId)
    if (delError) {
      setError(delError.message)
      return false
    }
    return true
  }

  const applyGesture = useCallback(
    async (
      item: CollectionItem,
      collection: Collection,
      gesture: CollectionGestureType,
    ) => {
      if (!supabase) return
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const prevGesture = gestures[item.id] ?? null
      const prevWishId = findWishForItem(item.id)

      pushUndo({
        itemId: item.id,
        collectionId: collection.id,
        previousGesture: prevGesture,
        wishId: prevWishId,
      })

      setGestures((g) => ({ ...g, [item.id]: gesture }))

      if (gesture === 'starred') {
        const tags = mergeCollectionTags(
          collection.default_tags as CollectionDefaultTags,
          item.default_tags as CollectionDefaultTags,
        )
        const wish = await createWish({
          title: item.title,
          note: item.subtitle,
          category: categoryForCollection(collection.slug),
          source_collection_item_id: item.id,
          ...tags,
          status: 'someday',
        })
        if (!wish) {
          setGestures((g) => {
            const next = { ...g }
            if (prevGesture) next[item.id] = prevGesture
            else delete next[item.id]
            return next
          })
          return
        }
      } else if (prevGesture === 'starred') {
        const wishId = findWishForItem(item.id)
        if (wishId) await deleteWish(wishId)
      }

      const ok = await upsertGestureDb(item.id, gesture, user.id)
      if (!ok) {
        setGestures((g) => {
          const next = { ...g }
          if (prevGesture) next[item.id] = prevGesture
          else delete next[item.id]
          return next
        })
      }
    },
    [gestures, findWishForItem, pushUndo, createWish, deleteWish],
  )

  const removeGesture = useCallback(
    async (itemId: string) => {
      if (!supabase) return
      const prevGesture = gestures[itemId] ?? null
      if (!prevGesture) return

      let collectionId = ''
      for (const [cid, items] of itemsByCollection) {
        if (items.some((i) => i.id === itemId)) {
          collectionId = cid
          break
        }
      }

      const prevWishId = findWishForItem(itemId)
      pushUndo({
        itemId,
        collectionId,
        previousGesture: prevGesture,
        wishId: prevWishId,
      })

      setGestures((g) => {
        const next = { ...g }
        delete next[itemId]
        return next
      })

      if (prevGesture === 'starred' && prevWishId) {
        await deleteWish(prevWishId)
      }

      const ok = await deleteGestureDb(itemId)
      if (!ok) {
        setGestures((g) => ({ ...g, [itemId]: prevGesture }))
      }
    },
    [gestures, itemsByCollection, findWishForItem, pushUndo, deleteWish],
  )

  const undoLast = useCallback(async () => {
    const [entry, ...rest] = undoStack
    if (!entry || !supabase) return

    setUndoStack(rest)

    const currentWishId = findWishForItem(entry.itemId)
    if (currentWishId) await deleteWish(currentWishId)

    if (entry.previousGesture === null) {
      setGestures((g) => {
        const next = { ...g }
        delete next[entry.itemId]
        return next
      })
      await deleteGestureDb(entry.itemId)
      return
    }

    setGestures((g) => ({ ...g, [entry.itemId]: entry.previousGesture! }))

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    await upsertGestureDb(entry.itemId, entry.previousGesture!, user.id)

    if (entry.previousGesture === 'starred') {
      const collection = collections.find((c) => c.id === entry.collectionId)
      const items = itemsByCollection.get(entry.collectionId) ?? []
      const item = items.find((i) => i.id === entry.itemId)
      if (collection && item) {
        const tags = mergeCollectionTags(
          collection.default_tags as CollectionDefaultTags,
          item.default_tags as CollectionDefaultTags,
        )
        await createWish({
          title: item.title,
          note: item.subtitle,
          category: categoryForCollection(collection.slug),
          source_collection_item_id: item.id,
          ...tags,
          status: 'someday',
        })
      }
    }
  }, [
    undoStack,
    collections,
    itemsByCollection,
    findWishForItem,
    deleteWish,
    createWish,
  ])

  const value = useMemo(
    () => ({
      collections,
      itemsByCollection,
      gestures,
      loading,
      error,
      clearError,
      refresh: fetchAll,
      getGesture,
      tickedCount,
      starredCount,
      applyGesture,
      removeGesture,
      undoStack,
      undoLast,
      findWishForItem,
    }),
    [
      collections,
      itemsByCollection,
      gestures,
      loading,
      error,
      clearError,
      fetchAll,
      getGesture,
      tickedCount,
      starredCount,
      applyGesture,
      removeGesture,
      undoStack,
      undoLast,
      findWishForItem,
    ],
  )

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  )
}

export function useCollections(): CollectionsContextValue {
  const ctx = useContext(CollectionsContext)
  if (!ctx) {
    throw new Error('useCollections must be used within CollectionsProvider')
  }
  return ctx
}
