const MAX_EDGE = 1600

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('could not decode image'))
    }
    img.src = url
  })
}

async function drawToJpegBlob(
  source: CanvasImageSource,
  width: number,
  height: number,
): Promise<Blob> {
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height))
  const w = Math.round(width * scale)
  const h = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('compress failed')

  ctx.drawImage(source, 0, 0, w, h)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('compress failed'))),
      'image/jpeg',
      0.85,
    )
  })
}

export async function compressImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file)
    const { width, height } = bitmap
    const blob = await drawToJpegBlob(bitmap, width, height)
    bitmap.close()
    return blob
  } catch {
    const img = await loadImageFromFile(file)
    return drawToJpegBlob(img, img.naturalWidth, img.naturalHeight)
  }
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
