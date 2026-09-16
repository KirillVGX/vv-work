import { useEffect, useRef, useState } from 'react'

export function useInView<TElement extends HTMLElement>(options?: {
    rootMargin?: string
}) {
    const ref = useRef<TElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        if (isInView) {
            return
        }

        const element = ref.current

        if (!element) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                }
            },
            { rootMargin: options?.rootMargin ?? '200px' }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [isInView, options?.rootMargin])

    return { ref, isInView }
}
