import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type InputProps = ComponentPropsWithoutRef<'input'> & {
    error?: boolean
}

export function Input({ className, error = false, ...props }: InputProps) {
    return (
        <input
            className={cn(
                'bg-surface text-text h-11 w-full rounded-md border px-4 text-base transition-colors duration-150',
                'placeholder:text-muted',
                'hover:border-primary',
                'disabled:bg-border/35 disabled:text-muted disabled:cursor-not-allowed',
                error
                    ? 'border-error focus:border-error focus:ring-error/25 focus:ring-2 focus:outline-none'
                    : 'border-border focus:border-primary focus:ring-accent focus:ring-2 focus:outline-none',
                className
            )}
            aria-invalid={error || props['aria-invalid']}
            {...props}
        />
    )
}
