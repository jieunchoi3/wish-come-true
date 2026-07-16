import { useLists } from '../../hooks/useLists'
import type { ListItemView } from '../../types/database'

interface CommitActionProps {
  item: ListItemView
  rotation?: number
  className?: string
  variant?: 'primary' | 'inline'
}

export function CommitAction({
  item,
  rotation = 0,
  className = '',
  variant = 'inline',
}: CommitActionProps) {
  const { commitItem, uncommitItem } = useLists()
  const isCommitted = item.status === 'committed'

  if (item.status === 'done') return null

  const styleClass =
    variant === 'primary'
      ? 'list-item-action-primary'
      : 'font-hand text-sm text-ink/40 underline decoration-dotted decoration-ink/15 transition-colors hover:text-ink/65'

  return (
    <button
      type="button"
      onClick={() => void (isCommitted ? uncommitItem(item) : commitItem(item))}
      className={`${styleClass} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {isCommitted ? 'remove from this month' : 'add to this month'}
    </button>
  )
}
