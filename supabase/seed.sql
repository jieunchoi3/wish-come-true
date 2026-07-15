-- Wishlist seed script
-- Loads collection shells (empty items OK for v1 step 1).
-- Full item JSON will be loaded in step 3.

INSERT INTO collections (slug, title, description, emoji, cover_style, default_tags, item_count)
VALUES
  (
    '100-movies',
    '100 Movies Before You Die',
    'Essential cinema — from silent classics to modern masterpieces.',
    '🎬',
    'ink-slate',
    '{"time_needed": "few_hours", "cost": "free", "setting": "home"}',
    0
  ),
  (
    'cheese-atlas',
    'World Cheese Atlas',
    'Sixty cheeses worth knowing, tasting, and remembering.',
    '🧀',
    'ochre-warm',
    '{"time_needed": "30min", "cost": "cheap"}',
    0
  ),
  (
    '195-countries',
    '195 Countries',
    'Every nation on earth — a lifetime of horizons.',
    '✈️',
    'sage-mist',
    '{"time_needed": "trip", "cost": "splurge"}',
    0
  ),
  (
    '100-books',
    '100 Books',
    'The shelf that shapes a reader.',
    '📚',
    'dusty-rose',
    '{"time_needed": "few_hours"}',
    0
  ),
  (
    'london-100',
    'London 100',
    'A hundred reasons this city keeps giving.',
    '🚇',
    'terracotta',
    '{"time_needed": "few_hours", "setting": "outdoors", "cost": "cheap"}',
    0
  ),
  (
    'summer-micro-joys',
    'Summer Micro-Joys',
    'Fifty small pleasures that taste like sunshine.',
    '☀️',
    'honey-glow',
    '{"time_needed": "30min", "cost": "free", "seasons": ["summer"]}',
    0
  )
ON CONFLICT (slug) DO NOTHING;
