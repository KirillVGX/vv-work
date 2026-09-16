import {
    HiArrowRight,
    HiGlobeEuropeAfrica,
    HiShieldCheck,
    HiUsers,
} from 'react-icons/hi2'
import { Link } from 'react-router'

import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'

const values = [
    {
        icon: HiShieldCheck,
        title: 'Перевірені роботодавці',
        text: 'Ми працюємо з партнерами, які відкрито показують умови, оплату та очікування до кандидатів.',
    },
    {
        icon: HiUsers,
        title: 'Підтримка кандидатів',
        text: 'Допомагаємо швидше зорієнтуватися у вакансіях, країнах, вимогах і наступних кроках.',
    },
    {
        icon: HiGlobeEuropeAfrica,
        title: 'Робота в Європі',
        text: 'Фокусуємося на актуальних пропозиціях у країнах ЄС для людей з різним досвідом.',
    },
]

const steps = [
    'Збираємо вакансії від надійних компаній і партнерів.',
    'Структуруємо інформацію, щоб умови було легко порівнювати.',
    'Допомагаємо кандидатам перейти від пошуку до контакту з роботодавцем.',
]

export function AboutPage() {
    return (
        <>
            <Section
                className="pt-10 pb-8 md:pt-14 md:pb-10"
                spacing="none"
            >
                <Container>
                    <div className="bg-panel-dark grid gap-10 rounded-3xl px-7 py-10 text-white md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center lg:px-12">
                        <div>
                            <p className="text-accent text-sm font-extrabold tracking-[0.28em] uppercase">
                                Про VV Work
                            </p>
                            <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-extrabold md:text-5xl">
                                Допомагаємо знаходити роботу в Європі без зайвого шуму
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                                VV Work — платформа для кандидатів і роботодавців,
                                яка поєднує актуальні вакансії, зрозумілі умови та
                                перевірених партнерів в одному місці.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-12 items-center justify-center gap-3 rounded-md px-6 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                    to={routePaths.vacancies}
                                >
                                    Знайти вакансії
                                    <HiArrowRight
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link
                                    className="border-white/20 text-white hover:border-accent hover:text-accent focus-visible:outline-accent inline-flex h-12 items-center justify-center rounded-md border px-6 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                    to={routePaths.contacts}
                                >
                                    Зв’язатися
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {[
                                ['10 000+', 'актуальних вакансій'],
                                ['50 000+', 'користувачів платформи'],
                                ['15+', 'країн для пошуку роботи'],
                            ].map(([value, label]) => (
                                <div
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                                    key={label}
                                >
                                    <p className="text-3xl font-extrabold text-white">
                                        {value}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white/62">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            <Section
                className="py-8 md:py-10"
                spacing="none"
            >
                <Container>
                    <div className="grid gap-5 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon

                            return (
                                <article
                                    className="border-border bg-surface rounded-xl border p-7 shadow-sm"
                                    key={item.title}
                                >
                                    <span className="bg-accent/20 text-success flex size-12 items-center justify-center rounded-xl">
                                        <Icon
                                            className="size-6"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <h2 className="text-primary mt-6 text-xl font-extrabold">
                                        {item.title}
                                    </h2>
                                    <p className="text-muted mt-3 text-sm leading-6">
                                        {item.text}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </Container>
            </Section>

            <Section
                className="pt-4 pb-14 md:pb-20"
                spacing="none"
            >
                <Container>
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <p className="text-muted text-sm font-extrabold tracking-[0.28em] uppercase">
                                Як ми працюємо
                            </p>
                            <h2 className="text-primary mt-4 text-3xl font-extrabold md:text-4xl">
                                Прозорий шлях від пошуку до відгуку
                            </h2>
                            <p className="text-muted mt-4 max-w-xl text-base leading-7">
                                Ми робимо пошук роботи більш зрозумілим: менше
                                випадкових оголошень, більше структурованої
                                інформації та чітких дій.
                            </p>
                        </div>

                        <div className="border-border bg-surface rounded-xl border p-6 shadow-sm">
                            <ol className="grid gap-5">
                                {steps.map((step, index) => (
                                    <li
                                        className="flex gap-4"
                                        key={step}
                                    >
                                        <span className="bg-primary text-accent flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold">
                                            {index + 1}
                                        </span>
                                        <p className="text-primary pt-1 text-base leading-7 font-semibold">
                                            {step}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    )
}
