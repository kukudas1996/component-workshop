import { useState } from 'react'
import { ChevronLeft, Bell } from 'lucide-react'

// ── Action Button (우측 아이콘 버튼) ────────────────────────────
// 48×48 터치 타겟 / 프레스 시 bg-neutral-050 + inner 36px로 축소

function ActionButton({
  icon,
  onClick,
  showDot = false,
}: {
  icon: React.ReactNode
  onClick?: () => void
  showDot?: boolean
}) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        flexShrink: 0,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: pressed ? '36px' : '48px',
          height: pressed ? '36px' : '48px',
          borderRadius: '12px',
          backgroundColor: pressed ? 'var(--color-neutral-050)' : 'transparent',
          transition: 'width 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.1s ease',
          flexShrink: 0,
          color: 'var(--color-neutral-900)',
        }}
      >
        <div style={{
          width: pressed ? '20px' : '24px',
          height: pressed ? '20px' : '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.12s, height 0.12s',
          flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>

      {showDot && (
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-500)',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  )
}

// ── Back Button (좌측 뒤로가기) ─────────────────────────────────
// 48×48 터치 타겟 / pl-12 / ChevronLeft 아이콘

function BackButton({ onClick }: { onClick?: () => void }) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '48px',
        height: '48px',
        padding: '0 0 0 12px',
        flexShrink: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        color: pressed ? 'var(--color-neutral-400)' : 'var(--color-neutral-900)',
        transition: 'color 0.1s ease',
      }}
    >
      <ChevronLeft size={24} strokeWidth={2.2} />
    </button>
  )
}

// ── AppBar ──────────────────────────────────────────────────────

export type AppBarType = 'home' | 'detail'

export interface AppBarRightIcon {
  icon: React.ReactNode
  onClick?: () => void
  showDot?: boolean
}

export interface AppBarProps {
  /** home: 뒤로가기 없음 + 우측 알림 고정 / detail: 뒤로가기 + 커스텀 우측 아이콘 */
  type?: AppBarType
  /** 네비게이션 바 중앙 타이틀 텍스트 */
  title?: string
  /** 타이틀 표시 여부 (기본 false) */
  showTitle?: boolean
  /** 뒤로가기 버튼 클릭 콜백 (detail 타입) */
  onBack?: () => void
  /** 알림 아이콘 뱃지 표시 (home 타입) */
  notiBadge?: boolean
  /** 알림 아이콘 클릭 콜백 (home 타입) */
  onNotiClick?: () => void
  /** 우측 커스텀 아이콘 목록, 최대 2개 (detail 타입) */
  rightIcons?: AppBarRightIcon[]
}

export function AppBar({
  type = 'home',
  title,
  showTitle = false,
  onBack,
  notiBadge = false,
  onNotiClick,
  rightIcons = [],
}: AppBarProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '48px',
        backgroundColor: 'var(--color-neutral-000)',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
        // home: right-aligned / detail: both sides
        ...(type === 'home'
          ? { paddingLeft: '20px', paddingRight: '6px', justifyContent: 'flex-end' }
          : { paddingLeft: '8px', paddingRight: '8px' }),
      }}
    >
      {/* ── home (1depth) ── */}
      {type === 'home' && (
        <ActionButton
          icon={<Bell size={24} fill="currentColor" strokeWidth={0} />}
          onClick={onNotiClick}
          showDot={notiBadge}
        />
      )}

      {/* ── detail (2depth) ── */}
      {type === 'detail' && (
        <>
          {/* 좌측: 뒤로가기 (96px 고정) */}
          <div style={{ width: '96px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <BackButton onClick={onBack} />
          </div>

          {/* 중앙: 타이틀 */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            {showTitle && title && (
              <span
                style={{
                  fontSize: '17px',
                  lineHeight: '25px',
                  fontWeight: 600,
                  fontFamily: 'Pretendard, sans-serif',
                  color: 'var(--color-neutral-900)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </span>
            )}
          </div>

          {/* 우측: 커스텀 아이콘 (96px 고정, max 2개) */}
          <div
            style={{
              width: '96px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
            }}
          >
            {rightIcons.slice(0, 2).map((item, i) => (
              <ActionButton
                key={i}
                icon={item.icon}
                onClick={item.onClick}
                showDot={item.showDot}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
