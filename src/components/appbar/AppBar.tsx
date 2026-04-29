import { useState } from 'react'

// ── Design System Icons ────────────────────────────────────────
// AppBarOutlinedIcon / Back — 피그마 SVG 원본 path
function AppBarBackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.04052 4.28444C7.44112 3.8731 8.06527 3.90205 8.4341 4.34889C8.8028 4.7958 8.77686 5.49212 8.37632 5.90358L2.44138 12.0003L8.37632 18.0969C8.77689 18.5084 8.80289 19.2047 8.4341 19.6516C8.06522 20.0985 7.44111 20.1266 7.04052 19.7151L0.317756 12.8098C0.115028 12.6016 2.26655e-05 12.3077 0 12.0003C0 11.6928 0.115008 11.399 0.317756 11.1907L7.04052 4.28444Z"
        fill="currentColor"
      />
    </svg>
  )
}

// AppBarFilledIcon / Noti — 피그마 SVG 원본 path (neutral-400, #C1C8D6)
function AppBarNotiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0001 1.4895C16.5613 1.4895 20.2589 5.18709 20.2589 9.74829V13.4973L21.3946 14.7209C22.5823 16.0006 21.6746 18.082 19.9288 18.0823H4.07234C2.32615 18.0823 1.41852 16.0007 2.60652 14.7209L3.74128 13.4983V9.74829C3.74128 5.18717 7.43899 1.48964 12.0001 1.4895Z"
        fill="#C1C8D6"
      />
      <path
        d="M15.875 19.5105C15.431 21.2357 13.8648 22.5105 12.001 22.5105C10.1371 22.5105 8.57099 21.2357 8.12695 19.5105H15.875Z"
        fill="#C1C8D6"
      />
    </svg>
  )
}

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
      <AppBarBackIcon />
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
          icon={<AppBarNotiIcon />}
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
                  color: 'var(--color-neutral-800)',
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
