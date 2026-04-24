import { Button } from '../../components/button/Button'
import type { ButtonVariant, ButtonSize } from '../../components/button/Button'

// ── Showcase primitives ──────────────────────────────────────

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

// ── Page ─────────────────────────────────────────────────────

export function ButtonPage() {
  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost']
  const sizes: ButtonSize[] = ['lg', 'md', 'sm']

  const variantLabels: Record<ButtonVariant, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    outline: 'Outline',
    ghost: 'Ghost',
  }

  const sizeLabels: Record<ButtonSize, string> = {
    lg: 'Large (52px)',
    md: 'Medium (44px)',
    sm: 'Small (34px)',
  }

  return (
    <div>
      {/* Variants × Sizes */}
      <Section title="Variants & Sizes">
        <PreviewBox>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="text-left pb-5 pr-10"
                  style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-neutral-500)', width: '100px' }}
                >
                  Variant
                </th>
                {sizes.map(s => (
                  <th
                    key={s}
                    className="text-left pb-5 pr-10"
                    style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-neutral-500)' }}
                  >
                    {sizeLabels[s]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr
                  key={v}
                  style={{ borderTop: i === 0 ? undefined : '1px solid var(--color-neutral-100)' }}
                >
                  <td
                    className="py-5 pr-10"
                    style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-neutral-700)' }}
                  >
                    {variantLabels[v]}
                  </td>
                  {sizes.map(s => (
                    <td key={s} className="py-5 pr-10">
                      <Button variant={v} size={s}>Button</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox className="flex items-start gap-10 flex-wrap">
          {[
            { label: 'Default', node: <Button>Default</Button> },
            { label: 'Disabled', node: <Button disabled>Disabled</Button> },
            { label: 'Loading', node: <Button loading>Loading</Button> },
          ].map(({ label, node }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              {node}
              <span style={{ fontSize: '12px', color: 'var(--color-neutral-500)' }}>{label}</span>
            </div>
          ))}
        </PreviewBox>
      </Section>

      {/* Full Width */}
      <Section title="Full Width">
        <PreviewBox className="flex flex-col gap-3" style={{ maxWidth: '480px' }}>
          <Button fullWidth>Primary Full Width</Button>
          <Button variant="secondary" fullWidth>Secondary Full Width</Button>
          <Button variant="outline" fullWidth>Outline Full Width</Button>
        </PreviewBox>
      </Section>
    </div>
  )
}
