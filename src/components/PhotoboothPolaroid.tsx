import { PolaroidFrame } from './PolaroidFrame'
import { StarRating } from './lists/StarRating'
import { Scrap } from './primitives'
import { cardRotation, formatMemoryDate, hashString } from '../lib/utils'
import type { ListItemView } from '../types/database'

function tapePositionForId(id: string): 'top-left' | 'top-right' | 'top-center' {
  const h = Math.abs(hashString(`${id}:photobooth`))
  if (h % 3 === 0) return 'top-left'
  if (h % 3 === 1) return 'top-right'
  return 'top-center'
}

interface PhotoboothPolaroidProps {
  item: ListItemView
  onOpen: () => void
}

export function PhotoboothPolaroid({ item, onOpen }: PhotoboothPolaroidProps) {
  const completedDate = formatMemoryDate(item.completed_at!)
  const tapeSide = tapePositionForId(item.id)
  const tilt = cardRotation(item.id) * 0.45

  return (
    <div
      className="photobooth-polaroid-cell w-full"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <Scrap
          id={`photobooth-${item.id}`}
          index={0}
          tapePosition={tapeSide}
          layout={false}
        >
          <div className="p-1.5">
            <PolaroidFrame className="w-full !pb-3">
              <img
                src={item.completion_photo_url!}
                alt=""
                className="h-full w-full object-cover"
              />
            </PolaroidFrame>
          </div>
        </Scrap>
        <div className="memory-polaroid-caption mt-1 px-0.5">
          <p className="line-clamp-2 font-hand text-[0.7rem] leading-snug text-ink/75">
            {item.title}
          </p>
          {item.rating != null && (
            <StarRating value={item.rating} size="sm" className="mt-0.5" />
          )}
          <p className="font-hand text-[0.65rem] text-ink/45">{completedDate}</p>
        </div>
      </button>
    </div>
  )
}
