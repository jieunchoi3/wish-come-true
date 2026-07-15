-- Unified lists model — backup, migrate, drop legacy tables
-- Preserves wishes.created_at verbatim for user items (is_seeded=false)

-- ---------------------------------------------------------------------------
-- 0. Backup legacy tables
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS _backup_collections AS TABLE collections;
CREATE TABLE IF NOT EXISTS _backup_collection_items AS TABLE collection_items;
CREATE TABLE IF NOT EXISTS _backup_collection_gestures AS TABLE collection_gestures;
CREATE TABLE IF NOT EXISTS _backup_wishes AS TABLE wishes;

-- ---------------------------------------------------------------------------
-- 1. New enums + tables
-- ---------------------------------------------------------------------------
CREATE TYPE list_item_status AS ENUM ('open', 'done');

CREATE TABLE lists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  emoji       TEXT,
  slug        TEXT,
  is_seeded   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT lists_seeded_or_owned CHECK (
    (is_seeded = true AND user_id IS NULL) OR
    (is_seeded = false AND user_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX idx_lists_slug_seeded ON lists(slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_lists_user_id ON lists(user_id) WHERE user_id IS NOT NULL;

CREATE TABLE list_items (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id              UUID NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title                TEXT NOT NULL,
  note                 TEXT,
  category             wish_category NOT NULL DEFAULT 'micro_joys',
  image_url            TEXT,
  is_seeded            BOOLEAN NOT NULL DEFAULT false,
  source_seed_key      TEXT,
  sort_order           INT NOT NULL DEFAULT 0,
  time_needed          time_needed,
  cost                 cost_level,
  company              company_type,
  setting              setting_type,
  seasons              TEXT[] NOT NULL DEFAULT '{}',
  topic_tags           TEXT[] NOT NULL DEFAULT '{}',
  status               list_item_status NOT NULL DEFAULT 'open',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at         TIMESTAMPTZ,
  completion_photo_url TEXT,
  completion_note      TEXT,
  snoozed_until        DATE,
  last_surfaced_at     TIMESTAMPTZ,
  surfaced_count       INT NOT NULL DEFAULT 0,
  last_notified_at     TIMESTAMPTZ,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT list_items_seeded_or_owned CHECK (
    (is_seeded = true AND user_id IS NULL) OR
    (is_seeded = false AND user_id IS NOT NULL)
  )
);

CREATE INDEX idx_list_items_list_id ON list_items(list_id);
CREATE INDEX idx_list_items_user_id ON list_items(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_list_items_user_status ON list_items(user_id, status) WHERE user_id IS NOT NULL;
CREATE INDEX idx_list_items_seeded ON list_items(list_id) WHERE is_seeded = true;
CREATE INDEX idx_list_items_created_at ON list_items(user_id, created_at) WHERE is_seeded = false;
CREATE UNIQUE INDEX idx_list_items_seed_key ON list_items(list_id, source_seed_key)
  WHERE source_seed_key IS NOT NULL AND is_seeded = true;

-- Per-user progress on seeded catalogue rows (shared items, personal completion)
CREATE TABLE list_item_progress (
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  list_item_id         UUID NOT NULL REFERENCES list_items(id) ON DELETE CASCADE,
  status               list_item_status NOT NULL DEFAULT 'open',
  completed_at         TIMESTAMPTZ,
  completion_photo_url TEXT,
  completion_note      TEXT,
  snoozed_until        DATE,
  last_surfaced_at     TIMESTAMPTZ,
  surfaced_count       INT NOT NULL DEFAULT 0,
  last_notified_at     TIMESTAMPTZ,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, list_item_id)
);

CREATE INDEX idx_list_item_progress_user ON list_item_progress(user_id);

CREATE TRIGGER trg_lists_updated_at
  BEFORE UPDATE ON lists
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_list_items_updated_at
  BEFORE UPDATE ON list_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_list_item_progress_updated_at
  BEFORE UPDATE ON list_item_progress
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Migrate seeded lists
-- ---------------------------------------------------------------------------
INSERT INTO lists (id, user_id, title, emoji, slug, is_seeded, sort_order, created_at)
SELECT
  c.id,
  NULL,
  c.title,
  c.emoji,
  c.slug,
  true,
  ROW_NUMBER() OVER (ORDER BY c.slug)::int,
  c.created_at
FROM collections c;

-- ---------------------------------------------------------------------------
-- 3. Migrate seeded catalogue items
-- ---------------------------------------------------------------------------
INSERT INTO list_items (
  id, list_id, user_id, title, note, category, image_url,
  is_seeded, source_seed_key, sort_order,
  time_needed, cost, company, setting, seasons, topic_tags,
  status, created_at
)
SELECT
  ci.id,
  ci.collection_id,
  NULL,
  ci.title,
  ci.subtitle,
  CASE c.slug
    WHEN '100-movies' THEN 'watch_read'::wish_category
    WHEN '100-books' THEN 'watch_read'::wish_category
    WHEN 'cheese-atlas' THEN 'taste'::wish_category
    WHEN 'countries' THEN 'go'::wish_category
    WHEN 'london-100' THEN 'london'::wish_category
    WHEN 'summer-joys' THEN 'micro_joys'::wish_category
    ELSE 'someday'::wish_category
  END,
  NULL,
  true,
  ci.external_key,
  ci.sort_order,
  COALESCE(
    (ci.default_tags->>'time_needed')::time_needed,
    (c.default_tags->>'time_needed')::time_needed
  ),
  COALESCE(
    (ci.default_tags->>'cost')::cost_level,
    (c.default_tags->>'cost')::cost_level
  ),
  COALESCE(
    (ci.default_tags->>'company')::company_type,
    (c.default_tags->>'company')::company_type
  ),
  COALESCE(
    (ci.default_tags->>'setting')::setting_type,
    (c.default_tags->>'setting')::setting_type
  ),
  COALESCE(
    ARRAY(SELECT jsonb_array_elements_text(ci.default_tags->'seasons')),
    ARRAY(SELECT jsonb_array_elements_text(c.default_tags->'seasons')),
    '{}'::text[]
  ),
  COALESCE(
    ARRAY(SELECT jsonb_array_elements_text(ci.default_tags->'topic_tags')),
    ARRAY(SELECT jsonb_array_elements_text(c.default_tags->'topic_tags')),
    '{}'::text[]
  ),
  'open'::list_item_status,
  ci.created_at
FROM collection_items ci
JOIN collections c ON c.id = ci.collection_id;

-- ---------------------------------------------------------------------------
-- 4. Per-user default list for orphan wishes (no source collection)
-- ---------------------------------------------------------------------------
INSERT INTO lists (id, user_id, title, emoji, is_seeded, sort_order, created_at)
SELECT
  gen_random_uuid(),
  w.user_id,
  'mine',
  '✨',
  false,
  0,
  MIN(w.created_at)
FROM wishes w
WHERE w.source_collection_item_id IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM lists l
    WHERE l.user_id = w.user_id AND l.title = 'mine' AND l.is_seeded = false
  )
GROUP BY w.user_id;

-- ---------------------------------------------------------------------------
-- 5. Migrate wishes → user list_items (PRESERVE created_at)
-- ---------------------------------------------------------------------------
INSERT INTO list_items (
  id, list_id, user_id, title, note, category, image_url,
  is_seeded, source_seed_key, sort_order,
  time_needed, cost, company, setting, seasons, topic_tags,
  status, created_at, completed_at, completion_photo_url, completion_note,
  snoozed_until, last_surfaced_at, surfaced_count, last_notified_at
)
SELECT
  w.id,
  COALESCE(ci.collection_id, dl.id),
  w.user_id,
  w.title,
  w.note,
  w.category,
  w.image_url,
  false,
  ci.external_key,
  0,
  w.time_needed,
  w.cost,
  w.company,
  w.setting,
  w.seasons,
  w.topic_tags,
  CASE WHEN w.status = 'done' THEN 'done'::list_item_status ELSE 'open'::list_item_status END,
  w.created_at,  -- verbatim — nostalgia signal
  w.completed_at,
  w.completion_photo_url,
  w.completion_note,
  w.snoozed_until,
  w.last_surfaced_at,
  w.surfaced_count,
  NULL
FROM wishes w
LEFT JOIN collection_items ci ON ci.id = w.source_collection_item_id
LEFT JOIN LATERAL (
  SELECT l.id FROM lists l
  WHERE l.user_id = w.user_id AND l.title = 'mine' AND l.is_seeded = false
  LIMIT 1
) dl ON w.source_collection_item_id IS NULL;

-- ---------------------------------------------------------------------------
-- 6. Migrate ticked/skipped gestures → list_item_progress
-- ---------------------------------------------------------------------------
INSERT INTO list_item_progress (
  user_id, list_item_id, status, completed_at, updated_at
)
SELECT
  cg.user_id,
  cg.collection_item_id,
  CASE WHEN cg.gesture = 'ticked' THEN 'done'::list_item_status ELSE 'open'::list_item_status END,
  CASE WHEN cg.gesture = 'ticked' THEN cg.updated_at ELSE NULL END,
  cg.updated_at
FROM collection_gestures cg
WHERE cg.gesture IN ('ticked', 'skipped')
ON CONFLICT (user_id, list_item_id) DO NOTHING;

-- Don't duplicate progress for items already done via wish migration on same seeded row
-- (wishes became separate user items; gestures on catalogue rows stay in progress)

-- ---------------------------------------------------------------------------
-- 7. Drop legacy triggers + tables
-- ---------------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_wish_done_sync_gesture ON wishes;

DROP TABLE IF EXISTS collection_gestures CASCADE;
DROP TABLE IF EXISTS wishes CASCADE;
DROP TABLE IF EXISTS collection_items CASCADE;
DROP TABLE IF EXISTS collections CASCADE;

-- ---------------------------------------------------------------------------
-- 8. RLS
-- ---------------------------------------------------------------------------
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_item_progress ENABLE ROW LEVEL SECURITY;

-- Lists: seeded readable by all authenticated; user lists owned
CREATE POLICY "lists_select_seeded"
  ON lists FOR SELECT TO authenticated
  USING (is_seeded = true);

CREATE POLICY "lists_select_own"
  ON lists FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "lists_insert_own"
  ON lists FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_seeded = false);

CREATE POLICY "lists_update_own"
  ON lists FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "lists_delete_own"
  ON lists FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND is_seeded = false);

