import type { ListItemView } from '../types/database'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
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

/** Life pack: primary pool = user items; at most 1 seeded item from engaged lists */
export function getLifePackItems(
  items: ListItemView[],
  engagedListIds: Set<string>,
  listTitles: Map<string, string>,
  availability: string | null,
  limit = 3,
): { item: ListItemView; whyThis: string; imaginedAgo?: string }[] {
  const userPool = items
    .filter((i) => isUserItem(i) && i.status === 'open' && isSnoozeExpired(i))
    .filter((i) => matchesAvailability(i, availability))
    .sort((a, b) => {
      if (!a.last_surfaced_at && b.last_surfaced_at) return -1
      if (a.last_surfaced_at && !b.last_surfaced_at) return 1
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })

  const seededPool = items
    .filter(
      (i) =>
        i.is_seeded &&
        i.status === 'open' &&
        engagedListIds.has(i.list_id) &&
        isSnoozeExpired(i),
    )
    .filter((i) => matchesAvailability(i, availability))

  const result: { item: ListItemView; whyThis: string; imaginedAgo?: string }[] =
    []

  for (const item of userPool) {
    if (result.length >= limit) break
    result.push({
      item,
      whyThis: item.note?.trim() || 'still on your list',
      imaginedAgo: item.created_at,
    })
  }

  if (result.length < limit && seededPool.length > 0) {
    const seeded = seededPool[Math.floor(seededPool.length * 0.5)] ?? seededPool[0]
    const listTitle = listTitles.get(seeded.list_id) ?? 'lists'
    result.push({
      item: seeded,
      whyThis: `from your ${listTitle.toLowerCase()} list — fancy it today?`,
    })
  }

  return result.slice(0, limit)
}

export function matchesAvailability(
  item: ListItemView,
  availability: string | null,
): boolean {
  if (!availability) return true
  const t = item.time_needed
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

/** Nostalgia: ONLY user items, created_at > 6 months ago */
export function getNostalgiaItem(items: ListItemView[]): ListItemView | null {
  const cutoff = monthsAgoISO(6)
  const candidates = items
    .filter(
      (i) =>
        isUserItem(i) &&
        i.status === 'open' &&
        i.created_at < cutoff &&
        isSnoozeExpired(i),
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
