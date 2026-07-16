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

