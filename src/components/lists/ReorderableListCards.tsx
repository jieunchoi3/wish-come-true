import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrapCollage } from '../ScrapCollage'
import type { ListWithCounts } from '../../types/database'
import { ListAccordion } from './ListAccordion'

interface ReorderableListCardsProps {
  lists: ListWithCounts[]
  openListId?: string | null
  onReorder: (orderedIds: string[]) => void | Promise<unknown>
}

export function ReorderableListCards({
  lists,
  openListId,
  onReorder,
}: ReorderableListCardsProps) {
  const listIds = useMemo(() => lists.map((l) => l.id), [lists])
  const [orderedIds, setOrderedIds] = useState(listIds)
  const orderedIdsRef = useRef(orderedIds)
  orderedIdsRef.current = orderedIds
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  useEffect(() => {
    setOrderedIds((prev) => {
      if (
        prev.length === listIds.length &&
        prev.every((id, i) => id === listIds[i])
      ) {
        return prev
      }
      return listIds
    })
  }, [listIds])

  const listsById = useMemo(() => new Map(lists.map((l) => [l.id, l])), [lists])

  const orderedLists = orderedIds
    .map((id) => listsById.get(id))
    .filter((l): l is ListWithCounts => l != null)

  async function commitOrder(nextIds: string[]) {
    setOrderedIds(nextIds)
    await onReorder(nextIds)
  }

  function handleDragStart(id: string) {
    setDraggingId(id)
  }

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return
    setOverId(targetId)
    setOrderedIds((prev) => {
      const draggedIndex = prev.indexOf(draggingId)
      const targetIndex = prev.indexOf(targetId)
      if (draggedIndex === -1 || targetIndex === -1) return prev
      const next = [...prev]
      next.splice(draggedIndex, 1)
      next.splice(targetIndex, 0, draggingId)
      return next
    })
  }

  function handleDragEnd() {
    if (draggingId) {
      void commitOrder(orderedIdsRef.current)
    }
    setDraggingId(null)
    setOverId(null)
  }

  return (
    <ScrapCollage className="pb-8">
      {orderedLists.map((list) => {
        const isDragging = draggingId === list.id
        const isOver = overId === list.id && draggingId !== list.id

        return (
          <div
            key={list.id}
            onDragOver={(e) => handleDragOver(e, list.id)}
            onDragLeave={() => {
              if (overId === list.id) setOverId(null)
            }}
            className={`relative transition-transform duration-150 ${
              isDragging ? 'z-30 scale-[0.98] opacity-55' : ''
            } ${isOver ? 'translate-y-0.5' : ''}`}
          >
            <div className="flex items-start gap-1">
              <button
                type="button"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move'
                  e.dataTransfer.setData('text/plain', list.id)
                  handleDragStart(list.id)
                }}
                onDragEnd={handleDragEnd}
                className="list-drag-handle mt-6 shrink-0 cursor-grab touch-none px-0.5 py-2 font-hand text-lg leading-none text-ink/25 transition hover:text-ink/50 active:cursor-grabbing"
                aria-label={`Drag to reorder ${list.title}`}
                title="Drag to reorder"
              >
                ⠿
              </button>
              <div className="min-w-0 flex-1">
                <ListAccordion
                  list={list}
                  defaultOpen={openListId != null && list.id === openListId}
                />
              </div>
            </div>
          </div>
        )
      })}
    </ScrapCollage>
  )
}
