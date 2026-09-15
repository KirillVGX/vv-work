import { HiCalendarDays } from 'react-icons/hi2'

import { fetchUpcomingHolidays } from '@/api'
import { ErrorBlock } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'

const holidayDateFormatter = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

function HolidaysCardSkeleton() {
    return (
        <div className="mt-7 grid gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    className="h-[3.25rem] animate-pulse rounded-md bg-slate-100"
                    key={index}
                />
            ))}
        </div>
    )
}

export function HolidaysCard() {
    const { load: loadHolidays, state } = useApiResource(fetchUpcomingHolidays)

    return (
        <article className="border-border bg-surface rounded-xl border p-8 shadow-sm">
            <div className="flex gap-4">
                <span className="bg-accent/20 text-success flex size-12 items-center justify-center rounded-lg">
                    <HiCalendarDays className="size-6" />
                </span>
                <div>
                    <h2 className="text-primary text-2xl font-bold">
                        Свята в Європі
                    </h2>
                    <p className="text-muted mt-1 text-sm">
                        Найближчі офіційні вихідні дні · дані Nager.Date
                    </p>
                </div>
            </div>
            {state.status === 'loading' && <HolidaysCardSkeleton />}
            {state.status === 'error' && (
                <div className="mt-7">
                    <ErrorBlock
                        message={state.message}
                        minHeightClassName="min-h-[13rem]"
                        onRetry={loadHolidays}
                        title="Не вдалося завантажити свята"
                    />
                </div>
            )}
            {state.status === 'success' && (
                <div className="mt-7 grid gap-3">
                    {state.data.map((holiday) => (
                        <div
                            className="border-border flex items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm"
                            key={`${holiday.countryKey}-${holiday.date}`}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <img
                                    alt=""
                                    aria-hidden="true"
                                    className="border-border size-9 shrink-0 rounded-full border object-cover"
                                    height={36}
                                    loading="lazy"
                                    src={`https://flagcdn.com/w80/${holiday.countryCode}.png`}
                                    width={36}
                                />
                                <div className="min-w-0">
                                    <p className="text-primary truncate font-semibold">
                                        {holiday.countryLabel}
                                    </p>
                                    <p className="text-muted text-xs">
                                        {holidayDateFormatter.format(
                                            new Date(holiday.date)
                                        )}
                                    </p>
                                </div>
                            </div>
                            <span className="text-primary text-right font-medium">
                                {holiday.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </article>
    )
}
