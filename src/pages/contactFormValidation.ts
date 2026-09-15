export type ApplicationFormValues = {
    name: string
    email: string
    contact: string
    subject: string
    message: string
}

export type ApplicationFormErrors = Partial<
    Record<keyof ApplicationFormValues, string>
>

export const initialFormValues: ApplicationFormValues = {
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
}

export function isValidPhoneOrTelegram(value: string) {
    const trimmedValue = value.trim()
    const phonePattern = /^\+?[0-9\s()-]{7,20}$/
    const telegramPattern = /^@?[A-Za-z0-9_]{5,32}$/

    return phonePattern.test(trimmedValue) || telegramPattern.test(trimmedValue)
}

export function validateApplicationForm(values: ApplicationFormValues) {
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
