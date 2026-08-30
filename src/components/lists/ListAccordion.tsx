import { useEffect, useState, type MouseEvent } from 'react'
import type { ListWithCounts } from '../../types/database'
import { DEFAULT_LIST_EMOJI } from '../../constants/listEmojis'
import { ProgressRing } from '../collections/ProgressRing'
import { Scrap } from '../primitives'
import { DeleteIconButton } from '../primitives/DeleteIconButton'
import { ListCoverPicker } from './ListCoverPicker'
import { ListEmojiPicker } from './ListEmojiPicker'
import { ListItemRow } from './ListItemRow'
import { useLists } from '../../hooks/useLists'
import { uploadListCover } from '../../lib/listItemStorage'
import { supabase } from '../../lib/supabase'

interface ListAccordionProps {
  list: ListWithCounts
  defaultOpen?: boolean
}

export function ListAccordion({ list, defaultOpen = false }: ListAccordionProps) {
  const { itemsForList, updateList, deleteList, abandonList, createItem } = useLists()
  const [open, setOpen] = useState(defaultOpen)
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [draftTitle, setDraftTitle] = useState(list.title)
  const [draftEmoji, setDraftEmoji] = useState(list.emoji ?? DEFAULT_LIST_EMOJI)
  const [draftRatingEnabled, setDraftRatingEnabled] = useState(list.rating_enabled ?? false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmAbandon, setConfirmAbandon] = useState(false)
  const [busy, setBusy] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const [completedExpanded, setCompletedExpanded] = useState(false)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    list.cover_url ?? null,
  )
  const [coverUploading, setCoverUploading] = useState(false)
  const [coverError, setCoverError] = useState<string | null>(null)

  const items = itemsForList(list.id)
  const openItems = items.filter((item) => item.status !== 'done')
  const doneItems = items.filter((item) => item.status === 'done')
  const progress = list.totalCount > 0 ? list.doneCount / list.totalCount : 0
  const canRename = !list.is_seeded

  useEffect(() => {
    if (!open) setCompletedExpanded(false)
  }, [open])

  useEffect(() => {
    if (coverUploading) return
    setCoverPreviewUrl(list.cover_url ?? null)
  }, [list.cover_url, list.id, coverUploading])

  function listIcon(coverUrl: string | null, emoji: string) {
    if (coverUrl) {
      return (
        <img
          src={coverUrl}
          alt=""
          className="size-11 shrink-0 rounded border border-ink/10 object-cover"
        />
      )
    }
    return (
      <span className="shrink-0 text-2xl" aria-hidden>
        {emoji}
      </span>
    )
  }

  function openEdit(e: MouseEvent) {
    e.stopPropagation()
    setDraftTitle(list.title)
    setDraftEmoji(list.emoji ?? DEFAULT_LIST_EMOJI)
    setDraftRatingEnabled(list.rating_enabled ?? false)
    setConfirmDelete(false)
    setConfirmAbandon(false)
    setEditing(true)
  }

  function closeEdit() {
    setEditing(false)
    setConfirmDelete(false)
    setConfirmAbandon(false)
    setDraftTitle(list.title)
    setDraftEmoji(list.emoji ?? DEFAULT_LIST_EMOJI)
    setDraftRatingEnabled(list.rating_enabled ?? false)
  }

  async function handleSaveName() {
    if (!canRename) {
      closeEdit()
      return
    }
    const next = draftTitle.trim()
    if (!next) return
    const emoji = draftEmoji || DEFAULT_LIST_EMOJI
    const titleChanged = next !== list.title
    const emojiChanged = emoji !== (list.emoji ?? DEFAULT_LIST_EMOJI)
    const ratingChanged = draftRatingEnabled !== (list.rating_enabled ?? false)
    if (!titleChanged && !emojiChanged && !ratingChanged) {
      closeEdit()
      return
    }
    setBusy(true)
    const ok = await updateList(list.id, {
      ...(titleChanged ? { title: next } : {}),
      ...(emojiChanged ? { emoji } : {}),
      ...(ratingChanged ? { rating_enabled: draftRatingEnabled } : {}),
    })
    setBusy(false)
    if (ok) closeEdit()
  }

  async function handleDeleteList(e: MouseEvent) {
    e.stopPropagation()
    setBusy(true)
    await deleteList(list.id)
    setBusy(false)
    setConfirmDelete(false)
  }

  async function handleAbandonList(e: MouseEvent) {
    e.stopPropagation()
    setBusy(true)
    await abandonList(list.id)
    setBusy(false)
    setConfirmAbandon(false)
    setEditing(false)
  }

  async function handleAddItem() {
    const title = newTitle.trim()
    if (!title) return
    setBusy(true)
    setAddError(null)
    const result = await createItem({ list_id: list.id, title })
    setBusy(false)
    if (!result) {
      setAddError('couldn’t add that — try again')
      return
    }
    setNewTitle('')
    setAdding(false)
    setAddError(null)
  }

  async function handleCoverUpload(file: File) {
    const prev = coverPreviewUrl
    const local = URL.createObjectURL(file)
    setCoverPreviewUrl(local)
    setCoverUploading(true)
    setCoverError(null)

    try {
      if (!supabase) throw new Error('offline')
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('not signed in')

      const url = await uploadListCover(user.id, list.id, file)
      const saved = await updateList(list.id, {
        cover_url: url.split('?')[0] ?? url,
      })
      if (!saved) throw new Error('save failed')
      setCoverPreviewUrl(url)
    } catch (err) {
      setCoverPreviewUrl(prev)
      setCoverError(
        err instanceof Error && err.message === 'not signed in'
          ? 'sign in to save photos'
          : 'could not save cover — try again',
      )
    } finally {
      setCoverUploading(false)
      URL.revokeObjectURL(local)
    }
  }

  async function handleCoverRemove() {
    setCoverUploading(true)
    setCoverError(null)
    const ok = await updateList(list.id, { cover_url: null })
    setCoverUploading(false)
    if (!ok) {
      setCoverError('could not remove cover — try again')
      return
    }
    setCoverPreviewUrl(null)
  }

  return (
    <div className="mb-10 pt-4">
      <Scrap
        id={list.id}
        index={0}
        tape
        tapePosition="top-left"
        layout={false}
      >
        <div className="scrap-interactive px-3 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (!editing) setOpen((o) => !o)
              }}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              {editing
                ? listIcon(coverPreviewUrl, draftEmoji)
                : listIcon(list.cover_url ?? null, list.emoji ?? '📋')}
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg text-ink">{list.title}</h3>
                <p className="font-hand text-sm text-ink/50">
                  {list.doneCount} / {list.totalCount} done
                  <span className="text-ink/30">
                    {' '}
                    · {open ? 'close' : 'open'}
                  </span>
                </p>
              </div>
              <ProgressRing
                id={list.id}
                progress={progress}
                ticked={list.doneCount}
                total={list.totalCount}
                size={44}
              />
            </button>

            {!editing && (
              <button
                type="button"
                onClick={openEdit}
                className="shrink-0 font-hand text-sm text-ink/50 underline decoration-dotted hover:text-ink/75"
              >
                edit
              </button>
            )}
          </div>

          {editing && (
            <div className="mt-4 space-y-3 border-t border-ink/10 pt-4 pb-1">
              {canRename ? (
                <>
                  <div>
                    <span className="font-hand text-sm text-ink/45">emoji</span>
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 block text-3xl"
                      aria-label="change list emoji"
                    >
                      {draftEmoji}
                    </button>
                    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                      <ListEmojiPicker
                        value={draftEmoji}
                        onChange={setDraftEmoji}
                      />
                    </div>
                  </div>
                  <label className="block">
                    <span className="font-hand text-sm text-ink/45">list name</span>
                    <input
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void handleSaveName()
                        if (e.key === 'Escape') closeEdit()
                      }}
                      disabled={busy}
                      className="mt-1 w-full border-0 border-b border-ink/30 bg-transparent py-1 font-serif text-lg text-ink outline-none"
                    />
                  </label>
                  <ListCoverPicker
                    coverUrl={coverPreviewUrl}
                    onFile={(file) => void handleCoverUpload(file)}
                    onRemove={() => void handleCoverRemove()}
                    uploading={coverUploading}
                    disabled={busy}
                  />
                  {coverError && (
                    <p className="font-hand text-sm text-rose-deep">{coverError}</p>
                  )}
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={draftRatingEnabled}
                      onChange={(e) => setDraftRatingEnabled(e.target.checked)}
                      disabled={busy}
                      onClick={(e) => e.stopPropagation()}
                      className="size-4 accent-ochre"
                    />
                    <span className="font-hand text-sm text-ink/55">
                      rate items with stars when done
                    </span>
                  </label>
                </>
              ) : (
                <p className="font-hand text-sm text-ink/45">
                  this is a catalogue list — you can hide it, but not rename it.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-hand text-sm text-ink/50">
                {canRename && (
                  <button
                    type="button"
                    disabled={busy || !draftTitle.trim()}
                    onClick={() => void handleSaveName()}
                    className="underline decoration-dotted disabled:opacity-40"
                  >
                    save
                  </button>
                )}
                <button
                  type="button"
                  disabled={busy}
                  onClick={closeEdit}
                  className="underline decoration-dotted"
                >
                  done
                </button>

                {confirmAbandon ? (
                  <>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={(e) => void handleAbandonList(e)}
                      className="underline decoration-dotted"
                    >
                      yes, to the sea
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmAbandon(false)}
                      className="underline decoration-dotted"
                    >
                      keep list
                    </button>
                  </>
                ) : confirmDelete ? (
                  <>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={(e) => void handleDeleteList(e)}
                      className="text-stamp/80 underline decoration-dotted"
                    >
                      {list.is_seeded ? 'yes, delete forever' : 'yes, delete list'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="underline decoration-dotted"
                    >
                      keep list
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmAbandon(true)
                        setConfirmDelete(false)
                      }}
                      className="underline decoration-dotted"
                    >
                      abandon list
                    </button>
                    <DeleteIconButton
                      label="Delete list"
                      onClick={() => {
                        setConfirmDelete(true)
                        setConfirmAbandon(false)
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {open && !editing && (
            <div className="mt-3 max-h-[min(40vh,320px)] overflow-y-auto border-t border-ink/10 pt-2">
              {openItems.length > 0 ? (
                <ul className="space-y-1">
                  {openItems.map((item) => (
                    <ListItemRow key={item.id} item={item} />
                  ))}
                </ul>
              ) : (
                <p className="py-2 font-hand text-sm text-ink/40">
                  nothing left here — nice work.
                </p>
              )}

              {doneItems.length > 0 && (
                <details
                  className="completed-items-collapsible mt-4 border-t border-ink/10 pt-2"
                  open={completedExpanded}
                  onToggle={(e) => setCompletedExpanded(e.currentTarget.open)}
                >
                  <summary
                    className="cursor-pointer font-hand text-sm text-ink/45 select-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    completed · {doneItems.length}
                  </summary>
                  <ul className="mt-2 space-y-1">
                    {doneItems.map((item) => (
                      <ListItemRow key={item.id} item={item} />
                    ))}
                  </ul>
                </details>
              )}

              {adding ? (
                <div
                  className="mt-3 space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value)
                      if (addError) setAddError(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void handleAddItem()
                      if (e.key === 'Escape') {
                        setAdding(false)
                        setNewTitle('')
                        setAddError(null)
                      }
                    }}
                    placeholder="what do you want to add?"
                    autoFocus
                    disabled={busy}
                    className="w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-lg text-ink outline-none"
                  />
                  {addError && (
                    <p className="font-hand text-sm text-stamp/80">{addError}</p>
                  )}
                  <div className="flex gap-3 font-hand text-sm text-ink/45">
                    <button
                      type="button"
                      disabled={busy || !newTitle.trim()}
                      onClick={(e) => {
                        e.stopPropagation()
                        void handleAddItem()
                      }}
                      className="underline decoration-dotted disabled:opacity-40"
                    >
                      {busy ? 'adding…' : 'add'}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setAdding(false)
                        setNewTitle('')
                        setAddError(null)
                      }}
                      className="underline decoration-dotted"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAdding(true)
                  }}
                  className="mt-2 font-hand text-sm text-ink/50 underline decoration-dotted"
                >
                  ＋ add something
                </button>
              )}
            </div>
          )}
        </div>
      </Scrap>
    </div>
  )
}
