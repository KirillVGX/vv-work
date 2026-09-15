import { act, useEffect } from 'react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
    filterVacancies,
    VACANCY_SEARCH_DEBOUNCE_MS,
} from '@/components/home/vacancySectionUtils'
import type { Vacancy } from '@/types'
import { useDebouncedValue } from './useDebouncedValue'

type ProbeProps<TValue> = {
    delayMs: number
    onValue: (value: TValue) => void
    value: TValue
}

function DebouncedValueProbe<TValue>({
    delayMs,
    onValue,
    value,
}: ProbeProps<TValue>) {
    const debouncedValue = useDebouncedValue(value, delayMs)

    useEffect(() => {
        onValue(debouncedValue)
    }, [debouncedValue, onValue])

    return null
}

type SearchProbeProps = {
    onResults: (vacancyIds: string[]) => void
    query: string
}

const vacancies = [
    createVacancy({
        id: 'welder',
        title: 'Welder',
    }),
    createVacancy({
        id: 'driver',
        title: 'Truck Driver',
        categoryKey: 'drivers',
    }),
    createVacancy({
        id: 'developer',
        title: 'Frontend Developer',
        categoryKey: 'it',
    }),
]

function DebouncedSearchProbe({ onResults, query }: SearchProbeProps) {
    const debouncedQuery = useDebouncedValue(
        query,
        VACANCY_SEARCH_DEBOUNCE_MS
    )

    useEffect(() => {
        onResults(
            filterVacancies({
                searchQuery: debouncedQuery,
                selectedCategory: '',
                selectedCountry: '',
                vacancies,
            }).map((vacancy) => vacancy.id)
        )
    }, [debouncedQuery, onResults])

    return null
}

describe('useDebouncedValue', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        cleanup()
        vi.useRealTimers()
    })

    it('waits for the debounce delay before publishing the next value', () => {
        const onValue = vi.fn()
        const { rerender } = render(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value=""
                onValue={onValue}
            />
        )

        expect(onValue).toHaveBeenCalledTimes(1)
        expect(onValue).toHaveBeenLastCalledWith('')

        rerender(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value="driver"
                onValue={onValue}
            />
        )

        act(() => {
            vi.advanceTimersByTime(VACANCY_SEARCH_DEBOUNCE_MS - 1)
        })

        expect(onValue).toHaveBeenCalledTimes(1)

        act(() => {
            vi.advanceTimersByTime(1)
        })

        expect(onValue).toHaveBeenCalledTimes(2)
        expect(onValue).toHaveBeenLastCalledWith('driver')
    })

    it('does not publish intermediate values while the user keeps typing', () => {
        const onValue = vi.fn()
        const { rerender } = render(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value=""
                onValue={onValue}
            />
        )

        rerender(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value="d"
                onValue={onValue}
            />
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        rerender(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value="dr"
                onValue={onValue}
            />
        )

        act(() => {
            vi.advanceTimersByTime(100)
        })

        rerender(
            <DebouncedValueProbe
                delayMs={VACANCY_SEARCH_DEBOUNCE_MS}
                value="dri"
                onValue={onValue}
            />
        )

        act(() => {
            vi.advanceTimersByTime(VACANCY_SEARCH_DEBOUNCE_MS - 1)
        })

        expect(onValue).toHaveBeenCalledTimes(1)

        act(() => {
            vi.advanceTimersByTime(1)
        })

        expect(onValue).toHaveBeenCalledTimes(2)
        expect(onValue).toHaveBeenLastCalledWith('dri')
    })

    it('runs vacancy search only after input pauses', () => {
        const onResults = vi.fn()
        const { rerender } = render(
            <DebouncedSearchProbe
                query=""
                onResults={onResults}
            />
        )

        expect(onResults).toHaveBeenCalledTimes(1)
        expect(onResults).toHaveBeenLastCalledWith([
            'welder',
            'driver',
            'developer',
        ])

        rerender(
            <DebouncedSearchProbe
                query="dev"
                onResults={onResults}
            />
        )

        act(() => {
            vi.advanceTimersByTime(VACANCY_SEARCH_DEBOUNCE_MS - 1)
        })

        expect(onResults).toHaveBeenCalledTimes(1)

        act(() => {
            vi.advanceTimersByTime(1)
        })

        expect(onResults).toHaveBeenCalledTimes(2)
        expect(onResults).toHaveBeenLastCalledWith(['developer'])
    })
})

function createVacancy(overrides: Partial<Vacancy>): Vacancy {
    return {
        id: 'vacancy',
        partnerSlug: 'partner',
        logo: 'VV',
        logoTone: 'dark',
        title: 'Vacancy',
        company: 'Company',
        location: 'Kyiv',
        country: 'Ukraine',
        countryKey: 'poland',
        category: 'Other',
        categoryKey: 'other',
        salary: '1000 EUR',
        match: '90%',
        tags: [],
        ...overrides,
    }
}
