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

const TYPES: { type: CTAButtonType; label: string }[] = [
  { type: 'default',    label: 'Default' },
  { type: 'horizontal', label: 'Horizontal' },
  { type: 'vertical',   label: 'Vertical' },
]

export function CTAButtonPage() {
  return (
    <div>
      <Section title="Types">
        <div className="flex items-start gap-8 flex-wrap">
          {TYPES.map(({ type, label }) => (
            <MobileFrame key={type} label={label}>
              <CTAButton type={type} />
            </MobileFrame>
          ))}
        </div>
      </Section>
    </div>
  )
}
