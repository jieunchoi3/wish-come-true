/** [title, subtitle, tags] — varied per item */
const RAW = [
  ['Solo cinema trip', 'pick the film only you want', { time_needed: 'few_hours', cost: 'moderate', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo dinner at a nice restaurant', 'book a table for one, no phone', { time_needed: 'few_hours', cost: 'splurge', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Solo weekend trip', 'one bag, one town, no itinerary', { time_needed: 'weekend', cost: 'moderate', company: 'solo', setting: 'travel', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Solo hike', 'trail map, your own pace', { time_needed: 'full_day', cost: 'cheap', company: 'solo', setting: 'outdoors', seasons: ['any'], topic_tags: ['solo'] }],
  ['Sit in a café with no phone', 'one drink, one hour, watch the room', { time_needed: '30min', cost: 'cheap', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo museum visit', 'linger at one room as long as you like', { time_needed: 'few_hours', cost: 'moderate', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'art'] }],
  ['Ask a question in a talk or Q&A', 'raise your hand, use your voice', { time_needed: 'few_hours', cost: 'free', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Travel alone for a week', 'foreign city, your own rhythm', { time_needed: 'trip', cost: 'splurge', company: 'solo', setting: 'travel', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Solo matinee', 'weekday afternoon, empty row', { time_needed: 'few_hours', cost: 'cheap', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Eat lunch alone at the counter', 'watch the kitchen work', { time_needed: '30min', cost: 'moderate', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo gallery afternoon', 'one exhibition, no rushing', { time_needed: 'few_hours', cost: 'moderate', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'art'] }],
  ['Walk a new neighbourhood alone', 'no destination, just corners', { time_needed: 'few_hours', cost: 'free', company: 'solo', setting: 'outdoors', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo concert or gig', 'stand where you want, leave when you want', { time_needed: 'few_hours', cost: 'moderate', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Take yourself to afternoon tea', 'tiered stand, no sharing required', { time_needed: 'few_hours', cost: 'splurge', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo swim or lido session', 'lanes or open water, your count', { time_needed: '30min', cost: 'cheap', company: 'solo', setting: 'outdoors', seasons: ['summer'], topic_tags: ['solo'] }],
  ['Bookshop browse alone', 'read the first chapter on the floor', { time_needed: '30min', cost: 'cheap', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo sunrise watch', 'thermos, no one to hurry you', { time_needed: '30min', cost: 'free', company: 'solo', setting: 'outdoors', seasons: ['any'], topic_tags: ['solo'] }],
  ['Go to a market alone', 'taste samples, buy one strange thing', { time_needed: 'few_hours', cost: 'cheap', company: 'solo', setting: 'outdoors', seasons: ['any'], topic_tags: ['solo'] }],
  ['Solo train day trip', 'return ticket, wander off at a stop', { time_needed: 'full_day', cost: 'moderate', company: 'solo', setting: 'travel', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
  ['Write in a pub alone', 'one pint, one notebook, no performance', { time_needed: 'few_hours', cost: 'cheap', company: 'solo', setting: 'indoors_out', seasons: ['any'], topic_tags: ['solo', 'brave'] }],
]

export const SOLO_FIRSTS = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: tags,
  sort_order: i + 1,
}))
