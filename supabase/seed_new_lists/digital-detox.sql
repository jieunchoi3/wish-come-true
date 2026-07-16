-- Idempotent wishlist seed — digital-detox only. Safe to re-run.
-- Does NOT touch any other lists.

-- List: digital-detox
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'digital-detox',
  'Digital Detox',
  '📵',
  true,
  18
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Leave your phone in another room for an evening',
  'harder than it sounds — dinner, book, actual quiet',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:leave-your-phone-in-another-room-for-an-evening',
  1,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Delete one app you doom-scroll',
  'one tap less temptation, noticeably calmer',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:delete-one-app-you-doom-scroll',
  2,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Turn off all non-essential notifications',
  'your phone stops shouting; you pick it up on purpose',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:turn-off-all-non-essential-notifications',
  3,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Eat one meal with your phone somewhere else',
  'taste what you are eating, not what you are scrolling',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:eat-one-meal-with-your-phone-somewhere-else',
  4,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'A walk with no phone at all',
  'no map, no podcast — just the street',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:a-walk-with-no-phone-at-all',
  5,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'outdoors'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Read on paper instead of a screen for an hour',
  'eyes unclench, mind slows down',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:read-on-paper-instead-of-a-screen-for-an-hour',
  6,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Turn your phone to greyscale for a day',
  'colour is the bait — without it, less pull',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:turn-your-phone-to-greyscale-for-a-day',
  7,
  'full_day'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'No phone in bed — charge it in another room tonight',
  'wake without reaching; sleep without one last scroll',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:no-phone-in-bed-charge-it-in-another-room-tonight',
  8,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'A full offline Sunday',
  'no errands on the feed — just the day in front of you',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:a-full-offline-sunday',
  9,
  'full_day'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'No social media for 24 hours',
  'one day off the comparison machine',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:no-social-media-for-24-hours',
  10,
  'full_day'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'A screen-free morning until noon',
  'slow start, no inbox before coffee',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:a-screen-free-morning-until-noon',
  11,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Handwrite something instead of typing it',
  'journal, list, letter — pen slows the thought',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:handwrite-something-instead-of-typing-it',
  12,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'A weekend with your phone in a drawer, emergencies only',
  'two days of not checking by reflex',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:a-weekend-with-your-phone-in-a-drawer-emergencies-only',
  13,
  'weekend'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'A digital sabbath — one full day, no screens at all',
  'better than it sounds once the itch passes',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:a-digital-sabbath-one-full-day-no-screens-at-all',
  14,
  'full_day'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'No phone for the first hour after waking up',
  'let the day arrive before the feed does',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:no-phone-for-the-first-hour-after-waking-up',
  15,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'No screens after 9pm tonight',
  'dim light, real wind-down, easier sleep',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:no-screens-after-9pm-tonight',
  16,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Set a real bedtime alarm clock so your phone doesn''t need to be near your bed',
  'a small purchase, a big boundary',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:set-a-real-bedtime-alarm-clock-so-your-phone-doesn-t-need-to-be-near-your-bed',
  17,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Go through your phone and delete 20 photos you don''t need',
  'less clutter, lighter camera roll',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:go-through-your-phone-and-delete-20-photos-you-don-t-need',
  18,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Unfollow 10 accounts that don''t make you feel good',
  'curate the feed like you mean it',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:unfollow-10-accounts-that-don-t-make-you-feel-good',
  19,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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
SELECT l.id, 'Turn off autoplay everywhere you can find it',
  'stop the next video choosing for you',
  'micro_joys'::wishlist_category,
  true,
  'digital-detox:turn-off-autoplay-everywhere-you-can-find-it',
  20,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['digital-detox', 'rest']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'digital-detox'
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

-- Verify (optional)
SELECT l.slug, l.title,
  (SELECT COUNT(*) FROM wishlist_items i WHERE i.list_id = l.id AND i.is_seeded = true) AS item_count
FROM wishlist_lists l WHERE l.slug = 'digital-detox';

