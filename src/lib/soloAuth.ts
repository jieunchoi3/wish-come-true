/** Personal-use silent session — no login UI. Set once in .env.local. */

export const soloEmail = import.meta.env.VITE_SOLO_EMAIL as string | undefined
export const soloPassword = import.meta.env.VITE_SOLO_PASSWORD as string | undefined

export const soloConfigured = Boolean(soloEmail && soloPassword)
