interface SnapButtonProps {
  active: boolean
  onClick?: () => void
  className?: string
  bouncing?: boolean
}

/** Brushed warm-metal snap — 4-part treatment */
export function SnapButton({
  active,
  onClick,
  className = '',
  bouncing = false,
}: SnapButtonProps) {
  return (
    <button
      type="button"
      onClick={active ? onClick : undefined}
      disabled={!active}
      className={`relative h-[22px] w-[22px] rounded-full ${className} ${
        active ? 'snap-active cursor-pointer' : 'cursor-default opacity-45'
      } ${bouncing ? 'snap-click' : ''}`}
      aria-label={active ? 'Unsnap to open' : 'Enter your name to open'}
    >
      <svg viewBox="0 0 22 22" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="snap-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#959590" />
            <stop offset="30%" stopColor="#c5c3bc" />
            <stop offset="55%" stopColor="#e8e7e2" />
            <stop offset="100%" stopColor="#959590" />
          </linearGradient>
          <filter id="snap-rim-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Rim shadow */}
        <circle
          cx="11"
          cy="11"
          r="9.5"
          fill="none"
          stroke="rgba(43,42,39,0.18)"
          strokeWidth="1"
        />
        {/* Embossed ring */}
        <circle
          cx="11"
          cy="11"
          r="8.5"
          fill="none"
          stroke="rgba(43,42,39,0.12)"
          strokeWidth="0.8"
        />
        {/* Dark core + metal fill */}
        <circle
          cx="11"
          cy="11"
          r="7.5"
          fill="url(#snap-metal)"
          filter="url(#snap-rim-shadow)"
        />
        {/* Highlight band */}
        <ellipse cx="9" cy="8.5" rx="4" ry="2.2" fill="rgba(255,255,255,0.22)" />
        {/* Specular — only when active */}
        {active && (
          <circle cx="13.5" cy="7.5" r="1.2" fill="white" opacity={0.6} />
        )}
      </svg>
    </button>
  )
}
