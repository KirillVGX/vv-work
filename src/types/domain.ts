export type CategoryKey =
    | 'construction'
    | 'manufacturing'
    | 'logistics'
    | 'hospitality'
    | 'it'
    | 'drivers'
    | 'other'

export type CountryKey =
    | 'germany'
    | 'poland'
    | 'czechia'
    | 'netherlands'
    | 'spain'
    | 'italy'
    | 'france'

export type Category = {
    key: CategoryKey
    label: string
}

export type Partner = {
    slug: string
    name: string
    logo: string
    country: string
    city: string
    description: string
    industries: Category[]
    vacanciesCount: number
    isVerified: boolean
}

export type VacancyLogoTone = 'dark' | 'blue' | 'cyan' | 'lime'

export type Vacancy = {
    id: string
    partnerSlug: string
    logo: string
    logoTone: VacancyLogoTone
    title: string
    company: string
    location: string
    country: string
    countryKey: CountryKey
    category: string
    categoryKey: CategoryKey
    salary: string
    match: string
    tags: string[]
}
