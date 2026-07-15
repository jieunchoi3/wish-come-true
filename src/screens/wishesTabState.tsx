import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { Wish } from '../types/supabase'
import type { WishFilters } from '../lib/wishQueries'

interface WishesTabState {
  filters: WishFilters
  setFilters: (f: WishFilters) => void
  sheet: 'none' | 'add' | 'edit' | 'detail'
  setSheet: (s: 'none' | 'add' | 'edit' | 'detail') => void
  selectedWish: Wish | null
  setSelectedWish: (w: Wish | null) => void
  openAdd: () => void
  openDetail: (w: Wish) => void
  openEdit: (w: Wish) => void
  closeSheet: () => void
}

const Ctx = createContext<WishesTabState | null>(null)

export function WishesTabProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<WishFilters>({ sort: 'newest' })
  const [sheet, setSheet] = useState<'none' | 'add' | 'edit' | 'detail'>('none')
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)

  const value: WishesTabState = {
    filters,
    setFilters,
    sheet,
    setSheet,
    selectedWish,
    setSelectedWish,
    openAdd: () => {
      setSelectedWish(null)
      setSheet('add')
    },
    openDetail: (w) => {
      setSelectedWish(w)
      setSheet('detail')
    },
    openEdit: (w) => {
      setSelectedWish(w)
      setSheet('edit')
    },
    closeSheet: () => {
      setSheet('none')
      setSelectedWish(null)
    },
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useWishesTab() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useWishesTab requires WishesTabProvider')
  return ctx
}
