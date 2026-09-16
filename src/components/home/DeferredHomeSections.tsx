import { lazy, Suspense } from 'react'

import { Section } from '@/components/ui'
import { useInView } from '@/hooks/useInView'

const HomeStats = lazy(() =>
    import('@/components/home/sections/HomeStats').then((module) => ({
        default: module.HomeStats,
    }))
)
const HomePartners = lazy(() =>
    import('@/components/home/sections/HomePartners').then((module) => ({
        default: module.HomePartners,
    }))
)
const HomeNews = lazy(() =>
    import('@/components/home/sections/HomeNews').then((module) => ({
        default: module.HomeNews,
    }))
)
const HomeInfoGrid = lazy(() =>
    import('@/components/home/sections/HomeInfoGrid').then((module) => ({
        default: module.HomeInfoGrid,
    }))
)
const HomeCta = lazy(() =>
    import('@/components/home/sections/HomeCta').then((module) => ({
        default: module.HomeCta,
    }))
)

type DeferredHomeSectionsProps = {
    onCtaClick: () => void
}

function HomeSectionsFallback() {
    return <Section className="min-h-80" spacing="none" />
}

export function DeferredHomeSections({ onCtaClick }: DeferredHomeSectionsProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({
        rootMargin: '600px',
    })

    return (
        <div ref={ref}>
            {isInView ? (
                <Suspense fallback={<HomeSectionsFallback />}>
                    <HomeStats />
                    <HomePartners />
                    <HomeNews />
                    <HomeInfoGrid />
                    <HomeCta onClick={onCtaClick} />
                </Suspense>
            ) : (
                <HomeSectionsFallback />
            )}
        </div>
    )
}
