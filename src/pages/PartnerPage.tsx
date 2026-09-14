import { useCallback, useEffect, useState } from 'react'
import { HiBriefcase } from 'react-icons/hi2'
import { useParams } from 'react-router'

import {
    fetchPartnerBySlug,
    fetchVacanciesByPartnerSlug,
} from '@/api'
import {
    VacancyGrid,
    VacancyGridSkeleton,
} from '@/components/home'
import { Container, ErrorBlock, Section } from '@/components/ui'
import type { Partner, Vacancy } from '@/types'

type PartnerPageState =
    | {
          status: 'loading'
      }
    | {
          status: 'success'
          partner: Partner
          vacancies: Vacancy[]
      }
    | {
          status: 'error'
          message: string
      }

export function PartnerPage() {
    const { slug } = useParams()
    const [pageState, setPageState] = useState<PartnerPageState>({
        status: 'loading',
    })

    const loadPartnerPage = useCallback(
        async (options?: {
            isStale?: () => boolean
            showLoading?: boolean
        }) => {
            if (!slug) {
                setPageState({
                    status: 'error',
                    message: 'Партнера не знайдено',
                })
                return
            }

            if (options?.showLoading) {
                setPageState({ status: 'loading' })
            }

            const [partnerResponse, vacanciesResponse] = await Promise.all([
                fetchPartnerBySlug(slug),
                fetchVacanciesByPartnerSlug(slug),
            ])

            if (options?.isStale?.()) {
                return
            }

            if (!partnerResponse.ok) {
                setPageState({
                    status: 'error',
                    message: partnerResponse.error.message,
                })
                return
            }

            if (!vacanciesResponse.ok) {
                setPageState({
                    status: 'error',
                    message: vacanciesResponse.error.message,
                })
                return
            }

            setPageState({
                status: 'success',
                partner: partnerResponse.data,
                vacancies: vacanciesResponse.data,
            })
        },
        [slug]
    )

    useEffect(() => {
        let shouldIgnore = false

        void loadPartnerPage({
            isStale: () => shouldIgnore,
        })

        return () => {
            shouldIgnore = true
        }
    }, [loadPartnerPage])

    return (
        <Section spacing="lg">
            <Container>
                {pageState.status === 'loading' && <PartnerPageLoading />}
                {pageState.status === 'error' && (
                    <ErrorBlock
                        title="Не вдалося завантажити сторінку партнера"
                        message={pageState.message}
                        minHeightClassName="min-h-[18rem]"
                        onRetry={() =>
                            void loadPartnerPage({
                                showLoading: true,
                            })
                        }
                    />
                )}
                {pageState.status === 'success' && (
                    <PartnerPageContent
                        partner={pageState.partner}
                        vacancies={pageState.vacancies}
                    />
                )}
            </Container>
        </Section>
    )
}

function PartnerPageLoading() {
    return (
        <div className="grid gap-10">
            <PartnerInfoSkeleton />
            <VacanciesBlockHeaderSkeleton />
            <VacancyGridSkeleton count={8} />
        </div>
    )
}

function PartnerPageContent({
    partner,
    vacancies,
}: {
    partner: Partner
    vacancies: Vacancy[]
}) {
    return (
        <div className="grid gap-10">
            <PartnerDetails partner={partner} />
            <section>
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-muted text-sm font-semibold">
                            Вакансії партнера
                        </p>
                        <h2 className="text-primary mt-2 text-3xl font-bold">
                            Актуальні пропозиції
                        </h2>
                    </div>
                    <p className="text-muted hidden text-sm font-semibold md:block">
                        {vacancies.length} вакансій
                    </p>
                </div>

                {vacancies.length > 0 ? (
                    <VacancyGrid vacancies={vacancies} />
                ) : (
                    <PartnerVacanciesEmpty />
                )}
            </section>
        </div>
    )
}

