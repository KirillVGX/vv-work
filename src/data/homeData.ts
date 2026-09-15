import type { Category, CategoryKey, CountryKey, Vacancy } from '@/types/domain'

const categoryCatalog = [
    {
        key: 'construction',
        label: 'Будівництво',
    },
    {
        key: 'manufacturing',
        label: 'Виробництво',
    },
    {
        key: 'logistics',
        label: 'Логістика',
    },
    {
        key: 'hospitality',
        label: 'Готелі та ресторани',
    },
    {
        key: 'it',
        label: 'IT',
    },
    {
        key: 'drivers',
        label: 'Водії',
    },
    {
        key: 'other',
        label: 'Інші',
    },
] as const satisfies readonly Category[]

const countryCatalog = [
    {
        key: 'germany',
        label: 'Німеччина',
        cities: ['Берлін', 'Гамбург', 'Мюнхен', 'Кельн', 'Дрезден', 'Штутгарт'],
    },
    {
        key: 'poland',
        label: 'Польща',
        cities: [
            'Вроцлав',
            'Познань',
            'Краків',
            'Гданськ',
            'Лодзь',
            'Катовіце',
        ],
    },
    {
        key: 'czechia',
        label: 'Чехія',
        cities: ['Прага', 'Брно', 'Пльзень', 'Острава', 'Ліберець', 'Оломоуць'],
    },
    {
        key: 'netherlands',
        label: 'Нідерланди',
        cities: [
            'Амстердам',
            'Роттердам',
            'Ейндговен',
            'Утрехт',
            'Гаага',
            'Тілбург',
        ],
    },
    {
        key: 'spain',
        label: 'Іспанія',
        cities: [
            'Мадрид',
            'Барселона',
            'Валенсія',
            'Севілья',
            'Малага',
            'Більбао',
        ],
    },
    {
        key: 'italy',
        label: 'Італія',
        cities: ['Мілан', 'Рим', 'Турин', 'Болонья', 'Верона', 'Неаполь'],
    },
    {
        key: 'france',
        label: 'Франція',
        cities: ['Париж', 'Ліон', 'Марсель', 'Лілль', 'Нант', 'Тулуза'],
    },
] as const satisfies readonly {
    key: CountryKey
    label: string
    cities: readonly string[]
}[]

export const categories: Category[] = [...categoryCatalog]
export const popularCategories = categories.map((category) => category.label)
export const countryOptions = countryCatalog.map((country) => ({
    label: country.label,
    value: country.key,
}))
export const countries = countryCatalog.map((country) => country.label)

type Country = (typeof countryCatalog)[number]

const vacancyPresets: Record<
    CategoryKey,
    {
        title: string
        tags: string[]
        salary: string
    }[]
