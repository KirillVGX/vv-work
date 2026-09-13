import { countries, popularCategories, vacancies } from '@/components/home/homeData'
import type { Vacancy } from '@/components/home/homeData'

import { mockFetch } from './mockFetch'
import type { ApiResponse } from './types'

export type CategoriesResponse = string[]
export type CountriesResponse = string[]
export type VacanciesResponse = Vacancy[]

export function fetchCategories(): Promise<ApiResponse<CategoriesResponse>> {
    return mockFetch(() => popularCategories)
}

export function fetchCountries(): Promise<ApiResponse<CountriesResponse>> {
    return mockFetch(() => countries)
}

export function fetchVacancies(): Promise<ApiResponse<VacanciesResponse>> {
    return mockFetch(() => vacancies)
}
