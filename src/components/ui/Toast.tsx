import { useEffect, useState } from 'react'

import { cn } from './utils'
import { FiCheckCircle } from 'react-icons/fi'

const TOAST_TRANSITION_MS = 300

export function Toast({
    isOpen,
    message,
    durationMs = 3000,
    onClose,
}: {
    isOpen: boolean
    message: string
    durationMs?: number
    onClose: () => void
}) {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            return
        }

        setIsMounted(true)

        const showTimeoutId = window.setTimeout(() => {
            setIsVisible(true)
        }, 10)

        const hideTimeoutId = window.setTimeout(() => {
            setIsVisible(false)
        }, durationMs)

        const closeTimeoutId = window.setTimeout(() => {
            onClose()
        }, durationMs + TOAST_TRANSITION_MS)

        return () => {
            window.clearTimeout(showTimeoutId)
            window.clearTimeout(hideTimeoutId)
            window.clearTimeout(closeTimeoutId)
        }
    }, [isOpen, durationMs, onClose])

    useEffect(() => {
        if (isOpen || !isMounted) {
            return
        }

        const unmountTimeoutId = window.setTimeout(() => {
            setIsMounted(false)
        }, TOAST_TRANSITION_MS)

        return () => {
            window.clearTimeout(unmountTimeoutId)
        }
    }, [isOpen, isMounted])

    if (!isMounted) {
        return null
    }

    return (
        <div
    className={cn(
        'fixed bottom-8 left-1/2 z-50 flex w-[min(90vw,26rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-emerald-200/80 bg-green-50 px-5 py-4 text-sm font-medium text-gray-800 shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300 ease-out',
        isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0'
    )}
    role="status"
    aria-live="polite"
>
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <FiCheckCircle className="size-5" />
    </div>

    <span className="min-w-0 flex-1">
        {message}
    </span>
</div>
    )
}
