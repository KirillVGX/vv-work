import type { CategoryKey, CountryKey, Vacancy } from '@/types'

export const VACANCIES_PER_PAGE = 32
export const VACANCY_SEARCH_DEBOUNCE_MS = 350

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

export const SEARCH_SUGGESTIONS_LIMIT = 5

export function getSearchSuggestions(searchQuery: string, vacancies: Vacancy[]) {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase()

    if (!normalizedSearchQuery) {
        return []
    }

    return vacancies
        .filter((vacancy) =>
            vacancy.title.toLowerCase().includes(normalizedSearchQuery)
        )
        .slice(0, SEARCH_SUGGESTIONS_LIMIT)
}

export function splitTitleAtMatch(title: string, searchQuery: string) {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase()
    const matchIndex = title.toLowerCase().indexOf(normalizedSearchQuery)

    if (!normalizedSearchQuery || matchIndex === -1) {
        return { before: title, match: '', after: '' }
    }

    return {
        before: title.slice(0, matchIndex),
        match: title.slice(matchIndex, matchIndex + normalizedSearchQuery.length),
        after: title.slice(matchIndex + normalizedSearchQuery.length),
    }
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
