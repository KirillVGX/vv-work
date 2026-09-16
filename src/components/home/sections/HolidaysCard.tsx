import { HiCalendarDays } from 'react-icons/hi2'

import { fetchUpcomingHolidays } from '@/api'
import { ErrorBlock } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'

const holidayDateFormatter = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'short',
})

function formatHolidayDate(date: string) {
    return holidayDateFormatter
        .format(new Date(date))
        .replace('.', '')
        .replace('Sept', 'вер')
}

function HolidaysCardSkeleton() {
    return (
        <div className="mt-5 grid">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    className="border-white/10 py-4 not-last:border-b"
                    key={index}
                >
                    <div className="h-12 animate-pulse rounded-md bg-white/10" />
                </div>
            ))}
        </div>
    )
}

export function HolidaysCard() {
    const { load: loadHolidays, state } = useApiResource(fetchUpcomingHolidays)

    return (
        <article className="bg-panel-dark rounded-3xl p-10 text-white shadow-[0_22px_50px_rgba(9,11,8,0.14)]">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <HiCalendarDays className="size-6" />
                </span>
                <div className="min-w-0">
                    <h2 className="text-xl leading-6 font-extrabold text-white">
                        Свята в Європі
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-white/62">
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
                <div className="grid">
                    {state.data.map((holiday) => (
                        <div
                            className="flex items-center justify-between gap-5 border-b border-white/10 py-4 text-sm last:border-b-0 last:pb-0"
                            key={`${holiday.countryKey}-${holiday.date}`}
                        >
                            <div className="flex min-w-0 items-center gap-4">
                                <img
                                    alt=""
                                    aria-hidden="true"
                                    className="size-11 shrink-0 rounded-full border-2 border-white/35 object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
                                    height={44}
                                    loading="lazy"
                                    src={`https://flagcdn.com/w80/${holiday.countryCode}.png`}
                                    width={44}
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-base leading-5 font-extrabold text-white">
                                        {holiday.countryLabel}
                                    </p>
                                    <p className="mt-0.5 truncate text-base leading-5 text-white/62">
                                        {holiday.title}
                                    </p>
                                </div>
                            </div>
                            <span className="shrink-0 rounded-xl bg-accent px-4 py-2 text-sm leading-5 font-extrabold text-primary">
                                {formatHolidayDate(holiday.date)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </article>
    )
}
