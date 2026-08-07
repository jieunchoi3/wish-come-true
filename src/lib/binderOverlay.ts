/** Full-spread overlay root for sheets that must sit above both binder pages. */
export function getBinderOverlayRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  const spread = document.querySelector<HTMLElement>('.binder-spread')
  if (spread && window.getComputedStyle(spread).display !== 'none') return spread
  const mobile = document.querySelector<HTMLElement>('.binder-mobile')
  if (mobile && window.getComputedStyle(mobile).display !== 'none') return mobile
  return document.querySelector<HTMLElement>('.binder-shell') ?? document.getElementById('root')
}
