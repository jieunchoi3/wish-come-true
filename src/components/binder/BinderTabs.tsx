export type BinderTabId = 'month' | 'today' | 'lists' | 'memories'

interface BinderTab {
  id: BinderTabId
  label: string
  color: string
}

export const BINDER_TABS: BinderTab[] = [
  { id: 'month', label: 'this month', color: '#D4C4B8' },
  { id: 'today', label: 'today', color: '#A8B5A2' },
  { id: 'lists', label: 'lists', color: '#D9A85F' },
  { id: 'memories', label: 'memories', color: '#B5C4C0' },
]

interface BinderTabsProps {
  activeTab: BinderTabId
  onTabChange: (tab: BinderTabId) => void
  layout: 'vertical' | 'horizontal'
}

export function BinderTabs({ activeTab, onTabChange, layout }: BinderTabsProps) {
  if (layout === 'horizontal') {
    return (
      <nav
        className="relative z-20 flex justify-center gap-2 px-4 py-3"
        aria-label="Sections"
      >
        {BINDER_TABS.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="font-hand text-lg transition-all duration-200"
              style={{
                backgroundColor: tab.color,
                opacity: isActive ? 1 : 0.8,
                color: '#2B2A27',
                padding: '6px 16px',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isActive
                  ? '1px 2px 4px rgba(43,42,39,0.12)'
                  : '0 1px 2px rgba(43,42,39,0.08)',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    )
  }

  return (
    <nav
      className="absolute -right-[52px] top-[18%] z-40 flex flex-col gap-2.5"
      aria-label="Sections"
    >
      {BINDER_TABS.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="font-hand text-lg transition-all duration-200"
            style={{
              backgroundColor: tab.color,
              opacity: isActive ? 1 : 0.8,
              color: '#2B2A27',
              padding: '10px 8px',
              minWidth: 44,
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: isActive ? 'translateX(6px)' : 'translateX(0)',
              boxShadow: isActive
                ? '2px 2px 6px rgba(43,42,39,0.14)'
                : 'inset -1px 0 2px rgba(43,42,39,0.1), 1px 1px 3px rgba(43,42,39,0.08)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
