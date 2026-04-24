export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'lg' | 'md' | 'sm'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children = 'Button',
  onClick,
}: ButtonProps) {
  const sizeMap: Record<ButtonSize, React.CSSProperties> = {
    lg: { height: '52px', padding: '0 24px', fontSize: '17px', borderRadius: '14px' },
    md: { height: '44px', padding: '0 20px', fontSize: '15px', borderRadius: '12px' },
    sm: { height: '34px', padding: '0 14px', fontSize: '13px', borderRadius: '10px' },
  }

  const variantMap: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-bankcow-blue)',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'var(--color-primary-050)',
      color: 'var(--color-bankcow-blue)',
      border: 'none',
    },
    outline: {
      backgroundColor: '#fff',
      color: 'var(--color-bankcow-blue)',
      border: '1.5px solid var(--color-bankcow-blue)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-bankcow-blue)',
      border: 'none',
    },
  }

  const disabledStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-neutral-100)',
    color: 'var(--color-neutral-400)',
    border: 'none',
    cursor: 'not-allowed',
  }

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'opacity 0.15s ease',
        ...sizeMap[size],
        ...(disabled ? disabledStyle : variantMap[variant]),
      }}
      onMouseEnter={e => {
        if (!disabled && !loading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'
      }}
      onMouseLeave={e => {
        if (!disabled && !loading) (e.currentTarget as HTMLButtonElement).style.opacity = '1'
      }}
    >
      {loading && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </button>
  )
}
