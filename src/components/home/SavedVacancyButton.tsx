import { useCallback, useEffect, useState } from 'react'
import { HiBookmark } from 'react-icons/hi2'

import { cn } from '@/components/ui/utils'

const SAVED_VACANCIES_STORAGE_KEY = 'vv-work:saved-vacancies'

function getSavedVacancyIds() {
    try {
        const value = window.localStorage.getItem(SAVED_VACANCIES_STORAGE_KEY)

        if (!value) {
            return []
        }

        const parsedValue: unknown = JSON.parse(value)

        return Array.isArray(parsedValue)
            ? parsedValue.filter((item): item is string => typeof item === 'string')
            : []
    } catch {
        return []
    }
}

function saveVacancyIds(ids: string[]) {
    window.localStorage.setItem(
        SAVED_VACANCIES_STORAGE_KEY,
        JSON.stringify(ids)
    )
}

export function SavedVacancyButton({
    className,
    vacancyId,
}: {
    className?: string
    vacancyId: string
}) {
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        setIsSaved(getSavedVacancyIds().includes(vacancyId))
    }, [vacancyId])

    const toggleSaved = useCallback(() => {
        const savedIds = getSavedVacancyIds()
        const nextSavedIds = savedIds.includes(vacancyId)
            ? savedIds.filter((id) => id !== vacancyId)
            : [...savedIds, vacancyId]

        saveVacancyIds(nextSavedIds)
        setIsSaved(nextSavedIds.includes(vacancyId))
    }, [vacancyId])

    return (
        <button
            aria-label={
                isSaved ? 'Прибрати вакансію зі збережених' : 'Зберегти вакансію'
            }
            aria-pressed={isSaved}
            className={cn(
                'text-muted hover:text-primary focus-visible:outline-accent inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                isSaved && 'text-primary',
                className
            )}
            type="button"
            onClick={toggleSaved}
        >
            <HiBookmark
                aria-hidden="true"
                className="size-5"
            />
        </button>
    )
}
