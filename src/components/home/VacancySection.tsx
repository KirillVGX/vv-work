import { useEffect, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router'

import { fetchVacancies } from '@/api'
import { routePaths } from '@/routePaths'
import type { Vacancy } from '@/types'

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

export function VacancySection() {
    const [vacanciesState, setVacanciesState] = useState<VacanciesState>({
        status: 'loading',
    })

    useEffect(() => {
        let shouldIgnore = false

        async function loadVacancies() {
            setVacanciesState({ status: 'loading' })

            const response = await fetchVacancies()

            if (shouldIgnore) {
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
        }

        void loadVacancies()

        return () => {
            shouldIgnore = true
        }
    }, [])

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
                <div className="border-border bg-surface min-h-[13.25rem] rounded-md border p-5">
                    <p className="text-primary font-bold">
                        Не вдалося завантажити вакансії
                    </p>
                    <p className="text-muted mt-2 text-sm">
                        {vacanciesState.message}
                    </p>
                </div>
            )}
            {vacanciesState.status === 'success' && (
                <VacancyGrid vacancies={vacanciesState.vacancies.slice(0, 4)} />
            )}
        </div>
    )
}
