import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent disabled:bg-border disabled:text-muted',
    secondary:
        'border border-border bg-surface text-primary hover:border-primary hover:bg-background focus-visible:outline-primary disabled:border-border disabled:bg-surface disabled:text-muted',
    ghost:
        'bg-transparent text-primary hover:bg-surface focus-visible:outline-primary disabled:text-muted',
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-base',
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex cursor-pointer items-center justify-center rounded-md font-semibold transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70',
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
            type={type}
            {...props}
        />
    )
}
