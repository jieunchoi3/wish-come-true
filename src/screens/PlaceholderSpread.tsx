import type { BinderTabId } from '../components/binder'

interface PlaceholderSpreadProps {
  tab: BinderTabId
}

export function PlaceholderLeftPage({ tab }: PlaceholderSpreadProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <p
        className="font-hand text-3xl text-ink/25"
        style={{ transform: 'rotate(-2deg)' }}
      >
        {tab} — coming soon
      </p>
    </div>
  )
}

export function PlaceholderRightPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <p
        className="font-hand text-2xl text-ink/15"
        style={{ transform: 'rotate(1deg)' }}
        aria-hidden
      >
        ···
      </p>
    </div>
  )
}
