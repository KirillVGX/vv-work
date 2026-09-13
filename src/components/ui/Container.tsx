import type { ComponentPropsWithoutRef } from 'react'

import { cn } from './utils'

type ContainerProps = ComponentPropsWithoutRef<'div'>

export function Container({ className, ...props }: ContainerProps) {
    return <div className={cn('container', className)} {...props} />
}
