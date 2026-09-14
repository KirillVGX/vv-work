import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi2'
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
            {vacanciesState.status === 'success' && (
                <VacancyGrid vacancies={visibleVacancies.slice(0, 4)} />
            )}
        </div>
    )
}
