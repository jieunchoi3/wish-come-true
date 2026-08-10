interface StarRatingProps {
  value: number | null
  onChange?: (value: number | null) => void
  max?: number
  size?: 'sm' | 'md'
  className?: string
  /** Shown above stars when interactive */
  label?: string
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  className = '',
  label,
}: StarRatingProps) {
  const interactive = Boolean(onChange)
  const sizeClass = size === 'sm' ? 'text-[0.7rem] gap-px' : 'text-xl gap-0.5'

  return (
    <div className={className}>
      {label && (
        <span className="mb-1.5 block font-hand text-lg text-ink/50">{label}</span>
      )}
      <div
        className={`inline-flex items-center ${sizeClass}`}
        role={interactive ? 'group' : undefined}
        aria-label={value ? `${value} out of ${max} stars` : 'no rating'}
      >
        {Array.from({ length: max }, (_, index) => {
          const star = index + 1
          const filled = value != null && star <= value

          if (!interactive) {
            return (
              <span
                key={star}
                className={filled ? 'text-ochre' : 'text-ink/15'}
                aria-hidden
              >
                {filled ? '★' : '☆'}
              </span>
            )
          }

          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star === 1 ? '' : 's'}`}
              aria-pressed={filled}
              onClick={() => onChange?.(value === star ? null : star)}
              className={`leading-none transition-colors ${
                filled ? 'text-ochre' : 'text-ink/25 hover:text-ochre/70'
              }`}
            >
              {filled ? '★' : '☆'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
