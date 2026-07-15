import { useState } from 'react'
import { CombinationLock } from './CombinationLock'
import { HAND_DRAWN_RADIUS } from '../../lib/utils'
import { TABLES } from '../../lib/tables'
import { supabase, supabaseConfigured } from '../../lib/supabase'
import { PAGE_FILL, PAGE_GRAIN } from '../../lib/binder'
import { cacheProfileMeta, loadProfileFromSupabase } from '../../lib/profile'

interface FirstPageAuthProps {
  name: string
  isNewBook: boolean
  onAuthSuccess: () => void
}

export function FirstPageAuth({ name, isNewBook, onAuthSuccess }: FirstPageAuthProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lockCode, setLockCode] = useState('0000')
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('email and password are needed to keep your lists')
      return
    }

    if (mode === 'signup' && !/^\d{4}$/.test(lockCode)) {
      setError('choose a four-digit combination')
      return
    }

    if (!supabaseConfigured || !supabase) {
      setError('supabase is not configured — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
      return
    }

    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { display_name: name.trim() },
          },
        })
        if (signUpError) throw signUpError

        const userId = data.user?.id
        if (userId) {
          await supabase.from(TABLES.profiles).upsert({
            id: userId,
            display_name: name.trim(),
            lock_code: lockCode,
            onboarding_done: false,
          })
          cacheProfileMeta({
            lockCode,
            displayName: name.trim(),
          })
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (signInError) throw signInError

        const userId = data.user?.id
        if (userId) {
          await loadProfileFromSupabase(userId)
        }
      }

      onAuthSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="first-page relative z-20 overflow-hidden px-10 py-12"
      style={{
        backgroundColor: PAGE_FILL,
        borderRadius: '2px',
        boxShadow:
          '0 32px 64px -16px rgba(43,42,39,0.2), 1px 2px 0 rgba(43,42,39,0.06)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: PAGE_GRAIN,
          backgroundSize: '200px 200px',
          opacity: 0.05,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />

      <div className="relative">
        <p className="font-hand text-2xl text-ink/60">welcome, {name.trim()}</p>
        <p className="mt-1 font-hand text-lg text-ink/45">
          now let&apos;s make this yours
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {mode === 'signup' && isNewBook && (
            <div className="space-y-2">
              <span className="font-hand text-lg text-ink/55">
                choose a combination for your book
              </span>
              <div className="flex justify-start pt-1">
                <CombinationLock
                  code=""
                  mode="set"
                  initialUnlocked
                  disabled={false}
                  showNewBookHint={false}
                  onCodeChange={setLockCode}
                  onUnlock={() => {}}
                  scale={1.15}
                />
              </div>
            </div>
          )}

          <label className="block">
            <span className="font-hand text-lg text-ink/55">your email</span>
            <div className="mt-1 border-b border-ink/25">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 bg-transparent py-1 font-sans text-[15px] text-ink outline-none"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="font-hand text-lg text-ink/55">a password</span>
            <div className="mt-1 border-b border-ink/25">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 bg-transparent py-1 font-sans text-[15px] text-ink outline-none"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>
          </label>

          {error && (
            <p className="font-hand text-base text-stamp/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-ink/25 bg-transparent py-2.5 font-hand text-xl text-ink transition hover:border-ink/40 disabled:opacity-50"
            style={{ borderRadius: HAND_DRAWN_RADIUS }}
          >
            {loading
              ? 'one moment…'
              : mode === 'signup'
                ? 'begin my book'
                : 'open my book'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="mt-4 font-hand text-base text-ink/40 transition hover:text-ink/60"
        >
          {mode === 'signup'
            ? 'already have a book? sign in'
            : 'new here? create your book'}
        </button>
      </div>
    </div>
  )
}
