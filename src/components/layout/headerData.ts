import { routePaths } from '@/routePaths'

type NavigationItem = {
    label: string
    to: string
    inactive?: boolean
}

export const navigationItems: NavigationItem[] = [
    { label: 'Головна', to: routePaths.home },
    { label: 'Роботодавцям', to: routePaths.employers },
    { label: 'Про нас', to: routePaths.about },
    { label: 'Партнери', to: routePaths.partners },
    { label: 'Контакти', to: routePaths.contacts },
]

export const languageOptions = [
    { label: 'UA', value: 'ua' },
    { label: 'EN', value: 'en' },
]
