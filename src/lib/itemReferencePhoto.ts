import { uploadItemReferencePhoto } from './listItemStorage'
import { supabase } from './supabase'

export async function saveItemReferencePhoto(
  itemId: string,
  file: File,
): Promise<string | null> {
  if (!supabase) return null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const url = await uploadItemReferencePhoto(user.id, itemId, file)
  return url.split('?')[0] ?? url
}
