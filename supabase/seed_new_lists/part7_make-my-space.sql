-- List: make-my-space
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'make-my-space',
  'Make My Space',
  '🪴',
  true,
  13
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Get a plant',
  '15 min, instant mood lift',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:get-a-plant',
  1,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Hang something on a bare wall',
  'one nail, one frame, done',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:hang-something-on-a-bare-wall',
  2,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Swap a lamp for warmer light',
  '2700K bulb, softer evenings',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:swap-a-lamp-for-warmer-light',
  3,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Get a proper doormat',
  'first thing guests notice',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:get-a-proper-doormat',
  4,
  '30min'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Frame a photo you love',
  'print, mat, hang — 45 minutes',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:frame-a-photo-you-love',
  5,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Buy fresh flowers for no reason',
  'market run, vase ready',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:buy-fresh-flowers-for-no-reason',
  6,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Rearrange the furniture',
  'new flow without spending',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:rearrange-the-furniture',
  7,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Add a scent — candle or diffuser',
  'one note for the whole flat',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:add-a-scent-candle-or-diffuser',
  8,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Fix that one annoying thing',
  'squeaky hinge, loose handle, finally',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:fix-that-one-annoying-thing',
  9,
  '30min'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Get good bedsheets',
  'cotton percale, sleep upgrade',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:get-good-bedsheets',
  10,
  '30min'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Put up fairy lights',
  'warm corners, instant cosiness',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:put-up-fairy-lights',
  11,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Clear one cluttered surface properly',
  'not shove — actually sort',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:clear-one-cluttered-surface-properly',
  12,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Wash curtains or throw blankets',
  'fresh smell, brighter room',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:wash-curtains-or-throw-blankets',
  13,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Mount a small shelf',
  'drill, level, books off the floor',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:mount-a-small-shelf',
  14,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Swap tired throw pillows',
  'two new covers, whole sofa shifts',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:swap-tired-throw-pillows',
  15,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Organise under the sink',
  'bins, labels, one afternoon',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:organise-under-the-sink',
  16,
  'few_hours'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Paint or stain one piece of furniture',
  'chalk paint, weekend project',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:paint-or-stain-one-piece-of-furniture',
  17,
  'weekend'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Hang a mirror to bounce light',
  'small hallway, bigger feel',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:hang-a-mirror-to-bounce-light',
  18,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Label your spice jars',
  'uniform jars, readable tops',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:label-your-spice-jars',
  19,
  '30min'::wishlist_time_needed, 'cheap'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'Upgrade your bath towels',
  'matching set, hotel-at-home',
  'micro_joys'::wishlist_category,
  true,
  'make-my-space:upgrade-your-bath-towels',
  20,
  '30min'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'solo'::wishlist_company_type, 'home'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['home', 'cosy']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'make-my-space'
ON CONFLICT (list_id, source_seed_key) WHERE source_seed_key IS NOT NULL AND is_seeded = true DO UPDATE SET
  title = EXCLUDED.title,
  note = EXCLUDED.note,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  time_needed = EXCLUDED.time_needed,
  cost = EXCLUDED.cost,
  company = EXCLUDED.company,
  setting = EXCLUDED.setting,
  seasons = EXCLUDED.seasons,
  topic_tags = EXCLUDED.topic_tags;

