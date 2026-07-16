import type { ListItemView, ListWithCounts } from '../types/database'

export interface ContentsEntry {
  list: ListWithCounts
  count: number
  latestCompletion: string
}

export function completedItems(items: ListItemView[]): ListItemView[] {
  return items.filter((i) => i.status === 'done' && i.completed_at)
}

export function buildContents(
  lists: ListWithCounts[],
  items: ListItemView[],
): ContentsEntry[] {
  const byList = new Map<string, ListItemView[]>()
  for (const item of completedItems(items)) {
    const group = byList.get(item.list_id) ?? []
    group.push(item)
    byList.set(item.list_id, group)
  }

  return lists
    .filter((list) => (byList.get(list.id)?.length ?? 0) > 0)
    .map((list) => {
      const done = byList.get(list.id)!
      const latest = done.reduce((a, b) =>
        new Date(a.completed_at!) > new Date(b.completed_at!) ? a : b,
      )
      return {
        list,
        count: done.length,
        latestCompletion: latest.completed_at!,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.latestCompletion).getTime() -
        new Date(a.latestCompletion).getTime(),
    )
}

export function defaultChapterId(contents: ContentsEntry[]): string | null {
  return contents[0]?.list.id ?? null
}

export function chapterItems(
  items: ListItemView[],
  listId: string,
): ListItemView[] {
  return completedItems(items)
    .filter((i) => i.list_id === listId)
    .sort(
      (a, b) =>
        new Date(b.completed_at!).getTime() -
        new Date(a.completed_at!).getTime(),
    )
}

export function adjacentChapterId(
  contents: ContentsEntry[],
  currentId: string | null,
  direction: 'next' | 'prev',
): string | null {
  if (contents.length === 0 || !currentId) return null
  const idx = contents.findIndex((c) => c.list.id === currentId)
  if (idx === -1) return contents[0]?.list.id ?? null
  const offset = direction === 'next' ? 1 : -1
  const nextIdx = (idx + offset + contents.length) % contents.length
  return contents[nextIdx]?.list.id ?? null
}