-- List items: seeded catalogue readable; user items owned
CREATE POLICY "list_items_select_seeded"
  ON list_items FOR SELECT TO authenticated
  USING (is_seeded = true AND user_id IS NULL);

CREATE POLICY "list_items_select_own"
  ON list_items FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "list_items_insert_own"
  ON list_items FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_seeded = false);

CREATE POLICY "list_items_update_own"
  ON list_items FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "list_items_delete_own"
  ON list_items FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND is_seeded = false);

-- Progress: full CRUD own rows
CREATE POLICY "list_item_progress_select_own"
  ON list_item_progress FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "list_item_progress_insert_own"
  ON list_item_progress FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "list_item_progress_update_own"
  ON list_item_progress FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "list_item_progress_delete_own"
  ON list_item_progress FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 9. Verify
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  seeded_lists INT;
  seeded_items INT;
  user_items INT;
BEGIN
  SELECT COUNT(*) INTO seeded_lists FROM lists WHERE is_seeded = true;
  SELECT COUNT(*) INTO seeded_items FROM list_items WHERE is_seeded = true;
  SELECT COUNT(*) INTO user_items FROM list_items WHERE is_seeded = false;

  RAISE NOTICE 'Migration complete: % seeded lists, % seeded items, % user items',
    seeded_lists, seeded_items, user_items;
  RAISE NOTICE 'Backups: _backup_collections, _backup_collection_items, _backup_collection_gestures, _backup_wishes';
END $$;
