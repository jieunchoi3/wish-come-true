import { useState } from 'react'
import { ListAccordion } from '../components/lists/ListAccordion'
import { useLists } from '../hooks/useLists'
import { RubberStampButton } from '../components/wishes/WishUi'

export function ListsLeftPage() {
  return (
    <div className="flex h-full flex-col justify-center">
      <h1
        className="font-hand text-3xl text-ink/75"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        your lists
      </h1>
      <p className="mt-3 font-hand text-xl text-ink/50">
        tick things off as you go. add your own whenever something catches you.
      </p>
    </div>
  )
}

export function ListsRightPage() {
  const { lists, loading, createList } = useLists()
  const [newListOpen, setNewListOpen] = useState(false)

  const userLists = lists.filter((l) => !l.is_seeded)
  const seededLists = lists.filter((l) => l.is_seeded)

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-hand text-lg text-ink/30">loading lists…</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-8">
      {userLists.map((list) => (
        <ListAccordion key={list.id} list={list} />
      ))}

      {seededLists.length > 0 && (
        <>
          <p
            className="my-4 font-hand text-lg text-ink/35"
            style={{ transform: 'rotate(-0.3deg)' }}
          >
            lists to browse
          </p>
          {seededLists.map((list) => (
            <ListAccordion key={list.id} list={list} />
          ))}
        </>
      )}

      <div className="mt-6">
        <RubberStampButton
          label="＋ new list"
          rotation={1}
          onClick={() => setNewListOpen(true)}
        />
      </div>

      {newListOpen && (
        <NewListForm
          onClose={() => setNewListOpen(false)}
          onCreate={async (title) => {
            await createList(title)
            setNewListOpen(false)
          }}
        />
      )}
    </div>
  )
}

function NewListForm({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (title: string) => Promise<void>
}) {
  const [title, setTitle] = useState('')
  return (
    <div className="mt-4 border-t border-ink/10 pt-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="list name"
        className="w-full border-0 border-b border-ink/25 bg-transparent py-1 font-hand text-2xl text-ink outline-none"
      />
      <div className="mt-4 flex gap-3">
        <RubberStampButton
          label="create"
          onClick={() => title.trim() && onCreate(title.trim())}
        />
        <button type="button" onClick={onClose} className="font-hand text-ink/40">
          cancel
        </button>
      </div>
    </div>
  )
}
