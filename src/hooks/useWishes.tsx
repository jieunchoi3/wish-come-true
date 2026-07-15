import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase } from '../lib/supabase'
import { wasSurfacedToday } from '../lib/wishQueries'
import type { Wish, WishInsert, WishUpdate } from '../types/supabase'

export interface CreateWishInput {
  title: string
  note?: string | null
  category?: WishInsert['category']
  image_url?: string | null
  source_collection_item_id?: string | null
  time_needed?: WishInsert['time_needed']
  cost?: WishInsert['cost']
  company?: WishInsert['company']
  setting?: WishInsert['setting']
  seasons?: string[]
  topic_tags?: string[]
  status?: WishInsert['status']
}

interface WishesContextValue {
  wishes: Wish[]
  loading: boolean
  error: string | null
  clearError: () => void
  createWish: (input: CreateWishInput) => Promise<Wish | null>
  updateWish: (id: string, patch: WishUpdate) => Promise<Wish | null>
  deleteWish: (id: string) => Promise<boolean>
  snoozeWish: (id: string, until: string) => Promise<Wish | null>
  markSurfaced: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const WishesContext = createContext<WishesContextValue | null>(null)

function tempId(): string {
  return `temp-${crypto.randomUUID()}`
}

export function WishesProvider({ children }: { children: ReactNode }) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWishes = useCallback(async () => {
    if (!supabase) {
      setError('supabase is not configured')
      setLoading(false)
      return
    }

    const { data, error: fetchError } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setWishes(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  const clearError = useCallback(() => setError(null), [])

  const createWish = useCallback(
    async (input: CreateWishInput): Promise<Wish | null> => {
      if (!supabase) return null
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return null

      const optimistic: Wish = {
        id: tempId(),
        user_id: user.id,
        title: input.title,
        note: input.note ?? null,
        category: input.category ?? 'micro_joys',
        image_url: input.image_url ?? null,
        source_collection_item_id: input.source_collection_item_id ?? null,
        time_needed: input.time_needed ?? 'few_hours',
        cost: input.cost ?? 'cheap',
        company: input.company ?? 'any',
        setting: input.setting ?? 'home',
        seasons: input.seasons ?? [],
        topic_tags: input.topic_tags ?? [],
        status: input.status ?? 'someday',
        committed_for: null,
        created_at: new Date().toISOString(),
        last_surfaced_at: null,
        surfaced_count: 0,
        skipped_count: 0,
        snoozed_until: null,
        completed_at: null,
        completion_photo_url: null,
        completion_note: null,
        updated_at: new Date().toISOString(),
      }

      setWishes((prev) => [optimistic, ...prev])

      const { data, error: insertError } = await supabase
        .from('wishes')
        .insert({
          user_id: user.id,
          title: input.title,
          note: input.note ?? null,
          category: input.category ?? 'micro_joys',
          image_url: input.image_url ?? null,
          source_collection_item_id: input.source_collection_item_id ?? null,
          time_needed: input.time_needed ?? 'few_hours',
          cost: input.cost ?? 'cheap',
          company: input.company ?? 'any',
          setting: input.setting ?? 'home',
          seasons: input.seasons ?? [],
          topic_tags: input.topic_tags ?? [],
          status: input.status ?? 'someday',
        })
        .select()
        .single()

      if (insertError || !data) {
        setWishes((prev) => prev.filter((w) => w.id !== optimistic.id))
        setError(insertError?.message ?? 'could not save wish')
        return null
      }

      setWishes((prev) =>
        prev.map((w) => (w.id === optimistic.id ? data : w)),
      )
      return data
    },
    [],
  )

  const updateWish = useCallback(
    async (id: string, patch: WishUpdate): Promise<Wish | null> => {
      if (!supabase) return null
      const prev = wishes.find((w) => w.id === id)
      if (!prev) return null

      const optimistic = {
        ...prev,
        ...patch,
        updated_at: new Date().toISOString(),
      }
      setWishes((list) =>
        list.map((w) => (w.id === id ? (optimistic as Wish) : w)),
      )

      const { data, error: updateError } = await supabase
        .from('wishes')
        .update(patch)
        .eq('id', id)
        .select()
        .single()

      if (updateError || !data) {
        setWishes((list) => list.map((w) => (w.id === id ? prev : w)))
        setError(updateError?.message ?? 'could not update wish')
        return null
      }

      setWishes((list) => list.map((w) => (w.id === id ? data : w)))
      return data
    },
    [wishes],
  )

  const deleteWish = useCallback(
    async (id: string): Promise<boolean> => {
      if (!supabase) return false
      const prev = wishes.find((w) => w.id === id)
      if (!prev) return false

      setWishes((list) => list.filter((w) => w.id !== id))

      const { error: deleteError } = await supabase
        .from('wishes')
        .delete()
        .eq('id', id)

      if (deleteError) {
        setWishes((list) => [...list, prev])
        setError(deleteError.message)
        return false
      }
      return true
    },
    [wishes],
  )

  const snoozeWish = useCallback(
    async (id: string, until: string): Promise<Wish | null> => {
      return updateWish(id, { snoozed_until: until })
    },
    [updateWish],
  )

  const markSurfaced = useCallback(
    async (id: string): Promise<void> => {
      const wish = wishes.find((w) => w.id === id)
      if (!wish || wasSurfacedToday(wish)) return

      const now = new Date().toISOString()
      await updateWish(id, {
        last_surfaced_at: now,
        surfaced_count: wish.surfaced_count + 1,
      })
    },
    [wishes, updateWish],
  )

  const value = useMemo(
    () => ({
      wishes,
      loading,
      error,
      clearError,
      createWish,
      updateWish,
      deleteWish,
      snoozeWish,
      markSurfaced,
      refresh: fetchWishes,
    }),
    [
      wishes,
      loading,
      error,
      clearError,
      createWish,
      updateWish,
      deleteWish,
      snoozeWish,
      markSurfaced,
      fetchWishes,
    ],
  )

  return (
    <WishesContext.Provider value={value}>{children}</WishesContext.Provider>
  )
}

export function useWishes(): WishesContextValue {
  const ctx = useContext(WishesContext)
  if (!ctx) throw new Error('useWishes must be used within WishesProvider')
  return ctx
}
