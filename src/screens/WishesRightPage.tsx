import { ScrapCollage } from '../components/ScrapCollage'
import { WishCard } from '../components/wishes/WishCard'
import { WishDetailSheet } from '../components/wishes/WishDetailSheet'
import { WishFormSheet } from '../components/wishes/WishFormSheet'
import { HandwrittenError } from '../components/wishes/WishUi'
import { filterWishesForBoard } from '../lib/wishQueries'
import { useWishes } from '../hooks/useWishes'
import { useWishesTab } from './wishesTabState'

export function WishesRightPage() {
  const { wishes, loading, error, clearError } = useWishes()
  const { filters, sheet, selectedWish, openDetail, closeSheet, openEdit } =
    useWishesTab()

  const filtered = filterWishesForBoard(wishes, filters)
  const doneCount = wishes.filter((w) => w.status === 'done').length

  const allTags = [
    ...new Set(wishes.flatMap((w) => w.topic_tags)),
  ]

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {error && (
        <div className="mb-2 shrink-0" onClick={clearError}>
          <HandwrittenError message={error} />
        </div>
      )}

      <div
        className={`wishes-scroll min-h-0 flex-1 transition-opacity duration-500 ${
          loading ? 'opacity-40' : 'opacity-100'
        }`}
      >
        {filtered.length === 0 && !loading ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-hand text-2xl text-ink/45">
              nothing here yet. what have you been meaning to do?
            </p>
          </div>
        ) : (
          <ScrapCollage className="pb-8">
            {filtered.map((wish, index) => (
              <WishCard
                key={wish.id}
                wish={wish}
                index={index}
                onClick={() => openDetail(wish)}
              />
            ))}
          </ScrapCollage>
        )}
      </div>

      {doneCount > 0 && (
        <p className="mt-2 shrink-0 font-hand text-sm text-ink/40">
          {doneCount} already done →
        </p>
      )}

      {sheet === 'add' && (
        <WishFormSheet
          existingTags={allTags}
          onClose={closeSheet}
          onSaved={closeSheet}
        />
      )}
      {sheet === 'edit' && selectedWish && (
        <WishFormSheet
          wish={selectedWish}
          existingTags={allTags}
          onClose={closeSheet}
          onSaved={closeSheet}
        />
      )}
      {sheet === 'detail' && selectedWish && (
        <WishDetailSheet
          wish={selectedWish}
          onClose={closeSheet}
          onEdit={() => openEdit(selectedWish)}
          onDeleted={closeSheet}
        />
      )}
    </div>
  )
}
