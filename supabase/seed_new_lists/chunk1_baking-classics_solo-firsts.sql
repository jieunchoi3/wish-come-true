-- Chunk 1 of 5 — baking-classics, solo-firsts
-- Idempotent upserts. Safe to re-run. Does NOT touch the original 6 lists.

-- List: baking-classics
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'baking-classics',
  'Baking Classics',
  '🍰',
  true,
  7
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Macarons',
  'almond meringue, patience',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:macarons',
  1,
  'full_day'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Sourdough loaf',
  'starter feed, overnight rest',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:sourdough-loaf',
  2,
  'weekend'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Croissants',
  'laminated dough, 3 days',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:croissants',
  3,
  'weekend'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Victoria sponge',
  'classic sponge, jam and cream',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:victoria-sponge',
  4,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Salt bread',
  'Irish soda-style, no yeast wait',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:salt-bread',
  5,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Chocolate babka',
  'enriched dough, chocolate swirl',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:chocolate-babka',
  6,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Bagels',
  'boil then bake, chewy crust',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:bagels',
  7,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Brioche',
  'butter-rich, overnight chill',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:brioche',
  8,
  'weekend'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Focaccia',
  'olive oil dimples, same-day bake',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:focaccia',
  9,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Ciabatta',
  'wet dough, open crumb',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:ciabatta',
  10,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Pain au chocolat',
  'croissant dough, chocolate batons',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:pain-au-chocolat',
  11,
  'weekend'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Madeleines',
  'shell-shaped, lemon zest',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:madeleines',
  12,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Financiers',
  'brown butter, almond flour',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:financiers',
  13,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Lemon drizzle cake',
  'sharp glaze, tea-time classic',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:lemon-drizzle-cake',
  14,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Banana bread',
  'ripe bananas, one bowl',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:banana-bread',
  15,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Carrot cake',
  'cream cheese frosting',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:carrot-cake',
  16,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Apple pie',
  'butter crust, seasonal fruit',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:apple-pie',
  17,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Tarte tatin',
  'caramelised upside-down apples',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:tarte-tatin',
  18,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Clafoutis',
  'cherry batter pudding',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:clafoutis',
  19,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Crème brûlée',
  'custard, torched sugar top',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:cr-me-br-l-e',
  20,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Pavlova',
  'meringue nest, whipped cream',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:pavlova',
  21,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Shortbread',
  'three ingredients, press into tin',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:shortbread',
  22,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Scones',
  'clotted cream ready',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:scones',
  23,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Welsh cakes',
  'griddle, currants',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:welsh-cakes',
  24,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Soda bread',
  'buttermilk, no knead',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:soda-bread',
  25,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Pizza dough from scratch',
  'stretch, stone-hot oven',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:pizza-dough-from-scratch',
  26,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Cinnamon rolls',
  'soft enriched, cream cheese glaze',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:cinnamon-rolls',
  27,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Choux pastry éclairs',
  'pipe, fill, glaze',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:choux-pastry-clairs',
  28,
  'full_day'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Tiramisu',
  'no bake, coffee soak',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:tiramisu',
  29,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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
SELECT l.id, 'Gingerbread',
  'molasses, cut-out shapes',
  'make_learn'::wishlist_category,
  true,
  'baking-classics:gingerbread',
  30,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'any'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['winter']::text[], ARRAY['baking']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'baking-classics'
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

-- List: solo-firsts
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'solo-firsts',
  'Solo Firsts',
  '🚶',
  true,
  8
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Solo cinema trip',
  'pick the film only you want',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-cinema-trip',
  1,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo dinner at a nice restaurant',
  'book a table for one, no phone',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-dinner-at-a-nice-restaurant',
  2,
  'few_hours'::wishlist_time_needed, 'splurge'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo weekend trip',
  'one bag, one town, no itinerary',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-weekend-trip',
  3,
  'weekend'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'travel'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo hike',
  'trail map, your own pace',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-hike',
  4,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Sit in a café with no phone',
  'one drink, one hour, watch the room',
  'brave'::wishlist_category,
  true,
  'solo-firsts:sit-in-a-caf-with-no-phone',
  5,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo museum visit',
  'linger at one room as long as you like',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-museum-visit',
  6,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'art']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Ask a question in a talk or Q&A',
  'raise your hand, use your voice',
  'brave'::wishlist_category,
  true,
  'solo-firsts:ask-a-question-in-a-talk-or-q-a',
  7,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Travel alone for a week',
  'foreign city, your own rhythm',
  'brave'::wishlist_category,
  true,
  'solo-firsts:travel-alone-for-a-week',
  8,
  'trip'::wishlist_time_needed, 'splurge'::wishlist_cost_level, 'solo'::wishlist_company_type, 'travel'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo matinee',
  'weekday afternoon, empty row',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-matinee',
  9,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Eat lunch alone at the counter',
  'watch the kitchen work',
  'brave'::wishlist_category,
  true,
  'solo-firsts:eat-lunch-alone-at-the-counter',
  10,
  '30min'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo gallery afternoon',
  'one exhibition, no rushing',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-gallery-afternoon',
  11,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'art']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Walk a new neighbourhood alone',
  'no destination, just corners',
  'brave'::wishlist_category,
  true,
  'solo-firsts:walk-a-new-neighbourhood-alone',
  12,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo concert or gig',
  'stand where you want, leave when you want',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-concert-or-gig',
  13,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Take yourself to afternoon tea',
  'tiered stand, no sharing required',
  'brave'::wishlist_category,
  true,
  'solo-firsts:take-yourself-to-afternoon-tea',
  14,
  'few_hours'::wishlist_time_needed, 'splurge'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo swim or lido session',
  'lanes or open water, your count',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-swim-or-lido-session',
  15,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['summer']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Bookshop browse alone',
  'read the first chapter on the floor',
  'brave'::wishlist_category,
  true,
  'solo-firsts:bookshop-browse-alone',
  16,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo sunrise watch',
  'thermos, no one to hurry you',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-sunrise-watch',
  17,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Go to a market alone',
  'taste samples, buy one strange thing',
  'brave'::wishlist_category,
  true,
  'solo-firsts:go-to-a-market-alone',
  18,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Solo train day trip',
  'return ticket, wander off at a stop',
  'brave'::wishlist_category,
  true,
  'solo-firsts:solo-train-day-trip',
  19,
  'full_day'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'travel'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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
SELECT l.id, 'Write in a pub alone',
  'one pint, one notebook, no performance',
  'brave'::wishlist_category,
  true,
  'solo-firsts:write-in-a-pub-alone',
  20,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['solo', 'brave']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'solo-firsts'
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

