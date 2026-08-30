export function isItemAbandoned(item: { abandoned_at: string | null }): boolean {
  return Boolean(item.abandoned_at)
}

export function isListAbandoned(list: {
  is_seeded: boolean
  abandoned_at: string | null
}): boolean {
  return !list.is_seeded && Boolean(list.abandoned_at)
}
