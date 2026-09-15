import type { CategoryKey, CountryKey } from '@/types'

import { CategoryChips } from './CategoryChips'
import { categories } from '@/data/homeData'
import { SearchBar } from './SearchBar'

type HeroProps = {
    selectedCategory: CategoryKey | ''
    selectedCountry: CountryKey | ''
    searchQuery: string
    onCategoryChange: (category: CategoryKey | '') => void
    onCountryChange: (country: CountryKey | '') => void
    onSearchQueryChange: (query: string) => void
}

export function Hero({
    selectedCategory,
    selectedCountry,
    searchQuery,
    onCategoryChange,
    onCountryChange,
    onSearchQueryChange,
}: HeroProps) {
    return (
        <div>
            <p className="text-muted text-sm font-bold tracking-[0.32em] uppercase">
                Робота в Європі
            </p>

            <h1 className="text-primary mt-5 max-w-[54rem] text-5xl leading-[1.08] font-bold md:text-[4rem]">
                Знайди роботу,
                <br />
                яка підходить <span className="hero-highlight">саме тобі.</span>
            </h1>

            <p className="text-muted mt-4 max-w-[42rem] text-lg leading-8">
                Актуальні вакансії від перевірених роботодавців у Європі.
                <br className="hidden sm:block" />
                Простий пошук, зручні фільтри, більше можливостей.
            </p>

            <SearchBar
                selectedCategory={selectedCategory}
                selectedCountry={selectedCountry}
                searchQuery={searchQuery}
                onCategoryChange={onCategoryChange}
                onCountryChange={onCountryChange}
                onSearchQueryChange={onSearchQueryChange}
            />
            <CategoryChips
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
            />
        </div>
    )
}