> = {
    construction: [
        {
            title: 'Construction Worker',
            tags: ['Building', 'Tools', 'Teamwork'],
            salary: '€1 800 - €2 600',
        },
        {
            title: 'Finishing Specialist',
            tags: ['Renovation', 'Painting', 'Drywall'],
            salary: '€2 000 - €2 900',
        },
        {
            title: 'Site Assistant',
            tags: ['Safety', 'Materials', 'Schedule'],
            salary: '€1 700 - €2 400',
        },
        {
            title: 'Concrete Worker',
            tags: ['Concrete', 'Formwork', 'Blueprints'],
            salary: '€2 100 - €3 000',
        },
        {
            title: 'Scaffolding Installer',
            tags: ['Scaffolding', 'Heights', 'Safety'],
            salary: '€2 200 - €3 200',
        },
        {
            title: 'Electrician Assistant',
            tags: ['Electrical', 'Installation', 'Tools'],
            salary: '€1 900 - €2 700',
        },
        {
            title: 'Plumbing Assistant',
            tags: ['Plumbing', 'Repair', 'Installation'],
            salary: '€1 900 - €2 650',
        },
    ],
    manufacturing: [
        {
            title: 'Production Operator',
            tags: ['Production', 'Manufacturing'],
            salary: '€1 300 - €1 800',
        },
        {
            title: 'Packaging Line Worker',
            tags: ['Packaging', 'Quality', 'Shift Work'],
            salary: '€1 250 - €1 750',
        },
        {
            title: 'Quality Control Assistant',
            tags: ['QC', 'Inspection', 'Factory'],
            salary: '€1 500 - €2 100',
        },
        {
            title: 'CNC Machine Operator',
            tags: ['CNC', 'Machining', 'Precision'],
            salary: '€2 000 - €3 000',
        },
        {
            title: 'Assembly Worker',
            tags: ['Assembly', 'Line Work', 'Tools'],
            salary: '€1 400 - €2 000',
        },
        {
            title: 'Food Factory Worker',
            tags: ['Food', 'Factory', 'Hygiene'],
            salary: '€1 350 - €1 950',
        },
        {
            title: 'Textile Production Worker',
            tags: ['Textile', 'Sewing', 'Production'],
            salary: '€1 300 - €1 850',
        },
    ],
    logistics: [
        {
            title: 'Warehouse Specialist',
            tags: ['Logistics', 'Warehouse', 'Teamwork'],
            salary: '€1 200 - €1 600',
        },
        {
            title: 'Order Picker',
            tags: ['Picking', 'Scanner', 'Inventory'],
            salary: '€1 250 - €1 850',
        },
        {
            title: 'Forklift Operator',
            tags: ['Forklift', 'Warehouse', 'Loading'],
            salary: '€1 700 - €2 300',
        },
        {
            title: 'Inventory Coordinator',
            tags: ['Inventory', 'Excel', 'Stock'],
            salary: '€1 800 - €2 500',
        },
        {
            title: 'Logistics Assistant',
            tags: ['Planning', 'Shipping', 'Documents'],
            salary: '€1 600 - €2 200',
        },
        {
            title: 'Parcel Sorter',
            tags: ['Sorting', 'Night Shift', 'Packages'],
            salary: '€1 300 - €1 900',
        },
        {
            title: 'Loading Team Member',
            tags: ['Loading', 'Warehouse', 'Teamwork'],
            salary: '€1 400 - €2 000',
        },
    ],
    hospitality: [
        {
            title: 'Restaurant Staff',
            tags: ['Hospitality', 'Customer Service'],
            salary: '€1 800 - €2 400',
        },
        {
            title: 'Hotel Housekeeper',
            tags: ['Hotel', 'Cleaning', 'Service'],
            salary: '€1 400 - €1 900',
        },
        {
            title: 'Kitchen Assistant',
            tags: ['Kitchen', 'Prep', 'Hospitality'],
            salary: '€1 500 - €2 100',
        },
        {
            title: 'Barista',
            tags: ['Coffee', 'Service', 'Cash Desk'],
            salary: '€1 500 - €2 200',
        },
        {
            title: 'Waiter',
            tags: ['Restaurant', 'Guests', 'Tips'],
            salary: '€1 600 - €2 400',
        },
        {
            title: 'Hotel Receptionist',
            tags: ['Front Desk', 'English', 'Booking'],
            salary: '€1 900 - €2 700',
        },
        {
            title: 'Dishwasher',
            tags: ['Kitchen', 'Cleaning', 'Evening Shift'],
            salary: '€1 300 - €1 800',
        },
    ],
    it: [
        {
            title: 'Frontend Developer',
            tags: ['React', 'TypeScript', 'Next.js'],
            salary: '€55 000 - €75 000',
        },
        {
            title: 'QA Engineer',
            tags: ['Testing', 'Automation', 'Web'],
            salary: '€38 000 - €55 000',
        },
        {
            title: 'Support Engineer',
            tags: ['Support', 'SaaS', 'English'],
            salary: '€32 000 - €48 000',
        },
        {
            title: 'Backend Developer',
            tags: ['Node.js', 'API', 'PostgreSQL'],
            salary: '€58 000 - €82 000',
        },
        {
            title: 'Product Designer',
            tags: ['Figma', 'UX', 'Design System'],
            salary: '€42 000 - €62 000',
        },
        {
            title: 'DevOps Engineer',
            tags: ['Cloud', 'CI/CD', 'Linux'],
            salary: '€60 000 - €90 000',
        },
        {
            title: 'Data Analyst',
            tags: ['SQL', 'BI', 'Reports'],
            salary: '€40 000 - €58 000',
        },
    ],
    drivers: [
        {
            title: 'Delivery Driver',
            tags: ['Delivery', 'Route', 'B License'],
            salary: '€1 900 - €2 700',
        },
        {
            title: 'Truck Driver',
            tags: ['CE License', 'Long Distance', 'Logistics'],
            salary: '€2 400 - €3 400',
        },
        {
            title: 'Shuttle Driver',
            tags: ['Passenger', 'Schedule', 'Service'],
            salary: '€1 800 - €2 500',
        },
        {
            title: 'Courier',
            tags: ['City Routes', 'Delivery', 'Flexible'],
            salary: '€1 600 - €2 300',
        },
        {
            title: 'Bus Driver',
            tags: ['D License', 'Passengers', 'Schedule'],
            salary: '€2 200 - €3 100',
        },
        {
            title: 'Van Driver',
            tags: ['B License', 'Packages', 'Routes'],
            salary: '€1 800 - €2 600',
        },
        {
            title: 'Logistics Driver',
            tags: ['Transport', 'Warehouse', 'Documents'],
            salary: '€2 000 - €2 900',
        },
    ],
    other: [
        {
            title: 'Cleaning Specialist',
            tags: ['Cleaning', 'Facilities', 'Flexible'],
            salary: '€1 300 - €1 900',
        },
        {
            title: 'Care Assistant',
            tags: ['Care', 'Support', 'Communication'],
            salary: '€1 600 - €2 300',
        },
        {
            title: 'Seasonal Worker',
            tags: ['Seasonal', 'Outdoor', 'Flexible'],
            salary: '€1 200 - €1 800',
        },
        {
            title: 'Farm Worker',
            tags: ['Agriculture', 'Seasonal', 'Outdoor'],
            salary: '€1 300 - €2 000',
        },
        {
            title: 'Childcare Assistant',
            tags: ['Care', 'Family', 'Support'],
            salary: '€1 500 - €2 200',
        },
        {
            title: 'Facility Helper',
            tags: ['Maintenance', 'Cleaning', 'Repairs'],
            salary: '€1 400 - €2 000',
        },
        {
            title: 'Event Staff',
            tags: ['Events', 'Service', 'Flexible'],
            salary: '€1 300 - €1 900',
        },
    ],
}

