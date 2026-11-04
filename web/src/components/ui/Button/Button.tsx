import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

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
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<ButtonVariant, string> = {
      glass:
        'border-transparent bg-white/50 backdrop-blur-xl text-neutral-800 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]',
      solid:
        'border-transparent bg-white text-neutral-800 hover:border-black hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]',
      black:
        'border-black bg-black text-white hover:bg-neutral-800 hover:shadow-[3px_4px_0px_0px_rgba(0,0,0,0.4)]',
    }

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-6 py-2.5 text-base',
    }

    const underlineColor = variant === 'black' ? 'group-hover:border-white' : 'group-hover:border-neutral-900'

    return (
      <button
        ref={ref}
        className={`group inline-flex cursor-pointer items-center justify-center rounded-lg border font-mono transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {underline ? (
          <span className={`border-b-2 border-transparent pb-0.5 transition ${underlineColor}`}>
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
