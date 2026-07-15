-- Wishlist app schema — isolated via wishlist_ prefix on shared Supabase project
-- ADDITIVE ONLY: creates wishlist_* objects; does not touch other tables.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums (wishlist_ prefix — no collision with other apps)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE wishlist_category AS ENUM (
    'taste', 'watch_read', 'go', 'london', 'make_learn',
    'micro_joys', 'brave', 'people', 'someday'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE wishlist_time_needed AS ENUM (
    '30min', 'few_hours', 'full_day', 'weekend', 'trip'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE wishlist_cost_level AS ENUM (
    'free', 'cheap', 'moderate', 'splurge'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE wishlist_company_type AS ENUM (
    'solo', 'friends', 'date', 'family', 'any'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE wishlist_setting_type AS ENUM (
    'home', 'indoors_out', 'outdoors', 'travel'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE wishlist_item_status AS ENUM ('open', 'done');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- updated_at helper (wishlist-specific function name)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wishlist_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- wishlist_profiles
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_profiles (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name     TEXT,
  lock_code        TEXT CHECK (lock_code IS NULL OR lock_code ~ '^\d{4}$'),
  onboarding_done  BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_wishlist_profiles_updated_at ON wishlist_profiles;
CREATE TRIGGER trg_wishlist_profiles_updated_at
  BEFORE UPDATE ON wishlist_profiles
  FOR EACH ROW EXECUTE FUNCTION wishlist_set_updated_at();

-- ---------------------------------------------------------------------------
-- wishlist_lists
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_lists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  emoji       TEXT,
  slug        TEXT,
  is_seeded   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT wishlist_lists_seeded_or_owned CHECK (
    (is_seeded = true AND user_id IS NULL) OR
    (is_seeded = false AND user_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_lists_slug
  ON wishlist_lists(slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_wishlist_lists_user_id
  ON wishlist_lists(user_id) WHERE user_id IS NOT NULL;

DROP TRIGGER IF EXISTS trg_wishlist_lists_updated_at ON wishlist_lists;
CREATE TRIGGER trg_wishlist_lists_updated_at
  BEFORE UPDATE ON wishlist_lists
  FOR EACH ROW EXECUTE FUNCTION wishlist_set_updated_at();

-- ---------------------------------------------------------------------------
-- wishlist_items
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_items (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id              UUID NOT NULL REFERENCES wishlist_lists(id) ON DELETE CASCADE,
  user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title                TEXT NOT NULL,
  note                 TEXT,
  category             wishlist_category NOT NULL DEFAULT 'micro_joys',
  image_url            TEXT,
  is_seeded            BOOLEAN NOT NULL DEFAULT false,
  source_seed_key      TEXT,
  sort_order           INT NOT NULL DEFAULT 0,
  time_needed          wishlist_time_needed,
  cost                 wishlist_cost_level,
  company              wishlist_company_type,
  setting              wishlist_setting_type,
  seasons              TEXT[] NOT NULL DEFAULT '{}',
  topic_tags           TEXT[] NOT NULL DEFAULT '{}',
  status               wishlist_item_status NOT NULL DEFAULT 'open',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at         TIMESTAMPTZ,
  completion_photo_url TEXT,
  completion_note      TEXT,
  snoozed_until        DATE,
  last_surfaced_at     TIMESTAMPTZ,
  surfaced_count       INT NOT NULL DEFAULT 0,
  last_notified_at     TIMESTAMPTZ,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT wishlist_items_seeded_or_owned CHECK (
    (is_seeded = true AND user_id IS NULL) OR
    (is_seeded = false AND user_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_wishlist_items_list_id ON wishlist_items(list_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id
  ON wishlist_items(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_status
  ON wishlist_items(user_id, status) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_wishlist_items_seeded
  ON wishlist_items(list_id) WHERE is_seeded = true;
CREATE INDEX IF NOT EXISTS idx_wishlist_items_created_at
  ON wishlist_items(user_id, created_at) WHERE is_seeded = false;
CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_items_seed_key
  ON wishlist_items(list_id, source_seed_key)
  WHERE source_seed_key IS NOT NULL AND is_seeded = true;
CREATE INDEX IF NOT EXISTS idx_wishlist_items_topic_tags_gin
  ON wishlist_items USING GIN(topic_tags);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_snoozed
  ON wishlist_items(user_id, snoozed_until) WHERE is_seeded = false;

DROP TRIGGER IF EXISTS trg_wishlist_items_updated_at ON wishlist_items;
CREATE TRIGGER trg_wishlist_items_updated_at
  BEFORE UPDATE ON wishlist_items
  FOR EACH ROW EXECUTE FUNCTION wishlist_set_updated_at();

-- ---------------------------------------------------------------------------
-- wishlist_item_progress — per-user completion on seeded catalogue rows
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_item_progress (
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  list_item_id         UUID NOT NULL REFERENCES wishlist_items(id) ON DELETE CASCADE,
  status               wishlist_item_status NOT NULL DEFAULT 'open',
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

CREATE INDEX IF NOT EXISTS idx_wishlist_item_progress_user
  ON wishlist_item_progress(user_id);

DROP TRIGGER IF EXISTS trg_wishlist_item_progress_updated_at ON wishlist_item_progress;
CREATE TRIGGER trg_wishlist_item_progress_updated_at
  BEFORE UPDATE ON wishlist_item_progress
  FOR EACH ROW EXECUTE FUNCTION wishlist_set_updated_at();

-- ---------------------------------------------------------------------------
-- wishlist_life_packs
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist_life_packs (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  for_date           DATE NOT NULL,
  title              TEXT NOT NULL,
  mood_line          TEXT NOT NULL,
  items              JSONB NOT NULL DEFAULT '[]',
  connective_tissue  TEXT[] NOT NULL DEFAULT '{}',
  context            JSONB NOT NULL DEFAULT '{}',
  rerolls_used       INT NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, for_date)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_life_packs_user_date
  ON wishlist_life_packs(user_id, for_date);

DROP TRIGGER IF EXISTS trg_wishlist_life_packs_updated_at ON wishlist_life_packs;
CREATE TRIGGER trg_wishlist_life_packs_updated_at
  BEFORE UPDATE ON wishlist_life_packs
  FOR EACH ROW EXECUTE FUNCTION wishlist_set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE wishlist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_item_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_life_packs ENABLE ROW LEVEL SECURITY;

-- profiles
DROP POLICY IF EXISTS wishlist_profiles_select_own ON wishlist_profiles;
CREATE POLICY wishlist_profiles_select_own
  ON wishlist_profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS wishlist_profiles_insert_own ON wishlist_profiles;
CREATE POLICY wishlist_profiles_insert_own
  ON wishlist_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS wishlist_profiles_update_own ON wishlist_profiles;
CREATE POLICY wishlist_profiles_update_own
  ON wishlist_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- lists: seeded readable; user lists owned
DROP POLICY IF EXISTS wishlist_lists_select_seeded ON wishlist_lists;
CREATE POLICY wishlist_lists_select_seeded
  ON wishlist_lists FOR SELECT TO authenticated
  USING (is_seeded = true);

DROP POLICY IF EXISTS wishlist_lists_select_own ON wishlist_lists;
CREATE POLICY wishlist_lists_select_own
  ON wishlist_lists FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_lists_insert_own ON wishlist_lists;
CREATE POLICY wishlist_lists_insert_own
  ON wishlist_lists FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_seeded = false);

DROP POLICY IF EXISTS wishlist_lists_update_own ON wishlist_lists;
CREATE POLICY wishlist_lists_update_own
  ON wishlist_lists FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_lists_delete_own ON wishlist_lists;
CREATE POLICY wishlist_lists_delete_own
  ON wishlist_lists FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND is_seeded = false);

-- items: seeded catalogue readable; user items owned
DROP POLICY IF EXISTS wishlist_items_select_seeded ON wishlist_items;
CREATE POLICY wishlist_items_select_seeded
  ON wishlist_items FOR SELECT TO authenticated
  USING (is_seeded = true AND user_id IS NULL);

DROP POLICY IF EXISTS wishlist_items_select_own ON wishlist_items;
CREATE POLICY wishlist_items_select_own
  ON wishlist_items FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_items_insert_own ON wishlist_items;
CREATE POLICY wishlist_items_insert_own
  ON wishlist_items FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_seeded = false);

DROP POLICY IF EXISTS wishlist_items_update_own ON wishlist_items;
CREATE POLICY wishlist_items_update_own
  ON wishlist_items FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_items_delete_own ON wishlist_items;
CREATE POLICY wishlist_items_delete_own
  ON wishlist_items FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND is_seeded = false);

-- progress: own rows only
DROP POLICY IF EXISTS wishlist_item_progress_select_own ON wishlist_item_progress;
CREATE POLICY wishlist_item_progress_select_own
  ON wishlist_item_progress FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_item_progress_insert_own ON wishlist_item_progress;
CREATE POLICY wishlist_item_progress_insert_own
  ON wishlist_item_progress FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_item_progress_update_own ON wishlist_item_progress;
CREATE POLICY wishlist_item_progress_update_own
  ON wishlist_item_progress FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_item_progress_delete_own ON wishlist_item_progress;
CREATE POLICY wishlist_item_progress_delete_own
  ON wishlist_item_progress FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- life packs: own rows only
DROP POLICY IF EXISTS wishlist_life_packs_select_own ON wishlist_life_packs;
CREATE POLICY wishlist_life_packs_select_own
  ON wishlist_life_packs FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_life_packs_insert_own ON wishlist_life_packs;
CREATE POLICY wishlist_life_packs_insert_own
  ON wishlist_life_packs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_life_packs_update_own ON wishlist_life_packs;
CREATE POLICY wishlist_life_packs_update_own
  ON wishlist_life_packs FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS wishlist_life_packs_delete_own ON wishlist_life_packs;
CREATE POLICY wishlist_life_packs_delete_own
  ON wishlist_life_packs FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Storage bucket for wishlist images (additive)
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('wishlist-images', 'wishlist-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  CREATE POLICY wishlist_images_select
    ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'wishlist-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY wishlist_images_insert_own
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
      bucket_id = 'wishlist-images'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY wishlist_images_update_own
    ON storage.objects FOR UPDATE TO authenticated
    USING (
      bucket_id = 'wishlist-images'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY wishlist_images_delete_own
    ON storage.objects FOR DELETE TO authenticated
    USING (
      bucket_id = 'wishlist-images'
      AND (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
