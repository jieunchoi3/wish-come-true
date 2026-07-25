export type WeatherCondition = 'sun' | 'cloud' | 'rain'

export interface TodayWeather {
  temp: number
  condition: WeatherCondition
  sunset: string
}

/** London — fixed coords so we never trigger browser location prompts */
const LONDON = { lat: 51.5074, lon: -0.1278 }

function mapWeatherCode(code: number): WeatherCondition {
  if (code === 0 || code === 1) return 'sun'
  if (code >= 51 && code <= 67) return 'rain'
  if (code >= 80 && code <= 99) return 'rain'
  if (code >= 71 && code <= 77) return 'cloud' // snow → cloudy glyph for now
  return 'cloud'
}

function formatSunset(iso: string, timeZone: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  })
}

/**
 * Live weather via Open-Meteo (no API key).
 * Uses London coords — no geolocation prompt.
 */
export async function fetchTodayWeather(): Promise<TodayWeather> {
  const { lat, lon } = LONDON
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London'

  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(lat))
  url.searchParams.set('longitude', String(lon))
  url.searchParams.set('current', 'temperature_2m,weather_code')
  url.searchParams.set('daily', 'sunset')
  url.searchParams.set('timezone', timeZone)
  url.searchParams.set('forecast_days', '1')

  const res = await fetch(url)
  if (!res.ok) throw new Error(`weather ${res.status}`)

  const data = (await res.json()) as {
    current?: { temperature_2m?: number; weather_code?: number }
    daily?: { sunset?: string[] }
  }

  const temp = Math.round(data.current?.temperature_2m ?? 0)
  const condition = mapWeatherCode(data.current?.weather_code ?? 3)
  const sunsetIso = data.daily?.sunset?.[0]
  const sunset = sunsetIso ? formatSunset(sunsetIso, timeZone) : '—'

  return { temp, condition, sunset }
}
