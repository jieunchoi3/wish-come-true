const BASE = {
  time_needed: '30min',
  cost: 'free',
  company: 'any',
  setting: 'outdoors',
  seasons: ['autumn'],
  topic_tags: ['autumn'],
}

const ITEMS = [
  'Leaf-peeping walk',
  'First jumper day',
  'Pumpkin picking',
  'A proper Sunday roast',
  'Light a candle ritual at dusk',
  'First hot chocolate of the season',
  'Cosy film under a blanket',
  'Collect conkers like a child',
  'Make soup from whatever\'s in the fridge',
  'Wear boots for the first time',
  'Bake something with cinnamon',
  'Watch the sun set before five',
  'Go apple picking',
  'Read a book by lamplight',
  'Wear a scarf for the first time',
  'Kick through a pile of leaves',
  'Make mulled apple juice at home',
  'Visit a farmers\' market in a coat',
  'Put the big duvet on the bed',
  'Write a gratitude list for the year so far',
]

export const AUTUMN_JOYS = ITEMS.map((title, i) => ({
  key: `autumn-${i + 1}`,
  title,
  subtitle: 'autumn',
  meta: {},
  default_tags: { ...BASE },
  sort_order: i + 1,
}))
