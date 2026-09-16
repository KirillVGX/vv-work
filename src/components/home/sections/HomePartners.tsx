import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import type { IconType } from 'react-icons'
import {
    SiAdidas,
    SiAirbnb,
    SiApple,
    SiDhl,
    SiFord,
    SiGoogle,
    SiIkea,
    SiMcdonalds,
    SiNetflix,
    SiNike,
    SiPaypal,
    SiPuma,
    SiSamsung,
    SiSpotify,
    SiTesla,
    SiUber,
    SiVisa,
    SiYoutube,
    SiZara,
} from 'react-icons/si'

import { Container, Section } from '@/components/ui'
import { routePaths } from '@/routePaths'

import { SectionHeader } from './SectionHeader'

const partnerSlides: {
    name: string
    icon: IconType
}[][] = [
    [
        { name: 'McDonald’s', icon: SiMcdonalds },
        { name: 'Nike', icon: SiNike },
        { name: 'Adidas', icon: SiAdidas },
        { name: 'Puma', icon: SiPuma },
        { name: 'IKEA', icon: SiIkea },
        { name: 'Zara', icon: SiZara },
        { name: 'Visa', icon: SiVisa },
        { name: 'PayPal', icon: SiPaypal },
    ],
    [
        { name: 'Google', icon: SiGoogle },
        { name: 'Apple', icon: SiApple },
        { name: 'DHL', icon: SiDhl },
        { name: 'Samsung', icon: SiSamsung },
        { name: 'Ford', icon: SiFord },
        { name: 'Tesla', icon: SiTesla },
        { name: 'Uber', icon: SiUber },
        { name: 'Airbnb', icon: SiAirbnb },
    ],
    [
        { name: 'Spotify', icon: SiSpotify },
        { name: 'Netflix', icon: SiNetflix },
        { name: 'YouTube', icon: SiYoutube },
        { name: 'McDonald’s', icon: SiMcdonalds },
        { name: 'Nike', icon: SiNike },
        { name: 'IKEA', icon: SiIkea },
        { name: 'Samsung', icon: SiSamsung },
        { name: 'Visa', icon: SiVisa },
    ],
    [
        { name: 'Zara', icon: SiZara },
        { name: 'Adidas', icon: SiAdidas },
        { name: 'Puma', icon: SiPuma },
        { name: 'Google', icon: SiGoogle },
        { name: 'Apple', icon: SiApple },
        { name: 'DHL', icon: SiDhl },
        { name: 'Uber', icon: SiUber },
        { name: 'PayPal', icon: SiPaypal },
    ],
]

export function HomePartners() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const dragStartXRef = useRef<number | null>(null)
    const dragDeltaXRef = useRef(0)

    const showPreviousSlide = useCallback(() => {
        setActiveSlideIndex((currentSlideIndex) =>
            currentSlideIndex === 0
                ? partnerSlides.length - 1
                : currentSlideIndex - 1
        )
    }, [])

    const showNextSlide = useCallback(() => {
        setActiveSlideIndex((currentSlideIndex) =>
            currentSlideIndex === partnerSlides.length - 1
                ? 0
                : currentSlideIndex + 1
        )
    }, [])

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            event.preventDefault()
            dragStartXRef.current = event.clientX
            dragDeltaXRef.current = 0
            event.currentTarget.setPointerCapture(event.pointerId)
        },
        []
    )

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (dragStartXRef.current === null) {
                return
            }

            dragDeltaXRef.current = event.clientX - dragStartXRef.current
        },
        []
    )

    const handlePointerEnd = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (dragStartXRef.current === null) {
                return
            }

            if (dragDeltaXRef.current > 48) {
                showPreviousSlide()
            }

            if (dragDeltaXRef.current < -48) {
                showNextSlide()
            }

            dragStartXRef.current = null
            dragDeltaXRef.current = 0

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
            }
        },
        [showNextSlide, showPreviousSlide]
    )

    useEffect(() => {
        const intervalId = window.setInterval(showNextSlide, 10000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [showNextSlide])

    return (
        <Section
            className="py-8"
            spacing="none"
        >
            <Container>
                <SectionHeader
                    title="Наші партнери"
                    subtitle="Співпрацюємо з надійними компаніями по всій Європі"
                    link="Усі партнери"
                    linkTo={routePaths.partners}
                />
                <div
                    className="border-border bg-surface mt-5 overflow-hidden rounded-xl border shadow-sm"
                    onPointerCancel={handlePointerEnd}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd}
                >
                    <div
                        className="flex cursor-grab touch-pan-y transition-transform duration-700 ease-out select-none active:cursor-grabbing"
                        style={{
                            transform: `translateX(-${activeSlideIndex * 100}%)`,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    >
                        {partnerSlides.map((slide, slideIndex) => (
                            <div
                                aria-hidden={slideIndex !== activeSlideIndex}
                                className="grid min-h-28 w-full shrink-0 grid-cols-2 items-center gap-4 px-6 py-6 sm:grid-cols-4 lg:grid-cols-8"
                                key={slideIndex}
                            >
                                {slide.map((partner) => {
                                    const Logo = partner.icon

                                    return (
                                        <div
                                            className="text-primary flex min-w-0 items-center justify-center gap-3 text-base font-extrabold sm:text-lg"
                                            key={partner.name}
                                        >
                                            <Logo
                                                aria-hidden="true"
                                                className="size-8 shrink-0"
                                            />
                                            <span className="truncate">
                                                {partner.name}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-1">
                    {partnerSlides.map((_, item) => (
                        <button
                            aria-label={`Показати слайд партнерів ${item + 1}`}
                            className="group flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            key={item}
                            onClick={() => setActiveSlideIndex(item)}
                            type="button"
                        >
                            <span
                                className={`size-2.5 rounded-full transition-colors ${item === activeSlideIndex ? 'bg-sky-500' : 'bg-[#dfe6e3] group-hover:bg-muted'}`}
                            />
                        </button>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
