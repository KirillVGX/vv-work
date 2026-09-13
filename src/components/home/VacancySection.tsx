import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router'

import { routePaths } from '@/routePaths'

import { vacancies } from './homeData'
import { VacancyGrid } from './VacancyGrid'

export function VacancySection() {
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

            <VacancyGrid vacancies={vacancies} />
        </div>
    )
}
