import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { MemoryDetailSheet } from '../components/lists/MemoryDetailSheet'
import { useLists } from '../hooks/useLists'
import { getBinderOverlayRoot } from '../lib/binderOverlay'
import type { ListItemView } from '../types/database'

export type ChapterFlipDirection = 'next' | 'prev'
export type ChapterAnimPhase = 'idle' | 'leave' | 'enter'

interface MemoriesTabState {
  activeChapterId: string | null
  chapterAnim: ChapterAnimPhase
  flipDirection: ChapterFlipDirection | null
  selectedItem: ListItemView | null
  selectChapter: (listId: string, direction?: ChapterFlipDirection) => void
  goToChapter: (listId: string, direction: ChapterFlipDirection) => void
  setInitialChapter: (listId: string) => void
  openMemory: (item: ListItemView) => void
  closeMemory: () => void
}

const Ctx = createContext<MemoriesTabState | null>(null)

/** Match CSS flip duration in index.css */
export const CHAPTER_FLIP_MS = 680

function MemoriesDetailOverlay() {
  const { selectedItem, closeMemory } = useMemoriesTab()
  const { items } = useLists()
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    function updateRoot() {
      setPortalRoot(getBinderOverlayRoot())
    }
    updateRoot()
    window.addEventListener('resize', updateRoot)
    return () => window.removeEventListener('resize', updateRoot)
  }, [])

  if (!selectedItem) return null

  const overlayRoot = portalRoot ?? getBinderOverlayRoot()
  if (!overlayRoot) return null

  const liveItem =
    items.find((row) => row.id === selectedItem.id) ?? selectedItem

  return createPortal(
    <MemoryDetailSheet item={liveItem} onClose={closeMemory} />,
    overlayRoot,
  )
}

export function MemoriesTabProvider({ children }: { children: ReactNode }) {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null)
  const [chapterAnim, setChapterAnim] = useState<ChapterAnimPhase>('idle')
  const [flipDirection, setFlipDirection] =
    useState<ChapterFlipDirection | null>(null)
  const [selectedItem, setSelectedItem] = useState<ListItemView | null>(null)

  const goToChapter = useCallback(
    (listId: string, direction: ChapterFlipDirection) => {
      if (listId === activeChapterId || chapterAnim !== 'idle') return

      setFlipDirection(direction)
      requestAnimationFrame(() => {
        setChapterAnim('leave')
      })

      window.setTimeout(() => {
        setActiveChapterId(listId)
        setChapterAnim('enter')

        window.setTimeout(() => {
          setChapterAnim('idle')
          setFlipDirection(null)
        }, CHAPTER_FLIP_MS)
      }, CHAPTER_FLIP_MS)
    },
    [activeChapterId, chapterAnim],
  )

  const selectChapter = useCallback(
    (listId: string, direction: ChapterFlipDirection = 'next') => {
      goToChapter(listId, direction)
    },
    [goToChapter],
  )

  const setInitialChapter = useCallback((listId: string) => {
    setActiveChapterId(listId)
    setChapterAnim('idle')
    setFlipDirection(null)
  }, [])

  const value: MemoriesTabState = {
    activeChapterId,
    chapterAnim,
    flipDirection,
    selectedItem,
    selectChapter,
    goToChapter,
    setInitialChapter,
    openMemory: setSelectedItem,
    closeMemory: () => setSelectedItem(null),
  }

  return (
    <Ctx.Provider value={value}>
      {children}
      <MemoriesDetailOverlay />
    </Ctx.Provider>
  )
}

export function useMemoriesTab(): MemoriesTabState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMemoriesTab requires MemoriesTabProvider')
  return ctx
}

/** @deprecated Use CHAPTER_FLIP_MS */
export const CHAPTER_MS = CHAPTER_FLIP_MS
