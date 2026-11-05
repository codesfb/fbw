import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react'

export type ButtonVariant = 'glass' | 'solid' | 'black'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  underline?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'glass',
      size = 'md',
      underline = true,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-6 py-2.5 text-base',
    }

    const getVariantStyle = (): CSSProperties => {
      const baseStyle: CSSProperties = {
        backgroundColor: 'var(--bg-elevated)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-transparent)',
      }

      if (variant === 'black') {
        return {
          backgroundColor: 'var(--text-primary)',
          color: 'var(--text-inverse)',
          borderColor: 'var(--border-primary)',
        }
      }

      if (variant === 'solid') {
        return {
          backgroundColor: 'var(--bg-elevated-solid)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-transparent)',
        }
      }

      return baseStyle
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'black') {
        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
        e.currentTarget.style.boxShadow = 'var(--shadow-secondary)'
      } else {
        e.currentTarget.style.borderColor = 'var(--border-primary)'
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
      }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      const variantStyle = getVariantStyle()
      e.currentTarget.style.backgroundColor = variantStyle.backgroundColor as string
      e.currentTarget.style.borderColor = variantStyle.borderColor as string
      e.currentTarget.style.boxShadow = 'none'
    }

    return (
      <button
        ref={ref}
        className={`group inline-flex cursor-pointer items-center justify-center rounded-lg border font-mono backdrop-blur-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]} ${className}`}
        style={{ ...getVariantStyle(), ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {underline ? (
          <span
            className="border-b-2 pb-0.5 transition"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = variant === 'black' ? 'var(--text-inverse)' : 'var(--border-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
