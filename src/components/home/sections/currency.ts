import type { CurrencyCode, ExchangeRates } from '@/types'

const CURRENCY_OPTIONS: {
    code: CurrencyCode
    label: string
    symbol: string
    locale: string
}[] = [
    { code: 'EUR', label: '€ (EUR)', symbol: '€', locale: 'uk-UA' },
    { code: 'USD', label: '$ (USD)', symbol: '$', locale: 'en-US' },
    { code: 'UAH', label: '₴ (UAH)', symbol: '₴', locale: 'uk-UA' },
]

function convertFromEur(
    amountEur: number,
    currency: CurrencyCode,
    rates: ExchangeRates
) {
    if (currency === 'EUR') {
        return amountEur
    }

    return amountEur * rates[currency]
}

function formatCurrencyAmount(amount: number, currency: CurrencyCode) {
    const option = CURRENCY_OPTIONS.find(({ code }) => code === currency)

    return `${Math.round(amount).toLocaleString(option?.locale ?? 'uk-UA')} ${option?.symbol ?? ''}`
}

export { CURRENCY_OPTIONS, convertFromEur, formatCurrencyAmount }
