#!/usr/bin/env node
/**
 * Apply wishlist migrations + seed to remote Supabase.
 * Requires:
 *   - .env.local with VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 *   - SUPABASE_DB_PASSWORD in environment (database password, NOT anon key)
 *
 * Usage:
 *   SUPABASE_DB_PASSWORD='your-db-password' node scripts/apply-wishlist-db.mjs
 */
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const projectRef = 'myvzlzdsktnudgxqdbxv'

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
const dbPassword = process.env.SUPABASE_DB_PASSWORD

if (!dbPassword) {
  console.error('Missing SUPABASE_DB_PASSWORD in environment.')
  console.error('Find it in Supabase Dashboard → Project Settings → Database.')
  console.error("Then run: SUPABASE_DB_PASSWORD='…' node scripts/apply-wishlist-db.mjs")
  process.exit(1)
}

function run(cmd, args) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`)
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, SUPABASE_DB_PASSWORD: dbPassword },
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Link project (idempotent)
run('npx', [
  'supabase@latest',
  'link',
  '--project-ref',
  projectRef,
  '--password',
  dbPassword,
  '--yes',
])

// Push migrations (additive wishlist_ schema only)
run('npx', ['supabase@latest', 'db', 'push', '--linked', '--yes'])

console.log('\nMigrations applied. Run seed in SQL editor: supabase/seed_wishlist.sql')
console.log('Or: SUPABASE_DB_PASSWORD=… npx supabase db execute -f supabase/seed_wishlist.sql --linked')
