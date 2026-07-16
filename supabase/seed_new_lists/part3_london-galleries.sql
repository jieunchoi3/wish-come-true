-- List: london-galleries
INSERT INTO wishlist_lists (slug, title, emoji, is_seeded, sort_order)
VALUES (
  'london-galleries',
  'London: Galleries & Exhibitions',
  '🖼️',
  true,
  9
)
ON CONFLICT (slug) WHERE slug IS NOT NULL DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  is_seeded = EXCLUDED.is_seeded,
  sort_order = EXCLUDED.sort_order;

INSERT INTO wishlist_items (list_id, title, note, category, is_seeded, source_seed_key, sort_order, time_needed, cost, company, setting, seasons, topic_tags, status)
SELECT l.id, 'National Gallery',
  'Trafalgar Square · free',
  'london'::wishlist_category,
  true,
  'london-galleries:national-gallery',
  1,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Tate Modern',
  'South Bank',
  'london'::wishlist_category,
  true,
  'london-galleries:tate-modern',
  2,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Tate Britain',
  'Millbank',
  'london'::wishlist_category,
  true,
  'london-galleries:tate-britain',
  3,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Design Museum',
  'Kensington',
  'london'::wishlist_category,
  true,
  'london-galleries:design-museum',
  4,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Barbican Art Gallery',
  'City of London',
  'london'::wishlist_category,
  true,
  'london-galleries:barbican-art-gallery',
  5,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Serpentine Galleries',
  'Hyde Park',
  'london'::wishlist_category,
  true,
  'london-galleries:serpentine-galleries',
  6,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Sir John Soane''s Museum',
  'Holborn · free',
  'london'::wishlist_category,
  true,
  'london-galleries:sir-john-soane-s-museum',
  7,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Wallace Collection',
  'Marylebone · free',
  'london'::wishlist_category,
  true,
  'london-galleries:wallace-collection',
  8,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Somerset House',
  'Strand',
  'london'::wishlist_category,
  true,
  'london-galleries:somerset-house',
  9,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Photographers'' Gallery',
  'Soho',
  'london'::wishlist_category,
  true,
  'london-galleries:photographers-gallery',
  10,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Dulwich Picture Gallery',
  'Dulwich',
  'london'::wishlist_category,
  true,
  'london-galleries:dulwich-picture-gallery',
  11,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Courtauld Gallery',
  'Somerset House',
  'london'::wishlist_category,
  true,
  'london-galleries:courtauld-gallery',
  12,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Hayward Gallery — see whatever''s on',
  'South Bank',
  'london'::wishlist_category,
  true,
  'london-galleries:hayward-gallery-see-whatever-s-on',
  13,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Whitechapel Gallery',
  'Whitechapel · free',
  'london'::wishlist_category,
  true,
  'london-galleries:whitechapel-gallery',
  14,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Camden Arts Centre',
  'Hampstead',
  'london'::wishlist_category,
  true,
  'london-galleries:camden-arts-centre',
  15,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Institute of Contemporary Arts',
  'The Mall',
  'london'::wishlist_category,
  true,
  'london-galleries:institute-of-contemporary-arts',
  16,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Saatchi Gallery',
  'Chelsea',
  'london'::wishlist_category,
  true,
  'london-galleries:saatchi-gallery',
  17,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Royal Academy of Arts',
  'Piccadilly',
  'london'::wishlist_category,
  true,
  'london-galleries:royal-academy-of-arts',
  18,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'National Portrait Gallery',
  'St Martin''s Place · free',
  'london'::wishlist_category,
  true,
  'london-galleries:national-portrait-gallery',
  19,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'British Museum — highlights rooms',
  'Bloomsbury · free',
  'london'::wishlist_category,
  true,
  'london-galleries:british-museum-highlights-rooms',
  20,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Victoria and Albert Museum',
  'South Kensington · free',
  'london'::wishlist_category,
  true,
  'london-galleries:victoria-and-albert-museum',
  21,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Museum of the Home',
  'Hoxton',
  'london'::wishlist_category,
  true,
  'london-galleries:museum-of-the-home',
  22,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Garden Museum',
  'Lambeth',
  'london'::wishlist_category,
  true,
  'london-galleries:garden-museum',
  23,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Fashion and Textile Museum',
  'Bermondsey',
  'london'::wishlist_category,
  true,
  'london-galleries:fashion-and-textile-museum',
  24,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'House of Illustration',
  'King''s Cross',
  'london'::wishlist_category,
  true,
  'london-galleries:house-of-illustration',
  25,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'The Mosaic Rooms',
  'Earl''s Court · free',
  'london'::wishlist_category,
  true,
  'london-galleries:the-mosaic-rooms',
  26,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Gasworks',
  'Vauxhall · free',
  'london'::wishlist_category,
  true,
  'london-galleries:gasworks',
  27,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Studio Voltaire',
  'Clapham',
  'london'::wishlist_category,
  true,
  'london-galleries:studio-voltaire',
  28,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Chisenhale Gallery',
  'Bow · free',
  'london'::wishlist_category,
  true,
  'london-galleries:chisenhale-gallery',
  29,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Auto Italia',
  'Bethnal Green · free',
  'london'::wishlist_category,
  true,
  'london-galleries:auto-italia',
  30,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Cell Project Space',
  'Bermondsey · free',
  'london'::wishlist_category,
  true,
  'london-galleries:cell-project-space',
  31,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'South London Gallery',
  'Peckham · free',
  'london'::wishlist_category,
  true,
  'london-galleries:south-london-gallery',
  32,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Drawing Room',
  'Bermondsey',
  'london'::wishlist_category,
  true,
  'london-galleries:drawing-room',
  33,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Pitzhanger Manor & Gallery',
  'Ealing',
  'london'::wishlist_category,
  true,
  'london-galleries:pitzhanger-manor-gallery',
  34,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'William Morris Gallery',
  'Walthamstow · free',
  'london'::wishlist_category,
  true,
  'london-galleries:william-morris-gallery',
  35,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Ben Uri Gallery',
  'St John''s Wood',
  'london'::wishlist_category,
  true,
  'london-galleries:ben-uri-gallery',
  36,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Freud Museum',
  'Hampstead',
  'london'::wishlist_category,
  true,
  'london-galleries:freud-museum',
  37,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Keats House',
  'Hampstead',
  'london'::wishlist_category,
  true,
  'london-galleries:keats-house',
  38,
  'few_hours'::wishlist_time_needed, 'moderate'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Museum of London Docklands',
  'Canary Wharf · free',
  'london'::wishlist_category,
  true,
  'london-galleries:museum-of-london-docklands',
  39,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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
SELECT l.id, 'Queen''s House',
  'Greenwich · free',
  'london'::wishlist_category,
  true,
  'london-galleries:queen-s-house',
  40,
  'few_hours'::wishlist_time_needed, 'free'::wishlist_cost_level, 'any'::wishlist_company_type, 'indoors_out'::wishlist_setting_type, ARRAY['any']::text[], ARRAY['art', 'london']::text[],
  'open'::wishlist_item_status
FROM wishlist_lists l WHERE l.slug = 'london-galleries'
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

