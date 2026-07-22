import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { MemoryDetailSheet } from '../components/lists/MemoryDetailSheet'
import { useLists } from '../hooks/useLists'
import type { ListItemView } from '../types/database'

interface MemoriesTabState {
  activeChapterId: string | null
  chapterVisible: boolean
  selectedItem: ListItemView | null
  selectChapter: (listId: string) => void
  goToChapter: (listId: string) => void
  setInitialChapter: (listId: string) => void
  openMemory: (item: ListItemView) => void
  closeMemory: () => void
}

const Ctx = createContext<MemoriesTabState | null>(null)

const CHAPTER_MS = 280

export function MemoriesTabProvider({ children }: { children: ReactNode }) {
  const { items } = useLists()
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null)
  const [chapterVisible, setChapterVisible] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ListItemView | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const goToChapter = useCallback(
    (listId: string) => {
      if (listId === activeChapterId) return
      setChapterVisible(false)
      setPendingId(listId)
      window.setTimeout(() => {
        setActiveChapterId(listId)
        setPendingId(null)
        setChapterVisible(true)
      }, CHAPTER_MS)
    },
    [activeChapterId],
  )

  const selectChapter = useCallback(
    (listId: string) => {
      goToChapter(listId)
    },
    [goToChapter],
  )

  const setInitialChapter = useCallback((listId: string) => {
    setActiveChapterId(listId)
    setChapterVisible(true)
  }, [])

  const value: MemoriesTabState = {
    activeChapterId: pendingId ?? activeChapterId,
    chapterVisible,
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
      {selectedItem &&
        createPortal(
          <div className="fixed inset-0 z-[100]">
            <MemoryDetailSheet
              item={
                items.find((row) => row.id === selectedItem.id) ?? selectedItem
              }
              onClose={() => setSelectedItem(null)}
            />
          </div>,
          document.body,
        )}
    </Ctx.Provider>
  )
}

export function useMemoriesTab(): MemoriesTabState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMemoriesTab requires MemoriesTabProvider')
  return ctx
}

export { CHAPTER_MS }
