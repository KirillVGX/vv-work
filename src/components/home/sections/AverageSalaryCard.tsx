import { useCallback, useState } from 'react'
import { HiBanknotes } from 'react-icons/hi2'

import { fetchAverageSalary, fetchExchangeRates } from '@/api'
import { ErrorBlock, FilterDropdown } from '@/components/ui'
import { useApiResource } from '@/hooks/useApiResource'
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
    }>(loadSalaryResource)

    return (
        <article className="border-border bg-surface rounded-xl border p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-primary text-2xl font-bold">
                        Середня зарплата
                    </h2>
                    {state.status === 'success' ? (
                        <>
                            <p className="text-primary mt-8 text-5xl font-bold">
                                {formatCurrencyAmount(
                                    convertFromEur(
                                        state.data.salary.amount,
                                        currency,
                                        state.data.rates
                                    ),
                                    currency
                                )}
                                <span className="bg-accent/20 text-success ml-3 rounded-full px-3 py-1 text-sm">
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
                    className="w-32 shrink-0"
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
