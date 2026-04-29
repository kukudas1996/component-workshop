import { CTAButton } from '../../components/button/CTAButton'
import type { CTAButtonType } from '../../components/button/CTAButton'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-10 pb-2 border-t border-[var(--color-neutral-100)]">
      <h3
        className="mb-6"
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-neutral-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  )
}

// 모바일 프레임처럼 보이도록 감싸는 래퍼
function MobileFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--color-neutral-200)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          backgroundColor: 'var(--color-neutral-000)',
        }}
      >
        {children}
      </div>
      <span style={{ fontSize: '12px', color: 'var(--color-neutral-500)', fontWeight: 500 }}>
        {label}
      </span>
    </div>
  )
}

const TYPES: { type: CTAButtonType; label: string; props: object }[] = [
  {
    type: 'default',
    label: 'Default',
    props: { primaryText: '확인' },
  },
  {
    type: 'horizontal',
    label: 'Horizontal',
    props: { primaryText: '확인', secondaryText: '취소' },
  },
  {
    type: 'vertical',
    label: 'Vertical',
    props: { primaryText: '확인', textLinkText: '나중에' },
  },
]

export function CTAButtonPage() {
  return (
    <div>
      {/* All types */}
      <Section title="Types">
        <div className="flex items-start gap-8 flex-wrap">
          {TYPES.map(({ type, label, props }) => (
            <MobileFrame key={type} label={label}>
              <CTAButton type={type} {...props} />
            </MobileFrame>
          ))}
        </div>
      </Section>

      {/* Without home indicator */}
      <Section title="Without Home Indicator">
        <div className="flex items-start gap-8 flex-wrap">
          {TYPES.map(({ type, label, props }) => (
            <MobileFrame key={type} label={label}>
              <CTAButton type={type} showHomeIndicator={false} {...props} />
            </MobileFrame>
          ))}
        </div>
      </Section>

      {/* Custom text */}
      <Section title="Custom Text">
        <div className="flex items-start gap-8 flex-wrap">
          <MobileFrame label="Default — 주문하기">
            <CTAButton type="default" primaryText="주문하기" />
          </MobileFrame>
          <MobileFrame label="Horizontal — 삭제 / 저장">
            <CTAButton type="horizontal" primaryText="저장" secondaryText="삭제" />
          </MobileFrame>
          <MobileFrame label="Vertical — 신청하기 / 다음에">
            <CTAButton type="vertical" primaryText="신청하기" textLinkText="다음에 할게요" />
          </MobileFrame>
        </div>
      </Section>
    </div>
  )
}
