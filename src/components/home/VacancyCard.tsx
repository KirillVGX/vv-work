import { memo } from 'react'
import {
    HiArrowRight,
    HiBriefcase,
    HiMapPin,
} from 'react-icons/hi2'
import { Link } from 'react-router'

import { cn } from '@/components/ui/utils'
import { routePaths } from '@/routePaths'
import type { Vacancy } from '@/types/domain'

import { MatchBadge } from './MatchBadge'
import { SavedVacancyButton } from './SavedVacancyButton'

type VacancyCardProps = {
    vacancy: Vacancy
}

const logoToneClasses: Record<Vacancy['logoTone'], string> = {
    dark: 'bg-primary text-white',
    blue: 'bg-blue-50 text-sky-600',
    cyan: 'bg-cyan-50 text-sky-700',
    lime: 'bg-accent/25 text-success',
}

export const VacancyCard = memo(function VacancyCard({
    vacancy,
}: VacancyCardProps) {
    const titleId = `vacancy-${vacancy.id}-title`
    const vacancyPath = routePaths.vacancy.replace(':id', vacancy.id)

    return (
        <article
            aria-labelledby={titleId}
            className="border-border bg-surface hover:border-primary/30 flex min-h-[14.25rem] flex-col rounded-md border p-5 shadow-sm transition-colors"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                    <span
                        aria-hidden="true"
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-md text-lg font-bold',
                            logoToneClasses[vacancy.logoTone]
                        )}
                    >
                        {vacancy.logo}
                    </span>
                    <div className="min-w-0">
                        <h3
                            className="text-primary truncate text-sm font-bold"
                            id={titleId}
                        >
                            {vacancy.title}
                        </h3>
                        <p className="text-muted mt-1 truncate text-sm">
                            {vacancy.company}
                        </p>
                    </div>
                </div>
                <SavedVacancyButton vacancyId={vacancy.id} />
            </div>

            <div className="text-muted mt-4 grid gap-2 text-sm">
                <p className="flex min-w-0 items-center gap-1.5">
                    <HiBriefcase
                        aria-hidden="true"
                        className="size-4 shrink-0"
                    />
                    <span className="truncate">{vacancy.category}</span>
                </p>
                <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-1.5">
                        <HiMapPin
                            aria-hidden="true"
                            className="size-4 shrink-0"
                        />
                        <span className="truncate">{vacancy.location}</span>
                    </span>
                    <MatchBadge>{vacancy.match}</MatchBadge>
                </div>
                <p className="flex items-center gap-1.5">
                    <HiBriefcase
                        aria-hidden="true"
                        className="size-4 shrink-0"
                    />
                    Повна зайнятість
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {vacancy.tags.map((tag) => (
                    <span
                        className="bg-background text-muted rounded-md px-3 py-1.5 text-xs"
                        key={tag}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-success text-lg font-bold">
                    {vacancy.salary}
                </p>
                <Link
                    aria-label={`Переглянути вакансію ${vacancy.title}`}
                    className="text-primary hover:bg-accent focus-visible:outline-accent inline-flex h-9 items-center justify-center gap-2 rounded-md border border-transparent px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    to={vacancyPath}
                >
                    Детальніше
                    <HiArrowRight
                        aria-hidden="true"
                        className="size-4"
                    />
                </Link>
            </div>
        </article>
    )
})
