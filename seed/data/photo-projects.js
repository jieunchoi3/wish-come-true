const BASE = {
  time_needed: '30min',
  cost: 'free',
  company: 'solo',
  setting: 'outdoors',
  seasons: ['any'],
  topic_tags: ['photography', 'creative'],
}

/** [title, subtitle, tag overrides] */
const RAW = [
  ['Find and shoot 5 red doors', 'colour hunt, one neighbourhood', {}],
  ['A week of golden hour', 'same walk, seven sunsets', { time_needed: 'few_hours', seasons: ['any'] }],
  ['Everything blue you see in one day', 'sky, signs, bags — collect the hue', {}],
  ['Same spot across four seasons', 'one frame, four returns', { time_needed: 'trip', seasons: ['spring', 'summer', 'autumn', 'winter'] }],
  ["Strangers' hands", 'markets, cafés — ask or shoot from afar', { setting: 'indoors_out', company: 'any' }],
  ['Shadows at noon', 'harsh light, graphic shapes', { time_needed: '30min' }],
  ['One roll of film, one day', '36 frames, no chimping', { time_needed: 'full_day', cost: 'moderate' }],
  ['Your daily coffee for a week', 'seven cups, seven moods', { time_needed: '30min', setting: 'indoors_out' }],
  ['Textures on a walk', 'brick, bark, rust, fabric — fill a grid', { time_needed: 'few_hours' }],
  ['Reflections', 'puddles, glass, polished stone', {}],
  ['A colour a day for a week', 'Monday red, Tuesday yellow — assign your own', { time_needed: 'few_hours' }],
  ['Five yellow things before noon', 'morning scavenger hunt', { time_needed: '30min' }],
  ['Rainy window portraits', 'condensation, street blur behind', { time_needed: '30min', setting: 'home', seasons: ['autumn', 'winter'] }],
  ['Your shoes from above for seven days', 'flat-lay diary, same floor tile', { time_needed: '30min', setting: 'home' }],
  ['Grocery aisle symmetry', 'cans, colours, repeating lines', { time_needed: '30min', setting: 'indoors_out', cost: 'cheap' }],
  ['Staircases in shadow', 'geometry and contrast on the way up', { time_needed: 'few_hours', setting: 'indoors_out' }],
  ['A week of front doors', 'paint, knockers, plants — street portrait', { time_needed: 'few_hours' }],
  ['Puddle reflections after rain', 'flip the city upside down', { time_needed: '30min', seasons: ['autumn', 'winter'] }],
  ['Hands holding warm drinks', 'mugs, gloves, steam in cold air', { time_needed: '30min', setting: 'indoors_out', seasons: ['autumn', 'winter'] }],
  ['Night lights bokeh on one street', 'one lens, one block after dark', { time_needed: 'few_hours', setting: 'outdoors' }],
]

export const PHOTO_PROJECTS = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: { ...BASE, ...tags },
  sort_order: i + 1,
}))
