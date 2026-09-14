import type { ReactNode } from 'react'

type SearchFieldProps = {
    icon: ReactNode
    label: string
    value: string
    onChange: (value: string) => void
}

export function SearchField({
    icon,
    label,
    value,
    onChange,
}: SearchFieldProps) {
    return (
        <label className="text-muted flex h-14 min-w-0 items-center gap-4 px-6">
            <span className="text-primary shrink-0">{icon}</span>
            <input
                className="placeholder:text-muted text-primary h-full min-w-0 flex-1 bg-transparent text-base outline-none"
                type="search"
                value={value}
                placeholder={label}
                aria-label={label}
                onChange={(event) => onChange(event.target.value)}
            />
        </label>
    )
}
