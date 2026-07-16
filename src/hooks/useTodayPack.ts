import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  generatePackItemIds,
  loadTodayPack,
  MAX_REROLLS_PER_DAY,
  mergeShownIds,
  packMoodLine,
  PACK_SIZE,
  resolvePackEntries,
  storedPackStillValid,
  topUpPackIds,
  upsertTodayPack,
} from '../lib/lifePack'
import {
  addDaysISO,
  todayISO,
} from '../lib/listQueries'
import type { TodayWeather } from '../lib/weather'
import { supabase } from '../lib/supabase'
import { useLists } from './useLists'
import type { ListItemView } from '../types/database'

export type PackCardAnim = 'commit' | 'dismiss' | 'enter'

const ANIM_MS = 200

export function useTodayPack(
  items: ListItemView[],
  listTitles: Map<string, string>,
  weather: TodayWeather | null,
) {
  const { updateItem, markDoneQuick, markSurfaced } = useLists()
  const [rowId, setRowId] = useState<string | null>(null)
  const [packIds, setPackIds] = useState<string[]>([])
  const [shownIds, setShownIds] = useState<string[]>([])
  const [rerollsUsed, setRerollsUsed] = useState(0)
  const [packReady, setPackReady] = useState(false)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [animMap, setAnimMap] = useState<Map<string, PackCardAnim>>(new Map())
  const [detailItem, setDetailItem] = useState<ListItemView | null>(null)
  const [completingItem, setCompletingItem] = useState<ListItemView | null>(null)
  const surfacedIds = useRef(new Set<string>())
  const initRef = useRef(false)

  const forDate = todayISO()
  const moodLine = packMoodLine(weather)
  const itemsById = useMemo(
    () => new Map(items.map((i) => [i.id, i])),
    [items],
  )

  const persistPack = useCallback(
    async (
      nextIds: string[],
      nextShown: string[],
      nextRerolls: number,
      currentRowId: string | null,
    ) => {
      if (!supabase) return currentRowId
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return currentRowId

      const id = await upsertTodayPack({
        userId: user.id,
        forDate,
        rowId: currentRowId,
        itemIds: nextIds,
        shownIds: nextShown,
        rerollsUsed: nextRerolls,
        moodLine,
      })
      return id ?? currentRowId
    },
    [forDate, moodLine],
  )

  useEffect(() => {
    if (initRef.current || items.length === 0) return
    let cancelled = false

    async function init() {
      if (!supabase) {
        const ids = generatePackItemIds(items, listTitles, new Set(), PACK_SIZE, forDate)
        if (!cancelled) {
          setPackIds(ids)
          setShownIds(ids)
          setPackReady(true)
          initRef.current = true
        }
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user || cancelled) return

      let state = await loadTodayPack(user.id, forDate)
      const needsGenerate =
        !state ||
        !storedPackStillValid(state.itemIds, items, forDate) ||
        resolvePackEntries(state.itemIds, items, listTitles).length === 0

      let ids: string[]
      let shown: string[]
      let rerolls = state?.rerollsUsed ?? 0

      if (needsGenerate) {
        ids = generatePackItemIds(
          items,
          listTitles,
          new Set(state?.shownIds ?? []),
          PACK_SIZE,
          forDate,
        )
        shown = mergeShownIds(state?.shownIds ?? [], ids)
      } else {
        ids = topUpPackIds(
          state!.itemIds,
          items,
          listTitles,
          state!.shownIds,
          forDate,
        )
        shown = mergeShownIds(state!.shownIds, ids)
      }

      if (ids.length !== (state?.itemIds.length ?? 0) || needsGenerate) {
        const newRowId = await upsertTodayPack({
          userId: user.id,
          forDate,
          rowId: state?.rowId ?? null,
          itemIds: ids,
          shownIds: shown,
          rerollsUsed: rerolls,
          moodLine,
        })
        state = {
          rowId: newRowId,
          itemIds: ids,
          shownIds: shown,
          rerollsUsed: rerolls,
        }
      } else if (state) {
        state = { ...state, itemIds: ids, shownIds: shown }
      }

      if (cancelled || !state) return
      setRowId(state.rowId)
      setPackIds(state.itemIds)
      setShownIds(state.shownIds)
      setRerollsUsed(state.rerollsUsed)
      setPackReady(true)
      initRef.current = true
    }

    void init()
    return () => {
      cancelled = true
    }
  }, [items, listTitles, forDate, moodLine])

  const visibleIds = useMemo(
    () => packIds.filter((id) => !hiddenIds.has(id)),
    [packIds, hiddenIds],
  )

  const packEntries = useMemo(
    () => resolvePackEntries(visibleIds, items, listTitles),
    [visibleIds, items, listTitles],
  )

  const packKey = visibleIds.join(',')

  useEffect(() => {
    if (!packKey) return
    for (const id of visibleIds) {
      const item = itemsById.get(id)
      if (!item || surfacedIds.current.has(id)) continue
      surfacedIds.current.add(id)
      void markSurfaced(item)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packKey, markSurfaced])

  const runAnimThenHide = useCallback(
    (id: string, anim: PackCardAnim, after?: () => void) => {
      setAnimMap((prev) => new Map(prev).set(id, anim))
      window.setTimeout(() => {
        setHiddenIds((prev) => new Set(prev).add(id))
        setAnimMap((prev) => {
          const next = new Map(prev)
          next.delete(id)
          return next
        })
        after?.()
      }, ANIM_MS)
    },
    [],
  )

  const tryBackfill = useCallback(async () => {
    const exclude = new Set([...shownIds, ...packIds])
    const nextId = generatePackItemIds(items, listTitles, exclude, 1, forDate)[0]
    if (!nextId) return

    const visible = packIds.filter((id) => !hiddenIds.has(id))
    const fullPackIds = [...visible, nextId]
    const nextShown = mergeShownIds(shownIds, [nextId])

    setPackIds(fullPackIds)
    setShownIds(nextShown)
    setAnimMap((prev) => new Map(prev).set(nextId, 'enter'))

    const newRowId = await persistPack(fullPackIds, nextShown, rerollsUsed, rowId)
    if (newRowId) setRowId(newRowId)

    window.setTimeout(() => {
      setAnimMap((prev) => {
        const next = new Map(prev)
        next.delete(nextId)
        return next
      })
    }, ANIM_MS)
  }, [
    shownIds,
    packIds,
    hiddenIds,
    items,
    listTitles,
    persistPack,
    rerollsUsed,
    rowId,
    forDate,
  ])

  const removeFromPack = useCallback(
    async (id: string, opts?: { backfill?: boolean }) => {
      const nextIds = packIds.filter((x) => x !== id)
      setPackIds(nextIds)
      const newRowId = await persistPack(nextIds, shownIds, rerollsUsed, rowId)
      if (newRowId) setRowId(newRowId)
      if (opts?.backfill) void tryBackfill()
    },
    [packIds, shownIds, rerollsUsed, rowId, persistPack, tryBackfill],
  )

  const handleDoneIt = useCallback(
    (item: ListItemView) => {
      if (item.is_seeded) {
        void markDoneQuick(item).catch(() => {})
        runAnimThenHide(item.id, 'commit', () => {
          void removeFromPack(item.id)
        })
        return
      }
      setCompletingItem(item)
    },
    [markDoneQuick, runAnimThenHide, removeFromPack],
  )

  const handleCompleteClose = useCallback(
    (item: ListItemView) => {
      setCompletingItem(null)
      const fresh = itemsById.get(item.id)
      if (fresh?.status === 'done') {
        runAnimThenHide(item.id, 'commit', () => {
          void removeFromPack(item.id)
        })
      }
    },
    [itemsById, runAnimThenHide, removeFromPack],
  )

  const handleNotToday = useCallback(
    (item: ListItemView) => {
      const prevSnooze = item.snoozed_until
      const prevSurfaced = item.surfaced_count
      void updateItem(
        item.id,
        {
          snoozed_until: addDaysISO(7),
          surfaced_count: item.surfaced_count + 1,
        },
        item.is_seeded,
      ).catch(() => {
        void updateItem(
          item.id,
          {
            snoozed_until: prevSnooze,
            surfaced_count: prevSurfaced,
          },
          item.is_seeded,
        )
      })
      runAnimThenHide(item.id, 'dismiss', () => {
        void removeFromPack(item.id, { backfill: true })
      })
    },
    [updateItem, runAnimThenHide, removeFromPack],
  )

  const handleWatchedIt = handleDoneIt

  const handleReroll = useCallback(async () => {
    if (rerollsUsed >= MAX_REROLLS_PER_DAY) return

    const exclude = new Set(shownIds)
    const newIds = generatePackItemIds(items, listTitles, exclude, PACK_SIZE, forDate)
    if (newIds.length === 0) return

    const nextShown = mergeShownIds(shownIds, newIds)
    const nextRerolls = rerollsUsed + 1

    setHiddenIds(new Set())
    setPackIds(newIds)
    setShownIds(nextShown)
    setRerollsUsed(nextRerolls)
    for (const id of newIds) {
      setAnimMap((prev) => new Map(prev).set(id, 'enter'))
    }
    window.setTimeout(() => setAnimMap(new Map()), ANIM_MS)

    const newRowId = await persistPack(newIds, nextShown, nextRerolls, rowId)
    if (newRowId) setRowId(newRowId)
  }, [
    rerollsUsed,
    shownIds,
    items,
    listTitles,
    persistPack,
    rowId,
    forDate,
  ])

  const rerollsRemaining = Math.max(0, MAX_REROLLS_PER_DAY - rerollsUsed)

  return {
    packReady,
    packEntries,
    moodLine,
    animMap,
    detailItem,
    setDetailItem,
    completingItem,
    handleCompleteClose,
    handleDoneIt,
    handleNotToday,
    handleWatchedIt,
    handleReroll,
    rerollsRemaining,
  }
}
