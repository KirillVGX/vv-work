import { describe, expect, it } from 'vitest'

import type { Vacancy } from '@/types'
import { filterVacancies } from './vacancySectionUtils'

const vacancies = [
    createVacancy({
        id: 'frontend-developer',
        title: 'Frontend Developer',
        categoryKey: 'it',
    }),
    createVacancy({
        id: 'truck-driver',
        title: 'Truck Driver',
        categoryKey: 'drivers',
    }),
    createVacancy({
        id: 'forklift-driver',
        title: 'Forklift Driver',
        categoryKey: 'logistics',
    }),
    createVacancy({
        id: 'hotel-receptionist',
        title: 'Hotel Receptionist',
        categoryKey: 'hospitality',
    }),
]

describe('filterVacancies', () => {
    it('filters vacancies by category', () => {
        const result = filterVacancies({
            searchQuery: '',
            selectedCategory: 'drivers',
            selectedCountry: '',
            vacancies,
        })

        expect(result.map((vacancy) => vacancy.id)).toEqual(['truck-driver'])
    })

    it('filters vacancies by search query', () => {
        const result = filterVacancies({
            searchQuery: ' front ',
            selectedCategory: '',
            selectedCountry: '',
            vacancies,
        })

        expect(result.map((vacancy) => vacancy.id)).toEqual([
            'frontend-developer',
        ])
    })

    it('combines search query and category filters', () => {
        const result = filterVacancies({
            searchQuery: 'driver',
            selectedCategory: 'logistics',
            selectedCountry: '',
            vacancies,
        })

        expect(result.map((vacancy) => vacancy.id)).toEqual([
            'forklift-driver',
        ])
    })

    it('returns an empty list when no vacancies match filters', () => {
        const result = filterVacancies({
            searchQuery: 'driver',
            selectedCategory: 'it',
            selectedCountry: '',
            vacancies,
        })

        expect(result).toEqual([])
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
        location: 'Warsaw',
        country: 'Poland',
        countryKey: 'poland',
        category: 'Other',
        categoryKey: 'other',
        salary: '1000 EUR',
        match: '90%',
        tags: [],
        ...overrides,
    }
}
