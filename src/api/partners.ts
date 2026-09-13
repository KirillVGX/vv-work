import type {
    PartnerResponse,
    PartnersResponse,
} from '@/types/api'
import type { Partner } from '@/types/domain'

import { mockFetch } from './mockFetch'
import { MockApiError } from './types'
import type { ApiResponse } from './types'

const partnerCategories: Partner['industries'] = [
    {
        key: 'logistics',
        label: 'Логістика',
    },
    {
        key: 'manufacturing',
        label: 'Виробництво',
    },
    {
        key: 'hospitality',
        label: 'Готелі та ресторани',
    },
]

export const partners: Partner[] = [
    {
        slug: 'demo-partner',
        name: 'VV Work Partner',
        logo: 'V',
        country: 'Польща',
        city: 'Вроцлав',
        description:
            'Перевірений роботодавець для кандидатів, які шукають роботу в Європі з прозорими умовами та підтримкою на етапах працевлаштування.',
        industries: partnerCategories,
        vacanciesCount: 24,
        isVerified: true,
    },
    {
        slug: 'logipro',
        name: 'LogiPro',
        logo: 'L',
        country: 'Чехія',
        city: 'Прага',
        description:
            'Логістична компанія з вакансіями на складах, у доставці та операційному супроводі для кандидатів з різним досвідом.',
        industries: [
            {
                key: 'logistics',
                label: 'Логістика',
            },
            {
                key: 'drivers',
                label: 'Водії',
            },
        ],
        vacanciesCount: 18,
        isVerified: true,
    },
    {
        slug: 'eurofood',
        name: 'EuroFood',
        logo: 'E',
        country: 'Німеччина',
        city: 'Гамбург',
        description:
            'Виробничий партнер із вакансіями на харчових підприємствах, пакувальних лініях та у відділах контролю якості.',
        industries: [
            {
                key: 'manufacturing',
                label: 'Виробництво',
            },
            {
                key: 'other',
                label: 'Інші',
            },
        ],
        vacanciesCount: 31,
        isVerified: true,
    },
    {
        slug: 'new-partner',
        name: 'New Partner',
        logo: 'N',
        country: 'Іспанія',
        city: 'Мадрид',
        description:
            'Новий партнер платформи VV Work, який готує перші вакансії для кандидатів у Європі.',
        industries: [
            {
                key: 'construction',
                label: 'Будівництво',
            },
            {
                key: 'other',
                label: 'Інші',
            },
        ],
        vacanciesCount: 0,
        isVerified: false,
    },
]

export function fetchPartners(): Promise<ApiResponse<PartnersResponse>> {
    return mockFetch(() => partners)
}

export function fetchPartnerBySlug(
    slug: string
): Promise<ApiResponse<PartnerResponse>> {
    return mockFetch(() => {
        const partner = partners.find((item) => item.slug === slug)

        if (!partner) {
            throw new MockApiError('Партнера не знайдено', 404)
        }

        return partner
    })
}
