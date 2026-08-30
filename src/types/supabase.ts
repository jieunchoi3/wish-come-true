export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      wishlist_lists: {
        Row: {
          id: string
          user_id: string | null
          title: string
          emoji: string | null
          slug: string | null
          is_seeded: boolean
          sort_order: number
          rating_enabled: boolean
          cover_url: string | null
          abandoned_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          emoji?: string | null
          slug?: string | null
          is_seeded?: boolean
          sort_order?: number
          rating_enabled?: boolean
          cover_url?: string | null
          abandoned_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          emoji?: string | null
          slug?: string | null
          is_seeded?: boolean
          sort_order?: number
          rating_enabled?: boolean
          cover_url?: string | null
          abandoned_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          id: string
          list_id: string
          user_id: string | null
          title: string
          note: string | null
          category: Database['public']['Enums']['wishlist_category']
          image_url: string | null
          is_seeded: boolean
          source_seed_key: string | null
          sort_order: number
          time_needed: Database['public']['Enums']['wishlist_time_needed'] | null
          cost: Database['public']['Enums']['wishlist_cost_level'] | null
          company: Database['public']['Enums']['wishlist_company_type'] | null
          setting: Database['public']['Enums']['wishlist_setting_type'] | null
          seasons: string[]
          topic_tags: string[]
          status: Database['public']['Enums']['wishlist_item_status']
          created_at: string
          completed_at: string | null
          completion_photo_url: string | null
          completion_note: string | null
          rating: number | null
          abandoned_at: string | null
          snoozed_until: string | null
          last_surfaced_at: string | null
          surfaced_count: number
          last_notified_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          list_id: string
          user_id?: string | null
          title: string
          note?: string | null
          category?: Database['public']['Enums']['wishlist_category']
          image_url?: string | null
          is_seeded?: boolean
          source_seed_key?: string | null
          sort_order?: number
          time_needed?: Database['public']['Enums']['wishlist_time_needed'] | null
          cost?: Database['public']['Enums']['wishlist_cost_level'] | null
          company?: Database['public']['Enums']['wishlist_company_type'] | null
          setting?: Database['public']['Enums']['wishlist_setting_type'] | null
          seasons?: string[]
          topic_tags?: string[]
          status?: Database['public']['Enums']['wishlist_item_status']
          created_at?: string
          completed_at?: string | null
          completion_photo_url?: string | null
          completion_note?: string | null
          rating?: number | null
          abandoned_at?: string | null
          snoozed_until?: string | null
          last_surfaced_at?: string | null
          surfaced_count?: number
          last_notified_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          user_id?: string | null
          title?: string
          note?: string | null
          category?: Database['public']['Enums']['wishlist_category']
          image_url?: string | null
          is_seeded?: boolean
          source_seed_key?: string | null
          sort_order?: number
          time_needed?: Database['public']['Enums']['wishlist_time_needed'] | null
          cost?: Database['public']['Enums']['wishlist_cost_level'] | null
          company?: Database['public']['Enums']['wishlist_company_type'] | null
          setting?: Database['public']['Enums']['wishlist_setting_type'] | null
          seasons?: string[]
          topic_tags?: string[]
          status?: Database['public']['Enums']['wishlist_item_status']
          created_at?: string
          completed_at?: string | null
          completion_photo_url?: string | null
          completion_note?: string | null
          rating?: number | null
          abandoned_at?: string | null
          snoozed_until?: string | null
          last_surfaced_at?: string | null
          surfaced_count?: number
          last_notified_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      wishlist_item_progress: {
        Row: {
          user_id: string
          list_item_id: string
          status: Database['public']['Enums']['wishlist_item_status']
          completed_at: string | null
          completion_photo_url: string | null
          completion_note: string | null
          rating: number | null
          abandoned_at: string | null
          snoozed_until: string | null
          last_surfaced_at: string | null
          surfaced_count: number
          last_notified_at: string | null
          updated_at: string
        }
        Insert: {
          user_id: string
          list_item_id: string
          status?: Database['public']['Enums']['wishlist_item_status']
          completed_at?: string | null
          completion_photo_url?: string | null
          completion_note?: string | null
          rating?: number | null
          abandoned_at?: string | null
          snoozed_until?: string | null
          last_surfaced_at?: string | null
          surfaced_count?: number
          last_notified_at?: string | null
          updated_at?: string
        }
        Update: {
          user_id?: string
          list_item_id?: string
          status?: Database['public']['Enums']['wishlist_item_status']
          completed_at?: string | null
          completion_photo_url?: string | null
          completion_note?: string | null
          rating?: number | null
          abandoned_at?: string | null
          snoozed_until?: string | null
          last_surfaced_at?: string | null
          surfaced_count?: number
          last_notified_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      wishlist_profiles: {
        Row: {
          id: string
          display_name: string | null
          lock_code: string | null
          onboarding_done: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          lock_code?: string | null
          onboarding_done?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          lock_code?: string | null
          onboarding_done?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      wishlist_life_packs: {
        Row: {
          id: string
          user_id: string
          for_date: string
          title: string
          mood_line: string
          items: Json
          connective_tissue: string[]
          context: Json
          rerolls_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          for_date: string
          title: string
          mood_line: string
          items?: Json
          connective_tissue?: string[]
          context?: Json
          rerolls_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          for_date?: string
          title?: string
          mood_line?: string
          items?: Json
          connective_tissue?: string[]
          context?: Json
          rerolls_used?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      wishlist_category:
        | 'taste'
        | 'watch_read'
        | 'go'
        | 'london'
        | 'make_learn'
        | 'micro_joys'
        | 'brave'
        | 'people'
        | 'someday'
      wishlist_time_needed: '30min' | 'few_hours' | 'full_day' | 'weekend' | 'trip'
      wishlist_cost_level: 'free' | 'cheap' | 'moderate' | 'splurge'
      wishlist_company_type: 'solo' | 'friends' | 'date' | 'family' | 'any'
      wishlist_setting_type: 'home' | 'indoors_out' | 'outdoors' | 'travel'
      wishlist_item_status: 'open' | 'committed' | 'done'
    }
    CompositeTypes: Record<string, never>
  }
}

export type List = Database['public']['Tables']['wishlist_lists']['Row']
export type ListItem = Database['public']['Tables']['wishlist_items']['Row']
export type ListItemInsert = Database['public']['Tables']['wishlist_items']['Insert']
export type ListItemUpdate = Database['public']['Tables']['wishlist_items']['Update']
export type ListItemProgress =
  Database['public']['Tables']['wishlist_item_progress']['Row']
export type Profile = Database['public']['Tables']['wishlist_profiles']['Row']
