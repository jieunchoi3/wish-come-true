import type { Wish } from '../types/supabase'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function daysAgoISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

function monthsAgoISO(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() - months)
  return d.toISOString()
}

export function isSnoozeExpired(wish: Wish): boolean {
  if (!wish.snoozed_until) return true
  return wish.snoozed_until < todayISO()
}

export function isEligibleForPack(wish: Wish): boolean {
  if (!['someday', 'committed'].includes(wish.status)) return false
  if (!isSnoozeExpired(wish)) return false
  if (wish.last_surfaced_at) {
    const cutoff = daysAgoISO(14)
    if (wish.last_surfaced_at.slice(0, 10) >= cutoff) return false
  }
  return true
}

export function matchesAvailability(
  wish: Wish,
  availability: string | null,
): boolean {
  if (!availability) return true
  const t = wish.time_needed
  switch (availability) {
    case '30min':
      return t === '30min'
    case 'few_hours':
      return t === '30min' || t === 'few_hours'
    case 'full_day':
      return t === '30min' || t === 'few_hours' || t === 'full_day'
    case 'weekend':
      return t !== 'trip'
    default:
      return true
  }
}

export function getPackWishes(
  wishes: Wish[],
  availability: string | null,
  limit = 3,
): Wish[] {
  return wishes
    .filter(isEligibleForPack)
    .filter((w) => matchesAvailability(w, availability))
    .sort((a, b) => {
      if (!a.last_surfaced_at && b.last_surfaced_at) return -1
      if (a.last_surfaced_at && !b.last_surfaced_at) return 1
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
    .slice(0, limit)
}

export function getNostalgiaWish(wishes: Wish[]): Wish | null {
  const cutoff = monthsAgoISO(6)
  const candidates = wishes
    .filter(
      (w) =>
        w.status === 'someday' &&
        w.created_at < cutoff &&
        isSnoozeExpired(w),
    )
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )
  return candidates[0] ?? null
}

export function wasSurfacedToday(wish: Wish): boolean {
  if (!wish.last_surfaced_at) return false
  return wish.last_surfaced_at.slice(0, 10) === todayISO()
}

export type WishSort = 'newest' | 'oldest' | 'forgotten'

export interface WishFilters {
  category?: string
  time_needed?: string
  cost?: string
  company?: string
  setting?: string
  season?: string
  search?: string
  sort: WishSort
}

export function filterWishesForBoard(
  wishes: Wish[],
  filters: WishFilters,
): Wish[] {
  let result = wishes.filter((w) => w.status !== 'done')

  if (filters.category) {
    result = result.filter((w) => w.category === filters.category)
  }
  if (filters.time_needed) {
    result = result.filter((w) => w.time_needed === filters.time_needed)
  }
  if (filters.cost) {
    result = result.filter((w) => w.cost === filters.cost)
  }
  if (filters.company) {
    result = result.filter((w) => w.company === filters.company)
  }
  if (filters.setting) {
    result = result.filter((w) => w.setting === filters.setting)
  }
  if (filters.season) {
    result = result.filter(
      (w) =>
        w.seasons.includes(filters.season!) ||
        w.seasons.includes('any'),
    )
  }
  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.note?.toLowerCase().includes(q) ||
        w.topic_tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  switch (filters.sort) {
    case 'oldest':
      result.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      break
    case 'forgotten':
      result.sort((a, b) => {
        const aSurf = a.last_surfaced_at
          ? new Date(a.last_surfaced_at).getTime()
          : 0
        const bSurf = b.last_surfaced_at
          ? new Date(b.last_surfaced_at).getTime()
          : 0
        if (aSurf !== bSurf) return aSurf - bSurf
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      })
      break
    default:
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
  }

  return result
}

export function addMonthsISO(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

export function addWeeksISO(weeks: number): string {
  const d = new Date()
  d.setDate(d.getDate() + weeks * 7)
  return d.toISOString().slice(0, 10)
}

export function addSeasonISO(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 4)
  return d.toISOString().slice(0, 10)
}
