const BASE = {
  time_needed: 'few_hours',
  cost: 'cheap',
  company: 'solo',
  setting: 'home',
  seasons: ['any'],
  topic_tags: ['skill', 'learning'],
}

/** [title, subtitle, tag overrides] */
const RAW = [
  ['Basic knots', 'bowline, clove hitch — 30 minutes of rope', { time_needed: '30min', cost: 'free' }],
  ['Read a wine label properly', 'region, grape, vintage — one bottle decoded', { time_needed: '30min', cost: 'cheap', setting: 'indoors_out' }],
  ['Identify 5 constellations', 'Orion, Ursa Major — one clear night', { time_needed: 'few_hours', cost: 'free', setting: 'outdoors' }],
  ['Whittle a spoon', 'soft wood, one blade, patient shavings', { time_needed: 'full_day', cost: 'cheap' }],
  ['Basic bike repair', 'puncture patch, chain lube, brake check', { time_needed: 'few_hours', cost: 'cheap', setting: 'outdoors' }],
  ['Hand-letter the alphabet', 'one sheet, thick marker, even spacing', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Make pasta from scratch', 'flour, eggs, roll by hand — one dinner', { time_needed: 'few_hours', cost: 'cheap' }],
  ['Tie a scarf five ways', 'French, loop, knot — mirror practice', { time_needed: '30min', cost: 'free' }],
  ['Basic car maintenance checks', 'oil, tyres, fluids — owner manual open', { time_needed: 'few_hours', cost: 'cheap', setting: 'outdoors' }],
  ['Darn a sock', 'needle, thread, invisible mend', { time_needed: '30min', cost: 'free' }],
  ['Make a proper cocktail', 'spirit, bitters, stir — one classic recipe', { time_needed: '30min', cost: 'moderate', setting: 'home' }],
  ['Learn 10 chess openings', 'names and first three moves each', { time_needed: 'few_hours', cost: 'free' }],
  ['Film photography exposure triangle', 'aperture, shutter, ISO — one roll test', { time_needed: 'full_day', cost: 'moderate', setting: 'outdoors' }],
  ['Fold an origami crane', 'one square paper, crease by crease', { time_needed: '30min', cost: 'free' }],
  ['Whistle with your fingers', 'wet, tuck, blow — loud and useless fun', { time_needed: '30min', cost: 'free' }],
  ['Basic first aid', 'CPR steps, bandage, when to call — one course or video', { time_needed: 'few_hours', cost: 'cheap', setting: 'indoors_out' }],
  ['Sharpen a kitchen knife properly', 'stone or steel, safer cooking after', { time_needed: '30min', cost: 'cheap' }],
  ['Read a map without GPS', 'paper map, compass optional — one park route', { time_needed: 'few_hours', cost: 'free', setting: 'outdoors' }],
  ['Tie a bowline knot', 'the knot that holds when it matters', { time_needed: '30min', cost: 'free' }],
  ['Tune a guitar by ear', 'fifth fret method, one string at a time', { time_needed: 'few_hours', cost: 'free' }],
]

export const WEEKEND_SKILLS = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: { ...BASE, ...tags },
  sort_order: i + 1,
}))
