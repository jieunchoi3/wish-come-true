-- List: weekend-skills
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'weekend-skills',
  'Weekend Skills',
  '🛠️',
  true,
  16
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Basic knots',
  'bowline, clove hitch — 30 minutes of rope',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:basic-knots',
  1,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Read a wine label properly',
  'region, grape, vintage — one bottle decoded',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:read-a-wine-label-properly',
  2,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Identify 5 constellations',
  'Orion, Ursa Major — one clear night',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:identify-5-constellations',
  3,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Whittle a spoon',
  'soft wood, one blade, patient shavings',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:whittle-a-spoon',
  4,
  'full_day'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Basic bike repair',
  'puncture patch, chain lube, brake check',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:basic-bike-repair',
  5,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Hand-letter the alphabet',
  'one sheet, thick marker, even spacing',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:hand-letter-the-alphabet',
  6,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Make pasta from scratch',
  'flour, eggs, roll by hand — one dinner',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:make-pasta-from-scratch',
  7,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Tie a scarf five ways',
  'French, loop, knot — mirror practice',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:tie-a-scarf-five-ways',
  8,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Basic car maintenance checks',
  'oil, tyres, fluids — owner manual open',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:basic-car-maintenance-checks',
  9,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Darn a sock',
  'needle, thread, invisible mend',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:darn-a-sock',
  10,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Make a proper cocktail',
  'spirit, bitters, stir — one classic recipe',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:make-a-proper-cocktail',
  11,
  '30min'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Learn 10 chess openings',
  'names and first three moves each',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:learn-10-chess-openings',
  12,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Film photography exposure triangle',
  'aperture, shutter, ISO — one roll test',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:film-photography-exposure-triangle',
  13,
  'full_day'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Fold an origami crane',
  'one square paper, crease by crease',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:fold-an-origami-crane',
  14,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Whistle with your fingers',
  'wet, tuck, blow — loud and useless fun',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:whistle-with-your-fingers',
  15,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Basic first aid',
  'CPR steps, bandage, when to call — one course or video',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:basic-first-aid',
  16,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Sharpen a kitchen knife properly',
  'stone or steel, safer cooking after',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:sharpen-a-kitchen-knife-properly',
  17,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Read a map without GPS',
  'paper map, compass optional — one park route',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:read-a-map-without-gps',
  18,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Tie a bowline knot',
  'the knot that holds when it matters',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:tie-a-bowline-knot',
  19,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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
SELECT l.id, 'Tune a guitar by ear',
  'fifth fret method, one string at a time',
  'make_learn'::wishlist_category,
  true,
  'weekend-skills:tune-a-guitar-by-ear',
  20,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['skill', 'learning']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'weekend-skills'
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

