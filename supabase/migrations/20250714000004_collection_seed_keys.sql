-- Support idempotent collection seed loading
ALTER TABLE collections
  ADD COLUMN IF NOT EXISTS is_system BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE collection_items
  ADD COLUMN IF NOT EXISTS external_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_collection_items_collection_external_key
  ON collection_items(collection_id, external_key)
  WHERE external_key IS NOT NULL;
