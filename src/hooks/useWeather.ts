import { useEffect, useState } from 'react'
import { fetchTodayWeather, type TodayWeather } from '../lib/weather'

export function useWeather() {
  const [weather, setWeather] = useState<TodayWeather | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchTodayWeather()
        if (!cancelled) {
          setWeather(data)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'weather failed')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { weather, loading, error }
}
