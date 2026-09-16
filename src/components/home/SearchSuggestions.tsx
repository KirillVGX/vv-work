import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router'

import { routePaths } from '@/routePaths'
import type { Vacancy } from '@/types'

import { splitTitleAtMatch } from './vacancySectionUtils'

export function SearchSuggestions({
    searchQuery,
    suggestions,
    onSelect,
}: {
    searchQuery: string
    suggestions: Vacancy[]
    onSelect: () => void
}) {
    const navigate = useNavigate()

    return (
        <div
            className="border-border bg-surface absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 rounded-xl border p-1.5 shadow-[0_16px_34px_rgba(23,33,43,0.12)]"
            role="listbox"
            aria-label="Пропозиції вакансій"
        >
            {suggestions.map((vacancy) => {
                const { before, match, after } = splitTitleAtMatch(
                    vacancy.title,
                    searchQuery
                )

                return (
                    <button
                        className="text-muted flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-[#f4f7f1]"
                        key={vacancy.id}
                        onClick={() => {
                            onSelect()
                            navigate(
                                routePaths.vacancy.replace(':id', vacancy.id)
                            )
                        }}
                        role="option"
                        aria-selected="false"
                        type="button"
                    >
                        <HiMagnifyingGlass
                            aria-hidden="true"
                            className="text-muted size-4 shrink-0"
                        />
                        <span className="min-w-0 flex-1 truncate">
                            <span className="text-primary font-semibold">
                                {before}
                                <span className="text-accent">{match}</span>
                                {after}
                            </span>
                            <span className="text-muted"> · {vacancy.company}</span>
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
