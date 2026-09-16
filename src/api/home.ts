import { categories, countries, vacancies } from '@/data/homeData'
import type {
    AverageSalaryResponse,
    CategoriesResponse,
    CountriesResponse,
    ExchangeRatesResponse,
    HolidaysResponse,
    VacancyResponse,
    VacanciesResponse,
} from '@/types/api'
import type { CountryKey } from '@/types/domain'

import { withCache } from './cache'
import { mockFetch } from './mockFetch'
import { translateHolidayName } from './holidayNames'
import type { ApiResponse } from './types'

const EUROSTAT_AVERAGE_SALARY_URL =
    'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_nt_net?format=JSON&lang=EN&currency=EUR&estruct=NET&ecase=P1_NCH_AW100&geo=EU27_2020'

const YEARS_TO_SHOW = 8

type EurostatDataset = {
    value: Record<string, number>
    dimension: {
        time: {
            category: {
                index: Record<string, number>
            }
        }
    }
}

const FRANKFURTER_USD_RATE_URL =
    'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD'

const NBU_UAH_RATE_URL =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json'

const NAGER_HOLIDAYS_BASE_URL =
    'https://date.nager.at/api/v3/NextPublicHolidays'

const HOLIDAY_COUNTRIES: {
    key: CountryKey
    code: string
    label: string
}[] = [
    { key: 'germany', code: 'DE', label: 'Німеччина' },
    { key: 'poland', code: 'PL', label: 'Польща' },
    { key: 'czechia', code: 'CZ', label: 'Чехія' },
    { key: 'netherlands', code: 'NL', label: 'Нідерланди' },
    { key: 'spain', code: 'ES', label: 'Іспанія' },
    { key: 'italy', code: 'IT', label: 'Італія' },
    { key: 'france', code: 'FR', label: 'Франція' },
]

const HOLIDAYS_TO_SHOW = 4

type NagerHoliday = {
    date: string
    name: string
    localName: string
}

export function fetchCategories(): Promise<ApiResponse<CategoriesResponse>> {
    return mockFetch(() => categories)
}

export function fetchCountries(): Promise<ApiResponse<CountriesResponse>> {
    return mockFetch(() => countries)
}

export function fetchVacancies(): Promise<ApiResponse<VacanciesResponse>> {
    return mockFetch(() => vacancies)
}

export function fetchVacancyById(
    id: string
): Promise<ApiResponse<VacancyResponse>> {
    return mockFetch(() => {
        const vacancy = vacancies.find((item) => item.id === id)

        if (!vacancy) {
            throw new Error('Вакансію не знайдено')
        }

        return vacancy
    })
}

export function fetchVacanciesByPartnerSlug(
    partnerSlug: string
): Promise<ApiResponse<VacanciesResponse>> {
    return mockFetch(() =>
        vacancies.filter((vacancy) => vacancy.partnerSlug === partnerSlug)
    )
}

export function fetchAverageSalary(): Promise<
    ApiResponse<AverageSalaryResponse>
> {
    return withCache('average-salary', fetchAverageSalaryUncached)
}

async function fetchAverageSalaryUncached(): Promise<
    ApiResponse<AverageSalaryResponse>
> {
    try {
        const response = await fetch(EUROSTAT_AVERAGE_SALARY_URL)

        if (!response.ok) {
            throw new Error(`Eurostat відповів зі статусом ${response.status}`)
        }

        const dataset: EurostatDataset = await response.json()

        const orderedYears = Object.entries(
            dataset.dimension.time.category.index
        )
            .sort(([, a], [, b]) => a - b)
            .map(([year, index]) => ({ year, index }))

        const points = orderedYears
            .map(({ year, index }) => ({
                label: year,
                amount: dataset.value[index],
            }))
            .filter(
                (point): point is { label: string; amount: number } =>
                    typeof point.amount === 'number'
            )
            .slice(-YEARS_TO_SHOW)

        const latest = points[points.length - 1]
        const previous = points[points.length - 2]

        if (!latest) {
            throw new Error('Eurostat не повернув дані за жоден рік')
        }

        const changePercent = previous
            ? Math.round(
                  ((latest.amount - previous.amount) / previous.amount) * 1000
              ) / 10
            : 0

        return {
            ok: true,
            data: {
                amount: Math.round(latest.amount),
                currency: 'EUR',
                changePercent,
                year: Number(latest.label),
                points,
            },
        }
    } catch (error) {
        return {
            ok: false,
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Не вдалося завантажити дані Eurostat',
                status: 502,
            },
        }
    }
}

export function fetchExchangeRates(): Promise<
    ApiResponse<ExchangeRatesResponse>
> {
    return withCache('exchange-rates', fetchExchangeRatesUncached)
}

async function fetchExchangeRatesUncached(): Promise<
    ApiResponse<ExchangeRatesResponse>
> {
    try {
        const [usdResponse, uahResponse] = await Promise.all([
            fetch(FRANKFURTER_USD_RATE_URL),
            fetch(NBU_UAH_RATE_URL),
        ])

        if (!usdResponse.ok || !uahResponse.ok) {
            throw new Error('Не вдалося отримати курси валют')
        }

        const usdPayload: { rates: { USD: number } } = await usdResponse.json()
        const uahPayload: { rate: number }[] = await uahResponse.json()

        const usdRate = usdPayload.rates.USD
        const uahRate = uahPayload[0]?.rate

        if (!usdRate || !uahRate) {
            throw new Error('Курси валют повернулись у неочікуваному форматі')
        }

        return {
            ok: true,
            data: {
                USD: usdRate,
                UAH: uahRate,
            },
        }
    } catch (error) {
        return {
            ok: false,
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Не вдалося завантажити курси валют',
                status: 502,
            },
        }
    }
}

export function fetchUpcomingHolidays(): Promise<
    ApiResponse<HolidaysResponse>
> {
    return withCache('upcoming-holidays', fetchUpcomingHolidaysUncached)
}

async function fetchUpcomingHolidaysUncached(): Promise<
    ApiResponse<HolidaysResponse>
> {
    try {
        const responses = await Promise.all(
            HOLIDAY_COUNTRIES.map(async (country) => {
                const response = await fetch(
                    `${NAGER_HOLIDAYS_BASE_URL}/${country.code}`
                )

                if (!response.ok) {
                    throw new Error(
                        `Nager.Date відповів зі статусом ${response.status}`
                    )
                }

                const holidays: NagerHoliday[] = await response.json()

                return holidays.map((holiday) => ({
                    countryKey: country.key,
                    countryLabel: country.label,
                    countryCode: country.code.toLowerCase(),
                    date: holiday.date,
                    name: holiday.name,
                    localName: holiday.localName,
                }))
            })
        )

        const upcoming = responses
            .flat()
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, HOLIDAYS_TO_SHOW)

        const holidays = await Promise.all(
            upcoming.map(async (holiday) => ({
                countryKey: holiday.countryKey,
                countryLabel: holiday.countryLabel,
                countryCode: holiday.countryCode,
                date: holiday.date,
                title: await translateHolidayName(
                    holiday.name,
                    holiday.localName
                ),
            }))
        )

        return {
            ok: true,
            data: holidays,
        }
    } catch (error) {
        return {
            ok: false,
            error: {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Не вдалося завантажити свята',
                status: 502,
            },
        }
    }
}
