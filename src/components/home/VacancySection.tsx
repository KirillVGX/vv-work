import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiArrowRight, HiMagnifyingGlass } from 'react-icons/hi2'
import { Link } from 'react-router'

import { fetchVacancies } from '@/api'
import { ErrorBlock } from '@/components/ui'
import { routePaths } from '@/routePaths'
import type { CategoryKey, CountryKey, Vacancy } from '@/types'

import {
    VacancyGrid,
    VacancyGridSkeleton,
} from './VacancyGrid'

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

    const displayedVacancies = useMemo(
        () => visibleVacancies.slice(0, 4),
        [visibleVacancies]
    )

    return (
        <div>
            <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-primary text-3xl font-bold">
                    Актуальні вакансії
                </h2>
                <Link
                    className="text-success hidden items-center gap-2 text-sm font-semibold md:flex"
                    to={routePaths.contacts}
                >
                    Переглянути всі
                    <HiArrowRight
                        aria-hidden="true"
                        className="size-4"
                    />
                </Link>
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
                <VacancyGrid vacancies={displayedVacancies} />
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
