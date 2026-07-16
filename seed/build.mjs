#!/usr/bin/env node
/**
 * Generates /seed/*.json and /supabase/seed_wishlist.sql
 * Run: node seed/build.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { MOVIES } from './data/movies.js'
import { CHEESES } from './data/cheeses.js'
import { COUNTRIES } from './data/countries.js'
import { BOOKS } from './data/books.js'
import { LONDON } from './data/london.js'
import { SUMMER_JOYS } from './data/summer-joys.js'
import { BAKING_CLASSICS } from './data/baking-classics.js'
import { SOLO_FIRSTS } from './data/solo-firsts.js'
import { LONDON_GALLERIES } from './data/london-galleries.js'
import { SPRING_JOYS } from './data/spring-joys.js'
import { AUTUMN_JOYS } from './data/autumn-joys.js'
import { WINTER_JOYS } from './data/winter-joys.js'
import { MAKE_MY_SPACE } from './data/make-my-space.js'
import { ONE_MONTH_EXPERIMENTS } from './data/one-month-experiments.js'
import { PHOTO_PROJECTS } from './data/photo-projects.js'
import { WEEKEND_SKILLS } from './data/weekend-skills.js'
import { DRAWING_DAY } from './data/drawing-day.js'
import { DIGITAL_DETOX } from './data/digital-detox.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const COLLECTIONS = [
  {
    slug: '100-movies',
    title: '100 Films Before You Die',
    description: 'Essential cinema — from silent classics to modern masterpieces.',
    emoji: '🎬',
    cover_style: 'ink-slate',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'free',
      company: 'any',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['film'],
    },
    items: MOVIES,
  },
  {
    slug: 'cheese-atlas',
    title: 'The World Cheese Atlas',
    description: 'Sixty cheeses worth knowing, tasting, and remembering.',
    emoji: '🧀',
    cover_style: 'ochre-warm',
    default_tags: {
      time_needed: '30min',
      cost: 'cheap',
      company: 'any',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['cheese', 'food'],
    },
    items: CHEESES,
  },
  {
    slug: 'countries',
    title: '195 Countries',
    description: 'Every nation on earth — a lifetime of horizons.',
    emoji: '✈️',
    cover_style: 'sage-mist',
    default_tags: {
      time_needed: 'trip',
      cost: 'splurge',
      company: 'any',
      setting: 'travel',
      seasons: ['any'],
      topic_tags: ['travel'],
    },
    items: COUNTRIES,
  },
  {
    slug: '100-books',
    title: '100 Books Before You Die',
    description: 'The shelf that shapes a reader.',
    emoji: '📚',
    cover_style: 'dusty-rose',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'cheap',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['reading'],
    },
    items: BOOKS,
  },
  {
    slug: 'london-100',
    title: 'London: 100 Things',
    description: 'A hundred reasons this city keeps giving.',
    emoji: '🚇',
    cover_style: 'terracotta',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'cheap',
      company: 'any',
      setting: 'outdoors',
      seasons: ['any'],
      topic_tags: ['london'],
    },
    items: LONDON,
  },
  {
    slug: 'summer-joys',
    title: 'Silly Summer Things',
    description: 'Fifty small pleasures that taste like sunshine.',
    emoji: '☀️',
    cover_style: 'honey-glow',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'any',
      setting: 'outdoors',
      seasons: ['summer'],
      topic_tags: ['summer'],
    },
    items: SUMMER_JOYS,
  },
  {
    slug: 'baking-classics',
    title: 'Baking Classics',
    description: 'Things to bake at least once, start to finish.',
    emoji: '🍰',
    cover_style: 'flour-dust',
    default_tags: {
      time_needed: 'full_day',
      cost: 'cheap',
      company: 'any',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['baking'],
    },
    items: BAKING_CLASSICS,
  },
  {
    slug: 'solo-firsts',
    title: 'Solo Firsts',
    description: 'Things worth doing alone at least once.',
    emoji: '🚶',
    cover_style: 'ink-walk',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'moderate',
      company: 'solo',
      setting: 'indoors_out',
      seasons: ['any'],
      topic_tags: ['solo', 'brave'],
    },
    items: SOLO_FIRSTS,
  },
  {
    slug: 'london-galleries',
    title: 'London: Galleries & Exhibitions',
    description: 'Real institutions and small rooms worth returning to.',
    emoji: '🖼️',
    cover_style: 'gallery-stone',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'moderate',
      company: 'any',
      setting: 'indoors_out',
      seasons: ['any'],
      topic_tags: ['art', 'london'],
    },
    items: LONDON_GALLERIES,
  },
  {
    slug: 'spring-joys',
    title: 'Spring Things',
    description: 'Small pleasures that feel like the year waking up.',
    emoji: '🌸',
    cover_style: 'petal-pale',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'any',
      setting: 'outdoors',
      seasons: ['spring'],
      topic_tags: ['spring'],
    },
    items: SPRING_JOYS,
  },
  {
    slug: 'autumn-joys',
    title: 'Autumn Things',
    description: 'Cosy rituals and golden-hour habits.',
    emoji: '🍂',
    cover_style: 'amber-leaf',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'any',
      setting: 'outdoors',
      seasons: ['autumn'],
      topic_tags: ['autumn'],
    },
    items: AUTUMN_JOYS,
  },
  {
    slug: 'winter-joys',
    title: 'Winter Things',
    description: 'Dark evenings, warm drinks, small festivities.',
    emoji: '❄️',
    cover_style: 'frost-quiet',
    default_tags: {
      time_needed: '30min',
      cost: 'cheap',
      company: 'any',
      setting: 'outdoors',
      seasons: ['winter'],
      topic_tags: ['winter'],
    },
    items: WINTER_JOYS,
  },
  {
    slug: 'make-my-space',
    title: 'Make My Space',
    description: 'Small home improvements that make a place feel like yours.',
    emoji: '🪴',
    cover_style: 'sage-pot',
    default_tags: {
      time_needed: '30min',
      cost: 'cheap',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['home', 'cosy'],
    },
    items: MAKE_MY_SPACE,
  },
  {
    slug: 'one-month-experiments',
    title: 'One Month Experiments',
    description: 'Month-long personal challenges worth trying once.',
    emoji: '🗓️',
    cover_style: 'calendar-grid',
    default_tags: {
      time_needed: 'trip',
      cost: 'free',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['challenge', 'self-experiment'],
    },
    items: ONE_MONTH_EXPERIMENTS,
  },
  {
    slug: 'photo-projects',
    title: 'Photo Projects',
    description: 'Themed and colour-led series to shoot on foot or at home.',
    emoji: '📷',
    cover_style: 'shutter-grey',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'solo',
      setting: 'outdoors',
      seasons: ['any'],
      topic_tags: ['photography', 'creative'],
    },
    items: PHOTO_PROJECTS,
  },
  {
    slug: 'weekend-skills',
    title: 'Weekend Skills',
    description: 'Things learnable in a day or a weekend — one video away.',
    emoji: '🛠️',
    cover_style: 'workbench-warm',
    default_tags: {
      time_needed: 'few_hours',
      cost: 'cheap',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['skill', 'learning'],
    },
    items: WEEKEND_SKILLS,
  },
  {
    slug: 'drawing-day',
    title: 'Drawing Day',
    description: 'Low-pressure prompts — pick one, draw fast, move on.',
    emoji: '🖍️',
    cover_style: 'sketch-paper',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['drawing', 'creative'],
    },
    items: DRAWING_DAY,
  },
  {
    slug: 'digital-detox',
    title: 'Digital Detox',
    description: 'Small, doable disconnection habits — from one evening to a weekend.',
    emoji: '📵',
    cover_style: 'signal-off',
    default_tags: {
      time_needed: '30min',
      cost: 'free',
      company: 'solo',
      setting: 'home',
      seasons: ['any'],
      topic_tags: ['digital-detox', 'rest'],
    },
    items: DIGITAL_DETOX,
  },
]

function sqlEscape(s) {
  return s.replace(/'/g, "''")
}

function jsonSql(obj) {
  return `'${sqlEscape(JSON.stringify(obj))}'::jsonb`
}

function categoryForSlug(slug) {
  switch (slug) {
    case '100-movies':
    case '100-books':
      return 'watch_read'
    case 'cheese-atlas':
      return 'taste'
    case 'countries':
      return 'go'
    case 'london-100':
      return 'london'
    case 'summer-joys':
    case 'spring-joys':
    case 'autumn-joys':
    case 'winter-joys':
      return 'micro_joys'
    case 'baking-classics':
      return 'make_learn'
    case 'solo-firsts':
      return 'brave'
    case 'london-galleries':
      return 'london'
    case 'make-my-space':
      return 'micro_joys'
    case 'one-month-experiments':
      return 'brave'
    case 'photo-projects':
    case 'weekend-skills':
    case 'drawing-day':
      return 'make_learn'
    case 'digital-detox':
      return 'micro_joys'
    default:
      return 'someday'
  }
}

function textArraySql(arr) {
  if (!arr?.length) return `ARRAY[]::text[]`
  return `ARRAY[${arr.map((s) => `'${sqlEscape(s)}'`).join(', ')}]::text[]`
}

function tagsSql(tags) {
  return [
    `'${sqlEscape(tags.time_needed)}'::wishlist_time_needed`,
    `'${sqlEscape(tags.cost)}'::wishlist_cost_level`,
    `'${sqlEscape(tags.company)}'::wishlist_company_type`,
    `'${sqlEscape(tags.setting)}'::wishlist_setting_type`,
    textArraySql(tags.seasons ?? []),
    textArraySql(tags.topic_tags ?? []),
  ].join(', ')
}

function buildSql(collections) {
  const lines = [
    '-- Idempotent wishlist seed — INSERT/UPSERT into wishlist_* tables only',
    '-- Generated by seed/build.mjs',
    '',
  ]

  let sortOrder = 0
  for (const col of collections) {
    sortOrder += 1
    const category = categoryForSlug(col.slug)
    lines.push(`-- List: ${col.slug}`)
    lines.push(
      `INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)`,
    )
    lines.push(`VALUES (`)
    lines.push(`  '${sqlEscape(col.slug)}',`)
    lines.push(`  '${sqlEscape(col.title)}',`)
    lines.push(`  '${sqlEscape(col.emoji)}',`)
    lines.push(`  true,`)
    lines.push(`  ${sortOrder}`)
    lines.push(`)`)
    lines.push(`ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET`)
    lines.push(`  title = EXCLUDED.title,`)
    lines.push(`  emoji = EXCLUDED.emoji,`)
    lines.push(`  is_seeded = EXCLUDED.is_seeded,`)
    lines.push(`  sort_order = EXCLUDED.sort_order;`)
    lines.push('')

    for (const item of col.items) {
      const seedKey = `${col.slug}:${item.key}`
      const tags = item.default_tags ?? col.default_tags
      lines.push(
        `INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)`,
      )
      lines.push(`SELECT l.id, '${sqlEscape(item.title)}',`)
      lines.push(item.subtitle ? `  '${sqlEscape(item.subtitle)}',` : `  NULL,`)
      lines.push(`  '${category}'::wishlist_category,`)
      lines.push(`  true,`)
      lines.push(`  '${sqlEscape(seedKey)}',`)
      lines.push(`  ${item.sort_order},`)
      lines.push(`  ${tagsSql(tags)},`)
      lines.push(`  'open'::wishlist_item_status`)
      lines.push(`FROM wishlist_lists l WHERE l.slug = '${sqlEscape(col.slug)}'`)
      lines.push(
        `ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET`,
      )
      lines.push(`  title = EXCLUDED.title,`)
      lines.push(`  note = EXCLUDED.note,`)
      lines.push(`  category = EXCLUDED.category,`)
      lines.push(`  sort_order = EXCLUDED.sort_order,`)
      lines.push(`  time_needed = EXCLUDED.time_needed,`)
      lines.push(`  cost = EXCLUDED.cost,`)
      lines.push(`  company = EXCLUDED.company,`)
      lines.push(`  setting = EXCLUDED.setting,`)
      lines.push(`  seasons = EXCLUDED.seasons,`)
      lines.push(`  topic_tags = EXCLUDED.topic_tags;`)
      lines.push('')
    }
  }

  lines.push('-- Verify counts')
  lines.push(
    `SELECT l.slug, (SELECT COUNT(*) FROM wishlist_items i WHERE i.list_id = l.id AND i.is_seeded = true) AS item_count`,
  )
  lines.push(`FROM wishlist_lists l WHERE l.is_seeded = true ORDER BY l.slug;`)

  return lines.join('\n')
}

mkdirSync(join(root, 'seed'), { recursive: true })

const summary = []

for (const col of COLLECTIONS) {
  const out = {
    slug: col.slug,
    title: col.title,
    description: col.description,
    emoji: col.emoji,
    cover_style: col.cover_style,
    default_tags: col.default_tags,
    items: col.items.map(({ key, title, subtitle, meta, default_tags, sort_order }) => ({
      key,
      title,
      subtitle,
      meta,
      default_tags,
      sort_order,
    })),
  }
  writeFileSync(join(root, 'seed', `${col.slug}.json`), JSON.stringify(out, null, 2))
  summary.push({ slug: col.slug, count: col.items.length })
}

writeFileSync(join(root, 'supabase', 'seed_wishlist.sql'), buildSql(COLLECTIONS))

console.log('Seed files generated:')
for (const s of summary) {
  console.log(`  ${s.slug}: ${s.count} items`)
}
console.log(`  Total items: ${summary.reduce((a, b) => a + b.count, 0)}`)
const newSlugs = new Set(['digital-detox'])
const newTotal = summary.filter((s) => newSlugs.has(s.slug)).reduce((a, b) => a + b.count, 0)
console.log(`  New lists (${newSlugs.size}): ${newTotal} items`)
console.log('SQL: supabase/seed_wishlist.sql')
