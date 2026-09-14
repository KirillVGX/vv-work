import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import type { IconType } from 'react-icons'
import {
    HiArrowRight,
    HiBriefcase,
    HiCalendarDays,
    HiChatBubbleLeftRight,
    HiChevronDown,
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

import {
    fetchAverageSalary,
    fetchExchangeRates,
    fetchUpcomingHolidays,
} from '@/api'
import { Hero } from '@/components/home'
import { Container, ErrorBlock, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'
import type {
    AverageSalary,
    CategoryKey,
    CountryKey,
    CurrencyCode,
    ExchangeRates,
    Holiday,
} from '@/types'

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
            <Section
                className="pt-8 pb-8 md:pt-12 md:pb-10"
                spacing="none"
            >
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
    const dragStartXRef = useRef<number | null>(null)
    const dragDeltaXRef = useRef(0)

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

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            event.preventDefault()
            dragStartXRef.current = event.clientX
            dragDeltaXRef.current = 0
            event.currentTarget.setPointerCapture(event.pointerId)
        },
        []
    )

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (dragStartXRef.current === null) {
                return
            }

            dragDeltaXRef.current = event.clientX - dragStartXRef.current
        },
        []
    )

    const handlePointerEnd = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (dragStartXRef.current === null) {
                return
            }

            if (dragDeltaXRef.current > 48) {
                showPreviousSlide()
            }

            if (dragDeltaXRef.current < -48) {
                showNextSlide()
            }

            dragStartXRef.current = null
            dragDeltaXRef.current = 0

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
            }
        },
        [showNextSlide, showPreviousSlide]
    )

    useEffect(() => {
        const intervalId = window.setInterval(showNextSlide, 10000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [showNextSlide])

    return (
        <Section
            className="py-8"
            spacing="none"
        >
            <Container>
                <SectionHeader
                    title="Наші партнери"
                    subtitle="Співпрацюємо з надійними компаніями по всій Європі"
                    link="Усі партнери"
                />
                <div
                    className="border-border bg-surface mt-5 overflow-hidden rounded-xl border shadow-sm"
                    onPointerCancel={handlePointerEnd}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd}
                >
                    <div
                        className="flex cursor-grab touch-pan-y transition-transform duration-700 ease-out select-none active:cursor-grabbing"
                        style={{
                            transform: `translateX(-${activeSlideIndex * 100}%)`,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    >
                        {partnerSlides.map((slide, slideIndex) => (
                            <div
                                aria-hidden={slideIndex !== activeSlideIndex}
                                className="grid min-h-28 w-full shrink-0 grid-cols-2 items-center gap-4 px-6 py-6 sm:grid-cols-4 lg:grid-cols-8"
                                key={slideIndex}
                            >
                                {slide.map((partner) => {
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
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                    {partnerSlides.map((_, item) => (
                        <button
                            aria-label={`Показати слайд партнерів ${item + 1}`}
                            className={`size-2.5 shrink-0 cursor-pointer rounded-full transition-colors ${item === activeSlideIndex ? 'bg-sky-500' : 'hover:bg-muted bg-[#dfe6e3]'}`}
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
        <Section
            className="py-6"
            spacing="none"
        >
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
                                <h3 className="text-primary mt-1 text-lg leading-6 font-bold">
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
        <Section
            className="py-8"
            spacing="none"
        >
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
                                <h3 className="text-primary mt-3 text-lg leading-6 font-bold">
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
        <Section
            className="py-8"
            spacing="none"
        >
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
                                <h3 className="text-primary mt-5 leading-6 font-bold">
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

type SalaryCardState =
    | { status: 'loading' }
    | { status: 'success'; salary: AverageSalary; rates: ExchangeRates }
    | { status: 'error'; message: string }

function buildSmoothAreaPath(points: { x: number; y: number }[]) {
    if (points.length === 0) {
        return { line: '', area: '' }
    }

    let line = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        const midX = (prev.x + curr.x) / 2

        line += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`
    }

    const first = points[0]
    const last = points[points.length - 1]
    const area = `${line} L ${last.x} 100 L ${first.x} 100 Z`

    return { line, area }
}

function SalaryChart({
    points,
    currency,
    rates,
}: {
    points: AverageSalary['points']
    currency: CurrencyCode
    rates: ExchangeRates
}) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const amounts = points.map((point) => point.amount)
    const min = Math.min(...amounts)
    const max = Math.max(...amounts)
    const range = max - min || 1
    const chartWidth = 300
    const chartTopPadding = 8
    const chartBottomPadding = 8

    const coords = points.map((point, index) => ({
        x:
            points.length > 1
                ? (index / (points.length - 1)) * chartWidth
                : chartWidth / 2,
        y:
            100 -
            chartBottomPadding -
            ((point.amount - min) / range) *
                (100 - chartTopPadding - chartBottomPadding),
    }))

    const { line, area } = buildSmoothAreaPath(coords)
    const lastCoord = coords[coords.length - 1]
    const activeCoord = hoveredIndex !== null ? coords[hoveredIndex] : null
    const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null

    const handlePointerMove = useCallback(
        (event: PointerEvent<SVGSVGElement>) => {
            const svg = svgRef.current

            if (!svg || coords.length === 0) {
                return
            }

            const rect = svg.getBoundingClientRect()
            const ratio = (event.clientX - rect.left) / rect.width
            const index = Math.round(ratio * (coords.length - 1))

            setHoveredIndex(Math.min(Math.max(index, 0), coords.length - 1))
        },
        [coords.length]
    )

    return (
        <div className="mt-8">
            <div className="relative">
                <svg
                    className="h-28 w-full cursor-pointer overflow-visible"
                    onPointerLeave={() => setHoveredIndex(null)}
                    onPointerMove={handlePointerMove}
                    preserveAspectRatio="none"
                    ref={svgRef}
                    viewBox="0 0 300 100"
                >
                    <defs>
                        <linearGradient
                            id="salaryChartFill"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--color-sky-500, #0ea5e9)"
                                stopOpacity="0.28"
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--color-sky-500, #0ea5e9)"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        d={area}
                        fill="url(#salaryChartFill)"
                        stroke="none"
                    />
                    <path
                        d={line}
                        fill="none"
                        stroke="var(--color-sky-500, #0ea5e9)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        vectorEffect="non-scaling-stroke"
                    />
                    {activeCoord && (
                        <line
                            className="transition-opacity duration-150 ease-out"
                            opacity={hoveredIndex !== null ? 0.4 : 0}
                            stroke="var(--color-sky-500, #0ea5e9)"
                            strokeDasharray="3 3"
                            vectorEffect="non-scaling-stroke"
                            x1={activeCoord.x}
                            x2={activeCoord.x}
                            y1={0}
                            y2={100}
                        />
                    )}
                    {(activeCoord ?? lastCoord) && (
                        <circle
                            className="transition-[cx,cy,opacity] duration-150 ease-out"
                            cx={(activeCoord ?? lastCoord)?.x}
                            cy={(activeCoord ?? lastCoord)?.y}
                            fill="var(--color-sky-500, #0ea5e9)"
                            opacity={hoveredIndex !== null ? 1 : 0}
                            r={4}
                            stroke="white"
                            strokeWidth={2}
                            vectorEffect="non-scaling-stroke"
                        />
                    )}
                    {lastCoord && (
                        <circle
                            className="transition-opacity duration-150 ease-out"
                            cx={lastCoord.x}
                            cy={lastCoord.y}
                            fill="var(--color-sky-500, #0ea5e9)"
                            opacity={hoveredIndex === null ? 1 : 0}
                            r={4}
                            stroke="white"
                            strokeWidth={2}
                            vectorEffect="non-scaling-stroke"
                        />
                    )}
                </svg>
                {(activeCoord ?? lastCoord) && (
                    <div
                        className="border-border bg-surface text-primary pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-lg border px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-md transition-all duration-150 ease-out"
                        style={{
                            left: `${((activeCoord ?? lastCoord)!.x / chartWidth) * 100}%`,
                            top: `${(activeCoord ?? lastCoord)!.y}%`,
                            opacity: hoveredIndex !== null ? 1 : 0,
                        }}
                    >
                        {(activePoint ?? points[points.length - 1])?.label}:{' '}
                        {formatCurrencyAmount(
                            convertFromEur(
                                (activePoint ?? points[points.length - 1])
                                    ?.amount ?? 0,
                                currency,
                                rates
                            ),
                            currency
                        )}
                    </div>
                )}
            </div>
            <div className="text-muted mt-2 flex justify-between text-xs">
                {points.map((point) => (
                    <span key={point.label}>{point.label}</span>
                ))}
            </div>
        </div>
    )
}

function SalaryChartSkeleton() {
    return <div className="mt-8 h-28 animate-pulse rounded-lg bg-slate-100" />
}

function AverageSalaryCard() {
    const [state, setState] = useState<SalaryCardState>({
        status: 'loading',
    })
    const [currency, setCurrency] = useState<CurrencyCode>('EUR')

    const loadSalary = useCallback(async () => {
        setState({ status: 'loading' })

        const [salaryResponse, ratesResponse] = await Promise.all([
            fetchAverageSalary(),
            fetchExchangeRates(),
        ])

        if (!salaryResponse.ok) {
            setState({ status: 'error', message: salaryResponse.error.message })
            return
        }

        if (!ratesResponse.ok) {
            setState({ status: 'error', message: ratesResponse.error.message })
            return
        }

        setState({
            status: 'success',
            salary: salaryResponse.data,
            rates: ratesResponse.data,
        })
    }, [])

    useEffect(() => {
        void loadSalary()
    }, [loadSalary])

    return (
        <article className="border-border bg-surface rounded-xl border p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-primary text-2xl font-bold">
                        Середня зарплата
                    </h2>
                    {state.status === 'success' ? (
                        <>
                            <p className="text-primary mt-8 text-5xl font-bold">
                                {formatCurrencyAmount(
                                    convertFromEur(
                                        state.salary.amount,
                                        currency,
                                        state.rates
                                    ),
                                    currency
                                )}
                                <span className="bg-accent/20 text-success ml-3 rounded-full px-3 py-1 text-sm">
                                    {state.salary.changePercent > 0 ? '+' : ''}
                                    {state.salary.changePercent}%
                                </span>
                            </p>
                            <p className="text-muted mt-3 text-sm">
                                Річна нетто-зарплата в ЄС за {state.salary.year}{' '}
                                рік · дані Eurostat
                            </p>
                        </>
                    ) : (
                        <div className="mt-8 h-14 w-48 animate-pulse rounded-md bg-slate-100" />
                    )}
                </div>
                <label className="border-border relative rounded-md border text-sm">
                    <select
                        className="text-primary cursor-pointer appearance-none rounded-md bg-transparent py-2 pr-8 pl-3 focus-visible:outline-none"
                        onChange={(event) =>
                            setCurrency(event.target.value as CurrencyCode)
                        }
                        value={currency}
                    >
                        {CURRENCY_OPTIONS.map((option) => (
                            <option
                                key={option.code}
                                value={option.code}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <HiChevronDown
                        aria-hidden="true"
                        className="text-muted pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2"
                    />
                </label>
            </div>
            {state.status === 'loading' && <SalaryChartSkeleton />}
            {state.status === 'error' && (
                <div className="mt-8">
                    <ErrorBlock
                        message={state.message}
                        minHeightClassName="min-h-28"
                        onRetry={loadSalary}
                        title="Не вдалося завантажити дані про зарплати"
                    />
                </div>
            )}
            {state.status === 'success' && (
                <SalaryChart
                    currency={currency}
                    points={state.salary.points}
                    rates={state.rates}
                />
            )}
        </article>
    )
}

type HolidaysCardState =
    | { status: 'loading' }
    | { status: 'success'; holidays: Holiday[] }
    | { status: 'error'; message: string }

const holidayDateFormatter = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

function HolidaysCardSkeleton() {
    return (
        <div className="mt-7 grid gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    className="h-[3.25rem] animate-pulse rounded-md bg-slate-100"
                    key={index}
                />
            ))}
        </div>
    )
}

function HolidaysCard() {
    const [state, setState] = useState<HolidaysCardState>({
        status: 'loading',
    })

    const loadHolidays = useCallback(async () => {
        setState({ status: 'loading' })

        const response = await fetchUpcomingHolidays()

        if (response.ok) {
            setState({ status: 'success', holidays: response.data })
            return
        }

        setState({ status: 'error', message: response.error.message })
    }, [])

    useEffect(() => {
        void loadHolidays()
    }, [loadHolidays])

    return (
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
                        Найближчі офіційні вихідні дні · дані Nager.Date
                    </p>
                </div>
            </div>
            {state.status === 'loading' && <HolidaysCardSkeleton />}
            {state.status === 'error' && (
                <div className="mt-7">
                    <ErrorBlock
                        message={state.message}
                        minHeightClassName="min-h-[13rem]"
                        onRetry={loadHolidays}
                        title="Не вдалося завантажити свята"
                    />
                </div>
            )}
            {state.status === 'success' && (
                <div className="mt-7 grid gap-3">
                    {state.holidays.map((holiday) => (
                        <div
                            className="border-border flex items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm"
                            key={`${holiday.countryKey}-${holiday.date}`}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <img
                                    alt=""
                                    aria-hidden="true"
                                    className="border-border size-9 shrink-0 rounded-full border object-cover"
                                    height={36}
                                    loading="lazy"
                                    src={`https://flagcdn.com/w80/${holiday.countryCode}.png`}
                                    width={36}
                                />
                                <div className="min-w-0">
                                    <p className="text-primary truncate font-semibold">
                                        {holiday.countryLabel}
                                    </p>
                                    <p className="text-muted text-xs">
                                        {holidayDateFormatter.format(
                                            new Date(holiday.date)
                                        )}
                                    </p>
                                </div>
                            </div>
                            <span className="text-primary text-right font-medium">
                                {holiday.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </article>
    )
}

function HomeInfoGrid() {
    return (
        <Section
            className="py-8"
            spacing="none"
        >
            <Container>
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <AverageSalaryCard />
                    <HolidaysCard />
                </div>
            </Container>
        </Section>
    )
}

function HomeCta({ onClick }: { onClick: () => void }) {
    return (
        <Section
            className="pt-8 pb-12"
            spacing="none"
        >
            <Container>
                <div className="bg-primary text-surface grid gap-8 rounded-xl px-9 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                        <p className="text-xs font-bold tracking-[0.32em] text-white/70 uppercase">
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
