import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { HiBars3, HiGlobeAlt } from 'react-icons/hi2'
import { Link, NavLink } from 'react-router'

import { Container, FilterDropdown } from '@/components/ui'
import { cn } from '@/components/ui/utils'
import { routePaths } from '@/routePaths'

import { languageOptions, navigationItems } from './headerData'

type HeaderProps = ComponentPropsWithoutRef<'header'>

export function Header({ className, ...props }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [language, setLanguage] = useState('ua')

    return (
        <header
            className={cn('border-border bg-background border-b', className)}
            {...props}
        >
            <Container>
                <div className="flex h-[4.25rem] items-center justify-between gap-5">
                    <Link
                        className="text-primary flex shrink-0 items-center gap-3"
                        to={routePaths.home}
                        aria-label="VV Work"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="bg-primary text-accent flex size-10 items-center justify-center rounded-md text-base font-bold">
                            W
                        </span>
                        <span className="text-lg font-bold">VV Work</span>
                    </Link>

                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Основна навігація"
                    >
                        {navigationItems.map((item) => (
                            <NavLink
                                className={({ isActive }) =>
                                    cn(
                                        'rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
                                        isActive && !item.inactive
                                            ? 'bg-surface text-primary shadow-sm'
                                            : 'text-muted hover:bg-surface hover:text-primary'
                                    )
                                }
                                end={item.to === routePaths.home}
                                to={item.to}
                                key={`${item.label}-${item.to}`}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-5 lg:flex">
                        <FilterDropdown
                            className="w-24"
                            icon={
                                <HiGlobeAlt
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            }
                            label="Мова"
                            onChange={setLanguage}
                            options={languageOptions}
                            size="sm"
                            value={language}
                        />
                        <Link
                            className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-11 items-center justify-center rounded-md px-8 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                            to={routePaths.contacts}
                        >
                            Долучитися
                        </Link>
                    </div>

                    <button
                        className="border-border bg-surface text-primary inline-flex size-10 items-center justify-center rounded-md border lg:hidden"
                        type="button"
                        aria-label={
                            isMenuOpen ? 'Закрити меню' : 'Відкрити меню'
                        }
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsMenuOpen((value) => !value)}
                    >
                        <HiBars3
                            aria-hidden="true"
                            className="size-6"
                        />
                    </button>
                </div>

                <nav
                    className={cn(
                        'grid overflow-hidden transition-all duration-200 lg:hidden',
                        isMenuOpen
                            ? 'border-border grid-rows-[1fr] border-t py-3'
                            : 'grid-rows-[0fr]'
                    )}
                    id="mobile-navigation"
                    aria-label="Мобільна навігація"
                >
                    <div className="min-h-0">
                        <div className="grid gap-1">
                            {navigationItems.map((item) => (
                                <NavLink
                                    className={({ isActive }) =>
                                        cn(
                                            'hover:bg-surface hover:text-primary rounded-md px-3 py-3 text-sm font-medium',
                                            isActive && !item.inactive
                                                ? 'bg-surface text-primary'
                                                : 'text-muted'
                                        )
                                    }
                                    to={item.to}
                                    key={`${item.label}-${item.to}-mobile`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}
