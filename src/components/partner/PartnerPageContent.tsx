import { useCallback, useMemo, useState } from 'react'
import { HiBriefcase } from 'react-icons/hi2'

import { VacancyGrid } from '@/components/home'
import { Pagination } from '@/components/ui'
import type { Partner, Vacancy } from '@/types'

import { PartnerDetails } from './PartnerDetails'

const PARTNER_VACANCIES_PER_PAGE = 24

export function PartnerPageContent({
    partner,
    vacancies,
}: {
    partner: Partner
    vacancies: Vacancy[]
}) {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(vacancies.length / PARTNER_VACANCIES_PER_PAGE)
    const displayedVacancies = useMemo(() => {
        const startIndex = (currentPage - 1) * PARTNER_VACANCIES_PER_PAGE

        return vacancies.slice(
            startIndex,
            startIndex + PARTNER_VACANCIES_PER_PAGE
        )
    }, [currentPage, vacancies])

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

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
                    <>
                        <VacancyGrid vacancies={displayedVacancies} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <PartnerVacanciesEmpty />
                )}
            </section>
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