function PartnerDetails({ partner }: { partner: Partner }) {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
                <p className="text-muted text-sm font-semibold">
                    Роботодавець
                </p>
                <div className="mt-4 flex items-center gap-4">
                    <span className="bg-primary text-surface flex size-14 items-center justify-center rounded-md text-2xl font-bold">
                        {partner.logo}
                    </span>
                    <div>
                        <h1 className="text-primary text-4xl font-bold md:text-5xl">
                            {partner.name}
                        </h1>
                        {partner.isVerified && (
                            <p className="text-success mt-2 text-sm font-semibold">
                                Перевірений партнер VV Work
                            </p>
                        )}
                    </div>
                </div>
                <p className="text-muted mt-6 text-lg leading-8">
                    {partner.description}
                </p>
            </div>

            <aside className="border-border bg-surface rounded-md border p-6">
                <p className="text-primary text-lg font-bold">
                    Інформація
                </p>
                <dl className="mt-5 grid gap-4 text-sm">
                    <div>
                        <dt className="text-muted">Локація</dt>
                        <dd className="text-primary mt-1 font-semibold">
                            {partner.city}, {partner.country}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-muted">Вакансії</dt>
                        <dd className="text-primary mt-1 font-semibold">
                            {partner.vacanciesCount}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-muted">Напрями</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                            {partner.industries.map((industry) => (
                                <span
                                    className="bg-background text-muted rounded-md px-3 py-1.5 text-xs font-semibold"
                                    key={industry.key}
                                >
                                    {industry.label}
                                </span>
                            ))}
                        </dd>
                    </div>
                </dl>
            </aside>
        </div>
    )
}

function PartnerVacanciesEmpty() {
    return (
        <div className="border-border bg-surface flex min-h-[13.25rem] flex-col items-start justify-center rounded-md border p-6">
            <span className="bg-accent/25 text-success flex size-11 items-center justify-center rounded-md">
                <HiBriefcase
                    aria-hidden="true"
                    className="size-5"
                />
            </span>
            <h3 className="text-primary mt-4 text-xl font-bold">
                Поки немає відкритих вакансій
            </h3>
            <p className="text-muted mt-2 max-w-xl text-sm leading-6">
                Партнер уже є на платформі, але ще не опублікував активні
                пропозиції. Вакансії з'являться тут після оновлення даних.
            </p>
        </div>
    )
}

function PartnerInfoSkeleton() {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
                <div className="bg-border h-4 w-32 animate-pulse rounded-md" />
                <div className="mt-4 flex items-center gap-4">
                    <div className="bg-border size-14 animate-pulse rounded-md" />
                    <div className="flex-1">
                        <div className="bg-border h-12 w-full max-w-md animate-pulse rounded-md" />
                        <div className="bg-border mt-3 h-4 w-48 animate-pulse rounded-md" />
                    </div>
                </div>
                <div className="bg-border mt-6 h-5 w-full max-w-2xl animate-pulse rounded-md" />
                <div className="bg-border mt-3 h-5 w-full max-w-xl animate-pulse rounded-md" />
                <div className="bg-border mt-3 h-5 w-full max-w-lg animate-pulse rounded-md" />
            </div>

            <aside className="border-border bg-surface rounded-md border p-6">
                <div className="bg-border h-6 w-28 animate-pulse rounded-md" />
                <div className="mt-5 grid gap-4">
                    <PartnerInfoSkeletonRow />
                    <PartnerInfoSkeletonRow />
                    <div>
                        <div className="bg-border h-4 w-20 animate-pulse rounded-md" />
                        <div className="mt-2 flex flex-wrap gap-2">
                            <div className="bg-border h-7 w-24 animate-pulse rounded-md" />
                            <div className="bg-border h-7 w-28 animate-pulse rounded-md" />
                            <div className="bg-border h-7 w-20 animate-pulse rounded-md" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

function PartnerInfoSkeletonRow() {
    return (
        <div>
            <div className="bg-border h-4 w-20 animate-pulse rounded-md" />
            <div className="bg-border mt-2 h-5 w-36 animate-pulse rounded-md" />
        </div>
    )
}

function VacanciesBlockHeaderSkeleton() {
    return (
        <div>
            <div className="bg-border h-4 w-32 animate-pulse rounded-md" />
            <div className="bg-border mt-2 h-9 w-72 animate-pulse rounded-md" />
        </div>
    )
}
