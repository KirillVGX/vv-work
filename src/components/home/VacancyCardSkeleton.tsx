function SkeletonBlock({ className }: { className: string }) {
    return (
        <span
            className={`bg-border block animate-pulse rounded-md ${className}`}
        />
    )
}

export function VacancyCardSkeleton() {
    return (
        <article className="border-border bg-surface flex min-h-[13.25rem] flex-col rounded-md border p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 gap-4">
                    <SkeletonBlock className="size-10 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <SkeletonBlock className="h-4 w-3/4" />
                        <SkeletonBlock className="mt-2 h-4 w-1/2" />
                    </div>
                </div>
                <SkeletonBlock className="size-5 shrink-0" />
            </div>

            <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between gap-3">
                    <SkeletonBlock className="h-4 flex-1" />
                    <SkeletonBlock className="h-6 w-20" />
                </div>
                <SkeletonBlock className="h-4 w-2/3" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <SkeletonBlock className="h-7 w-16" />
                <SkeletonBlock className="h-7 w-20" />
                <SkeletonBlock className="h-7 w-14" />
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <SkeletonBlock className="h-6 w-32" />
                <SkeletonBlock className="size-5" />
            </div>
        </article>
    )
}
