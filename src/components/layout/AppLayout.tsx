import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/components/ui/utils'

import { Footer } from './Footer'
import { Header } from './Header'

type AppLayoutProps = ComponentPropsWithoutRef<'div'>

export function AppLayout({ children, className, ...props }: AppLayoutProps) {
    return (
        <div
            className={cn(
                'bg-background text-text flex min-h-screen flex-col',
                className
            )}
            {...props}
        >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
