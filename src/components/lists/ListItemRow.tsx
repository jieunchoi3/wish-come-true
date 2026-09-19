import { useEffect, useState } from 'react'
import { COMPLETION_ACTION_LABEL } from '../../constants/completion'
import type { ListItemView } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { isFocusedThisMonth } from '../../lib/committedMonth'
import { saveItemReferencePhoto } from '../../lib/itemReferencePhoto'
import { StarRating } from './StarRating'
import { RubberStampButton } from '../wishes/WishUi'
import { CommitAction } from './CommitAction'
import { ItemCompleteSheet } from './ItemCompleteSheet'
import { ItemReferencePicker } from './ItemReferencePicker'
import { DeleteIconButton } from '../primitives/DeleteIconButton'

interface ListItemRowProps {
  item: ListItemView
}

export function ListItemRow({ item }: ListItemRowProps) {
  const { undoDone, deleteItem, abandonItem, updateItem } = useLists()
  const [completing, setCompleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmAbandon, setConfirmAbandon] = useState(false)
  const [editing, setEditing] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [draftTitle, setDraftTitle] = useState(item.title)
  const [draftNote, setDraftNote] = useState(item.note ?? '')
  const [draftImageUrl, setDraftImageUrl] = useState<string | null>(
    item.image_url ?? null,
  )
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (editing || photoOpen) return
    setDraftTitle(item.title)
    setDraftNote(item.note ?? '')
    setDraftImageUrl(item.image_url ?? null)
    setPendingImageFile(null)
    setRemoveImage(false)
  }, [item, editing, photoOpen])

  function resetPhotoDraft() {
    setDraftImageUrl(item.image_url ?? null)
    setPendingImageFile(null)
    setRemoveImage(false)
  }

  function openPhotoPanel() {
    setEditing(false)
    setConfirmDelete(false)
    setConfirmAbandon(false)
    resetPhotoDraft()
    setPhotoOpen(true)
  }

  const isDone = item.status === 'done'
  const opacity = isDone ? 0.55 : 1
  const canEdit = !item.is_seeded

  function handleDidIt() {
    setCompleting(true)
  }

  async function handleDelete() {
    setBusy(true)
    await deleteItem(item.id)
    setBusy(false)
    setConfirmDelete(false)
  }

  async function handleAbandon() {
    setBusy(true)
    await abandonItem(item.id)
    setBusy(false)
    setConfirmAbandon(false)
  }

  function handleReferenceFile(file: File) {
    setPendingImageFile(file)
    setRemoveImage(false)
    setDraftImageUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  function handleRemoveReference() {
    setPendingImageFile(null)
    setRemoveImage(true)
    setDraftImageUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      return null
    })
  }

  async function resolveReferenceImageUrl(): Promise<string | null | undefined> {
    if (!removeImage && !pendingImageFile) return undefined
    if (removeImage) return null
    setImageUploading(true)
    try {
      return await saveItemReferencePhoto(item.id, pendingImageFile!)
    } catch {
      return undefined
    } finally {
      setImageUploading(false)
    }
  }

  async function handleSavePhotoOnly() {
    setBusy(true)
    const imageUrl = await resolveReferenceImageUrl()
    if (imageUrl === undefined) {
      setBusy(false)
      return
    }
    const ok = await updateItem(
      item.id,
      { image_url: imageUrl },
      item.is_seeded,
    )
    setBusy(false)
    if (ok) {
      setPhotoOpen(false)
      setPendingImageFile(null)
      setRemoveImage(false)
    }
  }

  async function handleSaveEdit() {
    const title = draftTitle.trim()
    if (!title) return
    setBusy(true)

    const imageUrl = await resolveReferenceImageUrl()
    if (imageUrl === undefined) {
      setBusy(false)
      return
    }

    await updateItem(
      item.id,
      {
        title,
        note: draftNote.trim() || null,
        ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
      },
      item.is_seeded,
    )
    setBusy(false)
    setEditing(false)
  }

  return (
    <>
      <li
        className="list-item-card border-b border-ink/8"
        style={{ opacity }}
      >
        <div className="list-item-card__inner">
          {editing ? (
            <div className="space-y-3 leading-[1.6]">
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="w-full border-0 border-b border-ink/30 bg-transparent font-serif text-base text-ink outline-none"
                autoFocus
              />
              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={3}
                placeholder="note (optional)"
                className="w-full resize-none border-0 bg-transparent font-hand text-sm text-ink/70 outline-none"
              />
              <ItemReferencePicker
                imageUrl={draftImageUrl}
                onFile={handleReferenceFile}
                onRemove={draftImageUrl ? handleRemoveReference : undefined}
                uploading={imageUploading}
                disabled={busy}
              />
              <div className="flex gap-5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleSaveEdit()}
                  className="list-item-action-primary"
                >
                  save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false)
                    setDraftTitle(item.title)
                    setDraftNote(item.note ?? '')
                    setDraftImageUrl(item.image_url ?? null)
                    setPendingImageFile(null)
                    setRemoveImage(false)
                  }}
                  className="list-item-action-secondary"
                >
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="list-item-tier-content">
                <p
                  className={`list-item-title${
                    isFocusedThisMonth(item) ? ' list-item-title--committed' : ''
                  }`}
                >
                  {item.title}
                </p>
                {item.note && (
                  <p className="list-item-note">{item.note}</p>
                )}
                {item.image_url && !photoOpen && (
                  <img
                    src={item.image_url}
                    alt=""
                    className="mt-2 max-h-28 max-w-[160px] rounded border border-ink/10 object-cover"
                  />
                )}
                {photoOpen && canEdit && (
                  <div
                    className="mt-3 scrap-interactive"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ItemReferencePicker
                      imageUrl={draftImageUrl}
                      onFile={handleReferenceFile}
                      onRemove={draftImageUrl ? handleRemoveReference : undefined}
                      uploading={imageUploading}
                      disabled={busy}
                    />
                    <div className="mt-2 flex gap-5">
                      <button
                        type="button"
                        disabled={busy || imageUploading}
                        onClick={() => void handleSavePhotoOnly()}
                        className="list-item-action-primary"
                      >
                        save photo
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          resetPhotoDraft()
                          setPhotoOpen(false)
                        }}
                        className="list-item-action-secondary"
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                )}
                {isDone && item.rating != null && (
                  <StarRating value={item.rating} size="sm" className="mt-1" />
                )}
              </div>

              <div className="list-item-tier-actions scrap-interactive">
                <div className="list-item-actions-row">
                  {!isDone && (
                    <CommitAction item={item} rotation={-0.3} />
                  )}
                  {isDone && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void undoDone(item)}
                      className="list-item-action-secondary"
                    >
                      undo
                    </button>
                  )}
                  {canEdit && !isDone && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          photoOpen ? setPhotoOpen(false) : openPhotoPanel()
                        }
                        className="list-item-action-secondary"
                      >
                        {photoOpen
                          ? 'hide photo'
                          : item.image_url
                            ? 'change photo'
                            : 'add photo'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoOpen(false)
                          setDraftTitle(item.title)
                          setDraftNote(item.note ?? '')
                          resetPhotoDraft()
                          setEditing(true)
                          setConfirmDelete(false)
                          setConfirmAbandon(false)
                        }}
                        className="list-item-action-secondary"
                      >
                        edit
                      </button>
                    </>
                  )}
                  {confirmAbandon ? (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleAbandon()}
                        className="list-item-action-secondary"
                      >
                        yes, to the sea
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmAbandon(false)}
                        className="list-item-action-secondary"
                      >
                        keep
                      </button>
                    </>
                  ) : confirmDelete ? (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete()}
                        className="list-item-action-secondary list-item-action-remove"
                      >
                        yes, delete forever
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(false)}
                        className="list-item-action-secondary"
                      >
                        keep
                      </button>
                    </>
                  ) : (
                    !isDone && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmAbandon(true)
                            setConfirmDelete(false)
                          }}
                          className="list-item-action-secondary"
                        >
                          abandon
                        </button>
                        <DeleteIconButton
                          label="Delete"
                          onClick={() => {
                            setConfirmDelete(true)
                            setConfirmAbandon(false)
                          }}
                        />
                      </>
                    )
                  )}
                </div>

                {!isDone && (
                  <RubberStampButton
                    label={COMPLETION_ACTION_LABEL}
                    onClick={() => void handleDidIt()}
                    rotation={-2}
                  />
                )}
                {isDone && (
                  <span
                    className="memory-done-stamp list-item-done-badge"
                    aria-label={COMPLETION_ACTION_LABEL}
                  >
                    done
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </li>
      {completing && (
        <ItemCompleteSheet
          item={item}
          onClose={() => setCompleting(false)}
        />
      )}
    </>
  )
}
