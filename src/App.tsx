import { AppLayout } from '@/components/layout'
import { Container, Section } from '@/components/ui'

export default function App() {
    return (
        <AppLayout>
            <Section spacing="lg">
                <Container>
                    <div className="max-w-2xl">
                        <p className="text-muted text-sm font-semibold">
                            VV Work
                        </p>
                        <h1 className="text-primary mt-3 text-4xl font-bold md:text-5xl">
                            Створюємо цифрові продукти для роботи й розвитку
                            бізнесу.
                        </h1>
                        <p className="text-muted mt-5 text-lg">
                            Базовий layout готовий для подальших сторінок,
                            секцій і компонентів українською мовою.
                        </p>
                    </div>
                </Container>
            </Section>
        </AppLayout>
    )
}
