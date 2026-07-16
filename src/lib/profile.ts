import { TABLES } from './tables'

/** In-memory profile cache — loaded from Supabase after auth. Not localStorage. */
interface ProfileMemory {
  lockCode: string | null
  displayName: string | null
  onboardingDone: boolean
  createdAt: string | null
}

let memory: ProfileMemory | null = null

export function getCachedLockCode(): string | null {
  const code = memory?.lockCode
  return code && /^\d{4}$/.test(code) ? code : null
}

export function getCachedDisplayName(): string | null {
  return memory?.displayName ?? null
}

export function isOnboardingDone(): boolean {
  return memory?.onboardingDone ?? false
}

export function getCachedProfileCreatedAt(): string | null {
  return memory?.createdAt ?? null
}

export function hasCachedProfile(): boolean {
  return memory !== null
}

export function setProfileMemory(profile: ProfileMemory): void {
  memory = profile
}

export function clearProfileMemory(): void {
  memory = null
}

export async function loadProfileFromSupabase(userId: string): Promise<void> {
  const { supabase } = await import('./supabase')
  if (!supabase) return

  const { data } = await supabase
    .from(TABLES.profiles)
    .select('lock_code, display_name, onboarding_done, created_at')
    .eq('id', userId)
    .maybeSingle()

  memory = {
    lockCode: data?.lock_code ?? null,
    displayName: data?.display_name ?? null,
    onboardingDone: data?.onboarding_done ?? false,
    createdAt: data?.created_at ?? null,
  }
}

export async function markOnboardingDoneInDb(userId: string): Promise<void> {
  const { supabase } = await import('./supabase')
  if (!supabase) return

  await supabase
    .from(TABLES.profiles)
    .update({ onboarding_done: true })
    .eq('id', userId)

  if (memory) memory.onboardingDone = true
}

export function cacheProfileMeta(opts: {
  lockCode: string
  displayName?: string
}) {
  memory = {
    lockCode: opts.lockCode,
    displayName: opts.displayName ?? memory?.displayName ?? null,
    onboardingDone: memory?.onboardingDone ?? false,
    createdAt: memory?.createdAt ?? null,
  }
}
