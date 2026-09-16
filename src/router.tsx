import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/components/layout'
import { AboutPage } from '@/pages/AboutPage'
import { ContactsPage } from '@/pages/ContactsPage'
import { EmployersPage } from '@/pages/EmployersPage'
import { HomePage } from '@/pages/HomePage'
import { PartnerPage } from '@/pages/PartnerPage'
import { PartnersPage } from '@/pages/PartnersPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { TermsPage } from '@/pages/TermsPage'
import { VacancyDetailsPage } from '@/pages/VacancyDetailsPage'
import { VacanciesPage } from '@/pages/VacanciesPage'
import { routePaths } from '@/routePaths'

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: routePaths.home,
                element: <HomePage />,
            },
            {
                path: routePaths.vacancies,
                element: <VacanciesPage />,
            },
            {
                path: routePaths.vacancy,
                element: <VacancyDetailsPage />,
            },
            {
                path: routePaths.about,
                element: <AboutPage />,
            },
            {
                path: routePaths.employers,
                element: <EmployersPage />,
            },
            {
                path: routePaths.partner,
                element: <PartnerPage />,
            },
            {
                path: routePaths.contacts,
                element: <ContactsPage />,
            },
            {
                path: routePaths.partners,
                element: <PartnersPage />,
            },
            {
                path: routePaths.privacy,
                element: <PrivacyPolicyPage />,
            },
            {
                path: routePaths.terms,
                element: <TermsPage />,
            },
        ],
    },
])
