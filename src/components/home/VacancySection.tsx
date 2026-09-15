import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { fetchVacancies } from '@/api'
import { ErrorBlock, Pagination } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'
import type { CategoryKey, CountryKey } from '@/types'

import { categories } from '@/data/homeData'
import {
    filterVacancies,
    getFiltersKey,
    getPaginatedVacancies,
    getTotalVacancyPages,
} from './vacancySectionUtils'
import { VacancyGrid, VacancyGridSkeleton } from './VacancyGrid'

type VacancySectionProps = {
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
    searchQuery: string
}

export function VacancySection({
    selectedCategory,
    selectedCountry,
    searchQuery,
}: VacancySectionProps) {
    const [pageState, setPageState] = useState({
        currentPage: 1,
        filtersKey: '',
    })
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState(searchQuery)
    const { load: loadVacancies, state: vacanciesState } =
        useApiResource(fetchVacancies)

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 350)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [searchQuery])

    const visibleVacancies = useMemo(() => {
        if (vacanciesState.status !== 'success') {
            return []
        }

        return filterVacancies({
            searchQuery: debouncedSearchQuery,
            selectedCategory,
            selectedCountry,
            vacancies: vacanciesState.data,
        })
    }, [
        debouncedSearchQuery,
        selectedCategory,
        selectedCountry,
        vacanciesState,
    ])

    const filtersKey = getFiltersKey({
        searchQuery: debouncedSearchQuery,
        selectedCategory,
        selectedCountry,
    })
    const currentPage =
        pageState.filtersKey === filtersKey ? pageState.currentPage : 1
    const totalPages = getTotalVacancyPages(visibleVacancies.length)

    const displayedVacancies = useMemo(() => {
        return getPaginatedVacancies(visibleVacancies, currentPage)
    }, [currentPage, visibleVacancies])

    const selectedCategoryLabel = useMemo(
        () =>
            categories.find((category) => category.key === selectedCategory)
                ?.label,
        [selectedCategory]
    )

    const totalCount =
        vacanciesState.status === 'success' ? visibleVacancies.length : null

    const handlePageChange = useCallback(
        (page: number) => {
            setPageState({
                currentPage: page,
                filtersKey,
            })

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
        [filtersKey]
    )

    return (
        <div
            id="vacancies"
            className="scroll-mt-24"
        >
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-primary text-3xl font-bold">
                        Актуальні вакансії
                    </h2>
                    {selectedCategoryLabel && (
                        <p className="text-muted mt-2 text-sm">
                            Активний фільтр:{' '}
                            <span className="text-primary font-semibold">
                                {selectedCategoryLabel}
                            </span>
                        </p>
                    )}
                </div>
                {totalCount !== null && (
                    <p className="text-muted shrink-0 text-sm font-semibold">
                        Усього {totalCount} вакансій
                    </p>
                )}
            </div>

            {vacanciesState.status === 'loading' && <VacancyGridSkeleton />}
            {vacanciesState.status === 'error' && (
                <ErrorBlock
                    title="Не вдалося завантажити вакансії"
                    message={vacanciesState.message}
                    onRetry={loadVacancies}
                />
            )}
            {vacanciesState.status === 'success' &&
                visibleVacancies.length === 0 && <VacancyEmptyState />}
            {vacanciesState.status === 'success' &&
                visibleVacancies.length > 0 && (
                    <>
                        <VacancyGrid vacancies={displayedVacancies} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
        </div>
    )
}

function VacancyEmptyState() {
    return (
        <div className="border-border bg-surface flex min-h-[14.25rem] flex-col items-start justify-center rounded-md border p-6">
            <span className="bg-accent/25 text-success flex size-11 items-center justify-center rounded-md">
                <HiMagnifyingGlass
                    aria-hidden="true"
                    className="size-5"
                />
            </span>
            <h3 className="text-primary mt-4 text-xl font-bold">
                Вакансії не знайдено
            </h3>
            <p className="text-muted mt-2 max-w-xl text-sm leading-6">
                Спробуйте змінити запит, країну або категорію, щоб побачити
                більше пропозицій.
            </p>
        </div>
    )
}
