export function pickImageFile(
  dataTransfer: DataTransfer | null | undefined,
): File | null {
  if (!dataTransfer) return null

  for (const entry of dataTransfer.items) {
    if (entry.kind !== 'file') continue
    const file = entry.getAsFile()
    if (!file) continue
    if (file.type.startsWith('image/')) return file
    if (!file.type && file.size > 0) return file
  }

  for (let i = 0; i < dataTransfer.files.length; i++) {
    const file = dataTransfer.files[i]
    if (!file) continue
    if (file.type.startsWith('image/')) return file
    if (!file.type && file.size > 0) return file
  }

  return null
}

export function isEditablePasteTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  )
}
