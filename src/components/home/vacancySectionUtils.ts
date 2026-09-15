import type { CategoryKey, CountryKey, Vacancy } from '@/types'

export const VACANCIES_PER_PAGE = 32

export function getFiltersKey({
    searchQuery,
    selectedCategory,
    selectedCountry,
}: {
    searchQuery: string
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
}) {
    return `${selectedCategory}:${selectedCountry}:${searchQuery.trim().toLowerCase()}`
}

export function filterVacancies({
    searchQuery,
    selectedCategory,
    selectedCountry,
    vacancies,
}: {
    searchQuery: string
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
    vacancies: Vacancy[]
}) {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase()

    return vacancies.filter(
        (vacancy) =>
            (!selectedCategory || vacancy.categoryKey === selectedCategory) &&
            (!selectedCountry || vacancy.countryKey === selectedCountry) &&
            (!normalizedSearchQuery ||
                vacancy.title.toLowerCase().includes(normalizedSearchQuery))
    )
}

export function getPaginatedVacancies(
    vacancies: Vacancy[],
    currentPage: number
) {
    const startIndex = (currentPage - 1) * VACANCIES_PER_PAGE

    return vacancies.slice(startIndex, startIndex + VACANCIES_PER_PAGE)
}

export function getTotalVacancyPages(vacanciesCount: number) {
    return Math.ceil(vacanciesCount / VACANCIES_PER_PAGE)
}
