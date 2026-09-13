import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { fetchPartnerBySlug } from '@/api'
import { Container, ErrorBlock, Section } from '@/components/ui'
import type { Partner } from '@/types'

type PartnerState =
    | {
          status: 'loading'
      }
    | {
          status: 'success'
          partner: Partner
      }
    | {
          status: 'error'
          message: string
      }

export function PartnerPage() {
    const { slug } = useParams()
    const [partnerState, setPartnerState] = useState<PartnerState>({
        status: 'loading',
    })

    const loadPartner = useCallback(
        async (options?: {
            isStale?: () => boolean
            showLoading?: boolean
        }) => {
            if (!slug) {
                setPartnerState({
                    status: 'error',
                    message: 'Партнера не знайдено',
                })
                return
            }

            if (options?.showLoading) {
                setPartnerState({ status: 'loading' })
            }

            const response = await fetchPartnerBySlug(slug)

            if (options?.isStale?.()) {
                return
            }

            if (response.ok) {
                setPartnerState({
                    status: 'success',
                    partner: response.data,
                })
                return
            }

            setPartnerState({
                status: 'error',
                message: response.error.message,
            })
        },
        [slug]
    )

    useEffect(() => {
        let shouldIgnore = false

        // oxlint-disable-next-line react/set-state-in-effect
        void loadPartner({
            isStale: () => shouldIgnore,
        })

        return () => {
            shouldIgnore = true
        }
    }, [loadPartner])

    return (
        <Section spacing="lg">
            <Container>
                {partnerState.status === 'loading' && <PartnerLoading />}
                {partnerState.status === 'error' && (
                    <PartnerError
                        message={partnerState.message}
                        onRetry={() =>
                            void loadPartner({
                                showLoading: true,
                            })
                        }
                    />
                )}
                {partnerState.status === 'success' && (
                    <PartnerDetails partner={partnerState.partner} />
                )}
            </Container>
        </Section>
    )
}

function PartnerLoading() {
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

function PartnerError({
    message,
    onRetry,
}: {
    message: string
    onRetry: () => void
}) {
    return (
        <ErrorBlock
            title="Не вдалося завантажити партнера"
            message={message}
            minHeightClassName="min-h-[18rem]"
            onRetry={onRetry}
        />
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
