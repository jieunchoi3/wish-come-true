const BASE = {
  company: 'solo',
  setting: 'home',
  seasons: ['any'],
  topic_tags: ['home', 'cosy'],
}

/** [title, subtitle, tag overrides] */
const RAW = [
  ['Get a plant', '15 min, instant mood lift', { time_needed: '30min', cost: 'cheap' }],
  ['Hang something on a bare wall', 'one nail, one frame, done', { time_needed: '30min', cost: 'cheap' }],
  ['Swap a lamp for warmer light', '2700K bulb, softer evenings', { time_needed: '30min', cost: 'cheap' }],
  ['Get a proper doormat', 'first thing guests notice', { time_needed: '30min', cost: 'moderate' }],
  ['Frame a photo you love', 'print, mat, hang — 45 minutes', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Buy fresh flowers for no reason', 'market run, vase ready', { time_needed: '30min', cost: 'cheap' }],
  ['Rearrange the furniture', 'new flow without spending', { time_needed: 'few_hours', cost: 'free' }],
  ['Add a scent — candle or diffuser', 'one note for the whole flat', { time_needed: '30min', cost: 'cheap' }],
  ['Fix that one annoying thing', 'squeaky hinge, loose handle, finally', { time_needed: '30min', cost: 'free' }],
  ['Get good bedsheets', 'cotton percale, sleep upgrade', { time_needed: '30min', cost: 'moderate' }],
  ['Put up fairy lights', 'warm corners, instant cosiness', { time_needed: '30min', cost: 'cheap' }],
  ['Clear one cluttered surface properly', 'not shove — actually sort', { time_needed: 'few_hours', cost: 'free' }],
  ['Wash curtains or throw blankets', 'fresh smell, brighter room', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Mount a small shelf', 'drill, level, books off the floor', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Swap tired throw pillows', 'two new covers, whole sofa shifts', { time_needed: '30min', cost: 'cheap' }],
  ['Organise under the sink', 'bins, labels, one afternoon', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Paint or stain one piece of furniture', 'chalk paint, weekend project', { time_needed: 'weekend', cost: 'moderate' }],
  ['Hang a mirror to bounce light', 'small hallway, bigger feel', { time_needed: 'few_hours', cost: 'moderate' }],
  ['Label your spice jars', 'uniform jars, readable tops', { time_needed: '30min', cost: 'cheap' }],
  ['Upgrade your bath towels', 'matching set, hotel-at-home', { time_needed: '30min', cost: 'moderate' }],
]

export const MAKE_MY_SPACE = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: { ...BASE, ...tags },
  sort_order: i + 1,
}))
