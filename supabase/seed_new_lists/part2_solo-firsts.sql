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

