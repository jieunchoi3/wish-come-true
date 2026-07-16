/** Lightweight “smart” text match — contains + similar tokens, no deps. */

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '')
}

export function normalizeSearchText(s: string): string {
  return stripDiacritics(s)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function searchTokens(query: string): string[] {
  return normalizeSearchText(query)
    .split(' ')
    .filter((t) => t.length > 0)
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j]
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost)
      prev = cur
    }
  }
  return row[b.length]
}

/** True if tokens are the same, contain each other, or are close misspellings. */
export function tokensSimilar(a: string, b: string): boolean {
  if (!a || !b) return false
  if (a === b) return true
  if (a.includes(b) || b.includes(a)) return true
  const shorter = a.length <= b.length ? a : b
  const longer = a.length <= b.length ? b : a
  if (shorter.length >= 3 && longer.startsWith(shorter)) return true
  const maxDist = Math.max(a.length, b.length) <= 4 ? 1 : 2
  if (Math.abs(a.length - b.length) > maxDist) return false
  return levenshtein(a, b) <= maxDist
}

/**
 * Score how well `haystack` matches `query`.
 * Higher is better. 0 = no match.
 */
export function scoreSearchMatch(haystack: string, query: string): number {
  const q = normalizeSearchText(query)
  if (!q) return 0
  const h = normalizeSearchText(haystack)
  if (!h) return 0

  if (h === q) return 1000
  if (h.startsWith(q)) return 800
  if (h.includes(q)) return 600

  const qTokens = searchTokens(query)
  const hTokens = h.split(' ').filter(Boolean)
  if (qTokens.length === 0) return 0

  let matched = 0
  let fuzzyBonus = 0
  for (const qt of qTokens) {
    let best = 0
    for (const ht of hTokens) {
      if (ht === qt) best = Math.max(best, 3)
      else if (ht.includes(qt) || qt.includes(ht)) best = Math.max(best, 2)
      else if (tokensSimilar(ht, qt)) best = Math.max(best, 1)
    }
    if (best === 0) return 0
    matched += 1
    fuzzyBonus += best
  }

  // All query tokens must match something (AND semantics)
  if (matched < qTokens.length) return 0
  return 100 + fuzzyBonus * 10 + Math.min(h.length, 40)
}

export interface SearchableList {
  id: string
  title: string
  emoji: string | null
  is_seeded: boolean
}

export interface SearchableItem {
  id: string
  list_id: string
  title: string
  note: string | null
  topic_tags: string[]
  status: string
  is_seeded: boolean
}

export type SearchHit =
  | { kind: 'list'; score: number; list: SearchableList }
  | {
      kind: 'item'
      score: number
      item: SearchableItem
      listTitle: string
      listEmoji: string | null
    }

export function searchListsAndItems(
  query: string,
  lists: SearchableList[],
  items: SearchableItem[],
  listTitleById: Map<string, { title: string; emoji: string | null }>,
  limit = 60,
): SearchHit[] {
  const q = query.trim()
  if (!q) return []

  const hits: SearchHit[] = []

  for (const list of lists) {
    const score = scoreSearchMatch(
      `${list.title} ${list.emoji ?? ''}`,
      q,
    )
    if (score > 0) hits.push({ kind: 'list', score, list })
  }

  for (const item of items) {
    const score = scoreSearchMatch(
      `${item.title} ${item.note ?? ''} ${item.topic_tags.join(' ')}`,
      q,
    )
    if (score > 0) {
      const meta = listTitleById.get(item.list_id)
      hits.push({
        kind: 'item',
        score,
        item,
        listTitle: meta?.title ?? 'list',
        listEmoji: meta?.emoji ?? null,
      })
    }
  }

  hits.sort((a, b) => b.score - a.score || a.kind.localeCompare(b.kind))
  return hits.slice(0, limit)
}
