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

function PreviewBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-8 ${className}`}
      style={{ backgroundColor: 'var(--color-neutral-050)' }}
    >
      {children}
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
        <PreviewBox className="flex items-start gap-8 flex-wrap">
          {TYPES.map(({ type, label }) => (
            <div key={type} className="flex flex-col items-center gap-3">
              <CTAButton type={type} />
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-500)', fontWeight: 500 }}>
                {label}
              </span>
            </div>
          ))}
        </PreviewBox>
      </Section>
    </div>
  )
}
