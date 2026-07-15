import type { CollectionGestureType } from '../../types/supabase'
import type { CollectionGesture } from '../../types/database'
import { HAND_DRAWN_RADIUS } from '../../lib/utils'

interface ModeToggleProps {
  mode: 'browse' | 'swipe'
  onChange: (mode: 'browse' | 'swipe') => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div
      className="ml-auto flex gap-2 font-hand text-base text-ink/50"
      style={{ transform: 'rotate(0.5deg)' }}
    >
      <button
        type="button"
        onClick={() => onChange('swipe')}
        className="transition-colors"
        style={{
          color: mode === 'swipe' ? '#2B2A27' : undefined,
          fontWeight: mode === 'swipe' ? 600 : 400,
          textDecoration: mode === 'swipe' ? 'underline' : 'none',
          textDecorationColor: 'rgba(168,181,162,0.6)',
        }}
      >
        swipe
      </button>
      <span aria-hidden>·</span>
      <button
        type="button"
        onClick={() => onChange('browse')}
        className="transition-colors"
        style={{
          color: mode === 'browse' ? '#2B2A27' : undefined,
          fontWeight: mode === 'browse' ? 600 : 400,
          textDecoration: mode === 'browse' ? 'underline' : 'none',
          textDecorationColor: 'rgba(168,181,162,0.6)',
        }}
      >
        browse
      </button>
    </div>
  )
}

interface GestureToggleProps {
  current: CollectionGesture | null
  confirmUnstar?: boolean
  onSelect: (gesture: CollectionGestureType) => void
  onClear: () => void
}

export function GestureToggle({
  current,
  confirmUnstar = false,
  onSelect,
  onClear,
}: GestureToggleProps) {
  if (current === 'starred' && confirmUnstar) {
    return (
      <button
        type="button"
        onClick={onClear}
        className="font-hand text-sm text-rose-deep underline decoration-dotted"
      >
        remove from wishes?
      </button>
    )
  }

  return (
    <div
      className="flex gap-2 font-hand text-sm"
      style={{ borderRadius: HAND_DRAWN_RADIUS }}
    >
      {(['ticked', 'starred', 'skipped'] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onSelect(g)}
          className="px-2 py-0.5 transition-opacity"
          style={{
            opacity: current === g ? 1 : 0.45,
            fontWeight: current === g ? 600 : 400,
          }}
        >
          {g === 'ticked' ? '✓ done' : g === 'starred' ? '⭐ want' : '✗ skip'}
        </button>
      ))}
      {current && (
        <button
          type="button"
          onClick={onClear}
          className="text-ink/40 underline decoration-dotted"
        >
          clear
        </button>
      )}
    </div>
  )
}
