const BASE = {
  cost: 'free',
  company: 'solo',
  setting: 'home',
  seasons: ['any'],
  topic_tags: ['digital-detox', 'rest'],
}

/** [title, subtitle, tag overrides] */
const RAW = [
  [
    'Leave your phone in another room for an evening',
    'harder than it sounds — dinner, book, actual quiet',
    { time_needed: 'few_hours' },
  ],
  [
    'Delete one app you doom-scroll',
    'one tap less temptation, noticeably calmer',
    { time_needed: '30min' },
  ],
  [
    'Turn off all non-essential notifications',
    'your phone stops shouting; you pick it up on purpose',
    { time_needed: '30min' },
  ],
  [
    'Eat one meal with your phone somewhere else',
    'taste what you are eating, not what you are scrolling',
    { time_needed: '30min' },
  ],
  [
    'A walk with no phone at all',
    'no map, no podcast — just the street',
    { time_needed: '30min', setting: 'outdoors' },
  ],
  [
    'Read on paper instead of a screen for an hour',
    'eyes unclench, mind slows down',
    { time_needed: 'few_hours' },
  ],
  [
    'Turn your phone to greyscale for a day',
    'colour is the bait — without it, less pull',
    { time_needed: 'full_day' },
  ],
  [
    'No phone in bed — charge it in another room tonight',
    'wake without reaching; sleep without one last scroll',
    { time_needed: 'few_hours' },
  ],
  [
    'A full offline Sunday',
    'no errands on the feed — just the day in front of you',
    { time_needed: 'full_day' },
  ],
  [
    'No social media for 24 hours',
    'one day off the comparison machine',
    { time_needed: 'full_day' },
  ],
  [
    'A screen-free morning until noon',
    'slow start, no inbox before coffee',
    { time_needed: 'few_hours' },
  ],
  [
    'Handwrite something instead of typing it',
    'journal, list, letter — pen slows the thought',
    { time_needed: '30min' },
  ],
  [
    'A weekend with your phone in a drawer, emergencies only',
    'two days of not checking by reflex',
    { time_needed: 'weekend' },
  ],
  [
    'A digital sabbath — one full day, no screens at all',
    'better than it sounds once the itch passes',
    { time_needed: 'full_day' },
  ],
  [
    'No phone for the first hour after waking up',
    'let the day arrive before the feed does',
    { time_needed: '30min' },
  ],
  [
    'No screens after 9pm tonight',
    'dim light, real wind-down, easier sleep',
    { time_needed: 'few_hours' },
  ],
  [
    'Set a real bedtime alarm clock so your phone doesn\'t need to be near your bed',
    'a small purchase, a big boundary',
    { time_needed: '30min', cost: 'cheap' },
  ],
  [
    'Go through your phone and delete 20 photos you don\'t need',
    'less clutter, lighter camera roll',
    { time_needed: '30min' },
  ],
  [
    'Unfollow 10 accounts that don\'t make you feel good',
    'curate the feed like you mean it',
    { time_needed: '30min' },
  ],
  [
    'Turn off autoplay everywhere you can find it',
    'stop the next video choosing for you',
    { time_needed: '30min' },
  ],
]

export const DIGITAL_DETOX = RAW.map(([title, subtitle, tags], i) => ({
  key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title,
  subtitle,
  meta: {},
  default_tags: { ...BASE, ...tags },
  sort_order: i + 1,
}))
