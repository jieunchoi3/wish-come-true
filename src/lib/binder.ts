import { hashString } from './utils'

/** Desk surface behind the binder */
export const DESK_COLOR = '#EDE6DA'

/** Binder page cream */
export const PAGE_FILL = '#FAF6EF'

/** Page grain at ~5% on binder pages */
export const PAGE_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"

/** Deckled outer edge — left page (spine on right) */
export const PAGE_CLIP_LEFT =
  'polygon(0% 1%, 1.5% 0%, 98% 0.5%, 100% 2%, 100% 98%, 98.5% 100%, 1% 99%, 0% 97%)'

/** Deckled outer edge — right page (spine on left) */
export const PAGE_CLIP_RIGHT =
  'polygon(2% 0.5%, 99% 0%, 100% 1%, 100% 97%, 99% 100%, 1.5% 99%, 0% 98%, 0% 2%)'

/** Deckled outer edge — single mobile page */
export const PAGE_CLIP_SINGLE =
  'polygon(1% 1%, 99% 0.5%, 100% 2%, 99% 98%, 1% 100%, 0% 98%, 0.5% 2%)'

/** Twin-loop wire count along the spine */
export const LOOP_COUNT = 24

export interface LoopPosition {
  /** % from top (vertical) or left (horizontal) */
  pct: number
  /** ±0.5px deterministic jitter */
  jitterPx: number
}

/** Dense twin-loop positions — evenly spaced with subtle variation */
export function getLoopPositions(count = LOOP_COUNT): LoopPosition[] {
  return Array.from({ length: count }, (_, i) => ({
    pct: 2.5 + (i / (count - 1)) * 95,
    jitterPx: ((hashString(`loop-pos:${i}`) % 3) - 1) * 0.5,
  }))
}

/** Loop ellipse dimensions (px) — top-down foreshortened */
export const LOOP_RX = 11
export const LOOP_RY = 17

/** Punched hole matches loop width */
export const HOLE_WIDTH = 18
export const HOLE_HEIGHT = 7
