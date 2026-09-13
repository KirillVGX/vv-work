import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { Button, Container } from '@/components/ui'
import { cn } from '@/components/ui/utils'

const navigationItems = [
    { label: 'Головна', href: '#' },
    { label: 'Послуги', href: '#services' },
    { label: 'Про нас', href: '#about' },
    { label: 'Контакти', href: '#contacts' },
]

type HeaderProps = ComponentPropsWithoutRef<'header'>

export function Header({ className, ...props }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header
            className={cn(
                'border-border bg-surface/95 sticky top-0 z-30 border-b backdrop-blur',
                className
            )}
            {...props}
        >
            <Container>
                <div className="flex min-h-16 items-center justify-between gap-4 py-3">
                    <a
                        className="text-primary focus-visible:outline-accent inline-flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
                        href="#"
                        aria-label="VV Work"
                    >
                        <span className="bg-primary text-accent flex size-10 items-center justify-center rounded-md text-sm font-bold">
                            VV
                        </span>
                        <span className="text-lg font-bold tracking-normal">
                            VV Work
                        </span>
                    </a>

                    <nav
                        className="hidden items-center gap-1 md:flex"
                        aria-label="Основна навігація"
                    >
                        {navigationItems.map((item) => (
                            <a
                                className="text-muted hover:bg-background hover:text-primary focus-visible:outline-accent rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                href={item.href}
                                key={item.href}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button size="sm">Звʼязатися</Button>
                    </div>

                    <button
                        className="border-border bg-surface text-primary hover:border-primary hover:bg-background focus-visible:outline-accent inline-flex size-10 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 md:hidden"
                        type="button"
                        aria-label={
                            isMenuOpen ? 'Закрити меню' : 'Відкрити меню'
                        }
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsMenuOpen((value) => !value)}
                    >
                        <span className="relative size-4">
                            <span
                                className={cn(
                                    'absolute top-0 left-0 h-0.5 w-4 bg-current transition-transform',
                                    isMenuOpen && 'translate-y-1.5 rotate-45'
                                )}
                            />
                            <span
                                className={cn(
                                    'absolute top-1.5 left-0 h-0.5 w-4 bg-current transition-opacity',
                                    isMenuOpen && 'opacity-0'
                                )}
                            />
                            <span
                                className={cn(
                                    'absolute top-3 left-0 h-0.5 w-4 bg-current transition-transform',
                                    isMenuOpen && '-translate-y-1.5 -rotate-45'
                                )}
                            />
                        </span>
                    </button>
                </div>

                <nav
                    className={cn(
                        'grid overflow-hidden transition-all duration-200 md:hidden',
                        isMenuOpen
                            ? 'border-border grid-rows-[1fr] border-t py-3'
                            : 'grid-rows-[0fr]'
                    )}
                    id="mobile-navigation"
                    aria-label="Мобільна навігація"
                >
                    <div className="min-h-0">
                        <div className="flex flex-col gap-1">
                            {navigationItems.map((item) => (
                                <a
                                    className="text-muted hover:bg-background hover:text-primary focus-visible:outline-accent rounded-md px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                    href={item.href}
                                    key={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <Button
                                className="mt-2"
                                fullWidth
                            >
                                Звʼязатися
                            </Button>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}
