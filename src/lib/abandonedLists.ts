const KEY = 'wishlist:abandoned-lists'

export function loadAbandonedListIds(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

export function saveAbandonedListIds(ids: Set<string>): void {
  localStorage.setItem(KEY, JSON.stringify([...ids]))
}

export function abandonListId(id: string): Set<string> {
  const next = loadAbandonedListIds()
  next.add(id)
  saveAbandonedListIds(next)
  return next
}

export function restoreListId(id: string): Set<string> {
  const next = loadAbandonedListIds()
  next.delete(id)
  saveAbandonedListIds(next)
  return next
}
