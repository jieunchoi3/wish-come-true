/** Local calendar date for `<input type="date">` from an ISO timestamp. */
export function isoToDateInputValue(iso: string): string {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/** Noon local time on the chosen day — stable for memories sorting. */
export function dateInputToIso(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0, 0).toISOString()
}

export function todayDateInputValue(): string {
  return isoToDateInputValue(new Date().toISOString())
}
