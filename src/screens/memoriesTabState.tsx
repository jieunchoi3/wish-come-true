import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
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

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useMemoriesTab(): MemoriesTabState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMemoriesTab requires MemoriesTabProvider')
  return ctx
}

/** @deprecated Use CHAPTER_FLIP_MS */
export const CHAPTER_MS = CHAPTER_FLIP_MS
