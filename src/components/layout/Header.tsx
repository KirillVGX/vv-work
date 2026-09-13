import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'

import { Container } from '@/components/ui'
import { cn } from '@/components/ui/utils'
import { routePaths } from '@/routePaths'

const navigationItems = [
    { label: 'Головна', to: routePaths.home },
    { label: 'Партнери', to: routePaths.demoPartner },
    { label: 'Контакти', to: routePaths.contacts },
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
                    <Link
                        className="text-primary focus-visible:outline-accent inline-flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
                        to={routePaths.home}
                        aria-label="VV Work"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="bg-primary text-accent flex size-10 items-center justify-center rounded-md text-sm font-bold">
                            VV
                        </span>
                        <span className="text-lg font-bold tracking-normal">
                            VV Work
                        </span>
                    </Link>

                    <nav
                        className="hidden items-center gap-1 md:flex"
                        aria-label="Основна навігація"
                    >
                        {navigationItems.map((item) => (
                            <NavLink
                                className={({ isActive }) =>
                                    cn(
                                        'focus-visible:outline-accent rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                                        isActive
                                            ? 'bg-background text-primary'
                                            : 'text-muted hover:bg-background hover:text-primary'
                                    )
                                }
                                to={item.to}
                                key={item.to}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <Link
                        className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent hidden h-9 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
                        to={routePaths.contacts}
                    >
                        Звʼязатися
                    </Link>

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
                                <NavLink
                                    className={({ isActive }) =>
                                        cn(
                                            'focus-visible:outline-accent rounded-md px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                                            isActive
                                                ? 'bg-background text-primary'
                                                : 'text-muted hover:bg-background hover:text-primary'
                                        )
                                    }
                                    to={item.to}
                                    key={item.to}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            <Link
                                className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent mt-2 inline-flex h-11 w-full items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                to={routePaths.contacts}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Звʼязатися
                            </Link>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}
