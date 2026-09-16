import { useCallback, useEffect, useRef, useState } from 'react'

import type { ApiResponse } from '@/api'

type ResourceState<TData> =
    | { status: 'loading' }
    | { status: 'success'; data: TData }
    | { status: 'error'; message: string }

export function useApiResource<TData>(
    loadResource: () => Promise<ApiResponse<TData>>,
    options?: { enabled?: boolean }
) {
    const enabled = options?.enabled ?? true
    const [state, setState] = useState<ResourceState<TData>>({
        status: 'loading',
    })
    const requestIdRef = useRef(0)

    const load = useCallback(async () => {
        const requestId = requestIdRef.current + 1
        requestIdRef.current = requestId

        setState({ status: 'loading' })

        const response = await loadResource()

        if (requestId !== requestIdRef.current) {
            return
        }

        if (response.ok) {
            setState({ status: 'success', data: response.data })
            return
        }

        setState({ status: 'error', message: response.error.message })
    }, [loadResource])

    useEffect(() => {
        if (!enabled) {
            return
        }

        // oxlint-disable-next-line react/set-state-in-effect
        void load()

        return () => {
            requestIdRef.current += 1
        }
    }, [load, enabled])

    return { load, state }
}
