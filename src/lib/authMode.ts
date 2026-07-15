/** Solo / private mode — no login UI. See .env.example */

export const skipAuth = import.meta.env.VITE_SKIP_AUTH === '1'

export const soloEmail = import.meta.env.VITE_SOLO_EMAIL as string | undefined
export const soloPassword = import.meta.env.VITE_SOLO_PASSWORD as string | undefined

export const soloAutoLogin = skipAuth && Boolean(soloEmail && soloPassword)
