/** London calendar seasons for pack eligibility (month-based). */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const LONDON_TZ = 'Europe/London'

/** YYYY-MM-DD in Europe/London — used for pack for_date and season at generation time. */
export function londonDateISO(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: LONDON_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const y = parts.find((p) => p.type === 'year')?.value ?? '1970'
  const m = parts.find((p) => p.type === 'month')?.value ?? '01'
  const d = parts.find((p) => p.type === 'day')?.value ?? '01'
  return `${y}-${m}-${d}`
}

export function londonTodayISO(): string {
  return londonDateISO()
}

/** Season from a London calendar date (YYYY-MM-DD). */
export function seasonForDateISO(dateISO: string): Season {
  const month = parseInt(dateISO.slice(5, 7), 10)
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

/** Item eligible when untagged, "any", or matching the current London season. */
export function isSeasonEligible(
  seasons: string[] | null | undefined,
  currentSeason: Season,
): boolean {
  if (!seasons || seasons.length === 0) return true
  if (seasons.includes('any')) return true
  return seasons.includes(currentSeason)
}
