import { HiArrowPath } from 'react-icons/hi2'

import { Button } from './Button'
import { cn } from './utils'

type ErrorBlockProps = {
    title: string
    message: string
    retryLabel?: string
    isRetrying?: boolean
    minHeightClassName?: string
    onRetry: () => void
}

export function ErrorBlock({
    title,
    message,
    retryLabel = 'Спробувати ще раз',
    isRetrying = false,
    minHeightClassName = 'min-h-[13.25rem]',
    onRetry,
}: ErrorBlockProps) {
    return (
        <div
            className={cn(
                'border-border bg-surface flex flex-col items-start justify-center rounded-md border p-5',
                minHeightClassName
            )}
        >
            <p className="text-primary font-bold">{title}</p>
            <p className="text-muted mt-2 max-w-xl text-sm">{message}</p>
            <Button
                className="mt-5 gap-2"
                disabled={isRetrying}
                onClick={onRetry}
                size="sm"
            >
                <HiArrowPath
                    aria-hidden="true"
                    className={`size-4 ${isRetrying ? 'animate-spin' : ''}`}
                />
                {isRetrying ? 'Завантаження...' : retryLabel}
            </Button>
        </div>
    )
}
