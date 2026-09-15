import { useState } from 'react'
import type { FormEvent } from 'react'
import { HiClock, HiEnvelope, HiMapPin, HiPhone } from 'react-icons/hi2'

import { submitApplication } from '@/api'
import { Button, Container, Input, Section } from '@/components/ui'
import { cn } from '@/components/ui/utils'

type ApplicationFormValues = {
    name: string
    email: string
    contact: string
    subject: string
    message: string
}

type ApplicationFormErrors = Partial<
    Record<keyof ApplicationFormValues, string>
>

type ApplicationSubmitState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success'; message: string }
    | { status: 'error'; message: string }

const initialFormValues: ApplicationFormValues = {
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
}

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

function isValidPhoneOrTelegram(value: string) {
    const trimmedValue = value.trim()
    const phonePattern = /^\+?[0-9\s()-]{7,20}$/
    const telegramPattern = /^@?[A-Za-z0-9_]{5,32}$/

    return phonePattern.test(trimmedValue) || telegramPattern.test(trimmedValue)
}

function validateApplicationForm(values: ApplicationFormValues) {
    const errors: ApplicationFormErrors = {}

    if (values.name.trim().length < 2) {
        errors.name = 'Вкажіть імʼя мінімум з 2 символів.'
    }

    if (!isValidPhoneOrTelegram(values.contact)) {
        errors.contact = 'Вкажіть коректний телефон або Telegram.'
    }

    if (values.message.length > 500) {
        errors.message = 'Повідомлення має містити не більше 500 символів.'
    }

    return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) {
        return null
    }

    return (
        <span
            className="text-error text-xs font-medium"
            id={id}
            role="alert"
        >
            {message}
        </span>
    )
}

export function ContactsPage() {
    const [formValues, setFormValues] =
        useState<ApplicationFormValues>(initialFormValues)
    const [formErrors, setFormErrors] = useState<ApplicationFormErrors>({})
    const [submitState, setSubmitState] = useState<ApplicationSubmitState>({
        status: 'idle',
    })

    function updateField(field: keyof ApplicationFormValues, value: string) {
        setFormValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }))
        setFormErrors((currentErrors) => ({
            ...currentErrors,
            [field]: undefined,
        }))
        setSubmitState({ status: 'idle' })
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const nextErrors = validateApplicationForm(formValues)
        setFormErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            setSubmitState({ status: 'idle' })
            return
        }

        setSubmitState({ status: 'submitting' })

        const response = await submitApplication({
            name: formValues.name.trim(),
            email: formValues.email.trim(),
            contact: formValues.contact.trim(),
            subject: formValues.subject.trim(),
            message: formValues.message.trim(),
        })

        if (response.ok) {
            setSubmitState({
                status: 'success',
                message:
                    'Заявку надіслано. Ми звʼяжемося з вами найближчим часом.',
            })
            return
        }

        setSubmitState({
            status: 'error',
            message: response.error.message,
        })
    }

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

                    <form
                        className="border-border bg-surface rounded-md border p-5 md:p-6"
                        onSubmit={handleSubmit}
                    >
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
                                    aria-describedby={
                                        formErrors.name
                                            ? 'application-name-error'
                                            : undefined
                                    }
                                    error={Boolean(formErrors.name)}
                                    name="name"
                                    onChange={(event) =>
                                        updateField('name', event.target.value)
                                    }
                                    placeholder="Ваше імʼя"
                                    value={formValues.name}
                                />
                                <FieldError
                                    id="application-name-error"
                                    message={formErrors.name}
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Email
                                <Input
                                    name="email"
                                    onChange={(event) =>
                                        updateField('email', event.target.value)
                                    }
                                    placeholder="name@example.com"
                                    type="email"
                                    value={formValues.email}
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Телефон / Telegram
                                <Input
                                    aria-describedby={
                                        formErrors.contact
                                            ? 'application-contact-error'
                                            : undefined
                                    }
                                    error={Boolean(formErrors.contact)}
                                    name="contact"
                                    onChange={(event) =>
                                        updateField(
                                            'contact',
                                            event.target.value
                                        )
                                    }
                                    placeholder="+380 або @username"
                                    type="text"
                                    value={formValues.contact}
                                />
                                <FieldError
                                    id="application-contact-error"
                                    message={formErrors.contact}
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold">
                                Тема звернення
                                <Input
                                    name="subject"
                                    onChange={(event) =>
                                        updateField(
                                            'subject',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Пошук роботи"
                                    value={formValues.subject}
                                />
                            </label>
                            <label className="text-primary grid gap-2 text-sm font-semibold md:col-span-2">
                                Повідомлення
                                <textarea
                                    aria-describedby={
                                        formErrors.message
                                            ? 'application-message-error'
                                            : undefined
                                    }
                                    aria-invalid={
                                        formErrors.message ? true : undefined
                                    }
                                    className={cn(
                                        'bg-surface text-text placeholder:text-muted hover:border-primary min-h-32 w-full resize-y rounded-md border px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none',
                                        formErrors.message
                                            ? 'border-error focus:border-error focus:ring-error/25'
                                            : 'border-border focus:border-primary focus:ring-accent'
                                    )}
                                    name="message"
                                    onChange={(event) =>
                                        updateField(
                                            'message',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Розкажіть, чим можемо допомогти"
                                    value={formValues.message}
                                />
                                <FieldError
                                    id="application-message-error"
                                    message={formErrors.message}
                                />
                            </label>
                        </div>

                        <Button
                            className="mt-6"
                            disabled={submitState.status === 'submitting'}
                            fullWidth
                            size="lg"
                            type="submit"
                        >
                            {submitState.status === 'submitting'
                                ? 'Надсилання...'
                                : 'Надіслати'}
                        </Button>
                        {(submitState.status === 'success' ||
                            submitState.status === 'error') && (
                            <p
                                className={cn(
                                    'mt-4 text-sm font-semibold',
                                    submitState.status === 'success'
                                        ? 'text-success'
                                        : 'text-error'
                                )}
                                role="status"
                            >
                                {submitState.message}
                            </p>
                        )}
                    </form>
                </div>
            </Container>
        </Section>
    )
}
