import type { ApiResponse } from './types'

const DEFAULT_TTL_MS = 10 * 60 * 1000

type CacheEntry<TData> = {
    expiresAt: number
    response: Promise<ApiResponse<TData>>
}

const cache = new Map<string, CacheEntry<unknown>>()

export function withCache<TData>(
    key: string,
    fetcher: () => Promise<ApiResponse<TData>>,
    ttlMs: number = DEFAULT_TTL_MS
): Promise<ApiResponse<TData>> {
    const cached = cache.get(key) as CacheEntry<TData> | undefined

    if (cached && cached.expiresAt > Date.now()) {
        return cached.response
    }

    const response = fetcher().then((result) => {
        if (!result.ok) {
            cache.delete(key)
        }

        return result
    })

    cache.set(key, { expiresAt: Date.now() + ttlMs, response })

    return response
}
