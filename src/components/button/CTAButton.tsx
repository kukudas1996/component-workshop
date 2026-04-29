import { useState } from 'react'
import { Button } from './Button'

// ── Home Indicator ─────────────────────────────────────────────
function HomeIndicator() {
  return (
    <div
      style={{
        width: '100%',
        height: '34px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '8px',
      }}
    >
      <div
        style={{
          width: '144px',
          height: '5px',
          borderRadius: '100px',
          backgroundColor: 'var(--color-neutral-900)',
        }}
      />
    </div>
  )
}

// ── Text Link Button (ButtonItem / TextButton) ─────────────────
// CTAButton vertical 타입의 하단 텍스트 링크용
// min-h: 40px, font: 17px Medium, ghost 스타일
function TextLinkButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40px',
        padding: '2px 20px',
        fontSize: '17px',
        lineHeight: '25px',
        fontWeight: 500,
        fontFamily: 'Pretendard, sans-serif',
        borderRadius: '10px',
        backgroundColor: hovered || pressed ? 'var(--color-neutral-050)' : 'transparent',
        color: 'var(--color-neutral-700)',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        whiteSpace: 'nowrap',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.1s ease',
      }}
    >
      {children}
    </button>
  )
}

// ── CTAButton ──────────────────────────────────────────────────

export type CTAButtonType = 'default' | 'horizontal' | 'vertical'

export interface CTAButtonProps {
  /** 버튼 레이아웃 타입 */
  type?: CTAButtonType
  /** Primary 버튼 텍스트 */
  primaryText?: string
  /** Secondary 버튼 텍스트 (horizontal 타입) */
  secondaryText?: string
  /** 텍스트 링크 버튼 텍스트 (vertical 타입) */
  textLinkText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  onTextLinkClick?: () => void
  /** iOS 홈 인디케이터 표시 여부 */
  showHomeIndicator?: boolean
}

export function CTAButton({
  type = 'default',
  primaryText = '확인',
  secondaryText = '취소',
  textLinkText = '나중에',
  onPrimaryClick,
  onSecondaryClick,
  onTextLinkClick,
  showHomeIndicator = true,
}: CTAButtonProps) {
  return (
    <div
      style={{
        width: '375px',
        backgroundColor: 'var(--color-neutral-000)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Button Container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: type === 'vertical' ? 'column' : 'row',
          alignItems: 'center',
          paddingTop: '8px',
          paddingBottom: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          gap: '8px',
          boxSizing: 'border-box',
        }}
      >
        {type === 'default' && (
          <Button variant="primary" size="xl" fullWidth onClick={onPrimaryClick}>
            {primaryText}
          </Button>
        )}

        {type === 'horizontal' && (
          <>
            <Button variant="secondary" size="xl" fullWidth onClick={onSecondaryClick}>
              {secondaryText}
            </Button>
            <Button variant="primary" size="xl" fullWidth onClick={onPrimaryClick}>
              {primaryText}
            </Button>
          </>
        )}

        {type === 'vertical' && (
          <>
            <Button variant="primary" size="xl" fullWidth onClick={onPrimaryClick}>
              {primaryText}
            </Button>
            <TextLinkButton onClick={onTextLinkClick}>{textLinkText}</TextLinkButton>
          </>
        )}
      </div>

      {showHomeIndicator && <HomeIndicator />}
    </div>
  )
}
