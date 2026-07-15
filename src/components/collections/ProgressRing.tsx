import { hashString } from '../../lib/utils'

interface ProgressRingProps {
  id: string
  progress: number
  ticked: number
  total: number
  accent?: string
  size?: number
}

/** Hand-drawn SVG progress ring — wobbly path, ink track, accent fill */
export function ProgressRing({
  id,
  progress,
  ticked,
  total,
  accent = '#A8B5A2',
  size = 52,
}: ProgressRingProps) {
  const h = Math.abs(hashString(`${id}:ring`))
  const wobble = (h % 5) - 2
  const r = size / 2 - 4
  const cx = size / 2
  const cy = size / 2 + wobble * 0.3
  const circumference = 2 * Math.PI * r
  const dash = Math.max(0, Math.min(1, progress)) * circumference

  const pathD = `M ${cx} ${cy - r}
    C ${cx + r * 0.6 + wobble} ${cy - r * 0.8}, ${cx + r + wobble * 0.5} ${cy - r * 0.2}, ${cx + r} ${cy}
    C ${cx + r - wobble} ${cy + r * 0.7}, ${cx + r * 0.3} ${cy + r + wobble * 0.3}, ${cx} ${cy + r}
    C ${cx - r * 0.4 - wobble} ${cy + r * 0.6}, ${cx - r - wobble * 0.4} ${cy + r * 0.1}, ${cx - r} ${cy}
    C ${cx - r + wobble * 0.6} ${cy - r * 0.5}, ${cx - r * 0.5} ${cy - r - wobble * 0.2}, ${cx} ${cy - r}`

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
        className="overflow-visible"
      >
        <path
          d={pathD}
          fill="none"
          stroke="rgba(43,42,39,0.12)"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <path
          d={pathD}
          fill="none"
          stroke={accent}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
      <span className="font-hand text-sm text-ink/55">
        {ticked} / {total}
      </span>
    </div>
  )
}
