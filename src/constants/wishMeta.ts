import type {
  CompanyType,
  CostLevel,
  SettingType,
  TimeNeeded,
  WishCategory,
} from '../types/database'

export const CATEGORY_META: {
  id: WishCategory
  emoji: string
  label: string
}[] = [
  { id: 'taste', emoji: '🧀', label: 'Taste' },
  { id: 'watch_read', emoji: '🎬', label: 'Watch & Read' },
  { id: 'go', emoji: '✈️', label: 'Go' },
  { id: 'london', emoji: '🚇', label: 'London' },
  { id: 'make_learn', emoji: '🎨', label: 'Make & Learn' },
  { id: 'micro_joys', emoji: '☁️', label: 'Micro-joys' },
  { id: 'brave', emoji: '😰', label: 'Brave' },
  { id: 'people', emoji: '👥', label: 'People' },
  { id: 'someday', emoji: '🌠', label: 'Someday' },
]

export const TIME_OPTIONS: { id: TimeNeeded; label: string }[] = [
  { id: '30min', label: '30min' },
  { id: 'few_hours', label: 'few hours' },
  { id: 'full_day', label: 'full day' },
  { id: 'weekend', label: 'weekend' },
  { id: 'trip', label: 'trip' },
]

export const COST_OPTIONS: { id: CostLevel; label: string }[] = [
  { id: 'free', label: 'free' },
  { id: 'cheap', label: 'cheap' },
  { id: 'moderate', label: 'moderate' },
  { id: 'splurge', label: 'splurge' },
]

export const COMPANY_OPTIONS: { id: CompanyType; label: string }[] = [
  { id: 'solo', label: 'solo' },
  { id: 'friends', label: 'friends' },
  { id: 'date', label: 'date' },
  { id: 'family', label: 'family' },
  { id: 'any', label: 'any' },
]

export const SETTING_OPTIONS: { id: SettingType; label: string }[] = [
  { id: 'home', label: 'home' },
  { id: 'indoors_out', label: 'indoors/out' },
  { id: 'outdoors', label: 'outdoors' },
  { id: 'travel', label: 'travel' },
]

export const SEASON_OPTIONS = [
  'spring',
  'summer',
  'autumn',
  'winter',
  'any',
] as const

export const AVAILABILITY_OPTIONS = [
  { id: '30min', label: '30 min' },
  { id: 'few_hours', label: 'a few hours' },
  { id: 'full_day', label: 'all day' },
  { id: 'weekend', label: 'the whole weekend' },
] as const

export const MOOD_OPTIONS = [
  'cosy',
  'adventurous',
  'creative',
  'social',
  'lazy',
  'nostalgic',
] as const

export function categoryEmoji(category: string): string {
  return CATEGORY_META.find((c) => c.id === category)?.emoji ?? '✨'
}

export const DEFAULT_WISH_TAGS = {
  time_needed: 'few_hours' as TimeNeeded,
  cost: 'cheap' as CostLevel,
  company: 'any' as CompanyType,
  setting: 'home' as SettingType,
  seasons: [] as string[],
  topic_tags: [] as string[],
}
