#!/usr/bin/env node
/**
 * List all public tables by probing PostgREST + known portfolio tables.
 * Usage: node scripts/list-all-tables.mjs
 */
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

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
const url = (env.VITE_SUPABASE_URL ?? '').replace(/\/$/, '')
const key = env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const KNOWN_CANDIDATES = [
  'eval_guides', 'slides', 'transactions',
  'cp_categories', 'cp_ideas', 'cp_accounts', 'cp_hooks', 'cp_hook_mediums',
  'cp_hook_angles', 'cp_hook_medium_map', 'cp_hook_angle_map', 'cp_hook_types',
  'cp_hook_accounts', 'cp_hook_usages', 'cp_app_meta',
  'periods', 'tour_stats', 'manual_inputs', 'weight_configs', 'audit_log',
  'wishlist_profiles', 'wishlist_lists', 'wishlist_items', 'wishlist_item_progress',
  'wishlist_life_packs',
  'profiles', 'lists', 'list_items', 'collections', 'wishes', 'life_packs',
]

async function tableExists(name) {
  const res = await fetch(`${url}/rest/v1/${name}?select=*&limit=0`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
    },
  })
  if (res.status === 200) return true
  const body = await res.text()
  if (res.status === 404 && body.includes('PGRST205')) return false
  return false
}

console.log(`Project: ${url}\n`)

const existing = []
for (const t of KNOWN_CANDIDATES) {
  if (await tableExists(t)) existing.push(t)
}

// Also try OpenAPI for any tables we missed
let openApiTables = []
try {
  const res = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/openapi+json',
    },
  })
  if (res.ok) {
    const spec = await res.json()
    openApiTables = Object.keys(spec.paths ?? {})
      .filter((p) => p.startsWith('/') && !p.includes('{'))
      .map((p) => p.slice(1))
  }
} catch {
  /* ignore */
}

const all = [...new Set([...existing, ...openApiTables])].sort()
console.log(`Public tables found (${all.length}):\n`)
for (const t of all) console.log(`  ${t}`)

const wishlist = all.filter((t) => t.startsWith('wishlist_'))
const other = all.filter((t) => !t.startsWith('wishlist_'))
console.log(`\nWishlist tables: ${wishlist.length}`)
console.log(`Other tables: ${other.length}`)
