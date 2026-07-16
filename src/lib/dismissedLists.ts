const KEY = 'wishlist:dismissed-lists'

export function loadDismissedListIds(): Set<string> {
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

export function saveDismissedListIds(ids: Set<string>): void {
  localStorage.setItem(KEY, JSON.stringify([...ids]))
}

export function dismissListId(id: string): Set<string> {
  const next = loadDismissedListIds()
  next.add(id)
  saveDismissedListIds(next)
  return next
}
