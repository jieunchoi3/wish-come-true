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

