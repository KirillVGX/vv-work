import type { ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { HiCheck, HiChevronDown } from 'react-icons/hi2'

import { cn } from './utils'

export type FilterDropdownOption = {
    label: string
    value: string
}

type FilterDropdownProps = {
    label: string
    value: string
    options: FilterDropdownOption[]
    onChange: (value: string) => void
    icon: ReactNode
    className?: string
}

export function FilterDropdown({
    label,
    value,
    options,
    onChange,
    icon,
    className,
}: FilterDropdownProps) {
    const dropdownId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const selectedOption = options.find((option) => option.value === value)
    const displayLabel = selectedOption?.label ?? label
    const hasValue = value !== ''

    useEffect(() => {
        if (!isOpen) {
            return
        }

        function handlePointerDown(event: PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    return (
        <div
            className={cn('relative', className)}
            ref={rootRef}
        >
            <button
                className={cn(
                    'text-muted hover:bg-background hover:text-primary flex h-14 w-full min-w-0 cursor-pointer items-center gap-4 px-6 text-left transition-colors duration-150',
                    'focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                    isOpen && 'text-primary ring-primary/25 ring-1 ring-inset',
                    hasValue && 'text-primary font-semibold'
                )}
                type="button"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className="text-primary shrink-0">{icon}</span>
                <span className="min-w-0 flex-1 truncate text-base">
                    {displayLabel}
                </span>
                <HiChevronDown
                    aria-hidden="true"
                    className={cn(
                        'size-4 shrink-0 transition-transform duration-150',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            <div
                className={cn(
                    'border-border bg-surface absolute top-[calc(100%+0.5rem)] right-3 left-3 z-50 rounded-xl border p-1.5 shadow-[0_16px_34px_rgba(23,33,43,0.12)]',
                    'origin-top transition duration-150 ease-out',
                    isOpen
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-1.5 opacity-0'
                )}
                id={dropdownId}
            >
                {options.map((option) => {
                    const isSelected = option.value === value

                    return (
                        <button
                            className={cn(
                                'text-primary flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-[#f4f7f1]',
                                isSelected &&
                                    'bg-accent/20 hover:bg-accent/30 font-semibold'
                            )}
                            type="button"
                            key={option.value}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            <span>{option.label}</span>
                            {isSelected && (
                                <HiCheck
                                    aria-hidden="true"
                                    className="text-success size-4"
                                />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
