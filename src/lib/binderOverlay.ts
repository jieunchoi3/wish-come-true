/** Overlay root for modal sheets — always the body so fixed positioning covers the viewport. */
export function getBinderOverlayRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  return document.body
}
