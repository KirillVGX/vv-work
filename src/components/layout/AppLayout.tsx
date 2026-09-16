import type { ComponentPropsWithoutRef } from 'react'
import { Outlet } from 'react-router'

import { cn } from '@/components/ui/utils'

import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'

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
            <ScrollToTop />
            <Header />
            <main className="flex-1">{children ?? <Outlet />}</main>
            <Footer />
        </div>
    )
}
