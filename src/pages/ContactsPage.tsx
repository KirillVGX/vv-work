import { Button, Container, Input, Section } from '@/components/ui'

export function ContactsPage() {
    return (
        <Section spacing="lg">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <p className="text-muted text-sm font-semibold">
                            Контакти
                        </p>
                        <h1 className="text-primary mt-3 text-4xl font-bold md:text-5xl">
                            Обговоримо ваш проєкт
                        </h1>
                        <p className="text-muted mt-5 text-lg">
                            Залиште контактні дані, і ми повернемось із
                            наступними кроками.
                        </p>
                    </div>

                    <form className="border-border bg-surface rounded-md border p-5 md:p-6">
                        <div className="grid gap-4">
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Імʼя
                                <Input
                                    name="name"
                                    placeholder="Ваше імʼя"
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Email
                                <Input
                                    name="email"
                                    placeholder="name@example.com"
                                    type="email"
                                />
                            </label>
                            <Button className="mt-2">Надіслати</Button>
                        </div>
                    </form>
                </div>
            </Container>
        </Section>
    )
}
