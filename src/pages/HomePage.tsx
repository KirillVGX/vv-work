import { Hero, VacancySection } from '@/components/home'
import { Container, Section } from '@/components/ui'

export function HomePage() {
    return (
        <>
            <Section
                className="pt-8 pb-8 md:pt-10 md:pb-7"
                spacing="none"
            >
                <Container>
                    <Hero />
                </Container>
            </Section>

            <Section
                className="pt-4 pb-10 md:pt-5 md:pb-12"
                spacing="none"
            >
                <Container>
                    <VacancySection />
                </Container>
            </Section>
        </>
    )
}
