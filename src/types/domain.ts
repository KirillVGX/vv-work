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

export type AverageSalaryPoint = {
    label: string
    amount: number
}

export type AverageSalary = {
    amount: number
    currency: string
    changePercent: number
    year: number
    points: AverageSalaryPoint[]
}

export type CurrencyCode = 'EUR' | 'USD' | 'UAH'

export type ExchangeRates = Record<Exclude<CurrencyCode, 'EUR'>, number>

export type Holiday = {
    countryKey: CountryKey
    countryLabel: string
    countryCode: string
    date: string
    title: string
}

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
