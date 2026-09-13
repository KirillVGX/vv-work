import { useMemo, useState } from 'react'
import { HiBriefcase, HiMagnifyingGlass, HiMapPin } from 'react-icons/hi2'
import { Link } from 'react-router'

import { FilterDropdown } from '@/components/ui'
import { routePaths } from '@/routePaths'

import { countries, popularCategories } from './homeData'
import { SearchField } from './SearchField'

export function SearchBar() {
    const [country, setCountry] = useState('')
    const [category, setCategory] = useState('')

    const countryOptions = useMemo(
        () => [
            { label: 'Усі країни', value: '' },
            ...countries.map((countryItem) => ({
                label: countryItem,
                value: countryItem,
            })),
        ],
        []
    )

    const categoryOptions = useMemo(
        () => [
            { label: 'Усі категорії', value: '' },
            ...popularCategories.map((categoryItem) => ({
                label: categoryItem,
                value: categoryItem,
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
                    value={country}
                    options={countryOptions}
                    onChange={setCountry}
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
                    value={category}
                    options={categoryOptions}
                    onChange={setCategory}
                />
            </div>

            <Link
                className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent m-1 inline-flex h-12 items-center justify-center gap-3 rounded-md px-5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                to={routePaths.contacts}
            >
                <HiMagnifyingGlass
                    aria-hidden="true"
                    className="size-6"
                />
                Знайти вакансії
            </Link>
        </div>
    )
}
