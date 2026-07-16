-- Run after all 5 chunks (optional sanity check)
SELECT l.slug, l.title, l.sort_order,
  (SELECT COUNT(*) FROM wishlist_items i WHERE i.list_id = l.id AND i.is_seeded = true) AS item_count
FROM wishlist_lists l
WHERE l.is_seeded = true
  AND l.slug IN (
    'baking-classics', 'solo-firsts', 'london-galleries',
    'spring-joys', 'autumn-joys', 'winter-joys',
    'make-my-space', 'one-month-experiments', 'photo-projects',
    'weekend-skills', 'drawing-day'
  )
ORDER BY l.sort_order;
