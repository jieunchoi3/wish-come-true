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

function daysSince(iso: string | null): number {
  if (!iso) return Infinity
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
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

function tagDormancyScore(item: ListItemView, items: ListItemView[]): number {
  if (item.topic_tags.length === 0) return 0
  let total = 0
  for (const tag of item.topic_tags) {
    let latest: string | null = null
    for (const other of items) {
      if (!other.topic_tags.includes(tag)) continue
      if (other.last_surfaced_at && (!latest || other.last_surfaced_at > latest)) {
        latest = other.last_surfaced_at
      }
    }
    total += daysSince(latest)
  }
  return total / item.topic_tags.length
}

function packWeight(item: ListItemView, items: ListItemView[]): number {
  return (
    daysSince(item.last_surfaced_at) * 2 +
    daysSince(item.created_at) * 0.5 +
    tagDormancyScore(item, items)
  )
}

function comparePackItems(a: ListItemView, b: ListItemView, items: ListItemView[]): number {
  const diff = packWeight(b, items) - packWeight(a, items)
  if (diff !== 0) return diff
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
}

/** Life pack: up to `limit` open items from every list, mixed categories */
export function getLifePackItems(
  items: ListItemView[],
  listTitles: Map<string, string>,
  limit = 3,
  excludeIds: Set<string> = new Set(),
  forDate: string = londonTodayISO(),
): { item: ListItemView; whyThis: string; imaginedAgo?: string }[] {
  const pool = items
    .filter((i) => isEligibleForPack(i, forDate) && !excludeIds.has(i.id))
    .sort((a, b) => comparePackItems(a, b, items))

  const result: { item: ListItemView; whyThis: string; imaginedAgo?: string }[] =
    []

  for (const item of pool) {
    if (result.length >= limit) break
    if (item.is_seeded) {
      const listTitle = listTitles.get(item.list_id) ?? 'lists'
      result.push({
        item,
        whyThis: `from your ${listTitle.toLowerCase()} list — fancy it today?`,
      })
    } else {
      result.push({
        item,
        whyThis: item.note?.trim() || 'still on your list',
        imaginedAgo: item.created_at,
      })
    }
  }

  return result
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
