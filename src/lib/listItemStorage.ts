import { WISHLIST_STORAGE_BUCKET } from './tables'
import { supabase } from './supabase'
import { compressImage } from './wishStorage'

export async function uploadCompletionPhoto(
  userId: string,
  itemId: string,
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  if (!supabase) throw new Error('supabase not configured')

  onProgress?.(0.1)
  const blob = await compressImage(file)
  onProgress?.(0.4)

  const path = `${userId}/completion/${itemId}.jpg`
  const { error } = await supabase.storage
    .from(WISHLIST_STORAGE_BUCKET)
    .upload(path, blob, { upsert: true, contentType: 'image/jpeg' })

  if (error) throw error
  onProgress?.(1)

  const { data } = supabase.storage
    .from(WISHLIST_STORAGE_BUCKET)
    .getPublicUrl(path)
  return `${data.publicUrl}?t=${Date.now()}`
}
