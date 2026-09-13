import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type InputProps = ComponentPropsWithoutRef<'input'> & {
    error?: boolean
}

export function Input({ className, error = false, ...props }: InputProps) {
    return (
        <input
            className={cn(
                'h-11 w-full rounded-md border bg-surface px-4 text-base text-text transition-colors duration-150',
                'placeholder:text-muted',
                'hover:border-primary',
                'focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent',
                'disabled:cursor-not-allowed disabled:bg-border/35 disabled:text-muted',
                error ? 'border-error' : 'border-border',
                className
            )}
            aria-invalid={error || props['aria-invalid']}
            {...props}
        />
    )
}
