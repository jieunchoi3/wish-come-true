const SEEDED_ORDER_KEY = 'wishlist:seeded-list-order'

export function loadSeededListOrder(): string[] {
  try {
    const raw = localStorage.getItem(SEEDED_ORDER_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
}

export function saveSeededListOrder(ids: string[]): void {
  localStorage.setItem(SEEDED_ORDER_KEY, JSON.stringify(ids))
}

/** Apply a saved id order, then append any lists not in the saved order. */
export function sortListsBySavedOrder<T extends { id: string; sort_order: number; title: string }>(
  lists: T[],
  savedOrder: string[],
): T[] {
  if (savedOrder.length === 0) {
    return [...lists].sort(
      (a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title),
    )
  }

  const byId = new Map(lists.map((l) => [l.id, l]))
  const ordered: T[] = []
  const seen = new Set<string>()

  for (const id of savedOrder) {
    const list = byId.get(id)
    if (!list) continue
    ordered.push(list)
    seen.add(id)
  }

  const rest = lists
    .filter((l) => !seen.has(l.id))
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title))

  return [...ordered, ...rest]
}

export function reorderIds(ids: string[], draggedId: string, targetId: string): string[] {
  if (draggedId === targetId) return ids
  const next = ids.filter((id) => id !== draggedId)
  const targetIndex = next.indexOf(targetId)
  if (targetIndex === -1) return ids
  next.splice(targetIndex, 0, draggedId)
  return next
}
