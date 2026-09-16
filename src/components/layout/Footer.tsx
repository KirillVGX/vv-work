import type { ComponentPropsWithoutRef } from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaYoutube,
} from 'react-icons/fa'
import { HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2'
import { Link } from 'react-router'

import { cn } from '@/components/ui/utils'
import { routePaths } from '@/routePaths'

const candidateLinks = [
    { label: 'Пошук вакансій', to: routePaths.vacancies },
    { label: 'Поради та ресурси', to: '#guides' },
    { label: 'Як це працює', to: '#how-it-works' },
]

const employerLinks = [
    { label: 'Розмістити вакансію', to: routePaths.employers },
    { label: 'Переваги', to: routePaths.employers },
    { label: 'Співпраця', to: routePaths.contacts },
]

const companyLinks = [
    { label: 'Про нас', to: routePaths.about },
    { label: 'Партнери', to: routePaths.partners },
    { label: 'Контакти', to: routePaths.contacts },
]

const legalLinks = [
    { label: 'Політика конфіденційності', to: routePaths.privacy },
    { label: 'Умови використання', to: routePaths.terms },
]

const socialLinks = [
    { label: 'LinkedIn', icon: FaLinkedinIn, to: '#' },
    { label: 'Telegram', icon: FaTelegramPlane, to: '#' },
    { label: 'Facebook', icon: FaFacebookF, to: '#' },
    { label: 'Instagram', icon: FaInstagram, to: '#' },
    { label: 'YouTube', icon: FaYoutube, to: '#' },
]

type FooterProps = ComponentPropsWithoutRef<'footer'>

function FooterColumn({
    title,
    links,
}: {
    title: string
    links: Array<{ label: string; to: string }>
}) {
    return (
        <div>
            <h2 className="text-sm font-extrabold text-white">{title}</h2>
            <nav
                className="mt-4 grid gap-3 text-sm font-semibold text-white/55"
                aria-label={title}
            >
                {links.map((item) => (
                    <Link
                        className="transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                        key={`${title}-${item.label}`}
                        to={item.to}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export function Footer({ className, ...props }: FooterProps) {
    return (
        <footer
            className={cn(
                'bg-panel-dark relative overflow-hidden text-white',
                className
            )}
            {...props}
        >
            <div
                className="pointer-events-none absolute bottom-0 left-0 hidden h-28 w-28 opacity-15 lg:block"
                aria-hidden="true"
            >
                <span className="bg-accent absolute bottom-0 left-3 h-32 w-2 -rotate-45 rounded-full" />
                <span className="bg-accent absolute bottom-0 left-9 h-32 w-2 -rotate-45 rounded-full" />
                <span className="bg-accent absolute bottom-0 left-15 h-32 w-2 -rotate-45 rounded-full" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[110rem] grid-cols-1 gap-8 px-6 py-9 sm:grid-cols-2 md:px-10 lg:grid-cols-6 lg:gap-10 lg:px-16 lg:py-10">
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link
                        className="inline-flex items-center gap-3 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                        to={routePaths.home}
                        aria-label="VV Work"
                    >
                        <span className="bg-accent text-panel-dark flex size-10 items-center justify-center rounded-md text-lg font-extrabold shadow-[0_0_18px_rgba(184,243,74,0.28)]">
                            W
                        </span>
                        <span className="text-xl font-extrabold">VV Work</span>
                    </Link>
                    <p className="mt-4 max-w-60 text-sm leading-7 font-semibold text-white/55">
                        Платформа для пошуку роботи та працівників у Європі.
                    </p>
                    <div className="mt-5 flex items-center gap-5">
                        {socialLinks.map((item) => {
                            const Icon = item.icon

                            return (
                                <Link
                                    className="text-white/65 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                                    key={item.label}
                                    to={item.to}
                                    aria-label={item.label}
                                >
                                    <Icon
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <FooterColumn
                    title="Для кандидатів"
                    links={candidateLinks}
                />
                <FooterColumn
                    title="Для роботодавців"
                    links={employerLinks}
                />
                <FooterColumn
                    title="Компанія"
                    links={companyLinks}
                />

                <div>
                    <h2 className="text-sm font-extrabold text-white">
                        Контакти
                    </h2>
                    <div className="mt-4 grid gap-4 text-sm font-semibold text-white/55">
                        <a
                            className="flex items-center gap-3 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                            href="mailto:hello@vv-work.com"
                        >
                            <HiEnvelope
                                className="size-5"
                                aria-hidden="true"
                            />
                            hello@vv-work.com
                        </a>
                        <a
                            className="flex items-center gap-3 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                            href="tel:+380670000000"
                        >
                            <HiPhone
                                className="size-5"
                                aria-hidden="true"
                            />
                            +380 67 000 00 00
                        </a>
                        <a
                            className="flex items-center gap-3 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                            href="https://www.google.com/maps/search/?api=1&query=%D0%9A%D0%B8%D1%97%D0%B2%2C%20%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <HiMapPin
                                className="size-5"
                                aria-hidden="true"
                            />
                            Київ, Україна
                        </a>
                    </div>
                </div>

                <div className="border-white/10 pt-6 sm:col-span-2 lg:col-span-1 lg:border-l lg:pt-7 lg:pl-10">
                    <nav
                        className="grid gap-3 text-sm font-semibold text-white/55"
                        aria-label="Правова інформація"
                    >
                        {legalLinks.map((item) => (
                            <Link
                                className="transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                                key={item.label}
                                to={item.to}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <p className="mt-8 text-sm font-semibold text-white/45">
                        © 2026 VV Work. Всі права захищені.
                    </p>
                </div>
            </div>
        </footer>
    )
}
