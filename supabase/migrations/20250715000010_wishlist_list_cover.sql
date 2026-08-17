-- Optional cover photo for user lists (separate from item completion polaroids).

ALTER TABLE wishlist_lists
  ADD COLUMN IF NOT EXISTS cover_url TEXT;
