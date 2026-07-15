import { TABLES } from './tables'
import { supabase, supabaseConfigured } from './supabase'

export type ConnectionFailure =
  | { kind: 'missing_env' }
  | { kind: 'missing_solo' }
  | { kind: 'collections_error'; message: string }
  | { kind: 'collections_empty' }
  | { kind: 'not_authenticated' }

export interface HealthCheckResult {
  ok: boolean
  failure: ConnectionFailure | null
  listCount: number
}

const EXPECTED_SEEDED_LISTS = 6

/** Verify Supabase is configured, reachable, seeded, and user is authenticated. */
export async function verifySupabaseHealth(
  sessionActive: boolean,
): Promise<HealthCheckResult> {
  if (!supabaseConfigured || !supabase) {
    return { ok: false, failure: { kind: 'missing_env' }, listCount: 0 }
  }

  if (!sessionActive) {
    return { ok: false, failure: { kind: 'not_authenticated' }, listCount: 0 }
  }

  const { count, error } = await supabase
    .from(TABLES.lists)
    .select('*', { count: 'exact', head: true })
    .eq('is_seeded', true)

  if (error) {
    return {
      ok: false,
      failure: { kind: 'collections_error', message: error.message },
      listCount: 0,
    }
  }

  const listCount = count ?? 0

  if (listCount < EXPECTED_SEEDED_LISTS) {
    return { ok: false, failure: { kind: 'collections_empty' }, listCount }
  }

  return { ok: true, failure: null, listCount }
}

export function failureMessage(failure: ConnectionFailure): {
  title: string
  lines: string[]
} {
  switch (failure.kind) {
    case 'missing_env':
      return {
        title: 'supabase is not configured',
        lines: [
          'Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
          'Restart the dev server after saving.',
        ],
      }
    case 'missing_solo':
      return {
        title: 'add your solo account',
        lines: [
          'This is a personal app — no login screen.',
          'Create one user in Supabase → Authentication → Users.',
          'Then set VITE_SOLO_EMAIL and VITE_SOLO_PASSWORD in .env.local and restart.',
        ],
      }
    case 'not_authenticated':
      return {
        title: 'not signed in',
        lines: [
          'Silent sign-in failed. Check VITE_SOLO_EMAIL and VITE_SOLO_PASSWORD.',
        ],
      }
    case 'collections_empty':
      return {
        title: 'lists are empty',
        lines: [
          'Schema is up, but seed data is missing.',
          'In the Supabase SQL Editor, run supabase/seed_wishlist.sql.',
          'Expected 6 seeded wishlist_lists with ~605 wishlist_items total.',
        ],
      }
    case 'collections_error':
      return {
        title: 'could not reach supabase',
        lines: [
          failure.message,
          'Check your project URL, anon key, and that migrations have been applied.',
        ],
      }
  }
}
