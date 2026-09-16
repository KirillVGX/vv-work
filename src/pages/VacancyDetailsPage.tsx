import { useCallback, useEffect, useState } from 'react'
import {
    HiArrowRight,
    HiBriefcase,
    HiCheckCircle,
    HiClock,
    HiMapPin,
} from 'react-icons/hi2'
import type { IconType } from 'react-icons'
import { useParams } from 'react-router'

import { fetchVacancyById } from '@/api'
import { MatchBadge, SavedVacancyButton } from '@/components/home'
import { Container, ErrorBlock, Section, Toast } from '@/components/ui'
import { cn } from '@/components/ui/utils'
import type { Vacancy } from '@/types'

type VacancyDetailsState =
    | { status: 'loading' }
    | { status: 'success'; vacancy: Vacancy }
    | { status: 'error'; message: string }

const logoToneClasses: Record<Vacancy['logoTone'], string> = {
    dark: 'bg-primary text-white',
    blue: 'bg-blue-50 text-sky-600',
    cyan: 'bg-cyan-50 text-sky-700',
    lime: 'bg-accent/25 text-success',
}

const responsibilities = [
    'Виконувати щоденні робочі задачі відповідно до інструкцій роботодавця.',
    'Дотримуватися правил безпеки, графіку та внутрішніх процедур компанії.',
    'Повідомляти координатора про зміни, питання або потребу в підтримці.',
]

const requirements = [
    'Готовність до повної зайнятості та роботи за графіком компанії.',
    'Відповідальність, уважність до деталей і готовність працювати в команді.',
    'Базова комунікація з координатором або представником роботодавця.',
]

const benefits = [
    'Перевірений роботодавець і прозорі умови співпраці.',
    'Підтримка на етапі відгуку та первинної комунікації.',
    'Актуальна інформація про оплату, локацію та формат зайнятості.',
]

export function VacancyDetailsPage() {
    const { id } = useParams()
    const [state, setState] = useState<VacancyDetailsState>({
        status: 'loading',
    })

    const loadVacancy = useCallback(
        async (options?: { showLoading?: boolean; isStale?: () => boolean }) => {
            if (!id) {
                setState({
                    status: 'error',
                    message: 'Вакансію не знайдено',
                })
                return
            }

            if (options?.showLoading) {
                setState({ status: 'loading' })
            }

            const response = await fetchVacancyById(id)

            if (options?.isStale?.()) {
                return
            }

            if (!response.ok) {
                setState({
                    status: 'error',
                    message: response.error.message,
                })
                return
            }

            setState({
                status: 'success',
                vacancy: response.data,
            })
        },
        [id]
    )

    useEffect(() => {
        let shouldIgnore = false

        void loadVacancy({
            isStale: () => shouldIgnore,
        })

        return () => {
            shouldIgnore = true
        }
    }, [loadVacancy])

    return (
        <Section spacing="lg">
            <Container>
                {state.status === 'loading' && <VacancyDetailsSkeleton />}
                {state.status === 'error' && (
                    <ErrorBlock
                        title="Не вдалося завантажити вакансію"
                        message={state.message}
                        minHeightClassName="min-h-[18rem]"
                        onRetry={() => void loadVacancy({ showLoading: true })}
                    />
                )}
                {state.status === 'success' && (
                    <VacancyDetailsContent vacancy={state.vacancy} />
                )}
            </Container>
        </Section>
    )
}

