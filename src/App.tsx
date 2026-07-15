import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ConnectionError } from './components/ConnectionError'
import { Binder, type BinderTabId } from './components/binder'
import { ListsProvider, useLists } from './hooks/useLists'
import { clearProfileMemory, loadProfileFromSupabase } from './lib/profile'
import { soloConfigured, soloEmail, soloPassword } from './lib/soloAuth'
import { supabase, supabaseConfigured } from './lib/supabase'
import type { ConnectionFailure } from './lib/supabaseHealth'
import { ListsLeftPage, ListsRightPage } from './screens/ListsSpread'
import { MemoriesLeftPage, MemoriesRightPage } from './screens/MemoriesSpread'
import { TodayLeftPage } from './screens/TodayLeftPage'
import { TodayRightPage } from './screens/TodayRightPage'

function BinderApp() {
  const [activeTab, setActiveTab] = useState<BinderTabId>('today')

  return (
    <Binder
      activeTab={activeTab}
      onTabChange={setActiveTab}
      renderSpread={(tab) => {
        if (tab === 'today') {
          return { left: <TodayLeftPage />, right: <TodayRightPage /> }
        }
        if (tab === 'lists') {
          return { left: <ListsLeftPage />, right: <ListsRightPage /> }
        }
        return { left: <MemoriesLeftPage />, right: <MemoriesRightPage /> }
      }}
    />
  )
}

function DataErrorGate({ children }: { children: React.ReactNode }) {
  const { error, loading } = useLists()
  if (loading) {
    return (
      <div className="binder-desk flex h-screen items-center justify-center">
        <p className="font-hand text-2xl text-ink/40">opening your lists…</p>
      </div>
    )
  }
  if (error) {
    const failure: ConnectionFailure = error.includes('not configured')
      ? { kind: 'missing_env' }
      : error.includes('no lists found')
        ? { kind: 'collections_empty' }
        : { kind: 'collections_error', message: error }
    return <ConnectionError failure={failure} />
  }
  return <>{children}</>
}

function ReadyApp({ session }: { session: Session }) {
  useEffect(() => {
    void loadProfileFromSupabase(session.user.id)
  }, [session.user.id])

  return (
    <ListsProvider>
      <DataErrorGate>
        <BinderApp />
      </DataErrorGate>
    </ListsProvider>
  )
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [bootError, setBootError] = useState<ConnectionFailure | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (!supabaseConfigured || !supabase) {
      setAuthReady(true)
      return
    }

    let cancelled = false

    // NEVER await supabase.auth.* inside onAuthStateChange — it deadlocks the client lock.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (cancelled) return
      if (nextSession) {
        setSession(nextSession)
        setBootError(null)
        setAuthReady(true)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        clearProfileMemory()
      }
    })

    async function boot() {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return

      if (data.session) {
        setSession(data.session)
        setAuthReady(true)
        return
      }

      if (!soloConfigured || !soloEmail || !soloPassword) {
        setBootError({ kind: 'missing_solo' })
        setAuthReady(true)
        return
      }

      const { data: signed, error } = await supabase.auth.signInWithPassword({
        email: soloEmail,
        password: soloPassword,
      })

      if (cancelled) return

      if (error || !signed.session) {
        setBootError({
          kind: 'collections_error',
          message:
            error?.message ??
            'silent sign-in failed — check VITE_SOLO_EMAIL / VITE_SOLO_PASSWORD',
        })
        setAuthReady(true)
        return
      }

      setSession(signed.session)
      setAuthReady(true)
    }

    void boot()

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  if (!supabaseConfigured || !supabase) {
    return <ConnectionError failure={{ kind: 'missing_env' }} />
  }

  if (!authReady) {
    return (
      <div className="binder-desk flex h-screen items-center justify-center">
        <p className="font-hand text-2xl text-ink/40">signing in…</p>
      </div>
    )
  }

  if (bootError) {
    return <ConnectionError failure={bootError} />
  }

  if (!session) {
    return <ConnectionError failure={{ kind: 'missing_solo' }} />
  }

  return <ReadyApp session={session} />
}
