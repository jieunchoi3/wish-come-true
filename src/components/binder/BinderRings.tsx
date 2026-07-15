import { getLoopPositions, LOOP_RX, LOOP_RY } from '../../lib/binder'

export type WireLayer = 'back' | 'front'

interface BinderRingsProps {
  orientation: 'vertical' | 'horizontal'
  layer: WireLayer
  /** spine = centred gutter (open spread); left-edge = closed cover binding */
  placement?: 'spine' | 'left-edge'
}

const POSITIONS = getLoopPositions()

/** Matte brushed-metal gradient — warm grey, reduced contrast */
function WireDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-metal`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#959590" />
        <stop offset="22%" stopColor="#c5c3bc" />
        <stop offset="50%" stopColor="#e8e7e2" />
        <stop offset="78%" stopColor="#c5c3bc" />
        <stop offset="100%" stopColor="#959590" />
      </linearGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <filter id={`${id}-spec`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
    </defs>
  )
}

interface SingleLoopProps {
  cx: number
  cy: number
  layer: WireLayer
  gradientId: string
  blurId: string
  specId: string
  /** For horizontal binding, swap foreshortening axes */
  swapAxes?: boolean
}

function SingleLoop({
  cx,
  cy,
  layer,
  gradientId,
  blurId,
  specId,
  swapAxes = false,
}: SingleLoopProps) {
  const rx = swapAxes ? LOOP_RY : LOOP_RX
  const ry = swapAxes ? LOOP_RX : LOOP_RY

  /** Bottom arc — passes behind the page */
  const backArc = `M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`
  /** Top arc — passes in front of the page */
  const frontArc = `M ${-rx} 0 A ${rx} ${ry} 0 0 1 ${rx} 0`

  if (layer === 'back') {
    return (
      <g transform={`translate(${cx}, ${cy})`} opacity={0.65}>
        <path
          d={backArc}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </g>
    )
  }

  const specX = -rx + rx * 0.6
  const specY = -ry * 0.35

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {/* Cast shadow onto paper */}
      <path
        d={frontArc}
        fill="none"
        stroke="rgba(43,42,39,0.12)"
        strokeWidth={3.2}
        strokeLinecap="round"
        transform="translate(0, 3)"
        filter={`url(#${blurId})`}
      />
      {/* Front arc — full brightness */}
      <path
        d={frontArc}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      {/* Specular hotspot ~30% along top curve */}
      <circle
        cx={specX}
        cy={specY}
        r={1.1}
        fill="white"
        opacity={0.6}
        filter={`url(#${specId})`}
      />
    </g>
  )
}

/**
 * Twin-loop / double-O wire binding.
 * Render twice: layer="back" behind pages, layer="front" on top.
 */
export function BinderRings({
  orientation,
  layer,
  placement = 'spine',
}: BinderRingsProps) {
  const uid = `wire-${orientation}-${layer}-${placement}`

  if (orientation === 'horizontal') {
    const zClass = layer === 'back' ? 'z-0' : 'z-20'
    return (
      <svg
        className={`pointer-events-none absolute left-0 right-0 top-0 h-12 w-full ${zClass}`}
        viewBox="0 0 600 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <WireDefs id={uid} />
        {POSITIONS.map((pos, i) => (
          <SingleLoop
            key={i}
            cx={(pos.pct / 100) * 600}
            cy={24 + pos.jitterPx}
            layer={layer}
            gradientId={`${uid}-metal`}
            blurId={`${uid}-blur`}
            specId={`${uid}-spec`}
            swapAxes
          />
        ))}
      </svg>
    )
  }

  const zClass = layer === 'back' ? 'z-[8]' : 'z-[28]'
  const posClass =
    placement === 'left-edge'
      ? 'left-1 top-0 h-full w-7'
      : 'left-1/2 top-0 h-full w-7 -translate-x-1/2'

  return (
    <svg
      className={`pointer-events-none absolute ${posClass} ${zClass}`}
      viewBox="0 0 28 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <WireDefs id={uid} />
      {POSITIONS.map((pos, i) => (
        <SingleLoop
          key={i}
          cx={14}
          cy={(pos.pct / 100) * 400 + pos.jitterPx}
          layer={layer}
          gradientId={`${uid}-metal`}
          blurId={`${uid}-blur`}
          specId={`${uid}-spec`}
        />
      ))}
    </svg>
  )
}
