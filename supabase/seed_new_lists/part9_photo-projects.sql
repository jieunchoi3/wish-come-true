-- List: photo-projects
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'photo-projects',
  'Photo Projects',
  '📷',
  true,
  15
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Find and shoot 5 red doors',
  'colour hunt, one neighbourhood',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:find-and-shoot-5-red-doors',
  1,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'A week of golden hour',
  'same walk, seven sunsets',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:a-week-of-golden-hour',
  2,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Everything blue you see in one day',
  'sky, signs, bags — collect the hue',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:everything-blue-you-see-in-one-day',
  3,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Same spot across four seasons',
  'one frame, four returns',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:same-spot-across-four-seasons',
  4,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['spring', 'summer', 'autumn', 'winter']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Strangers'' hands',
  'markets, cafés — ask or shoot from afar',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:strangers-hands',
  5,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Shadows at noon',
  'harsh light, graphic shapes',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:shadows-at-noon',
  6,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'One roll of film, one day',
  '36 frames, no chimping',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:one-roll-of-film-one-day',
  7,
  'full_day'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Your daily coffee for a week',
  'seven cups, seven moods',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:your-daily-coffee-for-a-week',
  8,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Textures on a walk',
  'brick, bark, rust, fabric — fill a grid',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:textures-on-a-walk',
  9,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Reflections',
  'puddles, glass, polished stone',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:reflections',
  10,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'A colour a day for a week',
  'Monday red, Tuesday yellow — assign your own',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:a-colour-a-day-for-a-week',
  11,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Five yellow things before noon',
  'morning scavenger hunt',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:five-yellow-things-before-noon',
  12,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Rainy window portraits',
  'condensation, street blur behind',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:rainy-window-portraits',
  13,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['autumn', 'winter']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Your shoes from above for seven days',
  'flat-lay diary, same floor tile',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:your-shoes-from-above-for-seven-days',
  14,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Grocery aisle symmetry',
  'cans, colours, repeating lines',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:grocery-aisle-symmetry',
  15,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Staircases in shadow',
  'geometry and contrast on the way up',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:staircases-in-shadow',
  16,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'A week of front doors',
  'paint, knockers, plants — street portrait',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:a-week-of-front-doors',
  17,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Puddle reflections after rain',
  'flip the city upside down',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:puddle-reflections-after-rain',
  18,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['autumn', 'winter']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Hands holding warm drinks',
  'mugs, gloves, steam in cold air',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:hands-holding-warm-drinks',
  19,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['autumn', 'winter']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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
SELECT l.id, 'Night lights bokeh on one street',
  'one lens, one block after dark',
  'make_learn'::wishlist_category,
  true,
  'photo-projects:night-lights-bokeh-on-one-street',
  20,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['photography', 'creative']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'photo-projects'
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

