interface TrashBinIconProps {
  size?: number
  className?: string
}

export function TrashBinIcon({ size = 16, className }: TrashBinIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9L18 7" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  )
}

interface DeleteIconButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
  className?: string
  size?: number
}

export function DeleteIconButton({
  onClick,
  disabled,
  label = 'Delete',
  className = '',
  size = 16,
}: DeleteIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`delete-icon-btn ${className}`.trim()}
    >
      <TrashBinIcon size={size} />
    </button>
  )
}
