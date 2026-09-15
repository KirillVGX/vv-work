import { describe, expect, it } from 'vitest'

import {
    initialFormValues,
    validateApplicationForm,
    type ApplicationFormValues,
} from './contactFormValidation'

describe('validateApplicationForm', () => {
    it('accepts a valid name', () => {
        const errors = validateApplicationForm(
            createFormValues({
                name: 'Іра',
            })
        )

        expect(errors.name).toBeUndefined()
    })

    it('rejects a short name', () => {
        const errors = validateApplicationForm(
            createFormValues({
                name: 'А',
            })
        )

        expect(errors.name).toBeDefined()
    })

    it('validates phone and Telegram contact formats', () => {
        const validContacts = [
            '+380 67 000 00 00',
            '380670000000',
            '@valid_user',
            'valid_user',
        ]
        const invalidContacts = ['abc', '@bad', '+38 phone']

        for (const contact of validContacts) {
            expect(
                validateApplicationForm(createFormValues({ contact })).contact
            ).toBeUndefined()
        }

        for (const contact of invalidContacts) {
            expect(
                validateApplicationForm(createFormValues({ contact })).contact
            ).toBeDefined()
        }
    })

    it('enforces the optional message length limit', () => {
        expect(
            validateApplicationForm(
                createFormValues({
                    message: 'a'.repeat(500),
                })
            ).message
        ).toBeUndefined()

        expect(
            validateApplicationForm(
                createFormValues({
                    message: 'a'.repeat(501),
                })
            ).message
        ).toBeDefined()
    })
})

function createFormValues(
    overrides: Partial<ApplicationFormValues> = {}
): ApplicationFormValues {
    return {
        ...initialFormValues,
        name: 'Олена',
        contact: '+380 67 000 00 00',
        ...overrides,
    }
}
