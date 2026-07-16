import { useEffect, useState, type ReactNode } from 'react'
import { DESK_COLOR, PAGE_GRAIN } from '../../lib/binder'
import { BinderPage } from './BinderPage'
import { BinderRings } from './BinderRings'
import { BinderTabs, type BinderTabId } from './BinderTabs'

export interface BinderSpreadContent {
  left: ReactNode
  right: ReactNode
}

interface BinderProps {
  activeTab: BinderTabId
  onTabChange: (tab: BinderTabId) => void
  renderSpread: (tab: BinderTabId) => BinderSpreadContent
}

export function Binder({ activeTab, onTabChange, renderSpread }: BinderProps) {
  const [displayedTab, setDisplayedTab] = useState(activeTab)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (activeTab === displayedTab) return

    setVisible(false)
    const timer = window.setTimeout(() => {
      setDisplayedTab(activeTab)
      setVisible(true)
    }, 280)
    return () => clearTimeout(timer)
  }, [activeTab, displayedTab])

  const { left, right } = renderSpread(displayedTab)

  const spreadStyle = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translateX(0) rotate(0deg)'
      : 'translateX(24px) rotate(1.5deg)',
    transition: 'opacity 280ms ease-out, transform 280ms ease-out',
  }

  return (
    <div
      className="binder-desk flex h-screen w-full items-center justify-center overflow-hidden p-4 lg:p-8"
      style={{ backgroundColor: DESK_COLOR }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: PAGE_GRAIN,
          backgroundSize: '220px 220px',
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />

      <div className="binder-shell relative">
        <div
          className="pointer-events-none absolute -inset-4 rounded-sm"
          style={{
            boxShadow:
              '0 28px 60px -12px rgba(43,42,39,0.22), 0 12px 24px -8px rgba(43,42,39,0.1)',
          }}
          aria-hidden
        />

        {/* Desktop spread */}
        <div className="binder-spread relative hidden h-full lg:flex">
          {/* Back wire halves — behind pages */}
          <BinderRings orientation="vertical" layer="back" />

          <div className="relative z-10 flex h-full w-full" style={spreadStyle}>
            <BinderPage side="left">{left}</BinderPage>
            <div
              className="relative z-20 w-0 shrink-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(43,42,39,0.06) 0%, rgba(43,42,39,0.14) 50%, rgba(43,42,39,0.06) 100%)',
                boxShadow:
                  'inset 5px 0 14px -3px rgba(43,42,39,0.22), inset -5px 0 14px -3px rgba(43,42,39,0.22)',
              }}
              aria-hidden
            />
            <BinderPage side="right">{right}</BinderPage>
          </div>

          {/* Front wire halves — on top of pages */}
          <BinderRings orientation="vertical" layer="front" />
          <BinderTabs
            activeTab={activeTab}
            onTabChange={onTabChange}
            layout="vertical"
          />
        </div>

        {/* Mobile single page */}
        <div className="binder-mobile relative flex h-full flex-col lg:hidden">
          <div className="relative shrink-0 pt-12">
            <BinderRings orientation="horizontal" layer="back" />
            <BinderRings orientation="horizontal" layer="front" />
          </div>
          <BinderTabs
            activeTab={activeTab}
            onTabChange={onTabChange}
            layout="horizontal"
          />
          <div className="min-h-0 flex-1 overflow-y-auto" style={spreadStyle}>
            <BinderPage side="single">
              {displayedTab === 'lists' ? (
                right
              ) : (
                <>
                  {left}
                  <div className="my-6 h-px bg-ink/10" aria-hidden />
                  {right}
                </>
              )}
            </BinderPage>
          </div>
        </div>
      </div>
    </div>
  )
}
