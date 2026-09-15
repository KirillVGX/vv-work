import { VacancyGridSkeleton } from '@/components/home'

export function PartnerPageLoading() {
    return (
        <div className="grid gap-10">
            <PartnerInfoSkeleton />
            <VacanciesBlockHeaderSkeleton />
            <VacancyGridSkeleton count={8} />
        </div>
    )
}

function PartnerInfoSkeleton() {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
                <div className="bg-border h-4 w-32 animate-pulse rounded-md" />
                <div className="mt-4 flex items-center gap-4">
                    <div className="bg-border size-14 animate-pulse rounded-md" />
                    <div className="flex-1">
                        <div className="bg-border h-12 w-full max-w-md animate-pulse rounded-md" />
                        <div className="bg-border mt-3 h-4 w-48 animate-pulse rounded-md" />
                    </div>
                </div>
                <div className="bg-border mt-6 h-5 w-full max-w-2xl animate-pulse rounded-md" />
                <div className="bg-border mt-3 h-5 w-full max-w-xl animate-pulse rounded-md" />
                <div className="bg-border mt-3 h-5 w-full max-w-lg animate-pulse rounded-md" />
            </div>

            <aside className="border-border bg-surface rounded-md border p-6">
                <div className="bg-border h-6 w-28 animate-pulse rounded-md" />
                <div className="mt-5 grid gap-4">
                    <PartnerInfoSkeletonRow />
                    <PartnerInfoSkeletonRow />
                    <div>
                        <div className="bg-border h-4 w-20 animate-pulse rounded-md" />
                        <div className="mt-2 flex flex-wrap gap-2">
                            <div className="bg-border h-7 w-24 animate-pulse rounded-md" />
                            <div className="bg-border h-7 w-28 animate-pulse rounded-md" />
                            <div className="bg-border h-7 w-20 animate-pulse rounded-md" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

function PartnerInfoSkeletonRow() {
    return (
        <div>
            <div className="bg-border h-4 w-20 animate-pulse rounded-md" />
            <div className="bg-border mt-2 h-5 w-36 animate-pulse rounded-md" />
        </div>
    )
}

function VacanciesBlockHeaderSkeleton() {
    return (
        <div>
            <div className="bg-border h-4 w-32 animate-pulse rounded-md" />
            <div className="bg-border mt-2 h-9 w-72 animate-pulse rounded-md" />
        </div>
    )
}
