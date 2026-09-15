import { HiClock, HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2'

import { Button, Container, Input, Section } from '@/components/ui'

const contactItems = [
    {
        icon: HiEnvelope,
        label: 'Email',
        value: 'hello@vv-work.com',
        text: 'Напишіть нам щодо вакансій, партнерства або роботи платформи.',
    },
    {
        icon: HiPhone,
        label: 'Телефон',
        value: '+380 67 000 00 00',
        text: 'Відповідаємо на запити кандидатів і роботодавців у робочий час.',
    },
    {
        icon: HiMapPin,
        label: 'Локація',
        value: 'Київ, Україна',
        text: 'Працюємо з кандидатами та партнерами по всій Європі.',
    },
    {
        icon: HiClock,
        label: 'Графік',
        value: 'Пн-Пт, 09:00-18:00',
        text: 'Заявки з форми опрацьовуємо у порядку надходження.',
    },
]

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
                            Долучайтеся до запуску VV Work
                        </h1>
                        <p className="text-muted mt-5 text-lg leading-8">
                            Напишіть нам, якщо ви шукаєте роботу в Європі,
                            наймаєте працівників або хочете приєднатися до
                            команди продукту.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {contactItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <article
                                        className="border-border bg-surface rounded-md border p-5"
                                        key={item.label}
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="bg-accent/20 text-success flex size-11 shrink-0 items-center justify-center rounded-md">
                                                <Icon
                                                    aria-hidden="true"
                                                    className="size-5"
                                                />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-muted text-sm font-semibold">
                                                    {item.label}
                                                </p>
                                                <p className="text-primary mt-1 font-bold break-words">
                                                    {item.value}
                                                </p>
                                                <p className="text-muted mt-2 text-sm leading-6">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>

                    <form className="border-border bg-surface rounded-md border p-5 md:p-6">
                        <div>
                            <p className="text-primary text-2xl font-bold">
                                Залишити заявку
                            </p>
                            <p className="text-muted mt-2 text-sm leading-6">
                                Заповніть форму, і ми звʼяжемося з вами після
                                обробки звернення.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Телефон
                                <Input
                                    name="phone"
                                    placeholder="+380"
                                    type="tel"
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Тема звернення
                                <Input
                                    name="subject"
                                    placeholder="Пошук роботи"
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold md:col-span-2">
                                Повідомлення
                                <textarea
                                    className="border-border bg-surface text-text placeholder:text-muted hover:border-primary focus:border-primary focus:ring-accent min-h-32 w-full resize-y rounded-md border px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
                                    name="message"
                                    placeholder="Розкажіть, чим можемо допомогти"
                                />
                            </label>
                        </div>

                        <Button
                            className="mt-6"
                            fullWidth
                            size="lg"
                        >
                            Надіслати
                        </Button>
                    </form>
                </div>
            </Container>
        </Section>
    )
}
