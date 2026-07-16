import { RubberStamp } from './ScrapbookElements'
import { PolaroidFrame } from './PolaroidFrame'
import { Scrap } from './primitives'
import { formatDoneStampDate, formatRelativeAgo, hashString } from '../lib/utils'
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
  const stampDate = formatDoneStampDate(item.completed_at!)
  const doneAgo = formatRelativeAgo(new Date(item.completed_at!))
  const tapeSide = tapePositionForId(item.id)

  return (
    <div className="w-fit max-w-[11.5rem]">
      <button type="button" onClick={onOpen} className="text-left">
        <Scrap
          id={`photobooth-${item.id}`}
          index={0}
          tapePosition={tapeSide}
          layout={false}
        >
          <div className="p-2 pb-1">
            <div className="relative">
              <PolaroidFrame className="w-full">
                <img
                  src={item.completion_photo_url!}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </PolaroidFrame>
              <RubberStamp date={stampDate} />
            </div>
            <p
              className="mt-2 font-hand text-base leading-snug text-ink/75"
              style={{ transform: 'rotate(-0.2deg)' }}
            >
              {item.title}
            </p>
            <p
              className="font-hand text-sm text-ink/45"
              style={{ transform: 'rotate(0.15deg)' }}
            >
              you did this {doneAgo}
            </p>
          </div>
        </Scrap>
      </button>
    </div>
  )
}
