-- Wishlist v1 — initial schema
-- Auth + RLS from day one. Collections are system-owned; everything else is per-user.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE wish_category AS ENUM (
  'taste',
  'watch_read',
  'go',
  'london',
  'make_learn',
  'micro_joys',
  'brave',
  'people',
  'someday'
);

CREATE TYPE time_needed AS ENUM (
  '30min',
  'few_hours',
  'full_day',
  'weekend',
  'trip'
);

CREATE TYPE cost_level AS ENUM (
  'free',
  'cheap',
  'moderate',
  'splurge'
);

CREATE TYPE company_type AS ENUM (
  'solo',
  'friends',
  'date',
  'family',
  'any'
);

CREATE TYPE setting_type AS ENUM (
  'home',
  'indoors_out',
  'outdoors',
  'travel'
);

CREATE TYPE wish_status AS ENUM (
  'someday',
  'committed',
  'done',
  'archived'
);

CREATE TYPE collection_gesture_type AS ENUM (
  'ticked',
  'starred',
  'skipped'
);

-- ---------------------------------------------------------------------------
-- Collections (system-owned, seeded, read-only for users)
-- ---------------------------------------------------------------------------
CREATE TABLE collections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  description   TEXT,
  emoji         TEXT,
  cover_style   TEXT NOT NULL DEFAULT 'colour',
  default_tags  JSONB NOT NULL DEFAULT '{}',
  item_count    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE collection_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  subtitle      TEXT,
  meta          JSONB NOT NULL DEFAULT '{}',
  default_tags  JSONB NOT NULL DEFAULT '{}',
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_collection_items_collection_id ON collection_items(collection_id);

-- ---------------------------------------------------------------------------
-- Collection gestures (per-user: tick / star / skip)
-- One row per user per item. Gesture is mutable.
-- Progress = COUNT(gesture='ticked') / collection.item_count
-- ---------------------------------------------------------------------------
CREATE TABLE collection_gestures (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  collection_item_id UUID NOT NULL REFERENCES collection_items(id) ON DELETE CASCADE,
  gesture            collection_gesture_type NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, collection_item_id)
);

CREATE INDEX idx_collection_gestures_user_id ON collection_gestures(user_id);
CREATE INDEX idx_collection_gestures_item_id ON collection_gestures(collection_item_id);

-- ---------------------------------------------------------------------------
-- Wishes — the heart of the app
-- ---------------------------------------------------------------------------
CREATE TABLE wishes (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title                    TEXT NOT NULL,
  note                     TEXT,
  category                 wish_category NOT NULL DEFAULT 'micro_joys',
  image_url                TEXT,
  source_collection_item_id UUID REFERENCES collection_items(id) ON DELETE SET NULL,
  time_needed              time_needed,
  cost                     cost_level,
  company                  company_type,
  setting                  setting_type,
  seasons                  TEXT[] NOT NULL DEFAULT '{}',
  topic_tags               TEXT[] NOT NULL DEFAULT '{}',
  status                   wish_status NOT NULL DEFAULT 'someday',
  committed_for            DATE,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_surfaced_at         TIMESTAMPTZ,
  surfaced_count           INT NOT NULL DEFAULT 0,
  skipped_count            INT NOT NULL DEFAULT 0,
  snoozed_until            DATE,
  completed_at             TIMESTAMPTZ,
  completion_photo_url     TEXT,
  completion_note          TEXT,
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_wishes_user_id ON wishes(user_id);
CREATE INDEX idx_wishes_user_status ON wishes(user_id, status);
CREATE INDEX idx_wishes_source_item ON wishes(source_collection_item_id);
CREATE INDEX idx_wishes_created_at ON wishes(user_id, created_at);

-- ---------------------------------------------------------------------------
-- Life packs (cached per day, generated on open)
-- ---------------------------------------------------------------------------
CREATE TABLE life_packs (
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

CREATE INDEX idx_life_packs_user_date ON life_packs(user_id, for_date);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_collection_gestures_updated_at
  BEFORE UPDATE ON collection_gestures
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_wishes_updated_at
  BEFORE UPDATE ON wishes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_life_packs_updated_at
  BEFORE UPDATE ON life_packs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_gestures ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_packs ENABLE ROW LEVEL SECURITY;

-- Collections & items: readable by all authenticated users, writable only by service role
CREATE POLICY "collections_select_authenticated"
  ON collections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "collection_items_select_authenticated"
  ON collection_items FOR SELECT
  TO authenticated
  USING (true);

-- Collection gestures: full CRUD for own rows
CREATE POLICY "collection_gestures_select_own"
  ON collection_gestures FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "collection_gestures_insert_own"
  ON collection_gestures FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "collection_gestures_update_own"
  ON collection_gestures FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "collection_gestures_delete_own"
  ON collection_gestures FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Wishes: full CRUD for own rows
CREATE POLICY "wishes_select_own"
  ON wishes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "wishes_insert_own"
  ON wishes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishes_update_own"
  ON wishes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishes_delete_own"
  ON wishes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Life packs: full CRUD for own rows
CREATE POLICY "life_packs_select_own"
  ON life_packs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "life_packs_insert_own"
  ON life_packs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "life_packs_update_own"
  ON life_packs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "life_packs_delete_own"
  ON life_packs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage bucket for wish images (user uploads)
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('wish-images', 'wish-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "wish_images_select"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'wish-images');

CREATE POLICY "wish_images_insert_own"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'wish-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "wish_images_update_own"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'wish-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "wish_images_delete_own"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'wish-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
