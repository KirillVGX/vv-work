type MatchBadgeProps = {
    children: string
}

export function MatchBadge({ children }: MatchBadgeProps) {
    return (
        <span className="bg-accent/25 text-success rounded-md px-2 py-1 text-xs font-bold">
            {children}
        </span>
    )
}
