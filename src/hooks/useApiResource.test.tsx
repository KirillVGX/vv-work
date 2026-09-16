import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { ApiResponse } from '@/api'
import { useApiResource } from './useApiResource'

type ResourceProbeProps = {
    loadResource: () => Promise<ApiResponse<string>>
}

function ResourceProbe({ loadResource }: ResourceProbeProps) {
    const { load, state } = useApiResource(loadResource)

    return (
        <div>
            <p data-testid="status">{state.status}</p>
            {state.status === 'error' && (
                <p data-testid="message">{state.message}</p>
            )}
            {state.status === 'success' && (
                <p data-testid="data">{state.data}</p>
            )}
            <button
                onClick={() => {
                    void load()
                }}
                type="button"
            >
                Retry
            </button>
        </div>
    )
}

describe('useApiResource retry logic', () => {
    afterEach(() => {
        cleanup()
    })

    it('shows an error state when the request fails', async () => {
        const loadResource = vi.fn<() => Promise<ApiResponse<string>>>()
        loadResource.mockResolvedValueOnce(createFailure('Network error'))

        render(<ResourceProbe loadResource={loadResource} />)

        expect(screen.getByTestId('status').textContent).toBe('loading')

        const message = await screen.findByTestId('message')

        expect(loadResource).toHaveBeenCalledTimes(1)
        expect(screen.getByTestId('status').textContent).toBe('error')
        expect(message.textContent).toBe('Network error')
    })

    it('runs another request after retry', async () => {
        const loadResource = vi.fn<() => Promise<ApiResponse<string>>>()
        loadResource
            .mockResolvedValueOnce(createFailure('First error'))
            .mockResolvedValueOnce(createFailure('Retry error'))

        render(<ResourceProbe loadResource={loadResource} />)
        await screen.findByText('First error')

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

        expect(screen.getByTestId('status').textContent).toBe('loading')

        const retryMessage = await screen.findByText('Retry error')

        expect(loadResource).toHaveBeenCalledTimes(2)
        expect(screen.getByTestId('status').textContent).toBe('error')
        expect(retryMessage.textContent).toBe('Retry error')
    })

    it('recovers successfully after an error', async () => {
        const loadResource = vi.fn<() => Promise<ApiResponse<string>>>()
        loadResource
            .mockResolvedValueOnce(createFailure('Temporary error'))
            .mockResolvedValueOnce(createSuccess('Recovered data'))

        render(<ResourceProbe loadResource={loadResource} />)
        await screen.findByText('Temporary error')

        fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

        const data = await screen.findByTestId('data')

        expect(loadResource).toHaveBeenCalledTimes(2)
        expect(screen.getByTestId('status').textContent).toBe('success')
        expect(data.textContent).toBe('Recovered data')
    })
})

function createFailure(message: string): ApiResponse<string> {
    return {
        ok: false,
        error: {
            message,
            status: 500,
        },
    }
}

function createSuccess(data: string): ApiResponse<string> {
    return {
        ok: true,
        data,
    }
}
