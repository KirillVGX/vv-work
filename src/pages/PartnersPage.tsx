import { useCallback } from 'react'
import { HiArrowRight, HiCheckBadge, HiMapPin } from 'react-icons/hi2'
import { Link } from 'react-router'

import { fetchPartners } from '@/api'
import { Container, ErrorBlock, Section } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'
import { routePaths } from '@/routePaths'

export function PartnersPage() {
    const { load: loadPartners, state } = useApiResource(fetchPartners)

    const getPartnerPath = useCallback((slug: string) => {
        return routePaths.partner.replace(':slug', slug)
    }, [])

    return (
        <Section
            className="pt-10 pb-14 md:pt-14 md:pb-20"
            spacing="none"
        >
            <Container>
                <div className="mb-8 max-w-3xl">
                    <p className="text-muted text-sm font-extrabold tracking-[0.28em] uppercase">
                        Партнери
                    </p>
                    <h1 className="text-primary mt-4 text-4xl leading-tight font-extrabold md:text-5xl">
                        Перевірені роботодавці VV Work
                    </h1>
                    <p className="text-muted mt-4 text-lg leading-8">
                        Компанії, які публікують вакансії на платформі та
                        допомагають кандидатам знаходити роботу в Європі.
                    </p>
                </div>

                {state.status === 'loading' && (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                className="border-border bg-surface min-h-[18rem] animate-pulse rounded-xl border"
                                key={index}
                            />
                        ))}
                    </div>
                )}

                {state.status === 'error' && (
                    <ErrorBlock
                        title="Не вдалося завантажити партнерів"
                        message={state.message}
                        minHeightClassName="min-h-[18rem]"
                        onRetry={loadPartners}
                    />
                )}

                {state.status === 'success' && (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {state.data.map((partner) => (
                            <Link
                                className="border-border bg-surface hover:border-primary/30 focus-visible:outline-accent group flex min-h-[18rem] flex-col rounded-xl border p-6 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                key={partner.slug}
                                to={getPartnerPath(partner.slug)}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="bg-primary text-accent flex size-13 items-center justify-center rounded-lg text-xl font-extrabold">
                                            {partner.logo}
                                        </span>
                                        <div>
                                            <h2 className="text-primary text-xl font-extrabold">
                                                {partner.name}
                                            </h2>
                                            <p className="text-muted mt-1 flex items-center gap-1.5 text-sm font-semibold">
                                                <HiMapPin
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                                {partner.city},{' '}
                                                {partner.country}
                                            </p>
                                        </div>
                                    </div>
                                    {partner.isVerified && (
                                        <HiCheckBadge
                                            className="text-success size-6 shrink-0"
                                            aria-label="Перевірений партнер"
                                        />
                                    )}
                                </div>

                                <p className="text-muted mt-5 line-clamp-4 text-sm leading-6">
                                    {partner.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {partner.industries.map((industry) => (
                                        <span
                                            className="bg-background text-muted rounded-md px-3 py-1.5 text-xs font-semibold"
                                            key={industry.key}
                                        >
                                            {industry.label}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                                    <span className="text-success text-sm font-extrabold">
                                        {partner.vacanciesCount} вакансій
                                    </span>
                                    <span className="text-primary group-hover:text-success inline-flex items-center gap-2 text-sm font-extrabold transition-colors">
                                        Детальніше
                                        <HiArrowRight
                                            className="size-4 transition-transform group-hover:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </Section>
    )
}
