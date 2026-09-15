import {
    HiBriefcase,
    HiGlobeAlt,
    HiShieldCheck,
    HiUsers,
} from 'react-icons/hi2'

import { Container, Section } from '@/components/ui'

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

export function HomeStats() {
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