const companies = [
    'NovaTech',
    'LogiPro',
    'GoodTaste',
    'EuroFood',
    'BuildLine',
    'CarePlus',
    'MoveWay',
    'HotelPro',
    'GreenFarm',
    'WorkBridge',
    'CityRoute',
    'FactoryOne',
]

const logoTones: Vacancy['logoTone'][] = ['dark', 'blue', 'cyan', 'lime']
const logos = ['N', 'L', 'G', 'E', 'B', 'C', 'M', 'H', 'W', 'F', 'R', 'P']
const partnerSlugs = ['demo-partner', 'logipro', 'eurofood']

function createVacancy(
    country: Country,
    category: (typeof categoryCatalog)[number],
    preset: (typeof vacancyPresets)[CategoryKey][number],
    seed: number,
    presetIndex: number
): Vacancy {
    const partnerSlug = partnerSlugs[seed % partnerSlugs.length]

    return {
        id: `${partnerSlug}-${country.key}-${category.key}-${presetIndex}`,
        partnerSlug,
        logo: logos[seed % logos.length],
        logoTone: logoTones[seed % logoTones.length],
        title: preset.title,
        company: companies[seed % companies.length],
        location: `${country.cities[presetIndex % country.cities.length]}, ${country.label}`,
        country: country.label,
        countryKey: country.key,
        category: category.label,
        categoryKey: category.key,
        salary: preset.salary,
        match: `${92 - (seed % 15)}% match`,
        tags: preset.tags,
    }
}

export const vacancies: Vacancy[] = countryCatalog.flatMap(
    (country, countryIndex) =>
        categoryCatalog.flatMap((category, categoryIndex) =>
            vacancyPresets[category.key].map((preset, presetIndex) =>
                createVacancy(
                    country,
                    category,
                    preset,
                    countryIndex * 37 + categoryIndex * 11 + presetIndex,
                    presetIndex
                )
            )
        )
)
