import type { ListItemView } from '../types/database'
import { londonTodayISO } from './season'
import { hashString } from './utils'

const TWO_WEEKS_MS = 14 * 86_400_000
const OLDER_BASE_WEIGHT = 2.5
const RECENT_WEIGHT = 0.6

function completionWeight(completedAt: string, now: Date): number {
  const age = now.getTime() - new Date(completedAt).getTime()
  if (age > TWO_WEEKS_MS) {
    const extraMonths = Math.min(age / (30 * 86_400_000), 6)
    return OLDER_BASE_WEIGHT + extraMonths * 0.3
  }
  return RECENT_WEIGHT
}

function seededUnit(seed: string): number {
  return (Math.abs(hashString(seed)) % 10_000) / 10_000
}

/** One completed memory with a real photo — date-seeded, weighted toward older completions. */
export function pickPhotoboothItem(
  items: ListItemView[],
  dateISO = londonTodayISO(),
  now = new Date(),
): ListItemView | null {
  const eligible = items
    .filter(
      (i) =>
        i.status === 'done' &&
        i.completed_at &&
        i.completion_photo_url,
    )
    .sort((a, b) => a.id.localeCompare(b.id))

  if (eligible.length === 0) return null

  const weighted = eligible.map((item) => ({
    item,
    w: completionWeight(item.completed_at!, now),
  }))
  const total = weighted.reduce((sum, { w }) => sum + w, 0)
  const r = seededUnit(`${dateISO}:photobooth`) * total

  let acc = 0
  for (const { item, w } of weighted) {
    acc += w
    if (r < acc) return item
  }

  return eligible[eligible.length - 1] ?? null
}
