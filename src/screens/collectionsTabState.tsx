import { createContext, useContext, useState, type ReactNode } from 'react'

export type CollectionMode = 'browse' | 'swipe'

export type CollectionsView =
  | { kind: 'home' }
  | { kind: 'detail'; collectionId: string; mode: CollectionMode }
  | { kind: 'onboarding-pick' }
  | { kind: 'onboarding-swipe'; collectionIds: string[] }

interface CollectionsTabContextValue {
  view: CollectionsView
  openCollection: (id: string, mode?: CollectionMode) => void
  goHome: () => void
  setMode: (mode: CollectionMode) => void
  startOnboarding: () => void
  startOnboardingSwipe: (collectionIds: string[]) => void
  finishOnboarding: () => void
}

const CollectionsTabContext = createContext<CollectionsTabContextValue | null>(
  null,
)

export function CollectionsTabProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<CollectionsView>({ kind: 'home' })

  const openCollection = (collectionId: string, mode: CollectionMode = 'browse') => {
    setView({ kind: 'detail', collectionId, mode })
  }

  const goHome = () => setView({ kind: 'home' })

  const setMode = (mode: CollectionMode) => {
    if (view.kind === 'detail') {
      setView({ ...view, mode })
    }
  }

  const startOnboarding = () => setView({ kind: 'onboarding-pick' })

  const startOnboardingSwipe = (collectionIds: string[]) => {
    setView({ kind: 'onboarding-swipe', collectionIds })
  }

  const finishOnboarding = () => setView({ kind: 'home' })

  return (
    <CollectionsTabContext.Provider
      value={{
        view,
        openCollection,
        goHome,
        setMode,
        startOnboarding,
        startOnboardingSwipe,
        finishOnboarding,
      }}
    >
      {children}
    </CollectionsTabContext.Provider>
  )
}

export function useCollectionsTab(): CollectionsTabContextValue {
  const ctx = useContext(CollectionsTabContext)
  if (!ctx) {
    throw new Error('useCollectionsTab must be used within CollectionsTabProvider')
  }
  return ctx
}
