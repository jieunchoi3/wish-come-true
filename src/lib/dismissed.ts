/** Far-future snooze marks a seeded catalogue item as removed for this user. */
export const DISMISSED_SNOOZE_UNTIL = '9999-12-31T23:59:59.000Z'

export function isItemDismissed(item: {
  snoozed_until: string | null
}): boolean {
  return Boolean(
    item.snoozed_until && item.snoozed_until.startsWith('9999'),
  )
}
