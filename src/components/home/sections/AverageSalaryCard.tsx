import { useCallback, useState } from 'react'
import { HiBanknotes } from 'react-icons/hi2'

import { fetchAverageSalary, fetchExchangeRates } from '@/api'
import { ErrorBlock, FilterDropdown } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'
import { useInView } from '@/hooks/useInView'
import type { AverageSalary, CurrencyCode, ExchangeRates } from '@/types'

import {
    CURRENCY_OPTIONS,
    convertFromEur,
    formatCurrencyAmount,
} from './currency'
import { SalaryChart } from './SalaryChart'

function SalaryChartSkeleton() {
    return <div className="mt-8 h-28 animate-pulse rounded-lg bg-slate-100" />
}

export function AverageSalaryCard() {
    const { ref, isInView } = useInView<HTMLElement>()
    const [currency, setCurrency] = useState<CurrencyCode>('EUR')

    const loadSalaryResource = useCallback(async () => {
        const [salaryResponse, ratesResponse] = await Promise.all([
            fetchAverageSalary(),
            fetchExchangeRates(),
        ])

        if (!salaryResponse.ok) {
            return salaryResponse
        }

        if (!ratesResponse.ok) {
            return ratesResponse
        }

        return {
            ok: true,
            data: {
                salary: salaryResponse.data,
                rates: ratesResponse.data,
            },
        } as const
    }, [])

    const { load: loadSalary, state } = useApiResource<{
        salary: AverageSalary
        rates: ExchangeRates
    }>(loadSalaryResource, { enabled: isInView })

    return (
        <article
            className="border-border bg-surface overflow-hidden rounded-xl border p-5 shadow-sm sm:p-8"
            ref={ref}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h2 className="text-primary text-xl font-bold sm:text-2xl">
                        Середня зарплата
                    </h2>
                    {state.status === 'success' ? (
                        <>
                            <p className="text-primary mt-7 flex flex-wrap items-center gap-3 text-4xl leading-none font-bold sm:mt-8 sm:text-5xl">
                                {formatCurrencyAmount(
                                    convertFromEur(
                                        state.data.salary.amount,
                                        currency,
                                        state.data.rates
                                    ),
                                    currency
                                )}
                                <span className="bg-accent/20 text-success rounded-full px-3 py-1 text-sm leading-5">
                                    {state.data.salary.changePercent > 0
                                        ? '+'
                                        : ''}
                                    {state.data.salary.changePercent}%
                                </span>
                            </p>
                            <p className="text-muted mt-3 text-sm">
                                Річна нетто-зарплата в ЄС за{' '}
                                {state.data.salary.year} рік · дані Eurostat
                            </p>
                        </>
                    ) : (
                        <div className="mt-8 h-14 w-48 animate-pulse rounded-md bg-slate-100" />
                    )}
                </div>
                <FilterDropdown
                    className="w-full shrink-0 sm:w-32"
                    icon={
                        <HiBanknotes
                            aria-hidden="true"
                            className="size-4"
                        />
                    }
                    label="Валюта"
                    onChange={setCurrency}
                    options={CURRENCY_OPTIONS.map((option) => ({
                        label: option.label,
                        value: option.code,
                    }))}
                    size="sm"
                    value={currency}
                />
            </div>
            {state.status === 'loading' && <SalaryChartSkeleton />}
            {state.status === 'error' && (
                <div className="mt-8">
                    <ErrorBlock
                        message={state.message}
                        minHeightClassName="min-h-28"
                        onRetry={loadSalary}
                        title="Не вдалося завантажити дані про зарплати"
                    />
                </div>
            )}
            {state.status === 'success' && (
                <SalaryChart
                    currency={currency}
                    points={state.data.salary.points}
                    rates={state.data.rates}
                />
            )}
        </article>
    )
}
