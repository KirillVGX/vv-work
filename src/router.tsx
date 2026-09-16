import { lazy, Suspense } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/components/layout'
import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'

const HomePage = lazy(() =>
    import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
)
const VacanciesPage = lazy(() =>
    import('@/pages/VacanciesPage').then((module) => ({
        default: module.VacanciesPage,
    }))
)
const VacancyDetailsPage = lazy(() =>
    import('@/pages/VacancyDetailsPage').then((module) => ({
        default: module.VacancyDetailsPage,
    }))
)
const AboutPage = lazy(() =>
    import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage }))
)
const EmployersPage = lazy(() =>
    import('@/pages/EmployersPage').then((module) => ({
        default: module.EmployersPage,
    }))
)
const PartnerPage = lazy(() =>
    import('@/pages/PartnerPage').then((module) => ({
        default: module.PartnerPage,
    }))
)
const PartnersPage = lazy(() =>
    import('@/pages/PartnersPage').then((module) => ({
        default: module.PartnersPage,
    }))
)
const ContactsPage = lazy(() =>
    import('@/pages/ContactsPage').then((module) => ({
        default: module.ContactsPage,
    }))
)
const PrivacyPolicyPage = lazy(() =>
    import('@/pages/PrivacyPolicyPage').then((module) => ({
        default: module.PrivacyPolicyPage,
    }))
)
const TermsPage = lazy(() =>
    import('@/pages/TermsPage').then((module) => ({
        default: module.TermsPage,
    }))
)

function PageFallback() {
    return (
        <Section spacing="lg">
            <Container>
                <div className="grid gap-4">
                    <div className="bg-border h-10 max-w-xl animate-pulse rounded-md" />
                    <div className="bg-border h-5 max-w-3xl animate-pulse rounded-md" />
                    <div className="bg-border h-5 max-w-2xl animate-pulse rounded-md" />
                </div>
            </Container>
        </Section>
    )
}

function routeElement(Component: LazyExoticComponent<ComponentType>) {
    return (
        <Suspense fallback={<PageFallback />}>
            <Component />
        </Suspense>
    )
}

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: routePaths.home,
                element: routeElement(HomePage),
            },
            {
                path: routePaths.vacancies,
                element: routeElement(VacanciesPage),
            },
            {
                path: routePaths.vacancy,
                element: routeElement(VacancyDetailsPage),
            },
            {
                path: routePaths.about,
                element: routeElement(AboutPage),
            },
            {
                path: routePaths.employers,
                element: routeElement(EmployersPage),
            },
            {
                path: routePaths.partner,
                element: routeElement(PartnerPage),
            },
            {
                path: routePaths.contacts,
                element: routeElement(ContactsPage),
            },
            {
                path: routePaths.partners,
                element: routeElement(PartnersPage),
            },
            {
                path: routePaths.privacy,
                element: routeElement(PrivacyPolicyPage),
            },
            {
                path: routePaths.terms,
                element: routeElement(TermsPage),
            },
        ],
    },
])
