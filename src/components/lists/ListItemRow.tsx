import { useState } from 'react'
import { COMPLETION_ACTION_LABEL } from '../../constants/completion'
import type { ListItemView } from '../../types/database'
import { useLists } from '../../hooks/useLists'
import { isFocusedThisMonth } from '../../lib/committedMonth'
import { StarRating } from './StarRating'
import { RubberStampButton } from '../wishes/WishUi'
import { CommitAction } from './CommitAction'
import { ItemCompleteSheet } from './ItemCompleteSheet'

interface ListItemRowProps {
  item: ListItemView
}

export function ListItemRow({ item }: ListItemRowProps) {
  const { undoDone, deleteItem, updateItem } = useLists()
  const [completing, setCompleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(item.title)
  const [draftNote, setDraftNote] = useState(item.note ?? '')
  const [busy, setBusy] = useState(false)

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
  }

  async function handleSaveEdit() {
    const title = draftTitle.trim()
    if (!title) return
    setBusy(true)
    await updateItem(
      item.id,
      {
        title,
        note: draftNote.trim() || null,
      },
      false,
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
                rows={2}
                placeholder="note (optional)"
                className="w-full resize-none border-0 bg-transparent font-hand text-sm text-ink/70 outline-none"
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
                    <button
                      type="button"
                      onClick={() => {
                        setDraftTitle(item.title)
                        setDraftNote(item.note ?? '')
                        setEditing(true)
                        setConfirmDelete(false)
                      }}
                      className="list-item-action-secondary"
                    >
                      edit
                    </button>
                  )}
                  {confirmDelete ? (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete()}
                        className="list-item-action-secondary list-item-action-remove"
                      >
                        yes, remove
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
                    canEdit &&
                    !isDone && (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="list-item-action-secondary list-item-action-remove"
                      >
                        remove
                      </button>
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
