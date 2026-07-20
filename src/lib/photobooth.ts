import type { ListItemView } from '../types/database'
import { londonTodayISO } from './season'
import { hashString } from './utils'

const TWO_WEEKS_MS = 14 * 86_400_000
const OLDER_BASE_WEIGHT = 2.5
const RECENT_WEIGHT = 0.6
export const PHOTOBOOTH_COUNT = 9

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

function eligiblePhotoboothItems(items: ListItemView[]): ListItemView[] {
  return items
    .filter(
      (i) =>
        i.status === 'done' &&
        i.completed_at &&
        i.completion_photo_url,
    )
    .sort((a, b) => a.id.localeCompare(b.id))
}

/** Up to nine completed memories with photos — date-seeded, weighted toward older completions. */
export function pickPhotoboothItems(
  items: ListItemView[],
  count = PHOTOBOOTH_COUNT,
  dateISO = londonTodayISO(),
  now = new Date(),
): ListItemView[] {
  const eligible = eligiblePhotoboothItems(items)
  if (eligible.length === 0) return []

  const pickCount = Math.min(count, eligible.length)
  const pool = [...eligible]
  const picked: ListItemView[] = []

  for (let slot = 0; slot < pickCount; slot++) {
    const weighted = pool.map((item) => ({
      item,
      w: completionWeight(item.completed_at!, now),
    }))
    const total = weighted.reduce((sum, { w }) => sum + w, 0)
    const r = seededUnit(`${dateISO}:photobooth:${slot}`) * total

    let acc = 0
    let chosenIdx = pool.length - 1
    for (let i = 0; i < weighted.length; i++) {
      acc += weighted[i].w
      if (r < acc) {
        chosenIdx = i
        break
      }
    }

    picked.push(pool[chosenIdx])
    pool.splice(chosenIdx, 1)
  }

  return picked
}

/** @deprecated Use pickPhotoboothItems — kept for single-pick callers. */
export function pickPhotoboothItem(
  items: ListItemView[],
  dateISO = londonTodayISO(),
  now = new Date(),
): ListItemView | null {
  return pickPhotoboothItems(items, 1, dateISO, now)[0] ?? null
}
