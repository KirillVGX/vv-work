import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { fetchPartnerBySlug } from '@/api'
import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'
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

    useEffect(() => {
        let shouldIgnore = false

        async function loadPartner() {
            if (!slug) {
                setPartnerState({
                    status: 'error',
                    message: 'Партнера не знайдено',
                })
                return
            }

            setPartnerState({ status: 'loading' })

            const response = await fetchPartnerBySlug(slug)

            if (shouldIgnore) {
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
        }

        void loadPartner()

        return () => {
            shouldIgnore = true
        }
    }, [slug])

    return (
        <Section spacing="lg">
            <Container>
                {partnerState.status === 'loading' && <PartnerLoading />}
                {partnerState.status === 'error' && (
                    <PartnerError message={partnerState.message} />
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
        <div className="max-w-3xl">
            <div className="bg-border h-4 w-32 animate-pulse rounded-md" />
            <div className="bg-border mt-5 h-14 w-full max-w-xl animate-pulse rounded-md" />
            <div className="bg-border mt-5 h-5 w-full max-w-2xl animate-pulse rounded-md" />
            <div className="bg-border mt-3 h-5 w-full max-w-lg animate-pulse rounded-md" />
        </div>
    )
}

function PartnerError({ message }: { message: string }) {
    return (
        <div className="border-border bg-surface max-w-xl rounded-md border p-6">
            <p className="text-muted text-sm font-semibold">
                Роботодавець
            </p>
            <h1 className="text-primary mt-3 text-3xl font-bold">
                Не вдалося завантажити партнера
            </h1>
            <p className="text-muted mt-4 text-base">
                {message}
            </p>
            <Link
                className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent mt-6 inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                to={routePaths.home}
            >
                На головну
            </Link>
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
