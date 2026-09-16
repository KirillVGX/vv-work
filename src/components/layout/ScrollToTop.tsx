import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function ScrollToTop() {
    const { hash, pathname } = useLocation()

    useEffect(() => {
        if (import.meta.env.MODE === 'test') {
            return
        }

        if (hash) {
            const element = document.getElementById(
                decodeURIComponent(hash.slice(1))
            )

            element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }

        window.scrollTo(0, 0)
    }, [hash, pathname])

    return null
}
