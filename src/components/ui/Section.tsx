import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type SectionTone = 'default' | 'surface' | 'primary'
type SectionSpacing = 'sm' | 'md' | 'lg'

type SectionProps = ComponentPropsWithoutRef<'section'> & {
    tone?: SectionTone
    spacing?: SectionSpacing
}

const toneClasses: Record<SectionTone, string> = {
    default: 'bg-background text-text',
    surface: 'bg-surface text-text',
    primary: 'bg-primary text-white',
}

const spacingClasses: Record<SectionSpacing, string> = {
    sm: 'py-8 md:py-10',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
}

export function Section({
    className,
    tone = 'default',
    spacing = 'md',
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(toneClasses[tone], spacingClasses[spacing], className)}
            {...props}
        />
    )
}
