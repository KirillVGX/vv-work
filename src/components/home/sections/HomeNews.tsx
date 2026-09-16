import { Container, Section } from '@/components/ui'

import { SectionHeader } from './SectionHeader'

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

export function HomeNews() {
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
                    linkTo="#news"
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
