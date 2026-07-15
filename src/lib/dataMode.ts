import { skipAuth } from './authMode'
import { supabase, supabaseConfigured } from './supabase'

/** Use bundled seed + localStorage instead of Supabase */
export function useLocalDataMode(sessionActive: boolean): boolean {
  if (!supabaseConfigured || !supabase) return true
  if (skipAuth && !sessionActive) return true
  return false
}
