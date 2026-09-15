import {
    HiArrowRight,
    HiChatBubbleLeftRight,
    HiDocumentText,
    HiHome,
    HiPaperAirplane,
} from 'react-icons/hi2'

import { Container, Section } from '@/components/ui'

import { SectionHeader } from './SectionHeader'

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

export function HomeGuides() {
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
