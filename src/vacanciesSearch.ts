import { routePaths } from '@/routePaths'
import type { CategoryKey, CountryKey } from '@/types'

export type VacancySearchValues = {
    category: CategoryKey | ''
    country: CountryKey | ''
    query: string
}

const CATEGORY_KEYS = new Set<string>([
    'construction',
    'manufacturing',
    'logistics',
    'hospitality',
    'it',
    'drivers',
    'other',
] satisfies CategoryKey[])

const COUNTRY_KEYS = new Set<string>([
    'germany',
    'poland',
    'czechia',
    'netherlands',
    'spain',
    'italy',
    'france',
] satisfies CountryKey[])

function isCategoryKey(value: string): value is CategoryKey {
    return CATEGORY_KEYS.has(value)
}

function isCountryKey(value: string): value is CountryKey {
    return COUNTRY_KEYS.has(value)
}

export function getCategorySearchParam(value: string | null): CategoryKey | '' {
    return value && isCategoryKey(value) ? value : ''
}

export function getCountrySearchParam(value: string | null): CountryKey | '' {
    return value && isCountryKey(value) ? value : ''
}

export function buildVacanciesSearchParams({
    category,
    country,
    query,
}: VacancySearchValues) {
    const params = new URLSearchParams()

    if (query.trim()) {
        params.set('query', query.trim())
    }

    if (country) {
        params.set('country', country)
    }

    if (category) {
        params.set('category', category)
    }

    return params
}

export function buildVacanciesPath(values: VacancySearchValues) {
    const queryString = buildVacanciesSearchParams(values).toString()

    return queryString
        ? `${routePaths.vacancies}?${queryString}`
        : routePaths.vacancies
}
