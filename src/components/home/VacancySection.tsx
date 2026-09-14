import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { fetchVacancies } from '@/api'
import { ErrorBlock, Pagination } from '@/components/ui'
import type { CategoryKey, CountryKey, Vacancy } from '@/types'

import { categories } from './homeData'
import { VacancyGrid, VacancyGridSkeleton } from './VacancyGrid'

const VACANCIES_PER_PAGE = 32

function getFiltersKey({
    searchQuery,
    selectedCategory,
    selectedCountry,
}: {
    searchQuery: string
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
}) {
    return `${selectedCategory}:${selectedCountry}:${searchQuery.trim().toLowerCase()}`
}

type VacanciesState =
    | {
          status: 'loading'
      }
    | {
          status: 'success'
          vacancies: Vacancy[]
      }
    | {
          status: 'error'
          message: string
      }

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
    const [vacanciesState, setVacanciesState] = useState<VacanciesState>({
        status: 'loading',
    })
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)

    const loadVacancies = useCallback(async (options?: {
        isStale?: () => boolean
        showLoading?: boolean
    }) => {
        if (options?.showLoading) {
            setVacanciesState({ status: 'loading' })
        }

        const response = await fetchVacancies()

        if (options?.isStale?.()) {
            return
        }

        if (response.ok) {
            setVacanciesState({
                status: 'success',
                vacancies: response.data,
            })
            return
        }

        setVacanciesState({
            status: 'error',
            message: response.error.message,
        })
    }, [])

    useEffect(() => {
        let shouldIgnore = false

        // oxlint-disable-next-line react/set-state-in-effect
        void loadVacancies({
            isStale: () => shouldIgnore,
        })

        return () => {
            shouldIgnore = true
        }
    }, [loadVacancies])

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            // oxlint-disable-next-line react/set-state-in-effect
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

        const normalizedSearchQuery = debouncedSearchQuery.trim().toLowerCase()

        return vacanciesState.vacancies.filter(
            (vacancy) =>
                (!selectedCategory ||
                    vacancy.categoryKey === selectedCategory) &&
                (!selectedCountry || vacancy.countryKey === selectedCountry) &&
                (!normalizedSearchQuery ||
                    vacancy.title.toLowerCase().includes(normalizedSearchQuery))
        )
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
    const totalPages = Math.ceil(visibleVacancies.length / VACANCIES_PER_PAGE)

    const displayedVacancies = useMemo(() => {
        const startIndex = (currentPage - 1) * VACANCIES_PER_PAGE

        return visibleVacancies.slice(
            startIndex,
            startIndex + VACANCIES_PER_PAGE
        )
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
        <div id="vacancies" className="scroll-mt-24">
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
                    onRetry={() =>
                        void loadVacancies({
                            showLoading: true,
                        })
                    }
                />
            )}
            {vacanciesState.status === 'success' &&
                visibleVacancies.length === 0 && <VacancyEmptyState />}
            {vacanciesState.status === 'success' && visibleVacancies.length > 0 && (
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
                <HiMagnifyingGlass aria-hidden="true" className="size-5" />
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
