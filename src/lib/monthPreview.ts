import type { ListItemView } from '../types/database'
import {
  isEligibleForPack,
  isUserItem,
} from './listQueries'
import { londonTodayISO } from './season'

const PREVIEW_LIMIT = 6
const USER_POOL_MIN = 4

function shuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Open, in-season items for the empty-month preview — variety across lists. */
export function pickMonthPreviewItems(
  items: ListItemView[],
  limit = PREVIEW_LIMIT,
  forDate: string = londonTodayISO(),
): ListItemView[] {
  const pool = items.filter((i) => isEligibleForPack(i, forDate))
  if (pool.length === 0) return []

  const userOpen = pool.filter(isUserItem)
  const seededOpen = pool.filter((i) => i.is_seeded)

  const primary =
    userOpen.length >= USER_POOL_MIN
      ? userOpen
      : [
          ...userOpen,
          ...seededOpen.filter((s) => !userOpen.some((u) => u.id === s.id)),
        ]

  const byList = new Map<string, ListItemView[]>()
  for (const item of primary) {
    const group = byList.get(item.list_id) ?? []
    group.push(item)
    byList.set(item.list_id, group)
  }

  const seed = Date.now()
  let listIds = shuffle([...byList.keys()], seed)
  const picked: ListItemView[] = []
  const pickedIds = new Set<string>()

  while (picked.length < limit && listIds.length > 0) {
    const nextRound: string[] = []
    for (const listId of listIds) {
      if (picked.length >= limit) break
      const candidates = shuffle(byList.get(listId)!, seed + picked.length).filter(
        (i) => !pickedIds.has(i.id),
      )
      if (candidates.length === 0) continue
      nextRound.push(listId)
      picked.push(candidates[0])
      pickedIds.add(candidates[0].id)
    }
    listIds = nextRound
    if (nextRound.length === 0) break
  }

  if (picked.length < limit) {
    const rest = shuffle(
      primary.filter((i) => !pickedIds.has(i.id)),
      seed + 99,
    )
    for (const item of rest) {
      if (picked.length >= limit) break
      picked.push(item)
    }
  }

  return picked.slice(0, limit)
}

export function monthPreviewSourceLine(listTitle: string): string {
  return `from your ${listTitle.toLowerCase()} list`
}
