import { Link } from 'react-router'

import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'

export function HomePage() {
    return (
        <Section spacing="lg">
            <Container>
                <div className="max-w-2xl">
                    <p className="text-muted text-sm font-semibold">VV Work</p>
                    <h1 className="text-primary mt-3 text-4xl font-bold md:text-5xl">
                        Створюємо цифрові продукти для роботи й розвитку
                        бізнесу.
                    </h1>
                    <p className="text-muted mt-5 text-lg">
                        Базова структура сторінок готова для подальшого
                        наповнення українською мовою.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            className="bg-accent text-primary hover:bg-accent-hover focus-visible:outline-accent inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                            to={routePaths.contacts}
                        >
                            Звʼязатися
                        </Link>
                        <Link
                            className="border-border bg-surface text-primary hover:border-primary hover:bg-background focus-visible:outline-primary inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                            to={routePaths.demoPartner}
                        >
                            Приклад партнера
                        </Link>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
