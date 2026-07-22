import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface ListsTabState {
  query: string
  setQuery: (value: string) => void
}

const Ctx = createContext<ListsTabState | null>(null)

export function ListsTabProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')

  return (
    <Ctx.Provider value={{ query, setQuery }}>{children}</Ctx.Provider>
  )
}

export function useListsTab(): ListsTabState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useListsTab requires ListsTabProvider')
  return ctx
}
