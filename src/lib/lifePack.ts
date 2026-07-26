import { getLifePackItems, isEligibleForPack } from './listQueries'
import { TABLES } from './tables'
import { supabase } from './supabase'
import type { ListItemView } from '../types/database'
import type { TodayWeather } from './weather'
import type { Database, Json } from '../types/supabase'

export const MAX_REROLLS_PER_DAY = 2
export const PACK_SIZE = 3

type LifePackRow = Database['public']['Tables']['wishlist_life_packs']['Row']

export interface LifePackContext {
  shown_ids: string[]
}

export interface TodayPackState {
  rowId: string | null
  itemIds: string[]
  shownIds: string[]
  rerollsUsed: number
}

function parseItemIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((id): id is string => typeof id === 'string')
}

function parseContext(raw: unknown): LifePackContext {
  if (!raw || typeof raw !== 'object') return { shown_ids: [] }
  const ctx = raw as Record<string, unknown>
  const shown = Array.isArray(ctx.shown_ids)
    ? ctx.shown_ids.filter((id): id is string => typeof id === 'string')
    : []
  return { shown_ids: shown }
}

export function packMoodLine(
  weather: TodayWeather | null | undefined,
  date = new Date(),
): string {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase()
  if (weather?.condition === 'rain') {
    return `rainy ${weekday} — three things you've been meaning to do.`
  }
  if (weather?.condition === 'sun') {
    return `bright ${weekday} — three things you've been meaning to do.`
  }
  return `three things you've been meaning to do.`
}

export function resolvePackEntries(
  itemIds: string[],
  items: ListItemView[],
  listTitles: Map<string, string>,
): { item: ListItemView; whyThis: string; imaginedAgo?: string }[] {
  const byId = new Map(items.map((i) => [i.id, i]))
  const entries: { item: ListItemView; whyThis: string; imaginedAgo?: string }[] =
    []

  for (const id of itemIds) {
    const item = byId.get(id)
    if (!item || item.status !== 'open') continue
    const listTitle = listTitles.get(item.list_id)
    entries.push({
      item,
      whyThis: listTitle
        ? `from your ${listTitle.toLowerCase()} list — fancy it today?`
        : item.note?.trim() || 'still on your list',
      imaginedAgo: item.is_seeded ? undefined : item.created_at,
    })
  }
  return entries
}

export function storedPackStillValid(
  itemIds: string[],
  items: ListItemView[],
  forDate: string,
): boolean {
  if (itemIds.length === 0) return false
  const byId = new Map(items.map((i) => [i.id, i]))
  return itemIds.every((id) => {
    const item = byId.get(id)
    return item && isEligibleForPack(item, forDate)
  })
}

export function generatePackItemIds(
  items: ListItemView[],
  listTitles: Map<string, string>,
  excludeIds: Set<string>,
  limit = PACK_SIZE,
  forDate: string,
): string[] {
  return getLifePackItems(items, listTitles, limit, excludeIds, forDate).map(
    (e) => e.item.id,
  )
}

/** Fill an undersized cached pack when more eligible items are available */
export function topUpPackIds(
  currentIds: string[],
  items: ListItemView[],
  listTitles: Map<string, string>,
  shownIds: string[],
  forDate: string,
  targetSize = PACK_SIZE,
): string[] {
  if (currentIds.length >= targetSize) return currentIds

  const exclude = new Set([...shownIds, ...currentIds])
  const more = generatePackItemIds(
    items,
    listTitles,
    exclude,
    targetSize - currentIds.length,
    forDate,
  )
  return [...currentIds, ...more]
}

export async function loadTodayPack(
  userId: string,
  forDate: string,
): Promise<TodayPackState | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from(TABLES.lifePacks)
    .select('*')
    .eq('user_id', userId)
    .eq('for_date', forDate)
    .maybeSingle()

  if (error || !data) return null

  const ctx = parseContext(data.context)
  const itemIds = parseItemIds(data.items)

  return {
    rowId: data.id,
    itemIds,
    shownIds: ctx.shown_ids,
    rerollsUsed: data.rerolls_used ?? 0,
  }
}

export async function upsertTodayPack(input: {
  userId: string
  forDate: string
  rowId?: string | null
  itemIds: string[]
  shownIds: string[]
  rerollsUsed: number
  moodLine: string
}): Promise<string | null> {
  if (!supabase) return null

  const context = {
    shown_ids: input.shownIds,
  } as Json

  const payload = {
    user_id: input.userId,
    for_date: input.forDate,
    title: 'Spontaneous suggestions',
    mood_line: input.moodLine,
    items: input.itemIds as unknown as Json,
    connective_tissue: [] as string[],
    context,
    rerolls_used: input.rerollsUsed,
  }

  if (input.rowId) {
    const { data, error } = await supabase
      .from(TABLES.lifePacks)
      .update(payload)
      .eq('id', input.rowId)
      .select('id')
      .single()
    if (error || !data) return null
    return data.id
  }

  const { data, error } = await supabase
    .from(TABLES.lifePacks)
    .insert(payload)
    .select('id')
    .single()

  if (error || !data) return null
  return data.id
}

export function mergeShownIds(
  existing: string[],
  next: string[],
): string[] {
  const seen = new Set(existing)
  const merged = [...existing]
  for (const id of next) {
    if (!seen.has(id)) {
      seen.add(id)
      merged.push(id)
    }
  }
  return merged
}

export function rowToState(row: LifePackRow): TodayPackState {
  const ctx = parseContext(row.context)
  return {
    rowId: row.id,
    itemIds: parseItemIds(row.items),
    shownIds: ctx.shown_ids,
    rerollsUsed: row.rerolls_used ?? 0,
  }
}
