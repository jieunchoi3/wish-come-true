import type { CollectionGesture, WishCategory, WishTags } from '../types/database'

export const COLLECTION_CATEGORY: Record<string, WishCategory> = {
  '100-movies': 'watch_read',
  'cheese-atlas': 'taste',
  countries: 'go',
  '100-books': 'watch_read',
  'london-100': 'london',
  'summer-joys': 'micro_joys',
}

export interface CollectionDefaultTags extends WishTags {
  seasons?: string[]
  topic_tags?: string[]
}

export function categoryForCollection(slug: string): WishCategory {
  return COLLECTION_CATEGORY[slug] ?? 'someday'
}

/** Snapshot tags from collection + item — never live reference */
export function mergeCollectionTags(
  collectionTags: CollectionDefaultTags,
  itemTags: CollectionDefaultTags,
): Required<Pick<WishTags, 'time_needed' | 'cost' | 'company' | 'setting'>> & {
  seasons: string[]
  topic_tags: string[]
} {
  const seasons =
    itemTags.seasons && itemTags.seasons.length > 0
      ? itemTags.seasons
      : collectionTags.seasons ?? []

  const topicTags = [
    ...new Set([
      ...(collectionTags.topic_tags ?? []),
      ...(itemTags.topic_tags ?? []),
    ]),
  ]

  return {
    time_needed: itemTags.time_needed ?? collectionTags.time_needed ?? 'few_hours',
    cost: itemTags.cost ?? collectionTags.cost ?? 'cheap',
    company: itemTags.company ?? collectionTags.company ?? 'any',
    setting: itemTags.setting ?? collectionTags.setting ?? 'home',
    seasons,
    topic_tags: topicTags,
  }
}

export function progressForCollection(
  tickedCount: number,
  itemCount: number,
): number {
  if (itemCount <= 0) return 0
  return tickedCount / itemCount
}

export type GestureFilter = 'all' | 'undecided' | 'ticked' | 'starred'

export function matchesGestureFilter(
  gesture: CollectionGesture | null,
  filter: GestureFilter,
): boolean {
  switch (filter) {
    case 'all':
      return true
    case 'undecided':
      return gesture === null
    case 'ticked':
      return gesture === 'ticked'
    case 'starred':
      return gesture === 'starred'
    default:
      return true
  }
}

/** Round-robin interleave items from multiple collections */
export function interleaveItems<T extends { collectionId: string }>(
  buckets: Map<string, T[]>,
): T[] {
  const keys = [...buckets.keys()]
  const queues = keys.map((k) => [...(buckets.get(k) ?? [])])
  const result: T[] = []
  let added = true
  while (added) {
    added = false
    for (const q of queues) {
      if (q.length > 0) {
        result.push(q.shift()!)
        added = true
      }
    }
  }
  return result
}

export const ONBOARDING_MIN_COLLECTIONS = 3
export const ONBOARDING_MAX_COLLECTIONS = 5
export const ONBOARDING_EXIT_STARS = 15
export const ONBOARDING_DONE_STARS = 20
