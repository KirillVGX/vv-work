import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'

import { Container } from '@/components/ui'
import { cn } from '@/components/ui/utils'

const footerLinks = [
    { label: 'Політика конфіденційності', to: '#privacy' },
    { label: 'Умови користування', to: '#terms' },
]

type FooterProps = ComponentPropsWithoutRef<'footer'>

export function Footer({ className, ...props }: FooterProps) {
    return (
        <footer
            className={cn(
                'border-border bg-primary border-t text-white',
                className
            )}
            {...props}
        >
            <Container>
                <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-base font-bold">VV Work</p>
                        <p className="mt-1 max-w-md text-sm text-white/70">
                            Робочий простір для сучасних цифрових продуктів.
                        </p>
                    </div>

                    <nav
                        className="flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center"
                        aria-label="Додаткова навігація"
                    >
                        {footerLinks.map((item) => (
                            <Link
                                className="hover:text-accent focus-visible:outline-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                                to={item.to}
                                key={item.to}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </Container>
        </footer>
    )
}
