/** Shared deterministic hash — never Math.random() */
export function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

/** Card rotation: −3.5° to +3.5°, deterministic per id */
export function cardRotation(id: string): number {
  return ((Math.abs(hashString(id)) % 701) / 100) - 3.5
}

/** Tape rotation: independent of card, −4° to +4° */
export function tapeRotation(id: string): number {
  return ((Math.abs(hashString(`${id}:tape`)) % 801) / 100) - 4
}

/** Chip rotation: −1.5° to +1.5°, snaps to 0° when selected */
export function chipRotation(index: number, selected: boolean): number {
  if (selected) return 0
  return ((Math.abs(hashString(`chip:${index}`)) % 301) / 100) - 1.5
}

export const PAPER_FILLS = ['#FFFDF8', '#FDF9F1', '#FAF5EA'] as const

export function paperFillForId(id: string): string {
  return PAPER_FILLS[Math.abs(hashString(id)) % PAPER_FILLS.length]
}

export const TAPE_COLORS = ['sage', 'rose', 'ochre'] as const
export type TapeColor = (typeof TAPE_COLORS)[number]

export function tapeColorForId(id: string, index?: number): TapeColor {
  const seed = index !== undefined ? `${id}:${index}` : id
  return TAPE_COLORS[Math.abs(hashString(seed)) % TAPE_COLORS.length]
}

export interface ScrapLayout {
  widthPercent: number
  marginLeft: number
  marginRight: number
  overlapPx: number
  zIndex: number
}

const SCRAP_WIDTHS = [78, 92, 84, 88]

/** Collage positioning — widths, offsets, overlap, z-stack */
export function scrapLayout(index: number, id: string): ScrapLayout {
  const h = Math.abs(hashString(`${id}:layout`))
  const widthPercent = SCRAP_WIDTHS[index % SCRAP_WIDTHS.length]
  const rawOffset = (h % 57) - 24 // −24px to +32px
  const overlapPx = index === 0 ? 0 : 6 + (h % 9) // 6–14px, edges only

  return {
    widthPercent,
    marginLeft: rawOffset > 0 ? rawOffset : 0,
    marginRight: rawOffset < 0 ? Math.abs(rawOffset) : 0,
    overlapPx,
    zIndex: 10 + index,
  }
}

export function formatImaginedAgo(date: Date, now = new Date()): string {
  return formatRelativeAgo(date, now)
}

/** Relative span from a past date — e.g. "2 weeks ago", "3 months ago". */
export function formatRelativeAgo(date: Date, now = new Date()): string {
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth())
  if (months >= 24) {
    const years = Math.floor(months / 12)
    return `${years} year${years === 1 ? '' : 's'} ago`
  }
  if (months >= 1) return `${months} month${months === 1 ? '' : 's'} ago`
  const days = Math.max(
    1,
    Math.floor((now.getTime() - date.getTime()) / 86_400_000),
  )
  if (days >= 14) {
    const weeks = Math.floor(days / 7)
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  }
  return `${days} day${days === 1 ? '' : 's'} ago`
}

/** Span from item created_at → completed_at for memory detail copy */
export function formatImaginedBeforeDone(
  createdAt: string,
  completedAt: string,
): string {
  const created = new Date(createdAt)
  const completed = new Date(completedAt)
  const months =
    (completed.getFullYear() - created.getFullYear()) * 12 +
    (completed.getMonth() - created.getMonth())
  if (months >= 24) {
    const years = Math.floor(months / 12)
    return `${years} ${years === 1 ? 'year' : 'years'}`
  }
  if (months >= 1) return `${months} ${months === 1 ? 'month' : 'months'}`
  const days = Math.max(
    1,
    Math.floor((completed.getTime() - created.getTime()) / 86_400_000),
  )
  return `${days} ${days === 1 ? 'day' : 'days'}`
}

/** Stamp date on polaroids — e.g. 14·07·26 */
export function formatDoneStampDate(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${dd}·${mm}·${yy}`
}

/** Hand-drawn box border-radius */
export const HAND_DRAWN_RADIUS =
  '255px 15px 225px 15px / 15px 225px 15px 255px'

/** Paper lift shadow — not a soft blur pill */
export const PAPER_SHADOW =
  '1px 2px 0 rgba(43,42,39,0.06), 3px 6px 12px -6px rgba(43,42,39,0.18)'

/** Tiling grain for card surfaces */
export const CARD_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

/** Highlighter sweep blob for selected chips */
export const HIGHLIGHTER_SWEEP =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 32'%3E%3Cpath d='M4 18 C20 8, 40 26, 60 14 C78 4, 96 22, 116 12 L116 28 C96 30, 78 18, 60 26 C40 32, 20 20, 4 26 Z' fill='%23D9A85F' fill-opacity='0.55'/%3E%3C/svg%3E\")"

/** Subtle deckled bottom edge */
export const DECKLED_CLIP =
  'polygon(0% 0%, 100% 0%, 100% 96%, 98.5% 98.5%, 96% 96.5%, 93% 99%, 89% 97%, 85% 99.5%, 80% 96%, 75% 98%, 70% 97%, 65% 99%, 60% 96.5%, 55% 98.5%, 50% 97%, 45% 99%, 40% 96%, 35% 98%, 30% 97.5%, 25% 99%, 20% 96.5%, 15% 98%, 10% 97%, 5% 99.5%, 0% 96%)'
