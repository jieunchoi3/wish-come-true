import { useCallback, useState } from 'react'
import { getCachedDisplayName, getCachedLockCode, hasCachedProfile } from '../../lib/profile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { DeskSurface } from './DeskSurface'
import { BookCover } from './BookCover'

type RitualPhase = 'closed' | 'strap-opening' | 'cover-opening' | 'open'

interface BookOpeningRitualProps {
  onComplete: () => void
}

/** Cover + lock ritual only — no email/password. Session is silent (soloAuth). */
export function BookOpeningRitual({ onComplete }: BookOpeningRitualProps) {
  const reducedMotion = usePrefersReducedMotion()
  const cachedCode = getCachedLockCode()
  const initialUnlocked = !hasCachedProfile()
  const lockCode = cachedCode ?? '0000'

  const [name, setName] = useState(() => getCachedDisplayName() ?? '')
  const [phase, setPhase] = useState<RitualPhase>('closed')

  const handleUnlock = useCallback(() => {
    if (phase !== 'closed') return

    setPhase('strap-opening')

    window.setTimeout(() => {
      setPhase('cover-opening')
    }, reducedMotion ? 100 : 450)

    window.setTimeout(
      () => {
        setPhase('open')
        onComplete()
      },
      reducedMotion ? 400 : 1250,
    )
  }, [phase, reducedMotion, onComplete])

  const strapOpen = phase !== 'closed'
  const coverOpen = phase === 'cover-opening' || phase === 'open'

  return (
    <DeskSurface>
      <div className="book-scene relative flex items-center justify-center">
        <BookCover
          name={name}
          onNameChange={setName}
          lockCode={lockCode}
          initialUnlocked={initialUnlocked}
          strapOpen={strapOpen}
          coverOpen={coverOpen}
          coverOpenReduced={reducedMotion}
          onUnlock={handleUnlock}
        />
      </div>
    </DeskSurface>
  )
}
