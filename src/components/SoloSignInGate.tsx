import { useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { HAND_DRAWN_RADIUS } from '../lib/utils'
import { supabase } from '../lib/supabase'

interface SoloSignInGateProps {
  defaultEmail?: string
  hint?: string | null
  onSession: (session: Session) => void
}

/** One-time sign-in when silent solo env credentials are stale. */
export function SoloSignInGate({
  defaultEmail = '',
  hint,
  onSession,
}: SoloSignInGateProps) {
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setError(null)
    setLoading(true)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    if (!data.session) {
      setError('no session — try again')
      return
    }
    onSession(data.session)
  }

  return (
    <div className="binder-desk flex h-screen w-full items-center justify-center p-8">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="w-full max-w-md border border-ink/20 bg-paper px-8 py-10"
        style={{
          borderRadius: HAND_DRAWN_RADIUS,
          boxShadow: '3px 6px 18px -8px rgba(43,42,39,0.2)',
        }}
      >
        <p
          className="font-hand text-3xl text-ink/80"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          sign in to your wishlist
        </p>
        <p className="mt-3 font-hand text-base leading-snug text-ink/55">
          Saved sign-in in <span className="text-ink/70">.env.local</span> didn&apos;t
          work{hint ? ` (${hint})` : ''}. Use your Supabase user once — this browser
          will remember you.
        </p>
        <p className="mt-2 font-hand text-sm text-ink/45">
          Then update <span className="text-ink/60">VITE_SOLO_PASSWORD</span> locally
          and on Vercel to match, so silent sign-in works again.
        </p>

        <label className="mt-6 block">
          <span className="font-hand text-sm text-ink/45">email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-lg text-ink outline-none"
          />
        </label>

        <label className="mt-4 block">
          <span className="font-hand text-sm text-ink/45">password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="mt-1 w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-lg text-ink outline-none"
          />
        </label>

        {error && (
          <p className="mt-4 font-hand text-base text-stamp/90">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !email.trim() || !password}
          className="rubber-stamp-btn mt-8 disabled:opacity-40"
        >
          {loading ? 'signing in…' : 'open my lists'}
        </button>
      </form>
    </div>
  )
}
