import { useCallback, useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import {
    HiArrowRight,
    HiBriefcase,
    HiCalendarDays,
    HiChatBubbleLeftRight,
    HiChevronLeft,
    HiChevronRight,
    HiDocumentText,
    HiGlobeAlt,
    HiHome,
    HiPaperAirplane,
    HiShieldCheck,
    HiUsers,
} from 'react-icons/hi2'
import {
    SiAdidas,
    SiAirbnb,
    SiApple,
    SiDhl,
    SiFord,
    SiGoogle,
    SiIkea,
    SiMcdonalds,
    SiNetflix,
    SiNike,
    SiPaypal,
    SiPuma,
    SiSamsung,
    SiSpotify,
    SiTesla,
    SiUber,
    SiVisa,
    SiYoutube,
    SiZara,
} from 'react-icons/si'
import { useNavigate } from 'react-router'

import { Hero } from '@/components/home'
import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'
import type { CategoryKey, CountryKey } from '@/types'

const partnerSlides: {
    name: string
    icon: IconType
}[][] = [
    [
        { name: 'McDonald’s', icon: SiMcdonalds },
        { name: 'Nike', icon: SiNike },
        { name: 'Adidas', icon: SiAdidas },
        { name: 'Puma', icon: SiPuma },
        { name: 'IKEA', icon: SiIkea },
        { name: 'Zara', icon: SiZara },
        { name: 'Visa', icon: SiVisa },
        { name: 'PayPal', icon: SiPaypal },
    ],
    [
        { name: 'Google', icon: SiGoogle },
        { name: 'Apple', icon: SiApple },
        { name: 'DHL', icon: SiDhl },
        { name: 'Samsung', icon: SiSamsung },
        { name: 'Ford', icon: SiFord },
        { name: 'Tesla', icon: SiTesla },
        { name: 'Uber', icon: SiUber },
        { name: 'Airbnb', icon: SiAirbnb },
    ],
    [
        { name: 'Spotify', icon: SiSpotify },
        { name: 'Netflix', icon: SiNetflix },
        { name: 'YouTube', icon: SiYoutube },
        { name: 'McDonald’s', icon: SiMcdonalds },
        { name: 'Nike', icon: SiNike },
        { name: 'IKEA', icon: SiIkea },
        { name: 'Samsung', icon: SiSamsung },
        { name: 'Visa', icon: SiVisa },
    ],
    [
        { name: 'Zara', icon: SiZara },
        { name: 'Adidas', icon: SiAdidas },
        { name: 'Puma', icon: SiPuma },
        { name: 'Google', icon: SiGoogle },
        { name: 'Apple', icon: SiApple },
        { name: 'DHL', icon: SiDhl },
        { name: 'Uber', icon: SiUber },
        { name: 'PayPal', icon: SiPaypal },
    ],
]

const stats = [
    {
        icon: HiBriefcase,
        value: '10 000+',
        label: 'Актуальних вакансій',
        text: 'Робота у найкращих компаніях Європи',
    },
    {
        icon: HiShieldCheck,
        value: '98%',
        label: 'Перевірених роботодавців',
        text: 'Співпрацюємо лише з надійними партнерами',
    },
    {
        icon: HiUsers,
        value: '50 000+',
        label: 'Користувачів',
        text: 'Вже знайшли свою роботу з нами',
    },
    {
        icon: HiGlobeAlt,
        value: '15+',
        label: 'Країн',
        text: 'Німеччина, Польща, Чехія та інші',
    },
]

const news = [
    {
        image: 'linear-gradient(135deg, #1b75bb, #7fb9f2)',
        date: '12 вересня 2026',
        title: 'Нові правила працевлаштування в ЄС у 2026 році',
        text: 'Що змінилося та які можливості відкриваються для українців.',
    },
    {
        image: 'linear-gradient(135deg, #dfe7ec, #7d909e)',
        date: '8 вересня 2026',
        title: 'Як підготуватися до переїзду на роботу в Європу',
        text: 'Покрокова інструкція для комфортного старту за кордоном.',
    },
    {
        image: 'linear-gradient(135deg, #f7f8f5, #d13f3f)',
        date: '5 вересня 2026',
        title: 'Польща спрощує умови для українських працівників',
        text: 'Що варто знати про нові зміни у законодавстві.',
    },
]

const guides = [
    {
        icon: HiDocumentText,
        title: 'Як скласти резюме європейського формату',
        text: 'Покрокова інструкція з прикладами',
    },
    {
        icon: HiPaperAirplane,
        title: 'Підготовка документів для виїзду',
        text: 'Повний список необхідних документів',
    },
    {
        icon: HiHome,
        title: 'Житло в Європі',
        text: 'Як знайти житло та на що звернути увагу',
    },
    {
        icon: HiChatBubbleLeftRight,
        title: 'Поради від тих, хто вже працює',
        text: 'Реальні історії та корисні поради',
    },
]

const holidays = [
    ['DE', '3 жовтня 2026', 'День німецької єдності'],
    ['PL', '11 листопада 2026', 'День незалежності'],
    ['CZ', '17 листопада 2026', 'День боротьби за свободу'],
    ['IT', '8 грудня 2026', 'День Непорочного Зачаття'],
]

function buildVacanciesPath({
    category,
    country,
    query,
}: {
    category: CategoryKey | ''
    country: CountryKey | ''
    query: string
}) {
    const params = new URLSearchParams()

    if (query.trim()) {
        params.set('query', query.trim())
    }

    if (country) {
        params.set('country', country)
    }

    if (category) {
        params.set('category', category)
    }

    const queryString = params.toString()

    return queryString
        ? `${routePaths.vacancies}?${queryString}`
        : routePaths.vacancies
}

export function HomePage() {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>(
        ''
    )
    const [selectedCountry, setSelectedCountry] = useState<CountryKey | ''>('')
    const [searchQuery, setSearchQuery] = useState('')

    const navigateToVacancies = useCallback(
        (nextValues?: {
            category?: CategoryKey | ''
            country?: CountryKey | ''
            query?: string
        }) => {
            navigate(
                buildVacanciesPath({
                    category: nextValues?.category ?? selectedCategory,
                    country: nextValues?.country ?? selectedCountry,
                    query: nextValues?.query ?? searchQuery,
                })
            )
        },
        [navigate, searchQuery, selectedCategory, selectedCountry]
    )

    const handleCategoryChange = useCallback(
        (category: CategoryKey | '') => {
            setSelectedCategory(category)
            navigateToVacancies({ category })
        },
        [navigateToVacancies]
    )

    return (
        <>
            <Section className="pt-8 pb-8 md:pt-12 md:pb-10" spacing="none">
                <Container>
                    <Hero
                        selectedCategory={selectedCategory}
                        selectedCountry={selectedCountry}
                        searchQuery={searchQuery}
                        onCategoryChange={handleCategoryChange}
                        onCountryChange={setSelectedCountry}
                        onSearchQueryChange={setSearchQuery}
                    />
                </Container>
            </Section>

            <HomePartners />
            <HomeStats />
            <HomeNews />
            <HomeGuides />
            <HomeInfoGrid />
            <HomeCta onClick={() => navigateToVacancies()} />
        </>
    )
}

function HomePartners() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    const showPreviousSlide = useCallback(() => {
        setActiveSlideIndex((currentSlideIndex) =>
            currentSlideIndex === 0
                ? partnerSlides.length - 1
                : currentSlideIndex - 1
        )
    }, [])

    const showNextSlide = useCallback(() => {
        setActiveSlideIndex((currentSlideIndex) =>
            currentSlideIndex === partnerSlides.length - 1
                ? 0
                : currentSlideIndex + 1
        )
    }, [])

    useEffect(() => {
        const intervalId = window.setInterval(showNextSlide, 10000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [showNextSlide])

    const activeSlide = partnerSlides[activeSlideIndex]

    return (
        <Section className="py-8" spacing="none">
            <Container>
                <SectionHeader
                    title="Наші партнери"
                    subtitle="Співпрацюємо з надійними компаніями по всій Європі"
                    link="Усі партнери"
                />
                <div className="relative mt-5">
                    <button
                        aria-label="Попередній слайд партнерів"
                        className="border-border bg-surface text-primary hover:border-muted hover:bg-background absolute top-1/2 left-0 z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-colors md:flex"
                        onClick={showPreviousSlide}
                        type="button"
                    >
                        <HiChevronLeft className="size-5" />
                    </button>

                    <div className="border-border bg-surface grid min-h-28 grid-cols-2 items-center gap-4 overflow-hidden rounded-xl border px-6 py-6 shadow-sm sm:grid-cols-4 lg:grid-cols-8">
                        {activeSlide.map((partner) => {
                            const Logo = partner.icon

                            return (
                                <div
                                    className="text-primary flex min-w-0 items-center justify-center gap-3 text-base font-extrabold sm:text-lg"
                                    key={partner.name}
                                >
                                    <Logo
                                        aria-hidden="true"
                                        className="size-8 shrink-0"
                                    />
                                    <span className="truncate">
                                        {partner.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <button
                        aria-label="Наступний слайд партнерів"
                        className="border-border bg-surface text-primary hover:border-muted hover:bg-background absolute top-1/2 right-0 z-10 hidden size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-colors md:flex"
                        onClick={showNextSlide}
                        type="button"
                    >
                        <HiChevronRight className="size-5" />
                    </button>
                </div>
                <div className="mt-6 flex justify-center gap-3">
                    {partnerSlides.map((_, item) => (
                        <button
                            aria-label={`Показати слайд партнерів ${item + 1}`}
                            className={`size-2 rounded-full transition-colors ${item === activeSlideIndex ? 'bg-sky-500' : 'bg-border hover:bg-muted'}`}
                            key={item}
                            onClick={() => setActiveSlideIndex(item)}
                            type="button"
                        />
                    ))}
                </div>
            </Container>
        </Section>
    )
}

function HomeStats() {
    return (
        <Section className="py-6" spacing="none">
            <Container>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => {
                        const Icon = item.icon

                        return (
                            <article
                                className="border-border bg-surface rounded-xl border p-7 shadow-sm"
                                key={item.label}
                            >
                                <span className="bg-accent/20 text-success flex size-13 items-center justify-center rounded-lg">
                                    <Icon className="size-7" />
                                </span>
                                <p className="text-primary mt-6 text-3xl font-extrabold">
                                    {item.value}
                                </p>
                                <h3 className="text-primary mt-1 text-lg font-bold leading-6">
                                    {item.label}
                                </h3>
                                <p className="text-muted mt-4 text-sm leading-6">
                                    {item.text}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </Container>
        </Section>
    )
}

function HomeNews() {
    return (
        <Section className="py-8" spacing="none">
            <Container>
                <SectionHeader
                    title="Новини"
                    subtitle="Актуальні події, корисні поради та зміни в сфері працевлаштування"
                    link="Усі новини"
                />
                <div className="mt-6 grid gap-7 md:grid-cols-3">
                    {news.map((item) => (
                        <article
                            className="border-border bg-surface overflow-hidden rounded-xl border shadow-sm"
                            key={item.title}
                        >
                            <div
                                className="h-44"
                                style={{ background: item.image }}
                            />
                            <div className="p-6">
                                <p className="text-muted text-sm">
                                    {item.date}
                                </p>
                                <h3 className="text-primary mt-3 text-lg font-bold leading-6">
                                    {item.title}
                                </h3>
                                <p className="text-muted mt-3 text-sm leading-6">
                                    {item.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </Section>
    )
}

function HomeGuides() {
    return (
        <Section className="py-8" spacing="none">
            <Container>
                <SectionHeader
                    title="Корисні інструкції"
                    subtitle="Покрокові гайди для успішного працевлаштування"
                    link="Усі інструкції"
                />
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {guides.map((item) => {
                        const Icon = item.icon

                        return (
                            <article
                                className="border-border bg-surface rounded-xl border p-6 shadow-sm"
                                key={item.title}
                            >
                                <span className="flex size-12 items-center justify-center rounded-lg bg-sky-50 text-sky-500">
                                    <Icon className="size-6" />
                                </span>
                                <h3 className="text-primary mt-5 font-bold leading-6">
                                    {item.title}
                                </h3>
                                <div className="mt-5 flex items-end justify-between gap-4">
                                    <p className="text-muted text-sm leading-6">
                                        {item.text}
                                    </p>
                                    <HiArrowRight className="text-muted size-5 shrink-0" />
                                </div>
                            </article>
                        )
                    })}
                </div>
            </Container>
        </Section>
    )
}

function HomeInfoGrid() {
    return (
        <Section className="py-8" spacing="none">
            <Container>
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <article className="border-border bg-surface rounded-xl border p-8 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-primary text-2xl font-bold">
                                    Середня зарплата
                                </h2>
                                <p className="text-primary mt-8 text-5xl font-bold">
                                    2 350 €
                                    <span className="bg-accent/20 text-success ml-3 rounded-full px-3 py-1 text-sm">
                                        +12%
                                    </span>
                                </p>
                                <p className="text-muted mt-3 text-sm">
                                    Середня зарплата в Європі у 2026 році
                                </p>
                            </div>
                            <span className="border-border rounded-md border px-3 py-2 text-sm">
                                € (EUR)
                            </span>
                        </div>
                        <div className="mt-8 flex h-28 items-end gap-4">
                            {[
                                26, 34, 42, 48, 55, 45, 58, 86, 62, 65, 75,
                                92, 72,
                            ].map((height, index) => (
                                <span
                                    className={`flex-1 rounded-t-md ${index === 7 ? 'bg-sky-500' : 'bg-slate-200'}`}
                                    style={{ height: `${height}%` }}
                                    key={index}
                                />
                            ))}
                        </div>
                    </article>

                    <article className="border-border bg-surface rounded-xl border p-8 shadow-sm">
                        <div className="flex gap-4">
                            <span className="bg-accent/20 text-success flex size-12 items-center justify-center rounded-lg">
                                <HiCalendarDays className="size-6" />
                            </span>
                            <div>
                                <h2 className="text-primary text-2xl font-bold">
                                    Свята в Європі
                                </h2>
                                <p className="text-muted mt-1 text-sm">
                                    Найближчі офіційні вихідні дні
                                </p>
                            </div>
                        </div>
                        <div className="mt-7 grid gap-3">
                            {holidays.map(([country, date, title]) => (
                                <div
                                    className="border-border flex items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm"
                                    key={date}
                                >
                                    <span className="text-primary font-semibold">
                                        {country} {date}
                                    </span>
                                    <span className="text-muted text-right">
                                        {title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </Container>
        </Section>
    )
}

function HomeCta({ onClick }: { onClick: () => void }) {
    return (
        <Section className="pt-8 pb-12" spacing="none">
            <Container>
                <div className="bg-primary text-surface grid gap-8 rounded-xl px-9 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                        <p className="text-xs font-bold tracking-[0.32em] uppercase text-white/70">
                            Почни свій шлях вже сьогодні
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            Знайди роботу своєї мрії
                        </h2>
                        <p className="mt-4 max-w-2xl text-white/75">
                            Приєднуйся до тисяч людей, які вже працюють у
                            найкращих компаніях Європи разом з VV Work.
                        </p>
                    </div>
                    <button
                        className="bg-accent text-primary hover:bg-accent-hover inline-flex h-14 items-center justify-center gap-3 rounded-md px-12 text-lg font-bold transition-colors"
                        onClick={onClick}
                        type="button"
                    >
                        Долучитися
                        <HiArrowRight className="size-5" />
                    </button>
                </div>
            </Container>
        </Section>
    )
}

function SectionHeader({
    title,
    subtitle,
    link,
}: {
    title: string
    subtitle: string
    link: string
}) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div>
                <h2 className="text-primary text-3xl font-bold">{title}</h2>
                <p className="text-muted mt-2 text-sm">{subtitle}</p>
            </div>
            <span className="text-primary hidden items-center gap-2 text-sm md:inline-flex">
                {link}
                <HiArrowRight className="size-4" />
            </span>
        </div>
    )
}
