export type {
    ApiFailure,
    ApiResponse,
    ApiSuccess,
    ApplicationSubmissionRequest,
    ApplicationSubmissionResponse,
    AverageSalaryResponse,
    CategoriesResponse,
    CountriesResponse,
    ExchangeRatesResponse,
    HolidaysResponse,
    PartnerResponse,
    PartnersResponse,
    VacanciesResponse,
    VacancyResponse,
} from '@/types/api'

export class MockApiError extends Error {
    status: number

    constructor(message = 'Mock API request failed', status = 500) {
        super(message)
        this.name = 'MockApiError'
        this.status = status
    }
}
