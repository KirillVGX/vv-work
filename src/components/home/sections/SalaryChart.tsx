import { useCallback, useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import type { AverageSalary, CurrencyCode, ExchangeRates } from '@/types'

import { convertFromEur, formatCurrencyAmount } from './currency'

type ChartCoord = { x: number; y: number }

function buildSmoothAreaPath(points: ChartCoord[]) {
    if (points.length === 0) {
        return { line: '', area: '' }
    }

    let line = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]
        const midX = (prev.x + curr.x) / 2

        line += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`
    }

    const first = points[0]
    const last = points[points.length - 1]
    const area = `${line} L ${last.x} 100 L ${first.x} 100 Z`

    return { line, area }
}

export function SalaryChart({
    points,
    currency,
    rates,
}: {
    points: AverageSalary['points']
    currency: CurrencyCode
    rates: ExchangeRates
}) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const chartWidth = 300
    const chartTopPadding = 8
    const chartBottomPadding = 8

    const { area, coords, line } = useMemo(() => {
        const amounts = points.map((point) => point.amount)
        const min = Math.min(...amounts)
        const max = Math.max(...amounts)
        const range = max - min || 1

        const nextCoords = points.map((point, index) => ({
            x:
                points.length > 1
                    ? (index / (points.length - 1)) * chartWidth
                    : chartWidth / 2,
            y:
                100 -
                chartBottomPadding -
                ((point.amount - min) / range) *
                    (100 - chartTopPadding - chartBottomPadding),
        }))
        const paths = buildSmoothAreaPath(nextCoords)

        return {
            area: paths.area,
            coords: nextCoords,
            line: paths.line,
        }
    }, [points])
    const lastCoord = coords[coords.length - 1]
    const activeCoord = hoveredIndex !== null ? coords[hoveredIndex] : null
    const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null
    const displayCoord = activeCoord ?? lastCoord
    const displayPoint = activePoint ?? points[points.length - 1]

    const handlePointerMove = useCallback(
        (event: PointerEvent<SVGSVGElement>) => {
            const svg = svgRef.current

            if (!svg || coords.length === 0) {
                return
            }

            const rect = svg.getBoundingClientRect()
            const ratio = (event.clientX - rect.left) / rect.width
            const index = Math.round(ratio * (coords.length - 1))

            setHoveredIndex(Math.min(Math.max(index, 0), coords.length - 1))
        },
        [coords.length]
    )

    return (
        <div className="mt-8 min-w-0 overflow-hidden">
            <div className="relative">
                <svg
                    className="h-28 w-full cursor-pointer overflow-visible"
                    onPointerLeave={() => setHoveredIndex(null)}
                    onPointerMove={handlePointerMove}
                    preserveAspectRatio="none"
                    ref={svgRef}
                    viewBox="0 0 300 100"
                >
                    <defs>
                        <linearGradient
                            id="salaryChartFill"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--color-sky-500, #0ea5e9)"
                                stopOpacity="0.28"
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--color-sky-500, #0ea5e9)"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        d={area}
                        fill="url(#salaryChartFill)"
                        stroke="none"
                    />
                    <path
                        d={line}
                        fill="none"
                        stroke="var(--color-sky-500, #0ea5e9)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        vectorEffect="non-scaling-stroke"
                    />
                    {activeCoord && (
                        <line
                            className="transition-opacity duration-150 ease-out"
                            opacity={hoveredIndex !== null ? 0.4 : 0}
                            stroke="var(--color-sky-500, #0ea5e9)"
                            strokeDasharray="3 3"
                            vectorEffect="non-scaling-stroke"
                            x1={activeCoord.x}
                            x2={activeCoord.x}
                            y1={0}
                            y2={100}
                        />
                    )}
                    {displayCoord && (
                        <circle
                            className="transition-[cx,cy,opacity] duration-150 ease-out"
                            cx={displayCoord.x}
                            cy={displayCoord.y}
                            fill="var(--color-sky-500, #0ea5e9)"
                            opacity={hoveredIndex !== null ? 1 : 0}
                            r={4}
                            stroke="white"
                            strokeWidth={2}
                            vectorEffect="non-scaling-stroke"
                        />
                    )}
                    {lastCoord && (
                        <circle
                            className="transition-opacity duration-150 ease-out"
                            cx={lastCoord.x}
                            cy={lastCoord.y}
                            fill="var(--color-sky-500, #0ea5e9)"
                            opacity={hoveredIndex === null ? 1 : 0}
                            r={4}
                            stroke="white"
                            strokeWidth={2}
                            vectorEffect="non-scaling-stroke"
                        />
                    )}
                </svg>
                {displayCoord && (
                    <div
                        className="border-border bg-surface text-primary pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-lg border px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-md transition-all duration-150 ease-out"
                        style={{
                            left: `${(displayCoord.x / chartWidth) * 100}%`,
                            top: `${displayCoord.y}%`,
                            opacity: hoveredIndex !== null ? 1 : 0,
                        }}
                    >
                        {displayPoint?.label}:{' '}
                        {formatCurrencyAmount(
                            convertFromEur(
                                displayPoint?.amount ?? 0,
                                currency,
                                rates
                            ),
                            currency
                        )}
                    </div>
                )}
            </div>
            <div className="text-muted mt-2 flex justify-between gap-2 text-[0.6875rem] sm:text-xs">
                {points.map((point) => (
                    <span key={point.label}>{point.label}</span>
                ))}
            </div>
        </div>
    )
}
