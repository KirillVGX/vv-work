import {
    HiArrowRight,
    HiBookmark,
    HiBriefcase,
    HiMapPin,
} from 'react-icons/hi2'

import { cn } from '@/components/ui/utils'
import type { Vacancy } from '@/types/domain'

import { MatchBadge } from './MatchBadge'

type VacancyCardProps = {
    vacancy: Vacancy
}

const logoToneClasses: Record<Vacancy['logoTone'], string> = {
    dark: 'bg-primary text-white',
    blue: 'bg-blue-50 text-sky-600',
    cyan: 'bg-cyan-50 text-sky-700',
    lime: 'bg-accent/25 text-success',
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
    return (
        <article className="border-border bg-surface flex min-h-[13.25rem] flex-col rounded-md border p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                    <span
                        className={cn(
                            'flex size-10 shrink-0 items-center justify-center rounded-md text-lg font-bold',
                            logoToneClasses[vacancy.logoTone]
                        )}
                    >
                        {vacancy.logo}
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-primary truncate text-sm font-bold">
                            {vacancy.title}
                        </h3>
                        <p className="text-muted mt-1 truncate text-sm">
                            {vacancy.company}
                        </p>
                    </div>
                </div>
                <HiBookmark
                    aria-hidden="true"
                    className="text-muted size-5 shrink-0"
                />
            </div>

            <div className="text-muted mt-4 grid gap-2 text-sm">
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
                        className="size-4"
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

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <p className="text-success text-lg font-bold">
                    {vacancy.salary}
                </p>
                <HiArrowRight
                    aria-hidden="true"
                    className="text-muted size-5"
                />
            </div>
        </article>
    )
}
