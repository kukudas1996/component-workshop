import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { ButtonPage } from './pages/button/ButtonPage'

// ============================================================
// Types
// ============================================================

interface ComponentMeta {
  id: string
  name: string
  description: string
  category: string
  Page: React.ComponentType
}

// ============================================================
// Component Registry
// 새 컴포넌트 추가:
//   1. src/components/{category}/{Name}.tsx 생성
//   2. src/pages/{category}/{Name}Page.tsx 생성
//   3. 아래 COMPONENTS 배열에 항목 추가
// ============================================================

const COMPONENTS: ComponentMeta[] = [
  {
    id: 'button',
    name: 'Button',
    description: '사용자의 액션을 트리거하는 가장 기본적인 인터랙션 요소입니다. Primary, Secondary, Outline, Ghost 4가지 변형을 제공합니다.',
    category: 'Button',
    Page: ButtonPage,
  },
  // {
  //   id: 'icon-button',
  //   name: 'Icon Button',
  //   description: '...',
  //   category: 'Button',
  //   Page: IconButtonPage,
  // },
  // {
  //   id: 'toggle',
  //   name: 'Toggle',
  //   description: '...',
  //   category: 'Control',
  //   Page: TogglePage,
  // },
]

// ============================================================
// Layout Constants
// ============================================================

const NAV_HEIGHT = 56
const SIDEBAR_WIDTH = 240
const PAGE_MAX_WIDTH = 1200

// ============================================================
// TopNav
// ============================================================

function TopNav({
  search,
  onSearchChange,
}: {
  search: string
  onSearchChange: (v: string) => void
}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-[var(--color-neutral-100)]"
      style={{ height: NAV_HEIGHT }}
    >
      <div
        className="flex items-center h-full mx-auto px-6"
        style={{ maxWidth: PAGE_MAX_WIDTH }}
      >
        <div style={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
          <img src="/logo-blue.svg" alt="Bankcow" style={{ width: '120px' }} />
        </div>

        <div className="flex-1" />

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-neutral-400)' }}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="컴포넌트 검색"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              paddingLeft: '36px',
              paddingRight: '14px',
              height: '36px',
              width: '220px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-neutral-200)',
              fontSize: '14px',
              outline: 'none',
              color: 'var(--color-neutral-900)',
              backgroundColor: 'var(--color-neutral-050)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--color-bankcow-blue)'
              e.currentTarget.style.backgroundColor = '#fff'
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'var(--color-neutral-200)'
              e.currentTarget.style.backgroundColor = 'var(--color-neutral-050)'
            }}
          />
        </div>
      </div>
    </header>
  )
}

// ============================================================
// Sidebar
// ============================================================

function Sidebar({ components }: { components: ComponentMeta[] }) {
  // 카테고리별 그룹핑
  const grouped = components.reduce<Record<string, ComponentMeta[]>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  return (
    <aside
      className="overflow-y-auto bg-white border-r border-[var(--color-neutral-100)] shrink-0"
      style={{
        width: SIDEBAR_WIDTH,
        position: 'sticky',
        top: NAV_HEIGHT,
        height: `calc(100vh - ${NAV_HEIGHT}px)`,
        alignSelf: 'flex-start',
      }}
    >
      <div className="py-5 px-4">
        {components.length === 0 ? (
          <p
            className="px-3 py-2"
            style={{ fontSize: '13px', color: 'var(--color-neutral-400)' }}
          >
            검색 결과 없음
          </p>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-4">
              <p
                className="px-3 mb-1"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-neutral-400)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </p>
              <ul>
                {items.map(c => (
                  <li key={c.id}>
                    <NavLink
                      to={`/${c.id}`}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '7px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive
                          ? 'var(--color-bankcow-blue)'
                          : 'var(--color-neutral-700)',
                        backgroundColor: isActive
                          ? 'var(--color-primary-050)'
                          : 'transparent',
                        textDecoration: 'none',
                        transition: 'background-color 0.1s, color 0.1s',
                      })}
                    >
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

// ============================================================
// ComponentLayout
// ============================================================

function ComponentLayout({ meta }: { meta: ComponentMeta }) {
  return (
    <div className="py-12 px-12">
      <div className="mb-10">
        <h1
          className="mb-2"
          style={{
            fontSize: 'var(--font-headline32-bold-size)',
            lineHeight: 'var(--font-headline32-bold-line-height)',
            fontWeight: 'var(--font-headline32-bold-weight)',
            color: 'var(--color-neutral-900)',
          }}
        >
          {meta.name}
        </h1>
        <p
          style={{
            fontSize: 'var(--font-body17-regular-size)',
            lineHeight: 'var(--font-body17-regular-line-height)',
            fontWeight: 'var(--font-body17-regular-weight)',
            color: 'var(--color-neutral-600)',
          }}
        >
          {meta.description}
        </p>
      </div>

      <meta.Page />
    </div>
  )
}

// ============================================================
// Layout
// ============================================================

function Layout() {
  const [search, setSearch] = useState('')

  const filtered = COMPONENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <TopNav search={search} onSearchChange={setSearch} />

      <div style={{ paddingTop: NAV_HEIGHT }}>
        <div className="flex mx-auto" style={{ maxWidth: PAGE_MAX_WIDTH }}>
          <Sidebar components={filtered} />
          <main className="flex-1 min-w-0 bg-white">
            <Routes>
              <Route path="/" element={<Navigate to={`/${COMPONENTS[0].id}`} replace />} />
              {COMPONENTS.map(c => (
                <Route
                  key={c.id}
                  path={`/${c.id}`}
                  element={<ComponentLayout meta={c} />}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

// ============================================================
// App
// ============================================================

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
