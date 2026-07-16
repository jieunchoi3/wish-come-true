const BASE = {
  time_needed: '30min',
  cost: 'free',
  company: 'any',
  setting: 'outdoors',
  seasons: ['spring'],
  topic_tags: ['spring'],
}

const ITEMS = [
  'Cherry blossom walk',
  'Tulip season at a park or garden',
  'First picnic of the year',
  'Spring cleaning ritual — one room properly',
  'Plant seeds on a windowsill',
  'Hot cross buns on Good Friday',
  'First bare-legs day',
  'Watch ducklings at a pond',
  'Pick wild garlic',
  'Open every window for an hour',
  'Wash and line-dry the duvet',
  'Visit a garden centre just to smell things',
  'First outdoor coffee without a coat',
  'Make a spring playlist',
  'Hang washing outside',
  'Find magnolia trees in bloom',
  'Easter egg hunt (even if you\'re the only hunter)',
  'Repot a houseplant',
  'Eat asparagus at its peak',
  'Rainy spring walk with a proper umbrella',
]

export const SPRING_JOYS = ITEMS.map((title, i) => ({
  key: `spring-${i + 1}`,
  title,
  subtitle: 'spring',
  meta: {},
  default_tags: { ...BASE },
  sort_order: i + 1,
}))
