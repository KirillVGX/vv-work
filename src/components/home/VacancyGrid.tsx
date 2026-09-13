import type { Vacancy } from '@/types/domain'

import { VacancyCard } from './VacancyCard'
import { VacancyCardSkeleton } from './VacancyCardSkeleton'

type VacancyGridProps = {
    vacancies: Vacancy[]
}

export function VacancyGrid({ vacancies }: VacancyGridProps) {
    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {vacancies.map((vacancy) => (
                <VacancyCard
                    vacancy={vacancy}
                    key={`${vacancy.title}-${vacancy.location}`}
                />
            ))}
        </div>
    )
}

export function VacancyGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: count }, (_, index) => (
                <VacancyCardSkeleton key={index} />
            ))}
        </div>
    )
}
