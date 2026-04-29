import { Share2, Search } from 'lucide-react'
import { AppBar } from '../../components/appbar/AppBar'

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

// AppBar를 375px 모바일 너비로 감싸서 보여주는 래퍼
function AppBarFrame({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        style={{
          width: '375px',
          backgroundColor: 'var(--color-neutral-000)',
          overflow: 'hidden',
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

export function AppBarPage() {
  return (
    <div>
      {/* Home (1depth) */}
      <Section title="Home (1depth)">
        <PreviewBox className="flex flex-wrap gap-8">
          <AppBarFrame label="기본">
            <AppBar type="home" />
          </AppBarFrame>
          <AppBarFrame label="알림 뱃지">
            <AppBar type="home" notiBadge />
          </AppBarFrame>
        </PreviewBox>
      </Section>

      {/* Detail (2depth) */}
      <Section title="Detail (2depth)">
        <PreviewBox className="flex flex-wrap gap-8">
          <AppBarFrame label="뒤로가기만">
            <AppBar type="detail" />
          </AppBarFrame>
          <AppBarFrame label="다른 아이콘 1개">
            <AppBar
              type="detail"
              rightIcons={[
                { icon: <Search size={24} fill="var(--color-neutral-400)" strokeWidth={0} /> },
              ]}
            />
          </AppBarFrame>
          <AppBarFrame label="다른 아이콘 2개">
            <AppBar
              type="detail"
              rightIcons={[
                { icon: <Search size={24} fill="var(--color-neutral-400)" strokeWidth={0} /> },
                { icon: <Share2 size={24} fill="var(--color-neutral-400)" strokeWidth={0} /> },
              ]}
            />
          </AppBarFrame>
        </PreviewBox>
      </Section>

      {/* Title */}
      <Section title="Title (showTitle)">
        <PreviewBox className="flex flex-wrap gap-8">
          <AppBarFrame label="타이틀 숨김 (기본)">
            <AppBar type="detail" title="페이지 제목" showTitle={false} />
          </AppBarFrame>
          <AppBarFrame label="타이틀 표시">
            <AppBar type="detail" title="페이지 제목" showTitle />
          </AppBarFrame>
          <AppBarFrame label="타이틀 + 우측 아이콘">
            <AppBar
              type="detail"
              title="페이지 제목"
              showTitle
              rightIcons={[
                { icon: <Search size={24} /> },
              ]}
            />
          </AppBarFrame>
        </PreviewBox>
      </Section>
    </div>
  )
}
