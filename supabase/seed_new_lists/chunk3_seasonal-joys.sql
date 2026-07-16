-- Chunk 3 of 5 — spring-joys, autumn-joys, winter-joys
-- Idempotent upserts. Safe to re-run. Does NOT touch the original 6 lists.

-- List: spring-joys
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'spring-joys',
  'Spring Things',
  '🌸',
  true,
  10
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Cherry blossom walk',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-1',
  1,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Tulip season at a park or garden',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-2',
  2,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First picnic of the year',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-3',
  3,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Spring cleaning ritual — one room properly',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-4',
  4,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Plant seeds on a windowsill',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-5',
  5,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Hot cross buns on Good Friday',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-6',
  6,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First bare-legs day',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-7',
  7,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Watch ducklings at a pond',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-8',
  8,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Pick wild garlic',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-9',
  9,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Open every window for an hour',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-10',
  10,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Wash and line-dry the duvet',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-11',
  11,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Visit a garden centre just to smell things',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-12',
  12,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First outdoor coffee without a coat',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-13',
  13,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Make a spring playlist',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-14',
  14,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Hang washing outside',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-15',
  15,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Find magnolia trees in bloom',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-16',
  16,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Easter egg hunt (even if you''re the only hunter)',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-17',
  17,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Repot a houseplant',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-18',
  18,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Eat asparagus at its peak',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-19',
  19,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Rainy spring walk with a proper umbrella',
  'spring',
  'micro_joys'::wishlist_category,
  true,
  'spring-joys:spring-20',
  20,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring']::text[], ARRAY['spring']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'spring-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

-- List: autumn-joys
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'autumn-joys',
  'Autumn Things',
  '🍂',
  true,
  11
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Leaf-peeping walk',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-1',
  1,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First jumper day',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-2',
  2,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Pumpkin picking',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-3',
  3,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'A proper Sunday roast',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-4',
  4,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Light a candle ritual at dusk',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-5',
  5,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First hot chocolate of the season',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-6',
  6,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Cosy film under a blanket',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-7',
  7,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Collect conkers like a child',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-8',
  8,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Make soup from whatever''s in the fridge',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-9',
  9,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Wear boots for the first time',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-10',
  10,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Bake something with cinnamon',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-11',
  11,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Watch the sun set before five',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-12',
  12,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Go apple picking',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-13',
  13,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Read a book by lamplight',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-14',
  14,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Wear a scarf for the first time',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-15',
  15,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Kick through a pile of leaves',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-16',
  16,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Make mulled apple juice at home',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-17',
  17,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Visit a farmers'' market in a coat',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-18',
  18,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Put the big duvet on the bed',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-19',
  19,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Write a gratitude list for the year so far',
  'autumn',
  'micro_joys'::wishlist_category,
  true,
  'autumn-joys:autumn-20',
  20,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn']::text[], ARRAY['autumn']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'autumn-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

-- List: winter-joys
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'winter-joys',
  'Winter Things',
  '❄️',
  true,
  12
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Christmas market visit',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-1',
  1,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Ice skating — outdoor rink',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-2',
  2,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First snow walk (or first frost)',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-3',
  3,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Mulled wine somewhere warm after',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-4',
  4,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'New Year''s ritual — write one line for the year',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-5',
  5,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Fairy lights evening walk',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-6',
  6,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Proper cosy soup Sunday',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-7',
  7,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Secret Santa for friends',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-8',
  8,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Bake mince pies from scratch',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-9',
  9,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Watch a Christmas film you''ve never seen',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-10',
  10,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Wrap presents slowly with good paper',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-11',
  11,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Winter sunrise with a thermos',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-12',
  12,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Go to a pantomime or festive show',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-13',
  13,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Make a wreath or garland',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-14',
  14,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'First fire or candlelit evening in',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-15',
  15,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Eat roasted chestnuts from a bag',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-16',
  16,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Visit a light trail or illuminations',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-17',
  17,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Write cards by hand',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-18',
  18,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Hot bath on the coldest night',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-19',
  19,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Boxing Day walk — quiet streets',
  'winter',
  'micro_joys'::wishlist_category,
  true,
  'winter-joys:winter-20',
  20,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['winter']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'winter-joys'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

