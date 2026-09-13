import type { ReactNode } from 'react'
import { HiChevronDown } from 'react-icons/hi2'

type SearchFieldProps = {
    icon: ReactNode
    label: string
    hasChevron?: boolean
}

export function SearchField({
    icon,
    label,
    hasChevron = false,
}: SearchFieldProps) {
    return (
        <div className="text-muted flex h-14 min-w-0 items-center gap-4 px-6">
            <span className="text-primary shrink-0">{icon}</span>
            <span className="min-w-0 flex-1 truncate text-base">{label}</span>
            {hasChevron && (
                <HiChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0"
                />
            )}
        </div>
    )
}
