import { useParams } from 'react-router'

import { Container, Section } from '@/components/ui'

export function PartnerPage() {
    const { slug } = useParams()

    return (
        <Section spacing="lg">
            <Container>
                <div className="max-w-2xl">
                    <p className="text-muted text-sm font-semibold">Партнер</p>
                    <h1 className="text-primary mt-3 text-4xl font-bold md:text-5xl">
                        {slug}
                    </h1>
                    <p className="text-muted mt-5 text-lg">
                        Базова сторінка партнера за динамічним маршрутом
                        /partners/:slug.
                    </p>
                </div>
            </Container>
        </Section>
    )
}
