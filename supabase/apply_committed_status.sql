-- Run once in Supabase Dashboard → SQL Editor
-- Enables "add to this month" to persist in the database (not just this browser)
ALTER TYPE wishlist_item_status ADD VALUE IF NOT EXISTS 'committed';
