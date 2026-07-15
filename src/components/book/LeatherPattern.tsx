interface LeatherPatternProps {
  /** Optional explicit dimensions; defaults to 100% fill */
  width?: number
  height?: number
}

/** Polka dots + grain + sheen + vignette + stitching — pure SVG */
export function LeatherPattern({ width, height }: LeatherPatternProps) {
  const id = 'leather-cover'
  const inset = 14
  const viewW = width ?? 300
  const viewH = height ?? 400

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id={`${id}-grain`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <filter id={`${id}-dot-emboss`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="0.2" floodColor="#2B2A27" floodOpacity="0.35" />
        </filter>
        <pattern
          id={`${id}-polka`}
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r="3" fill="#2B2A27" opacity="0.85" filter={`url(#${id}-dot-emboss)`} />
          <circle cx="23" cy="23" r="3" fill="#2B2A27" opacity="0.85" filter={`url(#${id}-dot-emboss)`} />
        </pattern>
        <linearGradient id={`${id}-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.02" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-vignette`} cx="50%" cy="50%" r="70%">
          <stop offset="55%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(43,42,39,0.12)" />
        </radialGradient>
      </defs>

      <rect width={viewW} height={viewH} filter={`url(#${id}-grain)`} opacity="0.045" />

      <rect width={viewW} height={viewH} fill={`url(#${id}-polka)`} />

      <rect width={viewW} height={viewH} fill={`url(#${id}-sheen)`} />

      <rect width={viewW} height={viewH} fill={`url(#${id}-vignette)`} />

      <rect
        x={inset}
        y={inset}
        width={viewW - inset * 2}
        height={viewH - inset * 2}
        rx="10"
        fill="none"
        stroke="#2B2A27"
        strokeOpacity="0.2"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
    </svg>
  )
}
