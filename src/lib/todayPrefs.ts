const PREFIX = 'wishlist_today_'

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function loadTodayPrefs(): {
  availability: string | null
  mood: string | null
} {
  const raw = localStorage.getItem(`${PREFIX}${todayKey()}`)
  if (!raw) return { availability: 'few_hours', mood: 'cosy' }
  try {
    return JSON.parse(raw) as { availability: string | null; mood: string | null }
  } catch {
    return { availability: 'few_hours', mood: null }
  }
}

export function saveTodayPrefs(availability: string | null, mood: string | null) {
  localStorage.setItem(
    `${PREFIX}${todayKey()}`,
    JSON.stringify({ availability, mood }),
  )
}
