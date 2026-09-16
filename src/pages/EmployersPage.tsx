import {
    HiArrowRight,
    HiBriefcase,
    HiChartBar,
    HiCheckBadge,
    HiShieldCheck,
    HiUsers,
} from 'react-icons/hi2'
import { Link } from 'react-router'

import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'

const benefits = [
    {
        icon: HiUsers,
        title: 'Доступ до кандидатів',
        text: 'Допомагаємо роботодавцям знаходити людей, які готові працювати в Європі та швидко виходити на контакт.',
    },
    {
        icon: HiShieldCheck,
        title: 'Прозорі умови',
        text: 'Структуруємо вакансії так, щоб кандидат одразу бачив країну, оплату, графік і вимоги.',
    },
    {
        icon: HiChartBar,
        title: 'Більше якісних відгуків',
        text: 'Зручний пошук і картки вакансій допомагають отримувати більш релевантні заявки.',
    },
]

const steps = [
    'Ви надсилаєте інформацію про компанію та відкриті вакансії.',
    'Ми перевіряємо деталі, умови роботи та формат співпраці.',
    'Публікуємо вакансії на платформі та допомагаємо кандидатам відгукуватися.',
]

export function EmployersPage() {
    return (
        <>
            <Section
                className="pt-10 pb-8 md:pt-14 md:pb-10"
                spacing="none"
            >
                <Container>
                    <div className="bg-panel-dark grid gap-10 rounded-3xl px-7 py-10 text-white md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:px-12">
                        <div>
                            <p className="text-accent text-sm font-extrabold tracking-[0.28em] uppercase">
                                Для роботодавців
                            </p>
                            <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-extrabold md:text-5xl">
                                Знаходьте працівників для роботи в Європі
                            </h1>
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                                VV Work допомагає компаніям публікувати вакансії,
                                показувати умови прозоро та отримувати відгуки від
                                кандидатів, які шукають роботу за кордоном.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-12 items-center justify-center gap-3 rounded-md px-6 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                    to={routePaths.contacts}
                                >
                                    Розмістити вакансію
                                    <HiArrowRight
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link
                                    className="border-white/20 text-white hover:border-accent hover:text-accent focus-visible:outline-accent inline-flex h-12 items-center justify-center rounded-md border px-6 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                                    to={routePaths.partners}
                                >
                                    Переглянути партнерів
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <HiBriefcase
                                className="text-accent size-12"
                                aria-hidden="true"
                            />
                            <p className="mt-6 text-3xl font-extrabold">
                                24 години
                            </p>
                            <p className="mt-2 text-sm leading-6 font-semibold text-white/62">
                                середній час першого контакту після отримання
                                заявки від роботодавця
                            </p>
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
                        {benefits.map((item) => {
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
                                Співпраця
                            </p>
                            <h2 className="text-primary mt-4 text-3xl font-extrabold md:text-4xl">
                                Як почати розміщувати вакансії
                            </h2>
                            <p className="text-muted mt-4 max-w-xl text-base leading-7">
                                Ми тримаємо процес простим: збираємо базові дані,
                                перевіряємо умови та готуємо вакансії до публікації.
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

                    <div className="bg-primary text-surface mt-10 grid gap-6 rounded-xl px-7 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-9">
                        <div>
                            <HiCheckBadge
                                className="text-accent size-9"
                                aria-hidden="true"
                            />
                            <h2 className="mt-4 text-2xl font-extrabold">
                                Готові додати вакансії?
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                                Напишіть нам, і ми підкажемо, які дані потрібні
                                для старту співпраці.
                            </p>
                        </div>
                        <Link
                            className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-12 items-center justify-center gap-3 rounded-md px-6 text-base font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                            to={routePaths.contacts}
                        >
                            Зв’язатися
                            <HiArrowRight
                                className="size-5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </Container>
            </Section>
        </>
    )
}
