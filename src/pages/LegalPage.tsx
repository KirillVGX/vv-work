import { Container, Section } from '@/components/ui'

type LegalSection = {
    title: string
    text: string
}

type LegalPageProps = {
    title: string
    subtitle: string
    sections: LegalSection[]
}

export function LegalPage({ title, subtitle, sections }: LegalPageProps) {
    return (
        <Section
            className="pt-10 pb-14 md:pt-14 md:pb-20"
            spacing="none"
        >
            <Container>
                <div className="mx-auto max-w-4xl">
                    <p className="text-muted text-sm font-extrabold tracking-[0.28em] uppercase">
                        VV Work
                    </p>
                    <h1 className="text-primary mt-4 text-4xl leading-tight font-extrabold md:text-5xl">
                        {title}
                    </h1>
                    <p className="text-muted mt-4 text-lg leading-8">
                        {subtitle}
                    </p>

                    <div className="border-border bg-surface mt-8 rounded-xl border p-6 shadow-sm md:p-8">
                        <div className="grid gap-7">
                            {sections.map((section) => (
                                <section key={section.title}>
                                    <h2 className="text-primary text-xl font-extrabold">
                                        {section.title}
                                    </h2>
                                    <p className="text-muted mt-3 text-base leading-7">
                                        {section.text}
                                    </p>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
