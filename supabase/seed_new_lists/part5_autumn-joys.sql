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

