export const popularCategories = [
    'Будівництво',
    'Виробництво',
    'Логістика',
    'Готелі та ресторани',
    'IT',
    'Водії',
    'Інші',
]

export const countries = [
    'Німеччина',
    'Польща',
    'Чехія',
    'Нідерланди',
    'Іспанія',
    'Італія',
    'Франція',
]

export type Vacancy = {
    logo: string
    logoTone: 'dark' | 'blue' | 'cyan' | 'lime'
    title: string
    company: string
    location: string
    salary: string
    match: string
    tags: string[]
}

export const vacancies: Vacancy[] = [
    {
        logo: 'N',
        logoTone: 'dark',
        title: 'Frontend Developer',
        company: 'NovaTech',
        location: 'Берлін, Німеччина',
        salary: '€55 000 - €75 000',
        match: '92% match',
        tags: ['React', 'TypeScript', 'Next.js'],
    },
    {
        logo: '▰',
        logoTone: 'blue',
        title: 'Warehouse Specialist',
        company: 'LogiPro',
        location: 'Прага, Чехія',
        salary: '€1 200 - €1 600',
        match: '88% match',
        tags: ['Logistics', 'Warehouse', 'Teamwork'],
    },
    {
        logo: '♨',
        logoTone: 'cyan',
        title: 'Restaurant Staff',
        company: 'GoodTaste',
        location: 'Амстердам, Нідерланди',
        salary: '€1 800 - €2 400',
        match: '85% match',
        tags: ['Hospitality', 'Customer Service'],
    },
    {
        logo: '◒',
        logoTone: 'lime',
        title: 'Production Operator',
        company: 'EuroFood',
        location: 'Вроцлав, Польща',
        salary: '€1 300 - €1 800',
        match: '80% match',
        tags: ['Production', 'Manufacturing'],
    },
]
