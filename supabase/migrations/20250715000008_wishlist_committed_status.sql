-- Extend existing wishlist_item_status enum with 'committed' for This Month focus
ALTER TYPE wishlist_item_status ADD VALUE IF NOT EXISTS 'committed';
