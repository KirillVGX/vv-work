import axe from 'axe-core'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'

import { AppLayout } from '@/components/layout'
import { ContactsPage } from '@/pages/ContactsPage'
import { HomePage } from '@/pages/HomePage'
import { routePaths } from '@/routePaths'

const SERIOUS_IMPACTS = new Set(['critical', 'serious'])

describe('accessibility', () => {
    afterEach(() => {
        cleanup()
    })

    it('has no critical or serious axe issues on the home page', async () => {
        const { container } = renderPage(<HomePage />, routePaths.home)

        await expectNoSeriousAxeViolations(container)
    })

    it('has no critical or serious axe issues on the contacts page', async () => {
        const { container } = renderPage(<ContactsPage />, routePaths.contacts)

        await expectNoSeriousAxeViolations(container)
    })
})

function renderPage(page: React.ReactNode, route: string) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <AppLayout>{page}</AppLayout>
        </MemoryRouter>
    )
}

async function expectNoSeriousAxeViolations(container: HTMLElement) {
    const results = await axe.run(container, {
        runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
        },
    })
    const seriousViolations = results.violations.filter((violation) =>
        SERIOUS_IMPACTS.has(violation.impact ?? '')
    )

    expect(seriousViolations).toEqual([])
}
