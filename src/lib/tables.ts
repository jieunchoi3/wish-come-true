/** Wishlist table names — prefixed for shared Supabase project isolation */
export const TABLES = {
  profiles: 'wishlist_profiles',
  lists: 'wishlist_lists',
  items: 'wishlist_items',
  itemProgress: 'wishlist_item_progress',
  lifePacks: 'wishlist_life_packs',
} as const

export const WISHLIST_STORAGE_BUCKET = 'wishlist-images'
