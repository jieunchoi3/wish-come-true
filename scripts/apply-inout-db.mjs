#!/usr/bin/env node
/**
 * Apply In & Out migration to remote Supabase via `supabase db push`.
 *
 * Requires SUPABASE_DB_PASSWORD (Database password from Project Settings).
 *
 * Usage:
 *   SUPABASE_DB_PASSWORD='…' node scripts/apply-inout-db.mjs
 */
import { existsSync, readFileSync } from 'fs'
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
const dbPassword = process.env.SUPABASE_DB_PASSWORD ?? env.SUPABASE_DB_PASSWORD

if (!dbPassword) {
  console.error('Missing SUPABASE_DB_PASSWORD.')
  console.error('Find it in Supabase Dashboard → Project Settings → Database.')
  console.error('')
  console.error('Or paste the SQL file in the dashboard SQL editor:')
  console.error('  supabase/migrations/20260715000001_inout_schema.sql')
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

run('npx', [
  'supabase@latest',
  'link',
  '--project-ref',
  projectRef,
  '--password',
  dbPassword,
  '--yes',
])

run('npx', ['supabase@latest', 'db', 'push', '--linked', '--yes'])

console.log('\nMigration applied. Run: node scripts/verify-inout.mjs')
