import {
    HiArrowLeft,
    HiArrowRight,
} from 'react-icons/hi2'

import { cn } from './utils'

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function getVisiblePaginationItems(
    currentPage: number,
    totalPages: number
): PaginationItem[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (currentPage <= 2) {
        return [1, 2, 3, 'ellipsis-end', totalPages]
    }

    if (currentPage === 3) {
        return [1, 2, 3, 4, 'ellipsis-end', totalPages]
    }

    if (currentPage === totalPages) {
        return [1, 'ellipsis-start', totalPages - 1, totalPages]
    }

    if (currentPage === totalPages - 1) {
        return [1, 'ellipsis-start', totalPages - 2, totalPages - 1, totalPages]
    }

    if (currentPage === totalPages - 2) {
        return [
            1,
            'ellipsis-start',
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ]
    }

    return [
        1,
        'ellipsis-start',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        'ellipsis-end',
        totalPages,
    ]
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null
    }

    const paginationItems = getVisiblePaginationItems(currentPage, totalPages)

    return (
        <nav
            className="mt-9 flex justify-center pb-8"
            aria-label="Сторінки вакансій"
        >
            <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
                <PaginationArrow
                    direction="prev"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />

                {paginationItems.map((item) => {
                    if (typeof item !== 'number') {
                        return (
                            <span
                                className="text-muted flex size-11 items-center justify-center text-base font-semibold"
                                key={item}
                            >
                                ...
                            </span>
                        )
                    }

                    const isActive = currentPage === item

                    return (
                        <button
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'border-border bg-surface text-primary hover:bg-[#f4f7f1] focus-visible:outline-accent flex size-11 cursor-pointer items-center justify-center rounded-full border text-base font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
                                isActive &&
                                    'hover:bg-[#17212b]'
                            )}
                            key={item}
                            style={
                                isActive
                                    ? {
                                          backgroundColor: '#17212b',
                                          borderColor: '#17212b',
                                          color: '#ffffff',
                                      }
                                    : undefined
                            }
                            type="button"
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    )
                })}

                <PaginationArrow
                    direction="next"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </div>
        </nav>
    )
}

function PaginationArrow({
    direction,
    disabled,
    onClick,
}: {
    direction: 'prev' | 'next'
    disabled: boolean
    onClick: () => void
}) {
    const Icon = direction === 'prev' ? HiArrowLeft : HiArrowRight
    const label =
        direction === 'prev' ? 'Попередня сторінка' : 'Наступна сторінка'

    return (
        <button
            aria-label={label}
            className="border-border bg-surface text-primary hover:bg-[#f4f7f1] focus-visible:outline-accent flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-muted disabled:opacity-45 disabled:hover:bg-surface"
            type="button"
            disabled={disabled}
            onClick={onClick}
        >
            <Icon
                aria-hidden="true"
                className="size-5"
            />
        </button>
    )
}
