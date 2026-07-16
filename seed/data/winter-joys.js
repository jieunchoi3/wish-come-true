const BASE = {
  time_needed: '30min',
  cost: 'cheap',
  company: 'any',
  setting: 'outdoors',
  seasons: ['winter'],
  topic_tags: ['winter'],
}

const ITEMS = [
  'Christmas market visit',
  'Ice skating — outdoor rink',
  'First snow walk (or first frost)',
  'Mulled wine somewhere warm after',
  'New Year\'s ritual — write one line for the year',
  'Fairy lights evening walk',
  'Proper cosy soup Sunday',
  'Secret Santa for friends',
  'Bake mince pies from scratch',
  'Watch a Christmas film you\'ve never seen',
  'Wrap presents slowly with good paper',
  'Winter sunrise with a thermos',
  'Go to a pantomime or festive show',
  'Make a wreath or garland',
  'First fire or candlelit evening in',
  'Eat roasted chestnuts from a bag',
  'Visit a light trail or illuminations',
  'Write cards by hand',
  'Hot bath on the coldest night',
  'Boxing Day walk — quiet streets',
]

export const WINTER_JOYS = ITEMS.map((title, i) => ({
  key: `winter-${i + 1}`,
  title,
  subtitle: 'winter',
  meta: {},
  default_tags: { ...BASE },
  sort_order: i + 1,
}))
