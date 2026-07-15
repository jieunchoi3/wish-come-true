#!/usr/bin/env node
/**
 * Verify Supabase is reachable, migrations applied, and seed loaded.
 * Usage: node scripts/verify-supabase.mjs
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
 */
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const TABLES = {
  lists: 'wishlist_lists',
  items: 'wishlist_items',
}

function loadEnv() {
  const path = join(root, '.env.local')
  if (!existsSync(path)) return {}
  const vars = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) vars[m[1].trim()] = m[2].trim()
  }
  return vars
}

const env = { ...process.env, ...loadEnv() }
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('FAIL: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

const EXPECTED = {
  lists: 6,
  items: 605,
}

async function main() {
  console.log('Checking Supabase at', url)

  const { count: listCount, error: listErr } = await supabase
    .from(TABLES.lists)
    .select('*', { count: 'exact', head: true })
    .eq('is_seeded', true)

  if (listErr) {
    console.error('FAIL: wishlist_lists query —', listErr.message)
    console.error('  → run supabase/migrations/20250715000001_wishlist_schema.sql first')
    process.exit(1)
  }

  const { count: itemCount, error: itemErr } = await supabase
    .from(TABLES.items)
    .select('*', { count: 'exact', head: true })
    .eq('is_seeded', true)

  if (itemErr) {
    console.error('FAIL: wishlist_items query —', itemErr.message)
    process.exit(1)
  }

  console.log(`wishlist_lists (seeded):  ${listCount} (expected ${EXPECTED.lists})`)
  console.log(`wishlist_items (seeded): ${itemCount} (expected ${EXPECTED.items})`)

  if ((listCount ?? 0) < EXPECTED.lists) {
    console.error('FAIL: seed not loaded — run supabase/seed_wishlist.sql')
    process.exit(1)
  }

  if ((itemCount ?? 0) < EXPECTED.items) {
    console.error('FAIL: item count too low — re-run supabase/seed_wishlist.sql')
    process.exit(1)
  }

  const { data: slugs } = await supabase
    .from(TABLES.lists)
    .select('slug, title')
    .eq('is_seeded', true)
    .order('slug')

  console.log('\nSeeded lists:')
  for (const row of slugs ?? []) {
    console.log(`  ${row.slug ?? row.title}`)
  }

  console.log('\nOK — Supabase is configured, reachable, and seeded.')
  console.log('Sign in via the app to verify RLS (wishlist_item_progress requires auth.uid()).')
}

main().catch((e) => {
  console.error('FAIL:', e.message)
  process.exit(1)
})
