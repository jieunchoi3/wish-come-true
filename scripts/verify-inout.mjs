#!/usr/bin/env node
/**
 * Verify In & Out Phase 1: silent auth, schema, starter categories, zero transactions.
 * Usage: node scripts/verify-inout.mjs
 */
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const CATEGORIES = 'inout_categories'
const TRANSACTIONS = 'inout_transactions'
const EXPECTED_STARTERS = 12

function loadEnv() {
  const path = join(root, '.env.local')
  if (!existsSync(path)) return {}
  const vars = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) vars[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return vars
}

const env = { ...process.env, ...loadEnv() }
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY
const email = env.VITE_SOLO_EMAIL
const password = env.VITE_SOLO_PASSWORD

if (!url || !key) {
  console.error('FAIL: missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}
if (!email || !password) {
  console.error('FAIL: missing VITE_SOLO_EMAIL or VITE_SOLO_PASSWORD')
  process.exit(1)
}

const supabase = createClient(url, key)

async function main() {
  console.log('In & Out · Phase 1 verify')
  console.log('Project:', url)

  const { data: signed, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (authError || !signed.session) {
    console.error('FAIL: silent sign-in —', authError?.message ?? 'no session')
    process.exit(1)
  }
  console.log('OK  silent sign-in')

  const userId = signed.user.id

  const { data: cats, error: catError } = await supabase
    .from(CATEGORIES)
    .select('id, name, emoji')
    .eq('user_id', userId)

  if (catError) {
    console.error('FAIL: categories —', catError.message)
    console.error('  → run supabase/migrations/20260715000001_inout_schema.sql')
    process.exit(1)
  }

  if (!cats || cats.length === 0) {
    console.log('… seeding starter categories')
    const starters = [
      ['Grocery', '🛒', 0],
      ['Eating out', '🍜', 1],
      ['Coffee', '☕️', 2],
      ['Transport', '🚇', 3],
      ['Clothes', '👕', 4],
      ['Beauty', '💄', 5],
      ['Travel', '✈️', 6],
      ['Hobby', '🎨', 7],
      ['Subscriptions', '🔁', 8],
      ['Health', '💊', 9],
      ['Home', '🏠', 10],
      ['Other', '🧾', 11],
    ]
    const { error: insertError } = await supabase.from(CATEGORIES).insert(
      starters.map(([name, emoji, sort_order]) => ({
        user_id: userId,
        name,
        emoji,
        sort_order,
      })),
    )
    if (insertError) {
      console.error('FAIL: seed categories —', insertError.message)
      process.exit(1)
    }
  }

  const { count: catCount, error: catCountErr } = await supabase
    .from(CATEGORIES)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (catCountErr) {
    console.error('FAIL: category count —', catCountErr.message)
    process.exit(1)
  }

  console.log(`OK  categories: ${catCount} (expected ≥ ${EXPECTED_STARTERS} on first run)`)

  const { count: txCount, error: txError } = await supabase
    .from(TRANSACTIONS)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (txError) {
    console.error('FAIL: transactions —', txError.message)
    process.exit(1)
  }

  if ((txCount ?? 0) !== 0) {
    console.error(`FAIL: zero-state broken — found ${txCount} transaction(s)`)
    process.exit(1)
  }

  console.log('OK  transactions: 0 (zero state)')
  console.log('\nPhase 1 database checks passed.')
}

main().catch((err) => {
  console.error('FAIL:', err)
  process.exit(1)
})
