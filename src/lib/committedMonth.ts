const MONTHS_KEY = 'wishlist_committed_months'
const PROMPTED_KEY = 'wishlist_month_rollover_prompted'

export function currentMonthKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function loadRecord(key: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {}
  } catch {
    return {}
  }
}

function saveRecord(key: string, record: Record<string, string>) {
  localStorage.setItem(key, JSON.stringify(record))
}

export function recordCommittedMonth(itemId: string, monthKey = currentMonthKey()) {
  const months = loadRecord(MONTHS_KEY)
  months[itemId] = monthKey
  saveRecord(MONTHS_KEY, months)
}

export function getCommittedMonth(itemId: string): string | null {
  return loadRecord(MONTHS_KEY)[itemId] ?? null
}

export function clearCommittedMonth(itemId: string) {
  const months = loadRecord(MONTHS_KEY)
  delete months[itemId]
  saveRecord(MONTHS_KEY, months)
}

export function markRolloverPrompted(itemId: string, monthKey = currentMonthKey()) {
  const prompted = loadRecord(PROMPTED_KEY)
  prompted[itemId] = monthKey
  saveRecord(PROMPTED_KEY, prompted)
}

/** True when item is still committed from a prior month and not yet nudged this month. */
export function needsRolloverPrompt(
  itemId: string,
  monthKey = currentMonthKey(),
): boolean {
  const committedMonth = getCommittedMonth(itemId)
  if (committedMonth && committedMonth >= monthKey) return false
  if (loadRecord(PROMPTED_KEY)[itemId] === monthKey) return false
  return true
}
