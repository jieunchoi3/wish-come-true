#!/usr/bin/env node
/**
 * List tables in the public schema via PostgREST OpenAPI.
 * Usage: node scripts/list-public-tables.mjs
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
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

const res = await fetch(`${url}/rest/v1/`, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/openapi+json',
  },
})

if (!res.ok) {
  console.error(`FAIL: ${res.status} ${res.statusText}`)
  console.error(await res.text())
  process.exit(1)
}

const spec = await res.json()
const tables = Object.keys(spec.paths ?? {})
  .filter((p) => p.startsWith('/') && !p.includes('{'))
  .map((p) => p.slice(1))
  .sort()

console.log(`Project: ${url}`)
console.log(`Public tables exposed via PostgREST (${tables.length}):\n`)
for (const t of tables) {
  console.log(`  ${t}`)
}

const wishlistTables = [
  'wishlist_profiles',
  'wishlist_lists',
  'wishlist_items',
  'wishlist_item_progress',
  'wishlist_life_packs',
]
const collisions = tables.filter((t) => wishlistTables.includes(t))
if (collisions.length) {
  console.error('\nCOLLISION: these wishlist_ names already exist:', collisions.join(', '))
  process.exit(2)
}
console.log('\nNo collisions with planned wishlist_ table names.')
