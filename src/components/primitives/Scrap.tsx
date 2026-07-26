import type { ReactNode } from 'react'
import {
  cardRotation,
  paperFillForId,
  scrapLayout,
  tapeColorForId,
  tapeRotation,
  type TapeColor,
} from '../../lib/utils'
import { Paper } from './Paper'
import { Tape, type TapePosition } from './Tape'

interface ScrapProps {
  id: string
  index?: number
  children: ReactNode
  className?: string
  tape?: boolean
  tapePosition?: TapePosition
  tapeColor?: TapeColor
  tornBottom?: boolean
  layout?: boolean
}

export function Scrap({
  id,
  index = 0,
  children,
  className = '',
  tape = true,
  tapePosition = 'top-center',
  tapeColor,
  tornBottom = false,
  layout = true,
}: ScrapProps) {
  const rotation = cardRotation(id)
  const fill = paperFillForId(id)
  const tRotation = tapeRotation(id)
  const color = tapeColor ?? tapeColorForId(id, index)
  const pos = layout ? scrapLayout(index, id) : null

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: pos ? `${pos.widthPercent}%` : undefined,
        marginLeft: pos ? `${pos.marginLeft}px` : undefined,
        marginRight: pos ? `${pos.marginRight}px` : undefined,
        marginTop: pos && pos.overlapPx > 0 ? `-${pos.overlapPx}px` : undefined,
        zIndex: pos?.zIndex,
      }}
    >
      <div className="relative" style={{ transform: `rotate(${rotation}deg)` }}>
        {tape && <Tape color={color} rotation={tRotation} position={tapePosition} />}
        <Paper fill={fill} tornBottom={tornBottom} className="scrap-paper">
          {children}
        </Paper>
      </div>
    </div>
  )
}
