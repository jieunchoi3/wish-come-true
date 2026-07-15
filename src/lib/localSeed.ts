import { hashString } from './utils'
import movies from '../../seed/100-movies.json'
import books from '../../seed/100-books.json'
import cheeses from '../../seed/cheese-atlas.json'
import countries from '../../seed/countries.json'
import london from '../../seed/london-100.json'
import summer from '../../seed/summer-joys.json'
import type { Collection, CollectionItem, Json } from '../types/supabase'

interface SeedFile {
  slug: string
  title: string
  description: string
  emoji: string
  cover_style: string
  default_tags: Record<string, unknown>
  items: {
    key: string
    title: string
    subtitle?: string
    meta?: Record<string, unknown>
    default_tags: Record<string, unknown>
    sort_order: number
  }[]
}

const SEED_FILES: SeedFile[] = [movies, books, cheeses, countries, london, summer]

/** Deterministic UUID-shaped id from a string key */
export function stableId(namespace: string, key: string): string {
  const h = Math.abs(hashString(`${namespace}:${key}`))
  const h2 = Math.abs(hashString(`${namespace}:${key}:b`))
  const a = h.toString(16).padStart(8, '0').slice(0, 8)
  const b = (h2 & 0xffff).toString(16).padStart(4, '0')
  const c = ((h2 >> 16) & 0x0fff | 0x4000).toString(16).padStart(4, '0')
  const d = ((h2 >> 28) & 0x3fff | 0x8000).toString(16).padStart(4, '0')
  const e = (h ^ h2).toString(16).padStart(12, '0').slice(0, 12)
  return `${a}-${b}-${c}-${d}-${e}`
}

export const LOCAL_USER_ID = stableId('user', 'local-solo')

export function loadLocalSeed(): {
  collections: Collection[]
  itemsByCollection: Map<string, CollectionItem[]>
} {
  const collections: Collection[] = []
  const itemsByCollection = new Map<string, CollectionItem[]>()

  for (const file of SEED_FILES) {
    const collectionId = stableId('collection', file.slug)
    const now = new Date(0).toISOString()

    collections.push({
      id: collectionId,
      slug: file.slug,
      title: file.title,
      description: file.description,
      emoji: file.emoji,
      cover_style: file.cover_style,
      default_tags: file.default_tags as Json,
      item_count: file.items.length,
      is_system: true,
      created_at: now,
    })

    const items: CollectionItem[] = file.items.map((item) => ({
      id: stableId(`item:${file.slug}`, item.key),
      collection_id: collectionId,
      external_key: `${file.slug}:${item.key}`,
      title: item.title,
      subtitle: item.subtitle ?? null,
      meta: (item.meta ?? {}) as Json,
      default_tags: item.default_tags as Json,
      sort_order: item.sort_order,
      created_at: now,
    }))

    itemsByCollection.set(collectionId, items)
  }

  return { collections, itemsByCollection }
}
