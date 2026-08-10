-- Optional 1–5 star rating on completed items; per-list toggle for rating UI.

ALTER TABLE wishlist_items
  ADD COLUMN IF NOT EXISTS rating smallint
  CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

ALTER TABLE wishlist_item_progress
  ADD COLUMN IF NOT EXISTS rating smallint
  CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

ALTER TABLE wishlist_lists
  ADD COLUMN IF NOT EXISTS rating_enabled boolean NOT NULL DEFAULT false;

UPDATE wishlist_lists
SET rating_enabled = true
WHERE slug IN ('100-movies', '100-books', 'cheese-atlas');
