import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { fetchPartnerBySlug, fetchVacanciesByPartnerSlug } from '@/api'
import { PartnerPageContent, PartnerPageLoading } from '@/components/partner'
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

        // oxlint-disable-next-line react/set-state-in-effect
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
