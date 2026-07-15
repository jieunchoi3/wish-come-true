import type { CollectionGesture } from '../types/database'
import type { Wish } from '../types/supabase'

const WISHES_KEY = 'wishlist_local_wishes'
const GESTURES_KEY = 'wishlist_local_gestures'

export interface LocalGesture {
  collection_item_id: string
  gesture: CollectionGesture
}

export function loadLocalWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(WISHES_KEY)
    return raw ? (JSON.parse(raw) as Wish[]) : []
  } catch {
    return []
  }
}

export function saveLocalWishes(wishes: Wish[]): void {
  localStorage.setItem(WISHES_KEY, JSON.stringify(wishes))
}

export function loadLocalGestures(): Record<string, CollectionGesture> {
  try {
    const raw = localStorage.getItem(GESTURES_KEY)
    return raw ? (JSON.parse(raw) as Record<string, CollectionGesture>) : {}
  } catch {
    return {}
  }
}

export function saveLocalGestures(gestures: Record<string, CollectionGesture>): void {
  localStorage.setItem(GESTURES_KEY, JSON.stringify(gestures))
}
