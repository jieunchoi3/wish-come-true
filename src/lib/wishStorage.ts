const MAX_EDGE = 1600

export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const { width, height } = bitmap
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height))
  const w = Math.round(width * scale)
  const h = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('compress failed'))),
      'image/jpeg',
      0.85,
    )
  })
}

export async function uploadWishImage(
  userId: string,
  wishId: string,
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const { supabase } = await import('./supabase')
  if (!supabase) throw new Error('supabase not configured')

  onProgress?.(0.1)
  const blob = await compressImage(file)
  onProgress?.(0.4)

  const path = `${userId}/${wishId}.jpg`
  const { error } = await supabase.storage
    .from('wish-images')
    .upload(path, blob, { upsert: true, contentType: 'image/jpeg' })

  if (error) throw error
  onProgress?.(1)

  const { data } = supabase.storage.from('wish-images').getPublicUrl(path)
  return data.publicUrl
}
