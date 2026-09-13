import { categories, countries, vacancies } from '@/components/home/homeData'
import type {
    CategoriesResponse,
    CountriesResponse,
    VacanciesResponse,
} from '@/types/api'

import { mockFetch } from './mockFetch'
import type { ApiResponse } from './types'

export function fetchCategories(): Promise<ApiResponse<CategoriesResponse>> {
    return mockFetch(() => categories)
}

export function fetchCountries(): Promise<ApiResponse<CountriesResponse>> {
    return mockFetch(() => countries)
}

export function fetchVacancies(): Promise<ApiResponse<VacanciesResponse>> {
    return mockFetch(() => vacancies)
}
