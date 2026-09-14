import { useCallback, useMemo } from 'react'
import { HiBriefcase, HiMagnifyingGlass, HiMapPin } from 'react-icons/hi2'
import { Link } from 'react-router'

import { FilterDropdown, type FilterDropdownOption } from '@/components/ui'
import { routePaths } from '@/routePaths'
import type { CategoryKey, CountryKey } from '@/types'

import { categories, countryOptions as countries } from './homeData'
import { SearchField } from './SearchField'

type SearchBarProps = {
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
    searchQuery: string
    onCategoryChange: (category: CategoryKey | '') => void
    onCountryChange: (country: CountryKey | '') => void
    onSearchQueryChange: (query: string) => void
}

export function SearchBar({
    selectedCategory,
    selectedCountry,
    searchQuery,
    onCategoryChange,
    onCountryChange,
    onSearchQueryChange,
}: SearchBarProps) {
    const vacanciesSearchParams = useMemo(() => {
        const params = new URLSearchParams()

        if (searchQuery.trim()) {
            params.set('query', searchQuery.trim())
        }

        if (selectedCountry) {
            params.set('country', selectedCountry)
        }

        if (selectedCategory) {
            params.set('category', selectedCategory)
        }

        const queryString = params.toString()

        return queryString
            ? `${routePaths.vacancies}?${queryString}`
            : routePaths.vacancies
    }, [searchQuery, selectedCategory, selectedCountry])

    const handleCountryChange = useCallback(
        (value: string) => onCountryChange(value as CountryKey | ''),
        [onCountryChange]
    )

    const handleCategoryChange = useCallback(
        (value: string) => onCategoryChange(value as CategoryKey | ''),
        [onCategoryChange]
    )

    const countryOptions = useMemo(
        () => [{ label: 'Усі країни', value: '' }, ...countries],
        []
    )

    const categoryOptions = useMemo<FilterDropdownOption[]>(
        () => [
            { label: 'Усі категорії', value: '' },
            ...categories.map((categoryItem) => ({
                label: categoryItem.label,
                value: categoryItem.key,
            })),
        ],
        []
    )

    return (
        <div className="border-border bg-surface mt-7 grid w-full overflow-visible rounded-md border shadow-[0_12px_30px_rgba(23,33,43,0.06)] lg:grid-cols-[minmax(0,1fr)_15.5rem_15.5rem_13.75rem]">
            <div className="overflow-hidden rounded-t-md lg:rounded-l-md lg:rounded-tr-none">
                <SearchField
                    icon={
                        <HiMagnifyingGlass
                            aria-hidden="true"
                            className="size-6"
                        />
                    }
                    label="Яку роботу ви шукаєте?"
                    value={searchQuery}
                    onChange={onSearchQueryChange}
                />
            </div>
            <div className="border-border border-t lg:border-t-0 lg:border-l">
                <FilterDropdown
                    icon={
                        <HiMapPin
                            aria-hidden="true"
                            className="size-6"
                        />
                    }
                    label="Країна"
                    value={selectedCountry}
                    options={countryOptions}
                    onChange={handleCountryChange}
                />
            </div>
            <div className="border-border border-t lg:border-t-0 lg:border-l">
                <FilterDropdown
                    icon={
                        <HiBriefcase
                            aria-hidden="true"
                            className="size-6"
                        />
                    }
                    label="Категорія"
                    value={selectedCategory}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                />
            </div>

            <Link
                className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent m-1 inline-flex h-12 items-center justify-center gap-3 rounded-md px-5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                to={vacanciesSearchParams}
            >
                <HiMagnifyingGlass aria-hidden="true" className="size-6" />
                Знайти вакансії
            </Link>
        </div>
    )
}
