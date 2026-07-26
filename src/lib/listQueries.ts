import type { ListItemView } from '../types/database'
import { londonTodayISO, seasonForDateISO, isSeasonEligible } from './season'

export function todayISO(): string {
  return londonTodayISO()
}

export function addDaysISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function daysAgoISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

export function tomorrowISO(): string {
  return addDaysISO(1)
}

function monthsAgoISO(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() - months)
  return d.toISOString()
}

export function isSnoozeExpired(item: ListItemView): boolean {
  if (!item.snoozed_until) return true
  return item.snoozed_until < todayISO()
}

export function isUserItem(item: ListItemView): boolean {
  return !item.is_seeded
}

/** Open, not snoozed, not surfaced in the last 14 days, in-season for forDate */
export function isEligibleForPack(
  item: ListItemView,
  forDate: string = londonTodayISO(),
): boolean {
  if (item.status !== 'open') return false
  if (!isSnoozeExpired(item)) return false
  if (item.last_surfaced_at) {
    const cutoff = daysAgoISO(14)
    if (item.last_surfaced_at.slice(0, 10) >= cutoff) return false
  }
  const season = seasonForDateISO(forDate)
  if (!isSeasonEligible(item.seasons, season)) return false
  return true
}

function hashSeed(...parts: string[]): number {
  let h = 0
  for (const p of parts) {
    for (let i = 0; i < p.length; i++) {
      h = (Math.imul(31, h) + p.charCodeAt(i)) >>> 0
    }
  }
  return h || 1
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function packWhyThis(
  item: ListItemView,
  listTitles: Map<string, string>,
): string {
  const listTitle = listTitles.get(item.list_id)
  if (listTitle) {
    return `from your ${listTitle.toLowerCase()} list — fancy it today?`
  }
  return item.note?.trim() || 'still on your list'
}

/** Life pack: up to `limit` open items, randomly mixed across every list (imported + yours) */
export function getLifePackItems(
  items: ListItemView[],
  listTitles: Map<string, string>,
  limit = 3,
  excludeIds: Set<string> = new Set(),
  forDate: string = londonTodayISO(),
): { item: ListItemView; whyThis: string; imaginedAgo?: string }[] {
  const pool = items.filter(
    (i) =>
      isEligibleForPack(i, forDate) &&
      !excludeIds.has(i.id) &&
      listTitles.has(i.list_id),
  )
  if (pool.length === 0) return []

  const excludeKey = [...excludeIds].sort().join(',')
  const seed = hashSeed(forDate, excludeKey, String(limit))

  const byList = new Map<string, ListItemView[]>()
  for (const item of pool) {
    const group = byList.get(item.list_id) ?? []
    group.push(item)
    byList.set(item.list_id, group)
  }

  let listIds = shuffleWithSeed([...byList.keys()], seed)
  const picked: ListItemView[] = []
  const pickedIds = new Set<string>()

  while (picked.length < limit && listIds.length > 0) {
    const nextRound: string[] = []
    for (const listId of listIds) {
      if (picked.length >= limit) break
      const candidates = shuffleWithSeed(
        byList.get(listId)!,
        seed + picked.length,
      ).filter((i) => !pickedIds.has(i.id))
      if (candidates.length === 0) continue
      nextRound.push(listId)
      picked.push(candidates[0])
      pickedIds.add(candidates[0].id)
    }
    listIds = nextRound
    if (nextRound.length === 0) break
  }

  if (picked.length < limit) {
    const rest = shuffleWithSeed(
      pool.filter((i) => !pickedIds.has(i.id)),
      seed + 99,
    )
    for (const item of rest) {
      if (picked.length >= limit) break
      picked.push(item)
    }
  }

  return picked.slice(0, limit).map((item) => ({
    item,
    whyThis: packWhyThis(item, listTitles),
    imaginedAgo: item.is_seeded ? undefined : item.created_at,
  }))
}

/** Nostalgia: ONLY user items, created_at > 6 months ago, in-season for forDate */
export function getNostalgiaItem(
  items: ListItemView[],
  forDate: string = londonTodayISO(),
): ListItemView | null {
  const season = seasonForDateISO(forDate)
  const cutoff = monthsAgoISO(6)
  const candidates = items
    .filter(
      (i) =>
        isUserItem(i) &&
        i.status === 'open' &&
        i.created_at < cutoff &&
        isSnoozeExpired(i) &&
        isSeasonEligible(i.seasons, season),
    )
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
  return candidates[0] ?? null
}

export function wasSurfacedToday(item: ListItemView): boolean {
  if (!item.last_surfaced_at) return false
  return item.last_surfaced_at.slice(0, 10) === todayISO()
}

export function addMonthsISO(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

/** Lists user has engaged with: completed or added a user item */
export function computeEngagedListIds(
  items: ListItemView[],
  progressDoneIds: Set<string>,
): Set<string> {
  const engaged = new Set<string>()
  for (const item of items) {
    if (!item.is_seeded && item.user_id) {
      engaged.add(item.list_id)
    }
    if (item.is_seeded && progressDoneIds.has(item.id)) {
      engaged.add(item.list_id)
    }
    if (!item.is_seeded && item.status === 'done') {
      engaged.add(item.list_id)
    }
  }
  return engaged
}
