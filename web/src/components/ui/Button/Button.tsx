'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react'

export type ButtonVariant = 'glass' | 'solid' | 'black'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
      underline = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Padronização precisa de alturas, padding e tipografia
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-[11px]',
      md: 'h-9 px-4 text-xs',
      lg: 'h-10 px-5 text-xs',
    }

    const getVariantClasses = (): string => {
      if (variant === 'black') {
        return 'border font-semibold shadow-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0'
      }
      if (variant === 'solid') {
        return 'border font-medium shadow-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0'
      }
      return 'border font-medium shadow-none backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0'
    }

    const getVariantStyles = (): CSSProperties => {
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
          borderColor: 'var(--border-secondary)',
        }
      }
      return {
        backgroundColor: 'var(--bg-elevated)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-secondary)',
      }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = 'var(--shadow-hover-sm)'
      if (variant !== 'black') {
        e.currentTarget.style.borderColor = 'var(--border-primary)'
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
      }
      props.onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = 'none'
      const base = getVariantStyles()
      e.currentTarget.style.borderColor = base.borderColor as string
      e.currentTarget.style.backgroundColor = base.backgroundColor as string
      props.onMouseLeave?.(e)
    }

    return (
      <button
        ref={ref}
        className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-mono outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]} ${getVariantClasses()} ${className}`}
        style={{ ...getVariantStyles(), ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {underline ? (
          <span className="border-b border-current pb-0.5">
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
