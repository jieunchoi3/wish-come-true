import type { TapeColor } from '../../lib/utils'

const TAPE_HEX: Record<TapeColor, string> = {
  sage: '#A8B5A2',
  rose: '#D4A5A5',
  ochre: '#D9A85F',
}

export type TapePosition = 'top-left' | 'top-right' | 'top-center'

interface TapeProps {
  color: TapeColor
  rotation: number
  position?: TapePosition
  className?: string
}

const positionStyles: Record<TapePosition, string> = {
  'top-left': 'left-3 -top-2.5',
  'top-right': 'right-3 -top-2.5',
  'top-center': 'left-1/2 -translate-x-1/2 -top-2.5',
}

export function Tape({
  color,
  rotation,
  position = 'top-center',
  className = '',
}: TapeProps) {
  return (
    <div
      className={`pointer-events-none absolute z-30 h-[18px] w-[62px] rounded-[1px] ${positionStyles[position]} ${className}`}
      style={{
        backgroundColor: TAPE_HEX[color],
        opacity: 0.85,
        transform: `rotate(${rotation}deg)`,
        boxShadow:
          'inset 5px 0 4px -3px rgba(43,42,39,0.14), inset -5px 0 4px -3px rgba(43,42,39,0.14), 0 1px 2px rgba(43,42,39,0.08)',
      }}
      aria-hidden
    />
  )
}
