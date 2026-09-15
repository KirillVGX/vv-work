import { routePaths } from '@/routePaths'

export const navigationItems = [
    { label: 'Головна', to: routePaths.home },
    { label: 'Роботодавцям', to: routePaths.demoPartner },
    { label: 'Про нас', to: `${routePaths.home}#about`, inactive: true },
    { label: 'Партнери', to: routePaths.demoPartner, inactive: true },
    { label: 'Контакти', to: routePaths.contacts },
]

export const languageOptions = [
    { label: 'UA', value: 'ua' },
    { label: 'EN', value: 'en' },
]
