import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type ContainerProps = ComponentPropsWithoutRef<'div'>

export function Container({ className, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-[87.5rem] px-4 md:px-8 2xl:px-0',
                className
            )}
            {...props}
        />
    )
}
