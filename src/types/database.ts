import type { Database } from './supabase'

export type WishCategory = Database['public']['Enums']['wishlist_category']
export type TimeNeeded = Database['public']['Enums']['wishlist_time_needed']
export type CostLevel = Database['public']['Enums']['wishlist_cost_level']
export type CompanyType = Database['public']['Enums']['wishlist_company_type']
export type SettingType = Database['public']['Enums']['wishlist_setting_type']
export type ListItemStatus = Database['public']['Enums']['wishlist_item_status']

export interface ListItemTags {
  time_needed?: TimeNeeded
  cost?: CostLevel
  company?: CompanyType
  setting?: SettingType
  seasons?: string[]
  topic_tags?: string[]
}

/** Merged view: catalogue item + optional per-user progress */
export interface ListItemView {
  id: string
  list_id: string
  user_id: string | null
  title: string
  note: string | null
  category: WishCategory
  image_url: string | null
  is_seeded: boolean
  source_seed_key: string | null
  sort_order: number
  time_needed: TimeNeeded | null
  cost: CostLevel | null
  company: CompanyType | null
  setting: SettingType | null
  seasons: string[]
  topic_tags: string[]
  status: ListItemStatus
  created_at: string
  completed_at: string | null
  completion_photo_url: string | null
  completion_note: string | null
  rating: number | null
  snoozed_until: string | null
  last_surfaced_at: string | null
  surfaced_count: number
  last_notified_at: string | null
}

export interface ListWithCounts {
  id: string
  user_id: string | null
  title: string
  emoji: string | null
  slug: string | null
  is_seeded: boolean
  sort_order: number
  rating_enabled: boolean
  cover_url: string | null
  created_at: string
  doneCount: number
  totalCount: number
}
