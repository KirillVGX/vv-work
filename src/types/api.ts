import type {
    AverageSalary,
    Category,
    ExchangeRates,
    Holiday,
    Partner,
    Vacancy,
} from './domain'

export type ApiSuccess<TData> = {
    ok: true
    data: TData
}

export type ApiFailure = {
    ok: false
    error: {
        message: string
        status: number
    }
}

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure

export type CategoriesResponse = Category[]
export type CountriesResponse = string[]
export type PartnersResponse = Partner[]
export type PartnerResponse = Partner
export type VacanciesResponse = Vacancy[]
export type VacancyResponse = Vacancy
export type AverageSalaryResponse = AverageSalary
export type ExchangeRatesResponse = ExchangeRates
export type HolidaysResponse = Holiday[]

export type ApplicationSubmissionRequest = {
    name: string
    email: string
    contact: string
    subject: string
    message: string
}

export type ApplicationSubmissionResponse = {
    id: string
    submittedAt: string
}
