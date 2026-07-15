import type { ConnectionFailure } from '../lib/supabaseHealth'
import { failureMessage } from '../lib/supabaseHealth'
import { HAND_DRAWN_RADIUS } from '../lib/utils'

interface ConnectionErrorProps {
  failure: ConnectionFailure
}

export function ConnectionError({ failure }: ConnectionErrorProps) {
  const { title, lines } = failureMessage(failure)

  return (
    <div className="binder-desk flex h-screen w-full items-center justify-center p-8">
      <div
        className="max-w-md border border-ink/20 bg-paper px-8 py-10 text-center"
        style={{
          borderRadius: HAND_DRAWN_RADIUS,
          boxShadow: '3px 6px 18px -8px rgba(43,42,39,0.2)',
        }}
      >
        <p
          className="font-hand text-3xl text-stamp/90"
          style={{ transform: 'rotate(-1deg)' }}
        >
          {title}
        </p>
        <div className="mt-6 space-y-3 text-left">
          {lines.map((line) => (
            <p key={line} className="font-hand text-lg leading-snug text-ink/65">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
