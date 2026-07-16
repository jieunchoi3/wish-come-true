const BASE = {
  time_needed: 'trip',
  cost: 'free',
  company: 'solo',
  seasons: ['any'],
  topic_tags: ['challenge', 'self-experiment'],
}

/** [title, subtitle, tag overrides] */
const RAW = [
  ['No-spend month', 'needs only, no impulse buys — see what sticks', { setting: 'home' }],
  ['No social media for 30 days', 'delete apps, notice your attention return', { setting: 'home' }],
  ['Cold showers for a month', '30 seconds cold finish — mood and grit', { setting: 'home', cost: 'free' }],
  ['A book a week for a month', 'four finished books, one shelf cleared', { setting: 'home', cost: 'cheap' }],
  ['Cook every meal from scratch for 30 days', 'no ready meals — skill and taste compound', { setting: 'home', cost: 'moderate' }],
  ['Walk 10k steps daily for a month', 'same route or new — just move', { setting: 'outdoors', cost: 'free' }],
  ['No alcohol for a month', 'clearer mornings, honest evenings', { setting: 'home', cost: 'free' }],
  ['Journal every night for 30 days', 'three lines minimum, no performance', { setting: 'home', cost: 'cheap' }],
  ['Learn 5 new words a day in a language', '150 words in a month — start speaking', { setting: 'home', cost: 'free' }],
  ['Digital sunset — no screens after 9pm', 'book, bath, early sleep for a month', { setting: 'home', cost: 'free' }],
  ['Meat-free month', 'vegetarian by default — new recipes weekly', { setting: 'home', cost: 'moderate' }],
  ['Write one thank-you note a day', '30 people who matter, on paper', { setting: 'home', cost: 'cheap' }],
  ['Meditate 10 minutes daily for 30 days', 'same time, same chair, no streak pressure', { setting: 'home', cost: 'free' }],
  ['No takeaway for a month', 'cook or assemble — wallet and kitchen win', { setting: 'home', cost: 'cheap' }],
  ['Photograph one small joy every day', '30 images of ordinary good things', { setting: 'outdoors', cost: 'free' }],
]

export const ONE_MONTH_EXPERIMENTS = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: { ...BASE, setting: 'home', ...tags },
  sort_order: i + 1,
}))
