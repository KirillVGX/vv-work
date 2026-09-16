import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { DeferredHomeSections } from '@/components/home/DeferredHomeSections'
import { Hero } from '@/components/home/Hero'
import { Container, Section } from '@/components/ui'
import type { CategoryKey, CountryKey } from '@/types'
import { buildVacanciesPath } from '@/vacanciesSearch'

export function HomePage() {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>(
        ''
    )
    const [selectedCountry, setSelectedCountry] = useState<CountryKey | ''>('')
    const [searchQuery, setSearchQuery] = useState('')

    const navigateToVacancies = useCallback(
        (nextValues?: {
            category?: CategoryKey | ''
            country?: CountryKey | ''
            query?: string
        }) => {
            navigate(
                buildVacanciesPath({
                    category: nextValues?.category ?? selectedCategory,
                    country: nextValues?.country ?? selectedCountry,
                    query: nextValues?.query ?? searchQuery,
                })
            )
        },
        [navigate, searchQuery, selectedCategory, selectedCountry]
    )

    const handleCategoryChange = useCallback(
        (category: CategoryKey | '') => {
            setSelectedCategory(category)
            navigateToVacancies({ category })
        },
        [navigateToVacancies]
    )

    return (
        <>
            <Section
                className="pt-8 pb-8 md:pt-12 md:pb-10"
                spacing="none"
            >
                <Container>
                    <Hero
                        selectedCategory={selectedCategory}
                        selectedCountry={selectedCountry}
                        searchQuery={searchQuery}
                        onCategoryChange={handleCategoryChange}
                        onCountryChange={setSelectedCountry}
                        onSearchQueryChange={setSearchQuery}
                    />
                </Container>
            </Section>

            <DeferredHomeSections onCtaClick={() => navigateToVacancies()} />
        </>
    )
}
