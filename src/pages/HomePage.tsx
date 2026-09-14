import { useCallback, useState } from 'react'

import { Hero, VacancySection } from '@/components/home'
import { Container, Section } from '@/components/ui'
import type { CategoryKey, CountryKey } from '@/types'

export function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>(
        ''
    )
    const [selectedCountry, setSelectedCountry] = useState<CountryKey | ''>('')
    const [searchQuery, setSearchQuery] = useState('')

    const handleCategoryChange = useCallback((category: CategoryKey | '') => {
        setSelectedCategory(category)

        if (category) {
            window.requestAnimationFrame(() => {
                document
                    .getElementById('vacancies')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
        }
    }, [])

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
                        onCountryChange={setSelectedCountry}
                        onSearchQueryChange={setSearchQuery}
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
