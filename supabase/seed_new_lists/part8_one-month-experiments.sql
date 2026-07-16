-- List: one-month-experiments
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'one-month-experiments',
  'One Month Experiments',
  '🗓️',
  true,
  14
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'No-spend month',
  'needs only, no impulse buys — see what sticks',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:no-spend-month',
  1,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'No social media for 30 days',
  'delete apps, notice your attention return',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:no-social-media-for-30-days',
  2,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Cold showers for a month',
  '30 seconds cold finish — mood and grit',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:cold-showers-for-a-month',
  3,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'A book a week for a month',
  'four finished books, one shelf cleared',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:a-book-a-week-for-a-month',
  4,
  'trip'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Cook every meal from scratch for 30 days',
  'no ready meals — skill and taste compound',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:cook-every-meal-from-scratch-for-30-days',
  5,
  'trip'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Walk 10k steps daily for a month',
  'same route or new — just move',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:walk-10k-steps-daily-for-a-month',
  6,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'No alcohol for a month',
  'clearer mornings, honest evenings',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:no-alcohol-for-a-month',
  7,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Journal every night for 30 days',
  'three lines minimum, no performance',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:journal-every-night-for-30-days',
  8,
  'trip'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Learn 5 new words a day in a language',
  '150 words in a month — start speaking',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:learn-5-new-words-a-day-in-a-language',
  9,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Digital sunset — no screens after 9pm',
  'book, bath, early sleep for a month',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:digital-sunset-no-screens-after-9pm',
  10,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Meat-free month',
  'vegetarian by default — new recipes weekly',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:meat-free-month',
  11,
  'trip'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Write one thank-you note a day',
  '30 people who matter, on paper',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:write-one-thank-you-note-a-day',
  12,
  'trip'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Meditate 10 minutes daily for 30 days',
  'same time, same chair, no streak pressure',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:meditate-10-minutes-daily-for-30-days',
  13,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'No takeaway for a month',
  'cook or assemble — wallet and kitchen win',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:no-takeaway-for-a-month',
  14,
  'trip'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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
SELECT l.id, 'Photograph one small joy every day',
  '30 images of ordinary good things',
  'brave'::wishlist_category,
  true,
  'one-month-experiments:photograph-one-small-joy-every-day',
  15,
  'trip'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['challenge', 'self-experiment']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'one-month-experiments'
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

