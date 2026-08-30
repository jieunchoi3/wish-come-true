-- Abandoned items/lists — recoverable in Sea of Ideas (distinct from permanent delete).

ALTER TABLE wishlist_items
  ADD COLUMN IF NOT EXISTS abandoned_at TIMESTAMPTZ;

ALTER TABLE wishlist_item_progress
  ADD COLUMN IF NOT EXISTS abandoned_at TIMESTAMPTZ;

ALTER TABLE wishlist_lists
  ADD COLUMN IF NOT EXISTS abandoned_at TIMESTAMPTZ;
