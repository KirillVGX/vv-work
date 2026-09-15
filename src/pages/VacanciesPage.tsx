import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'

import { Hero, VacancySection } from '@/components/home'
import { Container, Section } from '@/components/ui'
import type { CategoryKey, CountryKey } from '@/types'
import {
    buildVacanciesSearchParams,
    getCategorySearchParam,
    getCountrySearchParam,
} from '@/vacanciesSearch'

export function VacanciesPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>(
        getCategorySearchParam(searchParams.get('category'))
    )
    const [selectedCountry, setSelectedCountry] = useState<CountryKey | ''>(
        getCountrySearchParam(searchParams.get('country'))
    )
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('query') ?? ''
    )

    const syncSearchParams = useCallback(
        ({
            category = selectedCategory,
            country = selectedCountry,
            query = searchQuery,
        }: {
            category?: CategoryKey | ''
            country?: CountryKey | ''
            query?: string
        }) => {
            setSearchParams(
                buildVacanciesSearchParams({ category, country, query }),
                { replace: true }
            )
        },
        [searchQuery, selectedCategory, selectedCountry, setSearchParams]
    )

    const handleCategoryChange = useCallback(
        (category: CategoryKey | '') => {
            setSelectedCategory(category)
            syncSearchParams({ category })
        },
        [syncSearchParams]
    )

    const handleCountryChange = useCallback(
        (country: CountryKey | '') => {
            setSelectedCountry(country)
            syncSearchParams({ country })
        },
        [syncSearchParams]
    )

    const handleSearchQueryChange = useCallback(
        (query: string) => {
            setSearchQuery(query)
            syncSearchParams({ query })
        },
        [syncSearchParams]
    )

    return (
        <>
            <Section
                className="pt-8 pb-8 md:pt-10 md:pb-7"
                spacing="none"
            >
                <Container>
                    <Hero
                        selectedCategory={selectedCategory}
                        selectedCountry={selectedCountry}
                        searchQuery={searchQuery}
                        onCategoryChange={handleCategoryChange}
                        onCountryChange={handleCountryChange}
                        onSearchQueryChange={handleSearchQueryChange}
                    />
                </Container>
            </Section>

            <Section
                className="pt-4 pb-10 md:pt-5 md:pb-12"
                spacing="none"
            >
                <Container>
                    <VacancySection
                        selectedCategory={selectedCategory}
                        selectedCountry={selectedCountry}
                        searchQuery={searchQuery}
                    />
                </Container>
            </Section>
        </>
    )
}