function VacancyDetailsContent({ vacancy }: { vacancy: Vacancy }) {
    return (
        <article className="border-border bg-surface mx-auto max-w-5xl rounded-3xl border p-6 shadow-sm md:p-9">
            <div className="flex items-start justify-between gap-6">
                <p className="text-muted text-sm font-semibold">Вакансія</p>
                <SavedVacancyButton vacancyId={vacancy.id} />
            </div>

            <div className="mt-4 flex items-start gap-4">
                <span
                    className={cn(
                        'flex size-16 shrink-0 items-center justify-center rounded-lg text-2xl font-extrabold',
                        logoToneClasses[vacancy.logoTone]
                    )}
                    aria-hidden="true"
                >
                    {vacancy.logo}
                </span>
                <div className="min-w-0">
                    <h1 className="text-primary text-4xl leading-tight font-extrabold md:text-5xl">
                        {vacancy.title}
                    </h1>
                    <p className="text-muted mt-2 text-lg font-semibold">
                        {vacancy.company}
                    </p>
                </div>
            </div>

            <dl className="border-border mt-8 grid gap-5 border-y py-6 text-sm md:grid-cols-2">
                <VacancyInfoRow
                    icon={HiBriefcase}
                    label="Категорія"
                    value={vacancy.category}
                />
                <VacancyInfoRow
                    icon={HiMapPin}
                    label="Локація"
                    value={vacancy.location}
                />
                <VacancyInfoRow
                    icon={HiClock}
                    label="Зайнятість"
                    value="Повна зайнятість"
                />
                <div>
                    <dt className="text-muted">Сумісність</dt>
                    <dd className="mt-2">
                        <MatchBadge>{vacancy.match}</MatchBadge>
                    </dd>
                </div>
            </dl>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-muted text-sm font-semibold">
                        Зарплата
                    </p>
                    <p className="text-success mt-1 text-3xl font-extrabold">
                        {vacancy.salary}
                    </p>
                </div>
                <ApplyButton />
            </div>

            <p className="text-muted mt-8 max-w-4xl text-lg leading-8">
                Актуальна пропозиція для кандидатів, які шукають роботу в
                Європі з прозорими умовами, зрозумілою оплатою та підтримкою на
                етапі відгуку.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
                {vacancy.tags.map((tag) => (
                    <span
                        className="bg-background text-muted rounded-md px-3 py-1.5 text-sm font-semibold"
                        key={tag}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="border-border mt-8 grid gap-8 border-t pt-8">
                <InfoSection
                    title="Обов’язки"
                    items={responsibilities}
                />
                <InfoSection
                    title="Вимоги"
                    items={requirements}
                />
                <InfoSection
                    title="Що ви отримуєте"
                    items={benefits}
                />
            </div>
        </article>
    )
}

function ApplyButton() {
    const [isToastOpen, setIsToastOpen] = useState(false)

    return (
        <>
            <button
                className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-12 items-center justify-center gap-3 rounded-md px-8 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => setIsToastOpen(true)}
                type="button"
            >
                Відгукнутися
                <HiArrowRight
                    className="size-5"
                    aria-hidden="true"
                />
            </button>

            <Toast
                isOpen={isToastOpen}
                message="Відгук надіслано! Роботодавець отримав вашу заявку і скоро зв’яжеться з вами."
                onClose={() => setIsToastOpen(false)}
            />
        </>
    )
}

function VacancyInfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: IconType
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <Icon
                className="text-muted mt-0.5 size-5 shrink-0"
                aria-hidden="true"
            />
            <div>
                <dt className="text-muted">{label}</dt>
                <dd className="text-primary mt-1 font-semibold">{value}</dd>
            </div>
        </div>
    )
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
    return (
        <section>
            <h2 className="text-primary text-2xl font-extrabold">{title}</h2>
            <ul className="mt-5 grid gap-4">
                {items.map((item) => (
                    <li
                        className="text-muted flex gap-3 text-base leading-7"
                        key={item}
                    >
                        <HiCheckCircle
                            className="text-success mt-1 size-5 shrink-0"
                            aria-hidden="true"
                        />
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    )
}

function VacancyDetailsSkeleton() {
    return (
        <div className="border-border bg-surface mx-auto max-w-5xl rounded-3xl border p-6 shadow-sm md:p-9">
            <div className="bg-border h-4 w-24 animate-pulse rounded-md" />
            <div className="mt-4 flex items-center gap-4">
                <div className="bg-border size-16 animate-pulse rounded-lg" />
                <div className="flex-1">
                    <div className="bg-border h-12 max-w-xl animate-pulse rounded-md" />
                    <div className="bg-border mt-3 h-5 w-48 animate-pulse rounded-md" />
                </div>
            </div>
            <div className="bg-border mt-8 h-20 animate-pulse rounded-md" />
            <div className="bg-border mt-8 h-5 max-w-3xl animate-pulse rounded-md" />
            <div className="bg-border mt-3 h-5 max-w-2xl animate-pulse rounded-md" />
        </div>
    )
}
