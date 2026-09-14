const HOLIDAY_NAME_UK: Record<string, string> = {
    "New Year's Day": 'Новий рік',
    Epiphany: 'Богоявлення',
    "International Women's Day": 'Міжнародний жіночий день',
    'Good Friday': "Страсна п'ятниця",
    'Maundy Thursday': 'Великий четвер',
    'Easter Sunday': 'Великдень',
    'Easter Monday': 'Великодній понеділок',
    'Labour Day': 'День праці',
    'May Day': 'Перше травня',
    'International Workers Day': 'День міжнародної солідарності трудящих',
    'Ascension Day': 'Вознесіння Господнє',
    Pentecost: 'День Святої Трійці',
    'Whit Monday': 'День Святого Духа',
    'Corpus Christi': 'Свято Тіла і Крові Христових',
    'Assumption Day': 'Успіння Пресвятої Богородиці',
    Assumption: 'Успіння Пресвятої Богородиці',
    "World Children's Day": 'Всесвітній день дитини',
    'German Unity Day': 'День німецької єдності',
    'Reformation Day': 'День Реформації',
    "All Saints' Day": 'День усіх святих',
    'All Saints Day': 'День усіх святих',
    'Repentance and Prayer Day': 'День покаяння і молитви',
    'Christmas Eve': 'Святий вечір',
    'Christmas Day': 'Різдво Христове',
    "St. Stephen's Day": 'День Святого Стефана',
    'Constitution Day': 'День Конституції',
    'Independence Day': 'День незалежності',
    'Liberation Day': 'День визволення',
    'Saints Cyril and Methodius Day': 'День Кирила і Мефодія',
    'Jan Hus Day': 'День Яна Гуса',
    'St. Wenceslas Day': 'День Святого Вацлава',
    'Independent Czechoslovak State Day':
        'День утворення незалежної Чехословацької держави',
    'Struggle for Freedom and Democracy Day':
        'День боротьби за свободу і демократію',
    "King's Day": 'День короля',
    'Day of Andalucía': 'День Андалусії',
    'Day of the Balearic Islands': 'День Балеарських островів',
    'Castile and León Day': 'День Кастилії і Леону',
    'Day of Aragón': 'День Арагону',
    'Day of Madrid': 'День Мадрида',
    'Galician Literature Day': 'День галісійської літератури',
    'Day of the Canary Islands': 'День Канарських островів',
    'Day of Castilla-La Mancha': 'День Кастилії-Ла-Манчі',
    'Day of La Rioja': 'День Ла-Ріохи',
    'Day of Murcia': 'День Мурсії',
    "St. John's Day": 'День Святого Іоанна',
    'Santiago Apóstol': 'День Святого Якова',
    'Day of the Cantabrian Institutions': 'День інституцій Кантабрії',
    'Day of Asturias': 'День Астурії',
    'Day of Extremadura': 'День Естремадури',
    'National Day of Catalonia': 'Національний день Каталонії',
    'Feast of Our Lady of Bien Aparecida': "День Богоматері Б'єн Апарісіди",
    'Day of the Valencian Community': 'День Валенсійської спільноти',
    'National Day of Spain': 'Національний день Іспанії',
    'Immaculate Conception': 'Непорочне зачаття Діви Марії',
    'Republic Day': 'День Республіки',
    "St. Francis of Assisi's Day": 'День Святого Франциска Ассізького',
    'Victory in Europe Day': 'День перемоги в Європі',
    'Bastille Day': 'День Бастилії',
    'Armistice Day': "День перемир'я",
}

const MYMEMORY_TRANSLATE_URL = 'https://api.mymemory.translated.net/get'
const TRANSLATE_TIMEOUT_MS = 2500

const translationCache = new Map<string, string>()

async function translateViaApi(englishName: string) {
    if (translationCache.has(englishName)) {
        return translationCache.get(englishName)
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(
        () => controller.abort(),
        TRANSLATE_TIMEOUT_MS
    )

    try {
        const url = new URL(MYMEMORY_TRANSLATE_URL)
        url.searchParams.set('q', englishName)
        url.searchParams.set('langpair', 'en|uk')

        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
            return undefined
        }

        const payload: { responseData?: { translatedText?: string } } =
            await response.json()
        const translated = payload.responseData?.translatedText

        if (!translated) {
            return undefined
        }

        translationCache.set(englishName, translated)
        return translated
    } catch {
        return undefined
    } finally {
        window.clearTimeout(timeoutId)
    }
}

export async function translateHolidayName(
    englishName: string,
    fallback: string
) {
    const knownTranslation = HOLIDAY_NAME_UK[englishName]

    if (knownTranslation) {
        return knownTranslation
    }

    const apiTranslation = await translateViaApi(englishName)

    return apiTranslation ?? fallback
}
