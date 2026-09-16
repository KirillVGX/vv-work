import { vi } from 'vitest'

class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin = '0px'
    readonly scrollMargin = '0px'
    readonly thresholds: ReadonlyArray<number> = [0]

    disconnect = vi.fn()
    observe = vi.fn()
    takeRecords = vi.fn((): IntersectionObserverEntry[] => [])
    unobserve = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
