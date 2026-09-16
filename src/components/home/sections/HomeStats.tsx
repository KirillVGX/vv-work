import {
    HiBriefcase,
    HiGlobeAlt,
    HiShieldCheck,
    HiUsers,
} from 'react-icons/hi2'

import { Section } from '@/components/ui'

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
            <div className="mx-auto w-[min(100%_-_2rem,110rem)] md:w-[min(100%_-_3rem,110rem)] xl:w-[min(100%_-_8rem,110rem)]">
                <div className="bg-panel-dark grid min-h-[19.3rem] overflow-hidden rounded-3xl text-white md:grid-cols-2 lg:grid-cols-4 xl:py-15">
                    {stats.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <article
                                className={[
                                    'px-7 py-8 md:px-8 lg:px-9 xl:px-[3.375rem] xl:py-0 2xl:px-14',
                                    index > 0
                                        ? 'border-t border-white/10'
                                        : '',
                                    index % 2 === 1
                                        ? 'md:border-l md:border-white/10'
                                        : '',
                                    index > 1
                                        ? 'md:border-t md:border-white/10'
                                        : '',
                                    index > 0
                                        ? 'lg:border-t-0 lg:border-l lg:border-white/10'
                                        : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                                key={item.label}
                            >
                                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                                    <Icon className="size-4" />
                                </span>
                                <p className="mt-7 text-[2.5rem] leading-none font-extrabold text-white">
                                    {item.value}
                                </p>
                                <h3 className="mt-2.5 text-lg leading-6 font-extrabold text-white">
                                    {item.label}
                                </h3>
                                <p className="mt-0.5 max-w-68 text-base leading-[1.45] text-white/62">
                                    {item.text}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}
