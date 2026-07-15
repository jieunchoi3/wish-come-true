interface NamePlateProps {
  name: string
  onNameChange: (name: string) => void
}

export function NamePlate({ name, onNameChange }: NamePlateProps) {
  return (
    <div
      className="absolute left-1/2 top-[28%] z-20 w-[58%] -translate-x-1/2"
      style={{
        boxShadow:
          'inset 2px 3px 8px rgba(43,42,39,0.18), inset -1px -1px 4px rgba(255,255,255,0.15)',
        borderRadius: '3px',
        padding: '14px 16px 18px',
        background: 'linear-gradient(180deg, #ebe5d8 0%, #e3dccf 100%)',
      }}
    >
      {/* Cream paper card inside recess */}
      <div
        className="relative px-3 py-4"
        style={{
          backgroundColor: '#FAF6EF',
          boxShadow: 'inset 0 1px 3px rgba(43,42,39,0.06)',
        }}
      >
        <p className="font-hand text-base text-ink/55">this book belongs to</p>
        <div className="relative mt-3">
          <div className="h-px bg-ink/30" aria-hidden />
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full border-0 bg-transparent pt-1 font-hand text-2xl text-ink outline-none"
            autoComplete="given-name"
            aria-label="Your name"
          />
        </div>
      </div>
    </div>
  )
}
